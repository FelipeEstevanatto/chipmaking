<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

/**
 * Reading estimate + figure count, shown directly under the chapter title.
 *
 * Both values are measured from the rendered document rather than authored per page, so they stay
 * correct when a chapter is edited instead of drifting the way hand-written metadata does.
 *
 * Populated on mount, so the server HTML and the first client render agree on rendering nothing.
 * This is deliberately client-side only: the numbers describe the reader's own rendering (figure
 * count is a layout fact), which is not knowable at build time.
 */

const { page, lang } = useData()

const isEnglish = computed(() => String(lang.value).toLowerCase().startsWith('en'))

/**
 * Year of the newest data the chapter cites, from frontmatter.
 *
 * Some chapters rest on a 2011 survey and others on last year's roadmap, and nothing in the prose
 * said which. Declaring the year per page makes that visible without re-reading the sources; the
 * rule is documented in the README.
 */
const dataAsOf = computed(() => page.value.frontmatter?.dataAsOf)

/** Average adult reading pace for technical prose; PT and EN are close enough to share it. */
const WORDS_PER_MINUTE = 200

const minutes = ref(0)
const figures = ref(0)

function measure() {
  const root = document.querySelector('.vp-doc')
  if (!root) return

  const words = (root.textContent ?? '').trim().split(/\s+/).filter(Boolean).length
  minutes.value = Math.max(1, Math.round(words / WORDS_PER_MINUTE))
  figures.value = root.querySelectorAll('.diagram-figure').length
}

let frame = 0
let observer: ResizeObserver | undefined

/** Coalesce repeated triggers (a resize storm, a burst of load events) into one measurement per frame. */
function schedule() {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    measure()
  })
}

onMounted(() => {
  measure()

  /*
   * Figures are not all in the initial HTML: `TransistorCompare` renders a `DiagramFigure` of its
   * own once it hydrates, so a single pass at mount undercounts (10 instead of 11 on the
   * transistor chapter). Watching the document's size is the simplest way to catch content that
   * arrives or grows after mount - a late figure changes the height, which re-triggers this.
   */
  if (typeof ResizeObserver !== 'undefined') {
    const root = document.querySelector('.vp-doc')
    if (root) {
      observer = new ResizeObserver(schedule)
      observer.observe(root)
    }
  }

  window.addEventListener('load', schedule)
})

// Re-measure on client-side navigation, after the new chapter has rendered.
watch(
  () => page.value.relativePath,
  () => {
    nextTick(() => setTimeout(schedule, 60))
  },
)

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('load', schedule)
  if (frame) cancelAnimationFrame(frame)
})

const readingLabel = computed(() =>
  isEnglish.value ? `${minutes.value} min read` : `${minutes.value} min de leitura`,
)

const figureLabel = computed(() => {
  if (!figures.value) return ''
  const noun = isEnglish.value
    ? figures.value === 1
      ? 'figure'
      : 'figures'
    : figures.value === 1
      ? 'figura'
      : 'figuras'
  return `${figures.value} ${noun}`
})

const show = computed(() => minutes.value > 0)
</script>

<template>
  <p v-if="show" class="doc-meta">
    <span class="doc-meta__item">{{ readingLabel }}</span>
    <template v-if="figureLabel">
      <span class="doc-meta__sep" aria-hidden="true">·</span>
      <span class="doc-meta__item">{{ figureLabel }}</span>
    </template>
    <template v-if="dataAsOf">
      <span class="doc-meta__sep" aria-hidden="true">·</span>
      <span class="doc-meta__item" :title="isEnglish
        ? 'Year of the most recent data cited in this chapter'
        : 'Ano do dado mais recente citado neste capítulo'">{{ isEnglish ? `data as of ${dataAsOf}` : `dados até ${dataAsOf}` }}</span>
    </template>
  </p>
</template>

<style scoped>
.doc-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  /* Sits between the chain map and the H1, so it only needs a small breath before the title. */
  margin: 0 0 0.5rem;
  font-size: 0.78rem;
  letter-spacing: 0.01em;
  color: var(--vp-c-text-3);
}

.doc-meta__sep {
  opacity: 0.6;
}
</style>
