<script setup lang="ts">
import { withBase } from 'vitepress'
import { useIsEnglish, useLocalePath } from './locale'
import { HOME_SECTIONS } from './home-sections'
import { STAGE_ACCENTS } from './stage-visuals'
import StageIcon from './StageIcon.vue'

/**
 * The section cards of the home page. They replace the default `features` grid so the icons are
 * the site's own drawings, the chain cards carry the sidebar's stage numbers, and the whole list
 * lives in `home-sections.ts` instead of duplicated frontmatter.
 */

const isEnglish = useIsEnglish()
const localePath = useLocalePath()

const pick = (text: { pt: string; en: string }) => (isEnglish.value ? text.en : text.pt)

/** The accent, plus the two alphas the card needs: 14% for the badge tint, 28% for its border. */
function accentVars(key: keyof typeof STAGE_ACCENTS) {
  const accent = STAGE_ACCENTS[key]
  return {
    '--section-accent': accent,
    '--section-tint': `${accent}24`,
    '--section-edge': `${accent}47`,
  }
}
</script>

<template>
  <div class="home-sections">
    <a
      v-for="section in HOME_SECTIONS"
      :key="section.id"
      class="home-section"
      :href="withBase(localePath(section.path))"
      :style="accentVars(section.accent)"
    >
      <span class="home-section__badge" aria-hidden="true">
        <StageIcon :name="section.icon" />
      </span>
      <span v-if="section.stage" class="home-section__index" aria-hidden="true">
        {{ String(section.stage).padStart(2, '0') }}
      </span>
      <span class="home-section__title">{{ pick(section.title) }}</span>
      <span class="home-section__details">{{ pick(section.details) }}</span>
    </a>
  </div>
</template>

<style scoped>
.home-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(228px, 1fr));
  gap: 1rem;
  margin: 1.75rem 0 2.5rem;
}

.home-section {
  position: relative;
  display: block;
  padding: 1.1rem 1.15rem 1.2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
}

.home-section:hover {
  border-color: var(--section-accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}

.dark .home-section:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
}

.home-section:focus-visible {
  outline: 2px solid var(--section-accent);
  outline-offset: 2px;
}

.home-section__badge {
  display: grid;
  place-items: center;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid var(--section-edge);
  background: var(--section-tint);
  color: var(--section-accent);
}

/* The stage number, ghosted: the order comes from the sidebar, and the card only echoes it. */
.home-section__index {
  position: absolute;
  top: 0.95rem;
  right: 1.05rem;
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  color: var(--section-accent);
  opacity: 0.3;
}

.home-section__title {
  display: block;
  margin: 0.75rem 0 0.35rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.35;
  color: var(--vp-c-text-1);
}

.home-section__details {
  display: block;
  font-size: 0.85rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

@media (prefers-reduced-motion: reduce) {
  .home-section {
    transition: none;
  }

  .home-section:hover {
    transform: none;
  }
}
</style>
