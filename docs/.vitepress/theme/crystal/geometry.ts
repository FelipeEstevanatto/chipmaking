/**
 * Turns a `Structure` into atoms and bonds, and then into the flat arrays the renderer uploads.
 *
 * Everything geometric happens here, away from WebGL: the basis is expanded over the symmetry
 * operations, the cell is repeated, and bonds are found by distance. The renderer never sees a
 * fractional coordinate, and a wrong structure is a bug in this file rather than in a shader.
 *
 * Two conventions are worth stating up front:
 *
 *  - The block spans `[0, n]` cells along each axis, faces included. A cell drawn at n = 1 is
 *    therefore the textbook picture — 18 atoms for diamond cubic, the four inside it showing all
 *    four of their bonds and the ones on the faces showing only the bonds that stay inside. A cut
 *    crystal has surfaces; this is what they look like.
 *  - The frame is drawn cell by cell, not only around the block, so the extent control shows what it
 *    means: at n = 2 the reader sees eight cells, each with its own edges.
 *  - The lattice matrix puts **a** along x and **b** in the xy plane, the standard
 *    crystallographic convention. It is what makes quartz come out with its 120° angle visible.
 */

import type { Species, Structure } from './structures'
import { SPECIES, displayRadius } from './structures'

export type Vec3 = [number, number, number]

export interface Atom {
  x: number
  y: number
  z: number
  species: string
}

export interface Bond {
  /** Indices into the atom list. */
  i: number
  j: number
}

/** One line of the frame around the block. */
export interface Edge {
  from: Vec3
  to: Vec3
  /** True when the line lies on the outside of the block rather than between two cells. */
  outer: boolean
}

export interface BuiltCrystal {
  atoms: Atom[]
  bonds: Bond[]
  outline: Edge[]
  /** Centre of the atom cloud, which is where the camera looks. */
  center: Vec3
  /** Distance from the centre to the farthest point of the drawn solid, in Å. */
  radius: number
  /** Species actually present, in the order they first appear. */
  species: string[]
}

/** Floats per atom instance: centre, radius, colour, ink. */
export const ATOM_STRIDE = 10
/** Floats per bond instance: a, radius, b, colour at a, colour at b. */
export const BOND_STRIDE = 13
/** Drawn bond half-thickness, in Å. */
const BOND_RADIUS = 0.135
/** The block frame: darker than the surface an atom casts, light enough for both themes. */
const OUTLINE_INK = '#8896a8'
/** Frame thickness as a fraction of the block's bounding radius: the outside, then the cell grid. */
const OUTER_EDGE = 0.003
const INNER_EDGE = 0.0019

const DEG = Math.PI / 180
const EPS = 1e-6

/** Lattice vectors of a cell, in Å. */
export function latticeMatrix(cell: Structure['cell']): [Vec3, Vec3, Vec3] {
  const alpha = cell.alpha * DEG
  const beta = cell.beta * DEG
  const gamma = cell.gamma * DEG
  const cosAlpha = Math.cos(alpha)
  const cosBeta = Math.cos(beta)
  const cosGamma = Math.cos(gamma)
  const sinGamma = Math.sin(gamma)
  const volume = Math.sqrt(
    Math.max(0, 1 - cosAlpha ** 2 - cosBeta ** 2 - cosGamma ** 2 + 2 * cosAlpha * cosBeta * cosGamma),
  )

  return [
    [cell.a, 0, 0],
    [cell.b * cosGamma, cell.b * sinGamma, 0],
    [
      cell.c * cosBeta,
      (cell.c * (cosAlpha - cosBeta * cosGamma)) / sinGamma,
      (cell.c * volume) / sinGamma,
    ],
  ]
}

function fraction(value: string): number {
  const [numerator, denominator] = value.split('/')
  return denominator ? Number(numerator) / Number(denominator) : Number(numerator)
}

/** One component of a symmetry operation, e.g. `-y`, `1/2+z`, `x-y`. */
function applyComponent(component: string, f: Vec3): number {
  const terms = component.replace(/([+-])/g, ' $1').trim().split(/\s+/)
  let total = 0

  for (const term of terms) {
    const match = /^([+-]?)([\d./]*)([xyz]?)$/.exec(term)
    if (!match || (!match[2] && !match[3])) {
      throw new Error(`crystal: unsupported symmetry term "${term}" in "${component}"`)
    }
    const sign = match[1] === '-' ? -1 : 1
    const amount = match[2] ? fraction(match[2]) : 1
    total += match[3] ? sign * amount * f['xyz'.indexOf(match[3])] : sign * amount
  }

  return total
}

const wrap = (value: number) => value - Math.floor(value)

/**
 * Applies the cell's symmetry operations to its basis and drops the duplicates, so the result is
 * the true cell contents: 9 atoms for quartz, not the 12 a naive application would give.
 */
export function expandBasis(basis: Structure['basis'], ops: string[]): Structure['basis'] {
  const out: Structure['basis'] = []

  for (const op of ops) {
    const parts = op.split(',')
    for (const site of basis) {
      const at: Vec3 = [
        wrap(applyComponent(parts[0], site.at)),
        wrap(applyComponent(parts[1], site.at)),
        wrap(applyComponent(parts[2], site.at)),
      ]
      const duplicate = out.some(
        (existing) =>
          Math.abs(existing.at[0] - at[0]) < 1e-4 &&
          Math.abs(existing.at[1] - at[1]) < 1e-4 &&
          Math.abs(existing.at[2] - at[2]) < 1e-4 &&
          existing.species === site.species,
      )
      if (!duplicate) out.push({ at, species: site.species })
    }
  }

  return out
}

const matches = (ruleSpecies: string, species: string) => ruleSpecies === '*' || ruleSpecies === species

function maxFor(rules: Structure['bonds'], a: string, b: string): number | null {
  const rule = rules.find(
    (candidate) =>
      (matches(candidate.a, a) && matches(candidate.b, b)) ||
      (matches(candidate.a, b) && matches(candidate.b, a)),
  )
  return rule ? rule.max : null
}

/**
 * A fixed-seed generator, so the substitutional pattern is the same in both locales, on every
 * reload and in every screenshot. The alloy is a picture of a random solid solution, not a
 * measurement of one.
 */
function mulberry32(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function buildCrystal(structure: Structure, repeats: number): BuiltCrystal {
  const n = Math.max(1, Math.min(Math.round(repeats), structure.maxRepeat))
  const [va, vb, vc] = latticeMatrix(structure.cell)
  const basis = structure.ops ? expandBasis(structure.basis, structure.ops) : structure.basis
  const atoms: Atom[] = []

  for (let i = 0; i <= n; i += 1) {
    for (let j = 0; j <= n; j += 1) {
      for (let k = 0; k <= n; k += 1) {
        for (const site of basis) {
          const f: Vec3 = [site.at[0] + i, site.at[1] + j, site.at[2] + k]
          if (f[0] > n + EPS || f[1] > n + EPS || f[2] > n + EPS) continue
          atoms.push(toCartesian(f, va, vb, vc, site.species))
        }
      }
    }
  }

  return assemble(structure, atoms, blockOutline(va, vb, vc, n))
}

/**
 * One copy of every site of the cell, and nothing else: the textbook unit cell, which is what the
 * occupancy panel draws. The block builder above cannot be reused for it, because at n = 1 it
 * already carries the shared corner atoms as duplicates, and overlapping spheres would flicker.
 */
export function buildCell(structure: Structure): BuiltCrystal {
  const [va, vb, vc] = latticeMatrix(structure.cell)
  const basis = structure.ops ? expandBasis(structure.basis, structure.ops) : structure.basis
  const atoms = basis.map((site) => toCartesian(site.at, va, vb, vc, site.species))

  return assemble(structure, atoms, blockOutline(va, vb, vc, 1))
}

/** Bonds, substitution and bounds — everything the two builders do after the atoms are placed. */
function assemble(structure: Structure, atoms: Atom[], outline: Edge[]): BuiltCrystal {
  const alloy = structure.alloy
  if (alloy) {
    const random = mulberry32(0x51c0de)
    for (const atom of atoms) {
      if (atom.species === alloy.on && random() < alloy.fraction) atom.species = alloy.species
    }
  }

  const bonds: Bond[] = []
  for (let i = 0; i < atoms.length; i += 1) {
    for (let j = i + 1; j < atoms.length; j += 1) {
      const max = maxFor(structure.bonds, atoms[i].species, atoms[j].species)
      if (max === null) continue
      const dx = atoms[i].x - atoms[j].x
      const dy = atoms[i].y - atoms[j].y
      const dz = atoms[i].z - atoms[j].z
      if (dx * dx + dy * dy + dz * dz <= max * max) bonds.push({ i, j })
    }
  }

  const species: string[] = []
  for (const atom of atoms) if (!species.includes(atom.species)) species.push(atom.species)

  return { atoms, bonds, species, outline, ...bounds(atoms) }
}

function toCartesian(f: Vec3, va: Vec3, vb: Vec3, vc: Vec3, species: string): Atom {
  return {
    x: f[0] * va[0] + f[1] * vb[0] + f[2] * vc[0],
    y: f[0] * va[1] + f[1] * vb[1] + f[2] * vc[1],
    z: f[0] * va[2] + f[1] * vb[2] + f[2] * vc[2],
    species,
  }
}

/**
 * The frame of the block, drawn line by line: every line parallel to **a** at each (j, k), and the
 * same for the other two axes. At n = 1 that is exactly the twelve edges of the cell; at n = 3 it is
 * the 48 lines of a 3 × 3 × 3 lattice of cells, so the reader can count the cells the extent
 * control asked for. Lines on the outside are marked, and drawn heavier, to keep the block readable.
 */
function blockOutline(va: Vec3, vb: Vec3, vc: Vec3, n: number): Edge[] {
  const point = (i: number, j: number, k: number): Vec3 => [
    i * va[0] + j * vb[0] + k * vc[0],
    i * va[1] + j * vb[1] + k * vc[1],
    i * va[2] + j * vb[2] + k * vc[2],
  ]
  const onFace = (value: number) => value === 0 || value === n

  const edges: Edge[] = []
  for (let j = 0; j <= n; j += 1) {
    for (let k = 0; k <= n; k += 1) {
      edges.push({ from: point(0, j, k), to: point(n, j, k), outer: onFace(j) && onFace(k) })
    }
  }
  for (let i = 0; i <= n; i += 1) {
    for (let k = 0; k <= n; k += 1) {
      edges.push({ from: point(i, 0, k), to: point(i, n, k), outer: onFace(i) && onFace(k) })
    }
  }
  for (let i = 0; i <= n; i += 1) {
    for (let j = 0; j <= n; j += 1) {
      edges.push({ from: point(i, j, 0), to: point(i, j, n), outer: onFace(i) && onFace(j) })
    }
  }

  return edges
}

function bounds(atoms: Atom[]): { center: Vec3; radius: number } {
  if (!atoms.length) return { center: [0, 0, 0], radius: 1 }

  const center: Vec3 = [0, 0, 0]
  for (const atom of atoms) {
    center[0] += atom.x / atoms.length
    center[1] += atom.y / atoms.length
    center[2] += atom.z / atoms.length
  }

  let radius = 0
  for (const atom of atoms) {
    const definition = SPECIES[atom.species]
    const reach =
      Math.hypot(atom.x - center[0], atom.y - center[1], atom.z - center[2]) +
      (definition ? displayRadius(definition) : 0.8)
    radius = Math.max(radius, reach)
  }

  return { center, radius }
}

/** `#rrggbb` (or `#rgb`) to the three floats the shader wants. */
export function parseColor(hex: string): Vec3 {
  const value = hex.replace('#', '')
  const full =
    value.length === 3
      ? value
          .split('')
          .map((character) => character + character)
          .join('')
      : value

  return [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255,
  ]
}

export interface Instances {
  atomData: Float32Array
  atomCount: number
  bondData: Float32Array
  bondCount: number
}

/** Flat instance buffers, ready for `bufferData`. */
export function buildInstances(crystal: BuiltCrystal, radii?: Record<string, number>): Instances {
  const atomData = new Float32Array(crystal.atoms.length * ATOM_STRIDE)
  crystal.atoms.forEach((atom, index) => {
    const definition = SPECIES[atom.species]
    const color = parseColor(definition?.color ?? '#cfd8e3')
    const ink = parseColor(definition?.ink ?? '#7d8b9c')
    atomData.set(
      [
        atom.x,
        atom.y,
        atom.z,
        radii?.[atom.species] ?? (definition ? displayRadius(definition) : 0.8),
        color[0],
        color[1],
        color[2],
        ink[0],
        ink[1],
        ink[2],
      ],
      index * ATOM_STRIDE,
    )
  })

  const bondData = new Float32Array((crystal.bonds.length + crystal.outline.length) * BOND_STRIDE)
  crystal.bonds.forEach((bond, index) => {
    const from = crystal.atoms[bond.i]
    const to = crystal.atoms[bond.j]
    writeBond(
      bondData,
      index * BOND_STRIDE,
      [from.x, from.y, from.z],
      [to.x, to.y, to.z],
      parseColor(SPECIES[from.species]?.color ?? '#cfd8e3'),
      parseColor(SPECIES[to.species]?.color ?? '#cfd8e3'),
      BOND_RADIUS,
    )
  })

  // The frame keeps a constant thickness on screen by scaling with the block it wraps; its outer
  // edges are drawn heavier, so the block still reads when the inside is divided into cells.
  const outlineColor = parseColor(OUTLINE_INK)
  crystal.outline.forEach((edge, index) => {
    writeBond(
      bondData,
      (crystal.bonds.length + index) * BOND_STRIDE,
      edge.from,
      edge.to,
      outlineColor,
      outlineColor,
      crystal.radius * (edge.outer ? OUTER_EDGE : INNER_EDGE),
    )
  })

  return {
    atomData,
    atomCount: crystal.atoms.length,
    bondData,
    bondCount: crystal.bonds.length + crystal.outline.length,
  }
}

function writeBond(
  target: Float32Array,
  offset: number,
  from: Vec3,
  to: Vec3,
  colorFrom: Vec3,
  colorTo: Vec3,
  radius: number,
) {
  target.set(
    [
      from[0],
      from[1],
      from[2],
      radius,
      to[0],
      to[1],
      to[2],
      colorFrom[0],
      colorFrom[1],
      colorFrom[2],
      colorTo[0],
      colorTo[1],
      colorTo[2],
    ],
    offset,
  )
}

/** Every species in the drawn block, for the legend. */
export function legendFor(crystal: BuiltCrystal): Species[] {
  return crystal.species.map((symbol) => SPECIES[symbol]).filter((s): s is Species => !!s)
}
