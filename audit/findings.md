# Findings — full-site audit

Audit of every chapter pair (PT + EN) produced by six agents running `audit/prompt.md`. Raw reports
live in `audit/reports/`; this file is the merged, fixable list. Site-level proposals (navigation,
new checks, content architecture) are in `audit/structure.md`.

**211 findings — 15 blocker · 67 major · 93 minor · 36 idea.** Every finding carries `file:line`, an
exact quote, a proposed fix or the exact verification that settles it, and a confidence. The reports
below are verbatim, with headings demoted one level.

> **Status — fixed in the working tree (2026-09-28), both locales.** `o-elemento-silicio-01`
> (²⁹Si ~4,7 %), `na-fab-01` (copper resistance), `empacotamento-01` (HBM4 configurations),
> `fotolitografia-01` (the sentence now sources ASML's origin and drops the false TSMC/Philips
> claim), and `introducao-01`: the USGS table and chart were rebuilt with 2022–2025 columns from the
> 2024–2026 editions (latest estimate per year, each column's edition named in the note), because
> the 2020–2025 series they carried matches no MCS edition (checked against the 2020–2026 PDFs);
> `gargalos`' MG-Si row updated to match. New citations appended: `usgs-mcs-2026` (252),
> `asml-history` (253), `usgs-mcs-2024` (254), `usgs-mcs-2025` (255); `USGS_MCS_YEARS` now ends at
> 2026. `bun run build` and the three audits pass. Everything else in this file is still open.

| Report | Pages | Blocker | Major | Minor | Idea |
| --- | --- | --- | --- | --- | --- |
| g1-foundations | index, introducao, o-elemento-silicio, mineracao-mg-si | 4 | 13 | 5 | 6 |
| g2-refining-wafer | polissilicio, estrutura-wafers | 1 | 7 | 8 | 5 |
| g3-fab-litho | fabricacao-wafers, fotolitografia, historia-fotolitografia | 2 | 11 | 20 | 6 |
| g4-devices-fabops | transistores, na-fab, insumos-fab | 2 | 13 | 21 | 8 |
| g5-packaging-reliability | empacotamento, confiabilidade | 1 | 8 | 19 | 5 |
| g6-panorama | celulas-solares, alem-do-silicio, precos-e-valor, gargalos, dados, linha-do-tempo | 5 | 15 | 20 | 6 |

## How to work through this

- Blockers first (queue below), one chapter pair per commit. Then majors chapter by chapter; leave
  minors for a final copy-edit pass.
- Fix PT and EN in the same edit. A number only ships with its `<Cite>` and a `citations.ts` entry;
  append entries, never renumber (`AGENTS.md` § Sources).
- Where a number cannot be confirmed, do the lookup named in the finding. Do not substitute a guess.
- After each chapter: `bun run build`, `python scripts/audit-glossary.py`,
  `python scripts/audit-svgs.py`, `python scripts/audit-math.py` — all four pass.
- `severity: idea` findings are proposals, not defects. Verify the source and the licence before
  using any suggested image.
- Some defects appear in two reports (different chapter pairs). Fix them once, across all copies —
  see "Cross-cutting defects".
- `verification: needs external verification` means the fixing agent must open the named document
  before changing the text.

## Blockers (work queue)

1. `index-01` — home trail promises "as quinze gerações"; `transistor-eras.ts` holds 14. Same fix in
   `linha-do-tempo` (both locales) and the comment at `transistor-eras.ts:2`.
2. `introducao-01` — the 2024/2025 USGS columns cannot come from the `mcs2023` URL the citation
   carries; the prose, the reference row and `USGS_MCS_YEARS` disagree. Reconcile editions.
3. `o-elemento-silicio-01` — ²⁹Si printed as "0,47 %" against the page's own table (4,65–4,70 %).
   Off by 10×; propagates to `alem-do-silicio`.
4. `mineracao-mg-si-01` — world MG-Si "passa de 1 milhão t/ano" against 3,3 Mt the same site prints
   in `introducao` and `gargalos`; state year and scope, or use one series.
5. `polissilicio-01` — demand jump pairs the 1995 PV slice (1.500 t) with the 2018 total (420.000 t)
   while the sentence names 2014; the page's own caption has the right series.
6. `fabricacao-wafers-03` — as-cut "700–800 µm" vs "sai com 775 µm e perde material"; 775 µm is the
   finished 300 mm spec (SEMI M1). Fix the bookkeeping.
7. `fotolitografia-01` — "Quando a TSMC ainda fazia parte da Philips" is false (TSMC was a joint
   venture, never a Philips division) and the paragraph is uncited; likely ASML's story.
8. `na-fab-01` — copper "conduz duas vezes melhor" contradicts "40 a 45 % menos resistência" in the
   same sentence and the cited IBM page (~40 %).
9. `insumos-fab-01` — EN link targets the PT anchor of CMP; the fragment never resolves.
10. `empacotamento-01` — HBM4 "4 a 64 GB" is not in the cited JEDEC release (24/32 Gb dies in 4–16-high
    stacks give ~12–64 GB).
11. `precos-e-valor-01` — EN link carries the PT anchor `#quem-fabrica-os-wafers`.
12. `gargalos-01` — three EN links carry PT anchors (`spruce-pine-…`, `#a-ascensao-chinesa`,
    `#quem-fabrica-os-wafers`).
13. `dados-01` — the yield chart plots `e^(−10·D₀·A)`, not the `e^(−D₀·A)` on its own axis; every
    series is ten times harsher than its label (same offset in `chiplet-yield.svg`, see
    `empacotamento-02`).
14. `dados-02` — EN link to chiplets uses the PT anchor.
15. `linha-do-tempo-01` — "As quinze gerações" against the 14 entries the component renders.

## Cross-cutting defects

Fix the class, not the instance; grep for the rest after each fix.

- **Generation count (14 vs 15)**: `index-01`, `linha-do-tempo-01`, `transistores-08`, comment at
  `transistor-eras.ts:2`. One decision, four edits.
- **EN anchors pointing at PT slugs**: `insumos-fab-01`, `gargalos-01`, `precos-e-valor-01`,
  `dados-02`, plus the dropped BEOL anchor in `empacotamento-09`. Sweep every `](/en/… #…)` link in
  `docs/en/` against the EN headings; the recommended replacements are in the reports.
- **Chart labels not localised**: `confiabilidade-06` + `gargalos-03` — `ChartSpec.labels` is passed
  through untouched by `DataChart.vue`, so `bathtub`, `chokepoint-share` and `pv-efficiency` show
  Portuguese axis labels on `/en/…`, and the CSVs keep Portuguese headers. One fix in
  `DataChart.vue` / `types.ts`, then regenerate the CSVs with `scripts/export-chart-data.ts`.
- **Yield model ten-times offset**: `dados-01` (chart, CSV, spec) and `empacotamento-02`
  (`chiplet-yield.svg`). Decide which model the site uses once, fix `na-fab`'s D₀ values and the
  drawing together.
- **HPQ "70 a 90 %" with no published source**: `mineracao-mg-si-03`, `gargalos-02`, and the
  `chokepoint-share` row that rides on the same `sibelco-hpq` marker. Replace the marker or hedge
  the claim, in all three places.
- **USGS editions**: `introducao-01` + `referencias.md:22` + `USGS_MCS_YEARS` in `citations.ts` all
  name different year sets for the same series.
- **Uncited claims**: `introducao-03`, `o-elemento-silicio-03`, `mineracao-mg-si-02/08`,
  `fotolitografia-01/02` — a claim with no `<Cite>` is a blocker per the repo's own rule, even when
  the number is plausible.

---

# Raw reports (verbatim)
## Report — docs/index.md, docs/introducao.md, docs/o-elemento-silicio.md, docs/mineracao-mg-si.md (+ en/ mirrors)

### index
### index-01 — "quinze gerações" but the site's own list has fourteen
- where: docs/index.md:L81 (and docs/en/index.md:L81)
- category: fact
- severity: blocker
- quote: "9. [Evolução dos transistores](/transistores) — as quinze gerações, do planar ao CFET." / "9. [Transistor evolution](/en/transistores) — the fifteen generations, from planar to CFET."
- problem: The single source for the enumeration, `docs/.vitepress/theme/transistor-eras.ts`, contains 14 era objects (1960, 1963, 1968, 1985, 1995, 1998, 2003, 2007, 2011, 2012, 2022, 2025/2026, ~2029, Futuro), and the chapter's own spine list has 14 numbered items; only the file's header comment claims fifteen. The home page therefore repeats a count the site cannot show.
- fix: Change the reading-path line to "as catorze gerações"/"the fourteen generations" in `docs/index.md:81`, `docs/en/index.md:81`, `docs/linha-do-tempo.md:27`, `docs/en/linha-do-tempo.md:27` and the comment at `docs/.vitepress/theme/transistor-eras.ts:2`; alternatively find and restore the missing generation if one was dropped, before shipping the count fix.
- verification: verified (counted `^\s{4}year:` matches in `transistor-eras.ts` = 14 and `^## ` sections in `docs/transistores.md` = 14 eras + addendum).
- confidence: high

### index-02 — Panorama card sells four destinations and opens one
- where: docs/index.md:L44-L47 (and docs/en/index.md:L44-L47; the Wafer card at docs/index.md:L28-L31 has the same shape)
- category: link
- severity: minor
- quote: "title: Panorama / details: Preços e valor, os vizinhos SiC e GaN, o mapa dos gargalos e as séries de dados. / link: /gargalos"
- problem: The card names `/precos-e-valor`, `/alem-do-silicio`, `/gargalos` and `/dados` but links only to `/gargalos`; the Wafer card advertises "estrutura cristalina do silício", which is the subject of `/estrutura-wafers`, while linking `/fabricacao-wafers`. A reader clicking the card lands on one of the pages it describes and may not find the others.
- fix: Point the Panorama card at `/gargalos` but cut the details to the chokepoint map, or keep the four subjects and add a short second line of links (the sidebar already carries the four); move "estrutura cristalina" out of the Wafer card or retarget it.
- verification: verified (all four targets exist in `docs/` and the sidebar in `docs/.vitepress/config.ts`).
- confidence: high

### index-03 — idea: show the purity fork on the home diagram
- where: docs/index.md:L52-L61 (and docs/en/index.md:L52-L61)
- category: idea
- severity: idea
- quote: "A[Quartzo HPQ] --> B[MG-Si] / B --> C[Polissilício] / E --> H[Células solares]"
- problem: The diagram splits at the wafer and shows the photovoltaic branch, but not the reason the introduction exists: the same polysilicon must reach two different purities (SoG-Si vs EG-Si). The fork is the chapter's central claim and is invisible on the page that states it.
- fix: Add a labelled fork after `C[Polissilício]` (e.g. `C --> C1[SoG-Si 6N–9N]` feeding `E`/`H`, `C --> C2[EG-Si 10N–11N]` feeding the wafer and fab chain), reading the grades from the existing glossary entry rather than writing a new list; keep the Mermaid labels in English in both locales.
- verification: verified (grades already exist in `docs/.vitepress/glossary.ts`, entries SoG-Si and EG-Si, so no new enumeration is introduced).
- confidence: high

### introducao
### introducao-01 — USGS citation is the 2023 edition, the table carries 2024 and 2025 estimates
- where: docs/introducao.md:L13 and L19-L29 (and docs/en/introducao.md:L13 and L19-L31; entry at docs/.vitepress/theme/citations.ts:L14-L21)
- category: source
- severity: blocker
- quote: "de acordo com o relatório *Mineral Commodity Summaries* de 2023 do Serviço Geológico dos Estados Unidos (USGS) <Cite id="usgs-mcs" />" and "As colunas de 2024 e 2025 são estimativas do USGS, não produção reportada." with the header "| País/Região | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 |"
- problem: `usgs-mcs` (num 1) points at `https://pubs.usgs.gov/periodicals/mcs2023/mcs2023-silicon.pdf`; the fetched PDF is the MCS 2023 chapter (PDF metadata dated 2022-12-06, i.e. data through 2022), so neither the 2024 nor the 2025 column can come from it. The page already knows this: `USGS_MCS_YEARS = [2020 … 2025]` at `citations.ts:L1972` builds per-year links for the SourceNote, but the prose and the reference row still name only 2023, and a 2025 estimate belongs to the MCS 2026 edition, which the list does not include. The three representations of the same series (prose year, RefList/tooltip URL, SourceNote year links) disagree.
- fix: Decide which edition backs which column, extend `USGS_MCS_YEARS` if the 2025 estimate is kept, and either append citation entries for the later editions (never renumber — the rule in AGENTS.md) or drop the unsupported columns; update the sentence "relatório *Mineral Commodity Summaries* de 2023" and the 2023-only line in `docs/referencias.md:L22` in the same edit. Numbers in the 2020–2023 columns must be compared with the matching edition's table as part of the fix.
- verification: verified for the URL/edition mismatch (fetched mcs2023-silicon.pdf; PDF info shows 2022-12-06; `USGS_MCS_YEARS` read in `citations.ts`); needs external verification for the per-year figures (open mcs2023/2024/2025(/2026)-silicon.pdf and compare the country rows).
- confidence: high

### introducao-02 — "ordens de grandeza" overstates a ratio of 11×–46×
- where: docs/introducao.md:L13 (and docs/en/introducao.md:L13)
- category: fact
- severity: major
- quote: "a China se tornou líder mundial na produção de silício puro por ordens de grandeza a mais que outros países produtores" / "China has become the world's leading producer of pure silicon, several orders of magnitude ahead of other producing countries"
- problem: Against the table on the same page, China's 2 300 kt is ~11× Brazil (210 kt) and ~46× Russia (50 kt) — one order of magnitude, not "ordens" (which reads as 100×+). "Silício puro" also names the wrong commodity: the table's quantity and the topic sentence are silício metálico/MG-Si (~98,5–99,5 % Si), which the same page takes care to distinguish from electronic-grade polysilicon. The PT phrasing "ordens de grandeza a mais" is ungrammatical.
- fix: "a China se tornou líder mundial na produção de silício metálico, cerca de 10 a 50 vezes acima dos demais países produtores" / "…the world's leading producer of metallurgical silicon, roughly 10 to 50 times the next producers".
- verification: verified (arithmetic against `docs/introducao.md:L19-L27`; commodity naming against the page's own note at L17 and the USGS table title).
- confidence: high

### introducao-03 — the opening claim is uncited
- where: docs/introducao.md:L13 (and docs/en/introducao.md:L13)
- category: source
- severity: major
- quote: "A fabricação de wafers de silício em quantidade e qualidade é o principal fator determinante para o preço de painéis solares, e essencial para a produção de chips de computadores." / "Producing silicon wafers in sufficient quantity and quality is the main factor determining the price of solar panels, and it is essential for manufacturing computer chips."
- problem: The sentence has no `<Cite>`, and it is the strongest claim on the page ("the main factor determining the price"). Wafers are one cost block among glass, encapsulant, framing and processing, so the superlative needs a source or a qualifier.
- fix: Cite the measure (a PV cost breakdown giving the wafer/polysilicon share of module cost) or soften to "um dos principais" / "one of the main factors"; do not attach this claim to `usgs-mcs`, which does not publish cost shares.
- verification: needs external verification (source for wafer/polysilicon share of module cost — e.g. a PV market report; the site's own `docs/celulas-solares.md` carries no such number).
- confidence: high (that the claim is uncited); medium (on the exact share to cite)

### introducao-04 — "incineração do quartzo" names a process that does not exist
- where: docs/introducao.md:L41 (and docs/en/introducao.md:L41)
- category: fact
- severity: major
- quote: "A maneira mais eficiente vem da mineração e incineração do quartzo, que é dióxido de silício (SiO₂)." / "The most efficient route begins with mining and burning quartz, which is silicon dioxide (SiO₂)."
- problem: Quartz is not incinerated (that would yield silica fume, not silicon); it is reduced with carbon in a submerged-arc furnace, as the site's own chapter states. The sentence is the introduction's one-line explanation of the industrial route, and it is wrong.
- fix: "A rota industrial é a mineração e a redução carbotérmica do quartzo (SiO₂) em forno de arco" / "The industrial route is mining quartz (SiO₂) and reducing it with carbon in an arc furnace", with the pointer to `/mineracao-mg-si` kept in the SeeAlso.
- verification: verified (against `docs/mineracao-mg-si.md:L51-L53`, "redução carbotérmica … fornos elétricos de arco submerso").
- confidence: high

### introducao-05 — abundance figure uncited and the example list mixes categories
- where: docs/introducao.md:L41 (and docs/en/introducao.md:L41)
- category: source
- severity: major
- quote: "O silício é o segundo material mais abundante na crosta terrestre (27%) e pode ser minerado de diversas fontes, sendo encontrado como óxido (sílica) e silicatos: areia, quartzo, ametista, ágata e sílex."
- problem: The 27 % figure has no `<Cite>` and is the only place on the site that prints the number; the sites elsewhere say "segundo elemento mais abundante" (element, not "material"), and the five examples are all silica (SiO₂) varieties, none of them a silicate such as feldspar or mica. As written, the colon promises a mixed list and delivers only oxides.
- fix: Cite the abundance (CIAAW/USGS; the same figure appears in standard crustal-composition tables) or drop the parenthetical; write "elemento"; either move "areia, quartzo, ametista, ágata e sílex" to the silica clause and give a real silicate example, or cut the list.
- verification: needs external verification (crustal abundance ~27–28 % Si — pick a primary table and cite it); site-internal wording verified against `docs/o-elemento-silicio.md:L71`.
- confidence: high

### introducao-06 — the page's only photograph has no provenance
- where: docs/introducao.md:L9-L11 (and docs/en/introducao.md:L9-L11; the same file is the home hero, docs/index.md:L9-L11)
- category: figure
- severity: major
- quote: "<DiagramFigure src=\"/pdf-images/p01-1.jpeg\" alt=\"Silício metálico cristalino\"> Amostra de silício metalúrgico, o produto industrial que depois vira wafers para células solares e chips. </DiagramFigure>"
- problem: The figcaption carries a description but no author, original file or licence, and `scripts/extract-pdf-images.py` shows the JPEG was peeled out of `Resumo Chipmaking.pdf`, so the original rights holder is unknown. AGENTS.md requires third-party media to credit author, original file and licence with a link in the figcaption; a photograph is not an own schematic.
- fix: Identify the original (the image looks like a stock/Commons photograph of a silicon lump — check the PDF page 1 metadata or run the image through a reverse lookup), then either add "Autor — arquivo original — licença (link)" to the figcaption in both locales and the hero credit, or replace it with a known PD/CC BY file (Commons `Silicon.jpg` and friends — verify the file description before use, per AGENTS.md).
- verification: needs external verification (original file and licence of `p01-1.jpeg`; the extracted-file list in `scripts/extract-pdf-images.py` is the only local provenance).
- confidence: medium

### introducao-07 — idea: a map of the six producers
- where: docs/introducao.md:L19-L27 (and docs/en/introducao.md:L19-L27)
- category: idea
- severity: idea
- quote: "| **Mundo (Total)** | **2.600** | **3.300** | **3.000** | **3.300** | **3.300** | **3.300** |"
- problem: The page's only visual for the market is the interactive line chart (and the sample photograph); the geographic story ("China, then everyone else") lives in a six-row table. The chapter is the site's entry point and the chart is hidden behind chart.js.
- fix: Add a small own schematic — a world map shading the six countries by 2024 tonnes, frozen as SVG in `docs/public/assets/` — drawing its values from the same table, so it cites `usgs-mcs` rather than a new source, and following the drawing grammar (opaque background, `<title>`/`<desc>`, English labels).
- verification: verified (the table is the data source; no new source needed, per the "a number derived from an already-cited table cites that table" rule).
- confidence: high

### o-elemento-silicio
### o-elemento-silicio-01 — ²⁹Si abundance printed as 0,47 % against the page's own 4,65–4,70 %
- where: docs/o-elemento-silicio.md:L67 (and docs/en/o-elemento-silicio.md:L67; table at L59-L63)
- category: fact
- severity: blocker
- quote: "Os **0,47% de ²⁹Si** não são um detalhe químico: o núcleo do ²⁹Si tem spin, e um spin no silício é um ruído magnético para quem tenta usar o próprio silício como qubit." / "That **0.47% of ²⁹Si** is not a chemical detail…"
- problem: The table directly above gives ²⁹Si as 4,65 % to 4,70 %, and the cited authority (`elem-ciaaw`, num 210) gives the amount-fraction range [0.046 45, 0.046 99], i.e. ≈4,7 %. The prose is off by a factor of ten, and the sentence is the reason the page exists for the qubit discussion, so the error propagates to `/alem-do-silicio`.
- fix: "Os ~4,7 % de ²⁹Si…" / "That ~4.7 % of ²⁹Si…"; keep the `<Cite id="wbg-si28-qubit" />` where it is.
- verification: verified (fetched https://ciaaw.org/silicon.htm: 29Si [0.046 45, 0.046 99]; cross-checked with the page's own L59-L63).
- confidence: high

### o-elemento-silicio-02 — no spine: the page opens with a thesis, not an order
- where: docs/o-elemento-silicio.md:L9-L11 (and docs/en/o-elemento-silicio.md:L9-L11)
- category: structure
- severity: major
- quote: "Todos os capítulos deste site tratam do silício como matéria-prima: minério, forno, lingote, wafer, transistor. Esta página faz o caminho inverso e olha para o **átomo** — as constantes que a indústria não escolhe, apenas obedece."
- problem: AGENTS.md asks a chapter to open with the ordered list of what it explains — a sentence introducing it, the list, a sentence saying the rest follows that order. This page has a strong opening sentence but no declared order, while it in fact has a clear one (the data card → the three consequences → the gap → the isotopes → why this element). The reader has no map, and the "Três desses números têm consequência industrial" paragraph at L33 arrives without having been announced.
- fix: Insert the list after L11, e.g. "A página segue esta ordem: a ficha do elemento; as três consequências industriais dos números; o gap indireto e o que ele explica; os isótopos; e por que a indústria ficou com este material." followed by "O resto segue essa ordem." (EN mirror).
- verification: verified (read the file and the rule in AGENTS.md §Chapters).
- confidence: high

### o-elemento-silicio-03 — the photonics claim has no citation
- where: docs/o-elemento-silicio.md:L47 (and docs/en/o-elemento-silicio.md:L47)
- category: source
- severity: major
- quote: "A segunda é que o silício **não emite luz com eficiência**, o que obriga a fotônica de silício a buscar o laser em outro material, como se discute em [Além do silício](/alem-do-silicio)."
- problem: The sentence carries no `<Cite>` and is a factual claim about silicon photonics, not a summary of the paragraph's cited source (the `<Cite id="saimm" />` closes the previous sentence about solar absorption). Every factual claim needs a marker.
- fix: Add a source for the indirect-gap/no-efficient-emission consequence — `elem-sze` (already in the page's SourceNote) or a silicon-photonics reference appended to `citations.ts` — and put the marker on this sentence, not on its neighbour.
- verification: verified (sentence read with no `<Cite>`); the right source needs the lookup (a photonics review, or reuse `elem-sze` if the fixing agent confirms it states the claim).
- confidence: high

### o-elemento-silicio-04 — the GaAs/Si absorption ratio is cited to a pyrometallurgy paper
- where: docs/o-elemento-silicio.md:L47 (and docs/en/o-elemento-silicio.md:L47)
- category: source
- severity: major
- quote: "A primeira é que **1 µm de arseneto de gálio absorve o que 100 µm de silício absorvem** — o que explica a espessura da lâmina solar e a escolha de materiais de filme fino no capítulo de [células e módulos](/celulas-solares) <Cite id="saimm" />."
- problem: `saimm` is Xakalashe & Tangstad (2011), a paper about reducing quartz in a furnace; the site's own `band-gap` chart uses `elem-ioffe` and `elem-sze` for the same 100× fact (see the spec comment at `docs/.vitepress/theme/charts/specs.ts:L15-L18`). As cited, a reader cannot find the number, and AGENTS.md asks for the source that measured it.
- fix: Re-cite to `elem-ioffe` + `elem-sze` (or `moller-2012`, the Si-for-solar-cells review already in `citations.ts`) unless the SAIMM paper is confirmed to carry the GaAs figure.
- verification: needs external verification (check `https://pyrometallurgy.co.za/Pyro2011/Papers/083-Xakalashe.pdf` for the absorption comparison; the fetch returned the raw PDF stream, no extractable text).
- confidence: medium

### o-elemento-silicio-05 — the scatter chart is called "mapa"
- where: docs/o-elemento-silicio.md:L53 (and docs/en/o-elemento-silicio.md:L53)
- category: pacing
- severity: minor
- quote: "O mapa acima mostra onde o silício cai entre os semicondutores: gap estreito e rede grande, vizinho do germânio." / "The map above shows where silicon falls among semiconductors…"
- problem: The figure is a scatter plot on band gap × lattice constant (its own caption calls it "plano"); the site also has a page titled "O mapa dos gargalos", so "o mapa" reads as a section reference rather than a chart.
- fix: "O gráfico acima mostra…" / "The chart above shows…".
- verification: verified (chart type in `docs/.vitepress/theme/charts/specs.ts`, `type: 'scatter'`).
- confidence: high

### o-elemento-silicio-06 — idea: a figure for the density anomaly
- where: docs/o-elemento-silicio.md:L35 (and docs/en/o-elemento-silicio.md:L35)
- category: idea
- severity: idea
- quote: "O silício sólido é **menos denso que o próprio fundido** — 2,33 contra cerca de 2,57 g/cm³. Quase todo material encolhe ao solidificar; o silício **expande**."
- problem: The first and most consequential of the three numbers is argued in prose only; a reader cannot see the anomaly that explains why the Czochralski crystal floats. This is also the spine item ("three consequences") with no figure.
- fix: Draw a small comparison — two blocks, a shrinking material versus silicon expanding, with the two densities as `.dim` dimension lines and no arrowheads — in `docs/public/assets/`, colours per the drawing grammar (silicon `#cfd8e3` on `#7d8b9c`), and cite `elem-ioffe` in the caption. No licence check needed for an own schematic.
- verification: verified (own schematic; values already cited on the page).
- confidence: high

### o-elemento-silicio-07 — idea: silicon's role in the kilogram/Avogadro story
- where: docs/o-elemento-silicio.md:L57-L65 (and docs/en/o-elemento-silicio.md:L57-L65)
- category: idea
- severity: idea
- quote: "A variação é pequena, mas não nula, e é medida com precisão suficiente para virar ferramenta: a razão entre isótopos de silício num sedimento conta a história do clima em que ele se formou."
- problem: The isotope section gives the climate-proxy use and the qubit use, but leaves out the most industrial use of a perfect silicon crystal: the X-ray crystal density route to the Avogadro constant and the 2019 kilogram redefinition, where a ²⁸Si-enriched sphere was measured atom by atom. It is a "why this element" fact of the kind the page collects, and it is already half-mentioned in the cited CIAAW text.
- fix: Add one sentence after L65, sourced to the CIAAW silicon page (already `elem-ciaaw`) or the BIPM/PTB Avogadro project page, with the marker moved into `citations.ts` if a new key is appended.
- verification: verified for the CIAAW statement (the fetched page says determinations of Ar(Si) "have been directly related to attempts to establish … the relationship between atomic unit of mass and the kilogram … through determinations of Avogadro constant"); the Avogadro sphere itself needs the BIPM/PTB source lookup before writing.
- confidence: medium

### mineracao-mg-si
### mineracao-mg-si-01 — world MG-Si output: 1 Mt here, 3,3 Mt in the same site's data
- where: docs/mineracao-mg-si.md:L105 (and docs/en/mineracao-mg-si.md:L105)
- category: fact
- severity: blocker
- quote: "A produção mundial de MG-Si passa de **1 milhão de toneladas métricas por ano**, a um custo de poucos dólares por quilograma… <Cite id="saimm" />" / "World MG-Si production exceeds **1 million metric tonnes per year**…"
- problem: The same quantity appears as "Mundo (Total) **3.300**" thousand tonnes for 2023 in `docs/introducao.md:L27` (and as "2.300 de 3.300 mil t em 2023" in `docs/gargalos.md:L24`). One of the two is wrong, or they measure different scopes/years; as printed, a reader comparing chapters sees world production differ by more than 3×. Both sentences are present-tense, so the 2011 SAIMM figure (if that is what it is) cannot stay uncoupled from its year.
- fix: State the year and scope of the SAIMM number (e.g. "em 2010, cerca de 1,6 Mt") or replace it with the USGS series and cite `usgs-mcs`; whichever way, the text must agree with the introduction's table. Confirm both figures refer to silicon metal only (the same page's ferrosilicon paragraph shows how the product boundaries are drawn).
- verification: verified that the two pages conflict (cross-read `docs/introducao.md:L19-L27`, `docs/gargalos.md:L24`); needs external verification of the SAIMM figure's year and value (read the production table in `https://pyrometallurgy.co.za/Pyro2011/Papers/083-Xakalashe.pdf` — fetch returned raw PDF, no text).
- confidence: high

### mineracao-mg-si-02 — `asianometry-wafer` is listed as a source but never cited
- where: docs/mineracao-mg-si.md:L109 (and docs/en/mineracao-mg-si.md:L109)
- category: source
- severity: major
- quote: "<SourceNote :ids=\"['pv-education', 'pv-mfg-polysilicon', 'sciencedirect-hpq', 'sibelco-hpq', 'quartzcorp-hpq', 'elkem', 'csiro', 'saimm', 'asianometry-wafer']\" />"
- problem: `grep` finds `asianometry-wafer` only in this line; no sentence on either locale carries `<Cite id="asianometry-wafer" />`. A source list is a claim about where the text comes from; an unused entry makes the list inaccurate, and the AGENTS.md rule is one marker, one claim.
- fix: Either delete the key from both SourceNotes, or add the sentence it actually backs (the video is about wafer manufacturing, so it would have to justify a claim about the wafer path, not the furnace).
- verification: verified (grep for `asianometry` across both locales: single hit, the SourceNote).
- confidence: high

### mineracao-mg-si-03 — the Sibelco-sourced numbers are not on the cited page
- where: docs/mineracao-mg-si.md:L17, L45, L47 (and docs/en/mineracao-mg-si.md:L17, L45, L47)
- category: source
- severity: major
- quote: "cerca de **70% a 90% do quartzo de alta pureza do mundo** sai de uma única região … <Cite id="sibelco-hpq" />" and "O grau mais exigente da linha IOTA® chega a **99,9992% de SiO₂**, com K + Li + Na somando **80 ppb** e metais de transição críticos abaixo de 50 ppb <Cite id="sibelco-hpq" />" and "boro abaixo de 0,04 ppm"
- problem: `sibelco-hpq` (num 48) resolves to `https://www.sibelco.com/en/materials/high-purity-quartz`; the fetched page confirms IOTA is mined at Spruce Pine for CZ crucibles but prints none of these figures — not the 70–90 % share, not the 0,04 ppm boron limit, not the 99,9992 %/80 ppb/<50 ppb spec. The 70–90 % number is also used on `/gargalos`, so the same unsupported figure appears twice in the site. Company landing pages are fine for company facts; they cannot carry a market share.
- fix: Point the share at the analysis that measures it (press/deposit studies — verify before citing) or reword to what Sibelco does state ("the world's highest-quality quartz", mined at Spruce Pine); point the material spec at the IOTA grade datasheet or technical data sheet, and add it as its own citation entry rather than hanging it on the landing page.
- verification: verified that the cited page does not carry the numbers (fetched 2026-09-28; page has no ppm/ppb text); the replacement source needs the lookup (Sibelco IOTA datasheet, or the study behind the 70–90 % claim).
- confidence: high

### mineracao-mg-si-04 — no spine: the chapter starts mid-topic
- where: docs/mineracao-mg-si.md:L9 (and docs/en/mineracao-mg-si.md:L9)
- category: structure
- severity: major
- quote: "## Mineração de quartzo (HPQ)" / "## Quartz mining (HPQ)"
- problem: The chapter opens directly on the first H2; there is no sentence framing what it explains, no ordered list of the two halves (quartz → HPQ; carbothermal reduction → MG-Si) and no closing sentence saying the rest follows that order. Its six sections (Spruce Pine, Drag, boron, the furnace, silica fume, scale) currently hang off that first heading with no announced order.
- fix: Add the three-part opening before L9: "Este capítulo segue a matéria-prima em duas etapas: primeiro o quartzo de alta pureza — de onde ele sai e por que o boro decide —, depois a redução carbotérmica que o transforma em silício metalúrgico e o que o forno devolve como subproduto." with the list pointing at the sections and a closing line.
- verification: verified (read the file; the rule is in AGENTS.md §Chapters).
- confidence: high

### mineracao-mg-si-05 — one figure for a two-part chapter; the mining half has none
- where: docs/mineracao-mg-si.md:L83-L85 against the sections at L15, L28, L95, L103 (and docs/en/mineracao-mg-si.md:L83-L85)
- category: figure
- severity: major
- quote: "Corte de um forno de arco submerso: as duas zonas de reação, os três eletrodos trifásicos, a saída de gás e o vazamento pelo fundo."
- problem: The page carries exactly one figure, the furnace cross-section, which illustrates one section of the second half. The quartz half — the Spruce Pine/Drag concentration, the purification sequence and the crucible that the whole chokepoint argument rests on — has no figure at all, and neither do the silica-fume/off-gas or the scale sections; AGENTS.md says every item of the spine needs one.
- fix: Add at least one figure to the mining half: a two-hub route diagram (Spruce Pine → Drag, with the four purification steps and the final purity), own schematic in `docs/public/assets/` per the drawing grammar; the purification steps are already an ordered list in the prose to draw from.
- verification: verified (figure inventory: one `DiagramFigure` on the page).
- confidence: high

### mineracao-mg-si-06 — the 1996 founding date is not on the cited page and conflicts with the company's own history
- where: docs/mineracao-mg-si.md:L30 (and docs/en/mineracao-mg-si.md:L30)
- category: fact
- severity: major
- quote: "Em **Drag**, no município de Hamarøy (Nordland), a **Norwegian Crystallites AS** foi fundada em 1996 pela Norsk Mineral para produzir quartzo de altíssima pureza <Cite id="quartzcorp-hpq" />"
- problem: The cited page (`https://www.thequartzcorp.com/high-purity-quartz`) gives no founding date, and the company's own history page lists "1914 Norway operations founded / 1957 U.S. operations founded / 2011 The Quartz Corp established" — no 1996 and no Norwegian Crystallites. The 1996 date may be right from another source, but the marker currently points where it cannot be checked, and the next sentence ("Em 2011, ela e os ativos de quartzo da francesa Imerys se uniram…") mixes the two company histories.
- fix: Find the source that states the 1996 founding (TQC press material, Norwegian business registry) and cite it, or reword to "as operações norueguesas, cujo escritório em Drag data de…" following the cited history page; keep the 2011 JV sentence as it is.
- verification: needs external verification (the 1996 founding of Norwegian Crystallites AS — Brønnøysund Register Centre / TQC company history).
- confidence: medium

### mineracao-mg-si-07 — "alguns dígitos abaixo" misstates a 0,0002 pp gap
- where: docs/mineracao-mg-si.md:L47 (and docs/en/mineracao-mg-si.md:L47)
- category: fact
- severity: minor
- quote: "É um material de nicho: o que sustenta o volume da indústria fica alguns dígitos abaixo, e a The Quartz Corp trabalha com **99,999%** de sílica." / "…what sustains the industry's volume sits a few digits below…"
- problem: The two grades compared are 99,9992 % and 99,999 % — a difference in impurity content of 0,0002 percentage points, not "a few digits". In the trade's own shorthand the correct unit is "nines" (5N-plus vs 5N), not digits.
- fix: "um grau logo abaixo" / "a grade just below it", or express it in nines: "o grau que sustenta o volume fica abaixo de 5N".
- verification: verified (arithmetic on the two values given in the same sentence).
- confidence: high

### mineracao-mg-si-08 — "ilimitados" is an absolute the source cannot carry
- where: docs/mineracao-mg-si.md:L11 (and docs/en/mineracao-mg-si.md:L11)
- category: fact
- severity: minor
- quote: "os recursos são, na prática, **ilimitados** — embora a pureza varie consideravelmente de depósito para depósito <Cite id="saimm" />"
- problem: The cited paper argues quartz is abundant, not infinite, and the sentence itself concedes that usable purity is rare — which is the chapter's whole point. "Ilimitados" reads as a stronger claim than the source and undercuts the next paragraph.
- fix: "os recursos são abundantes" / "the resources are plentiful", letting the second clause carry the restriction.
- verification: verified (the claim is an absolute; the qualifier already in the same sentence contradicts it).
- confidence: high

### mineracao-mg-si-09 — two citations resolve to organisation homepages
- where: docs/mineracao-mg-si.md:L51 (and docs/en/mineracao-mg-si.md:L51; entries at docs/.vitepress/theme/citations.ts:L90-L97 and L106-L113)
- category: source
- severity: minor
- quote: "<Cite id=\"elkem\" />" and "<Cite id=\"csiro\" />" — "Esse processo ocorre em fornos elétricos de arco submerso a temperaturas de aproximadamente 2000 °C, consumindo altos níveis de energia"
- problem: `elkem` (num 13) points at `https://www.elkem.com/` and `csiro` (num 11) at `https://www.csiro.au/`; neither is a document, so the ~2000 °C and energy-intensity claims — the numbers the sentence turns on — cannot be found from the citation.
- fix: Replace the URLs with the specific Elkem/CSIRO pages or reports that state the temperature and energy figures (both companies publish process explainers); the keys stay, only `url` changes.
- verification: needs external verification (locate the Elkem and CSIRO pages carrying the claims).
- confidence: high

### mineracao-mg-si-10 — idea: the 2024 Spruce Pine disruption
- where: docs/mineracao-mg-si.md:L15-L27 (and docs/en/mineracao-mg-si.md:L15-L27), the Spruce Pine section
- category: idea
- severity: idea
- quote: "Tratar \"a Unimin virou Covia\" como a história inteira deixa a impressão de que Spruce Pine trocou de dono. Continuou com a Sibelco."
- problem: The chapter states the 70–90 % concentration but gives no case where it bit. In September 2024 Hurricane Helene shut both Spruce Pine operations for weeks and the industry briefly repriced the risk — the cleanest possible demonstration of the section's thesis, and it postdates the 2011 sources the page leans on.
- fix: Add one sentence to the Spruce Pine section with a primary source: the companies' own statements (Sibelco and The Quartz Corp published operational notices) and the USGS Mineral Industry Surveys/press coverage that followed; verify each URL before citing, and do not print a shutdown length or price effect without one.
- verification: needs external verification (the 2024 Helene shutdown dates and effects — company notices; deliberately written without a URL here).
- confidence: medium

### mineracao-mg-si-11 — idea: an energy/mass balance for the furnace
- where: docs/mineracao-mg-si.md:L95-L101 (and docs/en/mineracao-mg-si.md:L95-L101)
- category: idea
- severity: idea
- quote: "Cada tonelada de silício metálico produz de **0,2 a 0,4 tonelada de fume de sílica condensada**… O consumo elétrico do forno fica entre **11 e 13 MWh por tonelada**"
- problem: The chapter's most surprising numbers — the furnace is a giant electric load whose off-gas carries energy of the same order, plus a quarter-tonne of saleable dust per tonne of metal — are three separate sentences of prose. A balance diagram would show why the energy bill, not the quartz, decides where MG-Si is made.
- fix: Draw a Sankey-style balance for one tonne of Si: inputs (quartz + carbon, 11–13 MWh) and outputs (1 t Si, 0,2–0,4 t silica fume, off-gas energy, CO), as an own SVG in `docs/public/assets/`, values from `saimm` (already cited on the page), caption in both locales.
- verification: verified (all the numbers already exist on the page, cited to `saimm`; the drawing is schematic and should set `schematic: true` only if it were a chart spec — as a `DiagramFigure` the caption must say it is a diagram).
- confidence: high

### Coverage summary
- index: spine n/a (home layout — no `vp-doc`, so the glossary audit skips it); figures 1 (the supply-chain mermaid) plus the hero photograph reused from introducao; dataAsOf absent (home); fix next: the "quinze gerações" count on both locales.
- introducao: spine no (single overture section; consider declaring the two-step agenda or treating the page as navigation); figures 2 (sample photograph + interactive USGS chart); dataAsOf 2025; fix next: the USGS 2023 URL versus the 2024/2025 estimate columns.
- o-elemento-silicio: spine no; figures 1 (band-gap scatter); dataAsOf 2026; fix next: 0,47 % → ~4,7 % for ²⁹Si on both locales.
- mineracao-mg-si: spine no; figures 1 (submerged-arc furnace SVG); dataAsOf 2025; fix next: reconcile "1 milhão de toneladas" with the introduction's 3,3 Mt world total.
## Report — polissilicio + estrutura-wafers

Pages: `docs/polissilicio.md` · `docs/en/polissilicio.md` · `docs/estrutura-wafers.md` · `docs/en/estrutura-wafers.md`.

Method: full read of all four files; every numeral checked against its `citations.ts` entry and against the rest of `docs/`; the `wafer-identification.svg` drawing checked against `scripts/gen-wafer-identification-svg.py`, the SVG text and the caption; `fetch` used only where a specific number was at stake. No content file was modified and no build or audit script was run. Two fetches failed and are recorded below as lookups: the Elkem Solar PDF on pv-tech.org (HTTP 403, Cloudflare) and `en.wikipedia.org/wiki/450_mm` (no article). A Wikipedia wafer fetch returned thicknesses but no tolerances, so the SEMI M1 check below stays open.

### polissilicio

### polissilicio-01 — Demand figure pairs the PV slice of 1995 with the total of 2018
- where: docs/polissilicio.md:L274 (and docs/en/polissilicio.md:L274)
- category: fact
- severity: blocker
- quote: "elevando a demanda de **1.500 toneladas** (1995) para **420.000 toneladas** (2018)" / "raising demand from **1,500 tonnes** (1995) to **420,000 tonnes** (2018)"
- problem: the sentence says the proportions reversed "em **2014**", then gives a jump whose endpoints are both mislabelled. The 1.500 t is the photovoltaic sector's 1995 demand (10 % of a total of 15,100 t); the 420,000 t is the **total** demand of 2018. So the sentence compares a component to a whole, and its own dates (1995 vs 2018) do not match the 2014 it just named. The page's p05-1 caption twelve lines below (L277) carries the correct total series: "crescimento de **18,4×** entre 1995 e 2014 (15,1 kt → 278 kt)".
- fix: rewrite with a single series, e.g. PT "a demanda total passou de 15.100 toneladas (1995) para 278.000 toneladas (2014), chegando a cerca de 420.000 toneladas em 2018"; EN with 15,100 / 278,000 / 420,000. If the PV series is preferred, say explicitly it is the photovoltaic sector and give its 2014 value from the same table instead of the 2018 total.
- verification: verified — the cited Bernreuter demand table gives total demand 15,100 t (1995) and ~278,000 t (2014), with PV at 1,500 t in 1995 and ~420,000 t the total for 2018; the page's own caption agrees.
- confidence: high

### polissilicio-02 — 2023 endpoint of the Kristiansand plant cited only to a 2012 article
- where: docs/polissilicio.md:L195 (and docs/en/polissilicio.md:L195)
- category: source
- severity: major
- quote: "Entre **2009 e 2023**, uma planta em Kristiansand, no sul da Noruega, operou em escala industrial uma das poucas rotas sem cloro que de fato entregou silício de grau solar <Cite id="elkem-solar-route" />." / "Between **2009 and 2023**, a plant in Kristiansand, in southern Norway, ran at industrial scale one of the few chlorine-free routes that actually shipped solar-grade silicon <Cite id="elkem-solar-route" />."
- problem: `elkem-solar-route` is Odden et al., Photovoltaics International ed. 16, **May 2012** — it can support 2009 and the process, not the 2023 end of operation. The closure is separately and correctly sourced further down the page (`rec-closure-2023`, cited at L229), but the sentence's own marker claims a span the cited document cannot cover.
- fix: add the closure citation to this sentence — `<Cite id="elkem-solar-route" /> <Cite id="rec-closure-2023" />` (both entries already exist) — or reword the span to the period the article supports and let the later section carry the shutdown.
- verification: verified — `citations.ts` dates the entry to May 2012; `rec-closure-2023` (pv magazine) documents the November 2023 closure cited at L229.
- confidence: high

### polissilicio-03 — "Five stages, three of them purification" could not be verified
- where: docs/polissilicio.md:L197 (and docs/en/polissilicio.md:L197)
- category: fact
- severity: major
- quote: "Ele encadeia **cinco etapas**, das quais **três são de purificação** <Cite id="elkem-solar-route" /> <Cite id="elkem-lca" />:" / "It chains **five stages**, of which **three are purification** <Cite id="elkem-solar-route" /> <Cite id="elkem-lca" />:"
- problem: neither cited document could be read to confirm the count. The pv-tech PDF (URL in `citations.ts` num 60) returned HTTP 403 on fetch, and the LCA PDF was not checked for the stage list. The numbered list itself (L199–203: carbothermal reduction, slag treatment, leaching, directional solidification, post-treatment) is plausible for the Elkem route, but "three are purification" is a specific count that the audit cannot confirm.
- fix: fetch `https://www.pv-tech.org/wp-content/uploads/legacy-publication-pdfs/014325526f-solargrade-silicon-is-siemens-the-only-answer.pdf` (or an archive copy, e.g. web.archive.org) and check the stage list; if the article does not enumerate five stages with that split, reword to what it states.
- verification: needs external verification — the cited PDF returned 403 on fetch; exact lookup: the pv-tech URL in `citations.ts` num 60.
- confidence: medium

### polissilicio-04 — Processing-trade loophole: closure announced in 2014, exemptions lasted to August 2015
- where: docs/polissilicio.md:L294 (and docs/en/polissilicio.md:L294)
- category: fact
- severity: major
- quote: "contornadas por algum tempo pelo regime de *processing trade* e fechadas em agosto de 2014 <Cite id="bernreuter-market" />" / "circumvented for a time through the *processing trade* loophole and closed in August 2014 <Cite id="bernreuter-market" />"
- problem: the cited Bernreuter market history says the processing-trade exemption from Chinese duties remained in force **until August 2015**, and that what happened in August 2014 was Mofcom's **announcement** that the loophole would be closed. As written, the sentence says the loophole was closed in August 2014, a year early.
- fix: PT "contornadas por algum tempo pelo regime de *processing trade*, isento de direitos até agosto de 2015 — o Mofcom anunciou o fim da brecha em agosto de 2014"; EN "circumvented for a time through the *processing trade* loophole, which stayed duty-exempt until August 2015; Mofcom announced its closure in August 2014". Keep the July 2013 duty date as is.
- verification: verified — `bernreuter-market` states the exemption lasted until August 2015 and dates the announcement to August 2014.
- confidence: high

### polissilicio-05 — Anti-dumping detail reverses the actor
- where: docs/polissilicio.md:L304 (and docs/en/polissilicio.md:L304)
- category: fact
- severity: major
- quote: "aberta em 2016 mas decidida ainda em 2010, antes de existirem os direitos antidumping americanos <Cite id="bernreuter-market" />" / "opened in 2016 but decided back in 2010, before US anti-dumping duties existed <Cite id="bernreuter-market" />"
- problem: the source's point is that in 2010 **no Chinese duties on polysilicon imports from the United States** existed — that is why Wacker could still decide to build for the export market. "Direitos antidumping americanos" / "US anti-dumping duties" inverts who imposed them, and conflicts with the page's own L294, which dates the Mofcom duties to July 2013.
- fix: PT "antes de a China impor direitos antidumping sobre o polissilício americano"; EN "before China imposed anti-dumping duties on US polysilicon".
- verification: verified — `bernreuter-market` says no Chinese duties on US polysilicon existed at the time of the 2010 decision; the chapter's own L294 dates the duties to July 2013.
- confidence: high

### polissilicio-06 — No declared spine; the chapter opens without the ordered list
- where: docs/polissilicio.md:L7–L13 (and docs/en/polissilicio.md:L7–L13)
- category: structure
- severity: minor
- quote: "O Silício de Grau Metalúrgico ([MG-Si](/glossario)) contém impurezas metálicas e dopantes que afetam severamente o desempenho de semicondutores e painéis solares <Cite id="energy-central" />. [...] ## Visão geral da rota" / "Metallurgical-grade silicon ([MG-Si](/en/glossario)) contains metallic and dopant impurities [...] ## Overview of the route"
- problem: `AGENTS.md` asks a chapter to open with "a sentence introducing it, the list, and a sentence saying the rest follows that order", the list pointing at the sections. `polissilicio` opens with two paragraphs and jumps into `## Visão geral da rota`; the route is shown as a Mermaid flowchart (L25–40) that does not link the sections. `transistores.md:9–26` is the model (sentence + linked list + closing sentence); `fabricacao-wafers.md:9` shows the minimal acceptable form ("As oito etapas a seguir cobrem essa sequência").
- fix: after L11, add one sentence plus an ordered list of the chapter's stages pointing at the sections (MG-Si → TCS → destilação/deposição → ciclo do cloro → UMG → pureza → mercado), then a sentence saying the sections follow that order. Do not duplicate the Mermaid steps; the list links, it does not summarise.
- verification: verified — comparison with `transistores.md:9–26` and `fabricacao-wafers.md:9`; no list exists at the start of either locale.
- confidence: high

### polissilicio-07 — PT capitalises the glossary term, EN does not
- where: docs/polissilicio.md:L9 (and docs/en/polissilicio.md:L9)
- category: parity
- severity: minor
- quote: "O Silício de Grau Metalúrgico ([MG-Si](/glossario))" / "Metallurgical-grade silicon ([MG-Si](/en/glossario))"
- problem: the PT sentence capitalises the term mid-sentence while the EN does not, and the same site writes it lowercase elsewhere (`fabricacao-wafers.md:9`: "polissilício de grau eletrônico ([EG-Si](/glossario))"). It reads as a title-case artefact.
- fix: PT "O silício de grau metalúrgico ([MG-Si](/glossario))"; leave the EN as is.
- verification: verified — internal comparison across locales and with `fabricacao-wafers.md:9`.
- confidence: high

### polissilicio-08 — Two stacked fragments for one idea
- where: docs/polissilicio.md:L116 (and docs/en/polissilicio.md:L116)
- category: pacing
- severity: minor
- quote: "A química ficou. Quem opera o reator mudou." / "The chemistry stayed. The operators changed."
- problem: two clipped sentences in a row restating one point; this is the "dramatic fragmentation" pattern `AGENTS.md` asks to cut.
- fix: "A química ficou, mas quem opera o reator mudou." / "The chemistry stayed, but who operates the reactor changed."
- verification: verified — pattern matches AGENTS.md § How it reads.
- confidence: high

### polissilicio-09 — 2006/2008 production figures could not be read in the cited review
- where: docs/polissilicio.md:L176 (and docs/en/polissilicio.md:L176)
- category: fact
- severity: minor
- quote: "Em **2006** a indústria solar **ultrapassou a de semicondutores** como maior consumidora de polissilício <Cite id="saimm" />. Em 2008, a produção mundial foi de aproximadamente **75 mil toneladas**, das quais **45 mil** foram para fotovoltaica <Cite id="saimm" />." / "In **2006** the solar industry **overtook the semiconductor industry** as the largest consumer of polysilicon <Cite id="saimm" />. In 2008 world production was approximately **75,000 tonnes**, of which **45,000** went to photovoltaics <Cite id="saimm" />."
- problem: the numbers are plausible for a 2011 review, but the SAIMM PDF copy retrieved during this audit was compressed and the relevant passages could not be read, so the figures are unconfirmed. The 2008 total is not contradicted elsewhere in the repo.
- fix: open the SAIMM PDF (`citations.ts` num 12, `https://pyrometallurgy.co.za/Pyro2011/Papers/083-Xakalashe.pdf`) or an archive copy and check the 2006 overtaking claim and the 75,000/45,000 t pair; change nothing if confirmed.
- verification: needs external verification — the retrieved PDF was partly unreadable; exact lookup: the SAIMM URL above.
- confidence: low

### polissilicio-10 — Idea: one data figure for the cycle, capacity against price
- where: docs/polissilicio.md:L256–L270 (and docs/en/polissilicio.md:L256–L270)
- category: idea
- severity: idea
- quote: "Depois, a expansão chinesa de baixo custo praticamente **invalidou o ciclo**, produzindo uma tendência sustentada de sobreoferta interrompida apenas por fases curtas de escassez <Cite id="bernreuter-market" />."
- problem: `polysilicon-pork-cycle.svg` is a schematic; the twelve-year down-cycle and the return in 2020–2022 are carried only by prose. A data panel (price vs. capacity or vs. year) would give the section's central claim a checkable figure.
- fix: redraw, from the numbers in `bernreuter-pork-cycle`/`bernreuter-market`, an own SVG or a `specs.ts` series plotting the 2008→2020 cycle. Bernreuter's charts are copyrighted — redraw from the underlying values, do not copy the graphic, and if a chart is used, give it `sourceIds` and its caption must repeat the citation.
- verification: proposed source — `bernreuter-pork-cycle` (already cited at L270); licence check needed before shipping any external graphic.
- confidence: n/a (idea)

### polissilicio-11 — Idea: put numbers on the segregation argument
- where: docs/polissilicio.md:L182–L191 (and docs/en/polissilicio.md:L182–L191)
- category: idea
- severity: idea
- quote: "**Boro, carbono, oxigênio e fósforo têm coeficiente de segregação alto** e não são empurrados para fora pelo crescimento do cristal <Cite id="saimm" />."
- problem: "coefficient is high" is abstract next to the section's crisp claim that no metallurgy removes these four. The values make the contrast with metals concrete (k ≈ 0.8 B, 0.35 P, 1.25 O, 0.07 C in Si) and explain why refining is needed alongside directional solidification.
- fix: add a small table of segregation coefficients for B, C, O and P (and one metal such as Fe, k ≈ 10⁻⁵, for contrast) after L184. Verify the exact values in the Xakalashe & Tangstad review before printing; the table cites `saimm`, no new source.
- verification: proposed source — the `saimm` review already cited on the page; values must be read off its table before shipping.
- confidence: n/a (idea)

### estrutura-wafers

### estrutura-wafers-01 — The chapter has no declared spine; the four axes sit mid-chapter
- where: docs/estrutura-wafers.md:L7–L18 and L52–L57 (and docs/en/estrutura-wafers.md:L7–L18 and L52–L57)
- category: structure
- severity: major
- quote: "# Estrutura cristalina e tipos de wafer [...] O silício cristalino adota a **estrutura cúbica de diamante**." / "# Crystal structure and wafer types [...] Crystalline silicon adopts the **diamond cubic crystal structure**." And at L52: "Um wafer se descreve por **quatro eixos**, e cada um tem onde ser conferido neste capítulo:" / "A wafer is described by **four axes**, and each one has somewhere to be checked in this chapter:"
- problem: the chapter opens straight into `## Estrutura do silício puro` with no sentence, list and closing sentence declaring what it explains. The four-axis list that could serve as the spine appears under `## Como ler um wafer`, after the germanium section. `transistores.md:9–26` is the model; this page is otherwise the clearest candidate for it in the repo, because the list already exists and each item already links its section.
- fix: move the four-axis list (L52–57) to directly under the H1 as the chapter's spine: a sentence introducing it, the list with its existing section links, and a closing sentence saying the rest follows that order. Remove or repoint any wording in `## Como ler um wafer` that becomes redundant.
- verification: verified — the opening of both locales was read in full; no spine exists.
- confidence: high

### estrutura-wafers-02 — `### Recursos adicionais` is leftover scaffolding and strands the DRX paragraph
- where: docs/estrutura-wafers.md:L21–L28 (and docs/en/estrutura-wafers.md:L21–L28)
- category: structure
- severity: major
- quote: "### Recursos adicionais" [...] "- [Estrutura cristalina — YouTube](https://www.youtube.com/watch?v=lgYQE2aTNNc)" / "### Further reading" [...] "- [Crystal structure — YouTube](https://www.youtube.com/watch?v=lgYQE2aTNNc)"
- problem: a bare link list — two YouTube videos, a WaferPro page and a direct `upload.wikimedia.org` SVG download — sits between the p08 figures and the DRX paragraph that belongs to the same section, the first `###` of the chapter. It interrupts the narrative, mixes a file-download link with prose links, and delivers nothing the chapter needs; it reads as scaffolding left over from drafting. The DRX paragraph (L28) is orphaned after it.
- fix: delete the section and move the DRX paragraph up to follow the two figure captions (after L19). If the links are wanted, put them in a "Para saber mais" after the narrative, never mid-section, and prefer the Commons page over a direct upload URL.
- verification: verified — full read of both locales; no other page keeps such a list in this position.
- confidence: high

### estrutura-wafers-03 — PT caption left in English; both p08 figures carry no source line
- where: docs/estrutura-wafers.md:L13–L19 (and docs/en/estrutura-wafers.md:L13–L19)
- category: parity
- severity: major
- quote: "<DiagramFigure src=\"/pdf-images/p08-1.png\" alt=\"Estrutura cúbica de diamante\"> The diamond cubic crystal structure. </DiagramFigure>" (identical in both locales)
- problem: the PT file ships an untranslated English caption on its first figure, while its sibling caption and every later caption are in PT. Separately, neither p08 caption names where the image comes from; the repo's PDF-extracted figures normally carry a source or are paired with a `SourceNote` (`polissilicio.md:276–282`), and `fotolitografia.md:15–17` shows the credited form.
- fix: translate the PT caption to "A estrutura cristalina cúbica de diamante." and add a derivation line to both locales naming the source: the images are page 8 of `Resumo Chipmaking.pdf` (`scripts/extract-pdf-images.py:7,20` produces `p08-N`). If the embedded figure is third-party, name author and licence as the rules require.
- verification: verified — the PT/EN captions were compared directly; the script mapping to page 8 was read.
- confidence: high (untranslated caption); medium (whether a credit or only a derivation note is required)

### estrutura-wafers-04 — SEMI T7 detail cited to the SEMI M1 entry
- where: docs/estrutura-wafers.md:L88 (and docs/en/estrutura-wafers.md:L88)
- category: source
- severity: minor
- quote: "Essa informação passa a vir do certificado do lote ou da **marcação a laser no verso** (formato **SEMI T7**, com campo opcional **A/N**) <Cite id="semi-m1" />." / "That information moves to the lot certificate or to the **laser mark on the back** (SEMI **T7** format, with an optional **A/N** field) <Cite id="semi-m1" />."
- problem: `semi-m1` resolves to "SEMI M1 — Specification for Polished Single Crystal Silicon Wafers"; T7 is a separate standard and there is no entry for it in `citations.ts`. The marker's source does not publish the T7 claim.
- fix: append a `semi-t7` entry to `citations.ts` (SEMI back-surface laser-marking spec; check the exact title and number on the SEMI store) and cite it for this sentence, keeping `semi-m1` for the notch dimensions; append at the end of the list, never renumber.
- verification: verified — `citations.ts` num 46 is M1 only; a project-wide grep found no T7 source.
- confidence: high

### estrutura-wafers-05 — One sentence, two sources: split the attribution of the share numbers
- where: docs/estrutura-wafers.md:L122 (and docs/en/estrutura-wafers.md:L122)
- category: source
- severity: minor
- quote: "Os dados da pesquisa apontam para **44,1%** em unidades, e para pouco mais da metade do **volume de 300 mm** <Cite id="nikkei-wafer-share" /> <Cite id="wafer-market" /> — não 60%." / "The survey data point to **44.1%** by units, and to just over half of **300 mm volume** <Cite id="nikkei-wafer-share" /> <Cite id="wafer-market" /> — not 60%."
- problem: "Os dados da pesquisa" attributes both numbers to the Nikkei survey, but only the 44.1 % is Nikkei; the "just over half of 300 mm volume" is IMARC's commercial estimate. The two markers at the end of the sentence do not tell the reader which number came from which source, contrary to "cite who measured".
- fix: name each source on its claim — PT "a pesquisa da Nikkei aponta 44,1% em unidades; a IMARC estima pouco mais da metade do volume de 300 mm" — with each `<Cite>` next to its number. Both figures check out as stated, so only the wording changes.
- verification: verified — the IMARC page states "Shin-Etsu Chemical and SUMCO alone supply over 50% of the global 300mm wafer volume"; the Nikkei entry reports the unit shares.
- confidence: high

### estrutura-wafers-06 — Blanket ±20 µm thickness tolerance is suspect
- where: docs/estrutura-wafers.md:L92 (and docs/en/estrutura-wafers.md:L92)
- category: fact
- severity: minor
- quote: "Valores nominais da SEMI M1, todos com tolerância de **±20 µm** <Cite id="semi-m1" />:" / "Nominal SEMI M1 values, all with a **±20 µm** tolerance <Cite id="semi-m1" />:"
- problem: one tolerance is applied to every diameter including 200 and 300 mm. Supplier datasheets and summaries of the standard commonly quote **±25 µm** for the larger nominal thicknesses; however, the standard itself is paywalled (store URL in `citations.ts` num 46) and a public secondary source (Wikipedia's wafer table) gives thicknesses without tolerances, so this could not be confirmed. The table's diameters and thicknesses (525/625/675/725/775 µm) and the bow/warp/TTV values are consistent with M1.
- fix: check the SEMI M1 thickness tolerance clause. If it is per-diameter, state each value or drop the blanket number; keep the sentence only for the values the standard actually gives.
- verification: needs external verification — SEMI M1, thickness tolerance (paywalled, `citations.ts` num 46); secondary sources suggest ±25 µm but were not treated as authoritative.
- confidence: low

### estrutura-wafers-07 — Miller credit names the Commons username, not the author
- where: docs/estrutura-wafers.md:L35 (and docs/en/estrutura-wafers.md:L35)
- category: figure
- severity: minor
- quote: "DeepKling — <a href=\"https://commons.wikimedia.org/wiki/File:Miller_Indices_Felix_Kling.svg\" target=\"_blank\" rel=\"noopener noreferrer\">Miller Indices</a> (CC BY 3.0), SVG da Wikimedia Commons."
- problem: the Commons file page names **Felix Kling** as the author and asks for the author's name near the image; "DeepKling" is the account name. The current caption satisfies the licence via the link to the file page, so this is a polish item — do not remove any part of the credit.
- fix: prefer "Felix Kling (DeepKling)" while keeping the file-page link and the licence string exactly as they are; repeat in both locales.
- verification: verified — the Commons page author field; the licence string and link in the caption are correct as shipped.
- confidence: medium

### estrutura-wafers-08 — Idea: a figure for the oxide comparison that decided the silicon/germanium contest
- where: docs/estrutura-wafers.md:L38–L48 (and docs/en/estrutura-wafers.md:L38–L48)
- category: idea
- severity: idea
- quote: "A segunda (e historicamente a decisiva) é o **óxido nativo**. [...] O óxido do germânio (**GeO₂**) é o oposto: termicamente instável e solúvel em água, inútil como proteção."
- problem: this is the chapter's own "historically decisive" point and it has no figure; the section "Por que silício, e não germânio" is the spine item with no image, while the other sections have one. The comparison exists only as prose.
- fix: an own schematic (SVG, `<DiagramFigure>`, derivation line, no data so no chart spec) with two panels: SiO₂ stable / insulating / water-insoluble / usable as diffusion mask, against GeO₂ unstable / water-soluble. Keep labels in English and short, per the drawings rules; caption translated in both locales.
- verification: proposed addition — no external image needed; if a reference image is preferred, licence check is mandatory before use.
- confidence: n/a (idea)

### estrutura-wafers-09 — Idea: a timeline figure for the 450 mm transition
- where: docs/estrutura-wafers.md:L104–L112 (and docs/en/estrutura-wafers.md:L104–L112)
- category: idea
- severity: idea
- quote: "Os primeiros cristais de **400 mm** foram puxados em **1995** [...] O plano previa linhas-piloto em 2012 e produção entre 2014 e 2016 <Cite id="eng-450mm" />."
- problem: the section that closes the chapter's diameter story carries five dates in three paragraphs and no figure — the only major section of the page without one. All the milestones are already cited.
- fix: a small own timeline (1995 first 400 mm crystal → 2000 ITRS picks 450 mm → May 2008 Intel/Samsung/TSMC → 2012 G450C → 2014 Intel withdraws → halt) as an SVG or a `specs.ts` chart where the dates come from `eng-450mm`/`intel-450mm`; if a chart, set `sourceIds` and repeat the citation in the caption.
- verification: proposed addition — dates and sources already on the page (`eng-450mm`, `intel-450mm`).
- confidence: n/a (idea)

### estrutura-wafers-10 — Idea: show the usable-area difference between flat and notch
- where: docs/estrutura-wafers.md:L80–L88 (and docs/en/estrutura-wafers.md:L80–L88)
- category: idea
- severity: idea
- quote: "A razão é área útil: quanto mais reta a borda, menos pastilhas inteiras cabem dentro do círculo." / "The reason is usable area: the straighter the edge, the fewer whole dies fit inside the circle."
- problem: the sentence gives the reason for the notch in one clause and never shows it. A die-grid overlay at the same diameter, flat versus notch, would make the trade-off visible and tie the section to the identification diagram above it.
- fix: an own schematic with two same-scale wafers and an identical die grid; count the whole dies inside each contour in the caption. No data source needed beyond the geometry, so mark it a diagram in the caption.
- verification: proposed addition — geometry argument only; no source needed, but the caption must say it is a diagram.
- confidence: n/a (idea)

### Coverage summary
- polissilicio (`docs/polissilicio.md` + `docs/en/polissilicio.md`): spine partial — the route is introduced by a Mermaid diagram in "Visão geral da rota" but there is no ordered list pointing at the sections; 9 `DiagramFigure`s + 1 Mermaid + 1 embedded video, no data charts; `dataAsOf: 2025`; fix next: the demand-series conflation at L274.
- estrutura-wafers (`docs/estrutura-wafers.md` + `docs/en/estrutura-wafers.md`): spine no — the chapter opens directly into "Estrutura do silício puro" and the four-axis list sits mid-chapter at L52–57; 5 `DiagramFigure`s, no Mermaid, no data charts; `dataAsOf: 2025`; fix next: delete the `### Recursos adicionais` scaffolding and promote the four axes into a spine.
## Report — docs/fabricacao-wafers.md, docs/fotolitografia.md, docs/historia-fotolitografia.md (both locales)

### fabricacao-wafers

### fabricacao-wafers-01 — No spine list at the top: the "eight steps" are never enumerated
- where: docs/fabricacao-wafers.md:L9 (and docs/en/fabricacao-wafers.md:L9)
- category: structure
- severity: major
- quote: "As oito etapas a seguir cobrem essa sequência, do crescimento do cristal à inspeção final." / "The eight steps below cover that sequence, from growing the crystal to final inspection."
- problem: AGENTS.md requires the chapter to open with the ordered list of what it explains (sentence, list, closing sentence). Here the sentence exists but the list does not; the reader gets no navigation and cannot check the eight items against the sections. `celulas-solares` does it right ("A célula pronta sai de **sete etapas**, nesta ordem:" followed by a linked 1–7 list).
- fix: after the intro sentence, add the ordered 1–8 list linking the eight H2 anchors (crescimento do monocristal, preparação do lingote, corte em fatias, arredondamento/lapidação, ataque químico, tratamento térmico e RTP, CMP, limpeza RCA e inspeção), then the closing sentence that the rest of the chapter follows that order.
- verification: verified by reading the chapter and `docs/celulas-solares.md` L21–29.
- confidence: high

### fabricacao-wafers-02 — "Corte em fatias" is the only spine section with no figure
- where: docs/fabricacao-wafers.md:L85-101 (and docs/en/fabricacao-wafers.md:L85-101)
- category: figure
- severity: major
- quote: "## Corte em fatias (wafer slicing)" / "## Wafer slicing"  (± the subsection "Da serra de disco interno ao fio diamantado")
- problem: The whole slicing section, including the ID-saw → slurry → diamond-wire history, has no `DiagramFigure`, no image and no chart between L85 and L101. AGENTS.md: "Every item of the spine needs a figure. A gap is a visible hole, not an economy." The other seven steps all have at least one figure.
- fix: add one drawing to `docs/public/assets/` (see idea fabricacao-wafers-14) and a `DiagramFigure` in this section; the caption should name the source (own drawing).
- verification: verified by counting the section (no DiagramFigure between L85 and L101).
- confidence: high

### fabricacao-wafers-03 — Sliced-wafer thickness contradicts the 775 µm spec it cites
- where: docs/fabricacao-wafers.md:L87 and L99 (and docs/en/fabricacao-wafers.md:L87 and L99)
- category: fact
- severity: blocker
- quote: "com espessuras típicas de **700–800 µm**" … "Uma lâmina de 300 mm sai com 775 µm e vai *perder* material na lapidação e no polimento" / "at typical thicknesses of **700–800 µm**" … "A 300 mm slice comes out at 775 µm and will *lose* material in lapping and polishing"
- problem: 775 µm is the finished 300 mm wafer thickness (SEMI M1; the repo's own `docs/estrutura-wafers.md:L100` table says "| 300 mm | 775 µm | notch |"). Text that has the slice leaving the saw at 775 µm and then losing material in lapping/polishing describes a wafer that ends thinner than the standard it just cited; the as-cut thickness must be larger than 775 µm. The two sentences also disagree with each other in bookkeeping (700–800 as-cut, then 775 and shrinking).
- fix: state the order explicitly — as-cut thickness > final spec — and give the as-cut value from a wafering source (e.g., Möller 2012, already cited, or Pei 2005); then say the finishing steps bring it down to the SEMI M1 775 µm. Either drop "700–800 µm" or present it as the as-cut range only if a source supports it.
- verification: verified internally (page's own numbers + `estrutura-wafers` table + SEMI M1 cite); exact as-cut value needs a source (Möller 2012 / Pei et al. 2005).
- confidence: high (contradiction), medium (which of the two numbers is right)

### fabricacao-wafers-04 — Precise date "1.º de outubro de 1948" is not in either cited source
- where: docs/fabricacao-wafers.md:L41 (and docs/en/fabricacao-wafers.md:L41)
- category: source
- severity: major
- quote: "Em **1.º de outubro de 1948**, **Gordon Teal** e **John Little**, na Bell Labs, montaram um equipamento improvisado … e puxaram os primeiros cristais **monocristalinos de germânio** <Cite id="nae-teal" /> <Cite id="chm-grown-junction" />" / "On **1 October 1948**, **Gordon Teal** and **John Little** at Bell Labs assembled improvised equipment …"
- problem: Both cited pages were fetched (2026-09-28). The NAE memorial tribute describes the wheeled puller and the closet but gives no date; the CHM "1951: First Grown-Junction Transistors" page gives no date for the germanium pulls either (its dated events are April 1950 and 4 July 1951). A day-month-year claim needs a source that prints it.
- fix: cite the source that dates the pull (Teal's own memoir, IEEE Trans. Electron Devices 23(7), 1976, or Riordan & Hoddeson, *Crystal Fire*, pp. 168–194, which the CHM page lists) or soften to "em 1948" as the cited pages do.
- verification: verified that `nae-teal` and `chm-grown-junction` (both fetched) lack the date; the date itself needs the Crystal Fire/Teal memoir check.
- confidence: high (sources lack it), medium (date itself)

### fabricacao-wafers-05 — Videos are not credited in the text or in the references
- where: docs/fabricacao-wafers.md:L200-208 (and docs/en/fabricacao-wafers.md:L200-208; docs/referencias.md:L28-30)
- category: source
- severity: major
- quote: "<YouTubeEmbed id=\"skRmyhSOu28\" title=\"Puxamento de um lingote Czochralski (UNSW)\" />" and "<YouTubeEmbed id=\"xo-ir73TA_U\" title=\"Crescimento do lingote dentro do forno LCT (Linton Crystal Technologies)\" />" (UNSW, Intel and LCT embeds)
- problem: AGENTS.md §Embeds: "credit the source in the text and in the references". The Asianometry video has `asianometry-wafer` (num 47) in the page's `<SourceNote>` and its title carries the channel; the UNSW, Intel and LCT videos appear nowhere in the text or in `docs/referencias.md` ("## Conteúdo em vídeo" lists only the Intel 360° fab tour embed). The four embeds also sit under a bare `## Vídeos` heading with no sentence introducing or crediting them.
- fix: add a short credit sentence before the embeds and either add the three videos to the page `<SourceNote>` (with `citations.ts` entries if they are to be numbered) or list them in the video section of `/referencias`; the same edit in the EN file.
- verification: verified by grep: the three embed IDs occur only in the two chapter files; `docs/referencias.md` lists only `CPmMfasVxbY`.
- confidence: high

### fabricacao-wafers-06 — "Wafers keep growing" stops at 2011 formats
- where: docs/fabricacao-wafers.md:L196 (and docs/en/fabricacao-wafers.md:L196)
- category: fact
- severity: major
- quote: "do padrão de **10 × 10 cm²** para **12,5 × 12,5 cm²** e, mais recentemente, **15,6 × 15,6 cm²** <Cite id="saimm" />" / "from the **10 × 10 cm²** standard to **12.5 × 12.5 cm²** and, more recently, **15.6 × 15.6 cm²**"
- problem: The sentence is written from a 2011 source (Xakalashe & Tangstad) on a page stamped `dataAsOf: 2025`. Since ~2019 the industry formats have moved to M6/M10 (166/182 mm) and G12 (210 mm); "more recently, 15.6 cm" tells a 2025 reader the opposite of the truth. The chapter's own ITRPV cite is already on the page (L184) but not used here.
- fix: extend the sentence with the current formats and attach `<Cite id="itrpv-2024" />` (or the full ITRPV report), or drop "mais recentemente" and attribute the whole series to the 2011 source.
- verification: needs external verification — ITRPV 15th ed. (2024), wafer-size chart / shipments by area, for the formats in use in 2023 (182/210 mm dominate). `docs/celulas-solares.md` also carries no format data, so there is no internal cross-check.
- confidence: medium (direction certain, exact numbers to confirm)

### fabricacao-wafers-07 — "three times thinner" does not match the numbers around it
- where: docs/fabricacao-wafers.md:L99 (and docs/en/fabricacao-wafers.md:L99)
- category: fact
- severity: minor
- quote: "É no ramo fotovoltaico, que aceita lâminas três vezes mais finas" / "It is in photovoltaics, which accepts slices three times thinner"
- problem: 775 µm against the 150–200 µm quoted in the same page is a factor of 3.9–5.2, not 3. The claim flatters the PV side (or understates the fab side) without a source.
- fix: write "cerca de quatro a cinco vezes mais finas" or compare with the same basis (PV 150–200 µm vs final 775 µm).
- verification: verified by arithmetic on the page's own figures (775/200 = 3.9; 775/150 = 5.2).
- confidence: high

### fabricacao-wafers-08 — ITRPV thickness claim points at a press release, where the split is unlikely to exist
- where: docs/fabricacao-wafers.md:L184 (and docs/en/fabricacao-wafers.md:L184)
- category: source
- severity: minor
- quote: "(e o padrão de 2023 já era de **150 µm** para lâminas monocristalinas do tipo p, com as do tipo n cerca de **5 a 10 µm mais finas** <Cite id="itrpv-2024" />)"
- problem: `itrpv-2024` resolves to the VDMA **press release** PDF for the 15th edition; the p-type/n-type thickness split lives in the report's charts, not in a press release. The claim may be right but the citation cannot plausibly carry it.
- fix: cite the full ITRPV 15th-edition report (or the specific chart) for the p/n split, or soften the claim.
- verification: needs external verification — open the VDMA press PDF and the ITRPV report, wafer-thickness chart (p-type vs n-type, 2023 values).
- confidence: medium

### fabricacao-wafers-09 — "Vale notar" / "It is worth noting" twice, on the banned list
- where: docs/fabricacao-wafers.md:L15 and L99 (and docs/en/fabricacao-wafers.md:L15 and L99)
- category: pacing
- severity: minor
- quote: "Vale notar de onde vem essa pureza." / "It is worth noting where that purity comes from." — "Vale notar que, nos wafers de fab, o objetivo do corte não é a espessura mínima" / "It is worth noting that, for fab wafers, the goal of slicing is not minimum thickness"
- problem: AGENTS.md §How it reads lists "it's worth noting" among the often-empty phrases to cut; it recurs twice in each locale.
- fix: delete both and start with the fact: "De onde vem essa pureza: o material que entra no cadinho…" and "Nos wafers de fab, o objetivo do corte não é a espessura mínima: é a planura."
- verification: verified against AGENTS.md list; both lines quoted.
- confidence: high

### fabricacao-wafers-10 — RCA-1 described as "oxidação orgânica" / "organic oxidation"
- where: docs/fabricacao-wafers.md:L155 (and docs/en/fabricacao-wafers.md:L155)
- category: fact
- severity: minor
- quote: "**RCA-1 (SC-1):** NH₄OH / H₂O₂ / H₂O a 70–80 °C — oxidação orgânica e partículas." / "organic oxidation and particle removal"
- problem: SC-1 removes organic contamination and particles (and some metals); the H₂O₂ oxidises the silicon surface. "Oxidação orgânica" / "organic oxidation" describes neither.
- fix: "remoção de orgânicos e partículas" / "removes organics and particles".
- verification: verified against the standard RCA description implied by the cited Kern (1990); wording-level fix.
- confidence: medium

### fabricacao-wafers-11 — EN adds "epitaxial" where PT says "excess material at the edge"
- where: docs/fabricacao-wafers.md:L103 (and docs/en/fabricacao-wafers.md:L103)
- category: parity
- severity: minor
- quote: PT "limita o excesso de material na borda (*edge crown*) e o acúmulo de fotoresistor na borda no *spin coating*" vs EN "also limits epitaxial edge crown and photoresist edge bead"
- problem: The EN introduces an "epitaxial" cause the PT does not state, and drops the "no spin coating" reference that the EN then marks with "edge bead". One of the two has moved beyond the cited SEMI MF928 / ProStEK material.
- fix: make both say the same thing, e.g. "limits edge crown (excess material at the edge) and photoresist build-up at the edge during spin coating" and check which wording the sources use.
- verification: needs the SEMI MF928 / ProStEK texts (not fetched) to decide the technical term.
- confidence: medium

### fabricacao-wafers-12 — `dataAsOf: 2025` is ahead of the page's newest datum
- where: docs/fabricacao-wafers.md:L4 (and docs/en/fabricacao-wafers.md:L4)
- category: source
- severity: minor
- quote: "dataAsOf: 2025"
- problem: AGENTS.md defines the stamp as the year of the most recent datum cited, not the edit year. The newest datum on the page is the ITRPV 15th edition (published 2024, describing 2023); everything else is 2011–2019. A 2025 stamp promises currency the page does not have (and it is the same year used by `fotolitografia`, which does contain a December 2025 event).
- fix: set `dataAsOf: 2024` (or 2023, if the report's data year is used) or add a genuinely 2025 datum and a cite for it.
- verification: verified by listing the page's cites (`itrpv-2024` is the newest).
- confidence: medium

### fabricacao-wafers-13 — Verification steps that could not be completed
- where: docs/fabricacao-wafers.md:L35-37 (iucr) and L184-192 (saimm)
- category: source
- severity: minor
- quote: "obtendo fios de estanho, zinco e chumbo de cerca de **1 mm de diâmetro** e até **150 cm de comprimento** <Cite id="iucr-czochralski" />"
- problem: The IUCr page (1916 accident, 1918 publication, 1 mm × 150 cm threads) returned Cloudflare 403 through the fetch tool, and the SAIMM PDF (kerf 30 %, cropping 25 %/15 %, 180 µm wire, ≈50 % wafer of module cost) rendered as binary; these numbers are therefore unverified, not confirmed.
- fix: check them directly — IUCr Newsletter 28(3) "Who was Jan Czochralski? Out of the shadows" (iucr.org) and Xakalashe & Tangstad 2011 (pyrometallurgy.co.za/Pyro2011/Papers/083-Xakalashe.pdf) — before the next editing pass.
- verification: needs external verification (URLs recorded above; both fetches failed).
- confidence: high (that the check is outstanding)

### fabricacao-wafers-14 — idea: drawing for the slicing section
- where: docs/fabricacao-wafers.md:L85-101
- category: idea
- severity: idea
- quote: "## Corte em fatias (wafer slicing)"
- problem: The chapter's only figureless spine item is also the one with the most mechanical content (wire web, kerf, block sectioning).
- fix: draw an own schematic in the house style — ingot block + wire web between two spools, a kerf dimension line, and a small inset comparing as-cut vs final thickness — and caption it "Desenho do autor"; this also gives the 775 µm/as-cut fix from finding -03 a place to be visualised.
- verification: no external source needed (own drawing); follow AGENTS.md §Drawings (background rect, title/desc, English labels).
- confidence: high

### fabricacao-wafers-15 — idea: chart the PV wafer series to replace the stale prose
- where: docs/fabricacao-wafers.md:L182-196
- category: idea
- severity: idea
- quote: "A indústria fotovoltaica migrou para áreas maiores ao longo do tempo"
- problem: "Espessura" and "O wafer está crescendo" are the only spine sections with no figure at all, and the formats they describe are a decade old.
- fix: add a small chart (spec in `theme/charts/specs.ts`, data exported to `docs/public/data/`) of PV wafer thickness and/or wafer format over time, sourced to ITRPV editions; it fixes the currency problem and gives the section a figure in one move.
- verification: ITRPV 15th ed. (2024) or the ITRPV data portal must be checked for the series and licence before use.
- confidence: medium

### fotolitografia

### fotolitografia-01 — "When TSMC was still part of Philips": false and uncited
- where: docs/fotolitografia.md:L13 (and docs/en/fotolitografia.md:L13)
- category: fact
- severity: blocker
- quote: "Quando a TSMC ainda fazia parte da Philips, motores lineares **hidráulicos** eram usados: muito precisos, porém com alta manutenção — custo e tempo significativos até soluções mais robustas." / "When TSMC was still part of Philips, **hydraulic** linear motors were used…"
- problem: TSMC was founded in 1987 as a joint venture in which Philips was a minority shareholder; it was never part of Philips. The paragraph follows text about ASML (Philips' own lithography spin-off), so the likely intended subject is ASML's early years. No `<Cite>` supports any of the claims (TSMC/Philips, hydraulic linear motors, maintenance cost); "linear motors" are also electromagnetic, not hydraulic (cf. the p13-1 figure on the same page, which labels "LINEAR MOTOR" with no hydraulics).
- fix: if the story is about ASML under Philips, name ASML and cite an ASML history page; if the sentence cannot be sourced, delete it. Both locales in one edit.
- verification: needs external verification for the hydraulic claim (ASML history / early TWINSCAN documentation); TSMC's founding and Philips' stake are public record.
- confidence: high (the sentence as written is wrong), medium (what it meant)

### fotolitografia-02 — Intro stage numbers (15 kg, 20 G, “3× a F1”) are uncited and out of scale with a source cited on the same page
- where: docs/fotolitografia.md:L9-11 (and docs/en/fotolitografia.md:L9-11)
- category: source
- severity: major
- quote: "A mesa de posicionamento do wafer pesa cerca de **15 kg** e pode acelerar com força de até **20 G** (cerca de três vezes a aceleração típica de um carro de Fórmula 1)…" / "The wafer positioning stage weighs about **15 kg** and can accelerate with a force of up to **20 G** (roughly three times the acceleration of a Formula 1 car)…"
- problem: Three uncited numbers, one physics slip ("accelerate with a force of 20 G" — G is acceleration), and a conflict in scale: `asml-highna`, cited later on this very page (L172, L201), says the EXE wafer stage accelerates at 8g and the NXE at 4g; ASML's reticle stage reaches 32g. "20 G" for the wafer stage is 2.5× the newest published figure and matches nothing in the cited material.
- fix: attach a source and use its numbers ("acelera a até 4g/8g", per ASML), or drop the comparison; rewrite "acelerar com força de até 20 G" as "acelerar a até 20 G" if the figure survives verification.
- verification: verified against the fetched ASML page `asml-highna` (5 things…, 25 Jan 2024: "wafer stage … accelerates at 8g, twice as fast as the NXE's"); the 15 kg/20 G values have no located source.
- confidence: high

### fotolitografia-03 — 135 nm in the prose, 134 nm in the table (and history), for the same quantity
- where: docs/fotolitografia.md:L80 and L102 (and docs/en/fotolitografia.md:L80 and L102; docs/historia-fotolitografia.md:L108)
- category: fact
- severity: major
- quote: "o comprimento de onda **efetivo** cai de 193 nm para cerca de **135 nm**" vs "| **ArF com imersão** | 193 nm, cerca de 134 nm efetivos na água |" / "drops from 193 nm to about **135 nm**" vs "about 134 nm effective in water"
- problem: The same effective wavelength is given as 135 nm in two prose passages and 134 nm in the comparison table; 193/1.44 ≈ 134.3 nm, so the table's number is the conventional one. Neither locale is internally consistent.
- fix: choose one value (134 nm is standard) and apply it in both chapters and both locales. The cited ASML immersion story does not publish either number (fetched), so the fixing agent should check a source that does (ASML DUV product literature or the immersion optics papers) and cite it.
- verification: verified by grep across docs (135 nm: fotolitografia L80, historia L108; 134 nm: fotolitografia table only); the ASML page fetched does not state the figure.
- confidence: high (inconsistency), medium (which number the source supports)

### fotolitografia-04 — No spine list at the top
- where: docs/fotolitografia.md:L9-13 (and docs/en/fotolitografia.md:L9-13)
- category: structure
- severity: major
- quote: "A fotolitografia é a etapa que **desenha o circuito** no wafer. Máquinas da **ASML** (origem na Philips)…" / "Photolithography is the step that **draws the circuit** on the wafer. **ASML** machines…"
- problem: The chapter opens with three intro paragraphs (ASML, stage numbers, TSMC/Philips) and never states, as a list, what it explains; the sections start at "Como a luz chega ao wafer". Compare `celulas-solares`, which opens with a numbered, linked list.
- fix: write a proper intro paragraph then the ordered list of the chapter's path (como a luz chega ao wafer → fotoresistor → passo a passo → realce de resolução → imersão → DUV → fonte EUV → espelhos → DUV/EUV lado a lado → High-NA), each item pointing at its section, followed by the closing sentence.
- verification: verified by reading the opening and comparing with the repo convention.
- confidence: high

### fotolitografia-05 — Two embedded videos have no credit anywhere
- where: docs/fotolitografia.md:L209 and L211 (and docs/en/fotolitografia.md:L209 and L211)
- category: source
- severity: major
- quote: "<YouTubeEmbed id=\"jL7HvnBgrJ4\" title=\"Processo ASML\" />" and "<YouTubeEmbed id=\"rCwgAGG2sZQ\" title=\"RTX 5090 Chip Deep-Dive\" />" / "ASML process" / "RTX 5090 chip deep-dive"
- problem: AGENTS.md §Embeds requires the source credited in the text and in the references. Neither video has an entry in `citations.ts`, in the page's `<SourceNote>`, or in `docs/referencias.md`; their titles name no channel. The second is a consumer-GPU video in a photolithography chapter, which makes the missing attribution worse.
- fix: either drop both, or add credit lines naming the channel/author and the video's title, and add the corresponding entries (video section of `/referencias`, or `SourceNote` ids).
- verification: verified by grep of the IDs across `docs/` (only the two chapter files match) and by reading `docs/referencias.md`.
- confidence: high

### fotolitografia-06 — "Related videos" list does not match the embedded videos, and one listed source is an article
- where: docs/fotolitografia.md:L205 (and docs/en/fotolitografia.md:L205)
- category: source
- severity: minor
- quote: "<SourceNote label=\"Vídeos relacionados\" :ids=\"['asml-gaa', 'asml-highna-video', 'asml-unveiling-highna', 'asml-euv-podcast', 'branch-euv']\" />"
- problem: The list is labelled "related videos" but (a) includes `asml-gaa`, which is "What is a gate-all-around transistor?", an ASML article, not a video; (b) none of its ids is one of the three embedded videos in that section — it repeats sources already cited in the body; (c) `asml-investor-euv` in the main `<SourceNote>` (L201) is never cited inline, although it is evidently the source for the NXE:4000F roadmap row in the family table.
- fix: make the two `<SourceNote>`s agree with what is actually on the page: either point the video list at the embedded videos (and add the missing credits) or relabel it (e.g., "Fontes em vídeo"), drop `asml-gaa` from it, and attach `asml-investor-euv` to the NXE:4000F line or remove it.
- verification: verified against `citations.ts` (`asml-gaa` num 4 is an article; `asml-investor-euv` num 98 appears only in this SourceNote).
- confidence: high

### fotolitografia-07 — The two `pdf-images` figures are under-credited; the second has no credit at all
- where: docs/fotolitografia.md:L15-21 (and docs/en/fotolitografia.md:L15-21)
- category: figure
- severity: major
- quote: "Exposição EUV em wafer — <a href=\"https://www.asml.com/\" …>ASML</a> <Cite id=\"asml-gaa\" />." and "*Laser controlled positioning and a solid, vibration-suppressing granite base ensure precise alignment of the exposure chuck.*"
- problem: Both images are extracted from `Resumo Chipmaking.pdf` (`scripts/extract-pdf-images.py`). The p12-1 caption links the ASML **homepage** (not the source page), gives no file name/licence, and pins the image to `asml-gaa`, an article about gate-all-around transistors. The p13-1 diagram (an old “LINEAR MOTOR / GRANITE BLOCK” cutaway) carries no attribution at all. AGENTS.md requires author, original file and licence with a link for third-party media. On top of that, the PT page's p13-1 caption is the English sentence printed inside the image, while every other caption is PT.
- fix: give each figure the real provenance (ASML, original file/page and permission note; for p13-1 the actual source of the diagram), and either translate the p13-1 caption or mark it as the figure's original legend; re-point the p12-1 `<Cite>` to whatever page the image came from.
- verification: verified by reading both PNGs (p12-1 carries "Source: ASML"; p13-1's English caption is inside the image) and `scripts/extract-pdf-images.py`.
- confidence: high

### fotolitografia-08 — EUV pellicle "30 to 40 nm" needs the cited episode's timestamp
- where: docs/fotolitografia.md:L155 (and docs/en/fotolitografia.md:L155)
- category: fact
- severity: minor
- quote: "a que se mostrou viável tem apenas **30 a 40 nm** de espessura" / "the version that proved viable is only **30 to 40 nm** thick"
- problem: The pellicle thicknesses published by ASML/imec in this period are commonly quoted around 50 nm; 30–40 nm may come from a specific moment in the cited podcast episode, but the number cannot be checked without listening.
- fix: verify the figure against the cited episode (`asml-euv-podcast`, EWVJ1Iwa00E) or an ASML/imec pellicle publication; quote the same number in both locales.
- verification: needs external verification (cited source is a video; no transcript available through the fetch tool).
- confidence: low

### fotolitografia-09 — PT: "1,7 vez menores" should be "vezes"
- where: docs/fotolitografia.md:L180 (and docs/en/fotolitografia.md:L180)
- category: grammar
- severity: minor
- quote: "traços **1,7 vez menores** e, portanto, densidades de transistores **2,9 vezes maiores**"
- problem: In PT-BR the multiplier takes the plural: "1,7 vezes menores". The EN is fine ("1.7 times smaller").
- fix: "1,7 vezes menores".
- verification: verified against PT usage elsewhere on the site ("2,9 vezes maiores" in the same sentence).
- confidence: high

### fotolitografia-10 — Two empty-register patterns: "robust"/"robustas" and the "2000s never ended" line
- where: docs/fotolitografia.md:L13 and L104 (and docs/en/fotolitografia.md:L13 and L104)
- category: pacing
- severity: minor
- quote: "custo e tempo significativos até soluções mais robustas" / "a significant cost and time sink until more robust solutions appeared"; PT "É por isso que os anos 2000 nunca \"acabaram\" para a litografia de 193 nm" / EN "That is why the 2000s never really ended for 193 nm lithography"
- problem: "robust" is on the AGENTS.md banned list (both locales use it here). The second sentence is a rhetorical line with scare quotes in PT and the empty "really" in EN, in a section that otherwise states facts; its content ("the NXT platform is still being improved") is already in the same sentence.
- fix: replace "soluções mais robustas" with what actually happened (e.g., "até os estágios lineares assumirem o serviço"), and delete the 2000s clause, leaving: "A plataforma **NXT** … roda mais de 6.000 wafers… e continua sendo atualizável…".
- verification: verified against the AGENTS.md word list and by reading both sections.
- confidence: high

### fotolitografia-11 — Verification steps that could not be completed
- where: docs/fotolitografia.md:L185-186, L199, L125 (and docs/en/fotolitografia.md: same)
- category: source
- severity: minor
- quote: "**Intel concluiu o aceite em dezembro de 2025** para o nó 14A" and "175 wafers/h, a dose maior" and "cerca de **40 kW** … alimentados por uma fonte de **1 MW**, e ainda assim só cerca de **200 W** chegam ao wafer"
- problem: The fetch tool could not open the sources: `intel-exe5200b` (Cloudflare 403), `laserfocus-euv` (Cloudflare 403), `doi.org/10.1117/1.1695567` (Incapsula), and the ASML product pages render their specification values as obfuscated glyphs (the EXE:5200B page shows only "At dose: 50 mJ/cm²", which matches the table's note but not the 175 wph). The December 2025 acceptance and the 175 wph row therefore rest on the citation record only.
- fix: check the Intel Foundry blog post directly and the ASML EXE:5200B product page in a browser for the overlay/throughput values, and the Laser Focus World article for the laser numbers; if a value cannot be confirmed, attribute it to the correct page or remove it.
- verification: needs external verification (URLs above; note the ASML page obfuscation).
- confidence: high (that the check is outstanding)

### fotolitografia-12 — idea: a wavelength-vs-feature-size figure for the DUV section
- where: docs/fotolitografia.md:L90-104
- category: idea
- severity: idea
- quote: "## DUV: o que a luz de 193 nm ainda faz"
- problem: This section carries the chapter's central story — each source shrank the printable feature — as a table with no figure, and the table numbers come from `asml-light` and `kato-litho`, which are already cited.
- fix: add a small chart (spec in `theme/charts/specs.ts`, CSV exported by `scripts/export-chart-data.ts`) plotting wavelength against the smallest feature unlocked (g-line → i-line → KrF → ArF → ArF immersion → EUV), with `sourceIds` for the two sources. It also gives the "DUV" spine item the figure it lacks.
- verification: data must be re-checked against `asml-light` (fetched: 436 nm/1 µm; 365 nm/220 nm; 248 nm/150→80 nm; 193 nm/38 nm) before writing the spec.
- confidence: high

### fotolitografia-13 — idea: the pellicle deserves its own figure and its transmission number
- where: docs/fotolitografia.md:L151-155
- category: idea
- severity: idea
- quote: "### A máscara também é um espelho"
- problem: The EUV mask/pellicle problem is the one part of the optical path the chapter never shows; it is also a good place for a concrete datum (pellicle thickness and transmission) if a source can be pinned down.
- fix: a two-panel drawing — reflective mask stack (absorber over Bragg mirror) with and without the pellicle, plus the thickness/transmission values once verified — captioned "Desenho do autor, a partir de ASML/imec".
- verification: find the primary source for the pellicle thickness/transmission (ASML/imec publications) before using the numbers; licence check unnecessary if drawn in-house.
- confidence: medium

### historia-fotolitografia

### historia-fotolitografia-01 — IBM X-ray facility "≈ US$ 500 million" conflicts with another source cited on the page
- where: docs/historia-fotolitografia.md:L78 (and docs/en/historia-fotolitografia.md:L78)
- category: fact
- severity: major
- quote: "A IBM construiu uma instalação dedicada de cerca de **US\$ 500 milhões** e já demonstrava exposições de 0,33 µm em 1991, mas o programa nunca chegou à produção comercial" / "IBM built a dedicated facility costing around **US\$500 million**…"
- problem: The claim is cited to `asianometry-euv`, but `construction-physics-euv`, also cited on this page, gives very different figures for the same programme: IBM's own synchrotron "cost on the order of $25 million" and "by the 1990s IBM alone is estimated to have invested more than a billion dollars" in X-ray lithography overall. "≈ US$ 500 million" for a dedicated facility is an outlier that a reader with the second source would question; the same sentence's "0,33 µm exposições in 1991" also has no counterpart in that source.
- fix: pull the figures from the Asianometry video's timestamp and, if they do not hold, replace them with the Construction Physics numbers (synchrotron ≈ $25 M; IBM investment > $1 G) or drop the cost clause; check the 0.33 µm/1991 demonstration the same way.
- verification: partially done — `construction-physics-euv` fetched (URL works); the "$500 million" needs the Asianometry video (RmgkV83OhHA) timestamp.
- confidence: medium

### historia-fotolitografia-02 — SEMATECH task-force ranking placed in 1996; the cited source dates it 1997
- where: docs/historia-fotolitografia.md:L96 (and docs/en/historia-fotolitografia.md:L96)
- category: fact
- severity: minor
- quote: "Em **1996**, o Congresso americano cortou o financiamento … A essa altura, uma força-tarefa da SEMATECH havia classificado o EUV como o **último colocado entre quatro** tecnologias" / "At that point a SEMATECH task force had ranked EUV **last of four**"
- problem: `construction-physics-euv` (fetched) says the ranking came from "a 1997 lithography task force convened by SEMATECH". "A essa altura" (at that point, i.e. 1996) makes the ranking earlier than the source does.
- fix: date the ranking 1997 (or say "no ano seguinte"), keeping the cite; both locales.
- verification: verified by fetch of the cited article (Nov 2025 text: "a 1997 lithography task force … ranked EUV last of four").
- confidence: high

### historia-fotolitografia-03 — 2002/Burn Lin vs December 2001/Jan Mulkens: the two cited sources tell the immersion moment differently
- where: docs/historia-fotolitografia.md:L108 (and docs/en/historia-fotolitografia.md:L108)
- category: fact
- severity: minor
- quote: "Em **2002**, **Burn Lin**, então na TSMC, apresentou num workshop da SEMATECH sobre 157 nm a proposta de aplicar **imersão em água** à litografia de **193 nm** que já existia <Cite id=\"lin-immersion\" />"
- problem: `asml-immersion` — cited in the same paragraph for the 135 nm claim — dates the same 157 nm conference to **December 2001** and attributes the eureka to ASML's Jan Mulkens (it also notes IBM described immersion lithography in the 1980s). As written, the page presents one account as fact and the other source silently disagrees.
- fix: check Lin's own account (J. Micro/Nanolith. MEMS MOEMS, doi 10.1117/1.1695567) for the workshop date and wording, then either align the sentences or state the two accounts: the idea's lineage (IBM 1980s), Lin's public proposal and ASML's programme, with each source named.
- verification: partially done — ASML story fetched (December 2001, Mulkens); Lin's paper not reachable (doi.org blocked, Incapsula).
- confidence: medium

### historia-fotolitografia-04 — Timeline compresses 248 nm and 193 nm into the 1990 entry
- where: docs/historia-fotolitografia.md:L19 (and docs/en/historia-fotolitografia.md:L19)
- category: fact
- severity: minor
- quote: "1990 : i-line (365 nm), depois 248 nm (KrF) e 193 nm (ArF)"
- problem: The Mermaid timeline is ordered by year, but this entry stacks three generations after the 1990 mark, inviting the reader to place KrF and ArF around 1990. The body itself says only i-line was "difundida por volta de 1990", and the chapter's own framing puts 193 nm around 2002/2000s.
- fix: split into separate entries with the years from the cited Kato chronology (e.g., 1990 i-line; 1992 KrF; 2000 ArF), or move the compressed series out of the dated timeline into the prose.
- verification: needs external verification — Kato, "Chronology of Lithography Milestones" (the PDF did not render through the fetch tool; check the copy at the cited URL).
- confidence: medium

### historia-fotolitografia-05 — May 2003 event placed after December 2003
- where: docs/historia-fotolitografia.md:L110 (and docs/en/historia-fotolitografia.md:L110)
- category: fact
- severity: minor
- quote: "Em **outubro de 2003** a ASML já tinha imagens de um protótipo, o **TWINSCAN AT:1150i** … em **3 de dezembro** do mesmo ano veio o primeiro pedido … Em **maio de 2003** a Intel abandonou o 157 nm <Cite id=\"asianometry-euv\" />."
- problem: The paragraph runs October 2003 → 3 December 2003 → May 2003. The last sentence is a flashback with no signal; it reads as a chronology slip.
- fix: move the Intel sentence before the October/December events ("Já em maio de 2003, a Intel abandonara o 157 nm") or add an explicit flashback marker.
- verification: verified by reading both locales (same order).
- confidence: high

### historia-fotolitografia-06 — EPL throughput "20 to 30 300 mm wafers per hour": the 300 mm qualifier needs checking
- where: docs/historia-fotolitografia.md:L84 (and docs/en/historia-fotolitografia.md:L84)
- category: fact
- severity: minor
- quote: "As ferramentas de produção iniciais ficaram em **20 a 30 wafers de 300 mm por hora**, quando a indústria queria **50 a 80** <Cite id=\"spectrum-epl\" />."
- problem: The cited IEEE Spectrum piece could not be fetched; the EE Times account of the same period (1 May 2001, fetched) discusses EPL throughput only qualitatively. Whether the Spectrum figures were stated for 300 mm wafers (the introduction of which was still in progress at the time) is unverified.
- fix: check the Spectrum article for the wafer size; if it is silent, drop "de 300 mm" and write "wafers por hora", or find the source that states the size.
- verification: needs external verification — IEEE Spectrum, "Loser: A promising lithography gets stuck" (spectrum.ieee.org); EE Times (fetched via web.archive.org) supports the rest of the sentence's context.
- confidence: medium

### historia-fotolitografia-07 — No spine list; only the intro sentence
- where: docs/historia-fotolitografia.md:L8 (and docs/en/historia-fotolitografia.md:L8)
- category: structure
- severity: minor
- quote: "A litografia óptica passou por quatro arranjos de máquina antes de chegar ao scanner atual <Cite id=\"kato-litho\" />. Esta página conta essa trajetória: como a indústria escolheu uma litografia de próxima geração, por que quase todas as candidatas perderam e por que o **193 nm de 2002 ainda sustenta os nós avançados**."
- problem: The introduction names the questions but does not open with the ordered list of what the chapter explains, as AGENTS.md requires; the first thing a reader meets afterwards is a Mermaid timeline. For a narrative history chapter the timeline does part of the job, which is why this is only minor.
- fix: after the intro sentence, add the short ordered list of the chapter's path (as quatro gerações → a lista de candidatos → a decisão do século → por que os concorrentes perderam → o EUV e o consórcio → o desvio de 157 nm e a imersão), pointing at the headings.
- verification: verified by reading the opening; `celulas-solares` shows the convention.
- confidence: medium

### historia-fotolitografia-08 — The closing of "O EUV: de raio X mole a consórcio" asserts the reason without stating it
- where: docs/historia-fotolitografia.md:L100 (and docs/en/historia-fotolitografia.md:L100)
- category: pacing
- severity: minor
- quote: "O candidato que **menos** parecia capaz de durar várias gerações foi o que venceu — e é justamente a continuidade ao longo de várias gerações que explica por que ele venceu." / "The candidate that **least** looked capable of lasting several generations is the one that won — and it is precisely that multi-generation continuity which explains why it won."
- problem: The sentence is circular as written: durability explains the win, but the mechanism is never stated. It also restates the chapter's promise ("por que… o EUV") without adding content.
- fix: state the mechanism in one concrete clause, e.g. that EUV was the only surviving candidate that could be extended from node to node (same 13.5 nm, NA and multi-patterning carry it), whereas X-ray and EPL hit mask/throughput walls — all of which the chapter already shows.
- verification: verified by reading the surrounding sections; no new source needed.
- confidence: high

### historia-fotolitografia-09 — Verification steps that could not be completed
- where: docs/historia-fotolitografia.md:L39, L98, L104 (and docs/en/historia-fotolitografia.md: same)
- category: source
- severity: minor
- quote: "Em **1978**, a GCA lançou o **DSW 4800**… A Nikon lançou seu primeiro stepper comercial em 1980."; "**US\$ 250 milhões em três anos** (US\$ 130 milhões em dinheiro e US\$ 120 milhões em equipamento…)" <Cite id="intel-euvllc" />; "cerca de **US\$ 2 bilhões** foram investidos em toda a cadeia" <Cite id="asianometry-euv" />
- problem: The Kato chronology PDF returned binary through the fetch tool (so the 1960/1973/1978/1980/1990 dates rest on the citation record), the Intel 1997 press release returns "Access Denied" (so the 130/120 split is unchecked), the DOI for Lin's paper is blocked, and the US$ 2 billion for 157 nm exists only in the video.
- fix: check these against local copies: Kato_Litho_History.pdf (lithoguru.com URL in `citations.ts`), the Intel press release (web.archive.org snapshot of the 1997 CN091197 release), and the Asianometry video for the 157 nm figure; add a proper citation for the 157 nm number if the video states it.
- verification: needs external verification (URLs recorded; fetch tool blocked on the first two).
- confidence: high (that the checks are outstanding)

### historia-fotolitografia-10 — idea: an elimination diagram for "A decisão do século"
- where: docs/historia-fotolitografia.md:L68-74
- category: idea
- severity: idea
- quote: "## A decisão do século"
- problem: The chapter's pivotal section (Nov 1997 → Dec 1998 → Dec 1999/Sep 2000 → Aug 2001 → EPL's death) is a dense date paragraph with no figure, while the earlier, simpler material has one.
- fix: an own drawing: a five-step narrowing funnel with the dates and the candidates dropping out (direct-write 1997 → X-ray/IPL 1998 → EPL 2001 → EUV), captioned "Desenho do autor, a partir de International SEMATECH (NGL) e Asianometry"; the sources are already in the page.
- verification: no external source needed; follow AGENTS.md §Drawings.
- confidence: high

### historia-fotolitografia-11 — idea: Kinoshita's 1985 first projection and the 1989 "dawn of EUV" conference
- where: docs/historia-fotolitografia.md:L88-96
- category: idea
- severity: idea
- quote: "O EUV nasceu com outro nome."
- problem: The "de raio X mole a consórcio" section jumps from naming to the EUV LLC without the technical first light; the earliest multilayer-mirror results are the missing link.
- fix: add two or three sentences: Kinoshita's NTT group projected an image with multilayer mirrors in 1985, and the 1989 conference where Bell Labs' Tania Jewell saw the work is called the "dawn of EUV"; a Commons/public-domain photograph of the 1990s LLNL tool is already on the page, so text alone suffices.
- verification: verified source — Construction Physics, "How ASML Got EUV" (fetched; https://www.construction-physics.com/p/how-asml-got-euv), which is already cited as `construction-physics-euv`. If a second source is wanted, the CSET report (`cset-euv`) is the next check.
- confidence: high

### Coverage summary

- docs/fabricacao-wafers.md (+ en): spine present: no (intro sentence only, no ordered list; finding -01); 12 DiagramFigures + 4 embeds (no figure in "Corte em fatias"); `dataAsOf: 2025`; most worth fixing next: the 775 µm/as-cut thickness contradiction (-03), which also unblocks the slicing figure.
- docs/fotolitografia.md (+ en): spine present: no (three intro paragraphs, no list; finding -04); 12 DiagramFigures + 3 embeds; `dataAsOf: 2025` (consistent with the Dec 2025 Intel cite); most worth fixing next: the "TSMC was part of Philips" sentence (-01) — it is the only blocker and it sits in the first paragraph a reader sees.
- docs/historia-fotolitografia.md (+ en): spine present: no (intro sentence only; timeline carries part of the navigation); 3 DiagramFigures + 1 Mermaid timeline + 1 embed; no `dataAsOf` frontmatter (correct for this historical chapter); most worth fixing next: the IBM X-ray cost figure (-01), the one number on the page that another cited source contradicts.
## Report — docs/transistores.md, docs/na-fab.md, docs/insumos-fab.md (both locales)

### transistores

### transistores-01 — The GAAFET numbers are cited to a page that carries neither of them
- where: docs/transistores.md:L178 (and docs/en/transistores.md:L178; docs/.vitepress/theme/transistor-eras.ts:L180-184)
- category: source
- severity: major
- quote: "Samsung em massa no 3 nm (**MBCFET**, 2022); TSMC e Intel nos nós N2 e **18A (RibbonFET)** <Cite id="asml-gaa" />. Controle eletrostático superior, até **~40%** menos vazamento, largura de nanofolhas ajustável para performance vs. consumo." / "Samsung went to mass production at 3 nm (**MBCFET**, 2022); TSMC and Intel followed at the N2 and **18A (RibbonFET)** nodes <Cite id="asml-gaa" />. Superior electrostatic control, up to **~40%** less leakage, and nanosheet width tunable for performance vs. power."
- problem: The cited ASML explainer (fetched 2026-09-28) contains no leakage percentage and no Samsung production date; it still frames GAA as something "TSMC, Samsung and Intel have all announced they will be using in the coming years". The ~40% figure and the 2022 milestone therefore rest on a source that does not publish them. The same 40% string sits in the eras module and is rendered by the timeline and the facts chip.
- fix: Cite Samsung's own 3 nm GAA announcement (Samsung Newsroom, June 2022) for the milestone and a source that measures or claims the leakage number; if it is a vendor claim, say so. If no source carries ~40%, drop the number from the chapter and from the module.
- verification: verified — fetched the cited ASML page; it contains neither "40" nor a Samsung production date.
- confidence: high

### transistores-02 — BSPDN's ~11% and 10× have no citation, and the Intel release cited nearby does not mention PowerVia or RibbonFET
- where: docs/transistores.md:L190-192 (and docs/en/transistores.md:L190-192; transistor-eras.ts:L194-199 and L281-284)
- category: source
- severity: major
- quote: "…liberando camadas frontais para sinal, ~**11%** mais densidade e queda de tensão dinâmica (**IR drop**) até **10×** menor." / "…with ~**11%** more density and dynamic voltage drop (**IR drop**) up to **10×** lower."; the next sentence carries "<Cite id="intel-18a" />" on "o primeiro chip a combinar *PowerVia* e *RibbonFET*" / "the first chip to combine *PowerVia* and *RibbonFET*"
- problem: the numbers sit in a paragraph with no `<Cite>` anywhere, and the section's only citation, the CES 2026 Intel release (fetched 2026-09-28), announces Core Ultra Series 3 on 18A but contains neither "PowerVia" nor "RibbonFET" nor any density or IR-drop figure. Both the numbers and the "first to combine" claim are unsupported.
- fix: cite Intel's 18A/PowerVia technology page or the PowerVia paper that states the figures and label them as vendor claims; cite Intel's 18A page (not the CES release) for "first to combine PowerVia and RibbonFET"; mirror the change in `ERA_GAINS['2025/2026']`.
- verification: verified that the cited release lacks the names and numbers; needs external verification for which Intel source carries 11% / 10×.
- confidence: high (mismatch), medium (the correct source)

### transistores-03 — CFET's "up to ~50% less area" is cited to the forksheet article
- where: docs/transistores.md:L214 (and docs/en/transistores.md:L214; transistor-eras.ts:L224-225 and L289-292)
- category: source
- severity: major
- quote: "**CFET (Complementary FET)** empilha verticalmente NFET e PFET na mesma célula, reduzindo até **~50%** a área por porta lógica (inversores, SRAM), estendendo a Lei de Moore além de GAAFET convencional. … <Cite id="imec-forksheet" />" / "**CFET (Complementary FET)** stacks NFET and PFET vertically in the same cell, cutting the area per logic gate (inverters, SRAM) by up to **~50%** … <Cite id="imec-forksheet" />"
- problem: the cited imec article (fetched 2026-09-28) is about the outer-wall forksheet; its only area number is a 22% SRAM-cell reduction for that architecture, and it says of CFET only that mass production is feasible from A7. It does not state a ~50% CFET area figure.
- fix: cite an imec CFET research update or paper that gives the density/area benefit (imec publishes a CFET roadmap series) or restate the claim without the number; the same string must change in the module and its `ERA_GAINS`.
- verification: verified — fetched the cited article and searched for an area figure; the ~50% is absent.
- confidence: high

### transistores-04 — The addendum points at a table and a "Node" column the chapter no longer has
- where: docs/transistores.md:L218 and L242 (and docs/en/transistores.md:L218 and L242)
- category: structure
- severity: major
- quote: `A coluna "Nó" só corresponde a uma dimensão física real até meados dos anos 1990.` / "The “Node” column only corresponds to a real physical dimension up to the mid-1990s."; "…e é exatamente assim que eles devem ser lidos na tabela do início do capítulo." / "…and that is exactly how they should be read in the table at the top of the chapter."
- problem: the chapter has no table and no "Node" column. The recap table was replaced by the numbered spine list plus the `<TransistorFacts>` chip that opens each section — `theme/TransistorFacts.vue` says in its own comment "The table itself is gone". A reader sent to look for the column and the table finds neither.
- fix: rewrite both sentences around what is actually rendered (the node pill in the `<TransistorFacts>` line at the top of each section) or restore the table; change PT and EN in the same edit.
- verification: verified — no markdown table exists in either locale; the component comment documents the removal.
- confidence: high

### transistores-05 — SourceNote omits three sources the prose cites
- where: docs/transistores.md:L244 (and docs/en/transistores.md:L244)
- category: source
- severity: major
- quote: "<SourceNote :ids="['intel-4004', 'intel-chmos3', … 'itrs-1999', 'itrs-2001']" />" against prose citations "<Cite id="wikipedia-22nm" />" (L36), "<Cite id="intel-strain" />" (L116) and "<Cite id="asml-gaa" />" (L178)
- problem: an id-set diff of the two locales gives 32 ids cited and 29 listed; `wikipedia-22nm`, `intel-strain` and `asml-gaa` are dropped, while `na-fab` and `insumos-fab` list every id they cite. The chapter's own source list is incomplete even though `/referencias` still renders the entries.
- fix: append the three ids to both SourceNote lists (order is irrelevant); no `citations.ts` renumbering is needed.
- verification: verified by grep and set difference on both locales.
- confidence: high

### transistores-06 — Five PDF-extracted figures carry no author, file or licence
- where: docs/transistores.md:L118-128, L150, L174 (and docs/en/transistores.md: same lines)
- category: source
- severity: major
- quote: "<DiagramFigure src="/pdf-images/p15-1.png" alt="Malha de silício vs silício-germânio">Comparação de malhas: silício puro vs. SiGe como substrato para estresse.</DiagramFigure>" (same for p15-2, p16-1, p17-2, p18-1)
- problem: AGENTS.md §Sources requires third-party media to credit author, original file and licence in the `figcaption` with a link; these five images come out of `Resumo Chipmaking.pdf` through `scripts/extract-pdf-images.py` and none says where it came from or under what licence. The neighbouring drawing in `fotolitografia` shows the house style ("…— [ASML](https://www.asml.com/) <Cite id="asml-gaa" />"), and the new 1960 SVG in this same chapter adds "Desenhado pelo autor, a partir da ASML", so the contrast is visible. The first three match the material on the archived Intel strained-silicon page already cited as `intel-strain`.
- fix: locate each image inside the PDF and, for each, either credit author/original file/licence with a link (checking the licence on the source page) or mark it as the author's own drawing, as the 1960 caption now does.
- verification: needs external verification — open the PDF and each original source; do not assume the licence.
- confidence: high (the credits are absent), medium (the provenance)

### transistores-07 — Apple's A20 Pro is cited to TSMC's N2 page
- where: docs/transistores.md:L180 (and docs/en/transistores.md:L180; transistor-eras.ts:L182-184)
- category: source
- severity: major
- quote: "…com produção em volume no fim de 2025 e o **Apple A20 Pro** entre os primeiros grandes produtos <Cite id="tsmc-n2" />." / "…in volume production since late 2025, with the **Apple A20 Pro** among the first major products <Cite id="tsmc-n2" />."
- problem: the cited TSMC page (fetched 2026-09-28) supports the nanosheet description and "volume production in 4Q25", but it is a foundry technology page that names no customer and no Apple product; a foundry page cannot source an unannounced customer chip.
- fix: keep `tsmc-n2` for the N2/nanosheet/4Q25 facts and cite a report that identifies the A20 Pro on N2, or drop the product name.
- verification: verified that the cited page does not name the product; the product attribution needs a separate source.
- confidence: high

### transistores-08 — "Fifteen generations" in the module and the timeline, fourteen in the list
- where: docs/.vitepress/theme/transistor-eras.ts:L2, docs/linha-do-tempo.md:L27 (and docs/en/linha-do-tempo.md:L27)
- category: structure
- severity: major
- quote: "The fifteen transistor generations, with the figure that illustrates each one." / "As quinze gerações, cada uma com a estrutura do transistor e exemplos de produtos que a usaram." / "All fifteen generations, each with the transistor's structure and examples of the products that used it."
- problem: `ERAS` has 14 entries (1960 … Futuro) and both chapter spines list 14 eras, so the module docstring and the timeline page advertise a fifteenth generation that no consumer renders. This is the one place where the "one enumeration, one home" rule is restated outside `ERAS` and has drifted.
- fix: write fourteen in the module comment and in both locales of `linha-do-tempo`; if a generation is genuinely missing from `ERAS`, add the entry instead.
- verification: verified — counted the array entries and the spine items.
- confidence: high

### transistores-09 — Intel's strained-silicon 10–20% is attached to a page that prints no such figure
- where: docs/transistores.md:L116 (and docs/en/transistores.md:L116; transistor-eras.ts:L125-126 and L261-264)
- category: source
- severity: major
- quote: "estresse mecânico no canal (p.ex. Si sobre SiGe) aumenta espaçamento atômico e mobilidade em **10–20%** com custo marginal <Cite id="intel-strain" />" / "mechanical stress in the channel (e.g. Si on SiGe) increases atomic spacing and mobility by **10–20%** at marginal cost <Cite id="intel-strain" />"
- problem: the cited archived Intel page (fetched 2026-09-28) explains that strain stretches the Si atoms "by ~1%" and improves mobility and drive current, but contains no 10–20% figure; it also frames the payoff as drive current/performance rather than mobility. The chapter, the module description and `ERA_GAINS['2003']` all carry the same phrasing.
- fix: cite the number to a source that publishes it (Intel's 90 nm/Prescott release, already on the page as `intel-90nm`, or an IEDM paper) and phrase it as Intel's claimed drive-current gain; change the chapter and the module together.
- verification: verified the absence in the cited page; needs external verification for the exact Intel wording.
- confidence: high (absence), medium (correct figure)

### transistores-10 — The LDD's IBM origin has no citation
- where: docs/transistores.md:L74 and L82 (and docs/en/transistores.md:L74 and L82)
- category: source
- severity: minor
- quote: "A estrutura **LDD** (*Lightly Doped Drain*, IBM, 1980) intercala uma extensão pouco dopada…" / "The **LDD** structure (*Lightly Doped Drain*, IBM, 1980) inserts a lightly doped extension…"; "O conceito nasceu na IBM em **1980**…" / "The concept originated at IBM in **1980**…"
- problem: a year and an attribution are shipped with no marker; the paragraph's only citation is `motorola-ldd-patent`, a Motorola process patent, which is not the origin claim.
- fix: add the LDD's primary reference (Ogura et al., IBM, IEEE Electron Device Letters, 1980) as a new appended `citations.ts` entry after verifying the exact reference, or drop the year.
- verification: needs external verification of the reference before it is added.
- confidence: medium

### transistores-11 — FD-SOI's ~6 nm film and the 2015 phones have no citation
- where: docs/transistores.md:L162 and L156 (and docs/en/transistores.md: same)
- category: source
- severity: minor
- quote: "…retomando a ideia do SOI com um **filme de silício ultrafino** (~6 nm) sobre o óxido enterrado." / "…reviving the SOI idea with an **ultra-thin silicon film** (~6 nm) on top of the buried oxide."; "…o **Exynos 7420** (Galaxy S6) e o **Apple A9** (iPhone 6s) levaram o FinFET aos smartphones em 2015."
- problem: the FD-SOI paragraph carries no `<Cite>` at all, so the film thickness and the STMicroelectronics (28 nm) / GlobalFoundries (22FDX) platform claims are unsourced; the two phone models and their year are also uncited.
- fix: cite an FD-SOI process paper or a foundry 22FDX page for the film thickness and the platforms, and a launch reference for the two phones (or drop the models).
- verification: verified by reading both paragraphs; sources not identified in this pass.
- confidence: high

### transistores-12 — 25 nm here, 26 nm in the addendum, for the same device
- where: docs/transistores.md:L36 and L236 (and docs/en/transistores.md: same)
- category: fact
- severity: minor
- quote: "Para comparação, o “nó de 22 nm”, de 2011, tem portas da ordem de **25 nm** <Cite id="wikipedia-22nm" />" / "For comparison, the 2011 “22 nm” node has gates of the order of 25 nm <Cite id="wikipedia-22nm" />" against "os dispositivos tinham portas de **26 nm**, meio-passo de **40 nm** e aletas de **8 nm** <Cite id="ieee-node" />"
- problem: both sentences describe Intel's 22 nm FinFET. Wikipedia (fetched) says "a 25 nm gate length would be typical for the 22 nm node" — a node-typical statement; IEEE Spectrum (fetched) reports the measured device as 26 nm. The uncommitted edit introduced the 25 nm value, so the chapter now quotes two different gate lengths for the same transistor without saying why.
- fix: use 26 nm (the measured Intel value) in both places, or state the difference: "25 nm é o valor típico do nó; o FinFET da Intel media 26 nm".
- verification: verified — both cited sources fetched on 2026-09-28.
- confidence: high

### transistores-13 — "de 22 nm a 5 nm" contradicts the N3 FinFET caveat two sections later
- where: docs/transistores.md:L156 and L178-180 (and docs/en/transistores.md: same)
- category: fact
- severity: minor
- quote: "A arquitetura dominou os nós de 22 nm a 5 nm." / "The architecture dominated every node from 22 nm down to 5 nm." against "o **N3 da TSMC ainda era FinFET**" / "**TSMC's N3 was still FinFET**"
- problem: N3 is a 3 nm node and the chapter itself says it was FinFET, so the range ends one node too early; the reader meets two incompatible statements about the same fact in one chapter. The sentence before ("Em 3 nm e abaixo, FinFETs encontram limites") adds to the confusion.
- fix: "de 22 nm até o N3 (3 nm), com a Samsung a passar a GAA no 3 nm" / "from 22 nm down to N3 (3 nm), with Samsung moving to GAA at 3 nm".
- verification: verified internally, and TSMC's N2 page (fetched) confirms N3 is FinFET.
- confidence: high

### transistores-14 — The eras module puts the Exynos 2600 "on TSMC N2"
- where: docs/.vitepress/theme/transistor-eras.ts:L181-184 (rendered by `TransistorTimeline` on both locales of `linha-do-tempo`)
- category: fact
- severity: minor
- quote: "depois vieram o Exynos 2600 e o Apple A20 Pro, no N2 da TSMC." / "later came the Exynos 2600 and Apple's A20 Pro, on TSMC N2."
- problem: the Exynos 2600 is Samsung's own flagship SoC, built by Samsung Foundry on its 2 nm-class process, not on TSMC N2; only the A20 Pro is a TSMC N2 product. The chapter prose does not mention the Exynos, so the error is module-only and appears on `/linha-do-tempo`.
- fix: drop the Exynos 2600 from the N2 sentence or give it its own process node, after checking Samsung's launch material or a TechInsights teardown.
- verification: needs external verification — Samsung's Exynos 2600 announcement; no English Wikipedia article existed for the part at the time of this audit.
- confidence: medium

### transistores-15 — Gargini's quote is truncated without an ellipsis
- where: docs/transistores.md:L238 (and docs/en/transistores.md:L238)
- category: fact
- severity: minor
- quote: "não tinha mais absolutamente nenhum sentido, porque não dizia respeito a nenhuma dimensão que se pudesse encontrar no chip" / "had by then absolutely no meaning, because it had nothing to do with any dimension that you can find on the die"
- problem: the source sentence continues "…on the die that related to what you're really doing" (IEEE Spectrum, fetched). Quoting it as if it ended at "die" is a misquote of a named person; the PT truncates the same clause.
- fix: add an ellipsis before the closing quotation mark ("…that you can find on the die …") or quote the full clause, in both locales.
- verification: verified — the IEEE Spectrum article was fetched and the full sentence is there.
- confidence: high

### transistores-16 — The two ITRS quotations could not be checked in this pass
- where: docs/transistores.md:L230 (and docs/en/transistores.md:L230)
- category: source
- severity: minor
- quote: "o nó de tecnologia agora não é muito mais do que um rótulo simples para marcas de escala ainda meio convenientes ao longo desse caminho <Cite id="itrs-1999" />" / "technology node is now not much more than a simple label for still somewhat convenient ‘tick marks’ along this path"; "é definida pelo meio-passo do DRAM, e não pelo comprimento de porta do transistor nem pela dimensão mínima característica daquele nó <Cite id="itrs-2001" />"
- problem: both are presented as quotations from ITRS documents whose URLs are large PDFs that this pass did not open; the 2001 wording in particular reads like a paraphrase of the roadmap's definition rather than a sentence from it.
- fix: open `roadmap1999.pdf` and the 2001 Executive Summary, confirm the wording and a page number; if the sentences are not verbatim, convert them to indirect speech or quote what is.
- verification: needs external verification (the two cited PDFs).
- confidence: medium

### transistores-17 — "Em outras palavras" / "In other words" is on the banned list
- where: docs/transistores.md:L232 (and docs/en/transistores.md:L232)
- category: pacing
- severity: minor
- quote: "Em outras palavras: o número já não media o transistor." / "In other words, the number no longer measured the transistor."
- problem: AGENTS.md §Patterns to cut lists "In other words" as interpretive metadiscourse; the point is already clear from the preceding paragraph.
- fix: delete the phrase and let the sentence stand: "O número já não media o transistor. Media uma dimensão de memória…".
- verification: verified against the AGENTS.md list.
- confidence: high

### transistores-18 — The GAAFET paragraph drops into a verbless spec list, with an anglicism
- where: docs/transistores.md:L178 (and docs/en/transistores.md:L178)
- category: pacing
- severity: minor
- quote: "Controle eletrostático superior, até **~40%** menos vazamento, largura de nanofolhas ajustável para performance vs. consumo." / "Superior electrostatic control, up to **~40%** less leakage, and nanosheet width tunable for performance vs. power."
- problem: after five sections of explanatory prose this paragraph (and the BSPDN one after it) switches to a verbless spec list, which changes the register the reader has been in; "performance" is an anglicism where the chapter itself uses "desempenho" at L162.
- fix: write the sentence with a verb and the native PT term — "…e a largura das nanofolhas pode ser ajustada para privilegiar desempenho ou consumo." — and mirror the EN.
- verification: verified by reading the paragraph and grepping "performance"/"desempenho" in the PT chapters.
- confidence: high

### transistores-19 — PT groups thousands with a space where the site's own rule says a dot
- where: docs/transistores.md:L68 (and transistor-eras.ts:L68)
- category: parity
- severity: minor
- quote: "o **Intel 4004** (1971) saiu com 2 300 transistores numa pastilha de 12 mm²" against docs/dados.md:L23 "| 1971 | Intel 4004 | **2.300** | <Cite id="intel-4004" />"
- problem: AGENTS.md §The two locales says PT writes `1.700`; the chapter and the module (rendered on `/linha-do-tempo`) write "2 300" while `dados.md` writes "2.300" for the same quantity. `polissilicio.md` tables use the space form as well, so the rule and the site disagree — but two chapters printing the same number differently is the reader-visible part.
- fix: pick one (AGENTS.md says the dot), change `transistores.md` and `transistor-eras.ts`, and align the `polissilicio` tables in the same sweep if the rule is to hold.
- verification: verified by grep across `docs/**/*.md`.
- confidence: high

### transistores-20 — The polysilicon mermaid timeline on the linked page is out of order
- where: docs/linha-do-tempo.md:L12-21 (and docs/en/linha-do-tempo.md:L12-21) — outside this chapter pair; found while checking the enumeration's consumer
- category: fact
- severity: minor
- quote: "1995 : ~90% semicondutores … 2014 : Participação solar domina … 2004 : 11 plantas globais … 2010 : 61 plantas — sobreoferta"
- problem: a mermaid `timeline` renders in the order written, so the page draws 2014 before 2004 and 2010 in the very section the chapter sends readers to ("A linha do tempo reúne essas mesmas gerações…", transistores.md:L26), under the page's own "Visão cronológica dos temas centrais do site".
- fix: reorder the events to 1995, 2004, 2010, 2014 in both locales.
- verification: verified by reading the fence in both locales.
- confidence: high

### transistores-21 — idea: a node-versus-dimensions figure for the addendum
- where: docs/transistores.md:L216-242
- category: idea
- severity: idea
- quote: "Nenhuma dessas três medidas é 22." / "None of those three measurements is 22."
- problem: the addendum's central point — the node number stopped describing anything on the die — is argued only in prose, and the addendum is the one part of the chapter with no figure.
- fix: draw an own schematic (or a chart with a source series) with, per node, the gate length, half-pitch and fin width against the label: 130 nm → 70 nm gate; 22 nm → 26/40/8 nm. All values are already on the page from `ieee-node`; if drawn without data, mark it as a diagram in the caption.
- verification: verified — values already cited in the chapter.
- confidence: high (values), medium (which of the two 22 nm gate figures to plot — see transistores-12)

### transistores-22 — idea: one real image for the 4004 / 3708 story
- where: docs/transistores.md:L66-68
- category: idea
- severity: idea
- quote: "O primeiro produto comercial foi o **Fairchild 3708** (1968)…" / "The first commercial product was the **Fairchild 3708** (1968)…"
- problem: the silicon-gate story turns on two specific objects — the 3708 and the 4004 die — and both are described in words only, in a chapter where every other era has a structure figure.
- fix: look for a public-domain or CC BY / CC BY-SA photograph (a 4004 die shot from Wikimedia Commons, or a museum image with a compatible licence) and place it in this section; licence and file description must be checked before use, and the credit must name author, original file and licence in the figcaption.
- verification: needs external verification — Commons file description and licence for the candidate image.
- confidence: medium (a suitable, licence-clean image may not exist)

### transistores-23 — idea: the A10 cell-height numbers the forksheet section asserts in prose
- where: docs/transistores.md:L198-204
- category: idea
- severity: idea
- quote: "O resultado é uma célula padrão menor…" / "The result is a smaller standard cell…"
- problem: the cited imec article quantifies exactly this — 90 nm standard-cell height for the outer-wall forksheet at A10 against 115 nm for A14 nanosheet, plus the 22% SRAM-area reduction — and the chapter shows none of it.
- fix: add a small comparison figure (source `imec-forksheet`, already cited) or at least the two cell heights in the prose; if drawn as a chart it carries `sourceIds`, and the CSV export must be regenerated (AGENTS.md §Charts).
- verification: verified against the fetched imec article.
- confidence: high

### na-fab

### na-fab-01 — Copper "conducts about twice as well" contradicts the 40–45% in the same sentence
- where: docs/na-fab.md:L212 (and docs/en/na-fab.md:L212)
- category: fact
- severity: blocker
- quote: "O ganho não era cosmético: o cobre conduz cerca de **duas vezes** melhor que o alumínio, com resistência do fio cerca de **40 a 45% menor**, e a vida útil contra **eletromigração** mais de **duas ordens de grandeza** maior <Cite id="ibm-cu-electroplating" />." / "The gain was not cosmetic: copper conducts about **twice** as well as aluminium, with wire resistance about **40 to 45% lower**, and **electromigration** lifetime more than **two orders of magnitude** longer <Cite id="ibm-cu-electroplating" />."
- problem: 40–45% lower resistance is about 1.7–1.8× the conductance, not 2×; the cited IBM heritage page (fetched 2026-09-28) says "Copper wires conduct electricity with about 40% less resistance than aluminum" and gives no factor of two. Copper's resistivity (1.68 µΩ·cm) against aluminium (2.65 µΩ·cm) is ~1.6×, so the two clauses of the sentence cannot both be the same claim.
- fix: drop "duas vezes" and keep the resistance figure ("o cobre tem cerca de 40% menos resistência que o alumínio"), or state the conductance ratio as 1.6–1.8× with a source; mirror the EN.
- verification: verified — the IBM page was fetched and the arithmetic checked.
- confidence: high

### na-fab-02 — Heading typo: "A fábricação é um laço"
- where: docs/na-fab.md:L15 (EN is fine: docs/en/na-fab.md:L15)
- category: grammar
- severity: major
- quote: "## A fábricação é um laço"
- problem: "fábricação" is not a Portuguese word. It sits in an H2, so it appears in the table of contents, in the page outline and in search previews; it is the only occurrence in the chapter (grep for "fábricação" returns this line only).
- fix: "## A fabricação é um laço". The generated slug is unchanged for the current spelling, and no other page links to this fragment.
- verification: verified by reading the file and grepping the fragment across `docs/`.
- confidence: high

### na-fab-03 — Four of the nine spine items have no figure
- where: docs/na-fab.md:L23-31 (spine) and figures at L17, L100, L121, L151, L222 (and docs/en/na-fab.md: same)
- category: figure
- severity: major
- quote: "1. [Oxidação](#oxidacao-termica-o-silicio-fabricando-o-proprio-isolante) … 6. [Planarização](#planarizacao-apagar-o-relevo) … 7. [Metrologia](#metrologia-medir-para-poder-continuar)"; "Fora do laço, duas seções fecham o capítulo: [interconexão](…), …, e [rendimento](…)"
- problem: the chapter declares nine items and shows five figures; oxidação (L66-94), planarização (L175-185), metrologia (L187-206) and rendimento (L242-262) have none. AGENTS.md: "Every item of the spine needs a figure. A gap is a visible hole, not an economy." The four are the chapter's most quantitative sections, so the missing figures are the most telling ones.
- fix: add one figure per missing item — the cheapest are the Deal-Grove two-regime drawing for oxidation, a dishing/erosion sketch for planarisation, the measure → model → bounded-recipe-adjust loop for metrology and the yield curve for rendimento (see ideas na-fab-08/09/10).
- verification: verified by counting the figure components and the spine items.
- confidence: high

### na-fab-04 — "Vale reparar" / "It is worth noticing" is the banned phrase shape
- where: docs/na-fab.md:L165 (and docs/en/na-fab.md:L165)
- category: pacing
- severity: minor
- quote: "Vale reparar no que isso significa em escala." / "It is worth noticing what that means at scale."
- problem: AGENTS.md §Words to cut lists "it's worth noting"; the sentence also announces that the next one is interesting instead of letting the numbers do it.
- fix: delete the sentence and start the paragraph with the concrete claim: "Cada implantação é uma ida e volta completa: litografia, implantação, limpeza de fotoresiste, e normalmente uma metrologia para conferir."
- verification: verified against the AGENTS.md list.
- confidence: high

### na-fab-05 — The "not X, it is Y" contrast recurs
- where: docs/na-fab.md:L98, L101, L212, L262 (and docs/en/na-fab.md: same)
- category: pacing
- severity: minor
- quote: "o desafio não é só colocar a camada, é colocá-la com a espessura certa **em todas as superfícies**"; "A diferença entre os métodos não é a espessura que eles conseguem: é a espessura que eles conseguem **no fundo** da trincheira."; "O ganho não era cosmético"; "a vantagem competitiva não está em ter a receita certa, está em **chegar à receita certa mais rápido**" / "the difficulty is not only laying down the layer, it is laying it down with the right thickness…"
- problem: AGENTS.md §Patterns to cut bans the binary contrast as a pattern and asks to state Y; four in one chapter, two of them adjacent (L98 and L101) saying the same thing twice, read as a tic rather than emphasis.
- fix: keep at most the closing one (L262), which earns it; state the others positively — "o que separa os métodos é a espessura no fundo da trincheira".
- verification: verified by grepping the construction in both locales.
- confidence: high

### na-fab-06 — `dataAsOf: 2025` may be ahead of the newest datum
- where: docs/na-fab.md:L6 (and docs/en/na-fab.md:L6)
- category: fact
- severity: minor
- quote: "dataAsOf: 2025"
- problem: the newest datum I could date is the Lunar Lake TSMC N3 die analysis (2024); the rest of the sources run from 1964 to 2022 plus vendor pages with no date. AGENTS.md: the stamp is the year of the most recent datum cited, not the edit date.
- fix: date the imec roadmap article and the TechInsights post and set the field to the newest of them; if either is 2025, leave 2025.
- verification: needs external verification — publication dates of `imec-roadmap` and `techinsights-n3-beol`.
- confidence: medium

### na-fab-07 — Verification steps that could not be completed
- where: docs/na-fab.md:L80, L84, L133, L163, L238 (and docs/en/na-fab.md: same)
- category: source
- severity: minor
- quote: "de **700 a 1.300 °C**, de **0,1 a 1,0 atm**, e espessuras de **300 a 20.000 Å** <Cite id="deal-grove-1965" />"; "a solubilidade da água no SiO₂ a 1.000 °C é cerca de **600 vezes** a do O₂ <Cite id="tu-wien-oxidation" />"; "a máscara de **fotoresiste** aguenta uma seletividade de **150:1** e a de **óxido**, **450:1** <Cite id="bosch-drie" />"; "até **50.000 wafers por mês** … cerca de **20 implantadores** <Cite id="axcelis-implant" />"; "**20 camadas de interconexão metálica** <Cite id="techinsights-n3-beol" />"
- problem: these are the page's load-bearing numbers and none of their sources is readable in this pass (paywalled paper, thesis pages, vendor pages, a blog), so the audit could not confirm them. The internal arithmetic is consistent (600× is right for water against dry O₂ at 1000 °C; 50,000 wafers at 20–30 implants across 20 implanters is ~85–125 wafers/hour/machine), but consistency is not verification.
- fix: before shipping, open each source and confirm the figure: `deal-grove-1965` (DOI 10.1063/1.1713945) for the validated range, the TU Wien page for the solubility ratio, the Bosch DRIE page for the selectivity and aspect ratios, the Axcelis PDF for the implant counts, the TechInsights post for the 20 metal layers.
- verification: needs external verification (exact lookups listed).
- confidence: medium

### na-fab-08 — idea: draw the two Deal-Grove regimes
- where: docs/na-fab.md:L72-80
- category: idea
- severity: idea
- quote: "quando o óxido é fino … o crescimento é **linear** no tempo. Quando o óxido engrossa … o crescimento passa a ser **parabólico**, ou seja, desacelera" / "growth is **linear** in time … growth becomes **parabolic**, meaning it slows down"
- problem: the section's whole argument is a curve shape that the reader never sees; it is also the only spine item in the chapter with no figure at all.
- fix: draw the oxide thickness against time with the linear and parabolic regimes marked, as an own schematic based on the cited model; the caption must say it is a diagram, not data.
- verification: verified — the shape follows directly from the cited equation on the page.
- confidence: high

### na-fab-09 — idea: draw dishing and erosion, and the control loop
- where: docs/na-fab.md:L185 and L200-206
- category: idea
- severity: idea
- quote: "Em áreas **largas** de metal, o material afunda: é o **dishing**. Em áreas **densas**, o dielétrico entre os fios se desgasta mais rápido que o metal: é a **erosão**" / "In **wide** metal areas the material sinks: that is **dishing**. In **dense** areas the dielectric between wires wears faster than the metal: that is **erosion**"
- problem: two named, easily drawn defects are described in words only, and the run-to-run section's "measuring, updating the model, adjusting the next lot's recipe" is a loop that no figure shows.
- fix: one two-panel drawing of dishing and erosion across a metal/dielectric cross-section (own schematic, from `cmp-history`), and one small loop diagram (measure → compare with model → bounded recipe adjustment → next lot) from `r2r-control`; put one in each section.
- verification: verified — both descriptions are on the page.
- confidence: high

### na-fab-10 — idea: show the yield curve the chapter computes in prose
- where: docs/na-fab.md:L246-254
- category: idea
- severity: idea
- quote: "O modelo mais simples supõe que os defeitos se distribuem aleatoriamente … o rendimento cai exponencialmente com a área: $$Y = e^{-D_0 A}$$"
- problem: the chapter's only equation is followed by a claim — "a binomial negativa, mais fácil de manipular e mais aderente aos dados reais" — that the reader cannot see; the `/dados` page already renders the Poisson curve (`yield-vs-area`, CSV in `docs/public/data/`), so the material exists.
- fix: either embed the existing chart here inside `<ClientOnly>` or draw Poisson against negative binomial for one defect density; if a new series is added it must live in `theme/charts/specs.ts`, cite `sourceIds` and be exported to the CSV.
- verification: verified — chart and CSV already exist for the Poisson case.
- confidence: high

### insumos-fab

### insumos-fab-01 — The EN link points at the Portuguese anchor
- where: docs/en/insumos-fab.md:L29 (PT is correct: docs/insumos-fab.md:L29)
- category: link
- severity: blocker
- quote: "[Chemical-mechanical planarisation](/en/fabricacao-wafers#polimento-quimico-mecanico-cmp)" against the target heading "## Chemical-mechanical polishing (CMP)" (docs/en/fabricacao-wafers.md:L137)
- problem: VitePress slugs the EN heading to `chemical-mechanical-polishing-cmp`; the file carries no explicit `{#id}`, so the fragment never resolves and the reader lands at the top of the page.
- fix: use `/en/fabricacao-wafers#chemical-mechanical-polishing-cmp`.
- verification: verified — the slugify rule (accents stripped, punctuation to hyphens) and a grep for an explicit anchor in the EN page (none).
- confidence: high

### insumos-fab-02 — No spine: the six sections are never listed
- where: docs/insumos-fab.md:L9-11 (and docs/en/insumos-fab.md:L9-11)
- category: structure
- severity: major
- quote: "Esta página trata dos insumos que não são silício, mas que decidem se o silício vira produto." / "This page is about the inputs that are not silicon but decide whether silicon becomes a product."
- problem: every other chapter audited here opens with the ordered list of what it explains (sentence, list, closing sentence); here two intro paragraphs are followed straight by "## O fotorresiste", so the reader gets no map of the six inputs and cannot check the chapter's coverage against a declared promise.
- fix: after L11 add the numbered list of the six H2s (o fotorresiste, a máscara, o slurry do CMP, gases e neônio, água ultrapura, por que essa lista é um gargalo) and the closing sentence saying the rest follows that order; the sections themselves are already in a sensible order.
- verification: verified by reading the chapter and comparing with `na-fab` and `transistores`.
- confidence: high

### insumos-fab-03 — No figure anywhere in the chapter
- where: docs/insumos-fab.md:L13-51 (and docs/en/insumos-fab.md:L13-51)
- category: figure
- severity: major
- quote: "## O fotorresiste: amplificação química … ## A máscara, que também é óptica … ## Água ultrapura"
- problem: six sections, no `<DiagramFigure>`, `<ZoomableImage>`, chart or mermaid fence anywhere in the file (confirmed against the built page: zero content images). AGENTS.md requires a figure per spine item, and the concepts that most need one — the acid-catalysed cascade and the multilayer EUV mirror with a buried defect — are exactly the ones described only in words.
- fix: add at least two drawings (ideas insumos-fab-08/09) as own SVGs in `docs/public/assets/`, with `<title>`/`<desc>`, an opaque background rect and English labels, then run `python scripts/audit-svgs.py`.
- verification: verified — file read in full and the built page checked for `<img>`.
- confidence: high

### insumos-fab-04 — `dataAsOf: 2026` is ahead of the newest datum
- where: docs/insumos-fab.md:L4 (and docs/en/insumos-fab.md:L4)
- category: fact
- severity: minor
- quote: "dataAsOf: 2026"
- problem: the newest datum cited is the 2022 neon episode (`fabm-neon-2022`); everything else is 1983–2017 plus an undated SEMI standard. The stamp is meant to be the year of the most recent datum, not the edit year, and 2026 tells the reader the neon figures are current.
- fix: set 2022, or add a newer source and keep 2026.
- verification: verified against the `citations.ts` entries for the page's seven ids.
- confidence: high

### insumos-fab-05 — EN reads "is in [in the fab]"
- where: docs/en/insumos-fab.md:L31
- category: grammar
- severity: minor
- quote: "The history of the process, including the change of abrasives and the move from aluminium to copper, is in [in the fab](/en/na-fab) <Cite id="cmp-history" />."
- problem: the link label is the chapter title ("In the fab"), so the sentence renders as "is in in the fab"; the PT does not have the problem ("está em [na fab](/na-fab)").
- fix: "…is covered in [In the fab](/en/na-fab)".
- verification: verified by reading the rendered link text.
- confidence: high

### insumos-fab-06 — The pointer promises content na-fab does not carry
- where: docs/insumos-fab.md:L31 (and docs/en/insumos-fab.md:L31)
- category: link
- severity: minor
- quote: "A história do processo, com a troca de abrasivos e a passagem do alumínio ao cobre, está em [na fab](/na-fab) <Cite id="cmp-history" />."
- problem: `na-fab`'s planarização section (L183-185) covers the IBM entry and the 0.35 µm adoption but says nothing about changing abrasives; the aluminium-to-copper move lives in the interconnection section (L212-226), not under CMP. A reader following the pointer finds only half of what was promised.
- fix: either add the abrasive change to `na-fab`'s CMP section or trim the promise ("A história do processo, do alumínio ao cobre, está em [na fab]…" plus a sentence pointing at the interconnection section).
- verification: verified by reading both chapters' CMP sections.
- confidence: high

### insumos-fab-07 — The CMP slurry is explained twice, in two chapters
- where: docs/insumos-fab.md:L29 and docs/na-fab.md:L181 (and the EN files at the same lines)
- category: structure
- severity: minor
- quote: "O **slurry** é uma suspensão de partículas abrasivas em uma solução que ataca quimicamente a superfície, de modo que o material é primeiro enfraquecido por reação e depois removido mecanicamente <Cite id="runnels-1994" />." against "O wafer é pressionado contra um pad giratório com uma **suspensão** de partículas abrasivas e reagentes, e o relevo vai embora <Cite id="amat-cmp" />."
- problem: the two chapters define the same mechanism at the same level of detail, with two different sources; they agree today, but only one chapter should own the description or the two will drift on the next edit.
- fix: keep the definition in `insumos-fab` (the consumables page) and have `na-fab`'s planarização point there — the SeeAlso already links the two chapters — or vice versa; do not leave both wordings.
- verification: verified by reading both.
- confidence: high

### insumos-fab-08 — "the most intimate input" reads odd in English
- where: docs/en/insumos-fab.md:L43 (PT at docs/insumos-fab.md:L43: "o insumo mais íntimo")
- category: grammar
- severity: minor
- quote: "Water is, by volume, the most intimate input of a fab — and the easiest to underestimate, because "water" suggests an ordinary resource."
- problem: "intimate input" is a literal rendering of "insumo mais íntimo"; in English the collocation suggests a personal relationship and stops the sentence. The PT phrase is fine.
- fix: "Water is, by volume, the largest input of a fab — and the easiest to underestimate…".
- verification: verified by reading the sentence in both locales.
- confidence: high

### insumos-fab-09 — Verification steps that could not be completed
- where: docs/insumos-fab.md:L35-45 (and docs/en/insumos-fab.md: same)
- category: source
- severity: minor
- quote: "O país respondia por **cerca de metade** do neônio mundial e por **90%** do neônio de grau semicondutor, produzido como subproduto da siderurgia <Cite id="fabm-neon-2022" />"; "resistividade da ordem de **18,2 MΩ·cm** a 25 °C e carbono orgânico total na casa das **partes por trilhão** <Cite id="fabm-upw" />"
- problem: `fabm-neon-2022` is a Wikipedia entry explicitly labelled a compilation (rule-compliant, and its numbers agree with the chokepoint chart and `gargalos`), but the underlying reports behind the 50%/90% pair were not checked; the UPW figures rest on `fabm-upw`, a SEMI standard with no URL in `citations.ts`, so the number cannot be opened from `/referencias`.
- fix: for the neon pair, open the reports the Wikipedia article cites and, if one is the origin of the pair, cite that report directly; for F63, add the standard's designation and revision (`SEMI F63-0212` or current) and, if a link is wanted, the SEMI store page.
- verification: needs external verification (the two lookups above).
- confidence: medium

### insumos-fab-10 — idea: a two-panel drawing for the resist and the EUV mask
- where: docs/insumos-fab.md:L13-25
- category: idea
- severity: idea
- quote: "o fóton gera um **catalisador ácido**, que por sua vez desencadeia centenas de reações em cascata na etapa de revelação" / "the photon generates an **acid catalyst**, which in turn unleashes hundreds of cascading reactions during development"; "o blank precisa chegar **livre de defeitos**" / "the blank has to arrive **defect-free**"
- problem: the chapter's two sharpest claims are mechanisms that only exist as words, in a chapter with no figure at all (finding insumos-fab-03).
- fix: one own schematic of chemical amplification (photon → acid → bake/develop cascade, contrast before and after) and one cross-section of the EUV mask (multilayer mirror, absorber, buried defect that prints on every wafer). Both drawn by the author from the cited material, captions noting they are diagrams; add them to `docs/public/assets/` following AGENTS.md §Drawings and run the SVG audit.
- verification: verified — both descriptions are on the page and the cited Asianometry material covers the mask.
- confidence: high

### insumos-fab-11 — idea: say that 18.2 MΩ·cm is the theoretical maximum for pure water
- where: docs/insumos-fab.md:L43
- category: idea
- severity: idea
- quote: "resistividade da ordem de **18,2 MΩ·cm** a 25 °C" / "resistivity around **18.2 MΩ·cm** at 25 °C"
- problem: the number is given as a spec without saying why it is that number; 18.2 MΩ·cm at 25 °C is the theoretical maximum resistivity of pure water (equal H⁺ and OH⁻ concentrations), which is exactly why the fab measures it in line as a contamination proxy.
- fix: add the one-clause explanation and a source — SEMI F63 itself (the page's existing `fabm-upw`) or a UPW handbook chapter — and give `fabm-upw` a URL or a designation so the reader can check it.
- verification: needs external verification of the wording in the standard before shipping the claim.
- confidence: medium

### Coverage summary

- transistores: spine present (14 linked eras, addendum last) | 16 figures in the chapter (11 own SVGs + 5 PDF-extracted images), plus the component-rendered timeline | dataAsOf: 2026 (fits the 2026 Intel launch and the H2 2026 TSMC plan) | most worth fixing next: the three numbers the cited sources do not carry (~40% GAA leakage, BSPDN 11%/10×, CFET ~50%) and the three ids missing from the SourceNote.
- na-fab: spine present (seven modules + two closing sections, L23-31) | 5 figures, with four spine items bare (oxidação, planarização, metrologia, rendimento) | dataAsOf: 2025 (verify; newest datum I could date is 2024) | most worth fixing next: the copper "twice as good" claim, which contradicts the 40% figure in the same sentence and the cited IBM page.
- insumos-fab: spine absent | 0 figures | dataAsOf: 2026 (should be 2022) | most worth fixing next: the EN link to `#polimento-quimico-mecanico-cmp`, which never resolves on the EN page, then the missing spine and the first two figures.
## Report — empacotamento, confiabilidade

### empacotamento

### empacotamento-01 — HBM4 density floor "4 GB" is not in the cited standard
- where: docs/empacotamento.md:L193 (and docs/en/empacotamento.md:L193)
- category: fact
- severity: blocker
- quote: PT "O padrão dobra a interface de **1.024 para 2.048 bits** e os canais de **16 para 32 por pilha**, com velocidade de até **8 Gb/s** e densidades de **4 a 64 GB** <Cite id=\"jedec-hbm4\" />."; EN "The standard doubles the interface from **1,024 to 2,048 bits** and the channels from **16 to 32 per stack**, with speeds up to **8 Gb/s** and densities from **4 to 64 GB** <Cite id=\"jedec-hbm4\" />."
- problem: the JEDEC HBM4 announcement, fetched in this audit, describes 24 Gb and 32 Gb dies in 4-, 8-, 12- and 16-high stacks with a 64 GB maximum per cube; the smallest stack derivable from those dies is 4-high × 24 Gb = 12 GB, so the "4 GB" floor has no basis in the cited marker, and the 64 GB ceiling comes from 16-high × 32 Gb. The sentence therefore ships a number the citation cannot support.
- fix: replace "4 a 64 GB" with the configurations the release lists (24 Gb / 32 Gb dies in 4/8/12/16-high stacks, i.e. roughly 12 to 64 GB per cube), or, if JESD270-4 itself defines a 4 GB configuration, state it inline (die density × stack height) so the number can be checked; do not invent the minimum.
- verification: needs external verification (JESD270-4; the April 2025 JEDEC press release fetched in this audit supports 24/32 Gb dies, 4/8/12/16-high stacks and a 64 GB maximum, but not 4 GB).
- confidence: medium

### empacotamento-02 — the chiplet-yield drawing contradicts the site's own yield chart by a factor of ten
- where: docs/empacotamento.md:L211 (and docs/en/empacotamento.md:L211); cross-file docs/.vitepress/theme/charts/specs.ts:L191-L203
- category: fact
- severity: major
- quote: figure alt text "um die único de 800 milímetros quadrados rende cerca de 45%, enquanto um chiplet de 200 milímetros quadrados rende cerca de 82%" (EN "a single 800 square millimetre die yields about 45%, while a 200 square millimetre chiplet yields about 82%")
- problem: 45% at 8 cm² and 82% at 2 cm² are exactly Poisson at D₀ = 0.1 cm⁻² (e^(−0.8) = 45%, e^(−0.2) = 82%). The site's `yield-vs-area` chart plots the series labelled `D₀ = 0,1` as 14% at A = 2 cm² (specs.ts:L198-201), which is e^(−2) — i.e. D₀ = 1.0 — even though its own axis reads Y = e^(−D₀A). The two pages therefore disagree tenfold about the same quantity; the `dados` audit (g6-panorama) already reports the same chart as a factor-of-ten error from the other side (dados-01).
- fix: correct `yield-vs-area` (its series labels or its plotted data) so the series labelled D₀ = 0.1 passes through 82% at 2 cm²; this chapter's drawing and prose (82% at 200 mm², 45% at 800 mm²) are the consistent pair and should not be bent to match the chart.
- verification: verified (internal arithmetic: −ln(Y)/A = 1.0 for the plotted 14%-series; the drawing matches e^(−0.1A) exactly; the chapter's 4 × 213 = 852 mm² ≈ +10% and 0.59× / 41% figures also check out).
- confidence: high

### empacotamento-03 — two spine items have no figure; two others only borrow one
- where: docs/empacotamento.md:L65-L89 and L271-L281 (and docs/en/empacotamento.md:L65-L89, L271-L281)
- category: structure
- severity: major
- quote: PT "2. [Fatiamento](#fatiamento-separar-os-dies) — separar os dies, e por que a lâmina deixa de servir." / "9. [Quanto vale](#quanto-vale-o-empacotamento) — o tamanho econômico dessa parte da cadeia."; EN "2. [Dicing](#dicing-separating-the-dies) — separating the dies, and why the blade stops working." / "9. [What it is worth](#what-packaging-is-worth) — the economic size of this part of the chain."
- problem: AGENTS.md requires a figure for every spine item. The page renders four section-level figures (wirebond-vs-flipchip, package-generations, hbm-bandwidth, chiplet-yield), one chapter-opening overview (back-end-flow) and one chart (binning-bins, inside item 8). Fatiamento (26 lines of blade, kerf and thin-wafer material) and Quanto vale have no figure at all; Teste de wafer appears only in the opening overview, and wire bonding only as the left panel of the flip-chip comparison, both figures placed for other sections.
- fix: give §Fatiamento a dicing schematic and §Quanto vale the value-split figure proposed in the ideas below; consider that the wire-bond half of the comparison figure already exists, so the cheapest repair for item 3 is a cross-reference in the caption (or leaving it, if the panel is accepted as coverage).
- verification: verified (count of rendered figures in the file: 5 `DiagramFigure` + 1 `DataChart`).
- confidence: high

### empacotamento-04 — "memorias empilhadas"
- where: docs/empacotamento.md:L79 (PT only)
- category: grammar
- severity: minor
- quote: "Em um wafer de **25 µm** de espessura (número que hoje é comum em memorias empilhadas)"
- problem: missing accent on "memorias"; the EN line ("stacked memory") is correct.
- fix: "memórias".
- verification: verified (spelling).
- confidence: high

### empacotamento-05 — PT "reduziu a prática um transistor" (missing crase)
- where: docs/empacotamento.md:L127 (and docs/en/empacotamento.md:L127)
- category: grammar
- severity: minor
- quote: PT "No **verão de 1962**, a empresa reduziu a prática um transistor flip-chip com conexões de solda"; EN "In the **summer of 1962**, the company reduced to practice a flip-chip transistor with solder connections"
- problem: "reduzir a prática" is the PT calque of "reduce to practice" and needs the crase ("reduzir à prática"); without it, "a prática" reads as a direct object and "um transistor" hangs. The EN sentence is correct.
- fix: "levou à prática um transistor flip-chip" (most idiomatic) or "reduziu à prática um transistor flip-chip".
- verification: verified (grammar).
- confidence: high

### empacotamento-06 — banned phrase "Vale registrar" / "It is worth noting"
- where: docs/empacotamento.md:L89 (and docs/en/empacotamento.md:L89)
- category: pacing
- severity: minor
- quote: PT "Vale registrar o quanto esse cuidado paga."; EN "It is worth noting how much this care pays."
- problem: "it's worth noting" is on the AGENTS.md list of phrases to cut; the sentence adds nothing before the study's numbers, which make the point.
- fix: delete the sentence and open the paragraph with "Um estudo clássico mostrou que…" / "A classic study showed that…".
- verification: verified (AGENTS.md word list).
- confidence: high

### empacotamento-07 — "Ou seja:" / "In other words:" metadiscourse
- where: docs/empacotamento.md:L111 (and docs/en/empacotamento.md:L111)
- category: pacing
- severity: minor
- quote: PT "Ou seja: a fiação não sobreviveu por inércia."; EN "In other words: wiring did not survive out of inertia."
- problem: interpretive metadiscourse plus a colon reveal in the same sentence, both banned constructions; the next sentence ("Ela ganhou uma faixa de aplicação muito mais larga…") already carries the point.
- fix: drop the sentence and let the next one open the paragraph with its subject restored ("A fiação ganhou uma faixa de aplicação muito mais larga…" / "Wire bonding won a much wider application band…").
- verification: verified.
- confidence: high

### empacotamento-08 — PT states the probe-card count as the chapter's claim, EN quotes it
- where: docs/empacotamento.md:L41 (and docs/en/empacotamento.md:L41)
- category: parity
- severity: minor
- quote: PT "e um cartão pode ter **literalmente alguns milhares de sondas**"; EN "and a card \"may have literally a couple of thousand probes\""
- problem: the EN file puts the number in Cadence's mouth, the PT file asserts it in the narrator's voice; PT also keeps "literalmente", an often-empty adverb, whereas EN's "literally" is inside the quotation and is the source's wording.
- fix: PT "um cartão pode ter alguns milhares de sondas" (or quote it as EN does, dropping "literalmente" from the site's own voice).
- verification: verified (side-by-side).
- confidence: high

### empacotamento-09 — EN BEOL link lost its anchor
- where: docs/empacotamento.md:L77 (and docs/en/empacotamento.md:L77)
- category: link
- severity: minor
- quote: PT "Os filmes *low-k* do [BEOL](/na-fab#interconexao-a-parte-do-chip-que-ninguem-ve) são mecanicamente frágeis"; EN "The *low-k* films of the [BEOL](/en/na-fab) are mechanically weak"
- problem: the PT link opens the "Interconexão" section of `/na-fab`; the EN link drops the anchor and lands at the top of a long page, even though the target heading exists ("## Interconnection: the part of the chip nobody sees", docs/en/na-fab.md:L208).
- fix: EN href `/en/na-fab#interconnection-the-part-of-the-chip-nobody-sees`.
- verification: verified (heading exists at docs/en/na-fab.md:L208).
- confidence: high

### empacotamento-10 — "fiação"/"wiring" drift against "ligação por fio"/"wire bonding"
- where: docs/empacotamento.md:L23, L93, L107, L109, L111, L115 (and docs/en/empacotamento.md same lines)
- category: parity
- severity: minor
- quote: PT heading "Por que a fiação ainda ganha"; EN "Why wiring still wins" (spine item 3: "Ligação por fio" / "Wire bonding")
- problem: the spine and the section titles call the technology "ligação por fio" / "wire bonding", then the body switches to "fiação" / "wiring". In PT-BR "fiação" reads first as building wiring; in EN "wiring" collides with the BEOL metal, used with that meaning at L215 ("rather than internal wiring").
- fix: pick one term per locale and use it in L93, L107, L109, L111 and L115 — PT "ligação por fio", EN "wire bonding".
- verification: verified (internal consistency).
- confidence: medium

### empacotamento-11 — the spine list has no closing sentence
- where: docs/empacotamento.md:L19-L31 (and docs/en/empacotamento.md:L19-L31)
- category: structure
- severity: minor
- quote: "A ordem do capítulo é a ordem da linha de produção:" / "The chapter's order is the production line's order:" (followed by the nine-item list, then straight into the first heading)
- problem: the contract asks for an intro sentence, the list, and a sentence saying the rest follows that order; the third element is missing in both locales.
- fix: add one short line after the list, e.g. "O capítulo segue essa ordem." / "The chapter follows that order."
- verification: verified (AGENTS.md §Chapters).
- confidence: high

### empacotamento-12 — the GF100 paragraph carries five citations and about fifteen numbers
- where: docs/empacotamento.md:L265 (and docs/en/empacotamento.md:L265)
- category: pacing
- severity: minor
- quote: "O caso levado ao extremo foi o **GF100** da Nvidia, em 2010: 3 bilhões de transistores em cerca de 530 mm², no 40 nm recém-estreado da TSMC." (the paragraph continues for eight more lines, with `<Cite id="semiaccurate-fermi-clusters" />`, `<Cite id="semiaccurate-fermi-yields" />`, `<Cite id="semiaccurate-fermi-silicon" />` and `<Cite id="semiaccurate-fermi-clocks" />`)
- problem: shipped configurations (480/448/352 cores, 16 clusters), Nvidia's yield denial, the 500 vs 750 MHz bin split, the 20% vs 10% clock miss and the GF110 follow-up all run together, so the reader cannot tell which numbers are Nvidia's claims and which are SemiAccurate's reporting.
- fix: split into two paragraphs — what shipped, then what was reported about yields and clocks — and keep one number per claim; the clock-to-target comparisons could also go into a small table.
- verification: verified (line and citation count at L265).
- confidence: high

### empacotamento-13 — reticle and 2×-interposer numbers rest on PDFs that could not be read
- where: docs/empacotamento.md:L155 and L207 (and docs/en/empacotamento.md:L155, L207)
- category: source
- severity: minor
- quote: "um interposer de **2× o retículo** (~1.700 mm²) … até **6 cubos de HBM**, **96 GB** de memória e **2,7 TB/s**"; "Uma exposição de litografia cobre no máximo cerca de **830 mm²**"
- problem: the TSMC/Broadcom release PDF and the ECTC CoWoS-S paper (DOI) both fetched as binary in this audit, so none of these numbers could be checked at the source. Internal checks hold — 830 × 3.3 ≈ 2.7 × 10³ mm² for CoWoS-S; 96 GB / 6 = 16 GB per cube, an HBM2E-era density; 2.7 TB/s ≈ 6 × 450 GB/s ≈ HBM2E per-stack bandwidth — so nothing looks wrong, but the figure is unverified here.
- fix: no edit now; read both documents before the next pass (the reticle figure is also the anchor of the chiplet arithmetic at L207 and of chiplet-yield.svg).
- verification: needs external verification (https://pr.tsmc.com/system/files/newspdf/THWQPGPGTH/NEWS_FILE_EN.pdf and doi.org/10.1109/ectc32696.2021.00028, both non-text in this audit).
- confidence: medium

### empacotamento-14 — advanced-packaging market size unverified
- where: docs/empacotamento.md:L279 (and docs/en/empacotamento.md:L279)
- category: source
- severity: minor
- quote: PT "movimentou cerca de **US\$ 46 bilhões em 2024** e caminha para **mais de US\$ 79 bilhões em 2030**"; EN "was worth about **US\$46 billion in 2024** and is heading for **more than US\$79 billion by 2030**"
- problem: the Yole page returned HTTP 403 in this audit, so the two figures (and whether they are the same statistic — market for advanced packaging, not equipment) could not be confirmed. The $ escaping is correct in both locales.
- fix: no edit now; verify against the Yole insight page or a Yole press release before the next pass.
- verification: needs external verification (https://www.yolegroup.com/strategy-insights/ai-fuels-the-future-of-advanced-packaging/, HTTP 403).
- confidence: medium

### empacotamento-15 — copper/gold material properties unverified against the cited paper's table
- where: docs/empacotamento.md:L103 (and docs/en/empacotamento.md:L103)
- category: source
- severity: minor
- quote: "a resistividade do cobre é **1,72×10⁻⁸ Ω·m** contra **2,2×10⁻⁸** do ouro; a dureza Vickers é **369** contra **216**; e o módulo de elasticidade é **130 GPa** contra **78**"
- problem: the fetched text of the cited Gold Bulletin paper does not include Table 1, where these three pairs would live; the values are textbook but could not be confirmed at the cited source, and nothing else on the page repeats them.
- fix: no edit now; verify Table 1 of the cited paper, or find a source that tabulates all three pairs and cite that instead (append to citations.ts, never renumber).
- verification: needs external verification (doi.org/10.1007/s13404-013-0087-8, Table 1, not in the fetched HTML).
- confidence: medium

### empacotamento-16 — UCIe "doubled the rates to 48 and 64 GT/s"
- where: docs/empacotamento.md:L225 (and docs/en/empacotamento.md:L225)
- category: fact
- severity: minor
- quote: PT "Em agosto de **2025**, a versão **3.0** dobrou as taxas para **48 e 64 GT/s**"; EN "In August **2025**, version **3.0** doubled the rates to **48 and 64 GT/s**"
- problem: doubling 32 GT/s gives 64, not 48; 48 is 1.5×, so "dobrou as taxas para 48 e 64" contradicts its own arithmetic. The cited release's title corroborates only the 64 GT/s maximum, and the intermediate rate and the "16 a 64 pistas" lane count (UCIe 1.0) are unverified: the Business Wire fetch failed and the consortium site's post URL returned 404 in this audit.
- fix: state only what the release confirms — "elevou a taxa máxima de 32 para 64 GT/s" / "raised the maximum rate from 32 to 64 GT/s" — and re-add 48 GT/s and the lane counts only after reading the specification or the release text.
- verification: needs external verification (Business Wire release of August 2025; fetch failed; citation title corroborates 64 GT/s only).
- confidence: medium

### empacotamento-17 — the HBM bandwidth figure plots values no source on the page is attached to
- where: docs/empacotamento.md:L189-L191 (and docs/en/empacotamento.md:L189-L191)
- category: source
- severity: minor
- quote: alt "de 128 gigabytes por segundo na primeira geração até cerca de 2.048 no HBM4 e 4.096 projetados para o HBM4E"; caption "Cada geração dobra algo: a taxa por pino, a largura da interface ou a contagem de canais."
- problem: the drawing shows 128, 256, 461, 819, 1,229, 2,048 and a projected 4,096 GB/s, but the page's `<Cite>` markers hang on the three-generation table only; HBM2E (461), HBM3E (1,229) and the HBM4E projection carry no source, and the figcaption names none, so a reader cannot tell where the extra four bars came from.
- fix: name the origin in the caption and attach the existing `rambus-hbm` / `semianalysis-hbm` markers if they carry the values; if neither does, append a citation for the roadmap (citations.ts, at the end) or trim the figure to the cited generations, keeping the projection explicitly labelled.
- verification: verified that the figcaption carries no source marker (page check); the plotted values themselves need external verification.
- confidence: medium

### empacotamento-18 — idea: a dicing schematic for §Fatiamento
- where: docs/empacotamento.md §Fatiamento (after L69)
- category: idea
- severity: idea
- quote: "A largura do corte, o **kerf**, não é a espessura da lâmina: é a espessura **mais o lascamento**."
- problem: none; this fills the figure gap found in empacotamento-03.
- fix: draw three panels — blade cross-section with kerf = blade + 2 × chipping (20 µm per side in silicon, 10 µm in glass), a 25 µm thin wafer with backside chipping, and stealth dicing with the laser focused inside the wafer. House annotation grammar (arrow marker, `.lead`/`.dim`, fixed colours), 960-wide viewBox, `<title>`/`<desc>` in English; own drawing, no licence needed.
- verification: verified (the numbers are in the prose at L69-L89 and already cited to ku-dicing-sop, disco-thin-wafer, hamamatsu-stealth).
- confidence: high

### empacotamento-19 — idea: a value-split figure for §Quanto vale
- where: docs/empacotamento.md §Quanto vale (after L275)
- category: idea
- severity: idea
- quote: "a montagem, teste e empacotamento (*ATP*) em cerca de **10% do valor de um chip pronto**, contra aproximadamente **45%** agregados pelas etapas de projeto e fabricação de front-end"
- problem: none; the section's whole argument is a proportion that exists only as prose.
- fix: a two-bar schematic (ATP ≈ 10% vs design + front-end ≈ 45% of finished-chip value, CSET), with the SIA/BCG 6% marked as the alternative estimate; own drawing, numbers already cited to cset-packaging, so no new source is required.
- verification: verified (numbers in prose at L275).
- confidence: high

### confiabilidade

### confiabilidade-01 — the chapter has no spine
- where: docs/confiabilidade.md:L9-L11 (and docs/en/confiabilidade.md:L9-L11)
- category: structure
- severity: major
- quote: "Os capítulos anteriores contam como um chip é feito. A [fábrica](/na-fab) constrói o transistor camada por camada … Confiabilidade não é uma medida isolada. É a **distribuição das falhas ao longo do tempo**"
- problem: the chapter opens with two prose paragraphs and never declares the ordered list of what it explains; the six H2 sections (curva da banheira, mecanismos de desgaste, quantificar a falha, erros suaves, qualificação, história de materiais) exist but are not announced, against the chapter contract ("one spine, declared at the start").
- fix: after L11, insert a one-sentence intro, an ordered list pointing at the existing sections (`#a-curva-da-banheira`, `#mecanismos-de-desgaste`, `#quantificar-a-falha`, `#erros-suaves`, `#qualificação`) and the closing sentence saying the chapter follows that order; EN mirrors it with the English anchors.
- verification: verified (AGENTS.md §Chapters; no ordered list anywhere above the first H2 heading).
- confidence: high

### confiabilidade-02 — `dataAsOf: 2026` has no 2026 datum behind it
- where: docs/confiabilidade.md:L4 (and docs/en/confiabilidade.md:L4)
- category: structure
- severity: major
- quote: "dataAsOf: 2026"
- problem: the newest datum the page cites is JESD85A (2021, citations.ts num 205) or AEC-Q100 Rev J1, whose revision year is not recorded in citations.ts; everything else is 1969-2012 (Black, Schroder, Hu, McPherson, May & Woods, Ziegler, Baumann, JEP122). Per AGENTS.md the stamp is the year of the most recent datum cited, not the edit year, and this is not one of the exempt pages.
- fix: verify the revision year of AEC-Q100 Rev J1 and set `dataAsOf` to the newest cited year (likely 2021-2024), or add a dated 2026 source if the chapter is meant to carry one; PT and EN change together.
- verification: needs external verification (AEC-Q100 Rev J1 revision date, http://www.aecouncil.com/files/Documents/AEC%20Q100-Rev%20J1.pdf, returned binary; the AEC document-index page also failed to load in this audit).
- confidence: medium

### confiabilidade-03 — binary contrasts and colon reveals open the chapter
- where: docs/confiabilidade.md:L11 and L35 (and docs/en/confiabilidade.md:L11, L35)
- category: pacing
- severity: major
- quote: PT "Confiabilidade não é uma medida isolada. É a **distribuição das falhas ao longo do tempo** — e essa distribuição quase nunca é uniforme." / "O desgaste de um chip não é fadiga mecânica: é química e física de interface, ocorrendo devagar e de forma **acumulativa**."; EN mirrors both.
- problem: both sentences are the "not X, it's Y" pattern AGENTS.md bans, and the second adds a colon reveal on top; one is the chapter's thesis sentence and the other is the wear-out definition, so the construction frames the whole chapter.
- fix: "Confiabilidade é a **distribuição das falhas ao longo do tempo** — e essa distribuição quase nunca é uniforme." and "O desgaste de um chip é química e física de interface, lento e **cumulativo**." EN mirrors both.
- verification: verified (AGENTS.md §Patterns to cut).
- confidence: high

### confiabilidade-04 — PT and EN state different comparisons at L82
- where: docs/confiabilidade.md:L82 (and docs/en/confiabilidade.md:L82)
- category: parity
- severity: major
- quote: PT "Escrever a meta em horas e a falha em FIT é o que permite comparar um chip de 1.000 unidades com o parque inteiro de um cliente."; EN "Writing the goal in hours and the failure in FIT is what lets you compare a single chip with a customer's entire installed base."
- problem: the locales do not say the same thing — PT compares "a chip of 1,000 units" (an unexplained figure that reads as a typo) with a customer's fleet, EN compares one chip with the fleet; only the EN sentence makes the FIT-vs-fleet argument the paragraph is building.
- fix: make both read the same: "comparar a taxa de um único componente com todo o parque instalado de um cliente" / "compare one component's rate with a customer's entire installed base" (drop the 1.000).
- verification: verified (side-by-side).
- confidence: high

### confiabilidade-05 — five sections share one figure
- where: docs/confiabilidade.md:L23-L25 (and docs/en/confiabilidade.md:L23-L25)
- category: figure
- severity: major
- quote: "<ClientOnly>\n  <DataChart chart=\"bathtub\" />\n</ClientOnly>"
- problem: the bathtub schematic is the chapter's only graphic; wear-out mechanisms render as a table, accelerated testing as two equations, and soft errors and qualification have neither figure nor table of their own. The chapter also has no spine yet, so this reads as six headings in text.
- fix: add at least one figure per remaining section — the ideas below propose an annotated bathtub, a soft-error contributions figure and a qualification-flow diagram.
- verification: verified (component count in the file: one `DataChart`, no `DiagramFigure`/`ZoomableImage`/Mermaid).
- confidence: high

### confiabilidade-06 — the EN bathtub chart renders a Portuguese axis label
- where: docs/.vitepress/theme/charts/specs.ts:L66, rendered at docs/en/confiabilidade.md:L24 (PT page unaffected in its wording)
- category: figure
- severity: major
- quote: specs.ts "labels: ['0', '', '', '', '', '', '', '', '', '10 anos']"; EN caption in specs.ts:L78 "The three regions of the bathtub curve — infant mortality, useful life and wear-out."
- problem: `ChartSpec.labels` is `Array<string | number>` (charts/types.ts:L39) and `DataChart.vue` passes it through untouched (DataChart.vue:L63), unlike `xLabel`/`yLabel`, which go through the `text()` helper; the English page therefore shows "10 anos" under an English caption. The same defect affects `chokepoint-share` and `pv-efficiency` (reported by the g6 audit), and the exported CSV keeps the Portuguese label too (docs/public/data/bathtub.csv:L11).
- fix: widen `labels` to accept `{ pt: string; en: string }` and resolve it in `DataChart.vue` the way the axis labels already are, then wrap this chart's labels; decide and document the CSV language in `scripts/export-chart-data.ts` and re-run it. Infrastructure fix, not a chapter edit.
- verification: verified (specs.ts:L66, types.ts:L39, DataChart.vue:L63, bathtub.csv:L11).
- confidence: high

### confiabilidade-07 — the bathtub time axis contradicts the prose's infant-mortality window
- where: docs/confiabilidade.md:L17 and specs.ts:L64-L66 (and docs/en/confiabilidade.md:L17)
- category: figure
- severity: minor
- quote: "Dura de algumas semanas a poucos meses" against x-axis labels ending "10 anos" and data `[100, 60, 32, 18, 12, 10, 11, 18, 45, 130]`
- problem: on a ten-year axis, the drawn decline occupies roughly the first third, so the schematic places infant mortality around two to three years, while the prose says weeks to months; the caption warns that the drawing is qualitative but the x labels are concrete, so the mismatch survives the caveat.
- fix: annotate the first segment as the weeks-to-months region, or break/compress the time axis (a break symbol before the flat region) so the schematic cannot be read as ten equal years.
- verification: verified (specs.ts data and labels).
- confidence: medium

### confiabilidade-08 — "Burn-in moves the infant mortality"
- where: docs/en/confiabilidade.md:L29 (PT "A queima mexe na **mortalidade infantil**.")
- category: grammar
- severity: minor
- quote: EN "Burn-in moves the **infant mortality**."; PT "A queima mexe na **mortalidade infantil**."
- problem: "moves" says the burn-in relocates the early failures, not that it consumes them; the section's argument is that burn-in trades yield to remove them before shipment.
- fix: EN "Burn-in acts on the **infant mortality**." (or "consumes"); PT "A queima ataca a mortalidade infantil." — both keep the sentence that follows ("Ela não faz nada pela região plana…") coherent.
- verification: verified.
- confidence: high

### confiabilidade-09 — "powered time" is not idiomatic
- where: docs/en/confiabilidade.md:L84 (PT "tempo ligado de um lado e tempo de calendário do outro")
- category: grammar
- severity: minor
- quote: "the two numbers coexist because they measure different things, powered time on one side and calendar time on the other"
- problem: "powered time" is a literal calque of "tempo ligado"; the customary term is "power-on time" (or "operating time").
- fix: "power-on time on one side and calendar time on the other".
- verification: verified.
- confidence: high

### confiabilidade-10 — the burn-in paragraph restates empacotamento almost verbatim
- where: docs/confiabilidade.md:L29 (and docs/en/confiabilidade.md:L29), compared with docs/empacotamento.md:L237-L239
- category: structure
- severity: minor
- quote: "Os componentes são submetidos a condições **no nível ou acima do máximo especificado**, com o objetivo de **estressar os defeitos para fora** antes do embarque <Cite id=\"mil-std-883\" />; na produção, isso acontece no componente já montado, tipicamente por **24 a 48 horas** <Cite id="semieng-burnin" />."
- problem: the mechanism, the 24-48 h, the yield-for-warranty trade and the thermal-runaway/ESD list repeat the packaging chapter's §A queima with the same three `<Cite>` markers, and the paragraph already links to `/empacotamento`; a reader who read the earlier chapter gets the same paragraph twice.
- fix: cut to two sentences — burn-in attacks the first region, and it trades yield for warranty cost — and leave the mechanism and the 24-48 h to the packaging chapter via the existing link; keep only what the reliability argument needs.
- verification: verified (side-by-side with docs/empacotamento.md:L237-L239).
- confidence: high

### confiabilidade-11 — the qualification numbers depend on one unreadable PDF (and JEP122 is closed)
- where: docs/confiabilidade.md:L56, L76, L84, L90, L115 and L74 (and docs/en/confiabilidade.md same lines)
- category: source
- severity: minor
- quote: "A AEC-Q100 fixa as constantes do exemplo: $E_a = 0{,}7$ eV e $k_B = 8{,}61733 \times 10^{-5}$ eV/K, chegando a uma duração de teste de **1.393 h** para o caso demonstrado"
- problem: the Grade 0 table (−40 °C to +150 °C), HTOL at 150 °C for 1,000 h, the 15-year / 12,000 h / 131,400 h profile, the Eₐ = 0.7 eV example and the "below 1 micron" HCI wording all trace to AEC-Q100 Rev J1, whose PDF fetched as binary in this audit; the n ≈ 2 and Eₐ 0.5-1.0 eV ranges trace to JEP122, which citations.ts deliberately leaves without a public URL (citations.ts:L1656-L1663), so it needs a JEDEC account. The internal checks that can be made hold (15 × 8,760 = 131,400; 12,000/131,400 ≈ 9% duty; k_B is the standard value), so nothing looks wrong — it is unverified, not suspect.
- fix: no edit now; verify the page's qualification numbers against the PDF before the next pass and record which revision was checked.
- verification: needs external verification (http://www.aecouncil.com/files/Documents/AEC%20Q100-Rev%20J1.pdf — non-text; JEP122 via JEDEC access).
- confidence: medium

### confiabilidade-12 — idea: annotate the bathtub regions with their mechanisms
- where: docs/confiabilidade.md §A curva da banheira (around L23)
- category: idea
- severity: idea
- quote: "O gráfico abaixo é um **esquema**, não um conjunto de dados: ele existe para fixar as três regiões na cabeça, não para ser medido."
- problem: none; the schematic currently carries no mechanism labels, and the mechanisms arrive 20 lines later as a table.
- fix: label the three regions in the drawing with their drivers (latent defects / random failures / wear-out: NBTI-PBTI, HCI, TDDB, electromigration) and the burn-in cut at the start; it can extend the existing `bathtub` spec or become an own SVG. This also softens confiabilidade-05.
- verification: verified (the mechanism names are already in the page's table at L37-L44).
- confidence: high

### confiabilidade-13 — idea: a soft-error contributions figure
- where: docs/confiabilidade.md §Erros suaves (around L94-L98)
- category: idea
- severity: idea
- quote: "não era só o encapsulamento. **Nêutrons de raios cósmicos** fazem o mesmo em nível do mar, e a taxa de erro **cresce com a altitude**"
- problem: none; the altitude claim is the section's most visual fact and has no figure.
- fix: a small schematic with the three sources (alpha from package traces, cosmic neutrons, and the third the Baumann paper names) and error rate vs altitude, drawn as a schematic without fabricated numbers unless a source is added; the section already cites May & Woods (1979), Ziegler & Lanford (1979) and Baumann (2001), so no new citation is needed for the qualitative shape.
- verification: verified (sources already cited at L94-L96); if a quantitative curve is wanted, the exact figure must come from the cited papers and the caption must say which.
- confidence: medium

### confiabilidade-14 — idea: a qualification-flow diagram for §Qualificação
- where: docs/confiabilidade.md §Qualificação (around L102-L115)
- category: idea
- severity: idea
- quote: "\"Confiável\" não é uma opinião; é um conjunto de ensaios que o fornecedor precisa passar antes de vender."
- problem: none; the section lists a table, HTOL and the covered mechanisms, but the reader never sees how the pieces order into a qualification.
- fix: a small flow schematic — grade selection → HTOL/ELFR-style stress at the grade temperature → failure analysis → FIT declaration per JESD85A — as an own drawing, with the box labels limited to terms already in the prose (AEC-Q100, HTOL, FIT, JESD85A); no new facts, so no new sources.
- verification: verified (all terms used in the section).
- confidence: high

### Coverage summary
- empacotamento — spine present: yes (nine anchored items; the closing sentence is missing, empacotamento-11); figures: 5 `DiagramFigure` + 1 `DataChart`, with §Fatiamento and §Quanto vale unillustrated (empacotamento-03); `dataAsOf: 2026`, supported by the April 2026 Macworld binning article and the iPhone 17e datum; charts verified against their CSVs and prose (`binning-bins`: 13 + 4 = 17% at ≥5.2 GHz on the 8700K, 29 + 50 = 79% at 5.1-5.2 GHz and none below 5.0 GHz on the 8086K; the HBM table matches hbm-bandwidth.svg for HBM2/3/4); the single thing most worth fixing next: the HBM4 "4 a 64 GB" floor (empacotamento-01).
- confiabilidade — spine present: no (confiabilidade-01); figures: 1 schematic chart (`bathtub`) + 1 mechanism table; `dataAsOf: 2026` with no 2026 datum cited (confiabilidade-02); chart and CSV agree with each other and with the prose except for the time-scale reading (confiabilidade-07), and the EN axis label leaks Portuguese (confiabilidade-06); the single thing most worth fixing next: write the spine, then set the stamp from the newest cited source.
## Report — celulas-solares, alem-do-silicio, precos-e-valor, gargalos, dados, linha-do-tempo

### celulas-solares

### celulas-solares-01 — The EN text reads the efficiency chart's bar groups wrong
- where: docs/en/celulas-solares.md:L137 (and docs/celulas-solares.md:L137)
- category: parity
- severity: major
- quote: PT: "A distância entre as duas primeiras barras do gráfico e as três últimas é o resumo da disputa do capítulo"; EN: "The gap between the first bar in that chart and the last three is this chapter's contest in miniature"
- problem: the `pv-efficiency` chart has five bars — commercial silicon module 24,9; lab mono-Si cell 27,9; lab perovskite cell 26,9; lab perovskite–silicon tandem 35; lab concentrator cell 47,6 (specs.ts:134-147, docs/public/data/pv-efficiency.csv). "The first bar" is the commercial module alone, so the EN drops the 27,9 % silicon lab cell, which is silicon and belongs in the first group; one bar plus three bars also leaves a fourth bar unaccounted for, and the sentence's point ("what you can buy today is silicon") is weakened.
- fix: change the EN to "The gap between the first two bars in that chart and the last three is this chapter's contest in miniature".
- verification: verified (spec `pv-efficiency` and its CSV list exactly five bars, in the order the PT sentence assumes).
- confidence: high

### celulas-solares-02 — `<SourceNote>` names Möller (2012) but no sentence in the chapter cites it
- where: docs/celulas-solares.md:L141 (and docs/en/celulas-solares.md:L141)
- category: source
- severity: major
- quote: "<SourceNote :ids="['saimm', 'moller-2012', 'itrpv-2024', 'lid-hallam', 'ga-transition', 'letid-ga', 'fraunhofer-pv-report', 'nrel-efficiency']" />" — no `<Cite id="moller-2012" />` exists anywhere in either file
- problem: the closing source list claims Möller (2012), *Silicon materials for solar cells* (citations.ts:61-67) as a source of the chapter, but nothing in the prose carries that marker; the only in-text uses of the key are in `fabricacao-wafers` (L87, both locales). Either a marker was lost in a rewrite or the id is stray, and both break "one marker, one claim" and misstate where the chapter's claims come from.
- fix: find the sentence Möller supports (likely in §Da célula ao módulo or §Texturização) and restore the `<Cite id="moller-2012" />` there, or remove the id from both SourceNote calls.
- verification: verified (grep for "moller-2012" across docs/: only `fabricacao-wafers` bodies and these two SourceNote lines).
- confidence: high

### celulas-solares-03 — The figure labels the wafer's p-type base as boron-doped, the opposite of what the chapter says
- where: docs/celulas-solares.md:L17-L18 and docs/en/celulas-solares.md:L17-L18 (drawing: docs/public/assets/solar-cell.svg:L2, L3, L72)
- category: figure
- severity: major
- quote: PT alt: "base p dopada com boro"; SVG label: `<text class="s" x="644" y="315">boron-doped wafer</text>`; chapter L57: "a fatia de lâminas dopadas com gálio saltou de cerca de **10% em 2019 para mais de 95% em 2021**, e a ITRPV já registrava o **desaparecimento do boro** como dopante tipo p em **2023**"
- problem: the cross-section opens the chapter as "a célula pronta" (the finished cell) and labels the base as boron-doped, while the page's own subsection says boron had disappeared as a p-type dopant by 2023 and gallium is what the industry uses. A reader who studies the figure first learns the opposite of the text that follows, and the drawing is stale relative to its own caption in both locales.
- fix: relabel the layer to "p-type base (gallium-doped)" / "base p (dopada com gálio)" — or the neutral "p-type wafer (boron or gallium)" — and update the `<title>`, `<desc>`, and both `alt` strings in the same edit; if the historical Al-BSF stack is the point, say so in the caption instead of the label.
- verification: verified (SVG text nodes and both alt attributes read; the switch is asserted at L57-L59 of both locales).
- confidence: high

### celulas-solares-04 — The freshness stamp says 2026 while the chapter's own scale/cost block is 2011 and the recent source has no edition year
- where: docs/celulas-solares.md:L6, L120, L124, L141 (and docs/en/celulas-solares.md:L6, L120, L124, L141)
- category: fact
- severity: major
- quote: "dataAsOf: 2026"; "São números de 2011 e envelheceram rápido — a produção anual hoje se mede em centenas de gigawatts, não em dezenas."; "Para o presente, a referência anual é o relatório do Fraunhofer ISE, que publica preço, eficiência e produção do setor em uma edição nova a cada ano"
- problem: the prose is honest about the 2011 block — it flags the age twice, which is what AGENTS.md § Reading aids asks for — but the stamp cannot be checked from the page: the `fraunhofer-pv-report` entry (citations.ts:1789-1796) records no year, and the prose writes only "o relatório mais recente" without naming the edition. Meanwhile the site's `dados` page (L71) still uses this chapter as the example of a page carrying 2011 figures, so a reader who opens the freshness stamp finds 2026 on the page the site itself calls outdated.
- fix: name the edition in the prose and in the citation title ("Photovoltaics Report, <year>") so the stamp is auditable against it; if the cited edition is not the current-year one, lower `dataAsOf` to the year of the newest datum actually cited (the ITRPV 2024 figure otherwise anchors it at 2024). Update the `dados` example in the same pass (see dados-04).
- verification: needs external verification (open https://www.ise.fraunhofer.de/en/publications/studies/photovoltaics-report.html, read the edition year on the cover of the current PDF, and compare with 26,7 %, 24,9 % and the payback/lifetime figures quoted).
- confidence: medium

### celulas-solares-05 — The 26,7 % learning rate cannot be reproduced from what is cited
- where: docs/celulas-solares.md:L128 (and docs/en/celulas-solares.md:L128)
- category: source
- severity: major
- quote: "O **preço do módulo** continua caindo a uma taxa de aprendizado publicada: cerca de **26,7%** de redução para cada **duplicação da produção acumulada** <Cite id="fraunhofer-pv-report" />"
- problem: a learning rate is a regression output, and it is quoted here to three significant digits, but neither the page nor the citation gives the edition, the figure number or the period the regression covers, so a reader cannot check it. Published PV learning rates I can recall sit around the low 20s per cent, which makes this worth verifying rather than assuming.
- fix: quote the edition's own value and add the edition year to the citation, or replace the number with the figure the cited edition actually prints; if the report publishes a range, write the range instead of a point.
- verification: needs external verification (read the "price learning curve for PV modules" slide in the current Photovoltaics Report; the repo's fetch of the PDF returned raw bytes, so the number must be read from the report page or the PDF in a reader). The same lookup settles the 35 % tandem and the ~4 €ct/kWh LCOE figures on L131/L137.
- confidence: medium

### celulas-solares-06 — A present-tense quantity with no marker
- where: docs/celulas-solares.md:L120 (and docs/en/celulas-solares.md:L120)
- category: source
- severity: minor
- quote: "a produção anual hoje se mede em centenas de gigawatts, não em dezenas"
- problem: a claim about the present with no `<Cite>`, on a chapter whose own rule — restated on `dados` L9 — is that no number enters the text without a source; the sentence also corrects the old figure with a not-X-but-Y contrast instead of stating the new value.
- fix: attach the marker already used two paragraphs below (`fraunhofer-pv-report`, which publishes annual production) and, if possible, give the number: "a produção anual passou de 10 GW em 2009 para X em <year> (ver a seção seguinte)".
- verification: verified (no `<Cite>` on that sentence in either locale).
- confidence: high

### celulas-solares-07 — 2011 process detail and a 2024 market statement are not reconciled in the texturing section
- where: docs/celulas-solares.md:L41 (and docs/en/celulas-solares.md:L41) against L13
- category: structure
- severity: minor
- quote: "Em wafers **multicristalinos** esse truque não funciona, porque a orientação muda de grão para grão; ali a textura é **mecânica** <Cite id="saimm" />" vs L13 "o wafer multicristalino deixou de ser produzido em massa <Cite id="itrpv-2024" />"
- problem: the multicrystalline branch is written in the present tense as live industry practice eleven lines after the chapter says multicrystalline wafers are no longer mass-produced; the reader cannot tell which half of the process description is history and which is current.
- fix: mark it once — "Em wafers multicristalinos (hoje quase inexistentes, ver a introdução) a textura era mecânica" — so the 2011 layer of the chapter is visibly labelled where it appears, not only at the end of the section that follows.
- verification: verified (both sentences are present in both locales).
- confidence: high

### celulas-solares-08 — The 97 %/3 % split is cited to a press release that may not carry it
- where: docs/celulas-solares.md:L13 (and docs/en/celulas-solares.md:L13)
- category: source
- severity: minor
- quote: "em **2023** respondia por cerca de **97%** do mercado fotovoltaico, contra **3%** das tecnologias de filme fino <Cite id="itrpv-2024" />"
- problem: the marker resolves to the ITRPV 2024 *press release* PDF (citations.ts:546-553), not to the roadmap itself; a release may or may not print the crystalline-versus-thin-film split, and the page already cites Fraunhofer for market figures.
- fix: check which of the two sources publishes the split and move the marker to it; if the number is a rounding of a Fraunhofer table, cite `fraunhofer-pv-report` and say so.
- verification: needs external verification (ITRPV 15th-edition press release, https://www.vdma.eu/documents/34570/16191053/2024-06-04+PR+VDMA+PV+ITRPV+2024+EN.pdf — the URL is live and the file metadata confirms the 2024-06-04 date, but the PDF text could not be extracted in this run; the Fraunhofer report also publishes the c-Si/thin-film split).
- confidence: medium

### celulas-solares-09 — The NREL sentence promises a chart and links to a bibliography
- where: docs/celulas-solares.md:L137 (and docs/en/celulas-solares.md:L137)
- category: link
- severity: minor
- quote: "Os recordes de célula única estão no gráfico comparativo do [NREL](/referencias)" / "Single-cell records are in the comparative chart from [NREL](/en/referencias)"
- problem: `/referencias` renders `<RefList />` (a numbered bibliography) and nothing else; the reader who clicks in search of the comparative chart lands on a list of sources. The NREL entry is there, but the object the sentence names is not.
- fix: point the link at https://www.nrel.gov/pv/cell-efficiency.html, or reword to "os recordes estão na entrada do NREL na [lista de referências](/referencias)"; same in EN.
- verification: verified (docs/referencias.md is a RefList page; grep finds NREL only in this chapter and in citations.ts).
- confidence: high

### celulas-solares-10 — Two lifetime figures forty lines apart, with no bridge
- where: docs/celulas-solares.md:L91 and L130 (and docs/en/celulas-solares.md:L91 and L130)
- category: fact
- severity: minor
- quote: "A vida útil do módulo é de **25 a 30 anos** <Cite id="saimm" />" vs "a vida útil assumida do sistema é de cerca de **20 anos** <Cite id="fraunhofer-pv-report" />"
- problem: the first is module service life from the 2011 source, the second is the lifetime the current report assumes in its levelised-cost arithmetic; nothing on the page says they are different quantities, so they read as a contradiction between the two halves of the chapter.
- fix: qualify the second — "a vida útil assumida nos cálculos do relatório é de cerca de 20 anos, contra os 25 a 30 de garantia típica do módulo" — and keep both markers.
- verification: verified (both sentences exist; only the module/system distinction, implicit in the nouns, separates them).
- confidence: high

### celulas-solares-11 — Four of the seven spine steps have no figure
- where: docs/celulas-solares.md:L15-L85 (and docs/en/celulas-solares.md:L15-L85)
- category: figure
- severity: minor
- quote: "4. [Isolamento de borda](#isolamento-de-borda) — cortar o curto entre as duas faces." and "6. [Metalização](#metalizacao) — os contatos, onde cada milímetro de prata é um milímetro sem luz."
- problem: the spine is seven steps; the chapter carries one `DiagramFigure` (the finished stack, L17) and one `DataChart` at the end. Texturização (pyramids versus mechanical texture), isolamento de borda (the edge short and the 2–5 µm etch), metalização (fingers, busbars, the area/resistance trade-off) and queima dos contatos (fire-through) are prose only; two of them are also the steps a reader is most likely to picture wrongly, since both are about geometry the text cannot show.
- fix: one own schematic covering texturing and edge isolation would close the biggest gap (pyramids + the shunted rim are both easy in the existing drawing grammar); the metallisation trade-off can be a dimension-line drawing reusing `.lead`/`.dim`.
- verification: verified (figure count by grep: one DiagramFigure, one ClientOnly chart per locale).
- confidence: high

### celulas-solares-12 — The chapter's thesis returns as a not-X-but-Y contrast, twice
- where: docs/celulas-solares.md:L109 and L120 (and docs/en/celulas-solares.md:L109 and L120)
- category: pacing
- severity: minor
- quote: "A vantagem do silício não está no átomo, e sim na cadeia industrial que existe em volta dele." / "Silicon's advantage is not in the atom, but in the industrial chain built around it."
- problem: AGENTS.md § Patterns to cut bans the binary contrast; here the same shape appears twice, and the second ("o silício ganha em escala e cadeia produtiva, não em física") follows a paragraph that has already demonstrated the point.
- fix: state the positive only ("O que o silício tem é a cadeia industrial construída em volta dele.") and drop the second instance to "o silício ganha em escala e cadeia produtiva." Keep at most one if the rhythm needs it.
- verification: verified (both sentences in both locales).
- confidence: medium

### celulas-solares-13 — Idea: a panel showing what replaced what in the cell stack
- where: docs/celulas-solares.md after L57 (and docs/en/celulas-solares.md after L57)
- category: idea
- severity: idea
- quote: "A saída foi trocar o dopante."
- problem: the boro→gálio switch and the Al-BSF→PERC→TOPCon sequence are the chapter's most consequential changes and exist only as prose; a two-panel drawing of the old and current stack would also let celulas-solares-03 be fixed by showing both bases side by side.
- fix: an own SVG with two panels sharing an axis, titles in `.pt`/`.t` per AGENTS.md § Drawings: left "Al-BSF (boro)", right "TOPCon (gálio)", with the layers and the passivation layer labelled, drawn from the layer sequence the chapter already describes. Licence check not needed (own schematic), but the caption must say the panels are not to scale.
- verification: needs external verification only for the exact layer stack of a current TOPCon cell (Fraunhofer ISE Photovoltaics Report, "cell concepts" slides).
- confidence: medium

### celulas-solares-14 — Idea: the 1954 Bell cell as a period photograph
- where: docs/celulas-solares.md § Uma história que começa antes dos semicondutores, L93-L99 (and docs/en/celulas-solares.md same)
- category: idea
- severity: idea
- quote: "A célula moderna nasce em **1954**, nos Bell Laboratories, com Chapin, Fuller e Pearson: silício com **6% de eficiência**"
- problem: the history section is four paragraphs of dates with no image; it is the only part of the chapter that could carry a public-domain photograph, and the freshness-stamp discussion would be helped by a picture that anchors "1954" visually.
- fix: a NASA/NREL archive photograph or the Bell Labs press image, with author, original file and licence in the `figcaption` and a link to the source page; check the file description before using it — several circulated "Bell solar cell" images are news-agency photographs, not public domain — and prefer the NREL image gallery or a US government work.
- verification: needs external verification (search the NREL image gallery and the Smithsonian/Computer History Museum collections; confirm the licence statement on the item page before the fixing agent adds it).
- confidence: low

### alem-do-silicio

### alem-do-silicio-01 — The sentence about the blue LED cannot be parsed in either locale
- where: docs/alem-do-silicio.md:L27 (and docs/en/alem-do-silicio.md:L27)
- category: grammar
- severity: major
- quote: PT: "E a mesma família de materiais resolveu um problema que o silício não resolve por física, e não por engenharia: **emitir luz azul**."; EN: "And the same material family solved a problem silicon cannot solve by physics rather than by engineering: **emitting blue light**."
- problem: as written, "não resolve por física, e não por engenharia" attaches two negative clauses to the verb "resolve" without saying what the contrast is about, and the English "cannot solve by physics rather than by engineering" is worse — it can be read as "solves it by physics, not engineering", the opposite of the intended meaning (silicon is blocked by a physical property, not by a lack of engineering).
- fix: rewrite both as one clause: PT "resolveu um problema que o silício não resolve por razões de física, não por falta de engenharia"; EN "solved a problem silicon cannot solve for reasons of physics, not for lack of engineering".
- verification: verified (the sentence is ambiguous in both files as read; no source issue at stake).
- confidence: high

### alem-do-silicio-02 — The chapter has no figures at all
- where: docs/alem-do-silicio.md:L13-L47 (and docs/en/alem-do-silicio.md:L13-L47)
- category: figure
- severity: major
- quote: "### Os vizinhos de banda larga" … "### As outras vidas do silício" … "### O que fica"
- problem: three sections and not one `DiagramFigure`, `ZoomableImage`, mermaid block or chart; AGENTS.md says every item of the spine needs a figure and calls a missing one "a visible hole, not an economy". The chapter's central comparison — the same device geometry at a wider band gap — is exactly the kind of thing a section already insists the reader imagine ("A consequência do gap maior é uma tensão de ruptura muito mais alta").
- fix: draw one own schematic comparing drift regions at equal breakdown voltage (silicon thick and lightly doped, 4H-SiC thin and heavily doped, the same blocking voltage), reusing the site's annotation grammar; add the existing `band-gap` chart reference in §Os vizinhos (`o-elemento-silicio` already hosts it) if a second figure is wanted without new art.
- verification: verified (grep: no figure component in either file).
- confidence: high

### alem-do-silicio-03 — A hyphenated coinage in the PT text
- where: docs/alem-do-silicio.md:L33
- category: grammar
- severity: minor
- quote: "moldável com precisão submicro-métrica"
- problem: the standard Portuguese form is `submicrométrico` (one prefix, no hyphen; Novo Acordo Ortográfico keeps hyphen only before `h`, vowels that would collide, or proper nouns). The current spelling also appears nowhere else in the repo.
- fix: write "precisão submicrométrica" (the EN "sub-micrometre precision" is fine as is, or "submicrometre").
- verification: verified (grep of docs/ finds "submicro-métrica" only here).
- confidence: high

### alem-do-silicio-04 — Three citation markers stacked on one sentence
- where: docs/alem-do-silicio.md:L15 (and docs/en/alem-do-silicio.md:L15)
- category: source
- severity: minor
- quote: "o silício tem **1,12 eV**, o carbeto de silício (4H-SiC) tem **3,26 eV** e o nitreto de gálio (GaN) tem **3,40 eV** <Cite id="elem-ioffe" /> <Cite id="wbg-ioffe-sic" /> <Cite id="wbg-ioffe-gan" />"
- problem: three markers in a row for three values make the mapping guesswork, against the rule "one marker, one claim"; the reader cannot tell which Ioffe page supports which gap, and a later edit can move one without anyone noticing, which is the failure mode the rule exists to prevent.
- fix: attach each marker to its own value ("o silício tem **1,12 eV** <Cite id="elem-ioffe" />, o carbeto…"), or split the sentence into three clauses.
- verification: verified (the three keys all resolve in citations.ts:1672-1741, so only the attribution is at issue).
- confidence: high

### alem-do-silicio-05 — Two quantitative claims without a source
- where: docs/alem-do-silicio.md:L35 and L37 (and docs/en/alem-do-silicio.md:L35 and L37)
- category: source
- severity: minor
- quote: "Todo telefone carrega dezenas deles." and "O sensor CMOS é, hoje, provavelmente o produto de silício mais numeroso do mundo."
- problem: the MEMS paragraph's only marker is `bosch-drie`, which the text itself ties to anisotropic/DRIE etching, not to the count of sensors per phone; the CMOS superlative has no marker at all and is one of the chapter's few "hoje" claims, on a page stamped 2026.
- fix: either attach a source (Yole/IC Insights ship-volume counts for MEMS and CMOS image sensors; the Bosch or ST MEMS product pages for the per-phone figure) or soften to an order of magnitude the cited page supports. Note the superlative is hedged with "provavelmente", which is not the same as cited.
- verification: needs external verification (a shipped-unit count for CMOS image sensors, e.g. Yole Développement or the trade press; there is no obvious primary count on the page or in citations.ts).
- confidence: medium

### alem-do-silicio-06 — The freshness stamp has no datum behind it
- where: docs/alem-do-silicio.md:L4 (and docs/en/alem-do-silicio.md:L4)
- category: fact
- severity: minor
- quote: "dataAsOf: 2026"
- problem: the page's newest dated facts are the 2014 Nobel prize and the 2014 Tosi et al. paper (citations.ts:1742-1757); the Ioffe tables and the CIAAW entry are undated reference pages, and nothing on the page comes from 2026. The stamp asserts a currency the chapter cannot show, which is the opposite of what AGENTS.md § Reading aids wants the stamp to do.
- fix: either drop the field for a chapter whose claims are material parameters rather than industry data, or tie the stamp to the newest dated source (2014) and say in the prose that the numbers are reference-book values, not measurements of a year; follow whatever `o-elemento-silicio` (also stamped 2026, also parameter-based) decides in the same pass so the two pages agree.
- verification: verified (frontmatter and the citations of both locales read; no 2025 or 2026 datum exists on the page).
- confidence: medium

### alem-do-silicio-07 — Idea: the MEMS structure as a drawing in the fab's own grammar
- where: docs/alem-do-silicio.md § As outras vidas do silício, L35 (and docs/en/alem-do-silicio.md same)
- category: idea
- severity: idea
- quote: "corrosão úmida **anisotrópica** … e corrosão profunda por plasma (**DRIE**), que escava trincheiras verticais <Cite id="bosch-drie" />"
- problem: the chapter asserts the two etch geometries in words and never shows the difference between them; that difference (the sloped ⟨111⟩ walls versus the vertical trench) is the whole reason the packaging chapter's TSV section and this one can exist, and it is a small drawing.
- fix: one own schematic, two panels sharing an axis: left, anisotropic wet etch into a (100) wafer with the 54,7° wall reaching the etch stop; right, a DRIE trench with vertical walls. The Bosch DRIE page and the classic Petersen figure show the geometry; the caption should note the angles are idealised and not to scale. Licence check not needed for an own schematic.
- verification: verified (nothing to check externally for an own drawing; only the 54,7° figure should be confirmed against a crystallography reference, e.g. the Miller-index section of `estrutura-wafers`).
- confidence: medium

### precos-e-valor

### precos-e-valor-01 — EN link points at a Portuguese anchor that does not exist
- where: docs/en/precos-e-valor.md:L42 (and docs/precos-e-valor.md:L42)
- category: link
- severity: blocker
- quote: EN: "in [crystal structure](/en/estrutura-wafers#quem-fabrica-os-wafers), where the round "60%" figure did not survive the data"; PT: "em [estrutura e tipos](/estrutura-wafers#quem-fabrica-os-wafers), onde a cifra redonda de "60%" não sobreviveu aos dados"
- problem: the EN heading is "## Who makes the wafers" (docs/en/estrutura-wafers.md:L118), so the anchor is `#who-makes-the-wafers`; the PT anchor copied into the EN file resolves to nothing and the reader is dropped at the top of the page. The same defect exists in docs/en/gargalos.md (L9 and L54) and docs/en/dados.md (L43), reported separately under those chapters.
- fix: replace the EN anchors: `#who-makes-the-wafers` here; in gargalos `#spruce-pine-where-the-quartz-is-pure-enough`, `#the-chinese-ascent`, `#who-makes-the-wafers`; in dados `#chiplets-dividing-in-order-to-yield`.
- verification: verified (headings extracted from both locales of estrutura-wafers, mineracao-mg-si, polissilicio and empacotamento and compared with every anchor used in the six chapter pairs).
- confidence: high

### precos-e-valor-02 — A price chapter with no price chart
- where: docs/precos-e-valor.md:L13-L52 (and docs/en/precos-e-valor.md:L13-L52)
- category: figure
- severity: major
- quote: "## A escada" … "O polissilício é o degrau da cadeia em que o preço se comporta como commodity, e por isso é o único em que se observa o ciclo inteiro em números públicos"
- problem: the chapter's whole subject is a series — 6,75 US\$/kg in June 2020, 39 US\$/kg in August 2022, a cell at ~1 US\$/Wp that becomes a module at ¥ 0,70/W — and none of it is plotted; the page has one table and no figure, while the series it names is already drawn as a line chart inside the `polysilicon-pork-cycle.svg` on the polysilicon chapter and described on the Bernreuter site.
- fix: add a `polysilicon-price` spec to `theme/charts/specs.ts` (a line chart of the spot price with the trough and peak annotated, `sourceIds: ['bernreuter-pork-cycle']`), which also regenerates `docs/public/data/polysilicon-price.csv` and lets `dados` list it; alternatively embed the existing pork-cycle SVG from `polissilicio` with a proper cross-reference. Note the AGENTS.md rule that a chart with data cites `sourceIds` and the caption repeats the citation.
- verification: verified (grep: no figure component, no chart, no mermaid in either file).
- confidence: high

### precos-e-valor-03 — The EN opening drops the PT's "virtue and limit" framing
- where: docs/en/precos-e-valor.md:L11 (and docs/precos-e-valor.md:L11)
- category: parity
- severity: minor
- quote: PT: "O exercício tem uma virtude e um limite. A virtude é que o preço é o resumo mais honesto de uma cadeia industrial: ele já embutiu energia, rendimento, capital e risco. O limite é que nem todos os degraus são públicos"; EN: "Price is the most honest summary of an industrial chain: it already contains energy, yield, capital and risk. Not every rung is public"
- problem: the PT sets up a two-part frame and then delivers both halves; the EN flattens it into two unrelated statements, losing the announced structure the rest of the section follows (the ladder, then the rung nobody publishes). The two locales then diverge in the reader's expectation of what the chapter is doing.
- fix: keep the frame in EN: "The exercise has one virtue and one limit. The virtue is that price is…; the limit is that not every rung is public."
- verification: verified (both paragraphs read side by side).
- confidence: high

### precos-e-valor-04 — A yen price inside a table column headed US$/Wp
- where: docs/precos-e-valor.md:L21 (and docs/en/precos-e-valor.md:L21)
- category: fact
- severity: minor
- quote: "| Módulo solar | US\$/Wp | **≈ 2** de silício cristalino (2011); **¥ 0,70/W** em 2025 | <Cite id="saimm" /> <Cite id="trendforce-2025" /> |"
- problem: the unit column says `US$/Wp` for a row whose 2025 value is in yuan per watt; the reader comparing rungs is comparing different currencies, and `¥` reads as the yen as easily as the yuan. The polysilicon chapter writes the same TrendForce projection as "**CNY 0,45/kg** … módulos a **CNY 0,70/W**" (docs/polissilicio.md:L308), so the site already has a clearer unit for it.
- fix: put the unit with the value inside the cell ("¥ 0,70/W (≈ 0,10 US\$/W)", "US\$ 1/Wp" style), or split the column into "unit" and "value"; write `CNY 0,70/W` to match `polissilicio` and note the year for the dollar value of the 2011 cell too.
- verification: verified (the row, the column header and the polissilicio sentence are all in the repo; the TrendForce projection itself is already cited on both pages).
- confidence: high

### precos-e-valor-05 — The learning-curve sentence compares a 2011 cell with a 2025 module and calls the driver physics
- where: docs/precos-e-valor.md:L36 (and docs/en/precos-e-valor.md:L36)
- category: fact
- severity: minor
- quote: "É a mesma física que fez a célula sair de cerca de **1 US\$/Wp** em 2011 para um módulo em torno de **¥ 0,70/W** em 2025 <Cite id="saimm" /> <Cite id="trendforce-2025" />."
- problem: the two endpoints are different products (a cell in 2011, a module in 2025) in different currencies, and the sentence presents them as one series; the causal clause called "physics" is economics (scale and learning), which the previous sentence already attributes to scale and efficiency. A reader with both pages open will read the cell-to-module comparison as an error.
- fix: compare like with like: "a célula, que se aproximava de US\$ 1/Wp em 2011, é hoje uma fração disso, e o módulo inteiro ficou em torno de CNY 0,70/W em 2025"; change "a mesma física" to "a mesma curva de aprendizado".
- verification: verified (both endpoints are on the page; the SAIMM 1 US\$/Wp is a cell price, the TrendForce 0,70 is a module price, per the two citations' titles and the polissilicio use of the same source).
- confidence: medium

### precos-e-valor-06 — Idea: the value split as a stacked bar
- where: docs/precos-e-valor.md:L23-L24 (and docs/en/precos-e-valor.md:L23-L24)
- category: idea
- severity: idea
- quote: "| Montagem, teste e empacotamento | % do valor do chip pronto | **cerca de 10%** (SIA/BCG estima **6%**) |"; "| Projeto + fabricação de front-end | % do valor do chip pronto | **cerca de 45%** |"
- problem: three rows of the ladder are percentages of the same whole and are read as three lines of text; the comparison (design+front-end 45, ATP ~10 or 6, material smaller still) is the chapter's answer to "where the money is" and would be one glance as a bar.
- fix: a two-bar stacked chart (CSET's split against the SIA/BCG variant) with `schematic: false` and `sourceIds: ['cset-packaging']` — but check first whether CSET's figures are shares of the same base, since the caption must not imply a breakdown that the source does not publish; if they are not comparable, keep it as text and cite the caveat instead.
- verification: needs external verification (CSET "Re-Shoring Advanced Semiconductor Packaging", p. of the value-added discussion: confirm the base of the 10 %/45 % and of the SIA/BCG 6 % before plotting them side by side).
- confidence: medium

### gargalos

### gargalos-01 — EN links carry three Portuguese anchors, all broken
- where: docs/en/gargalos.md:L9 and L54 (and docs/gargalos.md:L9, L54)
- category: link
- severity: blocker
- quote: EN L9: "the quartz from [Spruce Pine](/en/mineracao-mg-si#spruce-pine-onde-o-quartzo-e-puro-o-suficiente), [Chinese](/en/polissilicio#a-ascensao-chinesa) polysilicon, [Japanese](/en/estrutura-wafers#quem-fabrica-os-wafers), [single-source](/en/historia-fotolitografia) lithography"; EN L54: "[wafer fabrication](/en/estrutura-wafers#quem-fabrica-os-wafers)"
- problem: the EN headings are "Spruce Pine: where the quartz is pure enough", "The Chinese ascent" and "Who makes the wafers" (docs/en/mineracao-mg-si.md:L15, docs/en/polissilicio.md:L292, docs/en/estrutura-wafers.md:L118), so all three anchors resolve to nothing; the PT anchors in docs/gargalos.md are correct, which is how the copy survived review. An English reader clicking the page's opening inventory lands at the top of three chapters instead of the passage named.
- fix: use `#spruce-pine-where-the-quartz-is-pure-enough`, `#the-chinese-ascent` and `#who-makes-the-wafers` in the EN file; the same three-way defect exists in docs/en/precos-e-valor.md:L42 and docs/en/dados.md:L43.
- verification: verified (headings of the target pages extracted in both locales and compared with every anchor used in this chapter pair).
- confidence: high

### gargalos-02 — The 70–90 % quartz share is not on the page cited for it
- where: docs/gargalos.md:L21 (and docs/en/gargalos.md:L21)
- category: source
- severity: major
- quote: "| Quartzo de alta pureza (HPQ) | Spruce Pine, EUA (Sibelco e The Quartz Corp) | **70 a 90%** do quartzo de alta pureza do mundo |" with `<Cite id="sibelco-hpq" />` on L28
- problem: the marker resolves to Sibelco's high-purity quartz product page (citations.ts:386-393, https://www.sibelco.com/en/materials/high-purity-quartz). I fetched and read that page: it describes the IOTA grades, Spruce Pine, and the CZ crucible and photovoltaic uses, but it publishes no market share — the phrase "the world's highest quality quartz" is as close as it gets. The same claim with the same marker sits in docs/mineracao-mg-si.md:L17, and the chart's `chokepoint-share` row (specs.ts:96-113, "Quartzo HPQ — Spruce Pine", 70–90) rides on the same key, so the page's headline concentration figure has no primary source behind it.
- fix: replace the marker with a source that prints the share (a market study, USGS, or the SAIMM 2011 paper already cited as `saimm`, which discusses HPQ supply), or hedge the entry to what Sibelco supports ("praticamente todo o quartzo de alta pureza de grau eletrônico sai da região de Spruce Pine, segundo a própria fornecedora") and note in the caption that the range is an industry estimate without a single published tabulation. Fix `mineracao-mg-si` and the chart's `sourceIds` in the same pass.
- verification: verified (https://www.sibelco.com/en/materials/high-purity-quartz fetched and read in this run: no percentage appears).
- confidence: high

### gargalos-03 — The `chokepoint-share` chart renders Portuguese labels on the English page
- where: docs/en/gargalos.md:L15-L17 (and docs/celulas-solares EN for `pv-efficiency`; spec: docs/.vitepress/theme/charts/specs.ts:L95-L101)
- category: parity
- severity: major
- quote: spec labels: `'Quartzo HPQ — Spruce Pine', 'Polissilício — China', 'Wafers 300 mm — cinco maiores', 'Neônio grau semicondutor — Ucrânia', 'Litografia EUV — ASML'`; EN page renders them under the caption "What the leader of each stage holds, according to each row's own source…"
- problem: `ChartSpec.labels` is a plain `Array<string | number>` (charts/types.ts:38-39) and `DataChart.vue` passes it through untouched (L63), unlike `xLabel`/`yLabel`, which go through a `text({pt,en})` helper. Every chart whose category labels are words therefore shows Portuguese on `/en/…`: this one, plus `pv-efficiency` (celulas-solares EN, "Módulo de silício comercial…") and `bathtub` (confiabilidade EN, "10 anos"). The English reader gets an axis they cannot read while the caption around it is English.
- fix: widen `labels` to accept `Array<string | number | {pt: string; en: string}>` and resolve it in `DataChart.vue` the way the axis labels already are, then wrap the three affected charts' labels; keep the CSVs (`docs/public/data/*.csv`) in one language and say which in the export script, or export both.
- verification: verified (types.ts, DataChart.vue and specs.ts read; the three affected specs listed).
- confidence: high

### gargalos-04 — The page is called a map and has no map; two of its four sections have no figure
- where: docs/gargalos.md:L1-L56 (and docs/en/gargalos.md:L1-L56)
- category: figure
- severity: major
- quote: title "O mapa dos gargalos" / "The chokepoint map"; L34: "Gargalos visíveis geram política industrial, e os valores envolvidos são a medida do quanto cada governo levou o risco a sério."
- problem: the whole figure inventory is one bar chart plus the table; §O dinheiro da política (three programmes, three numbers) and §Por que a concentração não é acidente (three forces) are text only. The title promises a map of geography, and geography — Spruce Pine, Japan, Ukraine, the Netherlands, China — is exactly the one thing a reader cannot see: the bar chart plots shares, not places.
- fix: an own SVG world map with the six chokepoints marked and labelled (short English technical labels, `<title>`/`<desc>`, opaque background, per AGENTS.md § Drawings), placed in §O mapa next to the table; it also gives the policy bullets a place to point at.
- verification: verified (no `DiagramFigure`/`ZoomableImage`/mermaid in either file).
- confidence: high

### gargalos-05 — The six citation markers sit after the table, not with their rows
- where: docs/gargalos.md:L28 (and docs/en/gargalos.md:L28)
- category: source
- severity: minor
- quote: "<Cite id="sibelco-hpq" /> <Cite id="usgs-mcs" /> <Cite id="bernreuter-market" /> <Cite id="nikkei-wafer-share" /> <Cite id="asml-euv-products" /> <Cite id="fabm-neon-2022" />"
- problem: the markers are in row order, so the attribution is inferable, but nothing binds a marker to a row: the reader cannot click the number next to a claim, which is how every other table on the site works (see docs/dados.md:L23-L31, where each row carries its own `<Cite>`). The rule "one marker, one claim" is satisfied in spirit and not on the page, and a future row insertion will silently misalign them.
- fix: move each `<Cite>` into the row's `Concentração` cell, as `dados` does, and drop the trailing cluster.
- verification: verified (the table and the marker line read; the `dados` table shows the in-row pattern exists).
- confidence: high

### gargalos-06 — The table has six stages, the chart and CSV five, and nothing says why
- where: docs/gargalos.md:L19-L27 (and docs/en/gargalos.md:L19-L27)
- category: structure
- severity: minor
- quote: "| Silício metalúrgico (MG-Si) | China | **cerca de 70%** da produção mundial (2.300 de 3.300 mil t em 2023) | A carga dos fornos de refino a montante |"
- problem: `chokepoint-share` plots five stages (specs.ts:95-114; docs/public/data/chokepoint-share.csv has five rows) and the table lists six; MG-Si, the first refining step, is the one missing from the chart. The chart caption explains that the definitions differ between rows, but not that a row is absent, so a reader comparing chart and table finds a gap with no stated reason. The chart's own wafers row is also narrower than the table's ("Wafers 300 mm — cinco maiores" against "Wafers de silício"), which the caption does cover.
- fix: either add the MG-Si row to the spec and CSV (USGS publishes China's share and the world total, both already cited), or add a clause to the caption: "o MG-Si fica fora do gráfico porque a fonte publica a produção em toneladas, não uma participação entre líderes".
- verification: verified (spec, CSV and table compared row by row).
- confidence: high

### gargalos-07 — The closing paragraph turns the conclusion into a not-X-but-Y
- where: docs/gargalos.md:L56 (and docs/en/gargalos.md:L56)
- category: pacing
- severity: minor
- quote: "A conclusão não é que a cadeia seja frágil por descuido. É que ela foi **otimizada para custo** durante décadas, e a concentração é o resultado dessa otimização."
- problem: the pattern AGENTS.md § Patterns to cut calls a binary contrast, used as the chapter's final beat; the second sentence carries the whole point and needs no foil.
- fix: cut the first sentence and open with the assertion: "A cadeia foi **otimizada para custo** durante décadas, e a concentração é o resultado dessa otimização."
- verification: verified (both locales have the pair).
- confidence: high

### gargalos-08 — Idea: the qualification clock as a figure
- where: docs/gargalos.md after L40 (and docs/en/gargalos.md after L40)
- category: idea
- severity: idea
- quote: "Uma planta nova de wafer leva anos para ser qualificada, e a qualificação de um fornecedor por uma fab é, como este site já registrou, um processo de anos <Cite id="nikkei-wafer-share" />"
- problem: one of the chapter's three explanations for concentration ("qualificação é um ativo") is asserted and never shown; the claim that requalifying a supplier takes years is the mechanism that makes the chokepoints static, and the reader has nothing to picture.
- fix: a small timeline figure (own SVG) of a supplier qualification: sample wafers, reliability testing, process-of-record freeze, production release — with the duration labelled from whatever the Nikkei survey or the `estrutura-wafers` chapter can support, and the caption naming the source of the durations. If no published duration can be cited for each step, keep it a qualitative diagram and set `schematic: true`.
- verification: needs external verification (the duration figures would have to come from a source that tabulates qualification time; `nikkei-wafer-share` and the CSM survey cited in `na-fab` are the first places to look).
- confidence: low

### dados

### dados-01 — The yield chart's numbers contradict the formula printed next to it, by a factor of ten
- where: docs/dados.md:L37-L41 (and docs/en/dados.md:L37-L41); data: docs/public/data/yield-vs-area.csv and specs.ts:L191-211
- category: fact
- severity: blocker
- quote: "é o **modelo de Poisson** do rendimento, calculado a partir da equação que o capítulo de [na fab](/na-fab) apresenta, para cinco densidades de defeitos"; the chart's y-axis: "Rendimento Y = e^(−D₀A)" (specs.ts:196); `na-fab` prints the same equation ($Y = e^{-D_0 A}$) with "$D_0$ é a densidade de defeitos e $A$ a área do die"
- problem: the plotted values are consistent with Y = e^(−10·D₀·A), not e^(−D₀·A). Fitting each column: the series labelled "D₀ = 0,05 defeito/cm²" decays with an exponent of ≈0,5 per cm² (98 % at 0,05 cm², 78 % at 0,5, 61 % at 1, 37 % at 2 — all matching e^(−0,5A)); the column labelled "D₀ = 1" matches e^(−10A) (61 % at 0,05 where the formula gives 95 %, 1 % at 0,5 where the formula gives 61 %). So every series is the true curve for a defect density ten times its label, and the chart as published shows a much harsher yield than the equation it claims to evaluate.
- fix: rederive the CSV from e^(−D₀A) for the five densities as labelled (99,8 / 99,5 / 98,8 / 97,5 / 96,3 / 95,1 / 92,8 / 90,5 for D₀ = 0,05), or keep the curve and relabel the series "D₀ = 0,5; 1; 2,5; 5; 10 defeitos/cm²"; regenerate `docs/public/data/yield-vs-area.csv` with `scripts/export-chart-data.ts` in the same pass, and check `na-fab`'s D₀ values against whichever side is corrected.
- verification: verified (arithmetic on the repo's own CSV and spec: implied exponent per column computed point by point, constant within each column and equal to 10× the label).
- confidence: high

### dados-02 — EN link to the chiplets section uses the PT anchor
- where: docs/en/dados.md:L43 (and docs/dados.md:L43)
- category: link
- severity: blocker
- quote: EN: "[chiplets](/en/empacotamento#chiplets-dividir-para-render) instead of continuing to enlarge the monolithic die"
- problem: the EN heading is "## Chiplets: dividing in order to yield" (docs/en/empacotamento.md:L205), so the anchor copied from the PT file resolves to nothing; the reader lands at the top of the packaging chapter instead of the chiplets section the sentence is about.
- fix: use `#chiplets-dividing-in-order-to-yield`; fix the other three EN anchor defects in the same pass (docs/en/gargalos.md:L9, L54; docs/en/precos-e-valor.md:L42).
- verification: verified (heading extracted from docs/en/empacotamento.md and compared with the anchor).
- confidence: high

### dados-03 — "Doubling a die's area cuts yield by more than half" is false for the curves on the page
- where: docs/dados.md:L43 (and docs/en/dados.md:L43); same claim in the chart caption, specs.ts:L206-207
- category: fact
- severity: major
- quote: "Dobrar a área de um die derruba o rendimento **mais que pela metade**" / "Doubling a die's area cuts yield by **more than half**"; caption: "dobrar a área custa mais que o dobro em rendimento"
- problem: for the low defect densities the chart plots, doubling the area costs a few points, not half the yield: D₀ = 0,05 goes from 98 % to 95 % between 0,05 and 0,1 cm² and from 78 % to 61 % between 0,5 and 1 cm²; D₀ = 0,1 goes from 95 % to 90 %. Under the Poisson model the invariant statement is about cost, not yield: doubling the area multiplies the cost per *working* die by 2·e^(D₀A) > 2, and the yield loss exceeds half only when the starting yield is already below 50 % (which happens only in the chart's high-D₀ series). As written the sentence overstates the plotted evidence and will not survive a reader who checks the two leftmost curves.
- fix: rewrite to the statement the model supports — "Dobrar a área mais que dobra o custo por die bom, e a perda cresce com a densidade de defeitos" — in the prose, and align the caption in `specs.ts` ("o custo por die bom mais que dobra") in the same edit; if the yield-loss phrasing is wanted, qualify it ("quando o rendimento já está abaixo de 50 %").
- verification: verified (values read from docs/public/data/yield-vs-area.csv; the inequality 1−Y(2A) < 2(1−Y(A)) holds for every Y, since 1−Y² < 2−2Y).
- confidence: high

### dados-04 — The freshness rule is illustrated with examples the stamps contradict
- where: docs/dados.md:L71-L73 (and docs/en/dados.md:L71-L73)
- category: fact
- severity: major
- quote: "O capítulo de [células e módulos solares](/celulas-solares) usava, para a escala e o custo do setor, números de **2011** (que o próprio texto admite estarem defasados), enquanto [estrutura e tipos](/estrutura-wafers) cita dados do ano corrente."
- problem: two of the sentence's three facts no longer hold. (a) `celulas-solares` now carries `dataAsOf: 2026`, so the page named as the example of old data shows the newest stamp on the site. (b) `estrutura-wafers` is stamped 2025 and its market-share paragraph rests on a survey carried out in 2024 and published in September 2025 (citations.ts:442-449), so "dados do ano corrente" describes 2025, not 2026. The paragraph is the site's own explanation of the stamp, and a reader who follows it to check finds the stamps saying the opposite.
- fix: rewrite the example against the stamps as they are — name the Fraunhofer edition behind `celulas-solares` (see celulas-solares-04) and say plainly that its sector figures are 2011-based while its stamp is the year of the annual report; restate the second half as "enquanto [estrutura e tipos](/estrutura-wafers) cita um levantamento de 2024 publicado em 2025" or update the target page's own data. Also decide the stamp of this page itself: its newest datum is the Apple M4 (2024).
- verification: verified (frontmatter of both pages and the Nikkei citation entry read; the sentence is checked against them).
- confidence: high

### dados-05 — The in-fab chapter is named awkwardly in PT
- where: docs/dados.md:L37 (and docs/en/dados.md:L37)
- category: grammar
- severity: minor
- quote: "calculado a partir da equação que o capítulo de [na fab](/na-fab) apresenta"
- problem: "o capítulo de na fab" reads as a preposition plus a bare page title; the EN ("the [in the fab](/en/na-fab) chapter") is fine, so the PT is the odd one. The site's own SeeAlso uses the page title "Na fab" as a label, which is why the sentence is awkward rather than wrong.
- fix: "a partir da equação apresentada no capítulo [Na fab](/na-fab)".
- verification: verified (both locales read).
- confidence: high

### dados-06 — Idea: give the data hub the series the other chapters keep referring to
- where: docs/dados.md:L59-L65 (and docs/en/dados.md:L59-L65)
- category: idea
- severity: idea
- quote: "- [Contagem de transistores](/data/transistor-count.csv)" … the list of seven files
- problem: the list is complete for the seven charts that exist (all seven ids resolve in `specs.ts` and all seven CSVs exist in `docs/public/data/`), but the site quotes several series it never publishes: the polysilicon spot price (6,75 → 39 US\$/kg, cited twice), the Photovoltaics Report's price/learning series, and the wafer-market shares behind `chokepoint-share`'s 75 % row. The page's own promise — "para que qualquer leitor possa refazer a conta em vez de aceitar a conclusão" — stops where those start.
- fix: add specs for the polysilicon price cycle (a line chart from `bernreuter-pork-cycle`, which the page already cites) and, if the Fraunhofer edition allows redistribution, the module-price learning curve; both come with CSVs via the export script, and both fill the figure gap found in `precos-e-valor`.
- verification: verified (specs.ts has exactly seven charts; the polysilicon price and PV price series are cited in `precos-e-valor` and `polissilicio` and plotted nowhere).
- confidence: high

### linha-do-tempo

### linha-do-tempo-01 — "As quinze gerações" against a list of fourteen
- where: docs/linha-do-tempo.md:L27 (and docs/en/linha-do-tempo.md:L27)
- category: fact
- severity: blocker
- quote: "As quinze gerações, cada uma com a estrutura do transistor e exemplos de produtos que a usaram. O componente abaixo é gerado a partir da mesma lista que o capítulo de [evolução dos transistores](/transistores) usa, então a cronologia e o capítulo não podem divergir" / "All fifteen generations…"
- problem: the component is `<TransistorTimeline />`, which iterates `ERAS` from `theme/transistor-eras.ts` — fourteen entries (1960, 1963, 1968, 1985, 1995, 1998, 2003, 2007, 2011, 2012, 2022, 2025/2026, ~2029, Futuro). The chapter it points to numbers its list 1-14. So the page claims fifteen generations and then, in the same breath, promises that its count cannot diverge from the source list, which has fourteen.
- fix: change to "As quatorze gerações" / "All fourteen generations" in both locales. If the intent was to count a fifteenth (e.g. CFET as a separate era from the "Futuro" entry), fix `transistor-eras.ts` and the numbering in `transistores` instead — one enumeration, one home.
- verification: verified (`grep -c "year: '" docs/.vitepress/theme/transistor-eras.ts` = 14; `TransistorTimeline.vue` renders exactly `ERAS`; docs/transistores.md numbers its list 1-14).
- confidence: high

### linha-do-tempo-02 — The mermaid timeline runs out of chronological order
- where: docs/linha-do-tempo.md:L14-L20 (and docs/en/linha-do-tempo.md:L14-L20)
- category: fact
- severity: major
- quote: "1995 : ~90% semicondutores\n         : ~10% fotovoltaica\n    2014 : Participação solar domina\n         : Demanda ~18× vs 1995\n    2004 : 11 plantas globais\n    2010 : 61 plantas — sobreoferta"
- problem: mermaid's `timeline` renders periods in the order given, so the diagram reads 1995 → 2014 → 2004 → 2010: a chronology that goes back ten years in the middle. The two pairs come from two different tables in the polysilicon chapter (the demand inversion, L274-L283, and the plant count, L290), which is presumably how the order survived; on a page whose entire subject is chronology it is the kind of defect a reader notices immediately. Both locales carry it identically.
- fix: reorder the periods to 1995, 2004, 2010, 2014 — keeping each period's own lines together — and, if the pairing by theme matters, say so in the section prose rather than in the diagram's order.
- verification: verified (both mermaid blocks read; the numbers themselves were checked against docs/polissilicio.md:L274-L290 and match — 90 %/10 % in 1995, 18,4× growth to 2014, 11 plants in 2004, 61 in 2010).
- confidence: high

### linha-do-tempo-03 — The page ships numbers with no citation at all
- where: docs/linha-do-tempo.md:L12-L31 (and docs/en/linha-do-tempo.md:L12-L31)
- category: source
- severity: major
- quote: "1995 : ~90% semicondutores … 2014 : Participação solar domina … 2004 : 11 plantas globais … 2010 : 61 plantas — sobreoferta"; and the only source-adjacent sentence: "Mais contexto e gráficos Bernreuter em [Polissilício](/polissilicio)."
- problem: five numbers, no `<Cite>` and no `<SourceNote>`; the sentence that names Bernreuter is a link label, which none of the citation machinery reads. Because the numbers live inside a mermaid block they cannot carry a marker at all, so the page needs a prose sentence that does. The `dados` page states the site's rule as "cada página fecha com as fontes que usou" (L9), and this is the one chapter page that does not close with anything.
- fix: add one sentence under the diagram — "Os números do mercado vêm de Bernreuter Research, os mesmos do capítulo de [polissilício](/polissilicio) <Cite id="bernreuter" /> <Cite id="bernreuter-market" />" — using the two keys the polysilicon chapter already cites (docs/polissilicio.md:L274 for the 1995/2014 shares, L290 for the 2004/2010 plant counts), and optionally add a `<SourceNote>`; or narrow the `dados` claim so the exception is explicit.
- verification: verified (grep: no `Cite`, no `SourceNote` in either locale; both existing keys resolve, citations.ts:31-36 and 645-652).
- confidence: high

### linha-do-tempo-04 — The opening promise is wider than the page
- where: docs/linha-do-tempo.md:L8 (and docs/en/linha-do-tempo.md:L8)
- category: structure
- severity: minor
- quote: "Visão cronológica dos temas centrais do site. Detalhes completos nos capítulos linkados."
- problem: the page has two sections — the polysilicon market and the transistor generations — while the site's other chronologies (lithography, which has its own mermaid timeline in `historia-fotolitografia`; process nodes; packaging) are neither summarised nor linked. The frontmatter description is narrower and honest ("Marcos da indústria de polissilício e evolução arquitetônica dos transistores"), so the opening sentence is the mismatch.
- fix: either narrow the sentence to what the page covers, or add one line pointing at the lithography timeline ("a cronologia da litografia está em [história da fotolitografia](/historia-fotolitografia)") — cheap, and it makes the page live up to its title.
- verification: verified (section list and SeeAlso targets read; `historia-fotolitografia` contains a mermaid timeline).
- confidence: high

### linha-do-tempo-05 — Possessive missing on the source name
- where: docs/linha-do-tempo.md:L23
- category: grammar
- severity: minor
- quote: "Mais contexto e gráficos Bernreuter em [Polissilício](/polissilicio)."
- problem: "gráficos Bernreuter" reads as a compound noun; the EN ("More context and Bernreuter charts") is unremarkable, the PT is not idiomatic. The polysilicon chapter writes the source as "Bernreuter Research" (citations.ts:653-660), so the fix also aligns the naming.
- fix: "Mais contexto e os gráficos da Bernreuter Research em [Polissilício](/polissilicio)."
- verification: verified (both locales read).
- confidence: high

### Coverage summary

- celulas-solares — spine present: yes (seven-step list with anchors to the sections); figures: 1 DiagramFigure (`solar-cell.svg`) + 1 chart (`pv-efficiency`) + 1 table; `dataAsOf: 2026`; most worth fixing: the EN chart-reading error (celulas-solares-01) and the boron label in the drawing (celulas-solares-03), then tie the 2026 stamp to a named Fraunhofer edition (celulas-solares-04).
- alem-do-silicio — spine present: no (three thematic sections, no ordered list; the site's other narrative chapters follow the same pattern, so this is a contract-level gap rather than a local one); figures: 0; `dataAsOf: 2026` (no 2026 datum on the page); most worth fixing: the unparsable blue-LED sentence (alem-do-silicio-01) and the total absence of figures (alem-do-silicio-02).
- precos-e-valor — spine present: no; figures: 0 (one table); `dataAsOf: 2026`; most worth fixing: the broken EN anchor (precos-e-valor-01, blocker), then the missing chart for the price cycle the chapter is about (precos-e-valor-02).
- gargalos — spine present: no; figures: 1 chart (`chokepoint-share`) + 1 table, no map despite the title; `dataAsOf: 2026` (supported: the EU Chips Act 2.0 proposal of June 2026 and the 18 state-aid decisions for over EUR 32 bn were both verified against the Commission page, https://digital-strategy.ec.europa.eu/en/policies/european-chips-act, in this run); most worth fixing: the three broken EN anchors (gargalos-01, blocker) and the uncited 70-90 % quartz share (gargalos-02).
- dados — spine present: no; figures: 3 charts (`transistor-count`, `yield-vs-area`, `binning-bins`) + 1 table; `dataAsOf: 2026`; chart/CSV inventory verified: all seven ids in `specs.ts` resolve, all seven CSVs exist in `docs/public/data/`, and every number in the tables matches its CSV (transistor counts, binning shares — 1 + 16 = 17 % below 5,0 GHz on the 8700K, 0 % below 5,0 GHz on the 8086K, 79 % at 5,1-5,2 GHz in the spec caption); most worth fixing: the factor-of-ten error in `yield-vs-area` (dados-01, blocker), then the broken EN anchor (dados-02, blocker) and the false "cuts yield by more than half" (dados-03).
- linha-do-tempo — spine present: n/a (navigation/chronology page, correctly without `dataAsOf`); figures: 1 mermaid timeline + the `TransistorTimeline` component (14 eras, each with an image); most worth fixing: the fourteen-versus-fifteen count (linha-do-tempo-01, blocker), then the mermaid order (linha-do-tempo-02) and the missing citation line (linha-do-tempo-03).
- Not-auditable-in-this-run list, for the fixing agent to open: ITRPV 2024 press release (69 % n-type and the 97 %/3 % split), Fraunhofer Photovoltaics Report (26,7 % learning rate, 35 % tandem, ~4 €ct/kWh, 20-year lifetime, the edition year behind `dataAsOf: 2026`), Sibelco HPQ page (settled: no share figure on the page — gargalos-02), CSET packaging shares (the base of the 10 %/45 %/6 % before any chart is drawn).
- Mechanical checks run over all twelve files, for the record: no line carries two or more em dashes and no `— ,` sequence exists; PT and EN use their own number formats throughout (1.700 / 1,700; 0,47 % / 0.47 %) except the shared chart labels and CSVs noted in gargalos-03; the shared CSV headers are Portuguese (`rotulo`, `Faixa publicada`, `Eficiência`), which the EN pages link to from `/data/…`.
