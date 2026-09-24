/**
 * Shape of every interactive chart on the site.
 *
 * Charts are declared as plain data (`specs.ts`) so that three consumers can share one definition:
 *
 *  - `DataChart.vue` renders them with Chart.js,
 *  - `scripts/export-chart-data.ts` writes the same numbers to `docs/public/data/*.csv`, and
 *  - the `/dados` page links the two, so a reader can always check the chart against the file.
 *
 * A spec is deliberately serialisable: no functions, no axis callbacks. Anything a specific chart
 * needs beyond this shape (a floating range, a schematic with no source) is expressed as a field
 * here rather than as an exception in the component.
 */

/** One series. Labels are authored per locale; the numbers never are. */
export interface ChartDataset {
  pt: string
  en: string
  /**
   * Plain numbers for a categorical axis, `[start, end]` pairs for a floating bar, or
   * `{ x, y, label }` points for a scatter. `label` survives in `ctx.raw`, which is how a scatter
   * point gets a name in its tooltip.
   */
  data: number[] | Array<[number, number]> | Array<{ x: number; y: number; label?: string }>
  color: string
  /** Paired with `logY`, so toggling the axis cannot hide which series was the reference fit. */
  dashed?: boolean
  fill?: boolean
}

export interface ChartSpec {
  id: string
  type: 'line' | 'bar' | 'scatter'
  /** Horizontal bars read as a ranking, which is what the chokepoint chart is. */
  horizontal?: boolean
  xLabel: { pt: string; en: string }
  yLabel: { pt: string; en: string }
  /** Category labels for `line` and `bar`; unused by `scatter`. */
  labels?: Array<string | number>
  datasets: ChartDataset[]
  /** Right-hand second axis, for a series whose unit differs from the left one. */
  y2Label?: { pt: string; en: string }
  logY?: boolean
  /** Readers can switch a log axis back to linear, as in the USGS chart. */
  toggleLogY?: boolean
  /**
   * True for a drawing that exists to fix an idea in the reader's head and carries no data.
   * The caption must say so, in both locales.
   */
  schematic?: boolean
  caption: { pt: string; en: string }
  /** Keys from `citations.ts`, rendered as [n] after the caption. */
  sourceIds: string[]
  /** File name under `docs/public/data/`. */
  slug: string
}
