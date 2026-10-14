<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useIsEnglish } from './locale'
import { FAB_STAGES, READOUT_LABELS, STAGE_DURATION, type FabReadout } from './fab-stages'
import { DARK, FabScene, LIGHT, SCENE_H, SCENE_W } from './fab-scene'

/**
 * The fab loop, as an animated cross-section of the wafer.
 *
 * Each module of the loop gets its own drawing of what the process does to the wafer — the oxide
 * splitting around the original surface, the ALD film following a trench wall, the RIE ions cutting
 * a vertical wall, the implant beam tilted 7°, the pad erasing the relief, the ellipsometer reading
 * the film back — with the quantities the chapter cites printed underneath. The script lives in
 * `fab-stages.ts` and the drawing in `fab-scene.ts`, so this file is only the frame: controls, text,
 * resize and the loop.
 *
 * It is used inside `<ClientOnly>` — the canvas is drawn on mount and its captions repeat numbers
 * that also live in the prose, so keeping it out of the server HTML keeps the glossary audit's
 * "first reachable use" rule about prose.
 *
 * Readers who asked for reduced motion get the same seven pictures without the animation: each
 * module jumps to its end state and the molecules in flight are left out.
 */

const isEnglish = useIsEnglish()

const stages = FAB_STAGES
const stage = ref(0)
const playing = ref(false)
const paused = ref(false)
const readout = ref<FabReadout[]>([])
const progress = ref(0)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const rootRef = ref<HTMLElement | null>(null)

const scene = new FabScene()
const reduced = ref(false)

let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let lastFrame = 0
let stageStartedAt = 0
let readoutClock = 999
let dark = false
let observer: IntersectionObserver | null = null
let themeObserver: MutationObserver | null = null
let sizeObserver: ResizeObserver | null = null

const current = computed(() => stages[stage.value])

const text = (value: { pt: string; en: string }) => (isEnglish.value ? value.en : value.pt)

const labels = computed(() => ({
  title: isEnglish.value ? 'The wafer on its rounds' : 'O wafer em suas voltas',
  play: isEnglish.value ? 'Play the sequence' : 'Reproduzir a sequência',
  pause: isEnglish.value ? 'Pause' : 'Pausar',
  step: isEnglish.value
    ? `Module ${stage.value + 1} of ${stages.length}: ${text(current.value.tab)}`
    : `Módulo ${stage.value + 1} de ${stages.length}: ${text(current.value.tab)}`,
  modules: isEnglish.value ? 'Modules of the loop' : 'Módulos do laço',
  timeline: isEnglish.value ? 'Process timeline' : 'Linha do processo',
  phases: isEnglish.value ? 'Phases of the module' : 'Fases do módulo',
  canvas: isEnglish.value
    ? `Animated cross-section of the wafer during ${text(current.value.tab).toLowerCase()}.`
    : `Corte animado do wafer durante a etapa de ${text(current.value.tab).toLowerCase()}.`,
  note: isEnglish.value
    ? 'Each drawing is a schematic of one module, with its own scale bar. None of them is a measurement.'
    : 'Cada desenho é um esquema de um módulo, com sua própria escala. Nenhum deles é uma medição.',
}))

const readoutLabel = (id: string) => {
  const entry = READOUT_LABELS[id]
  return entry ? (isEnglish.value ? entry.en : entry.pt) : id
}

// The phase script is written in seconds; `STAGE_DURATION` is in milliseconds.
const duration = computed(() => STAGE_DURATION[current.value.mode] / 1000)

/** Where each phase begins, as a 0…1 fraction of the module, for the checkpoints on the timeline. */
const marks = computed(() => current.value.phases.map((phase) => phase.at / duration.value))

/** Which phase is running now, from the scrub position. */
const phaseNow = computed(() => {
  const list = current.value.phases
  const t = progress.value * duration.value
  let index = 0
  for (let i = 0; i < list.length; i += 1) if (t >= list[i].at - 1e-6) index = i
  return index
})

/** How long a phase lasts, so the badges are as wide as the step they stand for. */
const phaseSpan = (index: number) => {
  const list = current.value.phases
  const end = index + 1 < list.length ? list[index + 1].at : duration.value
  return Math.max(end - list[index].at, 0.2)
}

/** A tick at fraction `f`, placed on the thumb's own travel (the thumb is a fixed 14 px). */
const tickLeft = (fraction: number) => `calc(${7 - fraction * 14}px + ${fraction * 100}%)`

/** Jumping to a phase stops the clock and sits at the second it begins. */
function goToPhase(index: number) {
  const list = current.value.phases
  if (!list[index]) return
  playing.value = false
  paused.value = true
  const fraction = list[index].at / duration.value
  scene.seek(fraction)
  progress.value = fraction
  readout.value = scene.readout()
}

/** Sizes the backing store to the space the page gave the canvas, so nothing is blurry. */
function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  const width = canvas.clientWidth
  if (!width) return
  const ratio = window.devicePixelRatio || 1
  canvas.width = Math.round(width * ratio)
  canvas.height = Math.round((width * ratio * SCENE_H) / SCENE_W)
  ctx = canvas.getContext('2d')
  if (!ctx) return
  const scale = (width * ratio) / SCENE_W
  ctx.setTransform(scale, 0, 0, scale, 0, 0)
  paint()
}

function paint() {
  if (!ctx) return
  ctx.clearRect(0, 0, SCENE_W, SCENE_H)
  scene.draw(ctx, dark ? DARK : LIGHT)
}

function goTo(index: number) {
  const next = ((index % stages.length) + stages.length) % stages.length
  stage.value = next
  scene.enter(next, stages[next].mode)
  if (reduced.value) scene.settle()
  stageStartedAt = performance.now()
  readoutClock = 999
  paused.value = false
  progress.value = reduced.value ? 1 : 0
}

/** The scrubber: stop the clock and sit where the reader put the handle. */
function onScrub(event: Event) {
  const value = Number((event.target as HTMLInputElement).value)
  playing.value = false
  paused.value = true
  scene.seek(value / 1000)
  progress.value = value / 1000
  readout.value = scene.readout()
}

function toggle() {
  playing.value = !playing.value
  stageStartedAt = performance.now()
  if (!playing.value) return
  paused.value = false
  // Pressing play on a module that already ran replays it, rather than sitting on the end state.
  if (scene.progress() >= 1) goTo(stage.value)
}

/** How long a module holds before the next one takes over: its play time plus a beat to read it. */
function dwell(): number {
  return STAGE_DURATION[current.value.mode] + 2200
}

function frame(now: number) {
  raf = requestAnimationFrame(frame)
  const dt = lastFrame ? Math.min(64, now - lastFrame) : 16
  lastFrame = now

  scene.update(reduced.value || paused.value ? 0 : dt)
  paint()

  readoutClock += dt
  if (readoutClock > 160) {
    readoutClock = 0
    readout.value = scene.readout()
    progress.value = scene.progress()
  }

  if (playing.value && now - stageStartedAt > dwell()) goTo(stage.value + 1)
}

function start() {
  if (raf) return
  lastFrame = 0
  raf = requestAnimationFrame(frame)
}

function stop() {
  if (!raf) return
  cancelAnimationFrame(raf)
  raf = 0
}

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  scene.motion = !reduced.value
  dark = document.documentElement.classList.contains('dark')
  goTo(0)
  resize()

  // The column the chapter is set in changes width when the sidebar folds, so the backing store
  // follows the element rather than the window.
  sizeObserver = new ResizeObserver(() => resize())
  if (canvasRef.value) sizeObserver.observe(canvasRef.value)

  observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) start()
    else stop()
  })
  if (rootRef.value) observer.observe(rootRef.value)

  // The site switches theme by toggling a class on <html>, which the canvas has to follow by hand.
  themeObserver = new MutationObserver(() => {
    const next = document.documentElement.classList.contains('dark')
    if (next === dark) return
    dark = next
    paint()
  })
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onBeforeUnmount(() => {
  stop()
  observer?.disconnect()
  themeObserver?.disconnect()
  sizeObserver?.disconnect()
})
</script>

<template>
  <div ref="rootRef" class="fab-process">
    <div class="fab-process__head">
      <p class="fab-process__title">{{ labels.title }}</p>
      <button class="fab-process__play" type="button" @click="toggle">
        {{ playing ? labels.pause : labels.play }}
      </button>
    </div>

    <p class="fab-process__step">{{ labels.step }}</p>

    <ol class="fab-process__modules" :aria-label="labels.modules">
      <li v-for="(s, i) in stages" :key="s.id">
        <button
          type="button"
          :class="['fab-process__tab', { 'is-current': i === stage }]"
          :aria-pressed="i === stage"
          @click="goTo(i)"
        >
          <span class="fab-process__tab-num">{{ i + 1 }}</span>
          {{ text(s.tab) }}
        </button>
      </li>
    </ol>

    <canvas
      ref="canvasRef"
      class="fab-process__canvas"
      role="img"
      :aria-label="labels.canvas"
    />

    <div class="fab-process__timeline">
      <input
        class="fab-process__scrub"
        type="range"
        min="0"
        max="1000"
        step="1"
        :value="Math.round(progress * 1000)"
        :aria-label="labels.timeline"
        @input="onScrub"
      />
      <span class="fab-process__ticks" aria-hidden="true">
        <i v-for="(mark, i) in marks" :key="i" :style="{ left: tickLeft(mark) }" />
      </span>
    </div>

    <ol v-if="current.phases.length > 1" class="fab-process__phases" :aria-label="labels.phases">
      <li v-for="(phase, i) in current.phases" :key="i" :style="{ flexGrow: phaseSpan(i) }">
        <button
          type="button"
          :class="['fab-process__phase', { 'is-current': i === phaseNow }]"
          :aria-current="i === phaseNow ? 'step' : undefined"
          @click="goToPhase(i)"
        >
          {{ text(phase.label) }}
        </button>
      </li>
    </ol>

    <ul v-if="readout.length" class="fab-process__readout">
      <li v-for="line in readout" :key="line.id">
        <span class="fab-process__readout-label">{{ readoutLabel(line.id) }}</span>
        <span class="fab-process__readout-value">{{ line.value }}</span>
      </li>
    </ul>

    <div class="fab-process__caption">
      <p class="fab-process__caption-title">{{ text(current.title) }}</p>
      <p class="fab-process__caption-text">{{ text(current.caption) }}</p>
      <p class="fab-process__caption-note">{{ text(current.note) }}</p>
    </div>

    <p class="fab-process__note">{{ labels.note }}</p>
  </div>
</template>

<style scoped>
.fab-process {
  margin: 1.5rem 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.fab-process__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.fab-process__title {
  margin: 0;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.fab-process__play {
  flex: 0 0 auto;
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.8rem;
  cursor: pointer;
}

.fab-process__play:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.fab-process__step {
  margin: 0.15rem 0 0.7rem;
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
}

.fab-process__modules {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0 0 0.8rem;
  padding: 0;
  list-style: none;
}

.fab-process__tab {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.6rem 0.25rem 0.35rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.78rem;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.fab-process__tab:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.fab-process__tab.is-current {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.fab-process__tab-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
}

.fab-process__tab.is-current .fab-process__tab-num {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.fab-process__canvas {
  display: block;
  width: 100%;
  aspect-ratio: 900 / 560;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.fab-process__timeline {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0.7rem 0 0;
}

.fab-process__scrub {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 18px;
  margin: 0;
  background: transparent;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}

.fab-process__scrub::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 2px;
  background: var(--vp-c-divider);
}

.fab-process__scrub::-moz-range-track {
  height: 4px;
  border-radius: 2px;
  background: var(--vp-c-divider);
}

.fab-process__scrub::-webkit-slider-thumb {
  width: 14px;
  height: 14px;
  margin-top: -5px;
  box-sizing: border-box;
  border: 2px solid var(--vp-c-bg);
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  appearance: none;
  -webkit-appearance: none;
}

.fab-process__scrub::-moz-range-thumb {
  width: 14px;
  height: 14px;
  box-sizing: border-box;
  border: 2px solid var(--vp-c-bg);
  border-radius: 50%;
  background: var(--vp-c-brand-1);
}

.fab-process__scrub:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
  border-radius: 4px;
}

.fab-process__ticks {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.fab-process__ticks i {
  position: absolute;
  top: 50%;
  width: 1px;
  height: 12px;
  background: var(--vp-c-text-3);
  transform: translate(-50%, -50%);
}

.fab-process__phases {
  display: flex;
  gap: 1px;
  margin: 0.25rem 7px 0;
  padding: 0;
  list-style: none;
}

.fab-process__phases li {
  display: flex;
  flex-basis: 0;
  min-width: 0;
}

.fab-process__phase {
  flex: 1 1 auto;
  min-width: 0;
  padding: 0.25rem 0.45rem;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-3);
  font-size: 0.72rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.fab-process__phase:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.fab-process__phase.is-current {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.fab-process__readout {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 0.4rem;
  margin: 0.7rem 0 0;
  padding: 0;
  list-style: none;
}

.fab-process__readout li {
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
  padding: 0.2rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 0.76rem;
}

.fab-process__readout-label {
  color: var(--vp-c-text-3);
}

.fab-process__readout-value {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.fab-process__caption {
  margin-top: 0.9rem;
}

.fab-process__caption-title {
  margin: 0 0 0.2rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.fab-process__caption-text {
  margin: 0 0 0.35rem;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.fab-process__caption-note {
  margin: 0;
  font-size: 0.84rem;
  line-height: 1.55;
  color: var(--vp-c-text-3);
}

.fab-process__note {
  margin: 0.8rem 0 0;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}
</style>
