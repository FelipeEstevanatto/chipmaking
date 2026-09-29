<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import Cite from './Cite.vue'
import { useIsEnglish } from './locale'
import {
  buildCell,
  buildCrystal,
  buildInstances,
  cellReciprocal,
  legendFor,
  occupancy,
  parseColor,
  type Vec3,
} from './crystal/geometry'
import { CrystalRenderer } from './crystal/renderer'
import { STRUCTURES, getStructure, type Metric, type Structure } from './crystal/structures'

/**
 * The interactive structure viewer on the element chapter: the lattice the silicon numbers
 * describe, drawn in WebGL2, plus the bonds the industry actually builds with it (carbide, alloy,
 * oxide).
 *
 * The catalogue lives in `crystal/structures.ts` and the drawing lives in `crystal/renderer.ts`;
 * this file is the frame around both. Three rules matter behind the markup:
 *
 *  - the canvas is wrapped in `<ClientOnly>` at the call site, like every other embed here, so the
 *    prose a reader sees is never duplicated into the built HTML the glossary audit inspects;
 *  - every string is duplicated in the two locales, and the numbers use the locale's separator;
 *  - the view never animates on its own for a reader who asked the system for reduced motion.
 */

const props = withDefaults(
  defineProps<{
    /** Which structure opens first, by id. */
    initial?: string
    /** Cells per axis at load, between 1 and 3. */
    initialSize?: number
  }>(),
  { initial: 'si', initialSize: 1 },
)

/**
 * The angle the unit-cell panel opens on, in degrees: a corner of the cell, where the cut faces the
 * reader instead of turning away from them.
 */
const CELL_VIEW = { yaw: 248, pitch: -4 }

const isEnglish = useIsEnglish()
const selected = ref(getStructure(props.initial).id)
const size = ref(Math.min(Math.max(Math.round(props.initialSize), 1), 3))
const failed = ref(false)
/** The unit cell panel, which the reader can put away and bring back. */
const showCell = ref(true)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const occupancyRef = ref<HTMLCanvasElement | null>(null)
const renderer = shallowRef<CrystalRenderer | null>(null)
const occupancyRenderer = shallowRef<CrystalRenderer | null>(null)

/** The two elements that can go on the whole screen: the block, and the cell with its number. */
const stageRef = ref<HTMLElement | null>(null)
const cellRef = ref<HTMLElement | null>(null)
const expanded = ref<'stage' | 'cell' | null>(null)
const canExpand = ref(false)

function syncExpanded() {
  const element = document.fullscreenElement
  expanded.value = element === stageRef.value ? 'stage' : element === cellRef.value ? 'cell' : null
}

function toggleExpanded(which: 'stage' | 'cell') {
  const element = which === 'stage' ? stageRef.value : cellRef.value
  if (!element) return
  if (document.fullscreenElement === element) void document.exitFullscreen()
  else void element.requestFullscreen().catch(() => undefined)
}

const structure = computed(() => getStructure(selected.value))
const crystal = computed(() => buildCrystal(structure.value, size.value))
const legend = computed(() => legendFor(crystal.value))
/** The cell on its own, and how full of matter it is — both independent of the extent control. */
const cell = computed(() => buildCell(structure.value))
const fill = computed(() => occupancy(structure.value, cell.value))
const percent = computed(() => Math.round(fill.value.fraction * 100))

const structureName = computed(() => (isEnglish.value ? structure.value.nameEn : structure.value.namePt))
const note = computed(() => (isEnglish.value ? structure.value.noteEn : structure.value.notePt))
const metricLabel = (metric: Metric) => (isEnglish.value ? metric.labelEn : metric.labelPt)
const metricValue = (metric: Metric) => (isEnglish.value ? metric.valueEn : metric.valuePt)

const sizeLabel = computed(() => {
  if (size.value === 1) return isEnglish.value ? '1 cell' : '1 célula'
  return isEnglish.value
    ? `${size.value} × ${size.value} × ${size.value} cells`
    : `${size.value} × ${size.value} × ${size.value} células`
})

const canvasLabel = computed(() => {
  const atoms = isEnglish.value ? `${crystal.value.atoms.length} atoms` : `${crystal.value.atoms.length} átomos`
  return isEnglish.value
    ? `${structureName.value}, ${atoms}, ${sizeLabel.value}. Drag to rotate, and use the arrow keys when focused.`
    : `${structureName.value}, ${atoms}, ${sizeLabel.value}. Arraste para girar e use as setas do teclado quando estiver em foco.`
})

const text = computed(() => ({
  size: isEnglish.value ? 'Extent' : 'Extensão',
  reset: isEnglish.value ? 'Recentre the view' : 'Recentrar a vista',
  zoomIn: isEnglish.value ? 'Zoom in' : 'Aproximar',
  zoomOut: isEnglish.value ? 'Zoom out' : 'Afastar',
  hintPointer: isEnglish.value ? 'drag to rotate · scroll to zoom' : 'arraste para girar · role para aproximar',
  hintTouch: isEnglish.value ? 'drag to rotate · pinch to zoom' : 'arraste para girar · pinça para aproximar',
  fullscreen: isEnglish.value ? 'Full screen' : 'Tela cheia',
  exitFullscreen: isEnglish.value ? 'Exit full screen' : 'Sair da tela cheia',
  occupancy: isEnglish.value ? 'One unit cell' : 'Uma célula unitária',
  hideCell: isEnglish.value ? 'Hide the unit cell' : 'Ocultar a célula unitária',
  showCell: isEnglish.value ? 'Show the unit cell' : 'Mostrar a célula unitária',
  filled: isEnglish.value
    ? 'of the cell volume sits inside the atoms'
    : 'do volume da célula está dentro dos átomos',
  model: isEnglish.value
    ? 'Spheres at true size, touching along the bond and cut by the faces of the cell.'
    : 'Esferas no tamanho real, encostando ao longo da ligação e cortadas pelas faces da célula.',
  atoms: (count: number) =>
    isEnglish.value ? `${count} atoms in the cell` : `${count} átomos na célula`,
  scale: isEnglish.value
    ? 'The lattice is to scale. In the main view the atoms are drawn at 72% of their covalent radius; in the unit cell they are at true size.'
    : 'A rede está em escala. Na estrutura principal os átomos são desenhados a 72% do raio covalente; na célula unitária, no tamanho real.',
  failed: isEnglish.value
    ? 'This browser does not provide WebGL2, so the structure cannot be drawn here.'
    : 'Este navegador não oferece WebGL2, então a estrutura não pode ser desenhada aqui.',
  structures: isEnglish.value ? 'Structure' : 'Estrutura',
}))

const occupancyLabel = computed(() =>
  isEnglish.value
    ? `One unit cell of ${structureName.value}: ${percent.value}% of its volume is inside the atoms.`
    : `Uma célula unitária de ${structureName.value}: ${percent.value}% do volume está dentro dos átomos.`,
)

/** A CSS custom property to the three floats the renderer wants. */
function cssColor(variable: string, fallback: Vec3): Vec3 {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
  if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(value)) return parseColor(value)

  const rgb = /rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/i.exec(value)
  if (rgb) return [Number(rgb[1]) / 255, Number(rgb[2]) / 255, Number(rgb[3]) / 255]
  return fallback
}

const background = () => cssColor('--vp-c-bg-soft', [0.96, 0.96, 0.97])

function paint() {
  const instance = renderer.value
  if (!instance) return
  const built = crystal.value
  instance.setGeometry(buildInstances(built), built.center, built.radius)
}

/** The unit cell at full-size radii, cut open at its own faces. */
function paintOccupancy() {
  const instance = occupancyRenderer.value
  if (!instance) return
  const built = cell.value
  instance.setClip(cellReciprocal(structure.value.cell))
  instance.setGeometry(buildInstances(built, fill.value.radii), built.center, built.radius * 1.06)
}

let themeObserver: MutationObserver | null = null
let motionQuery: MediaQueryList | null = null

function applyMotionPreference() {
  if (!motionQuery || !renderer.value) return
  renderer.value.setAutoRotate(!motionQuery.matches)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const instance = CrystalRenderer.create(canvas)
  if (!instance) {
    failed.value = true
    return
  }

  renderer.value = instance
  instance.setBackground(background())
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionQuery.addEventListener('change', applyMotionPreference)
  applyMotionPreference()
  paint()

  // Full screen is not offered where the browser will not grant it, an embedded frame without the
  // permission being the case a reader here would actually meet.
  canExpand.value = document.fullscreenEnabled === true
  document.addEventListener('fullscreenchange', syncExpanded)

  const inset = occupancyRef.value
  const insetRenderer = inset ? CrystalRenderer.create(inset, CELL_VIEW) : null
  if (insetRenderer) {
    occupancyRenderer.value = insetRenderer
    insetRenderer.setBackground(background())
    insetRenderer.setAutoRotate(!motionQuery.matches)
    paintOccupancy()
  }

  // The panel follows the site theme, so both canvases are repainted on every switch.
  themeObserver = new MutationObserver(() => {
    const color = background()
    instance.setBackground(color)
    insetRenderer?.setBackground(color)
  })
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

watch([selected, size], paint)
watch(cell, paintOccupancy)

onBeforeUnmount(() => {
  motionQuery?.removeEventListener('change', applyMotionPreference)
  document.removeEventListener('fullscreenchange', syncExpanded)
  themeObserver?.disconnect()
  renderer.value?.dispose()
  occupancyRenderer.value?.dispose()
  renderer.value = null
  occupancyRenderer.value = null
})

function onKeydown(event: KeyboardEvent) {
  const instance = renderer.value
  if (!instance) return
  const step = event.shiftKey ? 15 : 5
  let handled = true

  switch (event.key) {
    case 'ArrowLeft':
      instance.orbitBy(-step, 0)
      break
    case 'ArrowRight':
      instance.orbitBy(step, 0)
      break
    case 'ArrowUp':
      instance.orbitBy(0, -step)
      break
    case 'ArrowDown':
      instance.orbitBy(0, step)
      break
    case '+':
    case '=':
      instance.zoomBy(0.88)
      break
    case '-':
    case '_':
      instance.zoomBy(1.14)
      break
    case 'Home':
      instance.reset()
      break
    default:
      handled = false
  }

  if (handled) event.preventDefault()
}

const choose = (next: Structure) => {
  selected.value = next.id
}
</script>

<template>
  <div class="crystal-viewer">
    <div class="crystal-viewer__picker" role="group" :aria-label="text.structures">
      <button
        v-for="item in STRUCTURES"
        :key="item.id"
        type="button"
        class="crystal-viewer__chip"
        :class="{ 'is-current': item.id === selected }"
        :aria-pressed="item.id === selected"
        @click="choose(item)"
      >
        <span class="crystal-viewer__chip-formula">{{ item.formula }}</span>
        <span class="crystal-viewer__chip-name">{{ isEnglish ? item.nameEn : item.namePt }}</span>
      </button>
    </div>

    <div class="crystal-viewer__grid" :class="{ 'is-collapsed': !showCell }">
      <div ref="stageRef" class="crystal-viewer__stage">
        <canvas
          ref="canvasRef"
          class="crystal-viewer__canvas"
          role="application"
          tabindex="0"
          :aria-label="canvasLabel"
          @keydown="onKeydown"
        />

        <div v-if="!failed" class="crystal-viewer__tools">
          <button
            type="button"
            class="crystal-viewer__toggle"
            :class="{ 'is-current': showCell }"
            :aria-pressed="showCell"
            :title="showCell ? text.hideCell : text.showCell"
            :aria-label="showCell ? text.hideCell : text.showCell"
            @click="showCell = !showCell"
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <rect x="3" y="4" width="14" height="12" rx="2" />
              <path d="M12.5 4v12" />
            </svg>
          </button>
          <button
            v-if="canExpand"
            type="button"
            :title="expanded === 'stage' ? text.exitFullscreen : text.fullscreen"
            :aria-label="expanded === 'stage' ? text.exitFullscreen : text.fullscreen"
            :aria-pressed="expanded === 'stage'"
            @click="toggleExpanded('stage')"
          >
            <svg v-if="expanded === 'stage'" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M17 8h-5V3M12 8l4.5-4.5M3 12h5v5M8 12l-4.5 4.5" />
            </svg>
            <svg v-else viewBox="0 0 20 20" aria-hidden="true">
              <path d="M12 3h5v5M17 3l-4.5 4.5M8 17H3v-5M3 17l4.5-4.5" />
            </svg>
          </button>
          <button type="button" :title="text.zoomIn" :aria-label="text.zoomIn" @click="renderer?.zoomBy(0.85)">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10 5v10M5 10h10" />
            </svg>
          </button>
          <button type="button" :title="text.zoomOut" :aria-label="text.zoomOut" @click="renderer?.zoomBy(1.18)">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5 10h10" />
            </svg>
          </button>
          <button type="button" :title="text.reset" :aria-label="text.reset" @click="renderer?.reset()">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M15.5 7.5A6 6 0 1 0 16 11M15.5 3.5v4h-4" />
            </svg>
          </button>
        </div>

        <p v-if="failed" class="crystal-viewer__fallback">{{ text.failed }}</p>

        <p v-if="!failed" class="crystal-viewer__hint">
          <span class="crystal-viewer__hint-pointer">{{ text.hintPointer }}</span>
          <span class="crystal-viewer__hint-touch">{{ text.hintTouch }}</span>
        </p>
      </div>

      <aside v-show="showCell && !failed" ref="cellRef" class="crystal-viewer__occupancy">
        <div class="crystal-viewer__stage crystal-viewer__stage--inset">
          <canvas ref="occupancyRef" class="crystal-viewer__canvas" aria-hidden="true" />
          <div v-if="canExpand" class="crystal-viewer__tools crystal-viewer__tools--inset">
            <button
              type="button"
              :title="expanded === 'cell' ? text.exitFullscreen : text.fullscreen"
              :aria-label="expanded === 'cell' ? text.exitFullscreen : text.fullscreen"
              :aria-pressed="expanded === 'cell'"
              @click="toggleExpanded('cell')"
            >
              <svg v-if="expanded === 'cell'" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M17 8h-5V3M12 8l4.5-4.5M3 12h5v5M8 12l-4.5 4.5" />
              </svg>
              <svg v-else viewBox="0 0 20 20" aria-hidden="true">
                <path d="M12 3h5v5M17 3l-4.5 4.5M8 17H3v-5M3 17l4.5-4.5" />
              </svg>
            </button>
          </div>
        </div>
        <p class="crystal-viewer__fill">
          <span class="crystal-viewer__fill-value">{{ percent }}%</span>
          <span class="crystal-viewer__fill-label">{{ text.filled }}</span>
        </p>
        <div class="crystal-viewer__meter" role="img" :aria-label="occupancyLabel">
          <span class="crystal-viewer__meter-filled" :style="{ width: `${(fill.fraction * 100).toFixed(1)}%` }" />
        </div>
        <p class="crystal-viewer__occupancy-note">
          {{ text.model }} {{ text.atoms(fill.atoms) }}.
        </p>
      </aside>
    </div>

    <div class="crystal-viewer__bar">
      <label class="crystal-viewer__size">
        <span class="crystal-viewer__size-label">{{ text.size }}</span>
        <input v-model.number="size" type="range" min="1" :max="structure.maxRepeat" step="1" />
        <span class="crystal-viewer__size-value">{{ sizeLabel }}</span>
      </label>

      <ul class="crystal-viewer__legend">
        <li v-for="item in legend" :key="item.symbol">
          <span class="crystal-viewer__swatch" :style="{ background: item.color, borderColor: item.ink }" />
          <span class="crystal-viewer__legend-symbol">{{ item.symbol }}</span>
          {{ isEnglish ? item.en : item.pt }}
        </li>
      </ul>
    </div>

    <dl class="crystal-viewer__metrics">
      <div v-for="metric in structure.metrics" :key="metric.labelEn">
        <dt>{{ metricLabel(metric) }}</dt>
        <dd>{{ metricValue(metric) }}</dd>
      </div>
    </dl>

    <p class="crystal-viewer__note">
      {{ note }}
      <Cite v-for="id in structure.sourceIds" :id="id" :key="id" />
    </p>

    <p class="crystal-viewer__scale">{{ text.scale }}</p>
  </div>
</template>

<style scoped>
.crystal-viewer {
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

/* ------------------------------------------------------------------ picker */

.crystal-viewer__picker {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.crystal-viewer__chip {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1rem;
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s, color 0.2s;
}

.crystal-viewer__chip:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.crystal-viewer__chip.is-current {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  box-shadow: inset 0 0 0 1px var(--vp-c-brand-1);
}

.crystal-viewer__chip-formula {
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 1.2;
}

.crystal-viewer__chip-name {
  font-size: 0.72rem;
  line-height: 1.2;
  color: var(--vp-c-text-3);
}

.crystal-viewer__chip.is-current .crystal-viewer__chip-name {
  color: var(--vp-c-brand-1);
}

/* ------------------------------------------------------------------- stage */

/* The unit cell sits beside the main view on a wide screen and under it on a narrow one. */
.crystal-viewer__grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: minmax(0, 1fr);
}

.crystal-viewer__grid.is-collapsed {
  grid-template-columns: minmax(0, 1fr);
}

.crystal-viewer__stage {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
}

.crystal-viewer__stage--inset {
  aspect-ratio: 1 / 1;
}

.crystal-viewer__occupancy {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-width: 0;
}

.crystal-viewer__fill {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0;
  font-size: 0.74rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.crystal-viewer__fill-value {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.crystal-viewer__meter {
  height: 6px;
  border-radius: 999px;
  background: var(--vp-c-divider);
  overflow: hidden;
}

.crystal-viewer__meter-filled {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: var(--vp-c-brand-1);
}

.crystal-viewer__occupancy-note {
  margin: 0;
  font-size: 0.7rem;
  line-height: 1.45;
  color: var(--vp-c-text-3);
}

@media (min-width: 760px) {
  .crystal-viewer__grid {
    grid-template-columns: minmax(0, 1fr) 12.5rem;
  }

  /* With the panel away the block gets the whole width, which is what the reader asked for. */
  .crystal-viewer__grid.is-collapsed {
    grid-template-columns: minmax(0, 1fr);
  }

  .crystal-viewer__stage--inset {
    flex: 1 1 auto;
    aspect-ratio: auto;
    min-height: 9rem;
  }
}

.crystal-viewer__canvas {
  display: block;
  width: 100%;
  height: 100%;
  cursor: grab;
  /* The drag turns the block, so the browser must not scroll the page under the finger. */
  touch-action: none;
}

.crystal-viewer__canvas:active {
  cursor: grabbing;
}

.crystal-viewer__canvas:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

.crystal-viewer__tools {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.25rem;
}

.crystal-viewer__tools button {
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

.crystal-viewer__tools button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.crystal-viewer__tools button.is-current {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.crystal-viewer__tools svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
}

/* The unit cell is a small panel, so its buttons come down to its size. */
.crystal-viewer__tools--inset button {
  width: 24px;
  height: 24px;
}

.crystal-viewer__tools--inset svg {
  width: 13px;
  height: 13px;
}

/*
 * Full screen. The drawing keeps the page's own background rather than the black a backdrop would
 * show, and the controls grow with it. The unit cell takes its percentage and its model line along,
 * which is the reason it expands the panel and not just the canvas: a number left behind on a page
 * the reader can no longer see is worse than no number.
 */
.crystal-viewer__stage:fullscreen {
  border: 0;
  border-radius: 0;
  background: var(--vp-c-bg-soft);
}

.crystal-viewer__stage:fullscreen .crystal-viewer__hint {
  font-size: 0.85rem;
}

.crystal-viewer__occupancy:fullscreen {
  gap: 0.75rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
}

.crystal-viewer__occupancy:fullscreen .crystal-viewer__stage {
  width: min(100%, calc(100vh - 14rem));
  margin: 0 auto;
}

.crystal-viewer__occupancy:fullscreen .crystal-viewer__fill {
  font-size: 1rem;
}

.crystal-viewer__occupancy:fullscreen .crystal-viewer__fill-value {
  font-size: 2.2rem;
}

.crystal-viewer__occupancy:fullscreen .crystal-viewer__occupancy-note {
  font-size: 0.95rem;
}

.crystal-viewer__occupancy:fullscreen .crystal-viewer__meter {
  height: 10px;
}

.crystal-viewer__stage:fullscreen .crystal-viewer__tools button,
.crystal-viewer__occupancy:fullscreen .crystal-viewer__tools button {
  width: 36px;
  height: 36px;
}

.crystal-viewer__stage:fullscreen .crystal-viewer__tools svg,
.crystal-viewer__occupancy:fullscreen .crystal-viewer__tools svg {
  width: 18px;
  height: 18px;
}

.crystal-viewer__hint {
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

.crystal-viewer__hint-touch {
  display: none;
}

@media (hover: none) {
  .crystal-viewer__hint-pointer {
    display: none;
  }

  .crystal-viewer__hint-touch {
    display: inline;
  }
}

.crystal-viewer__fallback {
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

/* --------------------------------------------------------------------- bar */

.crystal-viewer__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  margin-top: 0.75rem;
}

.crystal-viewer__size {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.crystal-viewer__size-label {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.crystal-viewer__size input {
  width: 7rem;
  accent-color: var(--vp-c-brand-1);
}

.crystal-viewer__size-value {
  min-width: 7.5rem;
  color: var(--vp-c-text-3);
}

.crystal-viewer__legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.9rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.crystal-viewer__legend li {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.crystal-viewer__swatch {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
}

.crystal-viewer__legend-symbol {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

/* ----------------------------------------------------------------- metrics */

.crystal-viewer__metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin: 0.75rem 0 0;
}

.crystal-viewer__metrics dt {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.crystal-viewer__metrics dd {
  margin: 0.1rem 0 0;
  font-size: 0.86rem;
  color: var(--vp-c-text-1);
}

.crystal-viewer__note {
  margin: 0.85rem 0 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.crystal-viewer__scale {
  margin: 0.4rem 0 0;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

@media (max-width: 640px) {
  .crystal-viewer {
    padding: 0.75rem;
  }

  .crystal-viewer__stage {
    aspect-ratio: 1 / 1;
  }

  .crystal-viewer__chip {
    flex: 1 1 calc(50% - 0.4rem);
  }

  .crystal-viewer__size-value {
    min-width: auto;
  }
}
</style>
