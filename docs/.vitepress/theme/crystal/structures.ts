/**
 * The five crystals drawn by `CrystalViewer.vue`, and the numbers each one carries.
 *
 * A structure is a cell plus a list of fractional basis sites, exactly as a crystallographic
 * database states it — so the geometry is *derived* from published data rather than hand-placed.
 * `geometry.ts` expands the basis over the symmetry operations, repeats the cell and finds the
 * bonds by distance; nothing here says where an atom sits in the picture.
 *
 * The rules the rest of the repo applies to data apply here too:
 *
 *  - a lattice constant, a bond length or an angle is a published number and cites its source in
 *    `sourceIds`;
 *  - the display radii are the covalent radii scaled by one common factor, so the *ratios* between
 *    the atoms stay honest even though the whole picture is drawn smaller than the real thing, and
 *    the occupancy panel is the one view that draws them at full size;
 *  - the notes are in both locales and use each locale's decimal separator.
 *
 * Every crystal here is one the chain actually meets: the silicon the wafer is pulled from, the
 * carbide of power devices, the germanium that strains a channel, the silica of the quartz and of
 * the gate oxide, and the nitride that masks, insulates and coats.
 *
 * The nitride is drawn in its α phase, because that is the cell a structure determination publishes
 * in a form a reader can check. The bond is the point either way: α and β share the SiN₄ tetrahedron
 * with nitrogen bridging three silicons, and only the stacking differs.
 */

/** The elements that appear in the structures, keyed by symbol. */
export interface Species {
  symbol: string
  pt: string
  en: string
  /** Base colour, following the palette the drawn figures already use. */
  color: string
  /** Line colour, mixed into the silhouette so a sphere reads as a filled circle with a stroke. */
  ink: string
  /** Covalent radius in Å — the physical one, used to split a bond and to measure occupancy. */
  covalent: number
}

/**
 * Everything drawn is scaled by this one factor, so the atoms stay in proportion to each other
 * while leaving the bonds visible. The occupancy panel is the one view that uses the radii whole.
 */
export const DISPLAY_SCALE = 0.72

export const displayRadius = (species: Species) => species.covalent * DISPLAY_SCALE

export const SPECIES: Record<string, Species> = {
  Si: { symbol: 'Si', pt: 'silício', en: 'silicon', color: '#cfd8e3', ink: '#7d8b9c', covalent: 1.11 },
  C: { symbol: 'C', pt: 'carbono', en: 'carbon', color: '#3b5b8c', ink: '#152744', covalent: 0.76 },
  O: { symbol: 'O', pt: 'oxigênio', en: 'oxygen', color: '#e05252', ink: '#9c1f1f', covalent: 0.66 },
  // The site already paints silicon nitride as the mask and dielectric it is.
  N: { symbol: 'N', pt: 'nitrogênio', en: 'nitrogen', color: '#805ad5', ink: '#3f2a70', covalent: 0.71 },
  Ge: { symbol: 'Ge', pt: 'germânio', en: 'germanium', color: '#4db59a', ink: '#1f6b58', covalent: 1.20 },
}

/** A cell edge in Å, with the interaxial angles in degrees (α between b and c, and so on). */
export interface Cell {
  a: number
  b: number
  c: number
  alpha: number
  beta: number
  gamma: number
}

export interface Site {
  /** Fractional coordinates of the basis atom. */
  at: [number, number, number]
  species: string
}

/** Which pairs of species are bonded, and up to what distance. `*` matches any species. */
export interface BondRule {
  a: string
  b: string
  max: number
}

/** A label and a value in the strip under the viewport. */
export interface Metric {
  labelPt: string
  labelEn: string
  valuePt: string
  valueEn: string
}

export interface Structure {
  id: string
  /** Formula, printed on the selector chip; identical in both locales. */
  formula: string
  namePt: string
  nameEn: string
  /** One or two sentences of industrial reading, under the viewport. */
  notePt: string
  noteEn: string
  metrics: Metric[]
  cell: Cell
  basis: Site[]
  /** Symmetry operations from the published cell, in the `'x,y,z'` form a CIF uses. */
  ops?: string[]
  bonds: BondRule[]
  /** Largest number of cells the size control may repeat along each axis. */
  maxRepeat: number
  /** Substitutional alloy: the builder swaps a share of `on` sites for `species`. */
  alloy?: { species: string; fraction: number; on: string }
  sourceIds: string[]
}

const CUBIC_ANGLES = { alpha: 90, beta: 90, gamma: 90 }

export const STRUCTURES: Structure[] = [
  {
    id: 'si',
    formula: 'Si',
    namePt: 'Cúbica de diamante',
    nameEn: 'Diamond cubic',
    notePt:
      'Cada silício se liga a quatro vizinhos, a 2,352 Å e 109,47° um do outro: o tetraedro. A rede repete essa unidade a cada 5,431 Å, nas três direções.',
    noteEn:
      'Every silicon bonds to four neighbours, 2.352 Å away and 109.47° apart: the tetrahedron. The lattice repeats that unit every 5.431 Å, in all three directions.',
    metrics: [
      { labelPt: 'Constante de rede', labelEn: 'Lattice constant', valuePt: 'a = 5,431 Å', valueEn: 'a = 5.431 Å' },
      { labelPt: 'Ligação Si–Si', labelEn: 'Si–Si bond', valuePt: '2,352 Å', valueEn: '2.352 Å' },
      { labelPt: 'Coordenação', labelEn: 'Coordination', valuePt: '4', valueEn: '4' },
    ],
    cell: { a: 5.431, b: 5.431, c: 5.431, ...CUBIC_ANGLES },
    basis: [
      { at: [0, 0, 0], species: 'Si' },
      { at: [0, 0.5, 0.5], species: 'Si' },
      { at: [0.5, 0, 0.5], species: 'Si' },
      { at: [0.5, 0.5, 0], species: 'Si' },
      { at: [0.25, 0.25, 0.25], species: 'Si' },
      { at: [0.25, 0.75, 0.75], species: 'Si' },
      { at: [0.75, 0.25, 0.75], species: 'Si' },
      { at: [0.75, 0.75, 0.25], species: 'Si' },
    ],
    // The nearest shell is 2.352 Å away and the next one 3.840 Å, so anything under 2.8 Å is a bond.
    bonds: [{ a: 'Si', b: 'Si', max: 2.8 }],
    maxRepeat: 3,
    sourceIds: ['elem-ioffe'],
  },
  {
    id: 'sic',
    formula: 'SiC',
    namePt: 'Carbeto, 3C',
    nameEn: 'Carbide, 3C',
    notePt:
      'No carbeto, os quatro vizinhos de cada silício são carbonos, a 1,888 Å. O polimorfo que a indústria usa em potência é o 4H, hexagonal; a célula cúbica do 3C mostrada aqui tem a mesma ligação, empilhada de outro jeito.',
    noteEn:
      'In the carbide, all four neighbours of every silicon are carbons, 1.888 Å away. The polytype the power industry uses is 4H, hexagonal; the cubic 3C cell shown here has the same bond, stacked differently.',
    metrics: [
      { labelPt: 'Constante de rede', labelEn: 'Lattice constant', valuePt: 'a = 4,360 Å', valueEn: 'a = 4.360 Å' },
      { labelPt: 'Ligação Si–C', labelEn: 'Si–C bond', valuePt: '1,888 Å', valueEn: '1.888 Å' },
      { labelPt: 'Coordenação', labelEn: 'Coordination', valuePt: '4 / 4', valueEn: '4 / 4' },
    ],
    cell: { a: 4.3596, b: 4.3596, c: 4.3596, ...CUBIC_ANGLES },
    basis: [
      { at: [0, 0, 0], species: 'Si' },
      { at: [0, 0.5, 0.5], species: 'Si' },
      { at: [0.5, 0, 0.5], species: 'Si' },
      { at: [0.5, 0.5, 0], species: 'Si' },
      { at: [0.25, 0.25, 0.25], species: 'C' },
      { at: [0.25, 0.75, 0.75], species: 'C' },
      { at: [0.75, 0.25, 0.75], species: 'C' },
      { at: [0.75, 0.75, 0.25], species: 'C' },
    ],
    // Si–C is 1.888 Å and the next shell (Si–Si, C–C) 3.083 Å.
    bonds: [{ a: 'Si', b: 'C', max: 2.2 }],
    maxRepeat: 3,
    sourceIds: ['wbg-ioffe-sic'],
  },
  {
    id: 'sige',
    formula: 'SiGe',
    namePt: 'Liga com germânio',
    nameEn: 'Alloy with germanium',
    notePt:
      'O germânio entra substituindo silícios na mesma rede, sem ordem. Como o átomo é maior, a célula estica: 5,431 Å no silício, 5,658 Å no germânio, e o SiGe fica entre os dois. Um canal de silício crescido sobre essa rede maior sai esticado, e a mobilidade sobe.',
    noteEn:
      'Germanium goes in by replacing silicon in the same lattice, without order. The atom is larger, so the cell stretches: 5.431 Å in silicon, 5.658 Å in germanium, and SiGe lands in between. A silicon channel grown on that larger lattice comes out strained, and mobility rises.',
    metrics: [
      {
        labelPt: 'Constante de rede',
        labelEn: 'Lattice constant',
        valuePt: '5,431 – 5,658 Å',
        valueEn: '5.431 – 5.658 Å',
      },
      { labelPt: 'Substituição', labelEn: 'Substitution', valuePt: '1 sítio em 4', valueEn: '1 site in 4' },
      { labelPt: 'Coordenação', labelEn: 'Coordination', valuePt: '4', valueEn: '4' },
    ],
    // Vegard's law over the drawn 25% Ge: 5.431 + 0.25 × (5.658 − 5.431) = 5.4878 Å.
    cell: { a: 5.4878, b: 5.4878, c: 5.4878, ...CUBIC_ANGLES },
    basis: [
      { at: [0, 0, 0], species: 'Si' },
      { at: [0, 0.5, 0.5], species: 'Si' },
      { at: [0.5, 0, 0.5], species: 'Si' },
      { at: [0.5, 0.5, 0], species: 'Si' },
      { at: [0.25, 0.25, 0.25], species: 'Si' },
      { at: [0.25, 0.75, 0.75], species: 'Si' },
      { at: [0.75, 0.25, 0.75], species: 'Si' },
      { at: [0.75, 0.75, 0.25], species: 'Si' },
    ],
    // One cutoff for every pair: the stretched cell puts every bond near 0.433 × 5.4878 = 2.376 Å.
    bonds: [{ a: '*', b: '*', max: 2.9 }],
    maxRepeat: 3,
    alloy: { species: 'Ge', fraction: 0.25, on: 'Si' },
    sourceIds: ['elem-sze', 'ge-vs-si', 'intel-strain'],
  },
  {
    id: 'sio2',
    formula: 'SiO₂',
    namePt: 'Quartzo',
    nameEn: 'Quartz',
    notePt:
      'A sílica cristalina é uma rede de tetraedros SiO₄ que compartilham os vértices: cada oxigênio liga dois silícios, a 1,605 e 1,614 Å, num ângulo de 143,7°. É este o quartzo que abre a cadeia do silício; o óxido crescido sobre o wafer é a mesma sílica, sem a repetição de longo alcance.',
    noteEn:
      'Crystalline silica is a network of SiO₄ tetrahedra sharing their corners: every oxygen bonds two silicons, 1.605 and 1.614 Å away, at an angle of 143.7°. This is the quartz that opens the silicon chain; the oxide grown on the wafer is the same silica without the long-range repetition.',
    metrics: [
      {
        labelPt: 'Constante de rede',
        labelEn: 'Lattice constant',
        valuePt: 'a = 4,916 Å · c = 5,405 Å',
        valueEn: 'a = 4.916 Å · c = 5.405 Å',
      },
      { labelPt: 'Ligação Si–O', labelEn: 'Si–O bond', valuePt: '1,605 / 1,614 Å', valueEn: '1.605 / 1.614 Å' },
      { labelPt: 'Ângulo Si–O–Si', labelEn: 'Si–O–Si angle', valuePt: '143,7°', valueEn: '143.7°' },
    ],
    // α-quartz, space group P3₂21, at 1 atm: the coordinates and the six operations below come from
    // the same structure determination, so applying them reproduces the 3 SiO₂ units of the cell.
    cell: { a: 4.916, b: 4.916, c: 5.4054, alpha: 90, beta: 90, gamma: 120 },
    basis: [
      { at: [0.4697, 0, 0], species: 'Si' },
      { at: [0.4135, 0.2669, 0.1191], species: 'O' },
    ],
    ops: ['x,y,z', 'y,x,2/3-z', '-y,x-y,2/3+z', '-x,-x+y,1/3-z', '-x+y,-x,1/3+z', 'x-y,-y,-z'],
    // The tetrahedron in α-quartz is slightly distorted: two Si–O distances, 1.605 and 1.614 Å. The
    // shortest O–O contact is 2.61 Å, so a 1.9 Å cutoff takes in the bonds and nothing else.
    bonds: [{ a: 'Si', b: 'O', max: 1.9 }],
    maxRepeat: 3,
    sourceIds: ['struct-quartz-levien', 'elem-sze'],
  },
  {
    id: 'si3n4',
    formula: 'Si₃N₄',
    namePt: 'Nitreto, α',
    nameEn: 'Nitride, α',
    notePt:
      'O nitrogênio muda o papel da ponte: cada N liga três silícios, e cada silício fica no centro de um tetraedro SiN₄. É este o nitreto que reveste o cadinho, serve de máscara e faz a camada antirrefletora da célula. A célula desenhada é a α; a β, que domina os cerâmicos, tem os mesmos tetraedros empilhados de outro jeito.',
    noteEn:
      'Nitrogen changes the bridge: every N bonds three silicons, and every silicon sits at the centre of a SiN₄ tetrahedron. This is the nitride that lines the crucible, serves as a mask and forms the cell’s anti-reflection layer. The cell drawn here is α; β, which dominates ceramics, has the same tetrahedra stacked differently.',
    metrics: [
      {
        labelPt: 'Constante de rede',
        labelEn: 'Lattice constant',
        valuePt: 'a = 7,766 Å · c = 5,615 Å',
        valueEn: 'a = 7.766 Å · c = 5.615 Å',
      },
      { labelPt: 'Ligação Si–N', labelEn: 'Si–N bond', valuePt: '1,70 a 1,77 Å', valueEn: '1.70 to 1.77 Å' },
      { labelPt: 'Coordenação', labelEn: 'Coordination', valuePt: 'Si 4 · N 3', valueEn: 'Si 4 · N 3' },
    ],
    // α-Si₃N₄, space group P31c, Z = 4: two general silicon sites and four nitrogen sites (two of
    // them special) give the 28 atoms of the cell. The measured occupancies of that specimen
    // (0.96–0.99) are ignored here — a teaching cell keeps every site filled.
    cell: { a: 7.766, b: 7.766, c: 5.615, alpha: 90, beta: 90, gamma: 120 },
    basis: [
      { at: [0.513, 0.4305, 0.658], species: 'Si' },
      { at: [0.168, 0.915, 0.4504], species: 'Si' },
      { at: [0.6124, 0.9592, 0.4343], species: 'N' },
      { at: [0.3199, 0.0046, 0.7045], species: 'N' },
      { at: [0.66667, 0.33333, 0.6015], species: 'N' },
      { at: [0, 0, 0.452], species: 'N' },
    ],
    ops: ['x,y,z', 'x-y,-y,1/2+z', '-y,x-y,z', 'y,x,1/2+z', '-x+y,-x,z', '-x,-x+y,1/2+z'],
    // Si–N sits between 1.70 and 1.78 Å; the next contacts are Si–Si near 2.9 Å and N–N past 2.6 Å.
    bonds: [{ a: 'Si', b: 'N', max: 2.05 }],
    // 28 atoms in the cell; 3 × 3 × 3 would be 756 of them, which is more than the panel needs.
    maxRepeat: 2,
    sourceIds: ['struct-si3n4-kohatsu', 'saimm'],
  },
]

export function getStructure(id: string): Structure {
  return STRUCTURES.find((structure) => structure.id === id) ?? STRUCTURES[0]
}
