# Report — docs/transistores.md, docs/na-fab.md, docs/insumos-fab.md (both locales)

## transistores

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

## na-fab

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

## insumos-fab

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

## Coverage summary

- transistores: spine present (14 linked eras, addendum last) | 16 figures in the chapter (11 own SVGs + 5 PDF-extracted images), plus the component-rendered timeline | dataAsOf: 2026 (fits the 2026 Intel launch and the H2 2026 TSMC plan) | most worth fixing next: the three numbers the cited sources do not carry (~40% GAA leakage, BSPDN 11%/10×, CFET ~50%) and the three ids missing from the SourceNote.
- na-fab: spine present (seven modules + two closing sections, L23-31) | 5 figures, with four spine items bare (oxidação, planarização, metrologia, rendimento) | dataAsOf: 2025 (verify; newest datum I could date is 2024) | most worth fixing next: the copper "twice as good" claim, which contradicts the 40% figure in the same sentence and the cited IBM page.
- insumos-fab: spine absent | 0 figures | dataAsOf: 2026 (should be 2022) | most worth fixing next: the EN link to `#polimento-quimico-mecanico-cmp`, which never resolves on the EN page, then the missing spine and the first two figures.
