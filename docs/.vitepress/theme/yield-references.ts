/**
 * Published reference values the yield explorer offers next to its controls: defect densities that
 * foundries have disclosed, a foundry wafer price by node, and the range the clustering factor takes
 * in the literature.
 *
 * Foundries publish D₀ per process, never per customer die, and only a few times. Each mark keeps
 * the year it was stated and the bound the foundry gave ("below 0.06" is not "0.06"), and the
 * explorer prints both, so a reader can tell a 2016 figure from a 2020 one.
 */

import { DEFECT_DENSITIES } from './yield-model'

export type DensityMark = {
  id: string
  /** Process as the foundry names it. A proper noun, so it is its own label in both locales. */
  process: string
  /** The value the slider moves to. */
  d0: number
  /** How the foundry stated it: an upper bound or a measured band. */
  stated: { pt: string; en: string }
  /** The same bound in the few characters a dropdown option has room for. */
  short: { pt: string; en: string }
  year: number
  cite: string
  /** Extra context printed when a preset lands on this mark, with its own source. */
  note?: { pt: string; en: string; cite: string }
}

export const DENSITY_MARKS: DensityMark[] = [
  {
    id: 'tsmc-n16',
    process: 'TSMC N16',
    d0: 0.06,
    stated: { pt: 'abaixo de 0,06', en: 'below 0.06' },
    short: { pt: '< 0,06', en: '< 0.06' },
    year: 2016,
    cite: 'cadence-tsmc-2016',
  },
  {
    id: 'samsung-14',
    process: 'Samsung 14 nm',
    d0: 0.2,
    stated: { pt: 'abaixo de 0,2', en: 'below 0.2' },
    short: { pt: '< 0,2', en: '< 0.2' },
    year: 2016,
    cite: 'anandtech-samsung-14nm',
    note: {
      pt: 'A GlobalFoundries fabrica o 14 nm FinFET sob licença da Samsung.',
      en: 'GlobalFoundries makes 14 nm FinFET under licence from Samsung.',
      cite: 'samsung-gf-14nm',
    },
  },
  {
    id: 'tsmc-n7',
    process: 'TSMC N7',
    d0: 0.09,
    stated: { pt: '0,09', en: '0.09' },
    short: { pt: '0,09', en: '0.09' },
    year: 2019,
    cite: 'anandtech-tsmc-d0',
  },
  {
    id: 'tsmc-n5',
    process: 'TSMC N5',
    d0: 0.1,
    stated: { pt: '0,10 a 0,11', en: '0.10 to 0.11' },
    short: { pt: '0,10–0,11', en: '0.10–0.11' },
    year: 2020,
    cite: 'anandtech-tsmc-d0',
  },
]

/**
 * The densities the slider steps through: the chart's five values plus every published mark, so a
 * mark is always a position the slider can reach and the chart's values stay on it.
 */
export const DENSITY_STEPS: number[] = [...new Set([...DEFECT_DENSITIES, ...DENSITY_MARKS.map((m) => m.d0)])].sort(
  (a, b) => a - b,
)

/**
 * CSET's modelled TSMC sale price for one 300 mm wafer in 2020, by node (Appendix B, Table 9,
 * line 7). An estimate built from TSMC's financials, and the note on the citation says so.
 */
export const WAFER_PRICES: { node: string; usd: number }[] = [
  { node: '90 nm', usd: 1650 },
  { node: '65 nm', usd: 1937 },
  { node: '40 nm', usd: 2274 },
  { node: '28 nm', usd: 2891 },
  { node: '20 nm', usd: 3677 },
  { node: '16/12 nm', usd: 3984 },
  { node: '10 nm', usd: 5992 },
  { node: '7 nm', usd: 9346 },
  { node: '5 nm', usd: 16988 },
]
export const WAFER_PRICE_SOURCE = 'cset-ai-chips'
export const WAFER_PRICE_YEAR = 2020

/** Typical published range of the clustering factor α. */
export const ALPHA_RANGE = { min: 0.3, max: 7, cite: 'bogdanov-clustering' }

