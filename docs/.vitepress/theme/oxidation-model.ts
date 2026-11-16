/**
 * Deal–Grove thermal oxidation, for `OxidationExplorer.vue`.
 *
 * x² + A·x = B·t with no initial oxide gives x = (A/2)(√(1 + 4Bt/A²) − 1). B and B/A follow
 * Arrhenius laws with the constants tabulated in the Stanford EE212 handout, used as published (the
 * handout states no crystal orientation, and neither does the explorer). They are the same constants
 * behind the `deal-grove-oxidation` chart, so the chart and the explorer cannot disagree.
 */

const K_B = 8.617e-5 // eV/K

export type Oxidant = 'dry' | 'wet'

/** Prefactors in µm²/h and µm/h, activation energies in eV. */
export const DEAL_GROVE: Record<Oxidant, { c1: number; e1: number; c2: number; e2: number }> = {
  dry: { c1: 7.72e2, e1: 1.23, c2: 6.23e6, e2: 2.0 },
  wet: { c1: 3.86e2, e1: 0.78, c2: 1.63e8, e2: 2.05 },
}

export const SOURCE_IDS = ['deal-grove-1965', 'stanford-ee212-oxidation']

/** The paper's validated range is 700 to 1,300 °C; the explorer stays inside it. */
export const T_MIN = 800
export const T_MAX = 1200
export const T_STEP = 10
export const HOURS_MIN = 0.1
export const HOURS_MAX = 10

export function rateConstants(oxidant: Oxidant, celsius: number): { B: number; A: number } {
  const k = DEAL_GROVE[oxidant]
  const kelvin = celsius + 273.15
  const B = k.c1 * Math.exp(-k.e1 / (K_B * kelvin))
  const BA = k.c2 * Math.exp(-k.e2 / (K_B * kelvin))
  return { B, A: B / BA }
}

/** Oxide thickness in nanometres after `hours` at `celsius`. */
export function thicknessNm(oxidant: Oxidant, celsius: number, hours: number): number {
  const { A, B } = rateConstants(oxidant, celsius)
  return 1000 * (A / 2) * (Math.sqrt(1 + (4 * B * hours) / (A * A)) - 1)
}

/**
 * The crossover time A²/4B: well before it growth is linear (reaction-limited), well after it
 * parabolic (diffusion-limited).
 */
export function crossoverHours(oxidant: Oxidant, celsius: number): number {
  const { A, B } = rateConstants(oxidant, celsius)
  return (A * A) / (4 * B)
}
