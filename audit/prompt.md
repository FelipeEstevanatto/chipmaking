# Chapter audit — reusable prompt

Paste the section below into a fresh agent, replacing `<slugs>` with the chapters to audit (one pair
per slug: `docs/<slug>.md` + `docs/en/<slug>.md`). The agent reads, verifies and reports. It does not
edit content.

---

## Prompt

You are auditing chapters of **chipmaking**, a bilingual (pt-BR / en-US) VitePress site about the
silicon supply chain, from quartz mining to transistors. Read `AGENTS.md` at the repo root before you
start: it is the contract for sources, structure, glossary, charts, drawings and prose. Everything
below extends that contract; nothing overrides it.

**Chapters to audit:** `<slugs>` — for each, both `docs/<slug>.md` and `docs/en/<slug>.md`.

### Mission

Three passes over every chapter pair, plus a fourth for ideas:

1. **Language and pacing** — grammar, spelling, agreement, register, rhythm. PT-BR must read as
   native PT-BR; EN must be a translation of the sentence, not a transliteration of the PT.
2. **Facts, dates and values** — every number, unit, date, name and superlative, checked against
   the cited source and against the rest of the site.
3. **Structure and coverage** — compliance with `AGENTS.md` (spine, figures, citations rules,
   glossary first use, chart/link/math rules), and whether the section actually delivers what its
   heading promises.
4. **New material** — lesser-known facts and images worth adding, with a lead on where to verify
   or source them.

### Ground rules

- **Never invent a source, a number or a correction.** If you cannot verify a claim, say exactly
  what you cannot verify and how to check it. "Needs external verification" is a valid, useful
  finding; a guessed correction is not.
- **Quote exactly**, with `file:line`. A finding without a quote is not actionable.
- **PT and EN are one unit.** Report a divergence between the two locales as a single finding
  covering both files.
- **Do not edit any content file.** You may only create your report file (see Output).
- Distinguish what you verified from what you suspect. Use the confidence field.
- Do not run `bun run build` or the audit scripts; the fixing agent runs those. You may use `grep`
  and read files freely, and `fetch` a cited URL when a specific number is at stake. If `fetch` is
  unavailable or fails, record the URL to check instead.

### Pass 1 — Language and pacing

Read the PT and EN files side by side.

- Grammar and spelling in both languages. In PT-BR watch for: agreement, crase, hyphenation, verb
  tense consistency, `fábricação`-style typos, anglicisms where a PT term exists.
- Number formatting per locale: PT writes `1.700`, `0,47 %`; EN writes `1,700`, `0.47%`. A number
  formatted for the wrong locale is a finding.
- Untranslated leftovers: a PT word left in the EN file or vice versa.
- Pacing, per `AGENTS.md` § How it reads: banned words, binary contrasts, colon reveals, rhetorical
  setups, summary-recap endings, em-dash clusters (two or more em dashes on one line; the `— …,`
  sequence is always wrong), robotic rhythm (repeated sentence shapes), sections that pad instead
  of informing. Flag the pattern with a quote and a suggested rewrite of that sentence.
- Register consistency: the site explains to a curious non-specialist; a sentence that suddenly
  becomes a textbook or a press release is a pacing finding.
- Dead or misdirected links: raw `<a href="/...">` instead of `SeeAlso` breaks the `/chipmaking/`
  base; anchor links to headings that do not exist; `SeeAlso` entries pointing at the wrong note.

### Pass 2 — Facts, dates and values

Build a list of every numeral, unit, date, percentage, range and superlative in both locales, then
check each one:

- **Against its source.** Find the `<Cite id="…" />` on the sentence (or the page's `<SourceNote>`)
  and read the entry in `docs/.vitepress/theme/citations.ts`. Does the claim match what the title,
  publisher, year and URL can plausibly say? Check the URL year against the years in the prose — a
  `mcs2023` URL cannot support 2025 estimates. When the repo's own rule applies ("a number derived
  from an already-cited table cites that table"), check that no new source was invented for a
  derived number.
- **Against the site.** `grep` the whole `docs/` tree for the value. The same quantity must not
  differ between chapters, charts, tables or CSVs (`docs/public/data/*.csv`,
  `docs/.vitepress/theme/charts/specs.ts`). A chart on the page must agree with the table and the
  CSV.
- **Internal arithmetic.** Totals equal the sum of rows; percentages sum to what the text says;
  ranges are ordered low-to-high; conversions are right (nm/µm/mm, mm²/cm², W/kg, °C, eV).
- **Chronology.** Every ordered list, mermaid timeline and date sequence is in time order unless
  the text says otherwise. A timeline entry after a later one is a fact finding, not a nitpick.
- **Dates vs known history.** Company founding dates, product launch years, process-node years,
  Nobel prizes, "first"/"oldest"/"largest" claims. If your knowledge conflicts with the text,
  report it as *suspect*, quote the text, and name the check that settles it. Do not assert the
  correction as fact unless you verified it.
- **Currency, units and "current" claims.** `US$` must be escaped `\$` (see `AGENTS.md` §
  Equations); a "hoje/atualmente/today" claim must match the page's `dataAsOf` year. Flag any
  absolute claim ("the only", "all", "never") that the cited source cannot support.
- **People and places.** Names spelled consistently across locales (Norway/Noruega, TCS, etc.).
- **`dataAsOf` frontmatter**: plausible for the page's newest datum; absent only on the pages the
  rules exempt (historical chapters, navigation pages).

For each numeric finding, state the value as written, where it came from, and what the correct
value should be *or* the exact lookup that would settle it.

### Pass 3 — Structure and coverage (`AGENTS.md` compliance)

- **Spine.** Does the chapter open with the ordered list of what it explains (intro sentence, list,
  closing sentence; the list points at the sections, it does not summarise them)? If not, quote
  the opening as-is and say what is missing.
- **Figures.** Every item of the spine needs a figure. Count `<DiagramFigure>`, `<ZoomableImage>`,
  Mermaid blocks, charts and SVGs actually rendered; a heading-heavy chapter with no figure, or a
  spine item with no figure, is a finding. Check captions against what the image actually shows
  (open the image or SVG with `read_file`). Third-party images need author, original file and
  licence in the `figcaption` with a link; check for the credit, do not assume the licence.
- **Reference material last.** Summary tables, addenda and chronologies belong after the narrative;
  flag any at the top.
- **One enumeration, one home.** A list that also lives in a component or table (e.g.
  `theme/transistor-eras.ts`, `theme/furnace-stages.ts`) must not be duplicated in prose. Check
  consumers and flag drift between the copies.
- **Charts.** A chart in Markdown is inside `<ClientOnly>`; captions are plain text (no Markdown
  links or bold); a chart with data cites `sourceIds`, a drawing sets `schematic: true`. A chart's
  caption must not promise data the chart does not plot.
- **Glossary.** First use per page is annotated by the tooltip plugin, which cannot reach Mermaid,
  link labels, headings, `figcaption`, equations or text built from props. If a glossary term's
  first appearance is in one of those places, the prose must mention it earlier; flag it.
- **Maths.** `$...$` / `$$...$$` only; `\[ \]` never worked; a literal `$` in prose must be `\$`;
  only the pages listed in `scripts/audit-math.py` carry maths.
- **Style of drawings** (only if the chapter shows SVG): pure ASCII, numeric entities, opaque
  background rect, `<title>`/`<desc>`, labels under 60 chars, no Portuguese labels. Run
  `python scripts/audit-svgs.py` mentally against the file, or note "run the audit" if unsure.
- **Section promises.** A heading like "O que fica" or "Os números de hoje" must actually answer
  its promise with concrete content; a section that only restates is a structure finding.

### Pass 4 — New material (ideas)

For each chapter, propose 1–3 additions, flagged as ideas, not corrections:

- **A lesser-known fact** that sharpens the chapter's point, with the primary source that would
  back it (name the publisher/report; verify the URL with `fetch` before writing it down; if you
  cannot verify, describe the source without a URL).
- **An image or figure** worth adding: what it should show, which section it would sit in, and
  where it could come from (own schematic, public-domain/CC source, museum, company archive).
  Licence check is mandatory before the fixing agent uses it; say so.
- Prefer material that fills a gap the audit found (a spine item with no figure, a "why" that is
  asserted but never shown, a comparison that only exists as prose).

### Output format

Write your report to `audit/reports/<your-assigned-name>.md`:

```markdown
# Report — <pages>

## <slug>
### <slug>-01 — <short title>
- where: docs/<slug>.md:L12 (and docs/en/<slug>.md:L14)
- category: fact | grammar | pacing | parity | structure | figure | source | link | idea
- severity: blocker | major | minor | idea
- quote: "exact text, both locales if they diverge"
- problem: what is wrong and why
- fix: the concrete change, or the exact verification step if the truth is unknown
- verification: verified (how) | needs external verification (exact lookup)
- confidence: high | medium | low
```

Rules for the report:

- IDs are sequential per chapter: `<slug>-01`, `<slug>-02`, …
- One paragraph per field, no nested bullets — the report is merged mechanically later.
- Order findings by severity inside each chapter.
- **Severity**: `blocker` = wrong fact, broken link, rule violation that audits would catch;
  `major` = grammar/parity/structure defect a reader would notice; `minor` = polish;
  `idea` = new material.
- Merge repeated issues into one finding ("this construction recurs 6 times, lines …").
- Cap the report at ~25 findings per chapter pair. Cut nitpicks that carry no reader impact.
- End the report with `## Coverage summary` — one line per chapter: spine present (yes/no),
  figure count, `dataAsOf`, and the single thing most worth fixing next.

Return as your final message only: page list, finding counts by severity, and the 5 most important
findings as one line each. Do not paste the full report into the message.

---

## After the audit

The fixing agent works from `audit/findings.md`. Fix protocol: change PT and EN in the same edit;
add or repair the `<Cite>` and its `citations.ts` entry before shipping any number; never renumber
`citations.ts`; run `bun run build`, then `python scripts/audit-glossary.py`,
`python scripts/audit-svgs.py` and `python scripts/audit-math.py`; all four must pass. One commit
per chapter keeps the diff reviewable.
