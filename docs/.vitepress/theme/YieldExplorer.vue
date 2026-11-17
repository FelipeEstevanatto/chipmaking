<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useIsEnglish } from './locale'
import Cite from './Cite.vue'
import { YIELD_PRESETS, type YieldPreset } from './yield-presets'
import {
  ALPHA_RANGE,
  DENSITY_MARKS,
  DENSITY_STEPS,
  WAFER_PRICES,
  WAFER_PRICE_SOURCE,
  WAFER_PRICE_YEAR,
  type DensityMark,
} from './yield-references'
import {
  ALPHAS,
  AREA_MAX,
  AREA_MIN,
  AREA_STEP,
  DIE_COLORS,
  WAFER_MM,
  clusteredYield,
  dieColor,
  dieGrid,
  lambdaFor,
  poissonYield,
  sampleWafer,
} from './yield-model'

/**
 * Why the Poisson yield curve is pessimistic once defects clump: a wafer you can look at.
 *
 * The chapter presents `Y = e^(−D₀A)` and names the negative binomial as the correction, but the
 * correction only makes sense if you can see what clustering does to a die map. The model lives in
 * `yield-model.ts` and the real die areas in `yield-presets.ts`, so this file is only the frame:
 * the presets, three controls, the map, and the two yields side by side.
 *
 * Everything the reader sees is either the model's curve or one seeded sample of it. There is no
 * animation, so reduced motion needs nothing here, and the palette is fixed rather than themed: the
 * dies have to keep their meaning against either page background. Every control is a native range
 * input or a button, so the whole thing works from the keyboard.
 *
 * It is used inside `<ClientOnly>`. The canvas is drawn on mount and the readout repeats numbers
 * that also live in the prose, so keeping it out of the server HTML keeps the glossary audit's
 * "first reachable use" rule about prose.
 */

const isEnglish = useIsEnglish()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const area = ref(400)
/** Index into `DENSITY_STEPS`; 0.25 cm⁻² is the middle of the set the chart above plots. */
const densityIndex = ref(DENSITY_STEPS.indexOf(0.25))
const alphaIndex = ref(ALPHAS.indexOf(1))
const priceIndex = ref(WAFER_PRICES.findIndex((row) => row.node === '7 nm'))

const density = computed(() => DENSITY_STEPS[densityIndex.value])
const alpha = computed(() => ALPHAS[alphaIndex.value])
const lambda = computed(() => lambdaFor(area.value, density.value))
const dies = computed(() => dieGrid(area.value))

/**
 * One seed per setting: the same controls always draw the same wafer, so two settings compare. The
 * three indices are packed into one integer, and the area keeps its half millimetres.
 */
const seed = computed(
  () =>
    Math.round(area.value * 100) * 1000 +
    alphaIndex.value * 10 +
    densityIndex.value,
)

const sample = computed(() => sampleWafer(dies.value, lambda.value, alpha.value, seed.value))

const poisson = computed(() => poissonYield(lambda.value))
const clustered = computed(() => clusteredYield(lambda.value, alpha.value))
const clean = computed(() => sample.value.filter((defects) => defects === 0).length)

/** PT writes 0,47 % where EN writes 0.47%. */
function formatNumber(value: number, digits: number): string {
  const text = value.toFixed(digits)
  return isEnglish.value ? text : text.replace('.', ',')
}

/** A trailing zero is noise: 16 stays 16, 0,5 stays 0,5. */
function formatCompact(value: number): string {
  return Number.isInteger(value) ? String(value) : formatNumber(value, 1)
}

/** Densities need two decimals: 0,05 and 0,25 have to stay distinguishable. */
function formatDensity(value: number): string {
  const text = value.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')
  return isEnglish.value ? text : text.replace('.', ',')
}

/** The area as published: 750 mm², and 608,5 mm² where the die really is that size. */
function formatArea(value: number): string {
  return `${Number.isInteger(value) ? String(value) : formatNumber(value, 1)} mm²`
}

function formatPercent(fraction: number): string {
  const value = formatNumber(fraction * 100, 1)
  return isEnglish.value ? `${value}%` : `${value} %`
}

/** The yield curve in the unit the fab sells: how many dies came out good, from the same draw. */
function goodDies(yieldFraction: number): string {
  const count = Math.round(yieldFraction * dies.value.length)
  const noun = count === 1 ? text.value.goodOne : text.value.good
  return `${count.toLocaleString(isEnglish.value ? 'en-US' : 'pt-BR')} ${noun}`
}

const areaText = computed(() => formatArea(area.value))
const densityText = computed(() => `${formatDensity(density.value)} ${text.value.perCm2}`)
const alphaText = computed(() => `α = ${Number.isFinite(alpha.value) ? formatCompact(alpha.value) : '∞'}`)
const lambdaText = computed(() => formatNumber(lambda.value, lambda.value < 1 ? 2 : 1))

function presetLabel(preset: YieldPreset): string {
  return `${preset.die}, ${formatArea(preset.areaMm2)}, ${preset.year}`
}

function isActive(preset: YieldPreset): boolean {
  return Math.abs(area.value - preset.areaMm2) < 0.01
}

const activePreset = computed(() => YIELD_PRESETS.find(isActive) ?? null)
const markFor = (id: string | null) => DENSITY_MARKS.find((m) => m.id === id) ?? null
const activeMark = computed(() => (activePreset.value ? markFor(activePreset.value.densityMark) : null))

/** A preset sets the area, the nearest published D₀ and the nearest priced node. */
function choosePreset(preset: YieldPreset) {
  area.value = preset.areaMm2
  const mark = markFor(preset.densityMark)
  if (mark) densityIndex.value = DENSITY_STEPS.indexOf(mark.d0)
  priceIndex.value = WAFER_PRICES.findIndex((row) => row.node === preset.priceNode)
}

/** The mark the slider sits on, if any, so the dropdown follows the slider as well as driving it. */
const markId = computed({
  get: () => DENSITY_MARKS.find((m) => m.d0 === density.value)?.id ?? '',
  set: (id: string) => {
    const mark = markFor(id)
    if (mark) densityIndex.value = DENSITY_STEPS.indexOf(mark.d0)
  },
})

const local = (value: { pt: string; en: string }) => (isEnglish.value ? value.en : value.pt)
const markLabel = (mark: DensityMark) => `${mark.process} ${local(mark.short)} (${mark.year})`

/** PT writes US$ 16.988 where EN writes $16,988. */
function formatUsd(value: number): string {
  const digits = value >= 100 ? 0 : 2
  const text = value.toLocaleString(isEnglish.value ? 'en-US' : 'pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
  return isEnglish.value ? `$${text}` : `US$ ${text}`
}

const waferPrice = computed(() => WAFER_PRICES[priceIndex.value])
const goodCount = computed(() => clustered.value * dies.value.length)
const costPerGood = computed(() => (goodCount.value >= 1 ? waferPrice.value.usd / goodCount.value : null))

const text = computed(() => {
  const en = isEnglish.value
  return {
    presets: en ? 'Compare with published dies:' : 'Comparar com dies publicados:',
    nearest: en ? 'nearest published D₀' : 'D₀ publicada mais próxima',
    noMark: en ? 'no D₀ published for this process' : 'sem D₀ publicada para este processo',
    marks: en ? 'Published D₀' : 'D₀ publicada',
    pick: en ? 'none at this value' : 'nenhuma neste valor',
    alphaRange: en
      ? `published ${ALPHA_RANGE.min}–${ALPHA_RANGE.max}`
      : `publicado ${String(ALPHA_RANGE.min).replace('.', ',')}–${ALPHA_RANGE.max}`,
    price: en ? `Wafer price, ${WAFER_PRICE_YEAR} (CSET)` : `Preço do wafer, ${WAFER_PRICE_YEAR} (CSET)`,
    perWafer: en ? 'per wafer' : 'por wafer',
    perGood: en ? 'per good die' : 'por die bom',
    noGood: en ? 'no good die expected' : 'nenhum die bom esperado',
    refs: en ? 'Published D₀, wafer prices and the α range:' : 'D₀ publicadas, preços de wafer e faixa de α:',
    area: en ? 'Die area' : 'Área do die',
    density: en ? 'Defect density (D₀)' : 'Densidade de defeitos (D₀)',
    perCm2: en ? 'defect/cm²' : 'defeito/cm²',
    clustering: en ? 'Defect clustering' : 'Agrupamento dos defeitos',
    uniform: en ? 'uniform (Poisson)' : 'uniforme (Poisson)',
    clumped: en ? 'clumped' : 'agrupado',
    legend: en ? 'defects on the die' : 'defeitos no die',
    dies: en ? 'dies per 300 mm (12 in) wafer' : 'dies por wafer de 300 mm (12 pol.)',
    mean: en ? 'mean per die (λ)' : 'média por die (λ)',
    poisson: 'Poisson',
    clustered: en ? 'negative binomial' : 'binomial negativo',
    good: en ? 'good dies' : 'dies bons',
    goodOne: en ? 'good die' : 'die bom',
    agree: en
      ? 'At α = ∞ the negative binomial is the Poisson law itself, so the two curves coincide.'
      : 'Com α = ∞ o binomial negativo é o próprio Poisson, e as duas curvas coincidem.',
    note: en
      ? 'The map is one seeded draw of the model, die by die; the two numbers are that model’s curve, not a count of the drawing. A preset sets the die’s published area and the nearest D₀ a foundry has published for its process; holding the density equal is what makes two chips comparable.'
      : 'O mapa é um sorteio do modelo, die a die; os dois números são a curva desse modelo, não uma contagem do desenho. Um preset aplica a área publicada do die e a D₀ mais próxima que uma foundry publicou para o seu processo; manter a densidade igual dos dois lados é o que torna dois chips comparáveis.',
    areas: en ? 'Die areas as published by their makers:' : 'Áreas dos dies publicadas por quem os desenhou:',
    models: en ? 'Models:' : 'Modelos:',
    canvas: en
      ? `Sampled wafer map: ${dies.value.length} dies on a 300 mm wafer, ${clean.value} of them with no defect.`
      : `Mapa de wafer sorteado: ${dies.value.length} dies num wafer de 300 mm, ${clean.value} sem nenhum defeito.`,
  }
})

/** The die's colour is its defect count, so the legend is the ramp's own labels: 0, 1, 2, 3, 4+. */
const legendLabels = ['0', '1', '2', '3', '4+']

function paint() {
  const canvas = canvasRef.value
  if (!canvas) return
  const box = canvas.clientWidth
  if (!box) return
  const dpr = window.devicePixelRatio || 1
  canvas.width = Math.round(box * dpr)
  canvas.height = Math.round(box * dpr)
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, box, box)

  const centre = box / 2
  const radius = centre * 0.96
  const scale = (2 * radius) / WAFER_MM

  // Solid mask under the grid, so a clean die is never confused with bare wafer.
  ctx.beginPath()
  ctx.arc(centre, centre, radius, 0, Math.PI * 2)
  ctx.fillStyle = '#b8c4d2'
  ctx.fill()
  ctx.strokeStyle = '#7d8b9c'
  ctx.lineWidth = 1.2
  ctx.stroke()

  const half = (Math.sqrt(area.value) / 2) * scale
  const grid = dies.value
  const counts = sample.value
  for (let i = 0; i < grid.length; i++) {
    const die = grid[i]
    ctx.fillStyle = dieColor(counts[i])
    ctx.fillRect(centre + die.x * scale - half, centre + die.y * scale - half, 2 * half - 0.8, 2 * half - 0.8)
  }
}

let sizeObserver: ResizeObserver | null = null

onMounted(() => {
  paint()
  if (typeof ResizeObserver !== 'undefined' && canvasRef.value) {
    sizeObserver = new ResizeObserver(() => paint())
    sizeObserver.observe(canvasRef.value)
  }
})

onBeforeUnmount(() => sizeObserver?.disconnect())

watch([area, densityIndex, alphaIndex], () => paint(), { flush: 'post' })
</script>

<template>
  <div class="yield-explorer">
    <div class="yield-explorer__presets">
      <span class="yield-explorer__presets-label">{{ text.presets }}</span>
      <div class="yield-explorer__preset-row" role="group" :aria-label="text.presets">
        <button
          v-for="preset in YIELD_PRESETS"
          :key="preset.id"
          type="button"
          class="yield-explorer__preset"
          :class="{ 'yield-explorer__preset--active': isActive(preset) }"
          :aria-pressed="isActive(preset)"
          :aria-label="presetLabel(preset)"
          :title="presetLabel(preset)"
          @click="choosePreset(preset)"
        >
          <span class="yield-explorer__preset-product">{{ preset.product }}</span>
          <span class="yield-explorer__preset-area">{{ preset.die }} · {{ formatArea(preset.areaMm2) }}</span>
        </button>
      </div>
      <p v-if="activePreset" class="yield-explorer__preset-info">
        {{ activePreset.die }} · {{ activePreset.process }} <Cite :id="activePreset.processCite" /> ·
        <template v-if="activeMark">
          {{ text.nearest }}: {{ activeMark.process }}, {{ local(activeMark.stated) }} ({{ activeMark.year }})
          <Cite :id="activeMark.cite" />
          <template v-if="activeMark.note"> · {{ local(activeMark.note) }} <Cite :id="activeMark.note.cite" /></template>
        </template>
        <template v-else>{{ text.noMark }}</template>
      </p>
    </div>

    <div class="yield-explorer__grid">
      <div class="yield-explorer__panel">
        <canvas ref="canvasRef" class="yield-explorer__canvas" role="img" :aria-label="text.canvas" />
        <ul class="yield-explorer__legend">
          <li>{{ text.legend }}</li>
          <li v-for="(color, i) in DIE_COLORS" :key="i">
            <span class="yield-explorer__swatch" :style="{ background: color }" />
            <span>{{ legendLabels[i] }}</span>
          </li>
        </ul>
      </div>

      <div class="yield-explorer__side">
        <label class="yield-explorer__control">
          <span class="yield-explorer__control-label">{{ text.area }}</span>
          <input
            v-model.number="area"
            type="range"
            :min="AREA_MIN"
            :max="AREA_MAX"
            :step="AREA_STEP"
            :aria-valuetext="areaText"
          />
          <span class="yield-explorer__control-value">{{ areaText }}</span>
        </label>

        <label class="yield-explorer__control">
          <span class="yield-explorer__control-label">{{ text.density }}</span>
          <input
            v-model.number="densityIndex"
            type="range"
            min="0"
            :max="DENSITY_STEPS.length - 1"
            step="1"
            :aria-valuetext="densityText"
          />
          <span class="yield-explorer__control-value">{{ densityText }}</span>
        </label>
        <label class="yield-explorer__marks">
          <span>{{ text.marks }}</span>
          <select v-model="markId">
            <option value="" disabled>{{ text.pick }}</option>
            <option v-for="mark in DENSITY_MARKS" :key="mark.id" :value="mark.id">{{ markLabel(mark) }}</option>
          </select>
        </label>

        <label class="yield-explorer__control">
          <span class="yield-explorer__control-label">{{ text.clustering }}</span>
          <input
            v-model.number="alphaIndex"
            type="range"
            min="0"
            :max="ALPHAS.length - 1"
            step="1"
            :aria-valuetext="alphaText"
          />
          <span class="yield-explorer__control-value">{{ alphaText }}</span>
        </label>
        <p class="yield-explorer__ends">
          <span aria-hidden="true">{{ text.uniform }}</span>
          <span>{{ text.alphaRange }} <Cite :id="ALPHA_RANGE.cite" /></span>
          <span aria-hidden="true">{{ text.clumped }}</span>
        </p>

        <dl class="yield-explorer__metrics">
          <div>
            <dt>{{ text.dies }}</dt>
            <dd>{{ dies.length }}</dd>
          </div>
          <div>
            <dt>{{ text.mean }}</dt>
            <dd>{{ lambdaText }}</dd>
          </div>
        </dl>

        <ul class="yield-explorer__bars">
          <li>
            <span class="yield-explorer__bar-label">
              {{ text.poisson }}
              <span class="yield-explorer__bar-count">≈ {{ goodDies(poisson) }}</span>
            </span>
            <span class="yield-explorer__bar-track">
              <span
                class="yield-explorer__bar-fill yield-explorer__bar-fill--uniform"
                :style="{ width: `${poisson * 100}%` }"
              />
            </span>
            <span class="yield-explorer__bar-value">{{ formatPercent(poisson) }}</span>
          </li>
          <li>
            <span class="yield-explorer__bar-label">
              {{ text.clustered }}
              <span class="yield-explorer__bar-count">≈ {{ goodDies(clustered) }}</span>
            </span>
            <span class="yield-explorer__bar-track">
              <span class="yield-explorer__bar-fill" :style="{ width: `${clustered * 100}%` }" />
            </span>
            <span class="yield-explorer__bar-value">{{ formatPercent(clustered) }}</span>
          </li>
        </ul>

        <p v-if="!Number.isFinite(alpha)" class="yield-explorer__agree">{{ text.agree }}</p>

        <div class="yield-explorer__cost">
          <label class="yield-explorer__cost-head">
            <span>{{ text.price }}</span>
            <select v-model.number="priceIndex">
              <option v-for="(row, i) in WAFER_PRICES" :key="row.node" :value="i">{{ row.node }}</option>
            </select>
          </label>
          <p class="yield-explorer__cost-line">
            <strong>{{ formatUsd(waferPrice.usd) }}</strong> {{ text.perWafer }} <Cite :id="WAFER_PRICE_SOURCE" /> ·
            <template v-if="costPerGood !== null">≈ <strong>{{ formatUsd(costPerGood) }}</strong> {{ text.perGood }}</template>
            <template v-else>{{ text.noGood }}</template>
          </p>
        </div>
      </div>
    </div>

    <p class="yield-explorer__note">{{ text.note }}</p>
    <p class="yield-explorer__sources">
      {{ text.areas }} NVIDIA (TU102, GA102, AD102, GB202) <Cite id="nvidia-ada-whitepaper" />
      <Cite id="nvidia-blackwell-whitepaper" />, AMD (Zeppelin) <Cite id="amd-chiplet-economics" />.
      <span class="yield-explorer__models">{{ text.models }}</span>
      <Cite id="leachman-yield" /> <Cite id="murphy-1964" />
      <span class="yield-explorer__models">{{ text.refs }}</span>
      <Cite id="cadence-tsmc-2016" /> <Cite id="anandtech-samsung-14nm" /> <Cite id="anandtech-tsmc-d0" />
      <Cite id="cset-ai-chips" /> <Cite id="bogdanov-clustering" />
    </p>
  </div>
</template>

<style scoped>
.yield-explorer {
  margin: 1.25rem 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.yield-explorer__presets {
  margin-bottom: 1rem;
}

.yield-explorer__presets-label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.yield-explorer__preset-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.yield-explorer__preset {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 0.35rem 0.55rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
  line-height: 1.25;
  text-align: left;
  cursor: pointer;
}

.yield-explorer__preset:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.yield-explorer__preset:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 1px;
}

.yield-explorer__preset--active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-text-1);
}

.yield-explorer__preset-product {
  font-weight: 600;
}

.yield-explorer__preset-area {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

.yield-explorer__grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 560px) {
  .yield-explorer__grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: start;
  }
}

.yield-explorer__panel {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.yield-explorer__canvas {
  display: block;
  width: 100%;
  aspect-ratio: 1;
}

.yield-explorer__legend {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.yield-explorer__legend li {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.yield-explorer__swatch {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  border: 1px solid rgba(125, 139, 156, 0.55);
}

.yield-explorer__side {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.yield-explorer__control {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.15rem 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.yield-explorer__control-label {
  grid-column: 1 / -1;
}

.yield-explorer__control input {
  width: 100%;
  accent-color: var(--vp-c-brand-1);
}

.yield-explorer__control-value {
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.yield-explorer__ends {
  display: flex;
  justify-content: space-between;
  margin: -0.4rem 0 0;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.yield-explorer__metrics {
  display: flex;
  gap: 1.25rem;
  margin: 0;
}

.yield-explorer__metrics dt {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.yield-explorer__metrics dd {
  margin: 0;
  font-size: 1.05rem;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
}

.yield-explorer__bars {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.yield-explorer__bars li {
  display: grid;
  grid-template-columns: 9.5rem minmax(0, 1fr) 3.4rem;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.yield-explorer__bar-label {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
  color: var(--vp-c-text-2);
}

.yield-explorer__bar-count {
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

.yield-explorer__bar-track {
  display: block;
  height: 10px;
  border-radius: 5px;
  background: rgba(125, 139, 156, 0.22);
  overflow: hidden;
}

.yield-explorer__bar-fill {
  display: block;
  height: 100%;
  border-radius: 5px;
  background: var(--vp-c-brand-1);
}

.yield-explorer__bar-fill--uniform {
  background: #a0aec0;
}

.yield-explorer__bar-value {
  text-align: right;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
}

.yield-explorer__agree {
  margin: 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.yield-explorer__note,
.yield-explorer__sources {
  margin: 0.9rem 0 0;
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.yield-explorer__models {
  color: var(--vp-c-text-2);
}

.yield-explorer__preset-info {
  margin: 0.5rem 0 0;
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.yield-explorer__marks,
.yield-explorer__cost-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.yield-explorer__marks {
  margin-top: -0.3rem;
}

.yield-explorer__marks > span,
.yield-explorer__cost-head > span {
  white-space: nowrap;
}

.yield-explorer__marks select,
.yield-explorer__cost select {
  min-width: 0;
  padding: 0.15rem 0.3rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.8rem;
}

.yield-explorer__cost {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--vp-c-divider);
}


.yield-explorer__cost-line {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  font-variant-numeric: tabular-nums;
}

@media (max-width: 559px) {
  .yield-explorer__bars li {
    grid-template-columns: 8rem minmax(0, 1fr) 3.2rem;
  }
}
</style>
