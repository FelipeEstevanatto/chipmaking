---
title: Fotolitografia
description: Como o scanner transporta a luz da fonte ao wafer, o fotoresistor, o realce de resolução, a imersão e o passo a passo do processo.
---

# Fotolitografia

A fotolitografia é a etapa que **desenha o circuito** no wafer. Máquinas da **ASML** (origem na Philips), com precisão nanométrica, alinham o wafer em equipamentos que projetam luz ultravioleta através de uma **máscara (retículo)** com o circuito gravado; o fotoresistor reage apenas nos pontos selecionados.

A mesa de posicionamento do wafer pesa cerca de **15 kg** e pode acelerar com força de até **20 G** (cerca de três vezes a aceleração típica de um carro de Fórmula 1), movendo-se com precisão de **nanômetros** para **multi-padrões** — vários retículos em sequência para linhas menores que o permitido por uma única exposição. Qualquer vibração indesejada pode destruir o padrão.

Quando a TSMC ainda fazia parte da Philips, motores lineares **hidráulicos** eram usados: muito precisos, porém com alta manutenção — custo e tempo significativos até soluções mais robustas.

<DiagramFigure src="/pdf-images/p12-1.png" alt="Exposição EUV em wafer ASML">
Exposição EUV em wafer — <a href="https://www.asml.com/" target="_blank" rel="noopener noreferrer">ASML</a> <Cite id="asml-gaa" />.
</DiagramFigure>

<DiagramFigure src="/pdf-images/p13-1.png" alt="Diagrama de posicionamento a laser sobre granito">
*Laser controlled positioning and a solid, vibration-suppressing granite base ensure precise alignment of the exposure chuck.*
</DiagramFigure>

## Como a luz chega ao wafer

O scanner é, no fundo, um **caminho óptico** muito bem controlado. A luz nasce numa fonte (o laser de excímero de **193 nm** no DUV, ou o plasma de estanho de **13,5 nm** no EUV), passa pelo **iluminador**, que dá forma ao feixe e define o modo de iluminação e a dose, atravessa o **retículo** e é reduzida pela **óptica de projeção** até o wafer <Cite id="kato-litho" />.

<DiagramFigure src="/assets/scanner-optical-column.svg" alt="Corte do caminho óptico de um scanner de imersão DUV: fonte, iluminador, retículo, óptica de projeção, água de imersão, wafer e mesa sobre bloco de granito">
O caminho óptico de um scanner de imersão DUV, da fonte ao wafer. Desenho do autor.
</DiagramFigure>

O retículo não tem o padrão em tamanho final: ele é **maior**, e a óptica o **reduz** por um fator fixo (4× nos scanners atuais). Isso existe porque uma máscara com traços de poucos nanômetros não seria fabricável — é mais fácil desenhar grande e reduzir do que desenhar no tamanho do alvo.

Duas peças fora do eixo óptico tornam o desenho possível. A primeira é a **mesa do wafer**, que se move de campo em campo com precisão de nanômetros e por isso é medida continuamente por **interferometria a laser**; a segunda é o **bloco de granito**, sólido e pesado, que absorve a vibração antes que ela chegue ao padrão.

## O fotoresistor

O fotoresistor é um polímero **sensível à luz**: a exposição muda a sua solubilidade, e a revelação transforma essa mudança química em uma máscara física. Em resists **positivos** a região exposta é a que se dissolve; em **negativos**, o oposto.

Os resists modernos são **quimicamente amplificados** (*chemically amplified resist*, CAR): um único fóton gera um catalisador que dispara muitas reações, o que permite expor com doses baixas — e é isso que torna viável a vazão atual. Em troca, o filme fica mais sensível a contaminação e a efeitos de borda.

<DiagramFigure src="/assets/photoresist-spin-coating.jpg" alt="Fotoresistor sendo espalhado por rotação sobre um wafer de silício">
Fotoresistor sendo espalhado por rotação sobre um wafer — <a href="https://commons.wikimedia.org/wiki/File:Photoresist_spin_coating.jpg" target="_blank" rel="noopener noreferrer">Photoresist spin coating</a>, Sei (CC BY-SA 4.0), Wikimedia Commons.
</DiagramFigure>

## Passo a passo do processo

<DiagramFigure src="/assets/lithography-process-steps.svg" alt="Seis etapas da litografia sobre resist positivo: preparo do substrato, revestimento, pré-cozimento, exposição, revelação e transferência de padrão">
As seis etapas do ciclo, do substrato limpo ao padrão gravado. Desenho do autor.
</DiagramFigure>

Executado em sequência, com controle rigoroso de temperatura e contaminantes:

1. **Preparação e limpeza do substrato:** *dehydration bake* (200–400 °C); promotor de adesão **HMDS** (hexametildisilazano) torna a superfície hidrofóbica.
2. **Revestimento (spin coating):** fotoresistor depositado e espalhado por rotação a milhares de RPM, formando filme uniforme micrométrico ou nanométrico.
3. **Pré-cozimento (soft bake):** hotplate 90–100 °C — evapora solventes, estabiliza o filme.
4. **Alinhamento e exposição:** steppers/scanners; retículo de quartzo com cromo; **DUV (193 nm)** ou **EUV (13,5 nm)** altera solubilidade da resina.
5. **Cozimento pós-exposição (PEB):** 100–130 °C — catalisa reações latentes; reduz *standing waves* nas paredes do resiste.
6. **Revelação (development):** TMAH ou poça; em resiste **positivo**, região exposta dissolve; enxágue com DIW e secagem com N₂.
7. **Cozimento final (hard bake):** 120–150 °C — reticulação (*cross-linking*) para resistir a etch e implantação.
8. **Transferência de padrão e stripping:** gravação por **etch** ou **implantação iônica**; remoção do resiste por solventes ou **plasma ashing**.

## Realce de resolução e multi-padrão

Existe um limite físico para o que uma exposição consegue desenhar, e a indústria passou **décadas** contornando-o por software e por processo em vez de trocar a fonte de luz: máscaras de **deslocamento de fase**, iluminação **fora de eixo**, correção óptica de proximidade (**OPC**) e, quando nada disso bastou, **expor mais de uma vez** <Cite id="asianometry-euv" />.

A ideia de **duplicação de linhas** (*line doubling*) é a versão mais direta do multi-padrão: o primeiro padrão é gravado na camada dura, o segundo é exposto no fotoresistor **entre** os traços que já existem e, na gravação seguinte, as duas máscaras se somam — o número de traços dobra sem que nenhuma exposição tenha ficado mais fina.

<DiagramFigure src="/assets/line-doubling.svg" alt="Sequência de duplicação de linhas: segunda exposição entre traços já gravados e gravação da camada com as duas máscaras somadas">
Duplicação de linhas: o padrão final sai da soma de duas exposições — <a href="https://commons.wikimedia.org/wiki/File:Line_doubling.svg" target="_blank" rel="noopener noreferrer">Line doubling</a>, Wdwd (CC BY 3.0), Wikimedia Commons (baseado em Guiding light, en.Wikipedia).
</DiagramFigure>

## Imersão: a água que esticou o 193 nm

O truque que segurou a litografia óptica por mais de uma década foi trocar o **ar** entre a última lente e o wafer por **água purificada**. Como o índice de refração da água é maior que o do ar, o comprimento de onda **efetivo** cai de 193 nm para cerca de **135 nm** — sem trocar óptica, máscara ou fotoresistor <Cite id="asml-immersion" />.

<DiagramFigure src="/assets/immersion-lithography.svg" alt="Comparação entre exposição a seco e exposição com água entre a última lente e o wafer">
A última lente, a água e o wafer na litografia por imersão — <a href="https://commons.wikimedia.org/wiki/File:Immersion_lithography_illustration.svg" target="_blank" rel="noopener noreferrer">Immersion lithography illustration</a>, Oleg Alexandrov (domínio público), Wikimedia Commons.
</DiagramFigure>

O **EUV** segue o caminho oposto. Como **tudo absorve EUV**, ele não usa lentes nem imersão: a luz viaja **refletida por espelhos multicamada**, dentro de vácuo, e a própria máscara é **refletiva** <Cite id="asianometry-euv" />. Por isso o EUV entrou como uma tecnologia paralela, para os nós de **7 nm e abaixo**, e não como substituto do parque de 193 nm por imersão.

A história de como se chegou a essa combinação — as quatro gerações ópticas, os candidatos descartados e a eleição do EUV — está em [História da fotolitografia](/historia-fotolitografia).

## DUV: o que a luz de 193 nm ainda faz

A litografia **DUV** (*deep ultraviolet*) é a que usa **lasers de excímero**. Um excímero é uma molécula que só existe enquanto está eletricamente excitada: a descarga elétrica junta um gás nobre e um halogênio, que em condições normais não se combinam, e a molécula temporária devolve a energia na forma de luz com o comprimento de onda do par escolhido <Cite id="asml-light" />. O par **criptônio + flúor** (KrF) emite a **248 nm**; o par **argônio + flúor** (ArF), a **193 nm** <Cite id="asml-light" />.

Cada troca de fonte encolheu o menor traço imprimível:

| Fonte | Comprimento de onda | Menor traço que destravou |
|---|---|---|
| **g-line** (lâmpada de mercúrio) | 436 nm | cerca de 1 µm |
| **i-line** (lâmpada de mercúrio) | 365 nm | abaixo de 1 µm, chegando a 220 nm |
| **KrF** (laser de excímero) | 248 nm | 150 nm; os KrF modernos chegam a 80 nm |
| **ArF** (laser de excímero) | 193 nm | 38 nm |
| **ArF com imersão** | 193 nm, cerca de 134 nm efetivos na água | nós de 7 nm, com multi-padrão |

O DUV **não foi aposentado** pelo EUV. Uma fábrica de ponta usa as duas tecnologias na mesma receita: o EUV expõe as poucas camadas mais críticas e o DUV, mais barato, imprime todo o resto <Cite id="asml-duv" /> <Cite id="branch-euv" />. É por isso que os anos 2000 nunca "acabaram" para a litografia de 193 nm: a plataforma **NXT**, toda de imersão em água, roda **mais de 6.000 wafers de 300 mm por dia** e continua sendo atualizável em campo por pacotes de melhoria de nó <Cite id="asml-duv" />.

## A fonte de luz EUV: o estanho virando plasma

O EUV não sai de um laser: ele sai de uma **explosão de estanho**. A luz de **13,5 nm** é mais de **14 vezes** mais curta que a do DUV <Cite id="asml-light" />, e não existe na Terra — precisa ser fabricada.

Dentro da câmara de vácuo, um gerador libera gotas de estanho fundido de cerca de **25 µm** a **70 m/s** <Cite id="asml-light" />. Duas coisas acontecem com cada gota, **50.000 vezes por segundo** <Cite id="asml-light" />:

1. Um **pré-pulso** de laser, de baixa intensidade, achata a gota num disco — o formato achatado rende mais luz EUV do que a esfera original <Cite id="asml-highna-video" />.
2. O **pulso principal**, cerca de dez vezes mais potente que os lasers usados para cortar aço, vaporiza o disco e o transforma em **plasma**, que emite um espectro largo com um pico nítido em 13,5 nm <Cite id="trumpf-euv" />.

Esse plasma fica a cerca de **40 vezes a temperatura da superfície do Sol** <Cite id="asml-highna-video" />. Um **espelho coletor** parabólico recolhe a luz emitida em todas as direções e a concentra no **foco intermediário**, a abertura por onde ela entra no iluminador <Cite id="asml-euv-products" />.

<DiagramFigure src="/assets/euv-source.svg" alt="Corte esquemático da fonte EUV: gerador de gotas de estanho no topo, gotas caindo pelo eixo, laser de CO2 vindo do sub-piso, plasma no centro, espelho coletor parabólico à direita e o foco intermediário à esquerda, de onde a luz segue para o iluminador">
A fonte de plasma de estanho, da gota ao foco intermediário. Desenho do autor, a partir de ASML e TRUMPF.
</DiagramFigure>

<YouTubeEmbed id="MfFGRl00LKY" title="Inside the machine: how a High NA system generates EUV light" />

### A potência que faltava

O laser de CO₂ que faz a explosão é uma das máquinas mais potentes já produzidas em série: cerca de **40 kW** de potência pulsada a 50 kHz, alimentados por uma fonte de **1 MW**, e ainda assim só cerca de **200 W** chegam ao wafer <Cite id="laserfocus-euv" />. O motivo está na seção seguinte — as perdas do caminho óptico.

Chegar a essa potência levou muito mais tempo do que o prometido. Quando o desenvolvimento industrial começou, a fonte entregava **poucos watts**; a meta para viabilizar 125 wafers por hora era de **250 W**, ou seja, faltavam **duas ordens de grandeza** <Cite id="asml-euv-podcast" />. A potência subiu em degraus — 40 W, 80 W, 125 W e, por fim, 250 W —, e a primeira demonstração de 250 W contínuos num cliente só veio no **início de 2018**, cerca de **seis anos depois** da data originalmente prometida <Cite id="asml-euv-podcast" />.

Três obstáculos dominaram esse período <Cite id="asml-euv-podcast" />. O primeiro foi o **pré-pulso**. O segundo apareceu depois dele: parte da luz voltava **refletida para dentro do laser** e roubava potência da pulsação seguinte, o que exigiu um "interruptor de luz" — um módulo de isolamento óptico. O terceiro foi o **estanho sujando o espelho coletor**: a explosão jogava detritos em todas as direções, e a refletividade do coletor caía. A solução veio em parte por acaso — a refletividade melhorava depois de cada manutenção, e a causa acabou sendo uma pequena quantidade de **oxigênio** que limpava o espelho por reação química <Cite id="asml-euv-podcast" />.

<YouTubeEmbed id="EWVJ1Iwa00E" title="Making EUV work: Episode 3 — from lab to fab" />

## Espelhos em vez de lentes

Como **tudo absorve EUV** — o ar, o vidro, a própria máscara —, o caminho da luz inteiro tem de estar em **vácuo**, e não existe lente: só **espelhos** <Cite id="asml-euv-products" />.

Um espelho de EUV não se parece com um espelho comum. Ele é um **refletor de Bragg**: dezenas de pares alternados de **molibdênio e silício**, cada camada com poucos nanômetros de espessura <Cite id="branch-euv" />. Em cada fronteira entre as duas camadas, só cerca de **3%** da luz é refletida e o resto atravessa <Cite id="branch-euv" />. Mas como todas essas reflexões saem **em fase**, elas se somam por interferência construtiva até cerca de **70% por espelho** <Cite id="branch-euv" />.

<DiagramFigure src="/assets/euv-bragg-mirror.svg" alt="À esquerda, o corte de um refletor de Bragg com camadas alternadas de molibdênio e silício, um feixe entrando e reflexões parciais saindo em paralelo; à direita, a cadeia de perda de luz: 100% na fonte, 70% após um espelho, 49% após dois, 17% após cinco e menos de 10% no wafer após dez espelhos">
O refletor de Bragg e o orçamento de luz ao longo do scanner. Desenho do autor, a partir de ASML/Branch Education.
</DiagramFigure>

Isso explica o laser gigantesco da seção anterior. Um scanner EUV tem **mais de dez** espelhos no caminho entre a fonte e o wafer; com 70% em cada um, menos de **10%** da luz do plasma chega ao wafer <Cite id="branch-euv" />. Por isso a fonte precisa nascer absurdamente brilhante — e por isso cada peça do caminho, inclusive a máscara, tem de ser um espelho.

Os espelhos são feitos pela **ZEISS**, parceira de longa data da ASML, e são polidos com erro de forma inferior a **um átomo** <Cite id="branch-euv" />. Mas eles absorvem os 30% que não refletem, aquecem e se deformam: parte do trabalho de controle é **mitigar esse aquecimento** para manter a imagem estável <Cite id="asml-nxe3800e" />.

<DiagramFigure src="/assets/duv-vs-euv.svg" alt="Dois caminhos ópticos lado a lado: à esquerda o DUV de 193 nm, que atravessa um retículo de quartzo, lentes de vidro, uma lâmina de água e chega ao wafer; à direita o EUV de 13,5 nm, que reflete num retículo, em espelhos multicamada e viaja em vácuo até o wafer">
Os dois caminhos ópticos lado a lado. Desenho do autor, a partir de ASML.
</DiagramFigure>

### A máscara também é um espelho

No DUV, o retículo é uma placa de **quartzo com cromo**, transparente: a luz atravessa e o padrão é impresso pelas partes cobertas de cromo. No EUV não existe material transparente a 13,5 nm, então o retículo é **refletivo** — um refletor de Bragg com uma camada absorvedora desenhada por cima <Cite id="asml-euv-products" />.

Isso cria um problema que o DUV não tinha. No DUV, uma película protetora (*pellicle*) cobre a máscara e mantém partículas fora do plano focal. Para o EUV essa película **não existia**: quase nenhum material é transparente àquela luz, e a que se mostrou viável tem apenas **30 a 40 nm** de espessura — tão fina que era difícil até manuseá-la sem quebrar <Cite id="asml-euv-podcast" />. A película de EUV teve de ser inventada junto com o resto do ecossistema, porque ninguém queria investir nela antes de acreditar que o EUV daria certo <Cite id="asml-euv-podcast" />.

## DUV e EUV lado a lado

|  | **DUV com imersão** | **EUV** |
|---|---|---|
| Comprimento de onda | 193 nm | 13,5 nm |
| Fonte de luz | laser de excímero de ArF | plasma de estanho |
| Óptica | lentes de vidro, transmissivas | espelhos multicamada, reflexivos |
| Meio | ar e água | vácuo |
| Máscara | quartzo com cromo, transmissiva | refletiva, com película de dezenas de nm |
| Abertura numérica | até 1,35 | 0,33 (NXE) ou 0,55 (EXE) |
| Resolução | 38 nm numa exposição; menos com multi-padrão | 13 nm (NXE); 8 nm (EXE) |
| Papel na fábrica | imprime a maioria das camadas | imprime as poucas camadas críticas |

## High-NA: o sistema EXE

A **abertura numérica** (NA) mede o cone de luz que a óptica consegue captar e focar. A equação de Rayleigh, `CD = k1 × λ ÷ NA`, mostra o que acontece quando se aumenta o NA: mantendo a luz de 13,5 nm e um k1 próximo de 0,3, o **NXE** (NA 0,33) resolve **13 nm** e o **EXE** (NA 0,55) resolve **8 nm** <Cite id="asml-nxe3600d" /> <Cite id="asml-highna" />.

<DiagramFigure src="/assets/high-na-anamorphic.svg" alt="Comparação entre duas aberturas numéricas: o sistema de 0,33 NA com um cone estreito e 13 nm de resolução, e o de 0,55 NA com um cone visivelmente mais largo e 8 nm de resolução; abaixo, os campos de exposição de 26 por 33 mm e 26 por 16,5 mm">
A abertura numérica maior capta um cone mais largo — e por isso enxerga traços menores. Desenho do autor, a partir de ASML.
</DiagramFigure>

<YouTubeEmbed id="h_zgURwr6nA" title="Unveiling High NA EUV (ASML)" />

O ganho é grande: traços **1,7 vez menores** e, portanto, densidades de transistores **2,9 vezes maiores** <Cite id="asml-highna" />. O preço é a óptica. Para chegar a 0,55 de NA os espelhos ficam muito maiores, e a luz deixa de conseguir passar sem obstrução na direção de varredura. A solução foi a óptica **anamórfica**: redução de **8× na direção da varredura** e 4× na outra, o que **corta o campo de exposição pela metade** (26 × 16,5 mm em vez de 26 × 33 mm) e obriga os estágios de wafer e de retículo a serem bem mais rápidos <Cite id="asml-exe5200b" /> <Cite id="asml-highna" />.

A plataforma tem três marcos até agora:

- **EXE:5000** — o primeiro sistema High-NA. Os primeiros módulos foram enviados à **Intel em dezembro de 2023**, e ele imprime **mais de 185 wafers por hora** <Cite id="asml-highna" /> <Cite id="asml-unveiling-highna" />.
- **EXE:5200B** — o sucessor voltado à produção em volume. Mantém os 8 nm de resolução, melhora o contraste de imagem em **40%** e o *overlay* para **0,7 nm**, e a **Intel concluiu o aceite em dezembro de 2025** para o nó 14A <Cite id="asml-exe5200b" /> <Cite id="intel-exe5200b" />.
- **Parque instalado** — cinco EXE:5000 de pesquisa foram instalados na Intel (dois), na TSMC, na Samsung e no laboratório conjunto ASML-imec, e o primeiro **EXE:5200B** de produção foi enviado em **julho de 2025** <Cite id="bits-chips-exe5200b" />.

### A família de máquinas

As vazões abaixo são medidas em doses diferentes — 30 mJ/cm² nos NXE e 50 mJ/cm² no EXE —, então os números não são diretamente comparáveis entre as colunas <Cite id="asml-nxe3600d" /> <Cite id="asml-exe5200b" />.

| Plataforma | NA | Luz | Resolução | Vazão |
|---|---|---|---|---|
| **NXT** (imersão) | 1,35 | ArF 193 nm | 38 nm numa exposição | mais de 6.000 wafers/dia |
| **NXE:3600D** | 0,33 | EUV 13,5 nm | 13 nm | 160 wafers/h |
| **NXE:3800E** | 0,33 | EUV 13,5 nm | 13 nm | 220 wafers/h |
| **NXE:4000F** (definido) | 0,33 | EUV 13,5 nm | 13 nm | 250 wafers/h ou mais |
| **EXE:5000** | 0,55 | EUV 13,5 nm | 8 nm | mais de 185 wafers/h |
| **EXE:5200B** | 0,55 | EUV 13,5 nm | 8 nm | 175 wafers/h, a dose maior |

<SourceNote :ids="['kato-litho', 'asml-immersion', 'asianometry-euv', 'asml-gaa', 'asml-light', 'asml-duv', 'asml-euv-products', 'trumpf-euv', 'asml-highna-video', 'asml-euv-podcast', 'laserfocus-euv', 'branch-euv', 'asml-nxe3600d', 'asml-nxe3800e', 'asml-investor-euv', 'asml-highna', 'asml-exe5200b', 'intel-exe5200b', 'bits-chips-exe5200b', 'asml-unveiling-highna']" />

## Vídeos

<SourceNote label="Vídeos relacionados" :ids="['asml-gaa', 'asml-highna-video', 'asml-unveiling-highna', 'asml-euv-podcast', 'branch-euv']" />

<YouTubeEmbed id="B2482h_TNwg" title="The $200M Machine that Prints Microchips: the EUV Photolithography System (Branch Education, patrocinado pela ASML)" />

<YouTubeEmbed id="jL7HvnBgrJ4" title="Processo ASML" />

<YouTubeEmbed id="rCwgAGG2sZQ" title="RTX 5090 Chip Deep-Dive" />

<SeeAlso :links="[
  { text: 'História da fotolitografia', href: '/historia-fotolitografia', note: 'do contato ao EUV' },
  { text: 'Fabricação de wafers', href: '/fabricacao-wafers', note: 'superfície pós-CMP exigida para litografia' },
  { text: 'Evolução dos transistores', href: '/transistores', note: 'o que a litografia permitiu construir' },
  { text: 'Glossário', href: '/glossario', note: 'DUV, EUV' },
]" />
