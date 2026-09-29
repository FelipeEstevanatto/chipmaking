#!/usr/bin/env bun
/**
 * Exports every chart in `docs/.vitepress/theme/charts/specs.ts` to `docs/public/data/<slug>.csv`.
 *
 * The charts and the downloadable series are the same numbers, and this script is what keeps that
 * true: the alternative, hand-maintaining a CSV next to each chart, is exactly the drift the
 * citation registry and the glossary were built to avoid.
 *
 * Headers and labels are written in English. One file serves both locales — the `/dados` page links
 * the same path from the Portuguese and from the English side — so the CSV follows the rule the
 * drawings follow: a shared artefact carries English technical terms and keeps the decimal point,
 * and there is one file to keep in step instead of two.
 *
 * Usage:
 *     bun run scripts/export-chart-data.ts
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { CHARTS } from '../docs/.vitepress/theme/charts/specs'
import type { ChartLabel, ChartName } from '../docs/.vitepress/theme/charts/types'

const repo = dirname(dirname(fileURLToPath(import.meta.url)))
const outDir = join(repo, 'docs', 'public', 'data')

/** RFC 4180 quoting: only what needs it gets quotes. */
function cell(value: unknown): string {
  const text = String(value)
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

/** A category label as the file carries it: English, or the row number when the chart has none. */
function labelCell(label: ChartLabel | undefined, index: number): string {
  if (label === undefined) return cell(index + 1)
  return cell(typeof label === 'number' ? label : label.en)
}

/** A scattered point's name as the file carries it: English, like everything else here. */
function nameCell(value: ChartName | undefined): string {
  if (value === undefined) return ''
  return cell(typeof value === 'string' ? value : value.en)
}

/**
 * Refuses a category label written in one language only. The type says the same thing, but a type is
 * not checked by the build: this is the version that fails in the terminal and stops the file being
 * written, which is what keeps a Portuguese word off an English chart.
 */
function assertPairedLabels(spec: (typeof CHARTS)[string]): void {
  for (const [index, label] of (spec.labels ?? []).entries()) {
    if (typeof label === 'string') {
      throw new Error(`${spec.id}: label ${index} (${label}) is a bare string; pair it with its other locale`)
    }
  }
}

function rowsFor(spec: (typeof CHARTS)[string]): string[][] {
  if (spec.type === 'scatter') {
    // Long format, so a reader can pivot it or plot it straight away.
    const rows: string[][] = [['material', 'series', 'x', 'y']]
    for (const dataset of spec.datasets) {
      for (const point of dataset.data as Array<{ x: number; y: number; label?: ChartName }>) {
        rows.push([nameCell(point.label), cell(dataset.en), cell(point.x), cell(point.y)])
      }
    }
    return rows
  }

  const rows: string[][] = [['label', ...spec.datasets.map((d) => cell(d.en))]]
  const labels = spec.labels ?? []
  const length = labels.length || (spec.datasets[0]?.data.length ?? 0)

  for (let i = 0; i < length; i += 1) {
    const row = [labelCell(labels[i], i)]
    for (const dataset of spec.datasets) {
      const value = dataset.data[i] as number | [number, number] | undefined
      row.push(Array.isArray(value) ? cell(`${value[0]}-${value[1]}`) : cell(value ?? ''))
    }
    rows.push(row)
  }
  return rows
}

mkdirSync(outDir, { recursive: true })

const written: string[] = []
for (const spec of Object.values(CHARTS)) {
  assertPairedLabels(spec)
  const rows = rowsFor(spec)
  const file = join(outDir, `${spec.slug}.csv`)
  writeFileSync(file, rows.map((row) => row.join(',')).join('\n') + '\n', 'utf8')
  written.push(`${spec.slug}.csv (${rows.length - 1} rows)`)
}

console.log(`wrote ${written.length} files to docs/public/data:\n  ${written.join('\n  ')}`)
