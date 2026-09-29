<script setup lang="ts">
import { withBase } from 'vitepress'
import { CHAIN_CHIP_BRANCH, CHAIN_LABELS, CHAIN_SOLAR_BRANCH, CHAIN_UPSTREAM } from './chain'
import type { ChainNode } from './chain'
import { useIsEnglish, useLocalePath } from './locale'
import { STAGE_ACCENTS } from './stage-visuals'
import StageIcon from './StageIcon.vue'

/**
 * The production chain as a flow: the common trunk, the fork at the wafer, and the two branches.
 *
 * It replaces the mermaid diagram the home page used to carry: the same route the orientation
 * strip draws, but larger, with the stage icons and no client-side diagram library. The route
 * itself comes from `chain.ts`, so the strip and this figure cannot drift.
 */

const isEnglish = useIsEnglish()
const localePath = useLocalePath()

const pick = (text: { pt: string; en: string }) => (isEnglish.value ? text.en : text.pt)
const label = (node: ChainNode) => (isEnglish.value ? node.en : node.pt)
const accent = (node: ChainNode) => STAGE_ACCENTS[node.accent]
</script>

<template>
  <nav class="chain-flow" :aria-label="pick(CHAIN_LABELS.title)">
    <ol class="chain-flow__trunk">
      <li v-for="(node, i) in CHAIN_UPSTREAM" :key="node.path" class="chain-flow__step">
        <a
          class="chain-flow__node"
          :href="withBase(localePath(node.path))"
          :style="{ '--flow-accent': accent(node) }"
        >
          <span class="chain-flow__icon"><StageIcon :name="node.icon" /></span>
          <span class="chain-flow__label">{{ label(node) }}</span>
        </a>
        <span v-if="i < CHAIN_UPSTREAM.length - 1" class="chain-flow__arrow" aria-hidden="true">
          <svg viewBox="0 0 24 10" fill="none" stroke="currentColor" stroke-width="1.5"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 5h20M17 1.5 21 5l-4 3.5" />
          </svg>
        </span>
      </li>
    </ol>

    <p class="chain-flow__fork">{{ pick(CHAIN_LABELS.fork) }}</p>

    <div class="chain-flow__branches">
      <div class="chain-flow__branch">
        <span class="chain-flow__tag">{{ pick(CHAIN_LABELS.solar) }}</span>
        <a
          v-for="node in CHAIN_SOLAR_BRANCH"
          :key="node.path"
          class="chain-flow__node chain-flow__node--small"
          :href="withBase(localePath(node.path))"
          :style="{ '--flow-accent': accent(node) }"
        >
          <span class="chain-flow__icon"><StageIcon :name="node.icon" /></span>
          <span class="chain-flow__label">{{ label(node) }}</span>
        </a>
      </div>

      <div class="chain-flow__branch">
        <span class="chain-flow__tag">{{ pick(CHAIN_LABELS.chip) }}</span>
        <template v-for="(node, i) in CHAIN_CHIP_BRANCH" :key="node.path">
          <a
            class="chain-flow__node chain-flow__node--small"
            :href="withBase(localePath(node.path))"
            :style="{ '--flow-accent': accent(node) }"
          >
            <span class="chain-flow__icon"><StageIcon :name="node.icon" /></span>
            <span class="chain-flow__label">{{ label(node) }}</span>
          </a>
          <span v-if="i < CHAIN_CHIP_BRANCH.length - 1" class="chain-flow__arrow" aria-hidden="true">
            <svg viewBox="0 0 24 10" fill="none" stroke="currentColor" stroke-width="1.5"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 5h20M17 1.5 21 5l-4 3.5" />
            </svg>
          </span>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.chain-flow {
  margin: 1.5rem 0;
  padding: 1.5rem 1rem 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.chain-flow__trunk {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.chain-flow__step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chain-flow__node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  min-width: 108px;
  padding: 0.7rem 0.75rem 0.65rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg);
  text-decoration: none;
  text-align: center;
  transition: border-color 0.2s, transform 0.2s;
}

.chain-flow__node:hover {
  border-color: var(--flow-accent);
  transform: translateY(-2px);
}

.chain-flow__node:focus-visible {
  outline: 2px solid var(--flow-accent);
  outline-offset: 2px;
}

.chain-flow__icon {
  width: 1.6rem;
  height: 1.6rem;
  color: var(--flow-accent);
}

.chain-flow__label {
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--vp-c-text-1);
}

.chain-flow__arrow {
  flex: 0 0 auto;
  width: 1.5rem;
  height: 0.65rem;
  color: var(--vp-c-text-3);
}

.chain-flow__arrow svg {
  display: block;
  width: 100%;
  height: 100%;
}

.chain-flow__fork {
  margin: 1.1rem 0 0.75rem;
  text-align: center;
  font-size: 0.8rem;
  font-style: italic;
  color: var(--vp-c-text-3);
}

.chain-flow__branches {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem 2rem;
}

.chain-flow__branch {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.chain-flow__tag {
  min-width: 6.25rem;
  text-align: right;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

@media (max-width: 640px) {
  .chain-flow {
    padding: 1rem 0.75rem;
  }

  .chain-flow__node {
    min-width: 88px;
    padding: 0.55rem 0.6rem;
  }

  .chain-flow__arrow {
    display: none;
  }

  .chain-flow__tag {
    min-width: auto;
    text-align: left;
  }
}

@media (prefers-reduced-motion: reduce) {
  .chain-flow__node {
    transition: none;
  }

  .chain-flow__node:hover {
    transform: none;
  }
}
</style>
