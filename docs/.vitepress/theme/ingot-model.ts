/**
 * Dopant segregation along a Czochralski ingot, for `IngotDopingExplorer.vue`.
 *
 * Normal freezing (Pfann 1952): when a fraction g of the melt has solidified, the dopant
 * concentration in the crystal is C(g) = k·C0·(1 − g)^(k − 1). With resistivity taken as inversely
 * proportional to concentration (mobility held fixed, which the explorer says), the resistivity
 * relative to the head is ρ(g)/ρ(0) = (1 − g)^(1 − k).
 *
 * The segregation coefficients are the ones the wafer chapter cites. Nothing else is assumed.
 */

export interface Dopant {
  id: string
  label: { pt: string; en: string }
  k: number
  color: string
}

export const DOPANTS: Dopant[] = [
  { id: 'boron', label: { pt: 'Boro (tipo p)', en: 'Boron (p-type)' }, k: 0.8, color: '#2b6cb0' },
  { id: 'phosphorus', label: { pt: 'Fósforo (tipo n)', en: 'Phosphorus (n-type)' }, k: 0.35, color: '#2f855a' },
  { id: 'gallium', label: { pt: 'Gálio (tipo p)', en: 'Gallium (p-type)' }, k: 0.008, color: '#c05621' },
]

export const SOURCE_IDS = ['pfann-1952', 'lid-hallam']

/** Tolerance bands a reader can pick, as the allowed fall in resistivity from the head value. */
export const TOLERANCES = [0.1, 0.25, 0.5]

/** Resistivity at fraction solidified g, relative to the head of the ingot. */
export function relativeResistivity(k: number, g: number): number {
  return Math.pow(1 - g, 1 - k)
}

/** Concentration at fraction solidified g, relative to the starting melt concentration C0. */
export function relativeConcentration(k: number, g: number): number {
  return k * Math.pow(1 - g, k - 1)
}

/**
 * The fraction of the ingot, from the head, whose resistivity stays within `tol` of the head value:
 * (1 − g)^(1 − k) ≥ 1 − tol  ⇒  g ≤ 1 − (1 − tol)^(1 / (1 − k)).
 */
export function usableFraction(k: number, tol: number): number {
  return 1 - Math.pow(1 - tol, 1 / (1 - k))
}
