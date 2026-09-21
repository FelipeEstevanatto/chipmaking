<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    /** Force a white stage (for PDF exports with black backgrounds). */
    lightCanvas?: boolean
  }>(),
  {
    lightCanvas: true,
  },
)

const resolvedSrc = computed(() => withBase(props.src))

const figureClass = computed(() => ({
  'diagram-figure': true,
  'diagram-figure--light-canvas': props.lightCanvas,
}))
</script>

<template>
  <figure :class="figureClass">
    <div class="diagram-figure-media">
      <img :src="resolvedSrc" :alt="alt" loading="lazy" />
    </div>
    <figcaption v-if="$slots.default"><slot /></figcaption>
  </figure>
</template>

<style scoped>
.diagram-figure {
  margin: 1.25rem 0;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}

.diagram-figure--light-canvas {
  background: #fff;
}

.diagram-figure-media {
  display: flex;
  justify-content: center;
  align-items: center;
}

.diagram-figure--light-canvas .diagram-figure-media {
  background: #fff;
  border-radius: 6px;
  padding: 0.5rem;
}

.diagram-figure img {
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  display: block;
}

.diagram-figure figcaption {
  margin-top: 0.75rem;
  color: #3c3c43;
  font-size: 0.925rem;
  line-height: 1.5;
  text-align: left;
}

.diagram-figure figcaption :deep(a) {
  color: #2b6cb0;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.diagram-figure figcaption :deep(a:hover) {
  color: #1e4a7a;
}
</style>

<!-- Keep caption readable on white card even in dark site theme -->
<style>
.dark .diagram-figure--light-canvas {
  background: #fff !important;
}

.dark .diagram-figure--light-canvas .diagram-figure-media {
  background: #fff !important;
}

.dark .diagram-figure--light-canvas figcaption {
  color: #3c3c43 !important;
}

.dark .diagram-figure--light-canvas figcaption a {
  color: #2b6cb0 !important;
}
</style>
