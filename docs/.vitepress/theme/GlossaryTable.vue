<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { CHAPTER_LABELS, GLOSSARY } from '../glossary'
import { useIsEnglish, useLocalePath } from './locale'

/**
 * The glossary body for `/glossario` and `/en/glossario`.
 *
 * The term list is not authored here: it comes from `glossary.ts`, which is also what the
 * first-use tooltip plugin reads. One list means the two locales can't drift apart and a term
 * can't be defined on one side only.
 *
 * A plain text input is used rather than a fuzzy-search library — the list is a few dozen rows, so
 * a substring match is immediate and needs no dependency.
 */

const isEnglish = useIsEnglish()
const localePath = useLocalePath()

const query = ref('')

/**
 * Strips accents before comparing, so a reader who types `mineracao` still matches `mineração`.
 * `\p{Diacritic}` needs the `u` flag and is available in every browser this site targets.
 */
function fold(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}

const rows = computed(() =>
  [...GLOSSARY]
    .sort((a, b) => a.term.localeCompare(b.term, 'en'))
    .map((entry) => {
      const chapter = CHAPTER_LABELS[entry.chapter]
      const expansion = isEnglish.value ? entry.en : entry.pt
      const chapterLabel = isEnglish.value ? chapter.en : chapter.pt
      return {
        term: entry.term,
        expansion,
        chapterLabel,
        href: withBase(localePath(entry.chapter)),
        // Every string a reader might search by, folded once per render.
        haystack: fold([entry.term, expansion, chapterLabel, ...(entry.variants ?? [])].join(' ')),
      }
    }),
)

const filtered = computed(() => {
  const needle = fold(query.value.trim())
  if (!needle) return rows.value
  return rows.value.filter((row) => row.haystack.includes(needle))
})

const labels = computed(() =>
  isEnglish.value
    ? {
        placeholder: 'Filter terms…',
        clear: 'Clear filter',
        count: (shown: number, total: number) =>
          shown === total ? `${total} terms` : `${shown} of ${total} terms`,
        empty: 'No term matches that filter.',
      }
    : {
        placeholder: 'Filtrar termos…',
        clear: 'Limpar filtro',
        count: (shown: number, total: number) =>
          shown === total ? `${total} termos` : `${shown} de ${total} termos`,
        empty: 'Nenhum termo corresponde a esse filtro.',
      },
)
</script>

<template>
  <div class="glossary">
    <div class="glossary-toolbar">
      <input
        v-model="query"
        class="glossary-filter"
        type="search"
        :placeholder="labels.placeholder"
        :aria-label="labels.placeholder"
        autocomplete="off"
        spellcheck="false"
      />
      <button v-if="query" class="glossary-clear" type="button" @click="query = ''">
        {{ labels.clear }}
      </button>
      <p class="glossary-count" aria-live="polite">
        {{ labels.count(filtered.length, rows.length) }}
      </p>
    </div>

    <p v-if="!filtered.length" class="glossary-empty">{{ labels.empty }}</p>

    <ul v-else class="glossary-list">
      <li v-for="row in filtered" :key="row.term" class="glossary-row">
        <span class="glossary-row__term">{{ row.term }}</span>
        <span class="glossary-row__meaning">{{ row.expansion }}</span>
        <a class="glossary-row__chapter" :href="row.href">
          {{ row.chapterLabel }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.glossary-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin: 1.25rem 0 0.75rem;
}

.glossary-filter {
  flex: 1 1 14rem;
  min-width: 0;
  padding: 0.45rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.glossary-filter:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.glossary-clear {
  padding: 0.45rem 0.7rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  cursor: pointer;
}

.glossary-clear:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.glossary-count {
  flex: 0 0 auto;
  margin: 0;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.glossary-empty {
  margin: 1rem 0;
  color: var(--vp-c-text-2);
}

.glossary-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--vp-c-divider);
}

.glossary-row {
  display: grid;
  /* Fixed term column keeps the expansions aligned into a readable column of their own. */
  grid-template-columns: minmax(5rem, 10rem) 1fr auto;
  gap: 0.5rem 1rem;
  align-items: baseline;
  padding: 0.6rem 0.25rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.glossary-row__term {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 0.9em;
}

.glossary-row__meaning {
  color: var(--vp-c-text-2);
  font-size: 0.925rem;
}

.glossary-row__chapter {
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
  white-space: nowrap;
}

.glossary-row__chapter:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .glossary-row {
    /* Term and chapter share the top line; the expansion gets the full width beneath. */
    grid-template-columns: 1fr auto;
  }

  .glossary-row__meaning {
    grid-column: 1 / -1;
  }
}
</style>
