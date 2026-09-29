# Report — empacotamento, confiabilidade

## empacotamento

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

## confiabilidade

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

## Coverage summary
- empacotamento — spine present: yes (nine anchored items; the closing sentence is missing, empacotamento-11); figures: 5 `DiagramFigure` + 1 `DataChart`, with §Fatiamento and §Quanto vale unillustrated (empacotamento-03); `dataAsOf: 2026`, supported by the April 2026 Macworld binning article and the iPhone 17e datum; charts verified against their CSVs and prose (`binning-bins`: 13 + 4 = 17% at ≥5.2 GHz on the 8700K, 29 + 50 = 79% at 5.1-5.2 GHz and none below 5.0 GHz on the 8086K; the HBM table matches hbm-bandwidth.svg for HBM2/3/4); the single thing most worth fixing next: the HBM4 "4 a 64 GB" floor (empacotamento-01).
- confiabilidade — spine present: no (confiabilidade-01); figures: 1 schematic chart (`bathtub`) + 1 mechanism table; `dataAsOf: 2026` with no 2026 datum cited (confiabilidade-02); chart and CSV agree with each other and with the prose except for the time-scale reading (confiabilidade-07), and the EN axis label leaks Portuguese (confiabilidade-06); the single thing most worth fixing next: write the spine, then set the stamp from the newest cited source.
