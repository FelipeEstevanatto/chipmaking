<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import type { Chart as ChartInstance } from 'chart.js/auto'
import { CHARTS } from './charts'
import { useIsEnglish, useLocalePath } from './locale'
import Cite from './Cite.vue'

/**
 * Renders any chart in `charts/specs.ts`, so a new chart is a data entry rather than a component.
 *
 * Two conventions matter at the call site:
 *
 *  - wrap this in `<ClientOnly>`. The chart is drawn on mount and its caption repeats numbers that
 *    also live in the prose; leaving it out of the server HTML keeps the glossary audit's
 *    "first reachable use" rule about prose, where it belongs.
 *  - cite the same sources in the caption as in the chapter text. The `[n]` markers below come from
 *    the same registry, so they cannot drift.
 */

const props = defineProps<{ chart: string }>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isEnglish = useIsEnglish()
const localePath = useLocalePath()

const spec = CHARTS[props.chart]
const logY = ref(!!spec?.logY)

if (!spec) {
  // A typo in the markdown should be loud in development and harmless in production.
  console.warn(`[DataChart] unknown chart id: ${props.chart}`)
}

const text = (value: { pt: string; en: string }) => (isEnglish.value ? value.en : value.pt)

let chart: ChartInstance | undefined

/** Localised dataset, with the label kept on the raw point so a scatter tooltip can name it. */
function datasetFor(dataset: (typeof spec.datasets)[number]) {
  return {
    label: text(dataset),
    data: dataset.data as never,
    borderColor: dataset.color,
    backgroundColor: dataset.fill ? 'rgba(43, 108, 176, 0.15)' : dataset.color,
    borderDash: dataset.dashed ? [6, 4] : undefined,
    pointBackgroundColor: dataset.color,
    pointRadius: spec.type === 'scatter' ? 5 : 3,
    pointHoverRadius: 7,
    tension: 0.25,
    fill: !!dataset.fill,
    borderWidth: 2,
  }
}

onMounted(async () => {
  if (!spec || !canvasRef.value) return
  const { Chart } = await import('chart.js/auto')

  chart = new Chart(canvasRef.value, {
    type: spec.type,
    data: {
      labels: spec.labels,
      datasets: spec.datasets.map(datasetFor),
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: spec.horizontal ? 'y' : 'x',
      interaction: { mode: 'nearest', intersect: false },
      plugins: {
        legend: { display: spec.datasets.length > 1 || !!spec.schematic, position: 'bottom' },
        tooltip: {
          callbacks: {
            // Scatter points carry their material name on the raw object; bars and lines do not.
            label: (ctx) => {
              const raw = ctx.raw as { x?: number; y?: number; label?: string } | number | [number, number]
              if (typeof raw === 'object' && raw !== null && 'label' in raw && raw.label) {
                return `${raw.label}: (${(raw as { x: number }).x}, ${(raw as { y: number }).y})`
              }
              if (Array.isArray(raw)) return `${ctx.dataset.label}: ${raw[0]}–${raw[1]}`
              return `${ctx.dataset.label}: ${ctx.formattedValue}`
            },
          },
        },
      },
      scales: {
        x: spec.horizontal
          ? { beginAtZero: true, title: { display: !!spec.xLabel.en, text: text(spec.xLabel) } }
          : {
              type: spec.type === 'scatter' ? 'linear' : 'category',
              title: { display: !!spec.xLabel.en, text: text(spec.xLabel) },
            },
        y: spec.horizontal
          ? { ticks: { autoSkip: false } }
          : {
              type: logY.value ? 'logarithmic' : 'linear',
              beginAtZero: !logY.value,
              min: logY.value ? undefined : undefined,
              title: { display: !!spec.yLabel.en, text: text(spec.yLabel) },
            },
      },
    },
  })
})

watch(logY, (enabled) => {
  if (!chart) return
  const y = (chart.options.scales as Record<string, Record<string, unknown>>).y
  y.type = enabled ? 'logarithmic' : 'linear'
  y.beginAtZero = !enabled
  chart.update()
})

onBeforeUnmount(() => chart?.destroy())
</script>

<template>
  <div v-if="spec" class="chart-panel data-chart">
    <p v-if="spec.toggleLogY" class="chart-controls">
      <button type="button" @click="logY = !logY">
        {{ logY
          ? (isEnglish ? 'Linear scale' : 'Escala linear')
          : (isEnglish ? 'Logarithmic scale' : 'Escala logarítmica') }}
      </button>
    </p>
    <canvas ref="canvasRef" role="img" :aria-label="text(spec.caption)" />
    <p class="chart-caption">
      <small>
        {{ text(spec.caption) }}
        <Cite v-for="id in spec.sourceIds" :id="id" :key="id" />
        <a :href="withBase(localePath(`/dados`))">{{ isEnglish ? 'Data' : 'Dados' }}</a>
      </small>
    </p>
  </div>
</template>

<style scoped>
.chart-controls {
  display: flex;
  justify-content: flex-end;
  margin: 0 0 0.5rem;
}

.chart-controls button {
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.8rem;
}

.chart-controls button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.chart-caption {
  margin: 0.75rem 0 0;
  color: var(--vp-c-text-2);
}

.chart-caption a {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
