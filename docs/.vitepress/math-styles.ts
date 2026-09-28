import type MarkdownIt from 'markdown-it'

/**
 * Drops the MathJax stylesheet that `markdown-it-mathjax3` writes beside every equation, and restores
 * the `tabindex` VitePress wants on display maths.
 *
 * The plugin renders each equation as `<style>…</style><mjx-container>…</mjx-container>`. VitePress
 * compiles every chapter into a Vue component template, and Vue discards `<style>` and `<script>` tags
 * found inside one — so the rules never applied, `vite` logged `Tags with side effect are ignored in
 * client component templates` once per equation, and every page carried a copy of a stylesheet that did
 * nothing. The rules the pages need live in `theme/custom.css`.
 *
 * Stripping is also what lets the `tabindex` land. VitePress adds it for keyboard scrolling of a wide
 * equation, but anchors its own replace to the start of the rendered string, and the plugin's output
 * begins with the stylesheet and a `<span id="mjx-…">` wrapper instead of the container.
 *
 * Register with `md.use(stripMathStyles)` from `markdown.config`, which VitePress applies *after* it
 * installs the math plugin — the rule being wrapped has to exist first.
 */

/** Both types are derived from the engine, so nothing here depends on markdown-it's internals. */
type RenderRule = NonNullable<MarkdownIt['renderer']['rules'][string]>

const INJECTED_STYLE = /<style[\s\S]*?<\/style>/g

export function stripMathStyles(md: MarkdownIt) {
  for (const [name, display] of [
    ['math_inline', false],
    ['math_block', true],
  ] as const) {
    const render: RenderRule | undefined = md.renderer.rules[name]
    if (!render) continue

    md.renderer.rules[name] = (tokens, idx, options, env, self) => {
      const html = render(tokens, idx, options, env, self).replace(INJECTED_STYLE, '')
      // The guard keeps a duplicate `tabindex` out if VitePress ever lands it itself.
      return display ? html.replace(/<mjx-container (?!tabindex)/, '<mjx-container tabindex="0" ') : html
    }
  }
}
