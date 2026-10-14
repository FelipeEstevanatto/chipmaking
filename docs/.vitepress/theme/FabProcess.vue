<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { useIsEnglish } from './locale'
import { FAB_STAGES, READOUT_LABELS, type FabReadout } from './fab-stages'
import { createFabScene, type FabSceneHandle } from './fab-scene'

/**
 * The fab loop, as a small 3D viewer with a cross-section beside it.
 *
 * The 3D part shows the wafer and one process rig per module (a furnace hood, a curtain of atoms,
 * the spin-coating and exposure of the resist, a plasma, an implant beam, a polishing pad, a
 * probe); the exact layer changes are the 2D stack the cross-section draws, driven by
 * `fab-stages.ts`. It is wrapped in `<ClientOnly>` at the call site, keeps three.js behind a dynamic
 * import (`fab-scene.ts`), and gives a reader who asked for reduced motion the same seven pictures
 * without the animation.
 */

const isEnglish = useIsEnglish()

const props = withDefaults(defineProps<{ initial?: number }>(), { initial: 0 })

const stage = ref(Math.min(Math.max(props.initial, 0), FAB_STAGES.length - 1))
const playing = ref(false)
const failed = ref(false)
const focus = ref(false)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const rootRef = ref<HTMLElement | null>(null)
const stageRef = ref<HTMLElement | null>(null)
const scene = shallowRef<FabSceneHandle | null>(null)
const canExpand = ref(false)
const expanded = ref(false)
const readout = ref<FabReadout[]>([])

const stages = FAB_STAGES
const current = computed(() => stages[stage.value])
const labeled = computed(() => current.value.shapes.filter((s) => s.labelPt))

const text = computed(() => ({
  title: isEnglish.value ? 'The wafer on its rounds' : 'O wafer em suas voltas',
  hint: isEnglish.value ? 'drag to rotate · scroll to zoom' : 'arraste para girar · role para aproximar',
  hintTouch: isEnglish.value ? 'drag to rotate · pinch to zoom' : 'arraste para girar · pinça para aproximar',
  play: isEnglish.value ? 'Play' : 'Reproduzir',
  pause: isEnglish.value ? 'Pause' : 'Pausar',
  prev: isEnglish.value ? 'Previous module' : 'Módulo anterior',
  next: isEnglish.value ? 'Next module' : 'Próximo módulo',
  focus: isEnglish.value ? 'Zoom to a die' : 'Ampliar um die',
  focusOff: isEnglish.value ? 'Back to the whole wafer' : 'Voltar ao wafer inteiro',
  fullscreen: isEnglish.value ? 'Full screen' : 'Tela cheia',
  exitFullscreen: isEnglish.value ? 'Exit full screen' : 'Sair da tela cheia',
  modules: isEnglish.value ? 'Modules of the loop' : 'Módulos do laço',
  step: (n: number) => (isEnglish.value ? `Module ${n} of ${stages.length}` : `Módulo ${n} de ${stages.length}`),
  note: isEnglish.value
    ? 'The 3D view is a schematic of each process; the stack beside it is a schematic of the layer changes. Neither is a measurement.'
    : 'A vista 3D é um esquema de cada processo; a pilha ao lado é um esquema das mudanças de camada. Nenhuma das duas é uma medição.',
  failed: isEnglish.value
    ? 'This browser cannot draw the 3D wafer, so only the cross-section is shown.'
    : 'Este navegador não consegue desenhar o wafer em 3D, então só o corte é mostrado.',
}))

const label = (s: (typeof stages)[number]) => (isEnglish.value ? s.labelEn : s.labelPt)
const caption = (s: (typeof stages)[number]) => (isEnglish.value ? s.captionEn : s.captionPt)
const shapeLabel = (s: { labelPt?: string; labelEn?: string }) =>
  isEnglish.value ? s.labelEn : s.labelPt

const readoutLabel = (id: string) => {
  const entry = READOUT_LABELS[id]
  return entry ? (isEnglish.value ? entry.en : entry.pt) : id
}

const canvasLabel = computed(() =>
  isEnglish.value
    ? `A silicon wafer, ${label(current.value)}. Drag to rotate, pinch or scroll to zoom.`
    : `Um wafer de silício, ${label(current.value)}. Arraste para girar, use a pinça ou a rolagem para aproximar.`,
)

function cssColor(variable: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
  return value || fallback
}

const DWELL = 6200

let motionQuery: MediaQueryList | null = null
let themeObserver: MutationObserver | null = null
let intersection: IntersectionObserver | null = null
let timer = 0
let visible = true
let reduced = false

function background() {
  return cssColor('--vp-c-bg-soft', '#f6f6f7')
}

function clearTimer() {
  if (timer) window.clearTimeout(timer)
  timer = 0
}

function tick() {
  clearTimer()
  if (!playing.value || reduced || !visible) return
  timer = window.setTimeout(() => {
    stage.value = (stage.value + 1) % stages.length
    tick()
  }, DWELL)
}

function go(next: number) {
  stage.value = (next + stages.length) % stages.length
}

function togglePlay() {
  playing.value = !playing.value
  if (playing.value) tick()
  else clearTimer()
}

function toggleFocus() {
  focus.value = !focus.value
  scene.value?.setFocus(focus.value)
}

function syncExpanded() {
  expanded.value = document.fullscreenElement === stageRef.value
}

function toggleExpanded() {
  const element = stageRef.value
  if (!element) return
  if (document.fullscreenElement === element) void document.exitFullscreen()
  else void element.requestFullscreen().catch(() => undefined)
}

function applyMotion() {
  if (!motionQuery) return
  reduced = motionQuery.matches
  if (reduced) {
    playing.value = false
    clearTimer()
  }
  scene.value?.setAutoRotate(!reduced && visible)
}

onMounted(async () => {
  const canvas = canvasRef.value
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionQuery.addEventListener('change', applyMotion)

  if (canvas) {
    const handle = await createFabScene(canvas)
    if (!handle) {
      failed.value = true
    } else {
      scene.value = handle
      handle.setBackground(background())
      handle.setStage(stage.value, current.value.mode)
      handle.setReadout((lines) => {
        readout.value = lines
      })
      applyMotion()

      themeObserver = new MutationObserver(() => handle.setBackground(background()))
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

      if (rootRef.value) {
        intersection = new IntersectionObserver(
          (entries) => {
            visible = entries.some((entry) => entry.isIntersecting)
            handle.setAutoRotate(!reduced && visible)
            if (playing.value) tick()
          },
          { threshold: 0.1 },
        )
        intersection.observe(rootRef.value)
      }
    }
  }

  reduced = motionQuery.matches
  canExpand.value = document.fullscreenEnabled === true
  document.addEventListener('fullscreenchange', syncExpanded)
})

watch(stage, (value) => scene.value?.setStage(value, current.value.mode))

onBeforeUnmount(() => {
  clearTimer()
  motionQuery?.removeEventListener('change', applyMotion)
  themeObserver?.disconnect()
  intersection?.disconnect()
  document.removeEventListener('fullscreenchange', syncExpanded)
  scene.value?.dispose()
  scene.value = null
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') {
    go(stage.value - 1)
    event.preventDefault()
  } else if (event.key === 'ArrowRight') {
    go(stage.value + 1)
    event.preventDefault()
  }
}
</script>

<template>
  <div ref="rootRef" class="fab-process">
    <div class="fab-process__head">
      <span class="fab-process__title">{{ text.title }}</span>
      <span class="fab-process__step">{{ text.step(stage + 1) }}</span>
    </div>

    <div class="fab-process__grid">
      <div ref="stageRef" class="fab-process__stage">
        <canvas
          ref="canvasRef"
          class="fab-process__canvas"
          role="application"
          tabindex="0"
          :aria-label="canvasLabel"
          @keydown="onKeydown"
        />

        <div v-if="!failed" class="fab-process__tools">
          <button
            type="button"
            :class="{ 'is-current': focus }"
            :title="focus ? text.focusOff : text.focus"
            :aria-label="focus ? text.focusOff : text.focus"
            :aria-pressed="focus"
            @click="toggleFocus"
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="10" r="3.2" />
              <path d="M10 2v3M10 15v3M2 10h3M15 10h3" />
            </svg>
          </button>
          <button
            v-if="canExpand"
            type="button"
            :title="expanded ? text.exitFullscreen : text.fullscreen"
            :aria-label="expanded ? text.exitFullscreen : text.fullscreen"
            :aria-pressed="expanded"
            @click="toggleExpanded"
          >
            <svg v-if="expanded" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M17 8h-5V3M12 8l4.5-4.5M3 12h5v5M8 12l-4.5 4.5" />
            </svg>
            <svg v-else viewBox="0 0 20 20" aria-hidden="true">
              <path d="M12 3h5v5M17 3l-4.5 4.5M8 17H3v-5M3 17l4.5-4.5" />
            </svg>
          </button>
        </div>

        <ul v-if="!failed && readout.length" class="fab-process__readout">
          <li v-for="line in readout" :key="line.id">
            <span class="fab-process__readout-label">{{ readoutLabel(line.id) }}</span>
            <span class="fab-process__readout-value">{{ line.value }}</span>
          </li>
        </ul>

        <p v-if="!failed" class="fab-process__hint">
          <span class="fab-process__hint-pointer">{{ text.hint }}</span>
          <span class="fab-process__hint-touch">{{ text.hintTouch }}</span>
        </p>
        <p v-if="failed" class="fab-process__fallback">{{ text.failed }}</p>
      </div>

      <aside class="fab-process__side">
        <svg class="fab-process__section" viewBox="0 0 100 100" role="img" :aria-label="caption(current)">
          <rect
            v-for="(shape, i) in current.shapes"
            :key="i"
            :x="shape.x"
            :y="shape.y"
            :width="shape.w"
            :height="shape.h"
            :fill="shape.fill"
            :stroke="shape.stroke"
            stroke-width="0.7"
          />
          <text
            v-for="(shape, i) in labeled"
            :key="`l${i}`"
            :x="shape.x + shape.w / 2"
            :y="shape.y + shape.h / 2 + 3"
            text-anchor="middle"
            font-size="7"
            :fill="shape.labelColor || '#1a202c'"
          >
            {{ shapeLabel(shape) }}
          </text>
        </svg>
        <p class="fab-process__caption">{{ caption(current) }}</p>
      </aside>
    </div>

    <div class="fab-process__controls">
      <button type="button" :title="text.prev" :aria-label="text.prev" @click="go(stage - 1)">‹</button>
      <button type="button" class="fab-process__play" @click="togglePlay">
        {{ playing ? text.pause : text.play }}
      </button>
      <button type="button" :title="text.next" :aria-label="text.next" @click="go(stage + 1)">›</button>

      <ol class="fab-process__modules" :aria-label="text.modules">
        <li v-for="(s, i) in stages" :key="s.id">
          <button
            type="button"
            :class="{ 'is-current': i === stage }"
            :aria-pressed="i === stage"
            @click="go(i)"
          >
            {{ label(s) }}
          </button>
        </li>
      </ol>
    </div>

    <p class="fab-process__note">{{ text.note }}</p>
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
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.6rem;
}

.fab-process__title {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.fab-process__step {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.fab-process__grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: minmax(0, 1fr);
}

@media (min-width: 760px) {
  .fab-process__grid {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  }
}

.fab-process__stage {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
  aspect-ratio: 16 / 10;
}

.fab-process__canvas {
  display: block;
  width: 100%;
  height: 100%;
  cursor: grab;
  touch-action: none;
}

.fab-process__canvas:active {
  cursor: grabbing;
}

.fab-process__canvas:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

.fab-process__tools {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.25rem;
}

.fab-process__tools button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.fab-process__tools button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.fab-process__tools button.is-current {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.fab-process__tools svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
}

.fab-process__hint {
  position: absolute;
  left: 0.5rem;
  bottom: 0.4rem;
  margin: 0;
  padding: 0.15rem 0.45rem;
  border-radius: 5px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-3);
  font-size: 0.68rem;
  pointer-events: none;
}

.fab-process__readout {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  display: grid;
  gap: 0.1rem 0.6rem;
  margin: 0;
  padding: 0.4rem 0.6rem;
  list-style: none;
  border-radius: 6px;
  background: color-mix(in srgb, var(--vp-c-bg) 82%, transparent);
  pointer-events: none;
}

.fab-process__readout li {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-size: 0.72rem;
  line-height: 1.35;
}

.fab-process__readout-label {
  min-width: 6.5rem;
  color: var(--vp-c-text-3);
}

.fab-process__readout-value {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.fab-process__hint-touch {
  display: none;
}

@media (hover: none) {
  .fab-process__hint-pointer {
    display: none;
  }

  .fab-process__hint-touch {
    display: inline;
  }
}

.fab-process__fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 1.5rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

.fab-process__side {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
}

.fab-process__section {
  width: 100%;
  height: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.fab-process__caption {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.fab-process__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.75rem;
}

.fab-process__controls > button {
  min-width: 2rem;
  height: 2rem;
  padding: 0 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.fab-process__controls > button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.fab-process__play {
  min-width: 5rem !important;
}

.fab-process__modules {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0.2rem 0 0;
  padding: 0;
  list-style: none;
}

.fab-process__modules button {
  padding: 0.25rem 0.55rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.76rem;
  cursor: pointer;
}

.fab-process__modules button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.fab-process__modules button.is-current {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  box-shadow: inset 0 0 0 1px var(--vp-c-brand-1);
}

.fab-process__note {
  margin: 0.7rem 0 0;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}
</style>
