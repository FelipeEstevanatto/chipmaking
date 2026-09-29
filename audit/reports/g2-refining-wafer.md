# Report — polissilicio + estrutura-wafers

Pages: `docs/polissilicio.md` · `docs/en/polissilicio.md` · `docs/estrutura-wafers.md` · `docs/en/estrutura-wafers.md`.

Method: full read of all four files; every numeral checked against its `citations.ts` entry and against the rest of `docs/`; the `wafer-identification.svg` drawing checked against `scripts/gen-wafer-identification-svg.py`, the SVG text and the caption; `fetch` used only where a specific number was at stake. No content file was modified and no build or audit script was run. Two fetches failed and are recorded below as lookups: the Elkem Solar PDF on pv-tech.org (HTTP 403, Cloudflare) and `en.wikipedia.org/wiki/450_mm` (no article). A Wikipedia wafer fetch returned thicknesses but no tolerances, so the SEMI M1 check below stays open.

## polissilicio

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

## estrutura-wafers

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

## Coverage summary
- polissilicio (`docs/polissilicio.md` + `docs/en/polissilicio.md`): spine partial — the route is introduced by a Mermaid diagram in "Visão geral da rota" but there is no ordered list pointing at the sections; 9 `DiagramFigure`s + 1 Mermaid + 1 embedded video, no data charts; `dataAsOf: 2025`; fix next: the demand-series conflation at L274.
- estrutura-wafers (`docs/estrutura-wafers.md` + `docs/en/estrutura-wafers.md`): spine no — the chapter opens directly into "Estrutura do silício puro" and the four-axis list sits mid-chapter at L52–57; 5 `DiagramFigure`s, no Mermaid, no data charts; `dataAsOf: 2025`; fix next: delete the `### Recursos adicionais` scaffolding and promote the four axes into a spine.
