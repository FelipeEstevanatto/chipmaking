<script setup lang="ts">
import { computed, ref } from 'vue'
import { useIsEnglish } from './locale'
import Cite from './Cite.vue'
import { K1_DEFAULT, K1_MAX, K1_MIN, K1_STEP, RAYLEIGH_PRESETS } from './rayleigh-presets'

/**
 * Rayleigh's resolution equation, CD = k1 · λ / NA, as a calculator.
 *
 * The presets carry the wavelength and numerical aperture of four scanner generations from
 * `rayleigh-presets.ts`, with the sources that publish them; the reader moves k1. The bar under the
 * result compares the four presets at the same k1, so the reader sees which of the two levers
 * (shorter light or a wider cone) bought how much.
 *
 * It is used inside `<ClientOnly>`, and its class sits on the glossary audit's ignore list, like
 * every component that builds prose from data. Every control is a native button or range input.
 */

const isEnglish = useIsEnglish()
const selected = ref(RAYLEIGH_PRESETS.length - 2)
const k1 = ref(K1_DEFAULT)

const preset = computed(() => RAYLEIGH_PRESETS[selected.value])
const cd = (wavelength: number, na: number) => (k1.value * wavelength) / na
const result = computed(() => cd(preset.value.wavelength, preset.value.na))
const all = computed(() => RAYLEIGH_PRESETS.map((p) => ({ ...p, value: cd(p.wavelength, p.na) })))
const largest = computed(() => Math.max(...all.value.map((p) => p.value)))

function num(value: number, digits: number): string {
  const text = value.toFixed(digits)
  return isEnglish.value ? text : text.replace('.', ',')
}

const t = computed(() =>
  isEnglish.value
    ? {
        title: 'Resolution calculator',
        scanner: 'Scanner',
        wavelength: 'Wavelength',
        na: 'Numerical aperture',
        k1: 'Process factor k1',
        result: 'Smallest printable feature',
        compare: 'The four scanners at the same k1',
        note: 'CD = k1 × λ / NA. The wavelength and NA of each scanner come from the sources marked; k1 is yours to move.',
      }
    : {
        title: 'Calculadora de resolução',
        scanner: 'Scanner',
        wavelength: 'Comprimento de onda',
        na: 'Abertura numérica',
        k1: 'Fator de processo k1',
        result: 'Menor traço imprimível',
        compare: 'Os quatro scanners com o mesmo k1',
        note: 'CD = k1 × λ / NA. O comprimento de onda e o NA de cada scanner vêm das fontes marcadas; o k1 é você quem move.',
      },
)

const text = (v: { pt: string; en: string }) => (isEnglish.value ? v.en : v.pt)
</script>

<template>
  <div class="rayleigh-calc" role="group" :aria-label="t.title">
    <p class="rayleigh-calc__title">{{ t.title }}</p>

    <div class="rayleigh-calc__presets" role="radiogroup" :aria-label="t.scanner">
      <button
        v-for="(p, i) in RAYLEIGH_PRESETS"
        :key="p.id"
        type="button"
        role="radio"
        :aria-checked="selected === i"
        :class="['rayleigh-calc__preset', { 'is-active': selected === i }]"
        @click="selected = i"
      >
        {{ text(p.label) }}
      </button>
    </div>

    <dl class="rayleigh-calc__params">
      <div>
        <dt>{{ t.wavelength }}</dt>
        <dd>{{ num(preset.wavelength, preset.wavelength < 100 ? 1 : 0) }} nm</dd>
      </div>
      <div>
        <dt>{{ t.na }}</dt>
        <dd>
          {{ num(preset.na, 2) }}
          <Cite v-for="id in preset.sourceIds" :id="id" :key="id" />
        </dd>
      </div>
    </dl>

    <label class="rayleigh-calc__slider">
      <span>{{ t.k1 }}: <strong>{{ num(k1, 2) }}</strong></span>
      <input v-model.number="k1" type="range" :min="K1_MIN" :max="K1_MAX" :step="K1_STEP" />
    </label>

    <p class="rayleigh-calc__result">
      {{ t.result }}: <strong>{{ num(result, 1) }} nm</strong>
    </p>

    <p class="rayleigh-calc__compare-label">{{ t.compare }}</p>
    <ul class="rayleigh-calc__bars">
      <li v-for="(p, i) in all" :key="p.id" :class="{ 'is-active': selected === i }">
        <span class="rayleigh-calc__bar-label">{{ text(p.label) }}</span>
        <span class="rayleigh-calc__bar-track">
          <span class="rayleigh-calc__bar" :style="{ width: `${(p.value / largest) * 100}%` }" />
        </span>
        <span class="rayleigh-calc__bar-value">{{ num(p.value, 1) }} nm</span>
      </li>
    </ul>

    <p class="rayleigh-calc__note">{{ t.note }}</p>
  </div>
</template>

<style scoped>
.rayleigh-calc {
  margin: 1.25rem 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}
.rayleigh-calc__title {
  margin: 0 0 0.75rem;
  font-weight: 600;
}
.rayleigh-calc__presets {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}
.rayleigh-calc__preset {
  padding: 0.35rem 0.65rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  cursor: pointer;
}
.rayleigh-calc__preset.is-active {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.rayleigh-calc__preset:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.rayleigh-calc__params {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 0 0 0.75rem;
}
.rayleigh-calc__params dt {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}
.rayleigh-calc__params dd {
  margin: 0;
  font-size: 1rem;
}
.rayleigh-calc__slider {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}
.rayleigh-calc__slider input {
  width: 100%;
  max-width: 360px;
}
.rayleigh-calc__result {
  margin: 0 0 1rem;
  font-size: 1.05rem;
}
.rayleigh-calc__compare-label {
  margin: 0 0 0.4rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}
.rayleigh-calc__bars {
  list-style: none;
  margin: 0 0 0.75rem;
  padding: 0;
}
.rayleigh-calc__bars li {
  display: grid;
  grid-template-columns: minmax(7rem, 11rem) 1fr 4.5rem;
  align-items: center;
  gap: 0.5rem;
  margin: 0.25rem 0;
  font-size: 0.85rem;
}
.rayleigh-calc__bar-track {
  height: 10px;
  border-radius: 5px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}
.rayleigh-calc__bar {
  display: block;
  height: 100%;
  background: var(--vp-c-text-3);
}
.rayleigh-calc__bars li.is-active .rayleigh-calc__bar {
  background: var(--vp-c-brand-1);
}
.rayleigh-calc__bar-value {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.rayleigh-calc__note {
  margin: 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}
</style>
