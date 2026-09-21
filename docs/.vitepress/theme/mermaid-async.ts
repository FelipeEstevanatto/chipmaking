import { defineAsyncComponent } from 'vue'

/**
 * Entry point for the global `Mermaid` component (aliased over the plugin's own renderer).
 *
 * `vitepress-plugin-mermaid` registers the component with a *static* import, which makes Rollup
 * link mermaid into the client entry's chunk graph. VitePress then emits a
 * `<link rel="modulepreload">` for the ~680 kB mermaid chunk on **every** page, including the
 * sixteen that contain no diagram.
 *
 * Going through `defineAsyncComponent` puts the renderer one dynamic hop away, the same shape the
 * default theme uses for the (genuinely lazy) local search box, so mermaid is fetched only on the
 * pages that actually render one.
 */
export default defineAsyncComponent(() => import('./Mermaid.vue'))
