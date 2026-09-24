<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import DiagramFigure from './DiagramFigure.vue'
import { useIsEnglish, useLocalePath } from './locale'

const isEnglish = useIsEnglish()
const localePath = useLocalePath()

import { ERAS } from './transistor-eras'

/**
 * Three spot comparisons, not a complete list: the point is to fix the vocabulary before the
 * chapter's table, so the tabs stay short. The figure and its alt text come from the canonical
 * list of generations, which is the part that must not drift when an asset is replaced.
 */
const SPOTLIGHTS = [
  {
    id: 'planar',
    year: '1960',
    label: '1960 · Planar',
    captionPt: 'Canal bidimensional; base da Lei de Moore por décadas.',
    captionEn: 'Two-dimensional channel; the basis of Moore’s Law for decades.',
  },
  {
    id: 'finfet',
    year: '2011',
    label: '2011 · FinFET',
    captionPt: 'Aleta vertical; portão envolve três lados do canal.',
    captionEn: 'Vertical fin; the gate wraps three sides of the channel.',
  },
  {
    id: 'gaa',
    year: '2022',
    label: '2022 · GAAFET',
    captionPt: 'Nanofolhas envolvidas pelo portão nos quatro lados.',
    captionEn: 'Nanosheets wrapped by the gate on all four sides.',
  },
] as const

const options = SPOTLIGHTS.map((spot) => {
  const era = ERAS.find((candidate) => candidate.year === spot.year)
  if (!era) throw new Error(`no generation for ${spot.year}`)
  return {
    id: spot.id,
    label: spot.label,
    src: era.src,
    alt: isEnglish.value ? era.altEn : era.altPt,
    captionPt: spot.captionPt,
    captionEn: spot.captionEn,
  }
})

const selected = ref<(typeof SPOTLIGHTS)[number]['id']>('planar')
const current = computed(() => options.find((o) => o.id === selected.value)!)
const caption = computed(() =>
  isEnglish.value ? current.value.captionEn : current.value.captionPt,
)
</script>

<template>
  <div class="transistor-compare">
    <div class="transistor-compare-tabs" role="tablist">
      <button
        v-for="opt in options"
        :key="opt.id"
        type="button"
        role="tab"
        :class="{ active: selected === opt.id }"
        :aria-selected="selected === opt.id"
        @click="selected = opt.id"
      >
        {{ opt.label }}
      </button>
    </div>
    <DiagramFigure :src="current.src" :alt="current.alt">
      {{ caption }}
    </DiagramFigure>
    <p>
      <small v-if="isEnglish">
        More detail in the
        <a :href="withBase(localePath('/linha-do-tempo'))">timeline</a>
        and in
        <a :href="withBase(localePath('/transistores'))">transistor evolution</a>.
      </small>
      <small v-else>
        Mais detalhes na
        <a :href="withBase(localePath('/linha-do-tempo'))">linha do tempo</a>
        e em
        <a :href="withBase(localePath('/transistores'))">evolução dos transistores</a>.
      </small>
    </p>
  </div>
</template>
