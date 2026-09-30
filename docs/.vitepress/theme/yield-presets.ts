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
 * The defect density is deliberately *not* part of a preset. It is the reader's control, because the
 * density is what the fab knows and the reader does not, and because holding it fixed is what makes
 * two presets comparable at all.
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
}

export const YIELD_PRESETS: YieldPreset[] = [
  {
    id: 'zeppelin',
    product: 'EPYC 7001',
    die: 'Zeppelin',
    year: 2017,
    areaMm2: 213,
    cite: 'amd-chiplet-economics',
  },
  {
    id: 'tu102',
    product: 'GeForce RTX 2080 Ti',
    die: 'TU102',
    year: 2018,
    areaMm2: 754,
    cite: 'nvidia-ada-whitepaper',
  },
  {
    id: 'ga102',
    product: 'GeForce RTX 3090',
    die: 'GA102',
    year: 2020,
    areaMm2: 628.4,
    cite: 'nvidia-ada-whitepaper',
  },
  {
    id: 'ad102',
    product: 'GeForce RTX 4090',
    die: 'AD102',
    year: 2022,
    areaMm2: 608.5,
    cite: 'nvidia-ada-whitepaper',
  },
  {
    id: 'gb202',
    product: 'GeForce RTX 5090',
    die: 'GB202',
    year: 2025,
    areaMm2: 750,
    cite: 'nvidia-blackwell-whitepaper',
  },
]
