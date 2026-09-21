<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import DiagramFigure from './DiagramFigure.vue'

const options = [
  {
    id: 'planar',
    label: '1960 — Planar',
    src: '/pdf-images/p17-1.png',
    alt: 'Transistor planar MOSFET',
    caption: 'Canal bidimensional; base da Lei de Moore por décadas.',
  },
  {
    id: 'finfet',
    label: '2011 — FinFET',
    src: '/pdf-images/p17-2.png',
    alt: 'FinFET Tri-Gate',
    caption: 'Aleta vertical; portão envolve três lados do canal.',
  },
  {
    id: 'gaa',
    label: '2022 — GAAFET',
    src: '/pdf-images/p18-1.png',
    alt: 'GAAFET nanosheets',
    caption: 'Nanofolhas envolvidas pelo portão nos quatro lados.',
  },
] as const

const selected = ref<(typeof options)[number]['id']>('planar')
const current = computed(() => options.find((o) => o.id === selected.value)!)
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
      {{ current.caption }}
    </DiagramFigure>
    <p>
      <small>
        Mais detalhes na
        <a :href="withBase('/linha-do-tempo')">linha do tempo</a>
        e em
        <a :href="withBase('/transistores')">evolução dos transistores</a>.
      </small>
    </p>
  </div>
</template>
