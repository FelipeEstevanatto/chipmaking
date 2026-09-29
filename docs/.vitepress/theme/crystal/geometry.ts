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

import type { Site, Species, Structure } from './structures'
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

const ALLOY_SEED = 0x51c0de

/** A seed per cell, so every cell draws its own pattern but the same count. */
function cellSeed(i: number, j: number, k: number): number {
  return (ALLOY_SEED + Math.imul(i, 73856093) + Math.imul(j, 19349663) + Math.imul(k, 83492791)) >>> 0
}

/**
 * Which of a cell's sites the substituting element takes over: exactly `round(sites × fraction)` of
 * them, chosen at random, so the picture agrees with the metric the panel prints. A per-atom coin
 * flip would drift — one cell showing 1 site in 8, the next 3 — and the number would be a claim the
 * drawing does not keep.
 */
function substitutedSites(count: number, fraction: number, seed: number): Set<number> {
  const random = mulberry32(seed)
  const order = Array.from({ length: count }, (_, index) => index)
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    const held = order[i]
    order[i] = order[j]
    order[j] = held
  }
  return new Set(order.slice(0, Math.round(count * fraction)))
}

/** The species a basis site carries in this cell, once the alloy has had its say. */
function speciesAt(structure: Structure, site: Site, chosen: Set<number> | null, index: number): string {
  const alloy = structure.alloy
  if (!alloy || !chosen || !chosen.has(index) || site.species !== alloy.on) return site.species
  return alloy.species
}

export function buildCrystal(structure: Structure, repeats: number): BuiltCrystal {
  const n = Math.max(1, Math.min(Math.round(repeats), structure.maxRepeat))
  const [va, vb, vc] = latticeMatrix(structure.cell)
  const basis = structure.ops ? expandBasis(structure.basis, structure.ops) : structure.basis
  const atoms: Atom[] = []

  for (let i = 0; i <= n; i += 1) {
    for (let j = 0; j <= n; j += 1) {
      for (let k = 0; k <= n; k += 1) {
        const alloy = structure.alloy
        const chosen = alloy
          ? substitutedSites(basis.length, alloy.fraction, cellSeed(i, j, k))
          : null
        basis.forEach((site, index) => {
          const f: Vec3 = [site.at[0] + i, site.at[1] + j, site.at[2] + k]
          if (f[0] > n + EPS || f[1] > n + EPS || f[2] > n + EPS) return
          atoms.push(toCartesian(f, va, vb, vc, speciesAt(structure, site, chosen, index)))
        })
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
  const alloy = structure.alloy
  // Seed zero: the panel draws the same cell the block starts with, so the two views agree.
  const chosen = alloy ? substitutedSites(basis.length, alloy.fraction, ALLOY_SEED) : null
  const atoms = basis.map((site, index) =>
    toCartesian(site.at, va, vb, vc, speciesAt(structure, site, chosen, index)),
  )
  const built = assemble(structure, atoms, blockOutline(va, vb, vc, 1))

  // The panel frames the cell, not the atom cloud: the atoms are cut at its faces, so the box is
  // what should hold still while the reader switches structures.
  const corner: Vec3 = [va[0] + vb[0] + vc[0], va[1] + vb[1] + vc[1], va[2] + vb[2] + vc[2]]
  return {
    ...built,
    center: [corner[0] / 2, corner[1] / 2, corner[2] / 2],
    radius: Math.hypot(corner[0], corner[1], corner[2]) / 2,
  }
}

/** Bonds and bounds — everything the two builders do after the atoms are placed. */
function assemble(structure: Structure, atoms: Atom[], outline: Edge[]): BuiltCrystal {
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

export interface Occupancy {
  /** Share of the cell volume that lies inside an atom, under the touching-sphere model. */
  fraction: number
  /** Atoms in the cell, with the alloy counted at its nominal composition. */
  atoms: number
  /** Radii in Å, per species: the size the panel draws and the size it sums. */
  radii: Record<string, number>
  /** The mean bond length the radii were split along, in Å. */
  bond: number
}

/**
 * How much of the cell is matter and how much is void.
 *
 * The model is the one the number depends on, so the panel states it: the spheres touch along the
 * bond, and two bonded atoms share that bond in the ratio of their covalent radii. For silicon this
 * reproduces the textbook packing fraction of diamond cubic (34%), and for quartz it is the number
 * that makes the point — a silica network is mostly empty space.
 *
 * The composition comes from the cell contents rather than from the drawn block, so the alloy's
 * random draw cannot leak into a percentage.
 */
export function occupancy(structure: Structure, crystal: BuiltCrystal): Occupancy {
  const content = structure.ops ? expandBasis(structure.basis, structure.ops) : structure.basis
  const counts = new Map<string, number>()
  for (const site of content) counts.set(site.species, (counts.get(site.species) ?? 0) + 1)

  const alloy = structure.alloy
  if (alloy) {
    const moved = (counts.get(alloy.on) ?? 0) * alloy.fraction
    counts.set(alloy.on, (counts.get(alloy.on) ?? 0) - moved)
    counts.set(alloy.species, (counts.get(alloy.species) ?? 0) + moved)
  }

  // The bond length is a property of the cell, and the drawn block is the cheapest place to read it.
  // The mean, not the shortest: a cell with two slightly different bonds (quartz, the nitride) has to
  // split one radius per element, and the average is the one that keeps the spheres touching.
  let bond = 0
  for (const pair of crystal.bonds) {
    const from = crystal.atoms[pair.i]
    const to = crystal.atoms[pair.j]
    bond += Math.hypot(from.x - to.x, from.y - to.y, from.z - to.z)
  }
  if (crystal.bonds.length) bond /= crystal.bonds.length

  // A species that bonds through a wildcard rule has no single partner, so it is split against the
  // composition's mean radius: what an alloy does on average.
  const total = [...counts.values()].reduce((sum, count) => sum + count, 0)
  const mean = total
    ? [...counts].reduce(
        (sum, [symbol, count]) => sum + (SPECIES[symbol]?.covalent ?? 0) * count,
        0,
      ) / total
    : 0

  const radii: Record<string, number> = {}
  let filled = 0
  for (const [symbol, count] of counts) {
    const own = SPECIES[symbol]?.covalent ?? 0
    const partner = partnerCovalent(structure.bonds, symbol) ?? mean
    const radius = own + partner > 0 ? (bond * own) / (own + partner) : 0
    radii[symbol] = radius
    filled += count * (4 / 3) * Math.PI * radius ** 3
  }

  return {
    fraction: filled / cellVolume(structure.cell),
    atoms: Math.round(total),
    radii,
    bond,
  }
}

/** The covalent radius of the species a rule bonds this one to, or null when the rule is a wildcard. */
function partnerCovalent(rules: Structure['bonds'], species: string): number | null {
  for (const rule of rules) {
    if (rule.a === species && rule.b !== '*') return SPECIES[rule.b]?.covalent ?? null
    if (rule.b === species && rule.a !== '*') return SPECIES[rule.a]?.covalent ?? null
  }
  return null
}

/** Cell volume in Å³: the determinant of the lattice vectors. */
export function cellVolume(cell: Structure['cell']): number {
  const [va, vb, vc] = latticeMatrix(cell)
  return Math.abs(determinant(va, vb, vc))
}

const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
]

const determinant = (a: Vec3, b: Vec3, c: Vec3): number =>
  a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0])

/**
 * The reciprocal vectors of the cell: `dot(position, reciprocal[i])` is the fractional coordinate
 * along axis i. The renderer cuts the drawn cell with them, which is what lets the cut follow the
 * hexagonal cell of quartz and of the nitride instead of an axis-aligned box.
 */
export function cellReciprocal(cell: Structure['cell']): [Vec3, Vec3, Vec3] {
  const [va, vb, vc] = latticeMatrix(cell)
  const volume = determinant(va, vb, vc)
  const scale = volume === 0 ? 0 : 1 / volume

  return [cross(vb, vc), cross(vc, va), cross(va, vb)].map((vector) =>
    vector.map((value) => value * scale),
  ) as [Vec3, Vec3, Vec3]
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
