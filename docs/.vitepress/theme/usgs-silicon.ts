/**
 * World production of silicon metal and ferrosilicon, in thousand tonnes, from the USGS Mineral
 * Commodity Summaries. The interactive chart and the table in the Introduction both read this
 * list, so the two cannot disagree.
 *
 * Three rules are baked into the numbers:
 *
 *  - the MCS prints the two products in separate columns from the 2024 edition onward, which
 *    carries 2022; the 2020–2023 editions published them added together, on a silicon-content
 *    basis, so this series cannot start before 2022;
 *  - each column is the most recent estimate published for that year, and every edition revises
 *    the years before it (the 2026 edition raised China's 2024 silicon metal figure from 3,900 to
 *    4,800 and lowered its ferrosilicon figure from 3,500 to 3,100);
 *  - the world row is the MCS world total, which excludes U.S. production (withheld as `W`).
 *
 * Both products carry the same countries, ordered by the silicon metal ranking; in the
 * ferrosilicon ranking Russia sits second and France is a minor producer.
 */

/** Column order for both products, in the chart's x axis and in the tables. */
export const USGS_SILICON_YEARS = [2022, 2023, 2024, 2025]

/** The MCS edition behind each column's latest estimate, same order as `USGS_SILICON_YEARS`. */
export const USGS_SILICON_EDITIONS = [
  'usgs-mcs-2024',
  'usgs-mcs-2025',
  'usgs-mcs-2026',
  'usgs-mcs-2026',
]

/** The two products: the union the consumers switch on, and the names every label is drawn from. */
export type UsgsSiliconProduct = 'metal' | 'ferro'

export const USGS_SILICON_PRODUCT_NAMES: Record<UsgsSiliconProduct, { pt: string; en: string }> = {
  metal: { pt: 'Silício metálico', en: 'Silicon metal' },
  ferro: { pt: 'Ferrossilício', en: 'Ferrosilicon' },
}

export interface UsgsSiliconProducer {
  /** Portuguese and English row labels, both required so the locales cannot drift. */
  pt: string
  en: string
  /** Thousand tonnes per year, one value per entry in `USGS_SILICON_YEARS`. */
  metal: number[]
  /** Ferrosilicon, same years. */
  ferro: number[]
  color: string
  /** The world row: dashed in the chart, bold in the table. */
  total?: boolean
  /** Filled area under the line, for the series the chart leads with. */
  fill?: boolean
}

export const USGS_SILICON_PRODUCERS: UsgsSiliconProducer[] = [
  {
    pt: 'China',
    en: 'China',
    metal: [2900, 3630, 4800, 4000],
    ferro: [3770, 3640, 3100, 3500],
    color: '#2b6cb0',
    fill: true,
  },
  {
    pt: 'Brasil',
    en: 'Brazil',
    metal: [202, 196, 190, 180],
    ferro: [189, 190, 160, 170],
    color: '#38a169',
  },
  {
    pt: 'Noruega',
    en: 'Norway',
    metal: [144, 123, 140, 130],
    ferro: [195, 176, 160, 150],
    color: '#805ad5',
  },
  {
    pt: 'França',
    en: 'France',
    metal: [96, 90, 90, 68],
    ferro: [25, 23, 21, 21],
    color: '#a0aec0',
  },
  {
    pt: 'Rússia',
    en: 'Russia',
    metal: [54, 54, 59, 35],
    ferro: [572, 473, 420, 420],
    color: '#e53e3e',
  },
  {
    pt: 'Mundo (total)',
    en: 'World (total)',
    metal: [3670, 4280, 5500, 4600],
    ferro: [5440, 5190, 4600, 5000],
    color: '#4a5568',
    total: true,
  },
]
