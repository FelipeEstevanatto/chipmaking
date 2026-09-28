<script setup lang="ts">
import { computed } from 'vue'
import { ERA_GAINS, ERAS } from './transistor-eras'
import { useIsEnglish } from './locale'

/**
 * The one-line record that opens each generation section: the process node and the payoff, read
 * from `transistor-eras.ts`.
 *
 * These are the two fields the recap table carried that a section does not otherwise state plainly.
 * The year and the architecture name are already in the heading, and "what changed" is what the
 * prose explains at length. The table itself is gone: a section that opens with its own structure
 * figure made a separate overview - and its second figure, which swapped on hover and jumped the
 * page - redundant.
 */

const props = defineProps<{ year: string }>()

const isEnglish = useIsEnglish()

const era = computed(() => {
  const found = ERAS.find((candidate) => candidate.year === props.year)
  if (!found) throw new Error(`no generation for ${props.year}`)
  return found
})

/** Pre-node generations have no number to show, only a gate length, which the prose already gives. */
const node = computed(() => (era.value.node === '-' ? '' : era.value.node))

const gain = computed(() => {
  const entry = ERA_GAINS[props.year]
  return entry ? (isEnglish.value ? entry.en : entry.pt) : ''
})
</script>

<template>
  <p class="transistor-facts">
    <span v-if="node" class="transistor-facts__node">{{ node }}</span>
    <span v-if="gain" class="transistor-facts__gain">
      <span class="transistor-facts__label">{{ isEnglish ? 'Payoff' : 'Ganho' }}</span>
      {{ gain }}
    </span>
  </p>
</template>

<style scoped>
.transistor-facts {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.4rem 0.6rem;
  margin: 0.5rem 0 0;
}

.transistor-facts__node {
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.transistor-facts__gain {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.transistor-facts__label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin-right: 0.35rem;
}
</style>
