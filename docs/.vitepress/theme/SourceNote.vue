<script setup lang="ts">
import Cite from './Cite.vue'
import { getCitation, USGS_MCS_YEARS, usgsMcsUrl } from './citations'

const props = withDefaults(
  defineProps<{
    label?: string
    ids?: string[]
    usgsMcs?: boolean
  }>(),
  {
    label: 'Fontes',
    ids: () => [],
    usgsMcs: false,
  },
)

function resolvedCites() {
  return props.ids.map((id) => getCitation(id)).filter((c): c is NonNullable<typeof c> => !!c)
}
</script>

<template>
  <p class="source-note">
    <span class="source-note-label">{{ label }}:</span>
    <template v-if="usgsMcs">
      <template v-for="(year, index) in USGS_MCS_YEARS" :key="year">
        <a
          class="source-note-link"
          :href="usgsMcsUrl(year)"
          target="_blank"
          rel="noopener noreferrer"
          :title="`USGS Mineral Commodity Summaries ${year} - Silicon`"
        >
          USGS MCS {{ year }}</a><span v-if="index < USGS_MCS_YEARS.length - 1"> · </span>
      </template>
      <span class="source-note-meta"> (<Cite id="usgs-mcs" />) </span>
    </template>
    <template v-else>
      <template v-for="(c, index) in resolvedCites()" :key="c.key">
        <a
          v-if="c.url"
          class="source-note-link"
          :href="c.url"
          target="_blank"
          rel="noopener noreferrer"
          :title="c.title"
        >
          {{ c.short }}</a><span v-else>{{ c.short }}</span><span v-if="index < resolvedCites().length - 1"> · </span>
      </template>
      <span v-if="ids.length" class="source-note-meta">
        (<Cite v-for="id in ids" :id="id" :key="id" />)
      </span>
    </template>
  </p>
</template>
