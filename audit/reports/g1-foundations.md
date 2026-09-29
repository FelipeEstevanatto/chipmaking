# Report — docs/index.md, docs/introducao.md, docs/o-elemento-silicio.md, docs/mineracao-mg-si.md (+ en/ mirrors)

## index
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

## introducao
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

## o-elemento-silicio
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

## mineracao-mg-si
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

## Coverage summary
- index: spine n/a (home layout — no `vp-doc`, so the glossary audit skips it); figures 1 (the supply-chain mermaid) plus the hero photograph reused from introducao; dataAsOf absent (home); fix next: the "quinze gerações" count on both locales.
- introducao: spine no (single overture section; consider declaring the two-step agenda or treating the page as navigation); figures 2 (sample photograph + interactive USGS chart); dataAsOf 2025; fix next: the USGS 2023 URL versus the 2024/2025 estimate columns.
- o-elemento-silicio: spine no; figures 1 (band-gap scatter); dataAsOf 2026; fix next: 0,47 % → ~4,7 % for ²⁹Si on both locales.
- mineracao-mg-si: spine no; figures 1 (submerged-arc furnace SVG); dataAsOf 2025; fix next: reconcile "1 milhão de toneladas" with the introduction's 3,3 Mt world total.
