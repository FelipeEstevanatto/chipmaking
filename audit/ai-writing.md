# AI-writing audit

Two sources, one question: does this project carry the writing habits that make text read as machine-written or hard to process?

- [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), a field guide to content, vocabulary and markup tells.
- [Why is AI-generated language so hard to understand?](https://arxiv.org/html/2610.29162v1) (Clark, Martin and Mahowald, 2026), a study of the syntactic features that raise human processing cost.

The short answer: the site is clean on the content tells and on the AI vocabulary. The remaining work is a bounded set of sentence-level habits, mostly negative parallelism, long colon-and-semicolon sentences, and a cleft cadence in Portuguese that the English translation mirrors. The citation layer is in good shape.

This audit does not claim that any passage was or was not written by an AI. The Wikipedia page itself says the signs are not proof and that detectors are unreliable. What follows is a list of patterns, with counts and locations, and a fix for each.

## Status after Steps 1 to 3

Steps 1 to 3 were applied on 2026-11-21.

- The negative-parallelism backlog is cleared. `audit-style.py` reports 0 findings across 0 files, and `scripts/style-baseline.json` is `{}`.
- The three sentences over 60 words are split, along with the rest of the 43 sentences that were over 45 words with a colon or semicolon. There are now zero in both categories; the longest sentence in the parsed body is 54 words.
- The six chart-caption constructions and the SeeAlso labels are rewritten.
- The four bold lead-ins per locale are `###` headings.
- The five strong personifications are rewritten.
- The README count is 292.
- The audit itself was tightened: quoted spans are masked, the `não ... mas` rule skips parentheticals and purpose clauses, `here is` no longer matches across words, the `transistor-eras.ts` copy is now scanned, `chokepoints.ts` and `yield-references.ts` are in `COPY_MODULES`, and acronym definitions are exempt from the bold rule.
- The cleft rewrites were applied to the densest paragraphs. The broad scan still finds 31 Portuguese and 16 English emphatic `É`/`It is`/`That is` sentences, many of them ordinary copular sentences rather than clefts.

Step 4 is also applied. `scripts/audit-citations.py` checks all 292 entries and every reference shape; it passes with no duplicate, unused or unresolved key. `scripts/audit-syntax.py` enforces the 60-word cap and the 45-word colon rule; it passes with 0 violations, and it reports the 91 remaining sentences over 45 words without punctuation and the cleft density, whose maximum is now 2.2 per 1,000 words. Both scripts run in `bun run audit` and in the deploy workflow.

## 1. What the two sources actually claim

### 1.1 Wikipedia: content and vocabulary

The page groups the tells into a few families. The ones that matter for a sourced explainer:

| Family | What it looks like | Why it reads as generated |
| --- | --- | --- |
| Significance puffery | "stands as a testament", "plays a pivotal role", "underscores its importance", "reflects broader trends" | The sentence adds importance instead of a fact. |
| Notability padding | "featured in", "independent coverage", "maintains an active digital presence" | The source list becomes the subject. |
| Superficial analysis | a trailing "-ing" clause: ", highlighting the...", ", reflecting...", ", ensuring..." | The clause interprets the fact instead of stating a consequence. |
| Vague attribution | "experts agree", "studies show", "industry reports suggest" | The claim loses its named source. |
| Outline conclusion | "challenges and opportunities", "future prospects", "remains to be seen" | The section predicts instead of reporting. |
| AI vocabulary | delve, leverage, robust, seamless, tapestry, realm, showcase, underscore, pivotal | The words are statistically overrepresented in model output. |
| Copula avoidance | "serves as", "acts as", "stands as" where "is" would do | The sentence inflates a plain relation. |
| Negative parallelism | "not X, but Y", "X, not Y", "not just X, but also Y", "Y rather than X" | The definition arrives through a contrast the reader has to resolve. |
| Rule of three | three abstract nouns in a rhetorical list | The rhythm replaces the argument. |
| Em dashes | clusters of U+2014 | A known tell, already banned in this repo. |
| Citation and markup defects | broken links, invalid DOIs, `utm_source`, unused named references, raw Markdown | The text was assembled without a final read. |

The page's caveats matter as much as the list: the signs are descriptive, not diagnostic; human writing contains many of them; and detection tools have non-trivial error rates.

### 1.2 arXiv: processing cost

The paper measures six features that psycholinguistics associates with reading difficulty, and finds that frontier models overuse them relative to round-trip paraphrases and human corpora:

| Feature | What it is | Why it costs the reader |
| --- | --- | --- |
| Rare n-grams | bigrams and trigrams that seldom occur in a reference corpus | Predictability drops, so each word takes longer to integrate. |
| Dependency length | distance between a word and its syntactic head | Working memory has to hold the dependency open. |
| Object relative clauses | "the house that the contractors built" | Non-canonical order and a longer filler-gap dependency. |
| Stacked noun compounds | three or more nouns in a modifier chain | Bracketing ambiguity: which noun modifies which. |
| Denominal verbs | an ad-hoc noun used as a verb ("to calendar it") | Part-of-speech reanalysis mid-sentence. |
| Inanimate subjects | an inanimate subject with a verb that selects an animate one ("the asymmetry bites") | A selectional restriction is violated, so the parser reanalyses. |

The paper's proposed cause is a training pressure for information density. Its remedy is the same as an editor's: shorten dependencies, unpack noun stacks, prefer the plain verb, and give the reader the optional word when it helps.

## 2. Method and coverage

- **Corpus.** 22 chapter pairs, `docs/<slug>.md` and `docs/en/<slug>.md`. Prose lines only: fenced code, tables, standalone component tags and the bibliography are excluded. 40,572 Portuguese words and 38,455 English words.
- **Theme copy.** The bilingual strings in `theme/home-sections.ts`, `chain.ts`, `fab-stages.ts`, `furnace-stages.ts`, `milestones.ts`, `transistor-eras.ts`, `yield-presets.ts`, `charts/specs.ts`, plus `chokepoints.ts`, `yield-references.ts` and the chart captions.
- **Drawings.** The `<text>` labels of the 58 SVGs, already covered by `audit-svgs.py` and the SVG half of `audit-style.py`.
- **Citations.** All 292 entries in `theme/citations.ts`, all `<Cite>` markers, `SourceNote` id lists, `sourceIds` arrays and `processCite` fields.
- **Tools.** The repo's own audits, a regex inventory of the Wikipedia categories, and spaCy 3.8 with `en_core_web_sm` and `pt_core_news_sm` for dependency length, relative clauses, noun chains and subject animacy.
- **Reading.** Every parser hit was read. The parser is a smoke detector; several apparent hits are legitimate technical usage and are listed under "What not to change".

Limits: the small spaCy models are approximate, especially for Portuguese noun compounds; the paper's n-gram measure needs a reference corpus, so this audit checks vocabulary and noun stacks instead; and style cannot establish authorship.

## 3. Results at a glance

The counts below are the pre-Step-1 snapshot. The status section records what changed.

| Finding | Source | Instances | Severity | Verdict |
| --- | --- | --- | --- | --- |
| Negative parallelism (prose and captions) | Wikipedia | 51 matches, 3 false positives | major | Rewrite about 30; rephrase the rest so the positive claim leads. |
| Long sentences with a colon or semicolon | arXiv | 43 over 45 words; 3 over 60 | major | Split at the punctuation or the relative clause. |
| Cleft cadence (`É ... que`, `It is ... that`, `That is why`) | arXiv | 39 PT, 13 EN, 14 EN "That is why" | minor to major | Rewrite the densest chapters, then set a budget. |
| Bold lead-ins in running prose | Wikipedia | 6 | minor | Turn them into `###` headings or plain text. |
| Strong personification | arXiv | 5 | minor | Rewrite the ad-hoc ones; leave conventional technical metaphors. |
| Audit blind spots | both | 7 | major for maintenance | Fix the rules and add the missing checks. |
| Citations without a URL | Wikipedia | 10 | minor | Journal articles and standards; optional DOI enrichment. |
| Stale source count in README | Wikipedia (outdated counts) | 1 | minor | Change 278 to 292. |
| AI vocabulary | Wikipedia | 0 real | none | No action. |
| Significance, notability, superficial -ing, vague attribution, outline conclusions | Wikipedia | 0 real | none | No action. |
| Em dashes, raw anchors, heading colons, placeholder text | Wikipedia | 0 | none | No action. |
| Object relatives, noun stacks, denominal verbs | arXiv | no systemic problem | none | No action beyond two noun phrases. |

## 4. What is already clean

This matters because it changes the fix: the project does not need a rewrite, a vocabulary purge, or a tone change.

- **No significance puffery.** The phrases the Wikipedia page lists ("stands as a testament", "pivotal moment", "underscores its importance", "reflects broader trends") do not occur. The seven regex hits were literal functions: "um óxido nativo que serve de isolante", "which serves as a mask and as a gate dielectric".
- **No notability padding.** The only "covered by" is "covered by confidentiality".
- **No superficial "-ing" analysis.** The gerund scan found mechanism and result clauses ("produzindo uma profundidade de penetração", "reduzindo a recombinação"), not evaluative tails ("highlighting its importance"). The distinction is real: the first says what the process does, the second tells the reader what to think.
- **No vague attribution.** Every factual claim carries a `<Cite>` or a `<SourceNote>`. "Experts", "studies" and "the industry" are not used as sources.
- **No outline conclusion.** The only candidate is `## O que fica` in `alem-do-silicio`, and it is a substantive spine item with new material (the 2022 Wolfspeed fab and the freshness stamp), not a "challenges and future prospects" section.
- **No AI vocabulary.** The full Wikipedia list returns zero occurrences of delve, leverage, robust, seamless, tapestry, realm, showcase, underscore, pivotal, meticulous, multifaceted, transformative and the rest. The three "essential", two "ecosystem" and three "next-generation" uses are literal, and "next-generation lithography" is a proper name.
- **No copula avoidance in the puffery sense.** "Serves as" is used for a physical function, not to inflate a subject.
- **No em dashes in prose.** `audit-prose.py` reports zero.
- **No markup defects.** No raw `<a href="/...">`, no heading ending in a colon, no triple blank lines, no `TODO` or placeholder text. The `TODO` regex matched Portuguese "todo"; that is a false positive in the scanner, not a page defect.
- **Citation registry is sound.** 292 entries, no duplicate key or number, every entry used, every `<Cite>`, `SourceNote`, `sourceId` and `processCite` resolves. The monthly lychee job already checks the URLs.
- **Build and audits pass.** `bun run build` completes in about 21 s. Glossary: 198 annotations, locale parity. Links: 3,144 internal anchors across 45 pages. Maths: only the six expected pages. SVGs: 0 errors, 3 palette warnings.
- **The syntactic averages are good.** Mean dependency length is 2.43 tokens in Portuguese and 2.50 in English. Average sentence length is 18.7 and 19.2 words. Object relative clauses are rare (10, all legitimate), and there are no reduced object relatives. The corpus has a short average dependency length and a tail of long sentences.

## 5. What needs work

### 5.1 Negative parallelism

This is the largest single backlog. `audit-style.py` already flags the pattern, but `scripts/style-baseline.json` lets 48 prose findings and 6 caption findings persist. The new sources make the case for clearing them.

The current audit finds 54 matches. Three are false positives:

- `docs/historia-fotolitografia.md:27`, "O arranjo é simples e barato (não usa lente alguma), mas o contato repetido danifica a máscara": a parenthetical, not a contrast.
- `docs/historia-fotolitografia.md:70`, "A máscara tem de ser fina para não absorver nem distorcer, mas fina demais e os raios X a atravessam": a real trade-off, not a definition by negation.
- `docs/en/transistores.md:230`, "is defined by DRAM half pitch, not by the transistor gate length": a direct quotation from the ITRS. It must not be edited.

That leaves 51 matches, about 30 of them the rhetorical frame and the rest technical distinctions that can stay if the positive claim leads. The densest files are `dados` (8), `mineracao-mg-si` (8), `alem-do-silicio` (7), `confiabilidade` (4), `estrutura-wafers` (3) and `o-elemento-silicio` (3).

The fix is to make the positive claim the main clause and, when the contrast carries information, put it in its own sentence. The chart captions are the clearest case: "É um modelo, não uma medição" can become "É um modelo: as curvas saem da equação de Poisson." The reader still knows nothing was measured.

#### Exact rewrites for the repeated constructions

Each entry covers the Portuguese and the English line. The line numbers are the same in both files unless noted.

| Where | Current | Rewrite |
| --- | --- | --- |
| `theme/charts/specs.ts:81-82` | "É um esquema qualitativo, não uma medição: os eixos mostram o formato, não valores." / "This is a qualitative sketch, not a measurement: the axes show shape, not values." | "É um esquema qualitativo: os eixos mostram o formato." / "This is a qualitative sketch: the axes show shape." |
| `theme/charts/specs.ts:269-270` | "É um cálculo, não uma medição." / "It is a calculation, not a measurement." | "É um cálculo do modelo; as curvas são previstas." / "It is a model calculation; every curve is predicted." |
| `theme/charts/specs.ts:517-518` | "É um cálculo, não uma medição; o eixo é logarítmico..." / "It is a calculation, not a measurement; the axis is logarithmic..." | "É um cálculo pela definição da JESD85A; o eixo é logarítmico..." / "It is a calculation from the JESD85A definition; the axis is logarithmic..." |
| `alem-do-silicio.md:11` | "...não por serem melhores em tudo, mas por terem uma propriedade que o silício não tem." | "...ganham dele em aplicações específicas por uma propriedade que o silício não tem." |
| `alem-do-silicio.md:41` | "Esses materiais não substituem o silício na lógica por causa do substrato, não do gap." | "Esses materiais não substituem o silício na lógica por causa do substrato. O gap não é o obstáculo." |
| `alem-do-silicio.md:65` | "As constantes deste capítulo vêm de tabelas de referência, não de medições de um ano." | "As constantes deste capítulo vêm de tabelas de referência. Nenhuma é uma medição feita neste ano." |
| `alem-do-silicio.md:70` (SeeAlso note) | "por que o silício, e não o germânio" | "por que o silício venceu o germânio" |
| `celulas-solares.md:31` | "...mudou o produto, não a sequência do processo." | "...mudou o produto; a sequência do processo ficou igual." |
| `confiabilidade.md:32` | "O gráfico abaixo é um esquema, não um conjunto de dados: ele existe para fixar as três regiões na cabeça, não para ser medido." | "O gráfico abaixo é um esquema. Ele existe para fixar as três regiões na cabeça; os valores são ilustrativos." |
| `confiabilidade.md:125` | "...não se pode impedir a partícula, mas se pode detectar e corrigir o bit que ela virou." | "...não se pode impedir a partícula; dá para detectar e corrigir o bit que ela virou." |
| `dados.md:46` | "É um modelo, não uma medição." | "É um modelo: as curvas saem da equação de Poisson." |
| `dados.md:72` | "...gerado a partir da mesma definição que o desenha, não de uma planilha paralela que envelheceria sozinha..." | "...gerado a partir da mesma definição que o desenha. Não existe planilha paralela para envelhecer sozinha." |
| `dados.md:99` | "...o selo dele aponta o dado mais recente que o capítulo cita, não os números de 2011." | "...o selo dele aponta o dado mais recente que o capítulo cita; os números de 2011 ficam no texto, identificados como antigos." |
| `dados.md:101` | "É uma informação de leitura, não de validade: um número de 2011 pode continuar sendo a melhor referência..." | "É uma informação de leitura: diz a idade do dado. Um número de 2011 pode continuar sendo a melhor referência..." |
| `empacotamento.md:167` | "Apenas os interposers precisam de vias atravessando o silício, não os chips..." | "Apenas os interposers precisam de vias atravessando o silício; os chips dispensam essas vias." |
| `mineracao-mg-si.md:40` | "O que se extrai ali é uma rocha, não um cristal isolado..." | "O que se extrai ali é uma rocha: quartzo, feldspato e mica crescidos juntos." |
| `mineracao-mg-si.md:121` | "O desenho é um esquema das trocas de ligação, não uma contagem balanceada de átomos..." | "O desenho é um esquema das trocas de ligação. A equação de cada etapa, impressa sob a tela, carrega a estequiometria." |
| `mineracao-mg-si.md:153` | "É essa conta de energia, e não a disponibilidade de quartzo, que decide onde o MG-Si é produzido..." | "A conta de energia decide onde o MG-Si é produzido. A disponibilidade de quartzo não é o limite." |
| `mineracao-mg-si.md:161` | "É esse conjunto de fatores, e não o minério, que decide onde uma planta se instala." | "Esse conjunto de fatores decide onde uma planta se instala. O minério sozinho não basta." |
| `na-fab.md:123` | "A espessura passa a depender apenas do número de ciclos, e não de tempo, vazão ou temperatura." | "A espessura passa a depender só do número de ciclos. Tempo, vazão e temperatura deixam de importar." |
| `o-elemento-silicio.md:47` | "A ficha descreve um arranjo, não um átomo solto..." | "A ficha descreve um arranjo: cada silício se liga a quatro vizinhos..." |
| `o-elemento-silicio.md:95` | "Purificar o isótopo, e não o elemento, é o que torna o silício um material quântico..." | "O silício vira material quântico quando se purifica o isótopo." |
| `polissilicio.md:348` | "A alta, porém, veio de um pico artificial de instalações na China antes de uma mudança regulatória, e não de demanda estrutural..." | "A alta, porém, veio de um pico artificial de instalações na China antes de uma mudança regulatória. A demanda estrutural não mudou." |
| `en/precos-e-valor.md:63` | "today it is a generation name, not a measurement." | "today it is a generation name." |
| `en/precos-e-valor.md:63` | "cost per transistor now depends on how many functions fit into the same metal pitch, not on the process label." | "cost per transistor now depends on how many functions fit into the same metal pitch." |
| `estrutura-wafers.md:84` | "o flat secundário fica a 135°, não a 180°." | "o flat secundário fica a 135°; a convenção antiga o punha a 180°." |
| `estrutura-wafers.md:112` | "...o limite da norma é o mínimo que um wafer prime precisa cumprir, não o que a indústria de fato entrega." | "...o limite da norma é o mínimo que um prime precisa cumprir; as folhas de fornecedor mostram o que a indústria de fato entrega." |
| `estrutura-wafers.md:116` | "O diâmetro parou de crescer em 300 mm, e não por falta de ambição." | "O diâmetro parou de crescer em 300 mm por razões econômicas." |
| `fotolitografia.md:77` | "A revelação é feita wafer a wafer, e não em lote, para que cada um receba a mesma dose." | "A revelação é feita wafer a wafer: cada um recebe a mesma dose." |
| `en/transistores.md:96` | "Production arrived before the 0.25 µm node, not at it." | "Production arrived a node early, at 0.35 µm." |

The remaining matches are the direct translations of these lines. Apply the same rewrite on both sides. For the full per-file list, run `python scripts/audit-style.py --show docs/<file>.md`; for the English mirror, run it on `docs/en/<file>.md`.

### 5.2 Long sentences

In the parsed body prose (2,051 Portuguese and 1,918 English sentences) there are 153 sentences over 40 words (76 PT, 77 EN), 58 over 45, and 43 over 45 with a colon or semicolon. Three are over 60 words. The average is 19 words, so the long sentences are outliers.

The actionable rule: a sentence over 45 words that contains a colon or semicolon is a split candidate. The punctuation usually marks the seam. The 43 candidates are listed in Appendix A.

The ten worst, with the seam and a rewrite:

| Where | Words | Seam | Rewrite |
| --- | --- | --- | --- |
| `transistores.md:82` | 65 | colon after "Intel" | "O conceito nasceu na IBM, mas a adoção em produção veio com a CHMOS III da Intel. O paper da Intel descreve a estrutura LDD como o recurso que garantia a confiabilidade do transistor, ao lado de uma porta de 250 Å e de um canal típico de 1,0 µm. O texto já anunciava o uso da tecnologia no microprocessador de 32 bits seguinte." |
| `transistores.md:108` | 64 | semicolon after "limitado" | "O SIMOX o formava com uma implantação de oxigênio em dose altíssima, que exigia máquinas pesadas e de rendimento limitado. O Smart Cut, patenteado pela CEA em 1994, implanta íons de hidrogênio, cola a face da lâmina a um substrato-suporte e aquece o conjunto acima de 500 °C. A pressão das microbolhas separa então o filme fino do resto da lâmina." |
| `en/transistores.md:108` | 61 | semicolon after "output" | "SIMOX formed it with an extremely high-dose oxygen implant, which called for heavy implantation machines of limited output. Smart Cut, patented by CEA in 1994, implants hydrogen ions, bonds the wafer face to a support substrate and heats the stack above 500 °C. The pressure of the microbubbles then splits the thin film off the rest of the wafer." |
| `en/transistores.md:102` | 59 | semicolon after "SOI" | "IBM planned to move its copper 0.22 µm CMOS-7S process to SOI in the first quarter of 1999, which would make it the first microprocessor vendor in volume production with SOI. In 2000 the RS64-IV shipped on 0.18 µm copper SOI, and today the FD-SOI variant occupies niches in low-power and RF designs." |
| `en/transistores.md:82` | 58 | colon after "III" | "The concept originated at IBM, but production adoption came with Intel's CHMOS III. Intel's own paper describes the LDD structure as the feature that insured transistor reliability, alongside a 250 Å gate oxide and a typical 1.0 µm electrical channel. It already announced that the technology would be used to produce the next 32-bit microprocessor." |
| `fotolitografia.md:87` | 57 | two colons | "A duplicação de linhas (*line doubling*) é a versão mais direta do multi-padrão. O primeiro padrão é gravado na camada dura. O segundo é exposto no fotorresiste entre os traços que já existem. Na gravação seguinte, as duas máscaras se somam: o número de traços dobra sem que nenhuma exposição fique mais fina." |
| `en/polissilicio.md:314` | 55 | semicolon and colon | "The recent extremes show the scale of the movement. In June 2020 the spot price hit its historical low of US\$ 6.75/kg; by August 2022 it stood at US\$ 39/kg. The entire climb took about two years, followed by another wave of projects and, by the consultancy's own account, another inevitable shakeout." |
| `fotolitografia.md:11` | 54 | colon after "multi-padrões" | "A mesa de posicionamento do wafer pesa cerca de 15 kg e acelera com força de até 20 G, cerca de três vezes a aceleração de um carro de Fórmula 1. Ela se move com precisão de nanômetros para o multi-padrão: vários retículos em sequência, para linhas menores que as de uma única exposição." |
| `fotolitografia.md:85` | 54 | colon after "luz" | "Existe um limite físico para o que uma exposição consegue desenhar. A indústria passou décadas contornando-o por software e por processo, em vez de trocar a fonte de luz: máscaras de deslocamento de fase, iluminação fora de eixo, correção óptica de proximidade (OPC) e, quando nada disso bastou, mais de uma exposição." |
| `empacotamento.md:303` | 52 | colon after "resto" | "É uma fração menor do total, mas é a fração que limita o resto. A TSMC declarou em 2024 que a capacidade de CoWoS mais que dobrou em relação ao ano anterior e que pretendia dobrá-la de novo. Mesmo assim, a demanda dos clientes excedia em muito a capacidade de fornecimento." |
| `mineracao-mg-si.md:27` | 51 | colon after "raríssimos" | "O quartzo precisa ser livre de boro e de metais alcalinos na casa das partes por bilhão. Depósitos assim são raríssimos: cerca de 70% a 90% do quartzo de alta pureza do mundo sai de uma única região, os pegmatitos de Spruce Pine, nas montanhas Apalaches da Carolina do Norte." |
| `en/precos-e-valor.md:55` | 52 | colon after "them" | "It is missing because it is not published in a comparable way. Wafer supply contracts are negotiated case by case and covered by confidentiality, so the numbers that circulate in presentations rarely have a primary source behind them. This site already recorded the same problem when handling wafer makers' market share in crystal structure, where the round "60%" figure did not survive the data." |

After these, set a hard cap at 60 words and a soft target at 45. The three over 60 are `transistores.md:82`, `transistores.md:108` and `en/transistores.md:108`; fixing them clears the hard cap.

### 5.3 Cleft cadence

Portuguese uses the cleft `É X que ...` 39 times in 40,572 words, about one per 1,000. English mirrors it with `It is X that ...` 13 times and adds 14 `That is why ...` openers. The density is highest in `precos-e-valor` (5.4 per 1,000), `en/alem-do-silicio` (3.3), `gargalos` (3.3) and `alem-do-silicio` (3.0).

Clefts are grammatical and sometimes the clearest option. The problem is repetition: when every explanation arrives as "It is the same X that ...", the prose acquires a formula. The paper's dependency-length finding gives a reason to care: the cleft delays the subject and keeps the relative clause open.

Examples and direct alternatives:

| Current | Direct alternative |
| --- | --- |
| "É o mesmo argumento que o capítulo de células e módulos solares usa..." | "O capítulo de células e módulos solares usa o mesmo argumento..." |
| "É a mesma propriedade física que explica, no capítulo solar, por que..." | "A mesma propriedade física explica, no capítulo solar, por que..." |
| "É por isso que SiC e GaN conseguem fazer..." | "Por isso, SiC e GaN conseguem fazer..." |
| "É a etapa que transforma uma lâmina de silício num dispositivo." | "Essa etapa transforma uma lâmina de silício num dispositivo." |
| "It is the same argument solar cells and modules makes..." | "Solar cells and modules make the same argument..." |
| "It is the same physical property that explains..." | "The same physical property explains..." |
| "That is why SiC and GaN can do..." | "So SiC and GaN can do..." |
| "That is why wafer test... has become a viability requirement." | "Wafer test has therefore become a viability requirement." |

Rewrite the clearest 15, not all 39. Then set a budget of 3 per 1,000 words per file. The current maximum is 5.4, so the budget is a ratchet, not a gate that fails today.

### 5.4 Bold lead-ins

`audit-style.py` flags eight bold spans. Two are legitimate acronym definitions (`**Backside Power Delivery Network (BSPDN)**` in `transistores.md:184` and its English mirror). Six are paragraph lead-ins in `alem-do-silicio`:

- `docs/alem-do-silicio.md:53` `**Sensores de imagem.**`
- `docs/alem-do-silicio.md:55` `**Fotônica de silício.**`
- `docs/alem-do-silicio.md:57` `**Qubits.**`
- The English mirrors at 53, 55 and 57.

The MEMS paragraph at line 47 uses the same shape, but the audit exempts it because MEMS is a glossary term. Convert it too, for consistency: four `###` headings per locale.

Turn each into a `###` heading. The chapter's spine already lists the four as one item, and no internal link points at these anchors, so the change is safe. The headings are nouns, which is the house rule.

### 5.5 Strong personification

The broad parser found 112 inanimate-subject hits in each language. A narrower list of strongly animate verbs leaves 34 Portuguese and 58 English. Most are conventional technical metaphors: "the etch eats", "the defect kills", "the transistor loses gain", "the process creeps". Replacing those would add words without adding clarity.

Five are ad-hoc enough to rewrite:

| Where | Current | Rewrite |
| --- | --- | --- |
| `en/empacotamento.md:131` | "Wire bonding won itself a much wider application band..." | "Wire bonding ended up with a much wider application band..." |
| `en/historia-fotolitografia.md:66` | "EPL died of throughput..." | "EPL was abandoned because of throughput..." |
| `en/historia-fotolitografia.md:92` | "The candidate that least looked capable of lasting several generations is the one that won..." | "The least likely candidate to last several generations prevailed..." |
| `en/na-fab.md:218` | "...as wide as the drawing asked." | "...as wide as the design specified." |
| `en/dados.md:54` | "Poisson cannot see that..." | "The Poisson model does not capture that..." |

The Portuguese "Os números dizem o contrário" (`empacotamento.md:109`) and "três delas decidem processos inteiros" (`o-elemento-silicio.md:25`) are conventional metonymy. Leave them, or change "decidem" to "determinam" if a lighter verb is wanted.

### 5.6 Chart captions and SeeAlso labels

The six chart-caption matches are covered in 5.1. One SeeAlso label also carries the frame:

- `docs/alem-do-silicio.md:70` and `docs/en/alem-do-silicio.md:70`: "por que o silício, e não o germânio" / "why silicon, and not germanium". Rewrite to "por que o silício venceu o germânio" / "why silicon beat germanium".

### 5.7 Audit blind spots

These are maintenance defects: the current audits pass, but they do not see the following.

1. **`transistor-eras.ts` is listed in `COPY_MODULES` but its prose is not matched.** The file uses `descPt`/`descEn`, `productsPt`/`productsEn`, `altPt`/`altEn`, and `namePt`/`nameEn`. `COPY_RE` only matches `pt:` and `en:`. Extend the regex to the `*Pt`/`*En` pairs, or add a second pattern.
2. **`chokepoints.ts` and `yield-references.ts` are not in `COPY_MODULES`.** They contain reader-facing `pt`/`en` prose. Add both. `usgs-silicon.ts` contains labels only; it can stay out.
3. **Quoted material is not exempt.** `audit-style.py` flags the ITRS quotation in `docs/en/transistores.md:230`. A rule that forces an edit to a cited quotation is wrong. Mask `"..."` and `“...”` spans before running the contrast and commentary regexes.
4. **The `não ... mas` rule is too broad.** It catches the parenthetical at `docs/historia-fotolitografia.md:27`. Require the clause to start after a sentence boundary or a comma, and exclude a preceding `(`.
5. **`here is` matches across words.** `fab-stages.ts:168` has "The light drawn here is the 193 nm DUV line", and the commentary regex sees "here is". Require a sentence start or a comma before `here is`, or match only `here's`.
6. **No citation-registry audit.** There is a monthly URL check, but no in-repo check for duplicate keys or numbers, unresolved `<Cite>` ids, `SourceNote` ids, `sourceIds`, `processCite` values, or unused entries. The current registry passes; a one-page script would keep it that way.
7. **No syntax budget.** Nothing stops a future edit from adding a 70-word sentence or a fifth cleft in a short chapter. A report script with a ratchet would close the gap.

### 5.8 Citation hygiene

The registry is in good shape: 292 entries, no duplicates, all used, all resolve. Ten entries have no URL:

- Five journal articles with volume and pages: Zulehner 2000, Möller 2012, Runnels 1994, Kern 1990, Teal and Buehler 1952. Adding the DOI would make each one clickable.
- Three standards: JEP122, SEMI F63, SEMI T7. These are paywalled; the publisher and standard number are the usable citation.
- Two books or reports: Sze and Ng, and the CSET export-controls report. The CSET report has a public URL and could be linked; the Sze book is a standard reference and does not need one.

This is optional. The Wikipedia page's "book citations without page numbers or URLs" sign is about using a book as a vague prop; here the pages and publishers are specific.

### 5.9 README count

`README.md:26` says "278 numbered sources". The registry has 292 entries. Change 278 to 292. The Portuguese README does not carry the count, so no mirror edit is needed.

## 6. What not to change

- **Quoted text.** The ITRS quotation at `docs/en/transistores.md:230` is data. Do not rewrite it to satisfy a style rule. Fix the audit instead.
- **Conventional technical metaphors.** "The etch eats", "the defect kills", "the transistor loses gain", "the process creeps" are standard in the field. The paper's concern is ad-hoc personification. Settled technical usage is fine.
- **Technical noun stacks.** "High-k metal gate", "gate-all-around", "backside power delivery" and "chemical mechanical polishing" are terms of art, and most are in the glossary. The parser's 4+ noun chains are almost all proper names (Lawrence Livermore National Laboratory, Universal Chiplet Interconnect Express) or product names. Do not unpack them.
- **Legitimate `rather than` choices.** "Uses X rather than Y" is often the clearest way to state a design choice. The Wikipedia sign is the rhetorical frame; a plain comparative is fine.
- **Rule-of-three enumerations.** "Mortalidade infantil, vida útil e desgaste" is a technical list of three. The rhetorical triad the Wikipedia page describes is a different shape.
- **The glossary's first-use rule.** Terms are annotated on first use, which sometimes means a bare term appears in a heading or caption. The audit already handles the contexts the plugin cannot reach.

## 7. The plan

### Step 1: clear the hard cap and the easy wins

1. Split the three sentences over 60 words: `transistores.md:82`, `transistores.md:108`, `en/transistores.md:108`.
2. Fix the six chart-caption matches and the SeeAlso label in 5.1.
3. Turn the bold lead-ins in `alem-do-silicio` into `###` headings: four per locale, including MEMS.
4. Rewrite the five strong personifications.
5. Change the README count to 292.
6. Run `python scripts/audit-style.py --update-baseline` after the edits, so the ratchet records the lower count.

### Step 2: clear the negative parallelism, one chapter pair per commit

Order by density:

1. `dados` (8)
2. `mineracao-mg-si` (8)
3. `alem-do-silicio` (7)
4. `confiabilidade` (4)
5. `estrutura-wafers` (3)
6. `o-elemento-silicio` (3)
7. `empacotamento`, `celulas-solares`, `polissilicio`, `na-fab` (2 each)
8. `fotolitografia`, `transistores`, `precos-e-valor`, the chart captions (1 each)

Each commit changes PT and EN in the same edit, per `AGENTS.md`. When a file reaches zero, lower the baseline. The goal is zero in both `style-contrast` and `copy-contrast`; a smaller ratchet is only a waypoint.

### Step 3: rewrite the cleft and long-sentence tail

1. Rewrite 15 clefts, starting with `precos-e-valor`, `alem-do-silicio`, `gargalos` and `mineracao-mg-si`.
2. Split the 43 sentences in Appendix A, starting with the ten in 5.2.
3. Set the budgets: 60 words hard, 45 soft, 3 clefts per 1,000 words.

### Step 4: change the audits

1. Extend `audit-style.py`:
   - mask quoted spans before the contrast and commentary regexes;
   - tighten the `não ... mas` rule;
   - fix the `here is` false positive;
   - add `style-significance` (only the puffery phrases, not literal "serves as");
   - add `style-superficial` (evaluative trailing gerunds);
   - add `style-vague` (unnamed attribution);
   - add `style-outline` (challenges/future/legacy headings and phrases);
   - add `style-notability` (featured in, independent coverage, active presence);
   - add `style-collaborative` (chatbot remnants).
2. Extend the copy scan:
   - add `chokepoints.ts` and `yield-references.ts` to `COPY_MODULES`;
   - match the `*Pt`/`*En` fields in `transistor-eras.ts`.
3. Add `scripts/audit-citations.py`:
   - duplicate `key` or `num`;
   - every `<Cite>`, `SourceNote`, `sourceIds` and `processCite` resolves;
   - unused entries;
   - `utm_`, whitespace or malformed URLs;
   - missing `short` and `publisher`.
4. Add `scripts/audit-syntax.py` (report plus ratchet):
   - sentences over 60 words;
   - sentences over 45 words with a colon or semicolon;
   - clefts per 1,000 words per file;
   - a curated strong-personification list.
5. Add the new checks to `package.json` and `.github/workflows/deploy-pages.yml`, after the existing audits.

### Step 5: verify

```
bun run build
python scripts/audit-prose.py
python scripts/audit-style.py
python scripts/audit-svgs.py
python scripts/audit-glossary.py
python scripts/audit-math.py
python scripts/audit-links.py
python scripts/audit-numbers.py
python scripts/audit-citations.py
python scripts/audit-syntax.py
```

`audit-numbers` stays a report. The rest must print `OK`. The new scripts should start as ratchets with the current counts, so CI stays green while the backlog is worked down.

## Appendix A: long sentences with a colon or semicolon

This is the pre-fix list. These 43 sentences were over 45 words and contained a colon or semicolon; they are now split. The first column is the word count at the time of the audit. The seam was usually the punctuation.

| Words | Where | Opening |
| --- | --- | --- |
| 65 | `docs/transistores.md:82` | O conceito nasceu na IBM, mas a adoção em produção veio com a CHMOS III da Intel: o próprio paper da Intel descreve... |
| 64 | `docs/transistores.md:108` | O SIMOX o formava com uma implantação de oxigênio em dose altíssima, que exigia máquinas de implantação pesadas... |
| 61 | `docs/en/transistores.md:108` | SIMOX formed it with an extremely high-dose oxygen implant, which called for heavy implantation machines... |
| 59 | `docs/en/transistores.md:102` | IBM planned to move its copper 0.22 µm CMOS-7S process to SOI in the first quarter of 1999... |
| 58 | `docs/en/transistores.md:82` | The concept originated at IBM, but production adoption came with Intel's CHMOS III... |
| 57 | `docs/fotolitografia.md:87` | A ideia de duplicação de linhas ( line doubling ) é a versão mais direta do multi-padrão... |
| 55 | `docs/en/polissilicio.md:314` | The recent extremes show the scale of the movement: in June 2020 the spot price hit... |
| 54 | `docs/fotolitografia.md:11` | A mesa de posicionamento do wafer pesa cerca de 15 kg e pode acelerar com força de até 20 G... |
| 54 | `docs/fotolitografia.md:85` | Existe um limite físico para o que uma exposição consegue desenhar, e a indústria passou décadas... |
| 53 | `docs/en/empacotamento.md:287` | SemiAccurate argued that the smallest block the company could fuse off was a cluster of 32 cores... |
| 53 | `docs/en/mineracao-mg-si.md:27` | The quartz must be free of boron and of alkali metals down to the parts-per-billion level... |
| 52 | `docs/empacotamento.md:287` | A SemiAccurate argumentou que o menor bloco desligável era um cluster de 32 núcleos... |
| 52 | `docs/empacotamento.md:303` | É uma fração menor do total, mas é a fração que limita o resto: a TSMC declarou em 2024... |
| 52 | `docs/en/fotolitografia.md:85` | There is a physical limit to what a single exposure can draw, and the industry spent decades... |
| 52 | `docs/en/fotolitografia.md:87` | Line doubling is the most direct form of multi-patterning: the first pattern is etched... |
| 52 | `docs/en/precos-e-valor.md:55` | Wafer supply contracts are negotiated case by case and covered by confidentiality... |
| 51 | `docs/fotolitografia.md:199` | A solução foi a óptica anamórfica: redução de 8× na direção da varredura e 4× na outra... |
| 51 | `docs/mineracao-mg-si.md:27` | O quartzo precisa ser livre de boro e de metais alcalinos na casa das partes por bilhão... |
| 50 | `docs/empacotamento.md:287` | No relógio, a SemiAccurate ouviu que a divisão de bins do stepping A2 punha o teto da Fermi... |
| 50 | `docs/en/empacotamento.md:215` | On the processor side, that means a trace count that has no way of existing on a board... |
| 50 | `docs/fotolitografia.md:74` | Um resiste positivo começa a reticular por volta de 130 a 140 °C... |
| 49 | `docs/en/empacotamento.md:303` | It is a minority of the total, but it is the minority that constrains the rest... |
| 49 | `docs/en/fotolitografia.md:11` | The wafer positioning stage weighs about 15 kg and can accelerate with a force of up to 20 G... |
| 49 | `docs/en/mineracao-mg-si.md:11` | Quartz enters the chain along two distinct paths, and it is worth separating them... |
| 48 | `docs/celulas-solares.md:57` | A substituição foi rápida quando as patentes que a bloqueavam expiraram, em 2020... |
| 48 | `docs/celulas-solares.md:149` | A distância entre as duas primeiras barras do gráfico e as três últimas é o resumo da disputa... |
| 48 | `docs/en/celulas-solares.md:149` | The gap between the first two bars in that chart and the last three is this chapter's contest... |
| 48 | `docs/en/transistores.md:134` | Before high-k the dielectric had already changed once: adding nitrogen to SiO₂ forms... |
| 48 | `docs/fotolitografia.md:48` | A primeira é a mesa do wafer, que se move de campo em campo com precisão de nanômetros... |
| 48 | `docs/fotolitografia.md:107` | Um excímero é uma molécula que só existe enquanto está eletricamente excitada... |
| 48 | `docs/polissilicio.md:251` | A planta produzia silício com cerca de 70% menos energia que a rota Siemens de referência... |
| 48 | `docs/transistores.md:134` | Antes do high-k, o dielétrico já havia mudado uma vez: acrescentar nitrogênio ao SiO₂... |
| 47 | `docs/empacotamento.md:129` | Um fio de cobre de 25 µm custa menos de um décimo de um fio de ouro equivalente... |
| 47 | `docs/en/fotolitografia.md:74` | A positive resist starts to cross-link at about 130 to 140 °C... |
| 47 | `docs/en/transistores.md:33` | The silicon in front of the active area is cut away, so the front face of the slab... |
| 46 | `docs/empacotamento.md:109` | Os números dizem o contrário: mais de 80% dos invólucros de semicondutores ainda são montados... |
| 46 | `docs/empacotamento.md:215` | Do lado do processador, isso significa uma contagem de trilhas que não tem como existir em placa... |
| 46 | `docs/empacotamento.md:271` | É o mesmo die Coffee Lake, com os mesmos seis núcleos e hyper-threading... |
| 46 | `docs/en/alem-do-silicio.md:55` | An indirect-gap material does not emit light efficiently, which is why a photonic circuit... |
| 46 | `docs/en/empacotamento.md:291` | In one batch of Radeon RX 460, 128 cores present on the die were disabled... |
| 46 | `docs/en/fotolitografia.md:107` | An excimer is a molecule that only exists while it is electrically excited... |
| 46 | `docs/mineracao-mg-si.md:126` | Os três eletrodos pré-cozidos, de cerca de 1 m de diâmetro, atravessam a carga... |
| 46 | `docs/transistores.md:129` | À direita, o óxido de interface fino sob o filme de High-K, sob eletrodo metálico... |

## Appendix B: cleft constructions

This is the pre-fix inventory of cleft and emphatic `É`/`It is`/`That is` sentences. The narrower count in 5.3 was 39 Portuguese `É ... que` constructions and 27 English `It is ... that` or `That is why` constructions; the table is broader because it also catches `É` sentences whose `que` belongs to a relative clause. The clearest 15 were rewritten; the rest remain as ordinary prose where the cleft is doing useful work.

| Where | Sentence |
| --- | --- |
| `docs/alem-do-silicio.md:35` | É por isso que SiC e GaN conseguem fazer, num volume pequeno, o que o silício só faz num volume maior. |
| `docs/alem-do-silicio.md:41` | É o mesmo argumento que o capítulo de células e módulos solares usa... |
| `docs/alem-do-silicio.md:55` | É a mesma propriedade física que explica, no capítulo solar, por que são necessários 100 µm de silício... |
| `docs/celulas-solares.md:45` | É a etapa que transforma uma lâmina de silício num dispositivo. |
| `docs/celulas-solares.md:47` | É essa camada rasa que a figura mostra como emissor. |
| `docs/celulas-solares.md:85` | É nessa etapa que também se forma o campo retroativo com o alumínio. |
| `docs/confiabilidade.md:29` | É aqui que a maioria dos sistemas passa a maior parte da vida. |
| `docs/confiabilidade.md:67` | É um mecanismo de canal curto, pior em tensões de dreno altas, e é justamente por isso que a qualificação o exige... |
| `docs/confiabilidade.md:73` | É a mesma fronteira que a fábrica descreve pelo lado do processo. |
| `docs/confiabilidade.md:139` | É por isso que o automotivo é outro regime. |
| `docs/dados.md:101` | É uma informação de leitura, não de validade... |
| `docs/empacotamento.md:75` | É a resposta para um problema crescente... |
| `docs/empacotamento.md:143` | É por isso que microprocessadores, GPUs e aceleradores são flip-chip... |
| `docs/empacotamento.md:265` | É por isso que o mesmo die aparece na loja em várias versões com preços diferentes. |
| `docs/empacotamento.md:271` | É o mesmo die Coffee Lake... |
| `docs/empacotamento.md:303` | É uma fração menor do total, mas é a fração que limita o resto... |
| `docs/estrutura-wafers.md:42` | É essa anisotropia que reaparece no ataque alcalino descrito em Fabricação de wafers... |
| `docs/fabricacao-wafers.md:54` | É esse arranjo (quartzo, atmosfera inerte, semente girando) que a indústria usa até hoje. |
| `docs/fabricacao-wafers.md:62` | É esse defeito que o tratamento térmico remove depois, na etapa de RTP descrita adiante. |
| `docs/fabricacao-wafers.md:78` | É esse o preço que a fotovoltaica aceitou ao trocar boro por gálio... |
| `docs/fabricacao-wafers.md:118` | É no ramo fotovoltaico, que aceita lâminas cerca de quatro a cinco vezes mais finas... |
| `docs/fabricacao-wafers.md:142` | É por isso que as linhas modernas a substituem pela retificação simultânea de duas faces... |
| `docs/fabricacao-wafers.md:158` | É a esse produto "temperatura × tempo" que a indústria chama de orçamento térmico. |
| `docs/fotolitografia.md:46` | É mais fácil desenhar grande e reduzir do que desenhar no tamanho do alvo. |
| `docs/gargalos.md:30` | É o mesmo padrão do gargalo de Spruce Pine... |
| `docs/gargalos.md:66` | É o argumento que a própria fabricação de wafers já faz sobre o Japão... |
| `docs/insumos-fab.md:32` | É esse princípio, a amplificação química, que permite usar doses de luz baixas... |
| `docs/insumos-fab.md:40` | É a mesma lógica dos insumos de quartzo... |
| `docs/insumos-fab.md:62` | É o mesmo desenho do quartzo de Spruce Pine e da participação chinesa no polissilício... |
| `docs/mineracao-mg-si.md:77` | É um material de nicho: o que sustenta o volume da indústria fica um grau logo abaixo... |
| `docs/mineracao-mg-si.md:131` | É nessa interface que o SiO gerado consegue voltar a reagir antes de sair com o gás. |
| `docs/mineracao-mg-si.md:133` | É essa reciclagem interna que sustenta um rendimento de silício em torno de 85%... |
| `docs/mineracao-mg-si.md:153` | É essa conta de energia, e não a disponibilidade de quartzo, que decide... |
| `docs/mineracao-mg-si.md:161` | É esse conjunto de fatores, e não o minério, que decide onde uma planta se instala. |
| `docs/na-fab.md:82` | É a faixa em que o modelo foi validado; não é uma receita de processo. |
| `docs/na-fab.md:114` | É o método de uso geral. |
| `docs/na-fab.md:135` | É isotrópico, e por isso corrói também por baixo da máscara... |
| `docs/na-fab.md:167` | É a canalização, que acrescenta ao perfil uma cauda profunda de íons... |
| `docs/na-fab.md:218` | É o método padrão para filmes ultrafinos... |
| `docs/o-elemento-silicio.md:63` | É por isso que o cristal cresce flutuando sobre o banho no Czochralski... |
| `docs/o-elemento-silicio.md:103` | É a combinação delas, mais a cadeia industrial construída em volta, que sustenta a posição do silício... |
| `docs/polissilicio.md:112` | É por isso que plantas grandes raramente escolhem uma só... |
| `docs/polissilicio.md:114` | É aqui, e não antes, que o silício se torna realmente puro. |
| `docs/polissilicio.md:182` | É por isso que uma planta de polissilício se mede pela energia que consome... |
| `docs/polissilicio.md:194` | É um líquido incolor e volátil... |
| `docs/polissilicio.md:196` | É por isso que o TCS se armazena e se manuseia sob gás inerte. |
| `docs/polissilicio.md:350` | É esse tipo de ciclo curto, contra capacidade instalada abundante... |
| `docs/precos-e-valor.md:49` | É a mesma curva de aprendizado... |
| `docs/precos-e-valor.md:61` | É ela que decide se vale encolher. |
| `docs/precos-e-valor.md:65` | É por isso que o valor da cadeia migrou para os extremos... |
| `docs/transistores.md:198` | É a ponte declarada entre GAAFET e CFET. |
| `docs/en/alem-do-silicio.md:35` | That is why SiC and GaN can do, in a small volume, what silicon can only do in a larger one. |
| `docs/en/alem-do-silicio.md:41` | It is the same argument solar cells and modules makes... |
| `docs/en/alem-do-silicio.md:55` | It is the same physical property that explains... |
| `docs/en/confiabilidade.md:139` | That is why automotive is a different regime. |
| `docs/en/dados.md:101` | That is why each chapter declares, below its title, the year of the most recent data it cites. |
| `docs/en/empacotamento.md:61` | That is why wafer test... has become a viability requirement in modern packages. |
| `docs/en/empacotamento.md:143` | That is why microprocessors, GPUs and accelerators are flip-chip... |
| `docs/en/empacotamento.md:265` | That is why the same die appears in the shop in several versions at different prices. |
| `docs/en/empacotamento.md:303` | It is a minority of the total, but it is the minority that constrains the rest... |
| `docs/en/fabricacao-wafers.md:142` | That is why modern lines replace it with simultaneous double-side grinding... |
| `docs/en/fotolitografia.md:101` | That is why EUV arrived as a parallel technology... |
| `docs/en/gargalos.md:30` | It is the same pattern as the Spruce Pine chokepoint... |
| `docs/en/insumos-fab.md:40` | It is the same logic as the quartz inputs... |
| `docs/en/insumos-fab.md:62` | It is the same design as the Spruce Pine quartz... |
| `docs/en/mineracao-mg-si.md:113` | That is why the furnace is practically self-sufficient in reactants... |
| `docs/en/o-elemento-silicio.md:63` | That is why the crystal grows floating on the melt... |
| `docs/en/polissilicio.md:75` | That is why the furnace is practically self-sufficient in reactants... |
| `docs/en/polissilicio.md:182` | That is why a polysilicon plant is judged by the energy it consumes... |
| `docs/en/polissilicio.md:196` | This is why TCS must be stored and handled under inert gas. |
| `docs/en/polissilicio.md:298` | That is not an omission... |
| `docs/en/precos-e-valor.md:49` | It is the same learning curve... |
| `docs/en/precos-e-valor.md:61` | That is what decides whether shrinking pays. |
| `docs/en/precos-e-valor.md:65` | That is why the chain's value migrated to its two extremes... |
| `docs/en/transistores.md:198` | It is the declared bridge between GAAFET and CFET. |

## Appendix C: commands used

```
bun run build
python scripts/audit-prose.py
python scripts/audit-style.py --list
python scripts/audit-glossary.py
python scripts/audit-links.py
python scripts/audit-math.py
python scripts/audit-svgs.py --all
python scripts/audit-numbers.py
```

Parser metrics used spaCy 3.8 with `en_core_web_sm` and `pt_core_news_sm`; the scripts are in `.temp/` and are not part of the site. The measurements are reproducible from the prose lines in `docs/` and `docs/en/`.

## Closing note

The site's strongest defense against the Wikipedia tells is not a word list. It is the citation rule: each number and each mechanism has a named source, and the prose says what that source measured. The arXiv features are a different problem, and they are a smaller one here than the raw counts suggest: the averages are good, and the tail is 43 sentences. Fix the tail, clear the negative parallelism, and make the audit see the patterns it currently misses. The content does not need a different voice.
