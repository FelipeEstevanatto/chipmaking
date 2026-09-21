<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

/**
 * Persistent orientation strip for the nine production chapters.
 *
 * The docs are a *chain*, but they read as a flat list of pages: nothing tells a reader what sits
 * upstream or downstream of the page they are on. This renders the whole route — including the
 * point where the wafer forks into a solar branch and a chip branch — and marks the current page.
 *
 * It is mounted globally through the `doc-before` slot (see Layout.vue) and renders nothing on
 * pages that are not part of the chain (home, glossary, timeline, references), so chapters do not
 * have to opt in individually.
 */

interface ChainNode {
  pt: string
  en: string
  /** Portuguese content path; English is derived by prefixing `/en`. */
  path: string
  /** Supporting chapter for this step — related, but not part of the production flow. */
  extra?: { pt: string; en: string; path: string }
}

const { page, lang } = useData()

const isEnglish = computed(() => String(lang.value).toLowerCase().startsWith('en'))

/** Shared trunk: everything before the wafer is common to both industries. */
const upstream: ChainNode[] = [
  { pt: 'Quartzo + MG-Si', en: 'Quartz + MG-Si', path: '/mineracao-mg-si' },
  { pt: 'Polissilício', en: 'Polysilicon', path: '/polissilicio' },
  {
    pt: 'Lingote e wafer',
    en: 'Ingot and wafer',
    path: '/fabricacao-wafers',
    extra: { pt: 'Estrutura e tipos', en: 'Crystal structure', path: '/estrutura-wafers' },
  },
]

const solarBranch: ChainNode[] = [
  { pt: 'Células e módulos', en: 'Cells and modules', path: '/celulas-solares' },
]

const chipBranch: ChainNode[] = [
  {
    pt: 'Fotolitografia',
    en: 'Photolithography',
    path: '/fotolitografia',
    extra: {
      pt: 'História da fotolitografia',
      en: 'History of photolithography',
      path: '/historia-fotolitografia',
    },
  },
  { pt: 'Transistores', en: 'Transistors', path: '/transistores' },
]

const allNodes = computed<ChainNode[]>(() => [
  ...upstream,
  ...solarBranch,
  ...chipBranch,
  ...upstream.flatMap((n) => (n.extra ? [{ ...n.extra, path: n.extra.path }] : [])),
  ...chipBranch.flatMap((n) => (n.extra ? [{ ...n.extra, path: n.extra.path }] : [])),
])

const localize = (path: string) => (isEnglish.value ? `/en${path}` : path)
const label = (node: { pt: string; en: string }) => (isEnglish.value ? node.en : node.pt)

/** `polissilicio.md` -> `/polissilicio`; `en/index.md` -> `/en/`. */
const currentPath = computed(() => {
  const rel = (page.value.relativePath || '').replace(/\.md$/, '')
  if (rel === 'index') return '/'
  if (rel === 'en/index') return '/en/'
  return `/${rel}`
})

/** Chapters outside the production chain get no strip at all. */
const isChainPage = computed(() =>
  allNodes.value.some((node) => localize(node.path) === currentPath.value),
)

const isCurrent = (node: ChainNode) => localize(node.path) === currentPath.value

const title = computed(() => (isEnglish.value ? 'In the silicon chain' : 'Na cadeia do silício'))
const forkLabel = computed(() =>
  isEnglish.value ? 'the wafer forks into two destinations' : 'o wafer se divide em dois destinos',
)
const solarTag = computed(() => (isEnglish.value ? 'photovoltaics' : 'fotovoltaica'))
const chipTag = computed(() => (isEnglish.value ? 'semiconductors' : 'semicondutores'))
</script>

<template>
  <nav v-if="isChainPage" class="chain-map" :aria-label="title">
    <p class="chain-map__title">{{ title }}</p>

    <ol class="chain-map__row">
      <li v-for="(node, i) in upstream" :key="node.path" class="chain-map__item">
        <a
          :href="withBase(localize(node.path))"
          :class="['chain-map__chip', { 'is-current': isCurrent(node) }]"
          :aria-current="isCurrent(node) ? 'page' : undefined"
          >{{ label(node) }}</a
        >
        <a
          v-if="node.extra"
          :href="withBase(localize(node.extra.path))"
          :class="['chain-map__side', { 'is-current': isCurrent({ ...node, path: node.extra.path }) }]"
          >{{ label(node.extra) }}</a
        >
        <span v-if="i < upstream.length - 1" class="chain-map__arrow" aria-hidden="true">→</span>
      </li>
    </ol>

    <p class="chain-map__fork">{{ forkLabel }}</p>

    <div class="chain-map__branches">
      <div class="chain-map__branch">
        <span class="chain-map__tag">{{ solarTag }}</span>
        <a
          v-for="node in solarBranch"
          :key="node.path"
          :href="withBase(localize(node.path))"
          :class="['chain-map__chip', { 'is-current': isCurrent(node) }]"
          :aria-current="isCurrent(node) ? 'page' : undefined"
          >{{ label(node) }}</a
        >
      </div>

      <div class="chain-map__branch">
        <span class="chain-map__tag">{{ chipTag }}</span>
        <template v-for="(node, i) in chipBranch" :key="node.path">
          <a
            :href="withBase(localize(node.path))"
            :class="['chain-map__chip', { 'is-current': isCurrent(node) }]"
            :aria-current="isCurrent(node) ? 'page' : undefined"
            >{{ label(node) }}</a
          >
          <a
            v-if="node.extra"
            :href="withBase(localize(node.extra.path))"
            :class="['chain-map__side', { 'is-current': isCurrent({ ...node, path: node.extra.path }) }]"
            >{{ label(node.extra) }}</a
          >
          <span v-if="i < chipBranch.length - 1" class="chain-map__arrow" aria-hidden="true">→</span>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.chain-map {
  margin: 0 0 1.5rem;
  padding: 0.75rem 0.9rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  font-size: 0.82rem;
  line-height: 1.5;
}

.chain-map__title {
  margin: 0 0 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.chain-map__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.chain-map__item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
}

.chain-map__chip {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  text-decoration: none;
  white-space: nowrap;
  transition: border-color 0.2s, color 0.2s;
}

.chain-map__chip:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

/* The reader's own chapter — deliberately the only high-contrast element. */
.chain-map__chip.is-current {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-1);
  color: #fff;
  font-weight: 600;
}

.chain-map__side {
  color: var(--vp-c-text-3);
  text-decoration: none;
  border-bottom: 1px dotted var(--vp-c-divider);
  white-space: nowrap;
}

.chain-map__side::before {
  content: '↳ ';
  opacity: 0.6;
}

.chain-map__side:hover,
.chain-map__side.is-current {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}

.chain-map__arrow {
  color: var(--vp-c-text-3);
}

.chain-map__fork {
  margin: 0.6rem 0 0.4rem;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  font-style: italic;
}

.chain-map__branches {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
}

.chain-map__branch {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
}

.chain-map__tag {
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  min-width: 6.5rem;
}

@media (max-width: 640px) {
  .chain-map {
    font-size: 0.78rem;
  }

  .chain-map__tag {
    min-width: auto;
  }
}
</style>
