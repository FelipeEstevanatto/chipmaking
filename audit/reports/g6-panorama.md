# Report — celulas-solares, alem-do-silicio, precos-e-valor, gargalos, dados, linha-do-tempo

## celulas-solares

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

## alem-do-silicio

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

## precos-e-valor

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

## gargalos

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

## dados

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

## linha-do-tempo

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

## Coverage summary

- celulas-solares — spine present: yes (seven-step list with anchors to the sections); figures: 1 DiagramFigure (`solar-cell.svg`) + 1 chart (`pv-efficiency`) + 1 table; `dataAsOf: 2026`; most worth fixing: the EN chart-reading error (celulas-solares-01) and the boron label in the drawing (celulas-solares-03), then tie the 2026 stamp to a named Fraunhofer edition (celulas-solares-04).
- alem-do-silicio — spine present: no (three thematic sections, no ordered list; the site's other narrative chapters follow the same pattern, so this is a contract-level gap rather than a local one); figures: 0; `dataAsOf: 2026` (no 2026 datum on the page); most worth fixing: the unparsable blue-LED sentence (alem-do-silicio-01) and the total absence of figures (alem-do-silicio-02).
- precos-e-valor — spine present: no; figures: 0 (one table); `dataAsOf: 2026`; most worth fixing: the broken EN anchor (precos-e-valor-01, blocker), then the missing chart for the price cycle the chapter is about (precos-e-valor-02).
- gargalos — spine present: no; figures: 1 chart (`chokepoint-share`) + 1 table, no map despite the title; `dataAsOf: 2026` (supported: the EU Chips Act 2.0 proposal of June 2026 and the 18 state-aid decisions for over EUR 32 bn were both verified against the Commission page, https://digital-strategy.ec.europa.eu/en/policies/european-chips-act, in this run); most worth fixing: the three broken EN anchors (gargalos-01, blocker) and the uncited 70-90 % quartz share (gargalos-02).
- dados — spine present: no; figures: 3 charts (`transistor-count`, `yield-vs-area`, `binning-bins`) + 1 table; `dataAsOf: 2026`; chart/CSV inventory verified: all seven ids in `specs.ts` resolve, all seven CSVs exist in `docs/public/data/`, and every number in the tables matches its CSV (transistor counts, binning shares — 1 + 16 = 17 % below 5,0 GHz on the 8700K, 0 % below 5,0 GHz on the 8086K, 79 % at 5,1-5,2 GHz in the spec caption); most worth fixing: the factor-of-ten error in `yield-vs-area` (dados-01, blocker), then the broken EN anchor (dados-02, blocker) and the false "cuts yield by more than half" (dados-03).
- linha-do-tempo — spine present: n/a (navigation/chronology page, correctly without `dataAsOf`); figures: 1 mermaid timeline + the `TransistorTimeline` component (14 eras, each with an image); most worth fixing: the fourteen-versus-fifteen count (linha-do-tempo-01, blocker), then the mermaid order (linha-do-tempo-02) and the missing citation line (linha-do-tempo-03).
- Not-auditable-in-this-run list, for the fixing agent to open: ITRPV 2024 press release (69 % n-type and the 97 %/3 % split), Fraunhofer Photovoltaics Report (26,7 % learning rate, 35 % tandem, ~4 €ct/kWh, 20-year lifetime, the edition year behind `dataAsOf: 2026`), Sibelco HPQ page (settled: no share figure on the page — gargalos-02), CSET packaging shares (the base of the 10 %/45 %/6 % before any chart is drawn).
- Mechanical checks run over all twelve files, for the record: no line carries two or more em dashes and no `— ,` sequence exists; PT and EN use their own number formats throughout (1.700 / 1,700; 0,47 % / 0.47 %) except the shared chart labels and CSVs noted in gargalos-03; the shared CSV headers are Portuguese (`rotulo`, `Faixa publicada`, `Eficiência`), which the EN pages link to from `/data/…`.
