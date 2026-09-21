<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import DiagramFigure from './DiagramFigure.vue'
import { useIsEnglish, useLocalePath } from './locale'

const isEnglish = useIsEnglish()
const localePath = useLocalePath()

const options = [
  {
    id: 'planar',
    label: '1960 — Planar',
    src: '/pdf-images/p17-1.png',
    alt: 'Transistor planar MOSFET',
    captionPt: 'Canal bidimensional; base da Lei de Moore por décadas.',
    captionEn: 'Two-dimensional channel; the basis of Moore’s Law for decades.',
  },
  {
    id: 'finfet',
    label: '2011 — FinFET',
    src: '/pdf-images/p17-2.png',
    alt: 'FinFET Tri-Gate',
    captionPt: 'Aleta vertical; portão envolve três lados do canal.',
    captionEn: 'Vertical fin; the gate wraps three sides of the channel.',
  },
  {
    id: 'gaa',
    label: '2022 — GAAFET',
    src: '/pdf-images/p18-1.png',
    alt: 'GAAFET nanosheets',
    captionPt: 'Nanofolhas envolvidas pelo portão nos quatro lados.',
    captionEn: 'Nanosheets wrapped by the gate on all four sides.',
  },
] as const

const selected = ref<(typeof options)[number]['id']>('planar')
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
