<script setup lang="ts">
import { computed, ref } from 'vue'
import { getCitation } from './citations'
import { useIsEnglish } from './locale'
import {
  USGS_SILICON_EDITIONS,
  USGS_SILICON_PRODUCERS,
  USGS_SILICON_PRODUCT_NAMES,
  USGS_SILICON_YEARS,
} from './usgs-silicon'
import type { UsgsSiliconProduct } from './usgs-silicon'

/**
 * The production estimates table of the Introduction, rendered from `usgs-silicon.ts` so it and
 * the interactive chart below it share one copy of the numbers.
 *
 * Both products draw on the same countries but not the same ranking, and printing them side by
 * side made the table twice as wide, so each gets its own view, switched by the same button the
 * chart uses. The caption and the note that explains the editions stay in the page, in markdown.
 */

const isEnglish = useIsEnglish()

/** Which product the table is showing; the chart below opens on the same one. */
const product = ref<UsgsSiliconProduct>('metal')

const thousands = computed(() => new Intl.NumberFormat(isEnglish.value ? 'en-US' : 'pt-BR'))

/** Header tooltip naming the MCS edition the column comes from; both products share the years. */
function editionTitle(index: number) {
  return getCitation(USGS_SILICON_EDITIONS[index])?.title ?? ''
}

function productName(id: UsgsSiliconProduct) {
  const names = USGS_SILICON_PRODUCT_NAMES[id]
  return isEnglish.value ? names.en : names.pt
}

function label(producer: (typeof USGS_SILICON_PRODUCERS)[number]) {
  return isEnglish.value ? producer.en : producer.pt
}
</script>

<template>
  <div class="usgs-production-table">
    <p class="usgs-production-table__controls">
      <span class="usgs-production-table__product">{{ productName(product) }}</span>
      <button type="button" @click="product = product === 'metal' ? 'ferro' : 'metal'">
        {{ isEnglish
          ? (product === 'metal' ? 'Show ferrosilicon' : 'Show silicon metal')
          : (product === 'metal' ? 'Ver ferrossilício' : 'Ver silício metálico') }}
      </button>
    </p>
    <table :aria-label="productName(product)">
      <thead>
        <tr>
          <th>{{ isEnglish ? 'Country/Region' : 'País/Região' }}</th>
          <th
            v-for="(year, index) in USGS_SILICON_YEARS"
            :key="year"
            :title="editionTitle(index)"
          >
            {{ year }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="producer in USGS_SILICON_PRODUCERS"
          :key="producer.en"
          :class="{ 'usgs-production-table__total': producer.total }"
        >
          <td>{{ label(producer) }}</td>
          <td v-for="(value, index) in producer[product]" :key="index">
            {{ thousands.format(value) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.usgs-production-table__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 0;
}

.usgs-production-table__product {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.usgs-production-table__controls button {
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 0.8rem;
}

.usgs-production-table__controls button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.usgs-production-table__total td {
  font-weight: 700;
}
</style>
