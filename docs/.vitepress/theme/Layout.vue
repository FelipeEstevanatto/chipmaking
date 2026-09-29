<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import BuildFooter from './BuildFooter.vue'
import SupplyChainMap from './SupplyChainMap.vue'
import ReadingProgress from './ReadingProgress.vue'
import DocMeta from './DocMeta.vue'
import HeroWafer from './HeroWafer.vue'

/**
 * The default layout has no footer on pages that show a sidebar, so the build-provenance bar is
 * injected through the `layout-bottom` slot instead of `themeConfig.footer` (which only accepts
 * plain strings and renders on the home page alone).
 *
 * `SupplyChainMap` and `DocMeta` ride along in `doc-before` so every production chapter gets the
 * orientation strip and the reading estimate without opting in; each component decides for itself
 * whether the current page warrants it. `ReadingProgress` is viewport-fixed, so it belongs in
 * `layout-top` rather than the document flow. `HeroWafer` replaces the landing page's hero photo
 * with a drawing that holds up on the dark theme.
 *
 * @see https://vitepress.dev/guide/extending-default-theme#layout-slots
 */
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-top>
      <ReadingProgress />
    </template>
    <template #home-hero-image>
      <HeroWafer />
    </template>
    <template #doc-before>
      <SupplyChainMap />
      <DocMeta />
    </template>
    <template #layout-bottom>
      <BuildFooter />
    </template>
  </Layout>
</template>
