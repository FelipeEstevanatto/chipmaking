# Report — docs/fabricacao-wafers.md, docs/fotolitografia.md, docs/historia-fotolitografia.md (both locales)

## fabricacao-wafers

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

## fotolitografia

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

## historia-fotolitografia

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

## Coverage summary

- docs/fabricacao-wafers.md (+ en): spine present: no (intro sentence only, no ordered list; finding -01); 12 DiagramFigures + 4 embeds (no figure in "Corte em fatias"); `dataAsOf: 2025`; most worth fixing next: the 775 µm/as-cut thickness contradiction (-03), which also unblocks the slicing figure.
- docs/fotolitografia.md (+ en): spine present: no (three intro paragraphs, no list; finding -04); 12 DiagramFigures + 3 embeds; `dataAsOf: 2025` (consistent with the Dec 2025 Intel cite); most worth fixing next: the "TSMC was part of Philips" sentence (-01) — it is the only blocker and it sits in the first paragraph a reader sees.
- docs/historia-fotolitografia.md (+ en): spine present: no (intro sentence only; timeline carries part of the navigation); 3 DiagramFigures + 1 Mermaid timeline + 1 embed; no `dataAsOf` frontmatter (correct for this historical chapter); most worth fixing next: the IBM X-ray cost figure (-01), the one number on the page that another cited source contradicts.
