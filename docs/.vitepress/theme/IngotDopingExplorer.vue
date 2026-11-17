<script setup lang="ts">
import { computed, ref } from 'vue'
import { useIsEnglish } from './locale'
import Cite from './Cite.vue'
import { DOPANTS, SOURCE_IDS, TOLERANCES, relativeResistivity, usableFraction } from './ingot-model'

/**
 * Why gallium-doped ingots waste more silicon: resistivity from head to tail for the three dopants.
 *
 * The model is `ingot-model.ts` (normal freezing, with the chapter's segregation coefficients). The
 * reader picks a dopant and a tolerance; the readout gives the fraction of the ingot, from the head,
 * that stays inside it, and the curve shows all three dopants with the chosen one highlighted.
 *
 * No animation; every control is a native button. Used inside `<ClientOnly>`; its class sits on the
 * glossary audit's ignore list.
 */

const isEnglish = useIsEnglish()
const selected = ref(2)
const tolIndex = ref(1)

const dopant = computed(() => DOPANTS[selected.value])
const tol = computed(() => TOLERANCES[tolIndex.value])
const usable = computed(() => usableFraction(dopant.value.k, tol.value))

const W = 320
const H = 150
const G_MAX = 0.95
function path(k: number): string {
  const pts: string[] = []
  for (let i = 0; i <= 60; i++) {
    const g = (i / 60) * G_MAX
    const x = (g / G_MAX) * W
    const y = H - relativeResistivity(k, g) * (H - 6)
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return 'M ' + pts.join(' L ')
}
const tolY = computed(() => H - (1 - tol.value) * (H - 6))
const usableX = computed(() => (Math.min(usable.value, G_MAX) / G_MAX) * W)

function pct(v: number): string {
  const text = (v * 100).toFixed(0)
  return isEnglish.value ? `${text}%` : `${text} %`
}
const text = (v: { pt: string; en: string }) => (isEnglish.value ? v.en : v.pt)

const t = computed(() =>
  isEnglish.value
    ? {
        title: 'Ingot doping explorer',
        dopant: 'Dopant',
        tol: 'Allowed fall in resistivity from the head',
        k: 'Segregation coefficient k',
        usable: 'Ingot within the band, from the head',
        axis: 'resistivity relative to the head, along the ingot (head → tail)',
        note: 'Normal freezing, C = k·C0·(1 − g)^(k − 1), with resistivity taken as inversely proportional to dopant concentration. A model, not a measurement of a real ingot.',
      }
    : {
        title: 'Explorador de dopagem do lingote',
        dopant: 'Dopante',
        tol: 'Queda de resistividade permitida a partir da cabeça',
        k: 'Coeficiente de segregação k',
        usable: 'Lingote dentro da faixa, a partir da cabeça',
        axis: 'resistividade relativa à cabeça, ao longo do lingote (cabeça → cauda)',
        note: 'Solidificação normal, C = k·C0·(1 − g)^(k − 1), com a resistividade tomada como inversamente proporcional à concentração do dopante. É um modelo, não a medição de um lingote real.',
      },
)
</script>

<template>
  <div class="ingot-explorer" role="group" :aria-label="t.title">
    <p class="ingot-explorer__title">{{ t.title }}</p>

    <p class="ingot-explorer__label">{{ t.dopant }}</p>
    <div class="ingot-explorer__row" role="group" :aria-label="t.dopant">
      <button
        v-for="(d, i) in DOPANTS"
        :key="d.id"
        type="button"
        :aria-pressed="selected === i"
        :class="['ingot-explorer__choice', { 'is-active': selected === i }]"
        @click="selected = i"
      >
        {{ text(d.label) }}
      </button>
    </div>

    <p class="ingot-explorer__label">{{ t.tol }}</p>
    <div class="ingot-explorer__row" role="group" :aria-label="t.tol">
      <button
        v-for="(v, i) in TOLERANCES"
        :key="v"
        type="button"
        :aria-pressed="tolIndex === i"
        :class="['ingot-explorer__choice', { 'is-active': tolIndex === i }]"
        @click="tolIndex = i"
      >
        {{ pct(v) }}
      </button>
    </div>

    <p class="ingot-explorer__result">
      {{ t.k }}: <strong>{{ dopant.k.toString().replace('.', isEnglish ? '.' : ',') }}</strong>
      <Cite id="lid-hallam" />
    </p>
    <p class="ingot-explorer__result">
      {{ t.usable }}: <strong>{{ pct(usable) }}</strong>
      <Cite id="pfann-1952" />
    </p>

    <svg class="ingot-explorer__plot" :viewBox="`0 0 ${W} ${H}`" role="img" :aria-label="t.axis">
      <line :x1="0" :x2="W" :y1="tolY" :y2="tolY" class="ingot-explorer__tol" />
      <rect :x="0" :y="0" :width="usableX" :height="H" class="ingot-explorer__band" />
      <path
        v-for="(d, i) in DOPANTS"
        :key="d.id"
        :d="path(d.k)"
        :stroke="d.color"
        :class="['ingot-explorer__line', { 'is-active': selected === i }]"
      />
    </svg>
    <p class="ingot-explorer__axis">{{ t.axis }}</p>
    <p class="ingot-explorer__note">{{ t.note }}</p>
  </div>
</template>

<style scoped>
.ingot-explorer {
  margin: 1.25rem 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}
.ingot-explorer__title {
  margin: 0 0 0.75rem;
  font-weight: 600;
}
.ingot-explorer__label {
  margin: 0.4rem 0 0.3rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}
.ingot-explorer__row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}
.ingot-explorer__choice {
  padding: 0.35rem 0.65rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  cursor: pointer;
}
.ingot-explorer__choice.is-active {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.ingot-explorer__choice:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.ingot-explorer__result {
  margin: 0.3rem 0;
  font-size: 0.95rem;
}
.ingot-explorer__plot {
  display: block;
  width: 100%;
  max-width: 380px;
  height: auto;
  margin-top: 0.5rem;
  border-left: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}
.ingot-explorer__line {
  fill: none;
  stroke-width: 1.5;
  opacity: 0.35;
}
.ingot-explorer__line.is-active {
  stroke-width: 3;
  opacity: 1;
}
.ingot-explorer__tol {
  stroke: var(--vp-c-text-3);
  stroke-dasharray: 4 3;
}
.ingot-explorer__band {
  fill: var(--vp-c-brand-soft);
}
.ingot-explorer__axis {
  margin: 0.2rem 0 0.6rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}
.ingot-explorer__note {
  margin: 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}
</style>
