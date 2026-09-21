<script setup lang="ts">
import { withBase } from 'vitepress'
import Cite from './Cite.vue'

interface SeeAlsoLink {
  text: string
  /** Root-absolute content path, e.g. `/polissilicio` or `/en/polissilicio`. */
  href: string
  note?: string
  /** Citation id rendered as a footnote marker after the note. */
  cite?: string
}

withDefaults(
  defineProps<{
    title?: string
    links: SeeAlsoLink[]
  }>(),
  { title: 'Veja também' },
)
</script>

<template>
  <nav class="see-also" :aria-label="title">
    <p class="see-also-title">{{ title }}</p>
    <ul>
      <li v-for="link in links" :key="link.href">
        <a :href="withBase(link.href)">{{ link.text }}</a><template v-if="link.note"> - {{ link.note }}</template><Cite v-if="link.cite" :id="link.cite" />
      </li>
    </ul>
  </nav>
</template>
