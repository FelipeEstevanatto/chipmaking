/**
 * The four beats of the carbothermal furnace, as the *Mineração e MG-Si* chapter tells them, for
 * `FurnaceChemistry.vue`.
 *
 * A stage is a small cast of atoms, molecules and a growing droplet, plus the bonds drawn between
 * them. Coordinates are in the canvas's own 900 × 470 space; the component scales that to whatever
 * width the page gives it, so nothing here depends on the screen.
 *
 * Two conventions keep the animation honest:
 *
 *  - actors are matched by `id` across stages, so an atom that carries over keeps travelling
 *    instead of blinking out and back in. A stage that introduces an actor gives it a `from` point;
 *    a stage that consumes one gives it `vanishAt`, and the actor fades where it stands;
 *  - the drawing is a schematic of the bond changes, not a balanced atom count. The equation under
 *    the canvas carries the stoichiometry; the picture carries who takes what from whom.
 */

export interface Point {
  x: number
  y: number
}

export type AtomElement = 'Si' | 'O' | 'C'

/** Where in the furnace the beat happens, which is what the column strip highlights. */
export type Zone = 'charge' | 'bath' | 'rise' | 'return'

/** What every actor carries, whatever it is drawn as. */
interface ActorBase {
  id: string
  /** Final position. Motion is a lerp from wherever the actor already is, or from `from`. */
  at: Point
  /** Entry point for an actor this stage introduces. Defaults to `at`. */
  from?: Point
  /** Milliseconds to hold before starting to move. */
  delay?: number
  /** Milliseconds before the actor fades out of the scene. */
  vanishAt?: number
  /** Delay before an introduced actor becomes visible, for staged hand-offs. */
  appearAt?: number
}

export type ActorSpec =
  | (ActorBase & { kind: 'atom'; element: AtomElement })
  | (ActorBase & {
      kind: 'molecule'
      molecule: 'CO' | 'SiO'
      /** Axis of the molecule in degrees; the two atoms sit 14 units either side of the centre. */
      angle: number
    })
  | (ActorBase & {
      kind: 'blob'
      /** Target radius of the droplet; it grows into it from `fromRadius`. */
      radius: number
      fromRadius?: number
    })

export interface BondSpec {
  a: string
  b: string
  /** 1 for a single bond, 2 for the double line drawn on Si=O and C=O. */
  order?: number
}

export interface FurnaceStage {
  id: string
  zone: Zone
  /** Short tab label. */
  tab: { pt: string; en: string }
  /** Temperature band, as the chapter states it. Locale-free on purpose: it is just a number. */
  temp: string
  equation: string
  title: { pt: string; en: string }
  note: { pt: string; en: string }
  actors: ActorSpec[]
  bonds: BondSpec[]
  /** The off-gas leaving the charge: bubbles rise while the stage is on screen. */
  exhaust: boolean
}

/** A point `distance` away from `centre`, along the axis `angleDeg`. */
function along(centre: Point, angleDeg: number, distance: number): Point {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: Math.round((centre.x + Math.cos(rad) * distance) * 10) / 10,
    y: Math.round((centre.y + Math.sin(rad) * distance) * 10) / 10,
  }
}

/** Half the distance between the two atoms of a diatomic molecule, in scene units. */
const HALF = 14

/**
 * The silica fragment the three reactions work on: two silicon atoms joined through a bridging
 * oxygen, with one terminal oxygen each — the corner-sharing tetrahedra of quartz, flattened.
 */
function silica(siA: Point, siB: Point, bridge: Point, outA: Point, outB: Point): ActorSpec[] {
  return [
    { id: 'siA', kind: 'atom', element: 'Si', at: siA },
    { id: 'siB', kind: 'atom', element: 'Si', at: siB },
    { id: 'oBridge', kind: 'atom', element: 'O', at: bridge },
    { id: 'oOutA', kind: 'atom', element: 'O', at: outA },
    { id: 'oOutB', kind: 'atom', element: 'O', at: outB },
  ]
}

export const FURNACE_STAGES: FurnaceStage[] = [
  /* ------------------------------------------------------------------ 1 */
  {
    id: 'carbide',
    zone: 'charge',
    tab: { pt: 'Carbeto', en: 'Carbide' },
    temp: '~1600 °C',
    equation: 'SiO₂ + 3C → SiC + 2CO',
    title: {
      pt: 'O carbono tira o oxigênio',
      en: 'Carbon strips the oxygen',
    },
    note: {
      pt: 'Na zona superior, o carbono reduz o quartzo: o oxigênio sai como monóxido de carbono e o silício fica ligado ao carbono, formando carbeto de silício.',
      en: 'In the upper zone, carbon reduces the quartz: the oxygen leaves as carbon monoxide and the silicon is left bonded to carbon, forming silicon carbide.',
    },
    actors: [
      ...silica({ x: 245, y: 265 }, { x: 400, y: 265 }, { x: 325, y: 205 }, { x: 175, y: 215 }, { x: 470, y: 215 }),
      // The bridging and one outer oxygen are taken by carbon and leave as CO.
      { id: 'oBridge', kind: 'atom', element: 'O', at: along({ x: 265, y: 120 }, -120, HALF), vanishAt: 700 },
      { id: 'oOutB', kind: 'atom', element: 'O', at: along({ x: 450, y: 140 }, -60, HALF), vanishAt: 700 },
      // Two carbons travel up to meet them and leave with them.
      {
        id: 'cEnterA',
        kind: 'atom',
        element: 'C',
        at: along({ x: 265, y: 120 }, -120, -HALF),
        from: { x: 130, y: 480 },
        vanishAt: 700,
      },
      {
        id: 'cEnterB',
        kind: 'atom',
        element: 'C',
        at: along({ x: 450, y: 140 }, -60, -HALF),
        from: { x: 610, y: 470 },
        vanishAt: 700,
      },
      { id: 'mCarb1', kind: 'molecule', molecule: 'CO', at: { x: 190, y: 10 }, from: { x: 265, y: 120 }, angle: -120, appearAt: 700, delay: 700, vanishAt: 1800 },
      { id: 'mCarb2', kind: 'molecule', molecule: 'CO', at: { x: 560, y: 16 }, from: { x: 450, y: 140 }, angle: -60, appearAt: 700, delay: 700, vanishAt: 1800 },
      // The third carbon comes down with the charge and bridges the two silicons: the carbide.
      { id: 'cBridge', kind: 'atom', element: 'C', at: { x: 325, y: 205 }, from: { x: 420, y: 30 }, delay: 700, appearAt: 700 },
    ],
    bonds: [
      { a: 'siA', b: 'oBridge' },
      { a: 'siB', b: 'oBridge' },
      { a: 'siA', b: 'oOutA' },
      { a: 'siB', b: 'oOutB' },
      { a: 'siA', b: 'cBridge' },
      { a: 'siB', b: 'cBridge' },
    ],
    exhaust: true,
  },

  /* ------------------------------------------------------------------ 2 */
  {
    id: 'reduction',
    zone: 'bath',
    tab: { pt: 'Redução', en: 'Reduction' },
    temp: '>1780 °C',
    equation: 'SiO₂ + 2SiC → 3Si + 2CO',
    title: {
      pt: 'O silício se solta',
      en: 'Silicon comes loose',
    },
    note: {
      pt: 'Mais fundo, o carbeto desce e encontra o quartzo restante. O carbono leva o oxigênio embora e os átomos de silício se ligam entre si: é o metal líquido que se acumula no fundo do forno.',
      en: 'Deeper down, the carbide descends and meets the remaining quartz. The carbon carries the oxygen away and the silicon atoms bond to each other: that is the molten metal collecting at the bottom of the furnace.',
    },
    actors: [
      // A carbide unit descending from the charge above…
      { id: 'siC1', kind: 'atom', element: 'Si', at: { x: 285, y: 368 }, from: { x: 265, y: 250 } },
      { id: 'cRed', kind: 'atom', element: 'C', at: along({ x: 330, y: 120 }, -90, -HALF), from: { x: 265, y: 185 }, vanishAt: 750 },
      // …and a silica fragment waiting beside it.
      { id: 'siQ1', kind: 'atom', element: 'Si', at: { x: 375, y: 368 }, from: { x: 405, y: 250 } },
      { id: 'oRed', kind: 'atom', element: 'O', at: along({ x: 330, y: 120 }, -90, HALF), from: { x: 405, y: 185 }, vanishAt: 750 },
      { id: 'mRed', kind: 'molecule', molecule: 'CO', at: { x: 330, y: 6 }, from: { x: 330, y: 120 }, angle: -90, appearAt: 750, delay: 750, vanishAt: 1900 },
      // The metal: three silicon atoms meeting inside a droplet that grows behind them.
      { id: 'siMelt', kind: 'atom', element: 'Si', at: { x: 330, y: 392 }, from: { x: 330, y: 490 }, delay: 500 },
      { id: 'drop', kind: 'blob', at: { x: 330, y: 382 }, radius: 66, fromRadius: 8, delay: 600 },
    ],
    bonds: [
      { a: 'siC1', b: 'cRed' },
      { a: 'siQ1', b: 'oRed' },
      { a: 'siC1', b: 'siMelt' },
      { a: 'siQ1', b: 'siMelt' },
      { a: 'siC1', b: 'siQ1' },
    ],
    exhaust: true,
  },

  /* ------------------------------------------------------------------ 3 */
  {
    id: 'gas',
    zone: 'rise',
    tab: { pt: 'Gás SiO', en: 'SiO gas' },
    temp: '>1780 °C',
    equation: '2SiO₂ + SiC → 3SiO (g) + CO (g)',
    title: {
      pt: 'Parte do silício sai como gás',
      en: 'Part of the silicon leaves as a gas',
    },
    note: {
      pt: 'A terceira reação abre a válvula de escape do forno: quartzo e carbeto formam monóxido de silício gasoso, que sobe junto com o CO. É por essa porta que o forno perde silício — e é por ela que ele o recupera.',
      en: 'The third reaction opens the furnace’s escape valve: quartz and carbide form gaseous silicon monoxide, which rises together with the CO. That is the door through which the furnace loses silicon — and the door through which it gets it back.',
    },
    actors: [
      // The fragment, with its two terminal oxygens closer in: they leave as SiO.
      { id: 'siAG', kind: 'atom', element: 'Si', at: { x: 255, y: 300 }, from: { x: 255, y: 300 }, vanishAt: 700 },
      { id: 'oOutAG', kind: 'atom', element: 'O', at: { x: 212, y: 262 }, from: { x: 212, y: 262 }, vanishAt: 700 },
      { id: 'siBG', kind: 'atom', element: 'Si', at: { x: 405, y: 300 }, from: { x: 405, y: 300 }, vanishAt: 700 },
      { id: 'oOutBG', kind: 'atom', element: 'O', at: { x: 448, y: 262 }, from: { x: 448, y: 262 }, vanishAt: 700 },
      { id: 'oBridgeG', kind: 'atom', element: 'O', at: { x: 330, y: 245 }, from: { x: 330, y: 245 }, vanishAt: 700 },
      // The carbon of the carbide, under the bridge.
      { id: 'cGas', kind: 'atom', element: 'C', at: { x: 330, y: 305 }, from: { x: 330, y: 305 }, vanishAt: 700 },
      // Three molecules leave: two SiO carrying silicon up, one CO carrying carbon.
      { id: 'mGas1', kind: 'molecule', molecule: 'SiO', at: { x: 250, y: 105 }, from: { x: 233, y: 281 }, angle: -100, appearAt: 700, delay: 700 },
      { id: 'mGas2', kind: 'molecule', molecule: 'SiO', at: { x: 410, y: 115 }, from: { x: 427, y: 281 }, angle: -80, appearAt: 700, delay: 700 },
      { id: 'mGas3', kind: 'molecule', molecule: 'CO', at: { x: 330, y: 95 }, from: { x: 330, y: 275 }, angle: -90, appearAt: 700, delay: 700, vanishAt: 1700 },
    ],
    bonds: [
      { a: 'siAG', b: 'oBridgeG' },
      { a: 'siBG', b: 'oBridgeG' },
      { a: 'siAG', b: 'oOutAG' },
      { a: 'siBG', b: 'oOutBG' },
    ],
    exhaust: true,
  },

  /* ------------------------------------------------------------------ 4 */
  {
    id: 'loop',
    zone: 'return',
    tab: { pt: 'Ciclo', en: 'Loop' },
    temp: '~1600 °C',
    equation: '3SiO (g) + CO (g) → 2SiO₂ + SiC',
    title: {
      pt: 'O gás volta a virar carga',
      en: 'The gas turns back into charge',
    },
    note: {
      pt: 'Nas zonas frias a reação corre ao contrário: SiO e CO recompõem quartzo e carbono, que caem de volta na carga. Por isso o forno é autossuficiente em reagentes — ele gasta energia elétrica, não matéria-prima.',
      en: 'In the cooler zones the reaction runs backwards: SiO and CO rebuild quartz and carbon, which fall back into the charge. That is why the furnace is self-sufficient in reactants — it spends electricity, not raw material.',
    },
    actors: [
      // The same three molecules that rose in the previous beat, arriving at the cool zone.
      { id: 'mGas1', kind: 'molecule', molecule: 'SiO', at: { x: 245, y: 100 }, from: { x: 245, y: 100 }, angle: -100, vanishAt: 500 },
      { id: 'mGas2', kind: 'molecule', molecule: 'SiO', at: { x: 405, y: 105 }, from: { x: 405, y: 105 }, angle: -80, vanishAt: 500 },
      { id: 'mGas3', kind: 'molecule', molecule: 'CO', at: { x: 330, y: 85 }, from: { x: 330, y: 85 }, angle: -90, vanishAt: 500 },
      // Recombining into the charge: the fragment stage 1 started from.
      { id: 'siA', kind: 'atom', element: 'Si', at: { x: 245, y: 265 }, from: { x: 245, y: 100 }, appearAt: 500 },
      { id: 'siB', kind: 'atom', element: 'Si', at: { x: 400, y: 265 }, from: { x: 405, y: 105 }, appearAt: 500 },
      { id: 'oBridge', kind: 'atom', element: 'O', at: { x: 325, y: 205 }, from: { x: 330, y: 85 }, appearAt: 500 },
      { id: 'oOutA', kind: 'atom', element: 'O', at: { x: 175, y: 215 }, from: { x: 218, y: 92 }, appearAt: 500 },
      { id: 'oOutB', kind: 'atom', element: 'O', at: { x: 470, y: 215 }, from: { x: 432, y: 97 }, appearAt: 500 },
      // The carbon that came down with the gas, back in the charge as free carbon.
      { id: 'cBack', kind: 'atom', element: 'C', at: { x: 330, y: 355 }, from: { x: 330, y: 85 }, appearAt: 500 },
    ],
    bonds: [
      { a: 'siA', b: 'oBridge' },
      { a: 'siB', b: 'oBridge' },
      { a: 'siA', b: 'oOutA' },
      { a: 'siB', b: 'oOutB' },
    ],
    exhaust: false,
  },
]
