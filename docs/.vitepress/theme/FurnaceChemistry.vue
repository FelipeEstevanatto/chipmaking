<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useIsEnglish } from './locale'
import { FURNACE_STAGES } from './furnace-stages'
import { DARK, FurnaceScene, LIGHT, SCENE_H, SCENE_W, type Pick, type Tooltip } from './furnace-scene'

/**
 * The chemistry inside the submerged-arc furnace, drawn as an animated canvas.
 *
 * The chapter prints three equations; this shows what they do to the atoms, one beat at a time, and
 * marks where in the vessel each beat happens. The stage script lives in `furnace-stages.ts` and the
 * drawing in `furnace-scene.ts`, so this file is only the frame: the controls, the localised text,
 * the resize and the loop.
 *
 * It is used inside `<ClientOnly>` — the canvas is drawn on mount and its captions repeat numbers
 * that also live in the prose, so keeping it out of the server HTML keeps the glossary audit's
 * "first reachable use" rule about prose.
 *
 * Readers who asked for reduced motion get the same four pictures without the animation: the
 * transitions snap and the off-gas bubbles stay out.
 */

const isEnglish = useIsEnglish()

const stages = FURNACE_STAGES
const stage = ref(0)
const playing = ref(false)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const rootRef = ref<HTMLElement | null>(null)

/** How long an autoplaying stage holds before the next one takes over. */
const DWELL = 9200

const scene = new FurnaceScene()
const reduced = ref(false)

/** The name of whatever the pointer is on, drawn by the scene; null when it is on nothing. */
let tooltip: Tooltip | null = null
let hovered: Pick | null = null

let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let lastFrame = 0
let stageStartedAt = 0
let dark = false
let observer: IntersectionObserver | null = null
let themeObserver: MutationObserver | null = null
let sizeObserver: ResizeObserver | null = null

const current = computed(() => stages[stage.value])

const text = (value: { pt: string; en: string }) => (isEnglish.value ? value.en : value.pt)

const labels = computed(() => ({
  play: isEnglish.value ? 'Play the sequence' : 'Reproduzir a sequência',
  pause: isEnglish.value ? 'Pause' : 'Pausar',
  step: isEnglish.value
    ? `Step ${stage.value + 1} of ${stages.length}: ${text(current.value.title)}`
    : `Etapa ${stage.value + 1} de ${stages.length}: ${text(current.value.title)}`,
  canvas: isEnglish.value
    ? `Animated diagram of the furnace chemistry. ${text(current.value.title)}. ${current.value.equation}`
    : `Diagrama animado da química do forno. ${text(current.value.title)}. ${current.value.equation}`,
  legend: isEnglish.value
    ? 'Si silicon · O oxygen · C carbon — a schematic of the bond changes, not a balanced atom count'
    : 'Si silício · O oxigênio · C carbono — esquema das trocas de ligação, não uma contagem balanceada de átomos',
  hint: isEnglish.value
    ? 'Point at an atom to see its name.'
    : 'Aponte para um átomo para ver o nome dele.',
  names: isEnglish.value
    ? { Si: 'Silicon (Si)', O: 'Oxygen (O)', C: 'Carbon (C)', CO: 'Carbon monoxide (CO)', SiO: 'Silicon monoxide (SiO)' }
    : { Si: 'Silício (Si)', O: 'Oxigênio (O)', C: 'Carbono (C)', CO: 'Monóxido de carbono (CO)', SiO: 'Monóxido de silício (SiO)' },
}))

/** Turns whatever the pointer found into the name shown in the canvas. */
function nameOf(hit: Pick): string {
  if (hit.kind === 'atom' && hit.element) return labels.value.names[hit.element]
  if (hit.kind === 'molecule' && hit.molecule) return labels.value.names[hit.molecule]
  return ''
}

const palette = () => (dark ? DARK : LIGHT)

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
  // The scene transform set in `resize` is still in place, so this clears the whole canvas.
  ctx.clearRect(0, 0, SCENE_W, SCENE_H)
  scene.draw(ctx, palette(), tooltip)
}

/** Canvas pixels to scene units, for pointer hit-testing. */
function toScene(event: PointerEvent) {
  const canvas = canvasRef.value
  if (!canvas) return null
  const rect = canvas.getBoundingClientRect()
  if (!rect.width) return null
  return {
    x: ((event.clientX - rect.left) * SCENE_W) / rect.width,
    y: ((event.clientY - rect.top) * SCENE_H) / rect.height,
  }
}

function onPointerMove(event: PointerEvent) {
  const point = toScene(event)
  if (!point) return
  const hit = scene.pick(point.x, point.y)
  const same = hit && hovered && hit.id === hovered.id
  hovered = hit
  scene.highlighted = hit ? hit.id : null
  if (!hit) {
    tooltip = null
    return
  }
  if (same) {
    // Keep following the actor, which may still be travelling.
    if (tooltip) {
      tooltip.x = hit.x
      tooltip.y = hit.y
    }
    return
  }
  tooltip = { text: nameOf(hit), x: hit.x, y: hit.y }
}

function onPointerLeave() {
  hovered = null
  tooltip = null
  scene.highlighted = null
}

function goTo(index: number) {
  const next = ((index % stages.length) + stages.length) % stages.length
  stage.value = next
  scene.enter(next)
  stageStartedAt = performance.now()
}

function toggle() {
  playing.value = !playing.value
  stageStartedAt = performance.now()
  if (playing.value) goTo(stage.value)
}

function frame(now: number) {
  raf = requestAnimationFrame(frame)
  const dt = lastFrame ? Math.min(64, now - lastFrame) : 16
  lastFrame = now

  // With reduced motion the transitions resolve in a couple of frames instead of easing.
  scene.update(reduced.value ? dt * 22 : dt)
  paint()

  if (playing.value && now - stageStartedAt > DWELL) goTo(stage.value + 1)
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
  <div ref="rootRef" class="furnace-chemistry">
    <div class="fc-head">
      <p class="fc-progress">{{ labels.step }}</p>
      <button class="fc-play" type="button" @click="toggle">
        {{ playing ? labels.pause : labels.play }}
      </button>
    </div>

    <ol class="fc-tabs">
      <li v-for="(item, index) in stages" :key="item.id">
        <button
          type="button"
          :class="['fc-tab', { 'is-active': index === stage }]"
          :aria-pressed="index === stage"
          @click="goTo(index)"
        >
          <span class="fc-tab-title">{{ text(item.tab) }}</span>
          <span class="fc-tab-temp">{{ item.temp }}</span>
        </button>
      </li>
    </ol>

    <canvas
      ref="canvasRef"
      class="fc-canvas"
      role="img"
      :aria-label="labels.canvas"
      @pointermove="onPointerMove"
      @pointerdown="onPointerMove"
      @pointerleave="onPointerLeave"
      @pointercancel="onPointerLeave"
    />

    <div class="fc-caption">
      <p class="fc-equation">{{ current.equation }}</p>
      <p class="fc-note">{{ text(current.note) }}</p>
      <p class="fc-legend">{{ labels.legend }}</p>
      <p class="fc-hint">{{ labels.hint }}</p>
    </div>
  </div>
</template>

<style scoped>
.furnace-chemistry {
  margin: 1.5rem 0;
  padding: 1rem 1rem 0.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.fc-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.fc-progress {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.fc-play {
  flex: 0 0 auto;
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.8rem;
  cursor: pointer;
}

.fc-play:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.fc-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.75rem 0;
  padding: 0;
  list-style: none;
}

.fc-tab {
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.fc-tab:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.fc-tab.is-active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.fc-tab-temp {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  font-variant-numeric: tabular-nums;
}

.fc-canvas {
  display: block;
  width: 100%;
  aspect-ratio: 900 / 470;
}

.fc-caption {
  padding-bottom: 0.75rem;
}

.fc-equation {
  margin: 0.5rem 0 0.35rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.fc-note {
  margin: 0 0 0.35rem;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.fc-legend {
  margin: 0;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.fc-hint {
  margin: 0.15rem 0 0;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

@media (max-width: 640px) {
  .fc-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
