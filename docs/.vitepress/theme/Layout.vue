<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import BuildFooter from './BuildFooter.vue'

/**
 * The default layout has no footer on pages that show a sidebar, so the build-provenance bar is
 * injected through the `layout-bottom` slot instead of `themeConfig.footer` (which only accepts
 * plain strings and renders on the home page alone).
 *
 * @see https://vitepress.dev/guide/extending-default-theme#layout-slots
 */
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <BuildFooter />
    </template>
  </Layout>
</template>
