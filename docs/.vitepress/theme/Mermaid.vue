<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Renders a ```mermaid code fence.
 *
 * This replaces `vitepress-plugin-mermaid/Mermaid.vue` through a Vite alias (see config.ts).
 * The plugin ships mermaid as a *static* import, which pulls ~450 kB of mermaid plus its
 * diagram-type chunks into the main bundle on every page. Importing it dynamically here means
 * mermaid is only downloaded on the four pages that actually contain a diagram.
 *
 * Mermaid's own options are set below rather than in the VitePress config, because the plugin's
 * `virtual:mermaid-config` module is no longer read by this component.
 */
const props = defineProps<{ graph: string; id?: string }>()

const svg = ref('')
let observer: MutationObserver | null = null
let renderedTheme: boolean | null = null
let seq = 0

function isDark() {
  return document.documentElement.classList.contains('dark')
}

async function render() {
  const dark = isDark()
  if (renderedTheme === dark && svg.value) return
  renderedTheme = dark

  const { default: mermaid } = await import('mermaid')
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: dark ? 'dark' : 'default',
    fontFamily: 'inherit',
    // Timelines carry a dozen entries: squeezing them into the text column makes the labels
    // unreadable, so let them keep their natural width and scroll sideways instead (see
    // `.mermaid` in custom.css). Flowcharts fit the column fine.
    timeline: { useMaxWidth: false },
    flowchart: { useMaxWidth: true },
  })

  const renderId = `mermaid-${props.id ?? 'diagram'}-${seq++}`
  try {
    const { svg: markup } = await mermaid.render(renderId, decodeURIComponent(props.graph))
    svg.value = markup
  } catch (error) {
    svg.value = ''
    console.error('[mermaid]', error)
  } finally {
    // mermaid.render() parks a scratch node in the body; it is not always cleaned up on failure.
    document.getElementById(`d${renderId}`)?.remove()
  }
}

onMounted(async () => {
  await render()
  observer = new MutationObserver(() => {
    if (renderedTheme !== isDark()) void render()
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <!-- `v-html` holds mermaid's own SVG output; the class attribute falls through from the plugin. -->
  <div v-html="svg" />
</template>
