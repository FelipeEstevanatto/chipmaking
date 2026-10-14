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

.fab-process__scrub {
  display: block;
  width: 100%;
  margin: 0.6rem 0 0;
  accent-color: var(--vp-c-brand-1);
  cursor: pointer;
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
