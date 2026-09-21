<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import type { Chart as ChartInstance } from 'chart.js/auto'
import { useIsEnglish, useLocalePath } from './locale'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isEnglish = useIsEnglish()
const localePath = useLocalePath()

const years = ['2020', '2021', '2022', '2023', '2024', '2025']

/** Index at which USGS figures stop being reported output and become estimates. */
const ESTIMATE_FROM = 4
const pointStyle = years.map((_, i) => (i >= ESTIMATE_FROM ? 'rectRot' : 'circle'))
const pointRadius = pointStyle.map((style) => (style === 'circle' ? 3 : 5))

/** Every row of the production table, so the chart and table never disagree. */
const producers = [
  { pt: 'China', en: 'China', data: [1700, 2300, 2100, 2300, 2300, 2300], color: '#2b6cb0', fill: true },
  { pt: 'Rússia', en: 'Russia', data: [54, 54, 50, 50, 50, 50], color: '#e53e3e' },
  { pt: 'Brasil', en: 'Brazil', data: [207, 199, 210, 210, 210, 210], color: '#38a169' },
  { pt: 'Noruega', en: 'Norway', data: [105, 122, 120, 120, 120, 120], color: '#805ad5' },
  { pt: 'Estados Unidos', en: 'United States', data: [88, 113, 110, 110, 110, 110], color: '#dd6b20' },
  { pt: 'França', en: 'France', data: [32, 47, 40, 40, 40, 40], color: '#a0aec0' },
  {
    pt: 'Mundo — total',
    en: 'World — total',
    data: [2600, 3300, 3000, 3300, 3300, 3300],
    color: '#4a5568',
    dashed: true,
  },
]

const logScale = ref(false)
let chart: ChartInstance | undefined

onMounted(async () => {
  if (!canvasRef.value) return
  const { Chart } = await import('chart.js/auto')

  chart = new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels: years,
      datasets: producers.map((producer) => ({
        label: `${isEnglish.value ? producer.en : producer.pt} (kt)`,
        data: producer.data,
        borderColor: producer.color,
        backgroundColor: producer.fill ? 'rgba(43, 108, 176, 0.15)' : 'transparent',
        borderDash: producer.dashed ? [6, 4] : undefined,
        pointBackgroundColor: producer.color,
        pointStyle,
        pointRadius,
        pointHoverRadius: 6,
        tension: 0.2,
        fill: !!producer.fill,
      })),
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: { mode: 'nearest', intersect: false },
      plugins: {
        legend: { position: 'bottom' },
        title: {
          display: true,
          text: isEnglish.value
            ? 'Metallurgical silicon production (thousand tonnes)'
            : 'Produção de silício metálico (milhares de toneladas)',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'kt' },
        },
      },
    },
  })
})

watch(logScale, (enabled) => {
  if (!chart) return
  const y = (chart.options.scales as Record<string, Record<string, unknown>>).y
  y.type = enabled ? 'logarithmic' : 'linear'
  y.beginAtZero = !enabled
  y.min = enabled ? 1 : undefined
  chart.update()
})
</script>

<template>
  <div class="chart-panel">
    <p class="chart-controls">
      <button type="button" @click="logScale = !logScale">
        {{ logScale
          ? (isEnglish ? 'Linear scale' : 'Escala linear')
          : (isEnglish ? 'Logarithmic scale' : 'Escala logarítmica') }}
      </button>
    </p>
    <canvas
      ref="canvasRef"
      role="img"
      :aria-label="isEnglish
        ? 'Metallurgical silicon production by country, 2020 to 2025'
        : 'Produção de silício metálico por país, 2020 a 2025'"
    />
    <p class="chart-caption">
      <small v-if="isEnglish">
        Diamond points (2024–2025) are USGS estimates. Source: USGS Mineral Commodity
        Summaries (2020–2025) — see the per-year links in
        <a :href="withBase(localePath('/referencias'))">References</a> or the table in
        <a :href="withBase(localePath('/introducao#producao-estimada'))">Introduction</a>.
      </small>
      <small v-else>
        Pontos em losango (2024–2025) são estimativas do USGS. Fonte: USGS Mineral
        Commodity Summaries (2020–2025) — ver links por ano em
        <a :href="withBase(localePath('/referencias'))">Referências</a> ou na tabela em
        <a :href="withBase(localePath('/introducao#producao-estimada'))">Introdução</a>.
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
</style>
