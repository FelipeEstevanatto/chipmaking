<script setup lang="ts">
import { computed } from 'vue'
import { useIsEnglish } from './locale'
import { MILESTONES } from './milestones'
import type { MilestoneSet } from './milestones'
import Cite from './Cite.vue'

/**
 * A chronology as a rail: one milestone per row, the year in the brand colour, and the source of
 * every number printed beside it. It renders the sets of `milestones.ts`, so a new chronology is a
 * data entry rather than a component, and it shares its drawing with the timeline page and the
 * photolithography history.
 *
 * It replaces the mermaid timelines those pages used to carry. Mermaid draws the periods in the
 * order given — so the polysilicon diagram ran 1995 → 2014 → 2004 → 2010 — and a diagram cannot hold
 * a `<Cite>`; a rail can do both, and it does not overflow the prose column.
 */

const props = defineProps<{ set: MilestoneSet }>()

const isEnglish = useIsEnglish()

const milestones = computed(() => MILESTONES[props.set] ?? [])
const text = (value: { pt: string; en: string }) => (isEnglish.value ? value.en : value.pt)
const year = (milestone: { year: string; yearEn?: string }) =>
  isEnglish.value ? milestone.yearEn ?? milestone.year : milestone.year
</script>

<template>
  <ol class="milestone-rail">
    <li v-for="milestone in milestones" :key="milestone.year" class="milestone-rail__item">
      <p class="milestone-rail__year">{{ year(milestone) }}</p>
      <h3 class="milestone-rail__title">{{ text(milestone.title) }}</h3>
      <p class="milestone-rail__note">
        {{ text(milestone.note) }}
        <Cite v-for="id in milestone.sourceIds" :id="id" :key="id" />
      </p>
    </li>
  </ol>
</template>

<style scoped>
.milestone-rail {
  margin: 1.75rem 0;
  padding: 1.5rem 1.5rem 1.4rem 0.9rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  list-style: none;
}

.milestone-rail__item {
  position: relative;
  padding: 0 0 1.4rem 2.5rem;
}

.milestone-rail__item:last-child {
  padding-bottom: 0;
}

/* The rail. `bottom: -0.9rem` reaches the next item's marker, which sits 0.5rem into it. */
.milestone-rail__item::before {
  content: '';
  position: absolute;
  top: 0.5rem;
  bottom: -0.9rem;
  left: calc(0.85rem - 1px);
  width: 2px;
  background: var(--vp-c-divider);
}

.milestone-rail__item:last-child::before {
  bottom: auto;
  height: 0;
}

/* The marker: opaque, so it masks the rail behind it. */
.milestone-rail__item::after {
  content: '';
  position: absolute;
  top: 0.5rem;
  left: 0.85rem;
  width: 14px;
  height: 14px;
  margin: -7px 0 0 -7px;
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  box-sizing: border-box;
}

.milestone-rail__year {
  margin: 0 0 0.2rem;
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-brand-1);
}

.milestone-rail__title {
  margin: 0 0 0.25rem;
  padding-top: 0;
  border-top: none;
  font-size: 1rem;
  line-height: 1.4;
}

.milestone-rail__note {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
  .milestone-rail {
    padding: 1.15rem 1rem 1.1rem 0.5rem;
  }

  .milestone-rail__item {
    padding-left: 2.1rem;
  }
}
</style>
