<script setup lang="ts">
import { computed, ref } from 'vue'
import { useIsEnglish } from './locale'
import Cite from './Cite.vue'
import { SCALE_STOPS } from './scale-stops'

/**
 * From the wafer to the atom on one logarithmic ruler.
 *
 * The stops come from `scale-stops.ts`, each a dimension the site cites elsewhere. The reader steps
 * through them with buttons or the arrow keys; the readout gives the size in a readable unit and how
 * many times smaller it is than the stop above and than the wafer. The ruler is a plain inline SVG
 * with every stop marked and the current one highlighted.
 *
 * Used inside `<ClientOnly>`; its class sits on the glossary audit's ignore list.
 */

const isEnglish = useIsEnglish()
const index = ref(0)
const stop = computed(() => SCALE_STOPS[index.value])

const LOG_MAX = Math.log10(1)
const LOG_MIN = Math.log10(1e-10)
const W = 340
function xOf(m: number) {
  return ((LOG_MAX - Math.log10(m)) / (LOG_MAX - LOG_MIN)) * W
}

function fmt(v: number, digits: number) {
  return v.toLocaleString(isEnglish.value ? 'en-GB' : 'pt-BR', { maximumFractionDigits: digits })
}
function size(m: number): string {
  if (m >= 1e-3) return `${fmt(m * 1000, 1)} mm`
  if (m >= 1e-6) return `${fmt(m * 1e6, 1)} µm`
  return `${fmt(m * 1e9, m < 1e-9 ? 4 : 0)} nm`
}
function ratio(r: number): string {
  return `${fmt(r, r < 10 ? 1 : 0)}×`
}
const vsPrevious = computed(() => (index.value > 0 ? SCALE_STOPS[index.value - 1].metres / stop.value.metres : null))
const vsWafer = computed(() => SCALE_STOPS[0].metres / stop.value.metres)
const text = (v: { pt: string; en: string }) => (isEnglish.value ? v.en : v.pt)

function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    index.value = Math.min(SCALE_STOPS.length - 1, index.value + 1)
    e.preventDefault()
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    index.value = Math.max(0, index.value - 1)
    e.preventDefault()
  } else if (e.key === 'Home') {
    index.value = 0
    e.preventDefault()
  }
}

const t = computed(() =>
  isEnglish.value
    ? {
        title: 'From the wafer to the atom',
        prev: 'Larger',
        next: 'Smaller',
        smallerPrev: 'smaller than the step above',
        smallerWafer: 'smaller than the wafer',
        ruler: 'logarithmic ruler from 1 m to 0.1 nm',
        note: 'Each size is a published dimension, cited where it appears in the chapters. The die side is the square root of its area.',
      }
    : {
        title: 'Do wafer ao átomo',
        prev: 'Maior',
        next: 'Menor',
        smallerPrev: 'menor que o degrau acima',
        smallerWafer: 'menor que o wafer',
        ruler: 'régua logarítmica de 1 m a 0,1 nm',
        note: 'Cada tamanho é uma dimensão publicada, citada onde aparece nos capítulos. O lado do die é a raiz quadrada da área.',
      },
)
</script>

<template>
  <div class="scale-explorer" role="group" :aria-label="t.title" tabindex="0" @keydown="onKey">
    <p class="scale-explorer__title">{{ t.title }}</p>

    <div class="scale-explorer__nav">
      <button type="button" :disabled="index === 0" @click="index--">← {{ t.prev }}</button>
      <span class="scale-explorer__count">{{ index + 1 }} / {{ SCALE_STOPS.length }}</span>
      <button type="button" :disabled="index === SCALE_STOPS.length - 1" @click="index++">{{ t.next }} →</button>
    </div>

    <p class="scale-explorer__stop" aria-live="polite">
      <strong>{{ text(stop.label) }}</strong>: {{ size(stop.metres) }}
      <span class="scale-explorer__what">({{ text(stop.what) }})</span>
      <Cite v-for="id in stop.sourceIds" :id="id" :key="id" />
    </p>
    <p class="scale-explorer__ratios">
      <span v-if="vsPrevious">{{ ratio(vsPrevious) }} {{ t.smallerPrev }} · </span>
      <span v-if="index > 0">{{ ratio(vsWafer) }} {{ t.smallerWafer }}</span>
    </p>

    <svg class="scale-explorer__ruler" :viewBox="`-6 0 ${W + 12} 40`" role="img" :aria-label="t.ruler">
      <line x1="0" x2="340" y1="20" y2="20" class="scale-explorer__axis" />
      <g v-for="(s, i) in SCALE_STOPS" :key="s.id">
        <circle
          :cx="xOf(s.metres)"
          cy="20"
          :r="i === index ? 7 : 4"
          :class="['scale-explorer__dot', { 'is-active': i === index }]"
          @click="index = i"
        />
      </g>
      <text x="0" y="38" class="scale-explorer__tick">1 m</text>
      <text x="340" y="38" text-anchor="end" class="scale-explorer__tick">{{ isEnglish ? '0.1 nm' : '0,1 nm' }}</text>
    </svg>

    <p class="scale-explorer__note">{{ t.note }}</p>
  </div>
</template>

<style scoped>
.scale-explorer {
  margin: 1.25rem 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}
.scale-explorer:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.scale-explorer__title {
  margin: 0 0 0.75rem;
  font-weight: 600;
}
.scale-explorer__nav {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}
.scale-explorer__nav button {
  padding: 0.35rem 0.65rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  cursor: pointer;
}
.scale-explorer__nav button:disabled {
  opacity: 0.45;
  cursor: default;
}
.scale-explorer__nav button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.scale-explorer__count {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}
.scale-explorer__stop {
  margin: 0.2rem 0;
  font-size: 1rem;
}
.scale-explorer__what {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}
.scale-explorer__ratios {
  min-height: 1.4em;
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
.scale-explorer__ruler {
  display: block;
  width: 100%;
  max-width: 420px;
  height: auto;
}
.scale-explorer__axis {
  stroke: var(--vp-c-divider);
  stroke-width: 2;
}
.scale-explorer__dot {
  fill: var(--vp-c-text-2);
  cursor: pointer;
}
.scale-explorer__dot.is-active {
  fill: var(--vp-c-brand-1);
}
.scale-explorer__tick {
  font-size: 9px;
  fill: var(--vp-c-text-2);
}
.scale-explorer__note {
  margin: 0.5rem 0 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}
</style>
