/**
 * The two yield models the chapter names, plus a sampler that draws one wafer from them.
 *
 * Poisson is `Y = e^(−D₀A)`: defects land independently, so the count on a die is
 * Poisson(D₀·A). Clustered defects break that assumption, and the correction the industry uses is
 * the negative binomial, `Y = (1 + D₀·A/α)^(−α)`, which is the same Poisson law mixed over a
 * gamma-distributed defect rate. α is the clustering factor: α → ∞ gives Poisson back, α = 1 is the
 * Seeds model, and smaller α means the defects arrive in worsening clumps.
 *
 * `sampleWafer` draws exactly that mixture, die by die, so the picture and the curve come from one
 * definition. The numbers are the model's, not a measurement: D₀ is fixed at a value that makes the
 * difference legible on a 300 mm wafer, and the map is one draw of it.
 */

/** Defects per cm². The yield chart on the page uses the same order of magnitude. */
export const DEFECT_DENSITY = 0.5

/** The wafer every drawing is cut from, and how much of the rim is unusable. */
export const WAFER_MM = 300
export const EDGE_MM = 3

/** Clustering factors on offer, from Poisson to heavily clumped. */
export const ALPHAS = [Infinity, 16, 8, 4, 2, 1, 0.5] as const

/** Die area in mm², the other control. */
export const AREA_MIN = 200
export const AREA_MAX = 800
export const AREA_STEP = 50

export type DieCentre = { x: number; y: number }

/** Centre of a die in millimetres, measured from the centre of the wafer. */
export function dieGrid(areaMm2: number): DieCentre[] {
  const half = Math.sqrt(areaMm2) / 2
  const usable = WAFER_MM / 2 - EDGE_MM
  const count = Math.floor((2 * usable) / (2 * half))
  const dies: DieCentre[] = []
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      const x = (i + 0.5) * 2 * half - usable
      const y = (j + 0.5) * 2 * half - usable
      // The whole square has to fit inside the usable disc, corners included.
      if (Math.hypot(Math.abs(x) + half, Math.abs(y) + half) <= usable) dies.push({ x, y })
    }
  }
  return dies
}

/** Mean defects per die for a die of this area. */
export function lambdaFor(areaMm2: number): number {
  return (DEFECT_DENSITY * areaMm2) / 100
}

export function poissonYield(lambda: number): number {
  return Math.exp(-lambda)
}

export function clusteredYield(lambda: number, alpha: number): number {
  if (!Number.isFinite(alpha)) return poissonYield(lambda)
  return Math.pow(1 + lambda / alpha, -alpha)
}

/** Seeded PRNG, so one setting always draws the same wafer and two settings can be compared. */
export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Rng = () => number

/** Marsaglia–Tsang gamma variate. */
function gammaVariate(rng: Rng, shape: number): number {
  if (shape < 1) return gammaVariate(rng, shape + 1) * Math.pow(rng(), 1 / shape)
  const d = shape - 1 / 3
  const c = 1 / Math.sqrt(9 * d)
  for (;;) {
    let x: number
    let v: number
    do {
      x = Math.sqrt(-2 * Math.log(rng())) * Math.cos(2 * Math.PI * rng())
      v = 1 + c * x
    } while (v <= 0)
    v = v * v * v
    const u = rng()
    if (u < 1 - 0.0331 * x * x * x * x) return d * v
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v
  }
}

/** Knuth's Poisson variate: fine for the small means this model produces. */
function poissonVariate(rng: Rng, mean: number): number {
  const limit = Math.exp(-mean)
  let k = 0
  let p = 1
  do {
    k += 1
    p *= rng()
  } while (p > limit)
  return k - 1
}

/**
 * One wafer: each die draws a defect count from the gamma-Poisson mixture, which is the negative
 * binomial. α = ∞ skips the mixture and the counts are plain Poisson.
 */
export function sampleWafer(dies: DieCentre[], lambda: number, alpha: number, seed: number): number[] {
  const rng = mulberry32(seed)
  if (!Number.isFinite(alpha)) return dies.map(() => poissonVariate(rng, lambda))
  return dies.map(() => {
    const rate = gammaVariate(rng, alpha) * (lambda / alpha)
    return poissonVariate(rng, rate)
  })
}

/** Colour ramp shared by the map and its legend: the die's colour is its defect count. */
export const DIE_COLORS = ['#dbe3ec', '#f6e05e', '#f6ad55', '#dd6b20', '#c53030'] as const

export function dieColor(defects: number): string {
  return DIE_COLORS[Math.min(defects, DIE_COLORS.length - 1)]
}
