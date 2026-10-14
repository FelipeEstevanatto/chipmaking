/**
 * The seven modules of the fab loop, as data for `FabProcess.vue`.
 *
 * Same shape as `furnace-stages.ts`: one entry per beat, each string authored once per locale, a
 * `mode` that tells the 3D scene which process rig to show, and a small set of shapes that the
 * cross-section draws. Keeping it here rather than inside the component is what lets the step list,
 * the caption and the drawing stay in step with the chapter.
 *
 * The shapes live in a 0..100 square: x runs left to right, y runs top to bottom, so y = 100 is the
 * bottom of the silicon. They are a schematic of the layer stack, not a measurement.
 */

/** Which process rig the 3D scene shows for this module. */
export type FabMode = 'furnace' | 'deposit' | 'coat' | 'etch' | 'implant' | 'cmp' | 'measure'

/** One line of the live readout the 3D scene prints while a process runs. */
export interface FabReadout {
  id: string
  value: string
}

/**
 * The words the readout uses. A rig only knows its ids and numbers; the labels live here, paired,
 * so the panel reads in the reader's language and no Portuguese word can reach the English page.
 */
export const READOUT_LABELS: Record<string, { pt: string; en: string }> = {
  temperature: { pt: 'Temperatura', en: 'Temperature' },
  oxide: { pt: 'Óxido', en: 'Oxide' },
  gas: { pt: 'Gás', en: 'Gas' },
  cycles: { pt: 'Ciclos ALD', en: 'ALD cycles' },
  film: { pt: 'Filme', en: 'Film' },
  gpc: { pt: 'Por ciclo', en: 'Per cycle' },
  spin: { pt: 'Rotação', en: 'Spin' },
  resist: { pt: 'Fotoresistor', en: 'Photoresist' },
  bake: { pt: 'Recozimento', en: 'Soft bake' },
  wavelength: { pt: 'Comprimento de onda', en: 'Wavelength' },
  dose: { pt: 'Dose', en: 'Dose' },
  develop: { pt: 'Revelação', en: 'Development' },
  pattern: { pt: 'Padrão', en: 'Pattern' },
  depth: { pt: 'Profundidade', en: 'Depth' },
  selectivity: { pt: 'Seletividade', en: 'Selectivity' },
  energy: { pt: 'Energia', en: 'Energy' },
  range: { pt: 'Alcance', en: 'Range' },
  pressure: { pt: 'Pressão', en: 'Pressure' },
  removed: { pt: 'Removido', en: 'Removed' },
  rate: { pt: 'Taxa', en: 'Rate' },
  method: { pt: 'Método', en: 'Method' },
  precision: { pt: 'Precisão', en: 'Precision' },
}


export interface FabShape {
  x: number
  y: number
  w: number
  h: number
  fill: string
  stroke: string
  labelPt?: string
  labelEn?: string
  labelColor?: string
}

export interface FabStage {
  id: string
  mode: FabMode
  labelPt: string
  labelEn: string
  captionPt: string
  captionEn: string
  shapes: FabShape[]
}

const SI = { fill: '#cbd5e0', stroke: '#a0aec0' }
const OX = { fill: '#f6e05e', stroke: '#b7791f' }
const FILM = { fill: '#a0aec0', stroke: '#718096' }
const RESIST = { fill: '#b794f4', stroke: '#6b46c1' }
const DOPE = { fill: '#90cdf4', stroke: '#2b6cb0' }

/** The silicon body, present in every stage. */
const si = (): FabShape => ({ x: 8, y: 62, w: 84, h: 36, ...SI })
/** The oxide the first stage grows. */
const oxide = (): FabShape => ({ x: 8, y: 54, w: 84, h: 8, ...OX, labelPt: 'SiO₂', labelEn: 'SiO₂' })
const film = (x = 8, w = 84): FabShape => ({ x, y: 44, w, h: 10, ...FILM })
const resist = (x = 8, w = 84): FabShape => ({ x, y: 34, w, h: 10, ...RESIST, labelPt: 'resiste', labelEn: 'resist', labelColor: '#ffffff' })

export const FAB_STAGES: FabStage[] = [
  {
    id: 'oxidation',
    mode: 'furnace',
    labelPt: 'Oxidação',
    labelEn: 'Oxidation',
    captionPt: 'O forno aquece o wafer e o próprio silício cresce uma camada de SiO₂ na superfície.',
    captionEn: 'The furnace heats the wafer and the silicon itself grows a silicon dioxide layer on the surface.',
    shapes: [si(), oxide()],
  },
  {
    id: 'deposition',
    mode: 'deposit',
    labelPt: 'Deposição',
    labelEn: 'Deposition',
    captionPt: 'Átomos chegam um a um e formam um filme fino sobre o óxido.',
    captionEn: 'Atoms arrive one at a time and build a thin film on the oxide.',
    shapes: [si(), oxide(), film()],
  },
  {
    id: 'lithography',
    mode: 'coat',
    labelPt: 'Litografia',
    labelEn: 'Lithography',
    captionPt: 'Primeiro o fotoresistor cai como uma gota e o wafer gira para espalhá-lo por igual; depois a luz ultravioleta atravessa a máscara e imprime o padrão.',
    captionEn: 'First the photoresist lands as a drop and the wafer spins to spread it evenly; then ultraviolet light crosses the mask and prints the pattern.',
    shapes: [si(), oxide(), film(), resist()],
  },
  {
    id: 'etch',
    mode: 'etch',
    labelPt: 'Corrosão',
    labelEn: 'Etching',
    captionPt: 'O plasma desce sobre o wafer e remove o filme onde a máscara abriu, parando no óxido.',
    captionEn: 'The plasma descends on the wafer and removes the film where the mask opened, stopping on the oxide.',
    shapes: [si(), oxide(), film(8, 30), film(62, 30), resist(8, 30), resist(62, 30)],
  },
  {
    id: 'implant',
    mode: 'implant',
    labelPt: 'Implantação',
    labelEn: 'Ion implantation',
    captionPt: 'Um feixe de íons desce pela abertura e dopa uma região do silício.',
    captionEn: 'A beam of ions comes down through the opening and dopes a region of the silicon.',
    shapes: [
      si(),
      oxide(),
      film(8, 30),
      film(62, 30),
      resist(8, 30),
      resist(62, 30),
      { x: 40, y: 62, w: 20, h: 20, ...DOPE, labelPt: 'dopado', labelEn: 'doped', labelColor: '#1a365d' },
    ],
  },
  {
    id: 'cmp',
    mode: 'cmp',
    labelPt: 'Planarização',
    labelEn: 'Planarisation',
    captionPt: 'Um disco de polimento gira contra o wafer e apaga o relevo: o resiste sai e a superfície volta a ser plana.',
    captionEn: 'A polishing pad turns against the wafer and erases the relief: the resist goes and the surface is flat again.',
    shapes: [si(), oxide(), film()],
  },
  {
    id: 'metrology',
    mode: 'measure',
    labelPt: 'Metrologia',
    labelEn: 'Metrology',
    captionPt: 'Uma sonda varre a superfície e confere a espessura e a largura antes da volta seguinte.',
    captionEn: 'A probe sweeps the surface and checks the thickness and the width before the next lap.',
    shapes: [
      si(),
      oxide(),
      film(),
      { x: 30, y: 28, w: 40, h: 2, fill: '#2f855a', stroke: '#276749', labelPt: 'medida', labelEn: 'measurement', labelColor: '#2f855a' },
    ],
  },
]
