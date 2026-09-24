#!/usr/bin/env bun
/**
 * Exports every chart in `docs/.vitepress/theme/charts/specs.ts` to `docs/public/data/<slug>.csv`.
 *
 * The charts and the downloadable series are the same numbers, and this script is what keeps that
 * true: the alternative — hand-maintaining a CSV next to each chart — is exactly the drift the
 * citation registry and the glossary were built to avoid.
 *
 * Usage:
 *     bun run scripts/export-chart-data.ts
 *
 * Column headers use the Portuguese labels (the site's source language). The numbers are
 * language-neutral, which is why a single file serves both locales.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { CHARTS } from '../docs/.vitepress/theme/charts/specs'

const repo = dirname(dirname(fileURLToPath(import.meta.url)))
const outDir = join(repo, 'docs', 'public', 'data')

/** RFC 4180 quoting: only what needs it gets quotes. */
function cell(value: unknown): string {
  const text = String(value)
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

function quote(label: string | number): string {
  return cell(label)
}

function rowsFor(spec: (typeof CHARTS)[string]): string[][] {
  if (spec.type === 'scatter') {
    // Long format, so a reader can pivot it or plot it straight away.
    const rows: string[][] = [['material', 'serie', 'x', 'y']]
    for (const dataset of spec.datasets) {
      for (const point of dataset.data as Array<{ x: number; y: number; label?: string }>) {
        rows.push([quote(point.label ?? ''), quote(dataset.pt), cell(point.x), cell(point.y)])
      }
    }
    return rows
  }

  const rows: string[][] = [['rotulo', ...spec.datasets.map((d) => quote(d.pt))]]
  const labels = spec.labels ?? []
  const length = labels.length || (spec.datasets[0]?.data.length ?? 0)

  for (let i = 0; i < length; i += 1) {
    const row = [quote(labels[i] ?? i + 1)]
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
  const rows = rowsFor(spec)
  const file = join(outDir, `${spec.slug}.csv`)
  writeFileSync(file, rows.map((row) => row.join(',')).join('\n') + '\n', 'utf8')
  written.push(`${spec.slug}.csv (${rows.length - 1} rows)`)
}

console.log(`wrote ${written.length} files to docs/public/data:\n  ${written.join('\n  ')}`)
