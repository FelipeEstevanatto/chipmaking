<script setup lang="ts">
import { computed, ref } from 'vue'
import { useIsEnglish } from './locale'
import Cite from './Cite.vue'
import {
  HOURS_MAX,
  HOURS_MIN,
  SOURCE_IDS,
  T_MAX,
  T_MIN,
  T_STEP,
  crossoverHours,
  thicknessNm,
  type Oxidant,
} from './oxidation-model'

/**
 * Thermal oxidation as three controls: oxidant, temperature and time. The model is
 * `oxidation-model.ts` (Deal–Grove with the published Arrhenius constants); this file is the frame.
 *
 * The readout gives the thickness and says which regime the growth is in, by comparing the time
 * with A²/4B. A small curve of thickness against time, drawn as an inline SVG, marks where the
 * chosen time sits. There is no animation, so reduced motion needs nothing, and every control is a
 * native button or range input.
 *
 * Used inside `<ClientOnly>`; its class sits on the glossary audit's ignore list.
 */

const isEnglish = useIsEnglish()
const oxidant = ref<Oxidant>('dry')
const celsius = ref(1000)
/** The slider runs on a log scale of hours, so 0.1 h and 10 h are equally easy to reach. */
const logHours = ref(0)
const hours = computed(() => Math.pow(10, logHours.value))

const thickness = computed(() => thicknessNm(oxidant.value, celsius.value, hours.value))
const crossover = computed(() => crossoverHours(oxidant.value, celsius.value))
const regime = computed(() => {
  const r = hours.value / crossover.value
  if (r < 0.3) return 'linear'
  if (r > 3) return 'parabolic'
  return 'between'
})

function num(value: number, digits: number): string {
  const text = value.toFixed(digits)
  return isEnglish.value ? text : text.replace('.', ',')
}

/** Thickness curve over the slider's time range, in a 300 × 120 box. */
const W = 300
const H = 120
const curve = computed(() => {
  const n = 60
  const pts: Array<[number, number]> = []
  const maxNm = thicknessNm(oxidant.value, celsius.value, HOURS_MAX)
  for (let i = 0; i <= n; i++) {
    const lh = Math.log10(HOURS_MIN) + (i / n) * (Math.log10(HOURS_MAX) - Math.log10(HOURS_MIN))
    const x = (i / n) * W
    const y = H - (thicknessNm(oxidant.value, celsius.value, Math.pow(10, lh)) / maxNm) * (H - 8)
    pts.push([x, y])
  }
  const mx =
    ((logHours.value - Math.log10(HOURS_MIN)) / (Math.log10(HOURS_MAX) - Math.log10(HOURS_MIN))) * W
  const my = H - (thickness.value / maxNm) * (H - 8)
  return { d: 'M ' + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L '), mx, my }
})

const t = computed(() =>
  isEnglish.value
    ? {
        title: 'Oxide growth explorer',
        dry: 'Dry (O₂)',
        wet: 'Wet (H₂O)',
        temp: 'Temperature',
        time: 'Time',
        thickness: 'Oxide thickness',
        linear: 'Linear regime: the surface reaction sets the pace.',
        parabolic: 'Parabolic regime: diffusion through the oxide sets the pace.',
        between: 'Between the two regimes.',
        axis: 'thickness against time (log scale)',
        note: 'Deal–Grove model with no initial oxide, using the published Arrhenius constants. A calculation, not a measurement.',
      }
    : {
        title: 'Explorador do crescimento do óxido',
        dry: 'Seca (O₂)',
        wet: 'Úmida (H₂O)',
        temp: 'Temperatura',
        time: 'Tempo',
        thickness: 'Espessura do óxido',
        linear: 'Regime linear: a reação na superfície dita o ritmo.',
        parabolic: 'Regime parabólico: a difusão pelo óxido dita o ritmo.',
        between: 'Entre os dois regimes.',
        axis: 'espessura contra o tempo (escala log)',
        note: 'Modelo de Deal–Grove sem óxido inicial, com as constantes de Arrhenius publicadas. É um cálculo, não uma medição.',
      },
)

const timeLabel = computed(() => {
  const h = hours.value
  return h < 1 ? `${num(h * 60, 0)} min` : `${num(h, h < 10 ? 1 : 0)} h`
})
const regimeText = computed(() => t.value[regime.value as 'linear' | 'parabolic' | 'between'])
</script>

<template>
  <div class="ox-explorer" role="group" :aria-label="t.title">
    <p class="ox-explorer__title">{{ t.title }}</p>

    <div class="ox-explorer__oxidant" role="group">
      <button
        v-for="o in (['dry', 'wet'] as Oxidant[])"
        :key="o"
        type="button"
        :aria-pressed="oxidant === o"
        :class="['ox-explorer__choice', { 'is-active': oxidant === o }]"
        @click="oxidant = o"
      >
        {{ o === 'dry' ? t.dry : t.wet }}
      </button>
    </div>

    <label class="ox-explorer__slider">
      <span>{{ t.temp }}: <strong>{{ num(celsius, 0) }} °C</strong></span>
      <input v-model.number="celsius" type="range" :min="T_MIN" :max="T_MAX" :step="T_STEP" />
    </label>
    <label class="ox-explorer__slider">
      <span>{{ t.time }}: <strong>{{ timeLabel }}</strong></span>
      <input v-model.number="logHours" type="range" :min="Math.log10(HOURS_MIN)" :max="Math.log10(HOURS_MAX)" step="0.01" />
    </label>

    <p class="ox-explorer__result">
      {{ t.thickness }}: <strong>{{ num(thickness, 0) }} nm</strong>
      <Cite v-for="id in SOURCE_IDS" :id="id" :key="id" />
    </p>
    <p class="ox-explorer__regime">{{ regimeText }}</p>

    <svg class="ox-explorer__curve" :viewBox="`0 0 ${W} ${H}`" role="img" :aria-label="t.axis">
      <path :d="curve.d" class="ox-explorer__line" />
      <circle :cx="curve.mx" :cy="curve.my" r="5" class="ox-explorer__dot" />
    </svg>
    <p class="ox-explorer__axis">{{ t.axis }}</p>

    <p class="ox-explorer__note">{{ t.note }}</p>
  </div>
</template>

<style scoped>
.ox-explorer {
  margin: 1.25rem 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}
.ox-explorer__title {
  margin: 0 0 0.75rem;
  font-weight: 600;
}
.ox-explorer__oxidant {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}
.ox-explorer__choice {
  padding: 0.35rem 0.65rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  cursor: pointer;
}
.ox-explorer__choice.is-active {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.ox-explorer__choice:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.ox-explorer__slider {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.6rem;
  font-size: 0.9rem;
}
.ox-explorer__slider input {
  width: 100%;
  max-width: 360px;
}
.ox-explorer__result {
  margin: 0.4rem 0 0.2rem;
  font-size: 1.05rem;
}
.ox-explorer__regime {
  margin: 0 0 0.6rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
.ox-explorer__curve {
  display: block;
  width: 100%;
  max-width: 360px;
  height: auto;
  border-bottom: 1px solid var(--vp-c-divider);
  border-left: 1px solid var(--vp-c-divider);
}
.ox-explorer__line {
  fill: none;
  stroke: var(--vp-c-text-3);
  stroke-width: 2;
}
.ox-explorer__dot {
  fill: var(--vp-c-brand-1);
}
.ox-explorer__axis {
  margin: 0.2rem 0 0.6rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}
.ox-explorer__note {
  margin: 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}
</style>
