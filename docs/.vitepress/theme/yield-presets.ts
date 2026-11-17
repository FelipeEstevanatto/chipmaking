/**
 * Real dies the yield explorer can be set to.
 *
 * The explorer models one die on one wafer, so a preset only carries the one number the model needs:
 * the published **die area**. Every area here comes from the party that designed the die, which is
 * also the party that publishes it, so there is no compilation entry and no third-party measurement:
 * Nvidia prints the die size in its architecture whitepapers, and AMD's chiplet figure is the one the
 * packaging chapter already cites.
 *
 * Two rules keep this list honest, and both are why the list is short:
 *
 *   - The product is named, and the die behind it too. A reader has to be able to see that an RTX
 *     5090 is one GB202 die and not a package, because the model knows nothing about packages.
 *   - Only monolithic dies go in. A chiplet product (Ryzen, EPYC, Raptor Lake, M3 Max) is several
 *     dies, and its yield is not one die's yield, so the entry names the single chiplet instead.
 *
 * A preset also names the process the die is made on, as the designer prints it, and points at the
 * nearest defect density a foundry has published (`yield-references.ts`). No foundry publishes D₀
 * for a customer's die, so the mark is a starting point the reader can move, and a die whose
 * foundry never disclosed one (Samsung 8N) has none. The wafer-price row is the nearest node in
 * CSET's table, which prices TSMC wafers only.
 */

export type YieldPreset = {
  id: string
  /** Product name, as the vendor writes it. A proper noun, so it is its own label in both locales. */
  product: string
  /** Die code, so a multi-die product is not mistaken for a monolithic one. */
  die: string
  year: number
  /** Published die area, in mm². */
  areaMm2: number
  /** The document the area is printed in. */
  cite: string
  /** Process as the designer names it, and the document that names it. */
  process: string
  processCite: string
  /** `DENSITY_MARKS` id of the nearest published D₀, or null when the foundry never disclosed one. */
  densityMark: string | null
  /** Node row of `WAFER_PRICES` closest to this process. */
  priceNode: string
}

export const YIELD_PRESETS: YieldPreset[] = [
  {
    id: 'zeppelin',
    product: 'EPYC 7001',
    die: 'Zeppelin',
    year: 2017,
    areaMm2: 213,
    cite: 'amd-chiplet-economics',
    process: '14 nm FinFET',
    processCite: 'amd-zeppelin-jssc',
    densityMark: 'samsung-14',
    priceNode: '16/12 nm',
  },
  {
    id: 'tu102',
    product: 'GeForce RTX 2080 Ti',
    die: 'TU102',
    year: 2018,
    areaMm2: 754,
    cite: 'nvidia-ada-whitepaper',
    process: 'TSMC 12 nm FFN',
    processCite: 'nvidia-ada-whitepaper',
    densityMark: 'tsmc-n16',
    priceNode: '16/12 nm',
  },
  {
    id: 'ga102',
    product: 'GeForce RTX 3090',
    die: 'GA102',
    year: 2020,
    areaMm2: 628.4,
    cite: 'nvidia-ada-whitepaper',
    process: 'Samsung 8 nm 8N',
    processCite: 'nvidia-ada-whitepaper',
    densityMark: null,
    priceNode: '10 nm',
  },
  {
    id: 'ad102',
    product: 'GeForce RTX 4090',
    die: 'AD102',
    year: 2022,
    areaMm2: 608.5,
    cite: 'nvidia-ada-whitepaper',
    process: 'TSMC 4N',
    processCite: 'nvidia-ada-whitepaper',
    densityMark: 'tsmc-n5',
    priceNode: '5 nm',
  },
  {
    id: 'gb202',
    product: 'GeForce RTX 5090',
    die: 'GB202',
    year: 2025,
    areaMm2: 750,
    cite: 'nvidia-blackwell-whitepaper',
    process: 'TSMC 4N',
    processCite: 'nvidia-blackwell-whitepaper',
    densityMark: 'tsmc-n5',
    priceNode: '5 nm',
  },
]
