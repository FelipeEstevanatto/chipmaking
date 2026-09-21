<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

/**
 * Thin reading-progress bar pinned to the top of the viewport.
 *
 * Several chapters here run long (fabricacao-wafers, transistores, fotolitografia), and a chapter
 * gives no sense of how much remains. The bar is decorative orientation, not content, so it is
 * `aria-hidden` — a screen reader gains nothing from a percentage of scroll.
 *
 * Renders through the `layout-top` slot; see Layout.vue.
 */

const { frontmatter, page } = useData()

const progress = ref(0)
const visible = ref(false)

let frame = 0
let observer: ResizeObserver | undefined

/**
 * Progress is measured against the *scrollable* height, not the document height — otherwise the
 * bar never reaches 100% on pages shorter than the viewport, and tops out early on tall ones.
 */
function measure() {
  frame = 0
  const doc = document.documentElement
  const scrollable = doc.scrollHeight - window.innerHeight

  if (scrollable <= 0) {
    progress.value = 0
    visible.value = false
    return
  }

  progress.value = Math.min(1, Math.max(0, window.scrollY / scrollable))
  // Stay hidden at rest so the bar does not add a stray line to the top of every page.
  visible.value = window.scrollY > 0
}

/** Coalesce bursts of scroll events into one measurement per frame. */
function schedule() {
  if (frame) return
  frame = requestAnimationFrame(measure)
}

/** The bar is noise on the home page and on the 404 fallback. */
const enabled = computed(
  () => frontmatter.value.layout !== 'home' && page.value.isNotFound !== true,
)

onMounted(() => {
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })

  // Images and Mermaid diagrams settle in *after* mount and change the scrollable height.
  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(schedule)
    observer.observe(document.body)
  }

  measure()
})

// Client-side navigation swaps the document without a reload, so re-measure once the new
// content has been rendered.
watch(
  () => page.value.relativePath,
  () => {
    nextTick(() => setTimeout(measure, 60))
  },
)

onBeforeUnmount(() => {
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
  observer?.disconnect()
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <div
    v-if="enabled"
    class="reading-progress"
    :class="{ 'is-visible': visible }"
    aria-hidden="true"
  >
    <div class="reading-progress__bar" :style="{ transform: `scaleX(${progress})` }" />
  </div>
</template>

<style scoped>
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* Above .VPNav, so the line rides the very top edge of the viewport. */
  z-index: 50;
  height: 3px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.reading-progress.is-visible {
  opacity: 1;
}

.reading-progress__bar {
  height: 100%;
  width: 100%;
  /* scaleX avoids layout work on every frame; transform-origin keeps it anchored left. */
  transform-origin: 0 50%;
  background: var(--vp-c-brand-1);
  will-change: transform;
}
</style>
