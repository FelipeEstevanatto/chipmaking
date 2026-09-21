<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(async () => {
  if (!canvasRef.value) return
  const { Chart } = await import('chart.js/auto')

  const years = ['2020', '2021', '2022', '2023', '2024', '2025']

  new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'China (kt)',
          data: [1700, 2300, 2100, 2300, 2300, 2300],
          borderColor: '#2b6cb0',
          backgroundColor: 'rgba(43, 108, 176, 0.15)',
          tension: 0.2,
          fill: true,
        },
        {
          label: 'Brasil (kt)',
          data: [207, 199, 210, 210, 210, 210],
          borderColor: '#38a169',
          backgroundColor: 'transparent',
          tension: 0.2,
        },
        {
          label: 'Mundo (kt)',
          data: [2600, 3300, 3000, 3300, 3300, 3300],
          borderColor: '#718096',
          borderDash: [6, 4],
          backgroundColor: 'transparent',
          tension: 0.2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'bottom' },
        title: {
          display: true,
          text: 'Produção de silício metálico (milhares de toneladas)',
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
</script>

<template>
  <div class="chart-panel">
    <canvas ref="canvasRef" role="img" aria-label="Gráfico de produção de silício metálico por país" />
    <p class="chart-caption">
      <small>Fonte: USGS Mineral Commodity Summaries (2020–2025). Ver links por ano em <a :href="withBase('/referencias')">Referências</a> ou na tabela em <a :href="withBase('/introducao#producao-estimada')">Introdução</a>.</small>
    </p>
  </div>
</template>

<style scoped>
.chart-caption {
  margin: 0.75rem 0 0;
  color: var(--vp-c-text-2);
}
</style>
