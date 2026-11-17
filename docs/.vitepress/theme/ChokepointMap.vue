<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { useIsEnglish } from './locale'
import Cite from './Cite.vue'
import { CHOKEPOINTS } from './chokepoints'

/**
 * The chokepoint table as a map: one button per stage, in chain order, and a panel with who
 * dominates it, how concentrated it is (with the source), what would break, and the chapter that
 * explains it. The data is `chokepoints.ts`, which the chokepoint chart also reads.
 *
 * The buttons form a tab list wired for the arrow keys, Home and End. Used inside `<ClientOnly>`;
 * its class sits on the glossary audit's ignore list.
 */

const isEnglish = useIsEnglish()
const selected = ref(0)
const item = computed(() => CHOKEPOINTS[selected.value])
const text = (v: { pt: string; en: string }) => (isEnglish.value ? v.en : v.pt)
const chapterHref = computed(() => withBase((isEnglish.value ? '/en' : '') + item.value.chapter))

function onKey(e: KeyboardEvent) {
  const n = CHOKEPOINTS.length
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') selected.value = (selected.value + 1) % n
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') selected.value = (selected.value - 1 + n) % n
  else if (e.key === 'Home') selected.value = 0
  else if (e.key === 'End') selected.value = n - 1
  else return
  e.preventDefault()
  const tabs = (e.currentTarget as HTMLElement).querySelectorAll<HTMLButtonElement>('[role=tab]')
  tabs[selected.value]?.focus()
}

const t = computed(() =>
  isEnglish.value
    ? { title: 'Chokepoints along the chain', leader: 'Who dominates', concentration: 'Concentration', breaks: 'What would break', chapter: 'Read the chapter' }
    : { title: 'Os gargalos ao longo da cadeia', leader: 'Quem domina', concentration: 'Concentração', breaks: 'O que quebraria', chapter: 'Ler o capítulo' },
)
</script>

<template>
  <div class="chokepoint-map">
    <p class="chokepoint-map__title">{{ t.title }}</p>
    <div class="chokepoint-map__tabs" role="tablist" :aria-label="t.title" @keydown="onKey">
      <button
        v-for="(c, i) in CHOKEPOINTS"
        :id="`chokepoint-tab-${c.id}`"
        :key="c.id"
        type="button"
        role="tab"
        :aria-selected="selected === i"
        :aria-controls="`chokepoint-panel`"
        :tabindex="selected === i ? 0 : -1"
        :class="['chokepoint-map__tab', { 'is-active': selected === i }]"
        @click="selected = i"
      >
        <span class="chokepoint-map__step">{{ i + 1 }}</span>
        {{ text(c.stage) }}
      </button>
    </div>

    <div id="chokepoint-panel" class="chokepoint-map__panel" role="tabpanel" :aria-labelledby="`chokepoint-tab-${item.id}`">
      <dl>
        <div>
          <dt>{{ t.leader }}</dt>
          <dd>{{ text(item.leader) }}</dd>
        </div>
        <div>
          <dt>{{ t.concentration }}</dt>
          <dd>
            {{ text(item.concentration) }}
            <Cite v-for="id in item.sourceIds" :id="id" :key="id" />
          </dd>
        </div>
        <div>
          <dt>{{ t.breaks }}</dt>
          <dd>{{ text(item.breaks) }}</dd>
        </div>
      </dl>
      <a class="chokepoint-map__link" :href="chapterHref">{{ t.chapter }} →</a>
    </div>
  </div>
</template>

<style scoped>
.chokepoint-map {
  margin: 1.25rem 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}
.chokepoint-map__title {
  margin: 0 0 0.75rem;
  font-weight: 600;
}
.chokepoint-map__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.9rem;
}
.chokepoint-map__tab {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.65rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.85rem;
  cursor: pointer;
}
.chokepoint-map__tab.is-active {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.chokepoint-map__tab:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
.chokepoint-map__step {
  display: inline-grid;
  place-items: center;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background: var(--vp-c-divider);
  font-size: 0.72rem;
  font-weight: 600;
}
.chokepoint-map__panel dl {
  margin: 0 0 0.6rem;
}
.chokepoint-map__panel dl > div {
  margin-bottom: 0.5rem;
}
.chokepoint-map__panel dt {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}
.chokepoint-map__panel dd {
  margin: 0.1rem 0 0;
}
.chokepoint-map__link {
  font-size: 0.9rem;
}
</style>
