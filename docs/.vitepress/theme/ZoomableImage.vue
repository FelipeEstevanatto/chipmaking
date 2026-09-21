<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import { useIsEnglish } from './locale'

const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    /** Set false to render a plain, non-interactive image. */
    zoomable?: boolean
  }>(),
  { alt: '', zoomable: true },
)

const isEnglish = useIsEnglish()

const labels = computed(() =>
  isEnglish.value
    ? {
        open: 'Enlarge image',
        zoomIn: 'Zoom in',
        zoomOut: 'Zoom out',
        reset: 'Reset zoom',
        close: 'Close',
        hint: 'Scroll or double-click to zoom, drag to pan',
      }
    : {
        open: 'Ampliar imagem',
        zoomIn: 'Aumentar zoom',
        zoomOut: 'Diminuir zoom',
        reset: 'Restaurar zoom',
        close: 'Fechar',
        hint: 'Use a roda do mouse ou clique duas vezes para ampliar; arraste para mover',
      },
)

const resolvedSrc = computed(() => withBase(props.src))

const open = ref(false)
const scale = ref(1)
const tx = ref(0)
const ty = ref(0)
const dragging = ref(false)

const MIN = 1
const MAX = 10
const STEP = 1.4

const zoomImg = ref<HTMLImageElement | null>(null)
const closeBtn = ref<HTMLButtonElement | null>(null)

let restoreOverflow = ''
const drag = { x: 0, y: 0, tx: 0, ty: 0 }

function reset() {
  scale.value = 1
  tx.value = 0
  ty.value = 0
}

/** Zoom by `k`, keeping the point under (clientX, clientY) fixed when given. */
function zoomBy(k: number, clientX?: number, clientY?: number) {
  const next = Math.min(MAX, Math.max(MIN, scale.value * k))
  const ratio = next / scale.value
  const el = zoomImg.value

  if (el && clientX != null && clientY != null && ratio !== 1) {
    const rect = el.getBoundingClientRect()
    const dx = clientX - (rect.left + rect.width / 2)
    const dy = clientY - (rect.top + rect.height / 2)
    tx.value = dx - ratio * (dx - tx.value)
    ty.value = dy - ratio * (dy - ty.value)
  }

  scale.value = next
  if (next === MIN) {
    tx.value = 0
    ty.value = 0
  }
}

function onWheel(event: WheelEvent) {
  zoomBy(event.deltaY < 0 ? 1.12 : 1 / 1.12, event.clientX, event.clientY)
}

function onDblClick(event: MouseEvent) {
  if (scale.value > MIN) reset()
  else zoomBy(2.6, event.clientX, event.clientY)
}

function onPointerDown(event: PointerEvent) {
  if (scale.value <= MIN) return
  dragging.value = true
  drag.x = event.clientX
  drag.y = event.clientY
  drag.tx = tx.value
  drag.ty = ty.value
  ;(event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId)
}

function onPointerMove(event: PointerEvent) {
  if (!dragging.value) return
  tx.value = drag.tx + (event.clientX - drag.x)
  ty.value = drag.ty + (event.clientY - drag.y)
}

function onPointerUp(event: PointerEvent) {
  if (!dragging.value) return
  dragging.value = false
  ;(event.currentTarget as HTMLElement).releasePointerCapture?.(event.pointerId)
}

function openViewer() {
  if (!props.zoomable) return
  reset()
  open.value = true
}

function closeViewer() {
  open.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeViewer()
  else if (event.key === '+' || event.key === '=') zoomBy(STEP)
  else if (event.key === '-' || event.key === '_') zoomBy(1 / STEP)
  else if (event.key === '0') reset()
}

function lockScroll(lock: boolean) {
  if (typeof document === 'undefined') return
  if (lock) {
    restoreOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = restoreOverflow
  }
}

watch(open, async (isOpen) => {
  if (typeof window === 'undefined') return
  if (isOpen) {
    window.addEventListener('keydown', onKeydown)
    lockScroll(true)
    await nextTick()
    closeBtn.value?.focus()
  } else {
    window.removeEventListener('keydown', onKeydown)
    lockScroll(false)
  }
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('keydown', onKeydown)
  lockScroll(false)
})
</script>

<template>
  <span class="zoomable">
    <button
      v-if="zoomable"
      type="button"
      class="zoomable-trigger"
      :aria-label="labels.open"
      :title="labels.open"
      @click="openViewer"
    >
      <img :src="resolvedSrc" :alt="alt" loading="lazy" decoding="async" />
      <span class="zoomable-badge" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="13" height="13">
          <circle cx="6.8" cy="6.8" r="4.6" fill="none" stroke="currentColor" stroke-width="1.7" />
          <path d="M10.4 10.4 L14 14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
          <path d="M6.8 4.6 V9 M4.6 6.8 H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </span>
    </button>
    <img v-else :src="resolvedSrc" :alt="alt" loading="lazy" decoding="async" />

    <Teleport to="body">
      <div
        v-if="open"
        class="zoomable-overlay"
        role="dialog"
        aria-modal="true"
        :aria-label="alt || labels.open"
        @click.self="closeViewer"
      >
        <div class="zoomable-toolbar">
          <button type="button" :aria-label="labels.zoomOut" :title="labels.zoomOut" @click="zoomBy(1 / STEP)">
            &minus;
          </button>
          <span class="zoomable-readout">{{ Math.round(scale * 100) }}%</span>
          <button type="button" :aria-label="labels.zoomIn" :title="labels.zoomIn" @click="zoomBy(STEP)">
            +
          </button>
          <button type="button" :aria-label="labels.reset" :title="labels.reset" @click="reset">1:1</button>
          <button ref="closeBtn" type="button" class="zoomable-close" :aria-label="labels.close" :title="labels.close" @click="closeViewer">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M3 3 L13 13 M13 3 L3 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <img
          ref="zoomImg"
          class="zoomable-image"
          :class="{ 'is-zoomed': scale > 1, 'is-dragging': dragging }"
          :src="resolvedSrc"
          :alt="alt"
          :style="{ transform: `translate(${tx}px, ${ty}px) scale(${scale})` }"
          @wheel.prevent="onWheel"
          @dblclick="onDblClick"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="onPointerUp"
          @pointercancel="onPointerUp"
        />

        <p class="zoomable-hint">{{ labels.hint }}</p>
      </div>
    </Teleport>
  </span>
</template>

<style scoped>
.zoomable {
  display: block;
  max-width: 100%;
}

.zoomable-trigger {
  position: relative;
  display: block;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  border: 0;
  background: none;
  cursor: zoom-in;
  line-height: 0;
}

.zoomable-trigger img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}

.zoomable-badge {
  position: absolute;
  right: 6px;
  bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: rgba(26, 32, 44, 0.72);
  color: #fff;
  opacity: 0;
  transition: opacity 0.15s ease;
  pointer-events: none;
}

.zoomable-trigger:hover .zoomable-badge,
.zoomable-trigger:focus-visible .zoomable-badge {
  opacity: 1;
}
</style>

<style>
/* Overlay lives outside the component's scoped tree (teleported to body). */
.zoomable-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(12, 15, 20, 0.9);
  overflow: hidden;
}

.zoomable-toolbar {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  border-radius: 10px;
  background: rgba(26, 32, 44, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.16);
}

.zoomable-toolbar button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 0;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.9rem;
  line-height: 1;
  cursor: pointer;
}

.zoomable-toolbar button:hover {
  background: rgba(255, 255, 255, 0.22);
}

.zoomable-toolbar button:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 1px;
}

.zoomable-close {
  margin-left: 4px;
}

.zoomable-readout {
  min-width: 46px;
  text-align: center;
  color: #fff;
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
}

.zoomable-image {
  max-width: 94vw;
  max-height: 80vh;
  transform-origin: center center;
  transition: transform 0.18s ease-out;
  cursor: zoom-in;
  user-select: none;
  -webkit-user-drag: none;
  touch-action: none;
  will-change: transform;
}

.zoomable-image.is-zoomed {
  cursor: grab;
}

.zoomable-image.is-dragging {
  cursor: grabbing;
  transition: none;
}

.zoomable-hint {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  padding: 0 12px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.75rem;
  text-align: center;
}

@media (max-width: 640px) {
  .zoomable-hint {
    display: none;
  }

  .zoomable-image {
    max-height: 74vh;
  }
}
</style>
