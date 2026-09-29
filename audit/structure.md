# Structure review — proposals

These are proposals, not applied changes; each one names the files it would touch and how to verify
it first. They come out of the 2026-09 audit (`audit/findings.md`) and a read of `config.ts`,
`theme/`, the sidebars and all chapter pairs.

## What the site already gets right

Worth stating so the proposals below extend it instead of replacing it:

- One source per enumeration (`transistor-eras.ts`, `furnace-stages.ts`, `charts/specs.ts`), one
  glossary (`glossary.ts`), one citation list (`citations.ts`), with scripts that fail on drift.
- The sidebar follows the production chain 1–6; the home page declares a reading trail; both
  locales are mirrored 1:1, and `theme/locale.ts` encodes that assumption.
- `DocMeta`, `ReadingProgress`, `BuildFooter` and `SupplyChainMap` give every chapter orientation
  and provenance without per-page opt-in.
- The audits (`audit-glossary`, `audit-svgs`, `audit-math`) already enforce the prose contract.

The gaps below are mostly of the same kind: one rule exists in `AGENTS.md` but has no mechanical
check yet, so it drifted.

## 1. Navigation and information architecture

### 1.1 The language switcher likely drops the reader on the locale home

VitePress's built-in locale switcher navigates to the `link` configured for the locale (`/en/`),
not to the same page in the other locale, and this repo adds no custom switcher (`theme/Layout.vue`
and `theme/index.ts` register no nav component). Every chapter is mirrored 1:1, so a reader on
`/polissilicio` who switches to English probably lands on `/en/` instead of `/en/polissilicio`.

- Verify: run `bun run dev`, open a chapter and click the language entry.
- Proposal: a small switcher that maps the current route to its counterpart (`/en` prefix on/off,
  the same assumption `useLocalePath` makes), falling back to the locale home only for unmatched
  routes (404, references). Files: `theme/` (new component) + `config.ts` nav; a router hook via
  `themeConfig` or `Layout.vue`. Effort S–M.

### 1.2 A public "Método e fontes" page

The rules that make the site trustworthy are internal today: they live in `README.md` and
`AGENTS.md`, which readers never see. One page, linked from the footer and from `/referencias`,
could state:

- what a `<Cite>` marker means and what "compilation" means when no primary source tabulates a
  series;
- what `dataAsOf` declares and why some chapters are older on purpose;
- how drawings and charts are produced (SVG by script, charts from `specs.ts`, CSV derived);
- how to report an error (a link to the repo's issues) and the text licence.

Touches `docs/metodo.md` + `docs/en/metodo.md`, the "Fontes" sidebar group, and `BuildFooter.vue`.
Effort M. This also gives other sites something to cite.

### 1.3 Chapter index with status columns

The README carries the chapter table; the site does not. A generated "Mapa do site" (reading time,
`dataAsOf`, figure count, number of sources) would let a reader choose what to read, and would
surface the freshness stamp that currently only appears inside each chapter. The data is already
present (frontmatter + files); a `scripts/gen-site-map.ts` run at build time keeps it from going
stale. Placement: link under "Panorama"/"Fontes", not in the numbered chain. Effort M.

### 1.4 A 404 page in both locales

VitePress renders a default 404 in the site's locale chrome; a bilingual or locale-aware custom
`404.md` should point lost readers at the chain map and the search. Effort S. Verify current
behaviour first (the GitHub Pages deploy may already be serving the target but untranslated 404).

### 1.5 Sidebar labels vs page titles

Small drift to settle once: sidebar "Estrutura e tipos" vs title "Estrutura cristalina e tipos de
wafer"; EN sidebar "Crystal structure" vs title "Crystal structure & wafer types"; "História da
fotolitografia" is in the "Na fab" group although it is chronology, not process. Decide whether
sidebar labels are quotes of the titles or shortened versions and apply it in `config.ts`, so search
results and the sidebar agree.

### 1.6 The home reading trail should say what it leaves out

The trail lists 11 chapters and closes by pointing at the photovoltaics branch and the Panorama.
It silently omits "História da fotolitografia", "Insumos da fab", "Além do silício" and "Dados".
Either state the scope ("a trilha essencial; os capítulos de contexto ficam no Panorama") or add
them as optional stops. One sentence in `docs/index.md` + `docs/en/index.md`. Effort S.

## 2. Conventions that should become checks

The repo's habit is to encode rules as scripts. Three rules from `AGENTS.md` currently have no
check and produced the audit's most repeated defects.

### 2.1 Link/anchor audit (fixes the most repeated blocker class)

Seven blockers in this audit are internal links whose fragment resolves to nothing — six of them EN
links carrying PT anchors (`insumos-fab-01`, `gargalos-01`, `precos-e-valor-01`, `dados-02`,
`empacotamento-09`). Reimplementing VitePress slugging is fragile; auditing the build output is not:
after `bun run build`, parse `docs/.vitepress/dist/**/*.html`, and for every internal `href` with a
fragment assert the target document contains that `id`. Fail with the file and the dead fragment.
Files: `scripts/audit-links.py` (new), run in the same pass as the other audits. Effort S–M.

### 2.2 Figure coverage audit

`AGENTS.md` says every spine item needs a figure; the audit found chapters where four of nine
(`na-fab-03`), four of seven (`celulas-solares-11`) or all (`alem-do-silicio-02`, `insumos-fab-03`)
spine items have none. Decide first what counts as a figure — today `DocMeta` counts only
`.diagram-figure`, so `DataChart`, mermaid, `TransistorTimeline`, `CrystalViewer` and
`FurnaceChemistry` are invisible to the count. Then either:

- extend `DocMeta` to count those components (and the label stays honest), and add
  `scripts/audit-figures.py` as an advisory report per chapter (not a hard failure while the gaps
  are open); or
- soften the rule in `AGENTS.md` to "every spine item needs a visual anchor or says why not".

Effort M. Either way, the two need to agree: right now the rule is stricter than both the content
and the counter.

### 2.3 Localised chart labels and CSV headers

`ChartSpec.labels` is `string[]`, passed through by `DataChart.vue`, so three charts show Portuguese
category labels on `/en/…` (`confiabilidade-06`, `gargalos-03`), and `export-chart-data.ts` writes
Portuguese CSV headers that the EN pages link to. Change the type to `LocalizedText[]`
(`{ pt, en }`, as `xLabel`/`yLabel` already do), resolve it in `DataChart.vue`, and localise or
duplicate the CSV headers. A type change makes the next unlocalised label a compile error; a script
cannot. Effort S.

### 2.4 The `dataAsOf` rule needs one clarifying sentence

`confiabilidade-02` ships `dataAsOf: 2026` with no 2026 datum; `celulas-solares` describes an
industry with 2011 numbers. Add to `AGENTS.md` § Reading aids: the stamp is the year of the newest
*source cited*, not the newest year mentioned, and a chapter whose data is mostly from one dated
survey says so in the prose. No script; the audit forces the reading.

## 3. Content architecture

### 3.1 Make the spine a template

Ten of the audited chapters do not open with the ordered list `AGENTS.md` requires
(`o-elemento-silicio-02`, `mineracao-mg-si-04`, `polissilicio-06`, `estrutura-wafers-01`,
`fabricacao-wafers-01`, `fotolitografia-04`, `historia-fotolitografia-07`, `insumos-fab-02`,
`confiabilidade-01`, plus the missing closing sentence in `empacotamento-11`). Put the literal
four-line template in `AGENTS.md` (intro sentence → ordered list with anchors → closing sentence)
and apply it chapter by chapter as those findings are fixed; add a checklist line to the PR
template if one exists.

### 3.2 Extend "one enumeration, one home" to explanations

The rule protects lists; it does not stop the same explanation from being written twice
(`insumos-fab-07` repeats the CMP slurry from `na-fab`; `confiabilidade-10` repeats burn-in from
`empacotamento`; `na-fab` and `insumos-fab` share the gas/water material). Proposal: the first
chapter that needs it explains, later chapters link with a one-line recap, and the recap carries
the `<Cite>` only if it repeats a number. Add two sentences to `AGENTS.md`.

### 3.3 Decide what `linha-do-tempo` is

Today it is two things: a polysilicon market timeline and the transistor-generation timeline. The
market half duplicates `polissilicio` (and its mermaid is out of order, `linha-do-tempo-02`), while
the component half is correct by construction. Either:

- make it the site's single chronology, with one spine (market milestones → fab/litho milestones →
  transistor generations) and every entry linking its chapter; or
- keep only the architectural timeline and move the market milestones back to `polissilicio`
  (where the data already lives), with the page reduced to a navigational hub.

Either way the "fifteen generations" fix (`linha-do-tempo-01`) and the mermaid ordering
(`linha-do-tempo-02`) land in the same edit. Effort S–M; decide first.

### 3.4 Group "Dados e números" with the sources

`dados.md` explains the citation rules, the data files and the freshness stamp — it is a
methodology page, not a panorama. Moving it next to `referencias` under a "Fontes" group (or
renaming the group to "Fontes e dados") makes the sidebar say what it is. Optional; pure IA.
Effort S.

### 3.5 Mark the photovoltaic branch as a branch

The sidebar's numbered chain is 1–6 (mining → fab → packaging), then three unnumbered sections.
"Fotovoltaica" is a branch off the wafer step (the home mermaid draws it as a fork). Renaming the
group "Ramal fotovoltaico" (or "Fotovoltaica — o outro destino do wafer") makes the numbering
honest. Effort S.

## 4. Suggested order

1. Fix the blockers in `audit/findings.md` (wrong numbers first: they are cheap to fix and
   expensive to leave).
2. Add `audit-links` (§2.1) before fixing the anchor findings, so the fixes are verified and cannot
   regress.
3. Localise chart labels (§2.3) in the same pass as the yield-model fix, since both touch
   `specs.ts`/`DataChart.vue`.
4. Spine template (§3.1) and the chapters it touches; figure policy (§2.2) alongside.
5. Language switcher (§1.1), "Método e fontes" (§1.2), then the remainder.
