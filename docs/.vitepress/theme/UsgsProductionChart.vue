<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import type { Chart as ChartInstance } from 'chart.js/auto'
import { useIsEnglish, useLocalePath } from './locale'
import {
  USGS_SILICON_PRODUCERS,
  USGS_SILICON_PRODUCT_NAMES,
  USGS_SILICON_YEARS,
} from './usgs-silicon'
import type { UsgsSiliconProduct } from './usgs-silicon'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isEnglish = useIsEnglish()
const localePath = useLocalePath()

/** Which product the chart is showing; the table above carries both at once. */
const product = ref<UsgsSiliconProduct>('metal')
const logScale = ref(false)
let chart: ChartInstance | undefined

function productName(id: UsgsSiliconProduct) {
  const names = USGS_SILICON_PRODUCT_NAMES[id]
  return isEnglish.value ? names.en : names.pt
}

function datasets() {
  return USGS_SILICON_PRODUCERS.map((producer) => ({
    label: `${isEnglish.value ? producer.en : producer.pt} (kt)`,
    data: producer[product.value],
    borderColor: producer.color,
    backgroundColor: producer.fill ? 'rgba(43, 108, 176, 0.15)' : 'transparent',
    borderDash: producer.total ? [6, 4] : undefined,
    pointBackgroundColor: producer.color,
    pointHoverRadius: 6,
    tension: 0.2,
    fill: !!producer.fill,
  }))
}

function chartTitle() {
  return isEnglish.value
    ? `${productName(product.value)} production (thousand tonnes)`
    : `Produção de ${productName(product.value).toLowerCase()} (milhares de toneladas)`
}

onMounted(async () => {
  if (!canvasRef.value) return
  const { Chart } = await import('chart.js/auto')

  chart = new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels: USGS_SILICON_YEARS.map(String),
      datasets: datasets(),
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      interaction: { mode: 'nearest', intersect: false },
      plugins: {
        legend: { position: 'bottom' },
        title: { display: true, text: chartTitle() },
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

watch(product, () => {
  if (!chart) return
  chart.data.datasets = datasets()
  const title = chart.options.plugins?.title
  if (title) title.text = chartTitle()
  chart.update()
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
      <button type="button" @click="product = product === 'metal' ? 'ferro' : 'metal'">
        {{ isEnglish
          ? (product === 'metal' ? 'Show ferrosilicon' : 'Show silicon metal')
          : (product === 'metal' ? 'Ver ferrossilício' : 'Ver silício metálico') }}
      </button>
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
        ? `${productName(product)} production by country, 2022 to 2025`
        : `Produção de ${productName(product).toLowerCase()} por país, 2022 a 2025`"
    />
    <p class="chart-caption">
      <small v-if="isEnglish">
        Silicon metal and ferrosilicon, 2022–2025, from the USGS editions of 2024 to 2026; each
        point is the most recent estimate published for that year, and the editions revise earlier
        years. Source: the series links in
        <a :href="withBase(localePath('/referencias'))">References</a> or the table in
        <a :href="withBase(localePath('/introducao#producao-estimada'))">Introduction</a>.
      </small>
      <small v-else>
        Silício metálico e ferrossilício, 2022 a 2025, das edições de 2024 a 2026 do USGS; cada
        ponto é a estimativa mais recente publicada para o ano, e as edições revisam os anos
        anteriores. Fonte: ver os links da série em
        <a :href="withBase(localePath('/referencias'))">Referências</a> ou na tabela em
        <a :href="withBase(localePath('/introducao#producao-estimada'))">Introdução</a>.
      </small>
    </p>
  </div>
</template>

<style scoped>
.chart-controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.5rem;
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
