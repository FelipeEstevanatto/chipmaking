# Verification — full-site audit

Re-check of `audit/findings.md` (211 findings) and `audit/structure.md` (15 proposals) against the
working tree on 2026-09-29, one pass per report group. Each finding was re-tested: does the quoted
text still exist, does the defect still exist, and is the proposed fix the right one. Method: both
locales read at the cited lines, plus grep/read of `citations.ts`, `charts/specs.ts`,
`usgs-silicon.ts`, the CSVs and the SVGs, plus an external fetch where a source was at stake.

**Result: no false positives.** Of the 175 defect findings: 138 still stand as reported, 12 are
already fixed in the tree, 15 need one external lookup before editing, and 10 are valid but the
audit's proposed fix itself needed correction (usually the wrong file or the wrong replacement
text; see the Corrections section). The 36 idea findings were all judged sound and implementable;
the notes below only adjust placement.

## Corrections to the audit's own proposed fixes

Read these before applying anything; they are cases where blindly following `findings.md` would
ship a new error.

1. **`polissilicio-01`** — the report pairs the 1995 *PV* slice with a "2018 total". Bernreuter's
   420,000 t (2018) is the **PV sector's** demand, not the total. Correct fix: "o setor fotovoltaico
   saiu de 1.500 t (1995) para ~250.000 t (2014) e ~420.000 t (2018)" (totals: 15.100 → 278.000 t).
2. **Em dashes** — the proposed fixes for `polissilicio-04` and `confiabilidade-03` contain em
   dashes, which `AGENTS.md` bans in prose. Use the reworded versions in the tables below.
3. **Home page moved into components** — `index-02` and `index-03` no longer live in `docs/index.md`
   text: edit `docs/.vitepress/theme/home-sections.ts` (cards) and `chain.ts` / `ChainFlow.vue`
   (production strip), not the Markdown.
4. **`empacotamento-02` / `dados-01`** — `chiplet-yield.svg` is **correct** (it plots e^(−0.1·A):
   82% at 200 mm², 45% at 800 mm²). The ×10 offset is only in `specs.ts` `yield-vs-area` and its CSV.
   Fix the chart and leave the drawing.
5. **`confiabilidade-01`** — the spine must cover six H2s, including the closing
   `#por-que-isso-é-uma-história-de-materiais` (`#why-this-is-a-materials-story`); the report lists five.
6. **`fotolitografia-06`** — the report's premise ("list does not match the embedded videos") is
   only half true: three of the four ids are embedded in the page. Fix the label and `asml-gaa`
   (an article), not the whole list.
7. **`fotolitografia-10`** — "robust"/"robustas" was removed by the `-01` rewrite; only the
   "2000s never ended" clause remains to fix.
8. **`transistores-19`** — the thousand-separator sweep also covers `transistor-eras.ts` (PT strings)
   and the PT tables in `polissilicio.md`.

## Already fixed (do not touch)

`introducao-01`, `introducao-02`, `o-elemento-silicio-01`, `o-elemento-silicio-02`,
`mineracao-mg-si-04`, `mineracao-mg-si-05`, `mineracao-mg-si-11`, `fotolitografia-01`,
`na-fab-01`, `empacotamento-01`, `confiabilidade-06` (= structure 2.3), `gargalos-03`.
The USGS rebuild (`USGS_MCS_YEARS` → 2026, 2024–2026 editions cited, `usgs-silicon.ts` 2022–2025)
is consistent across the prose, the reference row and the chart; only the per-year figures in the
PDFs remain to be spot-checked against the MCS editions.

## Open blockers (fix queue)

1. **Generation count** (`index-01` + `linha-do-tempo-01` + `transistores-08`): "quinze" → "quatorze"
   and "fifteen" → "fourteen" at `docs/index.md:40`, `docs/en/index.md:40`,
   `docs/linha-do-tempo.md:27`, `docs/en/linha-do-tempo.md:27`, and the comment at
   `transistor-eras.ts:2`. One decision, five edits.
2. **`mineracao-mg-si-01`**: replace "passa de 1 milhão de toneladas métricas por ano" with the
   site's own USGS series (2025: 4,6 Mt, `<Cite id="usgs-mcs-2026" />`) or state the SAIMM figure's
   year and scope. Must agree with the introduction's table.
3. **`polissilicio-01`**: PV demand series, per correction 1 above.
4. **`fabricacao-wafers-03`**: as-cut thickness must exceed the 775 µm SEMI M1 final spec. State the
   order (as-cut → lapping → 775 µm) and source the as-cut value (Möller 2012 or Pei 2005).
5. **`insumos-fab-01`**: EN link → `/en/fabricacao-wafers#chemical-mechanical-polishing-cmp`.
6. **`precos-e-valor-01`**: EN link → `/en/estrutura-wafers#who-makes-the-wafers`.
7. **`gargalos-01`**: EN links → `#spruce-pine-where-the-quartz-is-pure-enough`,
   `#the-chinese-ascent`, `#who-makes-the-wafers` (the last appears twice, L9 and L54).
8. **`dados-01` (+ `empacotamento-02`)**: recompute the five `yield-vs-area` series so each follows
   e^(−D₀·A) for its printed label (e.g. D₀ = 0,1 → 82% at 2 cm², matching the drawing), re-run
   `scripts/export-chart-data.ts`, then reword `dados-03`'s "cuts yield by more than half" to the
   cost-per-good-die statement. Touch neither `chiplet-yield.svg` nor `na-fab`'s equation.
9. **`dados-02`**: EN link → `/en/empacotamento#chiplets-dividing-in-order-to-yield`.
10. **`empacotamento-09`** (minor, same class): restore the dropped anchor →
    `/en/na-fab#interconnection-the-part-of-the-chip-nobody-sees`.

## Cross-cutting classes (status)

- **Generation count**: open; blockers 1 above (also `transistores-08`).
- **EN anchors carrying PT slugs**: open; blockers 5–7, 9, 10 — sweep all `](/en/…#…)` after fixing.
- **Chart labels not localised**: fixed (`ChartLabel = number | ChartText`, CSVs English).
- **Yield model ×10**: open; fix only the chart/CSV/spec pair (blocker 8).
- **HPQ "70–90 %" without a published source**: open; `mineracao-mg-si-03`, `gargalos-02` and the
  `chokepoint-share` row ride on one `sibelco-hpq` marker that does not carry the number.
- **USGS editions**: fixed.
- **Uncited claims**: open unless noted — `introducao-03`, `o-elemento-silicio-03`,
  `mineracao-mg-si-02`, `-08`, `fotolitografia-02`; `fotolitografia-01` fixed.

---

## g1 — index, introducao, o-elemento-silicio, mineracao-mg-si

| id | status | fix |
| --- | --- | --- |
| index-01 | VALID | Blocker 1. |
| index-02 | VALID | In `theme/home-sections.ts`: cut the Panorama details to the chokepoint map; drop "estrutura cristalina do silício" from the Wafer card. |
| index-03 | idea | Show the SoG-Si/EG-Si fork in `chain.ts`/`ChainFlow.vue`, labels read from `glossary.ts`. |
| introducao-01 | FIXED | — |
| introducao-02 | FIXED | Rewritten as China ~80% (2025) with `usgs-mcs-2026`. |
| introducao-03 | VALID | Cite a PV cost breakdown for the wafer share, or soften "o principal fator" → "um dos principais fatores". Never to `usgs-mcs`. |
| introducao-04 | VALID | "mineração e incineração do quartzo" → "mineração e redução carbotérmica do quartzo (SiO₂) em forno de arco"; EN mirror. |
| introducao-05 | VALID | Cite (~27%), "material" → "elemento", move the five examples to the silica clause and add a silicate, or cut. |
| introducao-06 | PARTLY | Only the `introducao` figcaption needs it (the hero no longer uses the photo): author — original file — licence (link), or replace with a PD/CC image. |
| introducao-07 | idea | Producer map from `usgs-silicon.ts` (own SVG, cited `usgs-mcs-2026`). |
| o-elemento-silicio-01 | FIXED | — |
| o-elemento-silicio-02 | FIXED | Spine at L13–21. |
| o-elemento-silicio-03 | VALID | Marker on the "não emite luz com eficiência" sentence (`elem-sze` if it states it, else append a photonics source). |
| o-elemento-silicio-04 | VALID | Re-cite 1 µm/100 µm to `elem-ioffe` + `elem-sze` unless `saimm` carries the GaAs figure; same fix at `celulas-solares.md:105`. |
| o-elemento-silicio-05 | VALID | "O mapa acima" → "O gráfico acima" ("The chart above"). |
| o-elemento-silicio-06 | idea | Density-anomaly drawing; caption cites `zulehner-2000` (+ `elem-ioffe`). |
| o-elemento-silicio-07 | idea | Add the Avogadro/kilogram sentence, sourced to `elem-ciaaw` or BIPM/PTB. |
| mineracao-mg-si-01 | VALID | Blocker 2. |
| mineracao-mg-si-02 | VALID | Remove `asianometry-wafer` from both SourceNotes (it is cited in `estrutura-wafers`, not here), or add the sentence it backs. |
| mineracao-mg-si-03 | VALID | Split the claim: share → the study that measured it (edit/append citation) or reword; specs (99,9992 %, 80 ppb, <50 ppb, 0,04 ppm B) → IOTA datasheet as its own entry. Same for the `gargalos` row/chart. |
| mineracao-mg-si-04 | FIXED | — |
| mineracao-mg-si-05 | FIXED | Six figures now. |
| mineracao-mg-si-06 | VALID | Source the 1996 founding (registry/TQC press) or reword; the 2011 JV sentence needs the same source. |
| mineracao-mg-si-07 | VALID | "alguns dígitos abaixo" → "logo abaixo" / "one grade below" (or the nines). |
| mineracao-mg-si-08 | VALID | "ilimitados" → "abundantes" / "plentiful". |
| mineracao-mg-si-09 | VALID | Replace `elkem.com` / `csiro.au` root URLs with the pages carrying ~2000 °C and the energy figures. |
| mineracao-mg-si-10 | idea | 2024 Helene disruption, company notices; no shutdown length or price effect without a source. |
| mineracao-mg-si-11 | FIXED | Furnace balance drawing exists. |

## g2 — polissilicio, estrutura-wafers

| id | status | fix |
| --- | --- | --- |
| polissilicio-01 | PARTLY | Blocker 3 (+ correction 1): PV series 1,500 → ~250,000 (2014) → ~420,000 t (2018). |
| polissilicio-02 | VALID | Add `<Cite id="rec-closure-2023" />` to the 2009–2023 sentence. |
| polissilicio-03 | LOOKUP | Read the pv-tech PDF (or archive) for the five-stage/three-purification split; reword to what it states. |
| polissilicio-04 | PARTLY | Corrected (no em dash): "…regime de *processing trade*, que isentou essas importações de direitos até agosto de 2015; o Mofcom anunciou o fim da brecha em agosto de 2014". |
| polissilicio-05 | VALID | "direitos antidumping americanos" → "direitos antidumping chineses sobre o polissilício americano"; EN "Chinese duties on US polysilicon". |
| polissilicio-06 | VALID | Add the spine: sentence + 7-item linked list + closing sentence. |
| polissilicio-07 | VALID | PT "O Silício de Grau Metalúrgico" → "O silício de grau metalúrgico". |
| polissilicio-08 | VALID | "A química ficou. Quem opera o reator mudou." → one sentence with "mas". |
| polissilicio-09 | LOOKUP | Check SAIMM for the 2006 overtaking and the 2008 75,000/45,000 t pair; change nothing if confirmed. |
| polissilicio-10 | idea | Price/capacity figure from the Bernreuter values (redraw; do not copy the chart). |
| polissilicio-11 | idea | Segregation-coefficient table, values read off `saimm` first. |
| estrutura-wafers-01 | VALID | Promote the four-axis list (L52–57) to a spine under the H1; trim the redundant wording. |
| estrutura-wafers-02 | VALID | Delete `### Recursos adicionais`; move the DRX paragraph up after the p08 figures. |
| estrutura-wafers-03 | VALID | Translate the PT caption; add the derivation/credit line to both p08 figures (name author and licence if third-party). |
| estrutura-wafers-04 | VALID | Append a `semi-t7` citation and cite it; keep `semi-m1` for the notch. |
| estrutura-wafers-05 | VALID | Name each source on its number: 44,1 % Nikkei, "just over half of 300 mm" IMARC. |
| estrutura-wafers-06 | LOOKUP | SEMI M1 thickness tolerance clause; state per-diameter or drop the blanket ±20 µm. |
| estrutura-wafers-07 | VALID | "DeepKling —" → "Felix Kling (DeepKling)"; keep link + licence; fix the same credit in the L26 list if it survives. |
| estrutura-wafers-08 | idea | SiO₂/GeO₂ comparison panel; note `## Quem fabrica os wafers` is also figure-less. |
| estrutura-wafers-09 | idea | 450 mm timeline; "only section without a figure" is overstated (three sections lack one). |
| estrutura-wafers-10 | idea | Flat vs notch die-grid overlay; caption says it is a diagram. |

## g3 — fabricacao-wafers, fotolitografia, historia-fotolitografia

| id | status | fix |
| --- | --- | --- |
| fabricacao-wafers-01 | VALID | Add the 1–8 linked list + closing sentence after the intro. |
| fabricacao-wafers-02 | VALID | Figure for §Corte em fatias (see -14). |
| fabricacao-wafers-03 | VALID | Blocker 4: as-cut > 775 µm final; source the as-cut value. |
| fabricacao-wafers-04 | VALID | Cite Teal's memoir / *Crystal Fire* for 1 Oct 1948, or soften to "em 1948". |
| fabricacao-wafers-05 | VALID | Credit the UNSW/Intel/LCT embeds in text; add entries, or drop the embeds. |
| fabricacao-wafers-06 | VALID | Add 182/210 mm formats with the ITRPV cite, or drop "mais recentemente". |
| fabricacao-wafers-07 | VALID | "três vezes mais finas" → "cerca de quatro a cinco vezes mais finas". |
| fabricacao-wafers-08 | VALID | Cite the full ITRPV report/chart for the p/n thickness split, or soften. |
| fabricacao-wafers-09 | VALID | Delete both "Vale notar"/"It is worth noting" and start with the fact. |
| fabricacao-wafers-10 | VALID | RCA-1: "oxidação orgânica e partículas" → "remoção de orgânicos e partículas". |
| fabricacao-wafers-11 | VALID | Make PT/EN say the same thing about edge crown/edge bead; check the MF928/ProStEK terms. |
| fabricacao-wafers-12 | VALID | `dataAsOf` 2025 → 2024 (or 2023), or add a 2025 datum. |
| fabricacao-wafers-13 | LOOKUP | IUCr newsletter (1 mm/150 cm) and SAIMM (kerf 30 %, etc.) lookups. |
| fabricacao-wafers-14 | idea | Slicing schematic (also carries the -03 thickness fix). |
| fabricacao-wafers-15 | idea | PV wafer thickness/format chart from ITRPV (check licence). |
| fotolitografia-01 | FIXED | Rewritten around ASML/Philips with `asml-history`. |
| fotolitografia-02 | VALID | 15 kg/20 G uncited and out of scale: use ASML's 4g/8g wafer stage (32g reticle), drop "com força", or drop the comparison. |
| fotolitografia-03 | VALID | Standardise on 134 nm (prose L80 + historia L108) and cite a source that prints it. |
| fotolitografia-04 | VALID | Add the ordered path list + closing sentence. |
| fotolitografia-05 | VALID | Credit or drop the two embeds; add reference entries. |
| fotolitografia-06 | PARTLY | Drop/relabel `asml-gaa` (article); attach or drop the `asml-investor-euv` mention; three of four ids are genuinely embedded. |
| fotolitografia-07 | VALID | Real provenance for p12-1 and p13-1 (p13-1 has none); translate or mark the English legend. |
| fotolitografia-08 | VALID | Pellicle 30–40 nm needs the episode timestamp or a publication. |
| fotolitografia-09 | VALID | PT "1,7 vez menores" → "1,7 vezes menores". |
| fotolitografia-10 | PARTLY | Delete only the "2000s never ended" clause. |
| fotolitografia-11 | LOOKUP | Check 40 kW/1 MW/200 W, Intel Dec 2025, 175 w/h against the named sources. |
| fotolitografia-12 | idea | Wavelength-vs-feature chart, `sourceIds` from `asml-light`/`kato-litho`. |
| fotolitografia-13 | idea | Pellicle figure; pin the thickness/transmission source first. |
| historia-fotolitografia-01 | VALID | US$ 500 M conflicts with Construction Physics (≈ $25 M synchrotron, > $1 G total); check the video timestamp or use those numbers. |
| historia-fotolitografia-02 | VALID | The SEMATECH ranking belongs to 1997, not 1996. |
| historia-fotolitografia-03 | VALID | Burn Lin 2002 vs Dec 2001/Mulkens; align or name both accounts. |
| historia-fotolitografia-04 | VALID | Split 248/193 nm out of the 1990 timeline entry. |
| historia-fotolitografia-05 | VALID | May 2003 entry sits after Dec 2003; reorder. |
| historia-fotolitografia-06 | VALID | Drop "de 300 mm": source says "at most 30 wafers per hour". |
| historia-fotolitografia-07 | VALID | Add the six-item spine list. |
| historia-fotolitografia-08 | VALID | Replace the circular sentence with the mechanism. |
| historia-fotolitografia-09 | LOOKUP | Kato dates, 250/130/120 split, $2 bn Intel release. |
| historia-fotolitografia-10 | idea | Elimination diagram for "A decisão do século". |
| historia-fotolitografia-11 | idea | Kinoshita 1985 / 1989 "dawn of EUV" paragraph. |

## g4 — transistores, na-fab, insumos-fab

| id | status | fix |
| --- | --- | --- |
| transistores-01 | VALID | Cite Samsung Newsroom (June 2022) for the milestone and a source printing ~40 % leakage, or drop the number from prose + module. |
| transistores-02 | VALID | Cite Intel's PowerVia/18A page, label the claims as vendor figures, mirror in `ERA_GAINS`. |
| transistores-03 | VALID | Replace the ~50 % (imec says 22 % SRAM area) with a sourced number or restate without it. |
| transistores-04 | VALID | Repoint the "Node column"/"table at the top" references to the node pill that opens each section. |
| transistores-05 | VALID | Append `wikipedia-22nm`, `intel-strain`, `asml-gaa` to both SourceNotes. |
| transistores-06 | VALID | Five pdf-images figures need author/file/licence or own-schematic redraw. |
| transistores-07 | VALID | A20 Pro: cite TechInsights (Sep 2026) or drop the product name. |
| transistores-08 | VALID | Blocker 1 ("fifteen" → "fourteen" in the module). |
| transistores-09 | VALID | Strained-silicon 10–20 % needs a source that prints it (Intel 90 nm/IEDM), phrased as Intel's claim. |
| transistores-10 | VALID | Cite Ogura et al. (1980) for the LDD or drop the year. |
| transistores-11 | PARTLY | Cite the ~6 nm film and the 2015 phones (or drop them); platform sentences already cited. |
| transistores-12 | VALID | Say 26 nm is the 22 nm node's gate against the 25 nm node-typical value. |
| transistores-13 | VALID | "de 22 nm a 5 nm" → "de 22 nm até o N3 (3 nm), com a Samsung passando a GAA no 3 nm". |
| transistores-14 | VALID | Module: Exynos 2600 runs on Samsung's 2 nm GAA, not TSMC N2. |
| transistores-15 | VALID | Add the ellipsis to the truncated Gargini quote. |
| transistores-16 | LOOKUP | ITRS 1999 + 2001 PDFs; verify the two quotations. |
| transistores-17 | VALID | Delete "Em outras palavras:"/"In other words,". |
| transistores-18 | VALID | Rebuild the verbless GAAFET spec list as a sentence; "performance" → "desempenho". |
| transistores-19 | VALID | PT thousand separators: "2 300" → "2.300" (chapter + module + polissilicio tables). |
| transistores-20 | VALID | Reorder the polysilicon mermaid to 1995, 2004, 2010, 2014. |
| transistores-21 | idea | Node-vs-dimensions figure; data already cited. |
| transistores-22 | idea | One licenced 4004/3708 photograph. |
| transistores-23 | idea | A10 cell-height numbers (90 vs 115 nm) in prose or chart. |
| na-fab-01 | FIXED | Copper sentence rewritten. |
| na-fab-02 | VALID | "## A fábricação é um laço" → "## A fabricação é um laço". |
| na-fab-03 | VALID | Figures for oxidação, planarização, metrologia, rendimento (ideas 08–10). |
| na-fab-04 | VALID | Cut "Vale reparar"/"It is worth noticing". |
| na-fab-05 | VALID | Recast the contrasts at L98, L101, L212; keep L262. |
| na-fab-06 | LOOKUP | Newest datable datum; then set `dataAsOf`. |
| na-fab-07 | LOOKUP | Deal-Grove DOI, TU Wien, Bosch, Axcelis, TechInsights. |
| na-fab-08 | idea | Two Deal-Grove regimes drawing. |
| na-fab-09 | idea | Dishing/erosion + control-loop drawing. |
| na-fab-10 | idea | Embed the existing `yield-vs-area` chart in the chapter (after blocker 8). |
| insumos-fab-01 | VALID | Blocker 5. |
| insumos-fab-02 | VALID | Spine: six H2s, sentence + list + closing. |
| insumos-fab-03 | VALID | No figure at all; the drawing ideas are -10/-11, not "08/09". |
| insumos-fab-04 | VALID | `dataAsOf` 2026 → 2022 or add a newer dated source. |
| insumos-fab-05 | PARTLY | Fix both locales: PT "está em [na fab]" also renders wrong; use "está no capítulo [Na fab](/na-fab)" / "is covered in the chapter [In the fab](/en/na-fab)". |
| insumos-fab-06 | VALID | Pointer promises an abrasive swap `na-fab` does not carry; add it there or trim the promise. |
| insumos-fab-07 | VALID | One owner for the CMP slurry explanation (insumos-fab), the other links. |
| insumos-fab-08 | VALID | "the most intimate input" → "By volume, the largest input of a fab". |
| insumos-fab-09 | LOOKUP | Neon 50/90 % pair and SEMI F63 revision (the `fabm-upw` entry has no URL). |
| insumos-fab-10 | idea | Two-panel resist/EUV-mask drawing. |
| insumos-fab-11 | idea | State that 18.2 MΩ·cm is the theoretical maximum for pure water. |

## g5 — empacotamento, confiabilidade

| id | status | fix |
| --- | --- | --- |
| empacotamento-01 | FIXED | HBM4 sentence now matches JEDEC. |
| empacotamento-02 | VALID | Blocker 8; drawing correct, chart wrong. |
| empacotamento-03 | VALID | Figures for §Fatiamento and §Quanto vale (ideas 18–19). |
| empacotamento-04 | VALID | "memorias empilhadas" → "memórias". |
| empacotamento-05 | VALID | "reduziu a prática" → "levou à prática" (or "reduziu à prática"). |
| empacotamento-06 | VALID | Delete "Vale registrar"/"It is worth noting". |
| empacotamento-07 | VALID | Cut "Ou seja:"/"In other words:" and restore the subject. |
| empacotamento-08 | VALID | PT asserts the probe count as the site's claim; match EN's attributed wording. |
| empacotamento-09 | VALID | Blocker 10. |
| empacotamento-10 | VALID | One term per locale: PT "ligação por fio", EN "wire bonding" (L93–115). |
| empacotamento-11 | VALID | Add the spine's closing sentence. |
| empacotamento-12 | VALID | Split the GF100 paragraph; clock comparisons may become a table. |
| empacotamento-13 | LOOKUP | TSMC reticle PDF + ECTC paper. |
| empacotamento-14 | LOOKUP | Yole advanced-packaging market (403 on fetch). |
| empacotamento-15 | LOOKUP | Gold Bulletin Table 1 for the Cu/Au pairs. |
| empacotamento-16 | PARTLY | Read the UCIe release first; keep 48 and 64 GT/s, make the base explicit, and drop "doubled" only if unsupported. |
| empacotamento-17 | VALID | HBM bandwidth figure: name the origin and attach markers, or trim to cited generations. |
| empacotamento-18 | idea | Dicing schematic (kerf, chipping, stealth dicing). |
| empacotamento-19 | idea | Value-split figure (ATP ≈10 % vs design+front-end ≈45 %). |
| confiabilidade-01 | VALID | Spine covering all six H2s (correction 5). |
| confiabilidade-02 | VALID | `dataAsOf: 2026` has no 2026 datum; verify AEC-Q100 Rev J1's year, then set the stamp to the newest cited year. |
| confiabilidade-03 | VALID | Recast the two not-X-but-Y openings without em dashes. PT: "Confiabilidade é a **distribuição das falhas ao longo do tempo**, e essa distribuição quase nunca é uniforme." and "O desgaste de um chip é química e física de interface, lento e **cumulativo**."; EN mirrors. |
| confiabilidade-04 | VALID | PT/EN state different comparisons at L82; align to "a single component's rate vs the installed base". |
| confiabilidade-05 | VALID | Five sections share one figure; add for wear-out/soft errors/qualification (ideas 12–14). |
| confiabilidade-06 | FIXED | Chart labels localised; CSVs English. |
| confiabilidade-07 | VALID | Annotate the weeks-to-months region or compress the time axis. |
| confiabilidade-08 | VALID | EN "Burn-in moves the infant mortality" → "acts on/consumes"; PT "ataca". |
| confiabilidade-09 | VALID | "powered time" → "power-on time". |
| confiabilidade-10 | VALID | Cut the burn-in restatement to two sentences; leave mechanism/24–48 h to `empacotamento`. |
| confiabilidade-11 | LOOKUP | AEC-Q100 PDF and JEP122 access; record the revision checked. |
| confiabilidade-12 | idea | Annotate bathtub regions + burn-in cut. |
| confiabilidade-13 | idea | Soft-error sources figure (qualitative; no invented numbers). |
| confiabilidade-14 | idea | Qualification-flow schematic. |

## g6 — celulas-solares, alem-do-silicio, precos-e-valor, gargalos, dados, linha-do-tempo

| id | status | fix |
| --- | --- | --- |
| celulas-solares-01 | VALID | EN "first bar" → "first two bars … and the last three". |
| celulas-solares-02 | VALID | SourceNote names Möller but nothing cites it; cite or drop. |
| celulas-solares-03 | VALID | Figure labels the base boron-doped, contradicting the chapter and `solar-cell.svg`; fix both. |
| celulas-solares-04 | VALID | Name the Fraunhofer edition (July 2026) in prose + citation; keep `dataAsOf: 2026`. |
| celulas-solares-05 | VALID | 26,7 % verified against the current edition; add the edition to the citation. |
| celulas-solares-06 | VALID | "centenas de gigawatts" uncited; add a marker. |
| celulas-solares-07 | VALID | Reconcile the 2011 texture detail with the 2024 market statement. |
| celulas-solares-08 | LOOKUP | VDMA PDF for the 97/3 split (else cite Fraunhofer). |
| celulas-solares-09 | VALID | Link NREL's chart directly instead of `/referencias`. |
| celulas-solares-10 | VALID | Bridge the 25–30 yr module life and the ~20 yr system figure. |
| celulas-solares-11 | VALID | Four of seven spine steps lack figures; one texturing/edge-isolation schematic. |
| celulas-solares-12 | VALID | Remove the repeated not-X-but-Y ("não está no átomo, e sim…"; "não em física"). |
| celulas-solares-13 | idea | What-replaced-what panel (boro→gálio, Al-BSF→PERC→TOPCon). |
| celulas-solares-14 | idea | 1954 Bell cell photograph (licence check). |
| alem-do-silicio-01 | VALID | Rewrite the blue-LED clause: "não resolve por razões de física, não por falta de engenharia". |
| alem-do-silicio-02 | VALID | No figures at all; MEMS/drift-region schematic. |
| alem-do-silicio-03 | VALID | "submicro-métrica" → "submicrométrica". |
| alem-do-silicio-04 | VALID | Three stacked markers on one sentence: attach each to its value. |
| alem-do-silicio-05 | VALID | Attach a source to "dezenas deles" and the CMOS superlative, or soften. |
| alem-do-silicio-06 | VALID | `dataAsOf: 2026` with 2014 newest source; fix with `o-elemento-silicio` together. |
| alem-do-silicio-07 | idea | MEMS structure drawing in the fab's grammar. |
| precos-e-valor-01 | VALID | Blocker 6. |
| precos-e-valor-02 | VALID | Price chart from `bernreuter-pork-cycle`; add spec + CSV. |
| precos-e-valor-03 | VALID | EN drops the "virtue and limit" framing; restore it. |
| precos-e-valor-04 | VALID | ¥0.70/W inside a US$/Wp column: put the unit inside the cell as CNY 0,70/W. |
| precos-e-valor-05 | VALID | Compare 2011 cell with 2025 module explicitly; "mesma física" → "mesma curva de aprendizado"; drop the unsourced "fração disso". |
| precos-e-valor-06 | idea | Value-split stacked bar (verify the base first). |
| gargalos-01 | VALID | Blocker 7 (three fragments, four occurrences). |
| gargalos-02 | VALID | HPQ 70–90 % not on the Sibelco page; same fix as `mineracao-mg-si-03`. |
| gargalos-03 | FIXED | Chart labels localised. |
| gargalos-04 | VALID | No map on the "map" page; own world-map SVG. |
| gargalos-05 | VALID | Move the six `<Cite>` markers into their table rows. |
| gargalos-06 | VALID | Table 6 stages vs chart/CSV 5: add the MG-Si row (87 %, `usgs-mcs-2026`) and re-export, or say why. |
| gargalos-07 | VALID | Recast the closing not-X-but-Y. |
| gargalos-08 | idea | Qualification-clock figure (quantitative only with a source). |
| dados-01 | VALID | Blocker 8. |
| dados-02 | VALID | Blocker 9. |
| dados-03 | VALID | "cuts yield by more than half" → the cost-per-good-die statement (pairs with blocker 8). |
| dados-04 | VALID | Freshness examples contradict the stamps; rewrite after `celulas-solares-04`. |
| dados-05 | VALID | PT "o capítulo de [na fab]" → "no capítulo [Na fab](/na-fab)". |
| dados-06 | idea | Add the polysilicon/PV price series the other chapters keep citing. |
| linha-do-tempo-01 | VALID | Blocker 1. |
| linha-do-tempo-02 | VALID | Reorder the mermaid to 1995, 2004, 2010, 2014 (same edit as `transistores-20`). |
| linha-do-tempo-03 | VALID | Page ships numbers with no citation; add the sourced sentence. |
| linha-do-tempo-04 | VALID | Narrow the opening promise to what the page carries. |
| linha-do-tempo-05 | VALID | PT "gráficos Bernreuter" → "gráficos da Bernreuter Research". |

---

## audit/structure.md proposals

| proposal | status | note |
| --- | --- | --- |
| 1.1 language switcher | accurate | No custom switcher; VitePress goes to the locale `link`. Fix in `theme/` + `config.ts`; `useLocalePath` already encodes the mapping. |
| 1.2 "Método e fontes" page | accurate | New page pair + sidebar + footer; must pass the glossary/citation audits. |
| 1.3 chapter index with status | partly | README table exists, but only `dataAsOf` is build-time data; reading time and figure count are runtime-only today. |
| 1.4 404 page | accurate | No `docs/404.md`; GitHub Pages serves the default. |
| 1.5 sidebar vs titles | partly | Mismatches real and broader than listed: also `na-fab` and `confiabilidade` in both locales. |
| 1.6 reading trail scope | accurate (verified here) | Trail lists 11; omits `historia-fotolitografia`, `insumos-fab`, `alem-do-silicio`, `dados`. |
| 2.1 link/anchor audit | partly | Anchors real (7 dead fragments in 4 EN files + 1 dropped anchor); "seven blockers" overstates — 4 are blockers. |
| 2.2 figure coverage audit | accurate | `DocMeta.vue` counts only `.diagram-figure`; charts/mermaid/eramodule/viewer invisible to it. |
| 2.3 localised chart labels | already done | `ChartLabel = number | ChartText` in `types.ts`, resolved in `DataChart.vue`, CSVs English. Nothing left. |
| 2.4 `dataAsOf` wording | partly | The rule text exists; only the clarifying sentence is missing. |
| 3.1 spine template | partly | `o-elemento-silicio` and `mineracao-mg-si` now have spines; 7 chapters still need one (+ `empacotamento`'s closing sentence). |
| 3.2 one home per explanation | accurate | CMP slurry and burn-in are the two duplicated explanations. |
| 3.3 decide `linha-do-tempo` | accurate | Market mermaid out of order and duplicated from `polissilicio`; decide before editing. |
| 3.4 group Dados with sources | accurate | `dados` sits under Panorama today. |
| 3.5 mark PV as a branch | accurate | Sidebar 1–6 then unnumbered groups. |

## Suggested order

1. Blockers 1–10 (cheap, high-impact; both locales per commit).
2. The 15 lookup-only items in one pass each, once the source is open.
3. The 10 corrected-fix items, using the Corrections section above.
4. Majors chapter by chapter; then minors as one copy-edit pass; then the 36 ideas.
5. Add `scripts/audit-links.py` (structure 2.1) before or with the anchor fixes so they cannot
   regress; decide the figure-count question (structure 2.2) before adding the missing figures.
