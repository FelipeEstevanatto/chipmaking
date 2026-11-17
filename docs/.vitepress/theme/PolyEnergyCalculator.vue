<script setup lang="ts">
import { computed, ref } from 'vue'
import { useIsEnglish } from './locale'
import Cite from './Cite.vue'

/**
 * Electricity for a year of polysilicon, by route.
 *
 * The chapter's comparison table gives two figures: the Siemens process needs over 100 kWh per
 * kilogram (SAIMM), and the fluidized bed about 90% less (Bernreuter). The calculator multiplies a
 * plant's annual output by those, so Siemens is a floor ("at least") and FBR about a tenth of it.
 * It adds no constant of its own.
 *
 * Used inside `<ClientOnly>`; its class sits on the glossary audit's ignore list. Every control is a
 * native button or range input.
 */

const SIEMENS_KWH_PER_KG = 100
const FBR_FRACTION = 0.1
const OUTPUTS = [1000, 5000, 20000, 50000, 100000] // tonnes per year

const isEnglish = useIsEnglish()
const index = ref(2)
const tonnes = computed(() => OUTPUTS[index.value])
const siemensGWh = computed(() => (tonnes.value * 1000 * SIEMENS_KWH_PER_KG) / 1e6)
const fbrGWh = computed(() => siemensGWh.value * FBR_FRACTION)

function num(value: number, digits = 0): string {
  return value.toLocaleString(isEnglish.value ? 'en-GB' : 'pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

const t = computed(() =>
  isEnglish.value
    ? {
        title: 'Electricity for a year of polysilicon',
        output: 'Plant output',
        perYear: 't per year',
        siemens: 'Siemens (CVD): at least',
        fbr: 'Fluidized bed: about',
        note: 'Siemens at over 100 kWh per kg, FBR about 90% less, as in the table above. A floor and a ratio, not a plant measurement.',
      }
    : {
        title: 'Eletricidade para um ano de polissilício',
        output: 'Produção da planta',
        perYear: 't por ano',
        siemens: 'Siemens (CVD): pelo menos',
        fbr: 'Leito fluidizado: cerca de',
        note: 'Siemens acima de 100 kWh por kg, FBR cerca de 90% a menos, como na tabela acima. É um piso e uma razão, não uma medição de planta.',
      },
)
</script>

<template>
  <div class="poly-energy" role="group" :aria-label="t.title">
    <p class="poly-energy__title">{{ t.title }}</p>
    <label class="poly-energy__slider">
      <span>{{ t.output }}: <strong>{{ num(tonnes) }} {{ t.perYear }}</strong></span>
      <input v-model.number="index" type="range" min="0" :max="OUTPUTS.length - 1" step="1" />
    </label>
    <ul class="poly-energy__bars">
      <li>
        <span class="poly-energy__label">{{ t.siemens }}</span>
        <span class="poly-energy__track"><span class="poly-energy__bar is-siemens" style="width: 100%" /></span>
        <span class="poly-energy__value">{{ num(siemensGWh) }} GWh <Cite id="saimm" /></span>
      </li>
      <li>
        <span class="poly-energy__label">{{ t.fbr }}</span>
        <span class="poly-energy__track"><span class="poly-energy__bar is-fbr" :style="{ width: `${FBR_FRACTION * 100}%` }" /></span>
        <span class="poly-energy__value">{{ num(fbrGWh) }} GWh <Cite id="bernreuter-production" /></span>
      </li>
    </ul>
    <p class="poly-energy__note">{{ t.note }}</p>
  </div>
</template>

<style scoped>
.poly-energy {
  margin: 1.25rem 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}
.poly-energy__title {
  margin: 0 0 0.75rem;
  font-weight: 600;
}
.poly-energy__slider {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}
.poly-energy__slider input {
  width: 100%;
  max-width: 360px;
}
.poly-energy__bars {
  list-style: none;
  margin: 0 0 0.75rem;
  padding: 0;
}
.poly-energy__bars li {
  display: grid;
  grid-template-columns: minmax(8rem, 12rem) 1fr minmax(6rem, auto);
  align-items: center;
  gap: 0.5rem;
  margin: 0.35rem 0;
  font-size: 0.85rem;
}
.poly-energy__track {
  height: 12px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}
.poly-energy__bar {
  display: block;
  height: 100%;
}
.poly-energy__bar.is-siemens {
  background: var(--vp-c-text-3);
}
.poly-energy__bar.is-fbr {
  background: var(--vp-c-brand-1);
}
.poly-energy__value {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.poly-energy__note {
  margin: 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}
@media (max-width: 480px) {
  .poly-energy__bars li {
    grid-template-columns: 1fr;
    gap: 0.2rem;
  }
  .poly-energy__value {
    text-align: left;
  }
}
</style>
