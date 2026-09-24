<script setup lang="ts">
import ZoomableImage from './ZoomableImage.vue'
import { useIsEnglish } from './locale'
import { ERAS as eras, type Era } from './transistor-eras'

const isEnglish = useIsEnglish()


const yearLabel = (era: Era) => (isEnglish.value ? era.yearEn ?? era.year : era.year)
</script>

<template>
  <ol class="transistor-timeline">
    <li
      v-for="era in eras"
      :key="era.year"
      class="transistor-timeline-item"
      :class="{ 'is-upcoming': era.upcoming }"
    >
      <span class="transistor-timeline-marker" aria-hidden="true" />
      <div class="transistor-timeline-body">
        <div class="transistor-timeline-media">
          <ZoomableImage
            :src="era.src"
            :alt="isEnglish ? era.altEn : era.altPt"
          />
        </div>
        <div class="transistor-timeline-text">
          <p class="transistor-timeline-meta">
            <span class="transistor-timeline-year">{{ yearLabel(era) }}</span>
            <span v-if="era.node !== '-'" class="transistor-timeline-node">{{ era.node }}</span>
          </p>
          <h3 class="transistor-timeline-title">{{ isEnglish ? era.nameEn : era.namePt }}</h3>
          <p class="transistor-timeline-desc">{{ isEnglish ? era.descEn : era.descPt }}</p>
          <p class="transistor-timeline-products">
            <span class="transistor-timeline-products-label">{{ isEnglish ? 'Shipped in' : 'Em uso em' }}</span>
            {{ isEnglish ? era.productsEn : era.productsPt }}
          </p>
        </div>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.transistor-timeline {
  position: relative;
  list-style: none;
  margin: 1.75rem 0;
  padding: 0;
}

/* the rail */
.transistor-timeline::before {
  content: '';
  position: absolute;
  top: 0.5rem;
  bottom: 2.5rem;
  left: 7px;
  width: 2px;
  background: var(--vp-c-divider);
}

.transistor-timeline-item {
  position: relative;
  padding-left: 2.25rem;
  padding-bottom: 2rem;
}

.transistor-timeline-item:last-child {
  padding-bottom: 0;
}

.transistor-timeline-marker {
  position: absolute;
  left: 0;
  top: 0.35rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  box-sizing: border-box;
}

.transistor-timeline-item.is-upcoming .transistor-timeline-marker {
  border-style: dashed;
}

.transistor-timeline-body {
  display: grid;
  grid-template-columns: minmax(0, 280px) minmax(0, 1fr);
  gap: 1.25rem;
  align-items: start;
}

.transistor-timeline-media {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 4 / 3;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: #fff;
  box-sizing: border-box;
}

.transistor-timeline-media :deep(.zoomable),
.transistor-timeline-media :deep(.zoomable-trigger) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.transistor-timeline-media :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.transistor-timeline-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.35rem;
}

.transistor-timeline-year {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--vp-c-brand-1);
  text-transform: uppercase;
}

.transistor-timeline-node {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.transistor-timeline-title {
  margin: 0 0 0.35rem;
  font-size: 1.05rem;
  line-height: 1.35;
  border-top: none;
  padding-top: 0;
}

.transistor-timeline-desc {
  margin: 0;
  font-size: 0.925rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.transistor-timeline-products {
  margin: 0.6rem 0 0;
  padding-left: 0.7rem;
  border-left: 2px solid var(--vp-c-brand-1);
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.transistor-timeline-products-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .transistor-timeline-body {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.85rem;
  }

  .transistor-timeline-media {
    aspect-ratio: 16 / 10;
  }
}
</style>
