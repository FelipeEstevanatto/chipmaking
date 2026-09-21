import type MarkdownIt from 'markdown-it'
import { tooltipTerms, type TooltipTerm } from './glossary'

/**
 * Annotates the *first* use of each glossary term in a chapter with its expansion, as
 * `<abbr class="glossary-abbr" title="…">TERM</abbr>`.
 *
 * Implemented as a core rule rather than a renderer override because "first use" is a
 * document-level notion: it needs the whole token stream in order, and it has to survive the text
 * being split across paragraphs, list items, table cells and figure captions.
 *
 * An `<abbr>` is used rather than a JS tooltip on purpose — the expansion becomes the accessible
 * name of the abbreviation, so assistive tech reads it out, nothing has to hydrate, and the page
 * still reads correctly if JavaScript never runs.
 *
 * Terms are matched with an alphanumeric-and-hyphen boundary, so `SOI` is not annotated inside
 * `FD-SOI` and `CZ` is not annotated inside `RCz`. That rules out the worst failure mode — a
 * tooltip attached to the wrong span of characters. The cost is that compounds like `CZ-Si` are
 * simply left alone.
 */

/** Both types are derived from the engine, so nothing here depends on markdown-it's internals. */
type CoreState = Parameters<MarkdownIt['core']['process']>[0]
type MdToken = CoreState['tokens'][number]

/** Boundary guard: not preceded or followed by another letter, digit or hyphen. */
function termPattern(spelling: string): RegExp {
  return new RegExp(`(?<![A-Za-z0-9-])${escapeRegExp(spelling)}(?![A-Za-z0-9-])`)
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Attribute-safe text: expansions contain quotes, ampersands and non-ASCII. */
function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

interface Match {
  index: number
  length: number
  spelling: string
  expansion: string
  /** The entry's canonical term, used to mark the entry as spent regardless of the spelling used. */
  term: string
}

/**
 * Picks the earliest, non-overlapping match for every term not yet annotated elsewhere in the
 * document, and marks those terms as spent. Returns `null` when this run of text needs no rewrite.
 */
function selectMatches(
  content: string,
  terms: TooltipTerm[],
  spent: Set<string>,
): Match[] | null {
  const candidates: Match[] = []

  for (const term of terms) {
    for (const spelling of term.spellings) {
      const found = termPattern(spelling).exec(content)
      if (!found) continue
      candidates.push({
        index: found.index,
        length: found[0].length,
        spelling: found[0],
        expansion: term.expansion,
        term: term.spellings[0],
      })
    }
  }

  if (!candidates.length) return null

  // Earliest wins; on a tie the longer spelling wins, so `FD-SOI` beats a bare `SOI`.
  candidates.sort((a, b) => a.index - b.index || b.length - a.length)

  const chosen: Match[] = []
  let consumedTo = 0

  for (const candidate of candidates) {
    if (candidate.index < consumedTo) continue
    if (spent.has(candidate.term)) continue
    chosen.push(candidate)
    spent.add(candidate.term)
    consumedTo = candidate.index + candidate.length
  }

  return chosen.length ? chosen : null
}

/** Splits one `text` token into plain runs and annotated terms, keeping the original spellings. */
function rewriteTextToken(
  state: CoreState,
  token: MdToken,
  terms: TooltipTerm[],
  spent: Set<string>,
): MdToken[] | null {
  const chosen = selectMatches(token.content, terms, spent)
  if (!chosen) return null

  const out: MdToken[] = []
  let cursor = 0

  const pushText = (value: string) => {
    if (!value) return
    const plain = new state.Token('text', '', 0)
    plain.content = value
    out.push(plain)
  }

  for (const match of chosen) {
    pushText(token.content.slice(cursor, match.index))
    const abbr = new state.Token('html_inline', '', 0)
    abbr.content =
      `<abbr class="glossary-abbr" title="${escapeAttribute(match.expansion)}">` +
      `${match.spelling}</abbr>`
    out.push(abbr)
    cursor = match.index + match.length
  }

  pushText(token.content.slice(cursor))
  return out
}

export function glossaryTooltips(md: MarkdownIt) {
  md.core.ruler.push('glossary_tooltips', (state) => {
    const relativePath = String(
      (state.env as { relativePath?: string } | undefined)?.relativePath ?? '',
    )

    // An empty path is a context this rule has no business rewriting (includes, generated pages).
    if (!relativePath) return
    // On the glossary and reference pages every term sits right next to its own expansion, or is a
    // citation label — annotating there is pure noise.
    if (/glossario|referencias/.test(relativePath)) return

    const terms = tooltipTerms(relativePath.startsWith('en/'))
    if (!terms.length) return

    const spent = new Set<string>()
    let inHeading = false

    for (const block of state.tokens) {
      // Heading text doubles as the outline label the reader is already scanning, and VitePress
      // copies it into the sidebar — an annotation there would leak into navigation.
      if (block.type === 'heading_open') {
        inHeading = true
        continue
      }
      if (block.type === 'heading_close') {
        inHeading = false
        continue
      }
      if (inHeading || block.type !== 'inline' || !block.children) continue

      const rewritten: MdToken[] = []
      let linkDepth = 0

      for (const child of block.children) {
        if (child.type === 'link_open') linkDepth += 1

        // Link text is skipped: wrapping an anchor's own label would nest `<abbr>` inside `<a>`.
        if (child.type === 'text' && linkDepth === 0) {
          const replacement = rewriteTextToken(state, child, terms, spent)
          if (replacement) {
            rewritten.push(...replacement)
            continue
          }
        }

        rewritten.push(child)
        if (child.type === 'link_close') linkDepth -= 1
      }

      block.children = rewritten
    }
  })

  return md
}
