/**
 * Scanner presets for `RayleighCalculator.vue`: the wavelength and numerical aperture of four
 * generations, each with the `citations.ts` keys that publish them.
 *
 * Only values the cited sources state are here. ASML's immersion story gives NA 0.93 for the last dry
 * ArF scanners and 1.2 for the first immersion one (XT:1700Fi, 2006); the NXE and EXE pages give 0.33
 * and 0.55. k1 is the reader's control: the chapter cites a k1 near 0.3 for the EUV figures.
 */
export interface ScannerPreset {
  id: string
  label: { pt: string; en: string }
  wavelength: number
  na: number
  sourceIds: string[]
}

export const RAYLEIGH_PRESETS: ScannerPreset[] = [
  {
    id: 'arf-dry',
    label: { pt: 'ArF seco', en: 'Dry ArF' },
    wavelength: 193,
    na: 0.93,
    sourceIds: ['asml-immersion'],
  },
  {
    id: 'arf-immersion',
    label: { pt: 'ArF imersão (2006)', en: 'ArF immersion (2006)' },
    wavelength: 193,
    na: 1.2,
    sourceIds: ['asml-immersion'],
  },
  {
    id: 'euv-nxe',
    label: { pt: 'EUV, NXE', en: 'EUV, NXE' },
    wavelength: 13.5,
    na: 0.33,
    sourceIds: ['asml-nxe3600d'],
  },
  {
    id: 'euv-exe',
    label: { pt: 'EUV High-NA, EXE', en: 'High-NA EUV, EXE' },
    wavelength: 13.5,
    na: 0.55,
    sourceIds: ['asml-highna'],
  },
]

/** The k1 range a reader can try: 0.25 is the theoretical floor for a single exposure. */
export const K1_MIN = 0.25
export const K1_MAX = 0.8
export const K1_STEP = 0.01
export const K1_DEFAULT = 0.3
