---
title: Evolução dos transistores
description: De MOSFET planar a CFET — silício esticado, HKMG, FinFET, FD-SOI, GAAFET, backside power e forksheet.
dataAsOf: 2026
---

# Evolução arquitetônica dos transistores

Da estrutura planar ao CFET, o capítulo percorre as gerações do transistor na ordem cronológica. Cada seção abre com o nó de processo daquela geração e o ganho que ela trouxe; o que o "nó" significa como rótulo está no [adendo no fim do capítulo](#adendo-o-que-o-numero-do-no-significa).

1. [1960 — MOSFET planar](#_1960-—-mosfet-planar)
2. [1963 — CMOS par complementar](#_1963-—-cmos-par-complementar)
3. [1968 — Porta de silício autoalinhada](#_1968-—-porta-de-silicio-autoalinhada)
4. [1985 — LDD](#_1985-—-ldd-dreno-levemente-dopado)
5. [1995 — STI](#_1995-—-sti-trincheira-rasa)
6. [1998 — SOI](#_1998-—-soi-silicio-sobre-isolante)
7. [2003 — Silício esticado](#_2003-—-silicio-esticado-intel)
8. [2007 — High-K metal gate](#_2007-—-high-k-metal-gate-hkmg)
9. [2011 — FinFET](#_2011-—-finfet-tri-gate)
10. [2012 — FD-SOI](#_2012-—-fd-soi-corpo-ultrafino)
11. [2022 — GAAFET](#_2022-—-gaafet-gate-all-around-nanosheets)
12. [2025/2026 — BSPDN](#_2025-2026-—-bspdn-backside-power)
13. [~2029 — Forksheet](#_2029-—-forksheet)
14. [Futuro — CFET](#futuro-—-cfet)

A [linha do tempo](/linha-do-tempo) reúne essas mesmas gerações numa lista interativa, com os produtos de cada uma. As seções abaixo seguem a ordem acima.

## 1960 — MOSFET planar

<TransistorFacts year="1960" />

<DiagramFigure src="/pdf-images/p17-1.png" alt="Transistor MOSFET planar">
Canal, porta, fonte e dreno no plano do wafer: a estrutura que a litografia precisava desenhar de uma vez.
</DiagramFigure>

Transistores planares (**MOSFET**, *Metal-Oxide-Semiconductor Field-Effect Transistor*), consolidados na década de 1960 após Kahng e Atalla (Bell Labs), sustentaram a Lei de Moore por décadas. Canal, portão (*gate*), fonte (*source*) e dreno (*drain*) ficam no plano bidimensional do wafer. O primeiro dispositivo funcional, apresentado em **1960**, tinha porta de **20 µm** e óxido de porta de 100 nm — uma versão de **10 µm** veio no mesmo ano <Cite id="semiconductor-scale" />. Para comparação, o "nó de 22 nm" de 2011 tem portas de 26 nm: em cinco décadas, essa dimensão encolheu quase mil vezes. Abaixo do nó de **28 nm**, a proximidade fonte–dreno degradou o controle do portão, com **efeitos de canal curto (SCE)** e fuga por tunelamento quântico.

Na prática, essa geração equipou as calculadoras de bolso e os primeiros microcomputadores domésticos: a família NMOS **6502**, por exemplo, movia o Apple II, o Commodore 64 e o NES.

## 1963 — CMOS (par complementar)

<TransistorFacts year="1963" />

Em **1963**, Frank Wanlass (Fairchild) patenteou o **CMOS** (*Complementary MOS*): um transistor NMOS e um PMOS ligados em série, de modo que **um conduz enquanto o outro está cortado**. Como nunca há um caminho direto entre alimentação e terra no estado estacionário, o consumo em repouso se resume à fuga, potência estática praticamente nula. A RCA levou a família 4000 ao mercado em 1968 e, desde então, CMOS é a base de praticamente toda a lógica digital: é o que permite bilhões de portas num único chip sem derreter.

<DiagramFigure src="/assets/cmos.svg" alt="Corte transversal de CMOS com NMOS em poço p e PMOS em poço n">
Par complementar: NMOS em poço p e PMOS em poço n, com um único caminho entre V<sub>DD</sub> e GND.
</DiagramFigure>

O primeiro uso em larga escala foi a **família lógica RCA CD4000** (1968), que popularizou o CMOS em relógios digitais, calculadoras e instrumentos a bateria. Décadas depois, o mesmo princípio virou o **relógio de tempo real** de todo PC — alimentado até hoje por aquela que o mercado apelidou de “bateria da CMOS”.

## 1968 — Porta de silício autoalinhada

<TransistorFacts year="1968" />

Até o fim da década de 1960 a porta era de **alumínio**, depositada **depois** da difusão de fonte e dreno. Para garantir que o canal ficasse inteiramente coberto, a porta precisava **sobrepor** fonte e dreno, somando capacitância parasita e obrigando a folgas de alinhamento que desperdiçavam área.

A **porta de silício autoalinhada** resolveu o problema trocando a ordem das etapas: o polissilício é depositado e definido **antes**, e passa ele próprio a servir de máscara para o implante de fonte e dreno. As junções ficam automaticamente alinhadas à porta, com sobreposição mínima — e o polissilício ainda suporta os recozimentos em alta temperatura que o alumínio não tolerava.

A cronologia tem três nomes. Em **1965**, Boyd Watkins descreveu uma estrutura autoalinhada de porta de silício na General Microelectronics, mas o depósito da patente só saiu em 1969. Em **1967**, Robert Kerwin, Donald Klein e John Sarace, dos Bell Labs, publicaram a troca do alumínio por silício policristalino e demonstraram transistores autoalinhados ainda como dispositivos discretos <Cite id="chm-sigate" />. A transposição para circuitos integrados veio na Fairchild, onde Tom Klein e Federico Faggin resolveram o que faltava — a gravura precisa do silício e a arquitetura de processo <Cite id="chm-sigate" />.

<DiagramFigure src="/assets/silicon-gate.svg" alt="Comparação entre porta de alumínio com sobreposição e porta de silício autoalinhada">
Acima, porta de alumínio com sobreposição de fonte e dreno; abaixo, porta de silício autoalinhada.
</DiagramFigure>

O primeiro produto comercial foi o **Fairchild 3708** (1968), um multiplexador analógico de 8 canais criado como substituto do problemático 3705 de porta de alumínio. Comparado a ele, o 3708 era cerca de **5× mais rápido**, tinha aproximadamente **100× menos corrente de fuga** e a resistência de condução das chaves analógicas era **3× menor** <Cite id="faggin-sgt" />. Vale registrar a disputa: a Intel apresentava o 1101 como o primeiro CI de porta de silício, mas o 3708 chegou antes — e a própria Intel se beneficiou do processo ao contratar Les Vadasz e Federico Faggin, que o haviam desenvolvido <Cite id="faggin-sgt" /> <Cite id="chm-sigate" />.

Foi essa técnica que tornou viáveis os primeiros microprocessadores. Faggin entrou na Intel em **abril de 1970** e foi o arquiteto da família 4000: o **Intel 4004** (1971) saiu com 2 300 transistores numa pastilha de 12 mm², em pMOS de 10 µm, projetado para a calculadora Busicom 141-PF <Cite id="intel-4004" />. Sem a porta autoalinhada e o contato enterrado, o 4004 não caberia num die fabricável <Cite id="chm-sigate" />.

## 1985 — LDD (dreno levemente dopado)

<TransistorFacts year="1985" />

Com canais da ordem de **1 µm**, o campo elétrico concentrado junto ao dreno acelerava os portadores a energias altas o bastante para atravessar o óxido de porta. Esses **portadores quentes** ficavam presos no óxido, deslocando a tensão de limiar e encurtando a vida útil do dispositivo. A estrutura **LDD** (*Lightly Doped Drain*, IBM, 1980) intercala uma extensão pouco dopada (**n⁻**) entre o canal e o contato fortemente dopado (**n⁺**): a queda de potencial se distribui por uma distância maior e o campo de pico cai. A extensão é implantada com a própria porta como máscara, e é o **espaçador** lateral que afasta o contato **n⁺** da borda da porta, numa distância determinada pela espessura do material do espaçador <Cite id="motorola-ldd-patent" />. O espaçador de nitreto seria reaproveitado depois nos processos de siliceto. O preço é uma pequena resistência série extra.

A extensão não é necessariamente mais rasa que o contato. Com fósforo no **n⁻** e arsênio no **n⁺**, ela tende a sair mais **profunda**, porque o fósforo difunde mais rápido. O que a mantém leve é a dose, cerca de duas ordens de grandeza menor <Cite id="motorola-ldd-patent" />.

<DiagramFigure src="/assets/ldd.svg" alt="Corte transversal de dois transistores: à esquerda, a junção convencional, com o contato n⁺ encostado na porta; à direita, a LDD, com a extensão n− mais profunda sob o espaçador e o contato n⁺ afastado da porta">
À esquerda, a junção convencional: o contato n⁺ encosta na porta, e o campo de pico se concentra ali. À direita, a LDD: a extensão n⁻ entra um pouco por baixo da porta, é mais profunda e muito menos dopada que o contato n⁺, e o espaçador (roxo, sobre o óxido) afasta esse contato da borda da porta.
</DiagramFigure>

O conceito nasceu na IBM em **1980**, mas a adoção em produção veio com a **CHMOS III** da Intel: o próprio paper da Intel descreve a estrutura LDD como o recurso que garantia a confiabilidade do transistor, ao lado de uma porta de **250 Å** e canal elétrico típico de **1,0 µm**, e já anunciava o uso da tecnologia na produção do microprocessador de 32 bits seguinte <Cite id="intel-chmos3" />. O produto foi o **80386** (1985), fabricado em CHMOS III com 1,5 µm e duas camadas de metal <Cite id="intel-80386" /> — o processador dos PCs da era Windows 3.x. Deixou de ser exceção conforme os canais desciam abaixo de 1 µm: já em **1987** havia processos CMOS de **0,8 µm** construídos em torno dela <Cite id="ldd-08um" />.

## 1995 — STI (trincheira rasa)

<TransistorFacts year="1995" />

O isolamento entre transistores vizinhos era feito por **LOCOS** (*Local Oxidation of Silicon*): um nitreto delimita as áreas ativas e a oxidação térmica cresce um óxido de campo espesso. O processo avança lateralmente sob o nitreto e forma o **“bico de pássaro”**, que consome área ativa e limita a densidade. A trincheira rasa foi **proposta no início dos anos 1980**, mas passou anos sem uso prático: faltavam tanto a planarização quanto uma deposição de óxido capaz de preencher trincheiras estreitas. Foi o **CMP** que destravou o processo <Cite id="shmj-sti" />. Abre-se então uma trincheira rasa no silício, preenchida com óxido depositado e planarizada por CMP: paredes verticais, sem bico de pássaro, e superfície plana — requisito para a profundidade de foco da litografia.

<DiagramFigure src="/assets/sti.svg" alt="Corte transversal de dois esquemas de isolamento sobre a mesma superfície de silício: à esquerda, LOCOS, com o óxido de campo acima da superfície e o bico de pássaro estreitando para dentro da área ativa; à direita, trincheira rasa com liner de óxido nas paredes e óxido depositado nivelado com a superfície">
À esquerda, o LOCOS: o óxido de campo cresce acima da superfície e o bico de pássaro corre por baixo dela, estreitando até a ponta dentro da área ativa. À direita, a trincheira rasa: paredes quase verticais, um liner de óxido crescido nas paredes e no fundo, e o óxido depositado nivelado com a superfície original, a linha tracejada que atravessa os dois painéis.
</DiagramFigure>

O corte da trincheira sai de uma **corrosão por íons reativos** (**RIE**, *reactive ion etching*), com **0,1 µm a 1 µm** de profundidade, e as paredes recebem um **liner de óxido** crescido termicamente, da ordem de **20 nm**, antes de o óxido depositado fechar o vão (**550 nm de TEOS** no exemplo da patente) <Cite id="ibm-sti-patent" />. Os **cantos** da trincheira são onde a tensão da oxidação concentra defeitos de cristal, e é o óxido crescido que estabiliza essa superfície atacada <Cite id="ibm-sti-patent" />. A espessura é contida por necessidade, porque um liner de nitreto espesso é corroído pelo ácido fosfórico quente que remove o nitreto da máscara, e o rebaixo vira vazio dentro do preenchimento depois do mergulho em ácido fluorídrico <Cite id="ibm-sti-patent" />.

A produção veio **antes do nó de 0,25 µm**, não nele. A IBM liderou a aplicação em **DRAM de 0,35 µm**, e a Toshiba já produzia em massa em 1996 <Cite id="shmj-sti" />. No lado lógico, a Intel também partiu de STI **uma geração antes**: o fluxo do P856 é descrito como igual ao do **P854 (0,35 µm)**, que já começava por trincheira rasa <Cite id="intel-p856" />. O **P856 (0,25 µm)**, certificado no **3º trimestre de 1997**, é que levou a STI ao **Pentium II** em volume <Cite id="intel-p856" /><Cite id="voldman-esd" />.

## 1998 — SOI (silício sobre isolante)

<TransistorFacts year="1998" />

Em **SOI** (*Silicon On Insulator*), o transistor é construído num **filme fino de silício** sobre uma camada de **óxido enterrado** (*buried oxide*, BOX). As junções deixam de tocar o substrato, o que derruba a **capacitância de junção** (comutação mais rápida com menos energia), elimina o **latch-up** típico do CMOS em silício maciço e melhora a tolerância à radiação. A IBM levou a SOI aos servidores na família RS64, que já embarcava em máquinas iSeries 400 em **1998** <Cite id="ibm-rs64-soi" />. O primeiro processador da casa com SOI foi o **RS64-III *IStar***, ainda no processo de **0,22 µm** <Cite id="wikipedia-rs64" />; em **2000**, o **RS64-IV** saiu em cobre e SOI de **0,18 µm** <Cite id="ibm-rs64-soi" />, e hoje a variante **FD-SOI** (corpo ultrafino) ocupa nichos de baixo consumo e RF.

<DiagramFigure src="/assets/soi.svg" alt="Corte transversal de dois transistores sobre a mesma superfície: à esquerda, em silício maciço, com as regiões n+ embutidas no substrato; à direita, em SOI, com o transistor construído num filme fino sobre o óxido enterrado, sobre um wafer de suporte">
À esquerda, o transistor em silício maciço: as junções n+ entram no substrato, que continua para baixo sem fronteira. À direita, em SOI: o mesmo transistor cabe no filme fino, as junções n+ param no óxido enterrado, e o wafer de suporte abaixo do óxido é inerte eletricamente. Os dois painéis compartilham a mesma linha de superfície.
</DiagramFigure>

O óxido enterrado não é crescido no transistor, ele já vem dentro da lâmina. O **SIMOX** o formava com uma implantação de oxigênio em dose altíssima, que exigia máquinas de implantação pesadas e de rendimento limitado; o **Smart Cut**, patenteado pela CEA em **1994**, implanta íons de hidrogênio, cola a face da lâmina a um substrato-suporte e aquece o conjunto acima de **500 °C**, quando a pressão das microbolhas separa o filme fino do resto da lâmina <Cite id="bruel-smartcut" />. A espessura do filme passa a ser escolhida pela energia de implantação: **10 keV** rendem cerca de **0,1 µm** <Cite id="bruel-smartcut" />.

A arquitetura ficou famosa na geração de consoles de 2005–2006: o **Cell** da PlayStation 3 e o **Xenon** do Xbox 360 saíram em SOI de 90 nm, e os **Athlon 64** da AMD levaram a mesma tecnologia aos PCs <Cite id="ibm-cell" />.

## 2003 — Silício esticado (Intel)

<TransistorFacts year="2003" />

No nó **90 nm** (2003/2004), a Intel usou **strained silicon**: estresse mecânico no canal (p.ex. Si sobre SiGe) aumenta espaçamento atômico e mobilidade em **10–20%** com custo marginal <Cite id="intel-strain" />.

<DiagramFigure src="/pdf-images/p15-1.png" alt="Malha de silício vs silício-germânio">
Comparação de malhas: silício puro vs. SiGe como substrato para estresse.
</DiagramFigure>

<DiagramFigure src="/pdf-images/p15-2.png" alt="Silício esticado sobre SiGe">
Camada de silício “esticado” sobre silício-germânio — setas indicam tensão horizontal.
</DiagramFigure>

<DiagramFigure src="/pdf-images/p16-1.png" alt="Fluxo de elétrons em silício normal vs esticado">
Malha normal vs. esticada e fluxo de elétrons mais rápido no canal.
</DiagramFigure>

O primeiro processador de alto volume com silício esticado foi o **Pentium 4 “Prescott”**, lançado em fevereiro de 2004 no nó de 90 nm, que também estreou interconexões de cobre e dielétrico *low-k* <Cite id="intel-90nm" />.

## 2007 — High-K metal gate (HKMG)

<TransistorFacts year="2007" />

<DiagramFigure src="/assets/hkmg-gate-stack.svg" alt="Comparação entre porta de SiO₂/polissilício e porta High-K metálica">
A pilha de porta muda duas vezes de uma vez: o dielétrico deixa de ser SiO₂ e o metal substitui o polissilício.
</DiagramFigure>

Com óxido de portão (SiO₂) reduzido a ~**1 nm**, o vazamento por tunelamento tornou-se inviável. Em **2007** (45 nm), dielétricos de **High-K** (háfnio) e **portões metálicos** substituíram SiO₂/polissilício, mantendo acoplamento eletrostático com espessura física maior <Cite id="hkmg-paper" />.

A estreia comercial foi o **Core 2 Extreme QX9650**, em novembro de 2007, seguido em janeiro de 2008 pela linha de volume — os Core 2 Duo e Quad de 45 nm que equiparam laptops e MacBooks da época <Cite id="intel-45nm" />.

## 2011 — FinFET (Tri-Gate)

<TransistorFacts year="2011" />

<DiagramFigure src="/pdf-images/p17-2.png" alt="Transistor FinFET Tri-Gate">
O canal sai do plano: a aleta vertical é envolvida pelo portão em três lados.
</DiagramFigure>

Abaixo de **20 nm**, planares perderam controle. A Intel comercializou **FinFET** no **22 nm** (2011): canal em “aleta” vertical; portão envolve três lados, reduzindo fuga e permitindo escalar corrente com múltiplas aletas adjacentes (**quantização de aleta**).

O **Ivy Bridge** (22 nm, abril de 2012) foi o primeiro produto de alto volume <Cite id="intel-trigate" />; no celular, o **Exynos 7420** (Galaxy S6) e o **Apple A9** (iPhone 6s) levaram o FinFET aos smartphones em 2015. A arquitetura dominou os nós de 22 nm a 5 nm.

## 2012 — FD-SOI (corpo ultrafino)

<TransistorFacts year="2012" />

Enquanto o restante da indústria migrava para o FinFET, a **FD-SOI** seguiu outro caminho, retomando a ideia do SOI com um **filme de silício ultrafino** (~6 nm) sobre o óxido enterrado. Com o filme tão fino, o canal fica **totalmente depletado** (sem o “corpo flutuante” que causava efeitos indesejados no SOI parcialmente depletado) e um **plano traseiro** sob o BOX permite aplicar **polarização de corpo** (*back bias*) para subir ou baixar a tensão de limiar em tempo real. Na prática, isso permite gastar energia só quando o circuito precisa de desempenho, o que é valioso em IoT, RF e automotivo.

<DiagramFigure src="/assets/fdsoi.svg" alt="Comparação entre SOI parcialmente depletado com corpo flutuante e FD-SOI com filme ultrafino e plano traseiro">
Acima, SOI parcialmente depletado com corpo flutuante; abaixo, FD-SOI com filme ultrafino e plano traseiro para back bias.
</DiagramFigure>

As plataformas comerciais vieram da STMicroelectronics (28 nm) e da GlobalFoundries (**22FDX**). O caso mais conhecido é o **Google Nest Mini**, cujo SoC Synaptics AS-370 foi identificado em teardown como fabricado em 22FDX <Cite id="techinsights-22fdx" />. A tecnologia também sustenta MCUs BLE, câmeras Wi-Fi e SoCs de GNSS, com dezenas de projetos já em produção em massa <Cite id="verisilicon-fdsoi" />.

## 2022 — GAAFET (gate-all-around / nanosheets)

<TransistorFacts year="2022" />

<DiagramFigure src="/pdf-images/p18-1.png" alt="Transistor GAAFET de nanofolhas">
Nanofolhas empilhadas, com o portão envolvendo as quatro faces de cada uma.
</DiagramFigure>

Em **3 nm** e abaixo, FinFETs encontram limites de variabilidade e efeitos quânticos. **GAAFET** empilha **nanofolhas** envolvidas pelo portão nos **quatro lados**. Samsung em massa no 3 nm (**MBCFET**, 2022); TSMC e Intel nos nós N2 e **18A (RibbonFET)** <Cite id="asml-gaa" />. Controle eletrostático superior, até **~40%** menos vazamento, largura de nanofolhas ajustável para performance vs. consumo.

O primeiro produto comercial com GAA foi o ASIC minerador **MicroBT WhatsMiner M56S++**, no processo SF3E da Samsung, identificado em 2023 <Cite id="techinsights-gaa" />. Vale a ressalva: o **N3 da TSMC ainda era FinFET** — o Apple A17 Pro do iPhone 15 Pro é um chip de 3 nm FinFET. A TSMC só adotou nanofolhas no **N2**, com produção em volume no fim de 2025 e o **Apple A20 Pro** entre os primeiros grandes produtos <Cite id="tsmc-n2" />.

## 2025/2026 — BSPDN (backside power)

<TransistorFacts year="2025/2026" />

<DiagramFigure src="/assets/bspdn.svg" alt="Comparação entre alimentação frontal e rede de alimentação no verso do wafer">
A alimentação migra para o verso do wafer e o lado frontal fica livre para sinal.
</DiagramFigure>

**Backside Power Delivery Network (BSPDN)** — *PowerVia* (Intel 18A), *Super Power Rail* (TSMC): barramentos de alimentação migram para o **verso** do wafer via **TSVs**, liberando camadas frontais para sinal, ~**11%** mais densidade e queda de tensão dinâmica (**IR drop**) até **10×** menor.

Chega ao mercado no **Intel Panther Lake** (Core Ultra série 3), o primeiro chip a combinar *PowerVia* e *RibbonFET* <Cite id="intel-18a" />; a TSMC estreia a *Super Power Rail* no **A16**, com produção em volume prevista para o segundo semestre de 2026 <Cite id="tsmc-n2" />.

## ~2029 — Forksheet

<TransistorFacts year="~2029" />

Para o nó **A10**, a imec propôs uma arquitetura intermediária chamada **forksheet**. A ideia é colocar uma **parede dielétrica** entre as portas n e p: a parede separa as duas trincheiras de porta e permite aproximá-las muito mais do que a distância exigida pelas nanofolhas convencionais, sem precisar empilhar os transistores como no CFET. O resultado é uma célula padrão menor mantendo boa parte do fluxo de fabricação das nanofolhas, o que torna a transição menos disruptiva.

<DiagramFigure src="/assets/forksheet.svg" alt="Comparação entre nanofolhas GAA com folga n-p larga e forksheet com parede dielétrica entre as portas">
À esquerda, nanofolhas GAA com folga larga entre as portas n e p; à direita, forksheet com a parede dielétrica permitindo aproximá-las.
</DiagramFigure>

A imec demonstrou o processo em wafers de 300 mm em 2021 e, em 2025, apresentou uma variante *outer wall* com melhor manufaturabilidade e desempenho. É a ponte declarada entre GAAFET e CFET <Cite id="imec-forksheet" />.

## Futuro — CFET

<TransistorFacts year="Futuro" />

<DiagramFigure src="/assets/cfet.svg" alt="Comparação entre NFET e PFET lado a lado e um CFET empilhado">
NFET e PFET na mesma célula, empilhados em vez de lado a lado.
</DiagramFigure>

Abaixo de **1 nm** (era angstrom), **CFET (Complementary FET)** empilha verticalmente NFET e PFET na mesma célula, reduzindo até **~50%** a área por porta lógica (inversores, SRAM), estendendo a Lei de Moore além de GAAFET convencional. Como o empilhamento é muito mais complexo de fabricar, a imec só projeta produção em massa a partir do nó **A7**, depois de 2030 <Cite id="imec-forksheet" />.

## Adendo: o que o número do nó significa

A coluna "Nó" só corresponde a uma dimensão física real até meados dos anos 1990. Depois disso, virou um nome de geração. A história tem três etapas.

### 1. O número nasceu de uma coincidência

O "nó" não foi inventado como conceito. Ele registra a observação de que **duas dimensões diferentes davam aproximadamente o mesmo número**. A primeira é o **comprimento de porta** (*gate length*), a distância entre fonte e dreno que o portão controla, historicamente a medida que mais determina a velocidade do transistor. A segunda é o **meio-passo do metal** (*metal half-pitch*), metade da distância entre o início de uma interconexão metálica e o início da seguinte <Cite id="ieee-node" />.

Enquanto os dois andaram juntos, o rótulo funcionou. Cada geração encolhia essas dimensões em cerca de **30%** — e como 0,7 × 0,7 ≈ 0,5, a área de cada retângulo caía pela metade e a densidade dobrava. A Lei de Moore reduzida a aritmética <Cite id="ieee-node" />.

### 2. Os dois números se separaram em meados dos anos 1990

Para continuar ganhando velocidade, a indústria passou a encolher o **comprimento de porta mais rápido** que as demais dimensões. No nó dito "**130 nm**", os transistores reais tinham portas de **70 nm** — pouco mais da metade do número estampado no nome <Cite id="ieee-node" />.

O roteiro setorial que definia os nós, o **ITRS**, registrou a ruptura nos próprios documentos. Já na edição de **1999** ele eliminou o "nó de 150 nm" e redefiniu a designação a partir do **meio-passo de DRAM**, escrevendo que "o nó de tecnologia agora não é muito mais do que um rótulo simples para marcas de escala ainda meio convenientes ao longo desse caminho" <Cite id="itrs-1999" />. Em **2001**, o texto ficou explícito: a designação do nó "é definida pelo meio-passo do DRAM, e não pelo comprimento de porta do transistor nem pela dimensão mínima característica daquele nó" <Cite id="itrs-2001" />.

Em outras palavras: o número já não media o transistor. Media uma dimensão de memória — e servia, sobretudo, como marcador de geração.

### 3. Com o FinFET, o número deixou de medir qualquer coisa

A ruptura final veio com a mudança estrutural do transistor. No "**nó de 22 nm**" da Intel (2011), o primeiro com FinFET, os dispositivos tinham portas de **26 nm**, meio-passo de **40 nm** e aletas de **8 nm** <Cite id="ieee-node" />. Nenhuma dessas três medidas é 22.

Paolo Gargini, que presidiu o ITRS e depois o IRDS, resume: o número do nó "não tinha mais absolutamente nenhum sentido, porque não dizia respeito a nenhuma dimensão que se pudesse encontrar no chip" <Cite id="ieee-node" />. O artigo em que a citação aparece saiu na IEEE Spectrum com um título direto ao ponto: *“The Node is Nonsense”*.

### O que veio no lugar

Como nenhuma dimensão única resume mais um processo, o IRDS propôs trocar o rótulo por uma métrica de **três números**: o passo de porta contactada (**G**), o passo de metal (**M**) e o número de camadas de dispositivos (**T**). Os chips chamados de "5 nm", por exemplo, seriam **G48M36T1**: 48 nm de passo de porta, 36 nm de passo de metal, uma camada <Cite id="ieee-node" />. Não é um número redondo, mas diz algo verificável. Enquanto isso, a indústria segue usando 3 nm, 2 nm e 18A como **nomes de geração**, e é exatamente assim que eles devem ser lidos na tabela do início do capítulo.

<SourceNote :ids="['intel-4004', 'intel-chmos3', 'intel-80386', 'ldd-08um', 'motorola-ldd-patent', 'intel-p856', 'shmj-sti', 'ibm-sti-patent', 'voldman-esd', 'ibm-cell', 'wikipedia-rs64', 'ibm-rs64-soi', 'bruel-smartcut', 'intel-90nm', 'hkmg-paper', 'intel-45nm', 'intel-trigate', 'techinsights-22fdx', 'verisilicon-fdsoi', 'techinsights-gaa', 'tsmc-n2', 'intel-18a', 'imec-forksheet', 'semiconductor-scale', 'chm-sigate', 'faggin-sgt', 'ieee-node', 'itrs-1999', 'itrs-2001']" />

<SeeAlso :links="[
  { text: 'Linha do tempo', href: '/linha-do-tempo', note: 'cronologia e comparador interativo' },
  { text: 'Fotolitografia', href: '/fotolitografia', note: 'patterning dos níveis do chip' },
  { text: 'Referências', href: '/referencias', note: 'fontes primárias e papers' },
]" />
