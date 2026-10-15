<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
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
const lap = ref(1)
const readout = ref<FabReadout[]>([])
const progress = ref(0)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const rootRef = ref<HTMLElement | null>(null)
const modulesRef = ref<HTMLElement | null>(null)

const scene = new FabScene()
const reduced = ref(false)

let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let lastFrame = 0
let stageStartedAt = 0
let readoutClock = 999
let dark = false
let dirty = true
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
  stack: isEnglish.value ? 'Layers on the wafer' : 'Camadas do wafer',
  prev: isEnglish.value ? 'Previous module' : 'Módulo anterior',
  next: isEnglish.value ? 'Next module' : 'Próximo módulo',
  ownChapter: isEnglish.value ? 'Has its own chapter' : 'Tem capítulo próprio',
  lap: isEnglish.value
    ? `Lap ${lap.value} through the seven modules`
    : `Volta ${lap.value} pelos sete módulos`,
  lapNote: isEnglish.value
    ? 'A real wafer goes round the same modules dozens of times. The seven are the visit order of one lap.'
    : 'Um wafer real dá dezenas de voltas pelos mesmos módulos. Os sete são a ordem de uma volta.',
  timeline: isEnglish.value ? 'Process timeline' : 'Linha do processo',
  phases: isEnglish.value ? 'Phases of the module' : 'Fases do módulo',
  note: isEnglish.value
    ? 'Each drawing is a schematic of one module, with its own scale bar. The layers carry over from module to module; the scale cannot, which is why a 3 nm film and a 430 nm oxide are never in the same picture.'
    : 'Cada desenho é um esquema de um módulo, com sua própria escala. As camadas passam de um módulo para o outro; a escala não, e é por isso que um filme de 3 nm e um óxido de 430 nm nunca estão no mesmo desenho.',
}))

const readoutLabel = (id: string) => {
  const entry = READOUT_LABELS[id]
  return entry ? (isEnglish.value ? entry.en : entry.pt) : id
}

/** Portuguese writes 0,11 where English writes 0.11, and the readout values come from the scene. */
const readoutValue = (value: string) => (isEnglish.value ? value : value.replace(/\./g, ','))

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

/** What a screen reader is told: the module, and the step of the process it is on. */
const canvasLabel = computed(() => {
  const tab = text(current.value.tab).toLowerCase()
  const step = text(current.value.phases[phaseNow.value].label)
  return isEnglish.value
    ? `Animated cross-section of the wafer during ${tab}. Step: ${step}.`
    : `Corte animado do wafer na etapa de ${tab}. Passo: ${step}.`
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
  const fraction = list[index].at / duration.value
  scene.seek(fraction)
  progress.value = fraction
  readout.value = scene.readout()
  dirty = true
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
  dirty = false
}

function goTo(index: number) {
  const next = ((index % stages.length) + stages.length) % stages.length
  stage.value = next
  scene.enter(next, stages[next].mode)
  if (reduced.value) scene.settle()
  stageStartedAt = performance.now()
  readoutClock = 999
  progress.value = reduced.value ? 1 : 0
  readout.value = scene.readout()
  dirty = true
}

/** Starts the clock. A module that already ran to its end replays from the beginning. */
function play() {
  if (!reduced.value && scene.progress() >= 1) goTo(stage.value)
  playing.value = true
  stageStartedAt = performance.now()
}

/** The reader picked a module from the tabs or the arrows: show it and start it. */
function choose(index: number) {
  goTo(index)
  play()
}

/** Steps a module forward or back, counting a lap each time the loop wraps round. */
function step(delta: number) {
  const from = stage.value
  choose(from + delta)
  if (delta > 0 && from === stages.length - 1) lap.value += 1
  else if (delta < 0 && from === 0) lap.value = Math.max(1, lap.value - 1)
}

// The rail scrolls sideways when the seven tabs do not fit; centre the active one. Only the rail's
// own scrollLeft moves, so an auto-advance never drags the page up to the figure.
watch(
  stage,
  () => {
    const box = modulesRef.value
    const active = box?.querySelector('.fab-process__tab.is-current') as HTMLElement | null
    if (!box || !active) return
    const boxRect = box.getBoundingClientRect()
    const activeRect = active.getBoundingClientRect()
    box.scrollLeft += activeRect.left - boxRect.left - (boxRect.width - activeRect.width) / 2
  },
  { flush: 'post' },
)

function onKeydown(event: KeyboardEvent) {
  // The slider and the buttons keep their own arrow keys; this is only for the frame itself.
  if (event.target !== rootRef.value) return
  if (event.key === 'ArrowLeft') {
    step(-1)
    event.preventDefault()
  } else if (event.key === 'ArrowRight') {
    step(1)
    event.preventDefault()
  }
}

/** The scrubber: stop the clock and sit where the reader put the handle. */
function onScrub(event: Event) {
  const value = Number((event.target as HTMLInputElement).value)
  playing.value = false
  scene.seek(value / 1000)
  progress.value = value / 1000
  readout.value = scene.readout()
  dirty = true
}

/** The play/pause button: one switch over the whole sequence, current module included. */
function toggle() {
  if (playing.value) playing.value = false
  else play()
}

/** How long a module holds before the next one takes over: its play time plus a beat to read it. */
function dwell(): number {
  return STAGE_DURATION[current.value.mode] + 2200
}

function frame(now: number) {
  raf = requestAnimationFrame(frame)
  const dt = lastFrame ? Math.min(64, now - lastFrame) : 16
  lastFrame = now

  const frozen = reduced.value || !playing.value
  if (!frozen) scene.update(dt)

  // A frozen scene only needs redrawing when something has actually changed.
  if (!frozen || dirty) paint()

  if (!frozen) {
    readoutClock += dt
    if (readoutClock > 160) {
      readoutClock = 0
      readout.value = scene.readout()
      progress.value = scene.progress()
    }
  }

  if (playing.value && now - stageStartedAt > dwell()) step(1)
}

function start() {
  if (raf) return
  lastFrame = 0
  // Give the module a full dwell from the moment the reader can actually see it.
  if (playing.value) stageStartedAt = performance.now()
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
  // The sequence starts on its own as the figure scrolls into view; the button pauses it.
  if (!reduced.value) play()

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
  <div ref="rootRef" class="fab-process" tabindex="0" @keydown="onKeydown">
    <div class="fab-process__head">
      <p class="fab-process__title">{{ labels.title }}</p>
      <button class="fab-process__play" type="button" @click="toggle">
        {{ playing ? labels.pause : labels.play }}
      </button>
    </div>

    <p class="fab-process__step">{{ labels.step }}</p>

    <div class="fab-process__rail">
      <button
        type="button"
        class="fab-process__step-btn"
        :title="labels.prev"
        :aria-label="labels.prev"
        @click="step(-1)"
      >
        ‹
      </button>
      <ol ref="modulesRef" class="fab-process__modules" :aria-label="labels.modules">
        <li v-for="(s, i) in stages" :key="s.id">
          <button
            type="button"
            :class="['fab-process__tab', { 'is-current': i === stage }]"
            :aria-pressed="i === stage"
            :title="text(s.tab)"
            @click="choose(i)"
          >
            <span class="fab-process__tab-num">{{ i + 1 }}</span>
            <span class="fab-process__tab-label">{{ text(s.tab) }}</span>
            <span v-if="s.ownChapter" class="fab-process__tab-mark" :title="labels.ownChapter" aria-hidden="true">↗</span>
          </button>
        </li>
      </ol>
      <button
        type="button"
        class="fab-process__step-btn"
        :title="labels.next"
        :aria-label="labels.next"
        @click="step(1)"
      >
        ›
      </button>
    </div>

    <p class="fab-process__lap" :title="labels.lapNote">
      <span aria-hidden="true">↻</span> {{ labels.lap }}
    </p>

    <canvas
      ref="canvasRef"
      class="fab-process__canvas"
      role="img"
      :aria-label="canvasLabel"
    />

    <ol class="fab-process__stack" :aria-label="labels.stack">
      <li
        v-for="layer in current.stack"
        :key="layer.id"
        :class="['fab-process__layer', `fab-process__layer--${layer.id}`, `is-${layer.role}`]"
      >
        <span class="fab-process__layer-swatch" aria-hidden="true" />
        {{ text(layer.label) }}
      </li>
    </ol>

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

    <ol class="fab-process__phases" :aria-label="labels.phases">
      <li v-for="(phase, i) in current.phases" :key="i" :style="{ flexGrow: phaseSpan(i) }">
        <button
          type="button"
          :class="['fab-process__phase', { 'is-current': i === phaseNow }]"
          :title="text(phase.label)"
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
        <span class="fab-process__readout-value">{{ readoutValue(line.value) }}</span>
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

/* VitePress spaces every `li + li` in the page by 8px; inside these rows that only pushes the
   siblings down and leaves the first item looking raised. Reset it. */
.fab-process li {
  margin: 0;
}

.fab-process__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
}

.fab-process__title {
  flex: 1 1 auto;
  min-width: 11rem;
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
  overflow: hidden;
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  text-overflow: ellipsis;
}

.fab-process:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
  border-radius: 8px;
}

.fab-process__rail {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  min-width: 0;
}

.fab-process__step-btn {
  flex: 0 0 auto;
  width: 1.8rem;
  height: 1.8rem;
  padding: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
}

.fab-process__step-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.fab-process__modules {
  display: flex;
  flex: 1 1 auto;
  flex-wrap: nowrap;
  gap: 0.15rem;
  min-width: 0;
  margin: 0;
  padding: 0;
  overflow-x: auto;
  scrollbar-width: none;
  list-style: none;
}

.fab-process__modules::-webkit-scrollbar {
  display: none;
}

.fab-process__modules li {
  display: flex;
  flex: 0 0 auto;
}

.fab-process__tab-mark {
  margin-left: 0.1rem;
  color: var(--vp-c-text-3);
  font-size: 0.7rem;
}

.fab-process__lap {
  margin: 0.35rem 0 0.8rem;
  overflow: hidden;
  font-size: 0.76rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  text-overflow: ellipsis;
}

.fab-process__stack {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.3rem;
  margin: 0.6rem 0 0;
  padding: 0;
  overflow-x: auto;
  scrollbar-width: none;
  list-style: none;
}

.fab-process__stack::-webkit-scrollbar {
  display: none;
}

.fab-process__layer {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.35rem;
  height: 1.7rem;
  box-sizing: border-box;
  white-space: nowrap;
  padding: 0 0.5rem 0 0.3rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-3);
  font-size: 0.72rem;
  line-height: 1;
}

.fab-process__layer-swatch {
  width: 0.7rem;
  height: 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 2px;
  background: var(--swatch, transparent);
}

.fab-process__layer.is-carry {
  opacity: 0.72;
}

.fab-process__layer.is-add {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.fab-process__layer.is-remove {
  border-color: var(--vp-c-danger-1);
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.fab-process__layer--si { --swatch: #cfd8e3; }
.fab-process__layer--oxide { --swatch: #f6e05e; }
.fab-process__layer--dielectric { --swatch: #f6e05e; }
.fab-process__layer--film { --swatch: #90cdf4; }
.fab-process__layer--barrier { --swatch: #90cdf4; }
.fab-process__layer--resist { --swatch: #c6f6d5; }
.fab-process__layer--copper { --swatch: #ed8936; }
.fab-process__layer--doped { --swatch: #dd6b20; }
.fab-process__layer--trench { --swatch: #ffffff; }
.fab-process__layer--relief { --swatch: #c53030; }

.fab-process__tab {
  display: inline-flex;
  flex: 1 1 auto;
  align-items: center;
  gap: 0.2rem;
  height: 1.7rem;
  box-sizing: border-box;
  min-width: 0;
  overflow: hidden;
  padding: 0 0.35rem 0 0.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.72rem;
  line-height: 1;
  white-space: nowrap;
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
  flex: 0 0 auto;
  min-width: 0.5rem;
  color: var(--vp-c-text-3);
  font-size: 0.66rem;
  font-variant-numeric: tabular-nums;
  text-align: center;
}

.fab-process__tab-label {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.fab-process__tab.is-current .fab-process__tab-num {
  color: var(--vp-c-brand-1);
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
  align-items: stretch;
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
  width: 100%;
  min-width: 0;
  height: 1.75rem;
  box-sizing: border-box;
  padding: 0 0.45rem;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-3);
  font-size: 0.72rem;
  line-height: 1.75rem;
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
