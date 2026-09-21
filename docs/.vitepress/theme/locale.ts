import { computed } from 'vue'
import { useData } from 'vitepress'

/**
 * True when the current page is rendered in the English locale.
 * `lang` is inherited from the active VitePress locale (`pt-BR`, `en-US`).
 */
export function useIsEnglish() {
  const { lang } = useData()
  return computed(() => String(lang.value).toLowerCase().startsWith('en'))
}

/**
 * Maps a Portuguese content path to the reader's own locale, so shared
 * components (citations, charts, comparators) never link across languages.
 *
 * Files are mirrored 1:1 under `docs/en/`, so a simple `/en` prefix is enough.
 */
export function useLocalePath() {
  const isEnglish = useIsEnglish()
  return (ptPath: string) => (isEnglish.value ? `/en${ptPath}` : ptPath)
}
