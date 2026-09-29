/**
 * The visual vocabulary of the home page, shared by the chain and the section cards.
 *
 * `StageIconName` is one drawing each in `StageIcon.vue`; `STAGE_ACCENTS` is the one place the
 * stage colours are written down, so the card grid, the flow and anything added later cannot
 * disagree about what "refining" looks like. Consumers store the accent *key*; the hex resolves
 * in the component.
 */
export type StageIconName =
  | 'crystal'
  | 'column'
  | 'wafer'
  | 'mask'
  | 'transistor'
  | 'package'
  | 'solar'
  | 'book'
  | 'chart'

export const STAGE_ACCENTS = {
  /** Raw material: quartz, the arc furnace. */
  raw: '#ed8936',
  /** Refining: chemistry, the polysilicon market. */
  refine: '#9f7aea',
  /** The wafer: Czochralski growth, slicing, polishing. */
  wafer: '#4299e1',
  /** The fab: lithography and the process loop. */
  fab: '#38b2ac',
  /** Devices: transistors and reliability. */
  device: '#48bb78',
  /** After the fab: dicing, assembly and test. */
  package: '#ed64a6',
  /** The solar branch, where the same wafer goes. */
  solar: '#d69e2e',
  /** Reference pages: neither a stage nor a product. */
  reference: '#94a3b8',
} as const

export type StageAccent = keyof typeof STAGE_ACCENTS
