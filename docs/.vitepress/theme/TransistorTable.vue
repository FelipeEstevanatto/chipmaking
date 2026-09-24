<script setup lang="ts">
import { computed } from 'vue'
import { ERA_GAINS, ERAS } from './transistor-eras'
import { useIsEnglish } from './locale'

/**
 * The chapter's recap table, generated from `transistor-eras.ts`.
 *
 * The chapter used to carry two hand-written tables — one comparing the generations and another
 * listing the products of each — while the interactive timeline kept a third copy of the same list.
 * All three now read one source, so a new generation is added once and the table, the timeline and
 * the comparator cannot disagree.
 *
 * Products are deliberately *not* a column here: they belong to the narrative and to the timeline,
 * and putting them in the table is what made the old pair feel repetitive.
 */

const isEnglish = useIsEnglish()

const labels = computed(() =>
  isEnglish.value
    ? { year: 'Year', node: 'Node', name: 'Architecture', change: 'What changed', gain: 'Payoff', research: 'research' }
    : { year: 'Ano', node: 'Nó', name: 'Arquitetura', change: 'O que mudou', gain: 'Ganho', research: 'pesquisa' },
)

const rows = computed(() =>
  ERAS.map((era) => ({
    year: isEnglish.value ? (era.yearEn ?? era.year) : era.year,
    // Before 1971 there is no node name to quote, only a gate length.
    node: era.node === '-' ? '—' : era.node,
    name: isEnglish.value ? era.nameEn : era.namePt,
    change: isEnglish.value ? era.descEn : era.descPt,
    gain: isEnglish.value ? ERA_GAINS[era.year]?.en : ERA_GAINS[era.year]?.pt,
    upcoming: !!era.upcoming,
  })),
)
</script>

<template>
  <div class="transistor-table">
    <table>
      <thead>
        <tr>
          <th>{{ labels.year }}</th>
          <th>{{ labels.node }}</th>
          <th>{{ labels.name }}</th>
          <th>{{ labels.change }}</th>
          <th>{{ labels.gain }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.year" :class="{ 'is-upcoming': row.upcoming }">
          <td>{{ row.year }}</td>
          <td>{{ row.node }}</td>
          <td>
            <strong>{{ row.name }}</strong>
            <span v-if="row.upcoming" class="transistor-table__tag">({{ labels.research }})</span>
          </td>
          <td>{{ row.change }}</td>
          <td>{{ row.gain }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.transistor-table {
  overflow-x: auto;
  margin: 1.25rem 0;
}

.transistor-table table {
  width: 100%;
  margin: 0;
  font-size: 0.9rem;
}

.transistor-table th {
  white-space: nowrap;
}

/* Research architectures are marked, not hidden: the reader should see that the last rows are
   plans rather than products. */
.transistor-table tr.is-upcoming td {
  color: var(--vp-c-text-2);
}

.transistor-table__tag {
  margin-left: 0.35rem;
  font-size: 0.85em;
  opacity: 0.75;
}
</style>
