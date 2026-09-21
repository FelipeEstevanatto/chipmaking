<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps<{
  src: string
  alt: string
}>()

const resolvedSrc = computed(() => withBase(props.src))
</script>

<template>
  <figure class="diagram-figure">
    <img :src="resolvedSrc" :alt="alt" loading="lazy" />
    <figcaption v-if="$slots.default"><slot /></figcaption>
  </figure>
</template>

<style scoped>
.diagram-figure {
  margin: 1.25rem 0;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: #fff;
  text-align: center;
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
</style>
