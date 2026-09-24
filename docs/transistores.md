---
title: Evolução dos transistores
description: De MOSFET planar a CFET — silício esticado, HKMG, FinFET, FD-SOI, GAAFET, backside power e forksheet.
dataAsOf: 2026
---

# Evolução arquitetônica dos transistores

Compare visualmente três arquiteturas principais:

<ClientOnly>
  <TransistorCompare />
</ClientOnly>

## As quinze gerações de uma vez

Antes da história, o mapa: uma linha por geração, com o que ela mudou e o que ela entregou. A coluna **Ano** marca a entrada em produção ou a demonstração; a coluna **Nó** é um rótulo de geração, não uma medida — o que isso significa é o assunto do [adendo no fim do capítulo](#adendo-o-que-o-numero-do-no-significa).

<TransistorTable />

O que vem a seguir é a história de cada linha, na mesma ordem, com a figura correspondente.

## 1960 — MOSFET planar

<DiagramFigure src="/pdf-images/p17-1.png" alt="Transistor MOSFET planar">
O transistor planar: canal, porta, fonte e dreno no plano do wafer — a estrutura que a litografia precisava desenhar de uma vez.
</DiagramFigure>

Transistores planares (**MOSFET** — *Metal-Oxide-Semiconductor Field-Effect Transistor*), consolidados na década de 1960 após Kahng e Atalla (Bell Labs), sustentaram a Lei de Moore por décadas. Canal, portão (*gate*), fonte (*source*) e dreno (*drain*) ficam no plano bidimensional do wafer. O primeiro dispositivo funcional, apresentado em **1960**, tinha porta de **20 µm** e óxido de porta de 100 nm — uma versão de **10 µm** veio no mesmo ano <Cite id="semiconductor-scale" />. Para comparação, o "nó de 22 nm" de 2011 tem portas de 26 nm: em cinco décadas, essa dimensão encolheu quase mil vezes. Abaixo do nó de **28 nm**, a proximidade fonte–dreno degradou o controle do portão, com **efeitos de canal curto (SCE)** e fuga por tunelamento quântico.

Na prática, essa geração equipou as calculadoras de bolso e os primeiros microcomputadores domésticos: a família NMOS **6502**, por exemplo, movia o Apple II, o Commodore 64 e o NES.

## 1963 — CMOS (par complementar)

Em **1963**, Frank Wanlass (Fairchild) patenteou o **CMOS** (*Complementary MOS*): um transistor NMOS e um PMOS ligados em série, de modo que **um conduz enquanto o outro está cortado**. Como nunca há um caminho direto entre alimentação e terra no estado estacionário, o consumo em repouso se resume à fuga — potência estática praticamente nula. A RCA levou a família 4000 ao mercado em 1968 e, desde então, CMOS é a base de praticamente toda a lógica digital — é o que permite bilhões de portas num único chip sem derreter.

<DiagramFigure src="/assets/cmos.svg" alt="Corte transversal de CMOS com NMOS em poço p e PMOS em poço n">
Par complementar: NMOS em poço p e PMOS em poço n, com um único caminho entre V<sub>DD</sub> e GND.
</DiagramFigure>

O primeiro uso em larga escala foi a **família lógica RCA CD4000** (1968), que popularizou o CMOS em relógios digitais, calculadoras e instrumentos a bateria. Décadas depois, o mesmo princípio virou o **relógio de tempo real** de todo PC — alimentado até hoje por aquela que o mercado apelidou de “bateria da CMOS”.

## 1968 — Porta de silício autoalinhada

Até o fim da década de 1960 a porta era de **alumínio**, depositada **depois** da difusão de fonte e dreno. Para garantir que o canal ficasse inteiramente coberto, a porta precisava **sobrepor** fonte e dreno, somando capacitância parasita e obrigando a folgas de alinhamento que desperdiçavam área.

A **porta de silício autoalinhada** resolveu o problema trocando a ordem das etapas: o polissilício é depositado e definido **antes**, e passa ele próprio a servir de máscara para o implante de fonte e dreno. As junções ficam automaticamente alinhadas à porta, com sobreposição mínima — e o polissilício ainda suporta os recozimentos em alta temperatura que o alumínio não tolerava.

A cronologia tem três nomes. Em **1965**, Boyd Watkins descreveu uma estrutura autoalinhada de porta de silício na General Microelectronics, mas o depósito da patente só saiu em 1969. Em **1967**, Robert Kerwin, Donald Klein e John Sarace, dos Bell Labs, publicaram a troca do alumínio por silício policristalino e demonstraram transistores autoalinhados ainda como dispositivos discretos <Cite id="chm-sigate" />. A transposição para circuitos integrados veio na Fairchild, onde Tom Klein e Federico Faggin resolveram o que faltava — a gravura precisa do silício e a arquitetura de processo <Cite id="chm-sigate" />.

<DiagramFigure src="/assets/silicon-gate.svg" alt="Comparação entre porta de alumínio com sobreposição e porta de silício autoalinhada">
Acima, porta de alumínio com sobreposição de fonte e dreno; abaixo, porta de silício autoalinhada.
</DiagramFigure>

O primeiro produto comercial foi o **Fairchild 3708** (1968), um multiplexador analógico de 8 canais criado como substituto do problemático 3705 de porta de alumínio. Comparado a ele, o 3708 era cerca de **5× mais rápido**, tinha aproximadamente **100× menos corrente de fuga** e a resistência de condução das chaves analógicas era **3× menor** <Cite id="faggin-sgt" />. Vale registrar a disputa: a Intel apresentava o 1101 como o primeiro CI de porta de silício, mas o 3708 chegou antes — e a própria Intel se beneficiou do processo ao contratar Les Vadasz e Federico Faggin, que o haviam desenvolvido <Cite id="faggin-sgt" /> <Cite id="chm-sigate" />.

Foi essa técnica que tornou viáveis os primeiros microprocessadores. Faggin entrou na Intel em **abril de 1970** e foi o arquiteto da família 4000: o **Intel 4004** (1971) saiu com 2 300 transistores numa pastilha de 12 mm², em pMOS de 10 µm, projetado para a calculadora Busicom 141-PF <Cite id="intel-4004" />. Sem a porta autoalinhada e o contato enterrado, o 4004 não caberia num die fabricável <Cite id="chm-sigate" />.

## 1985 — LDD (dreno levemente dopado)

Com canais da ordem de **1 µm**, o campo elétrico concentrado junto ao dreno acelerava os portadores a energias altas o bastante para atravessar o óxido de porta. Esses **portadores quentes** ficavam presos no óxido, deslocando a tensão de limiar e encurtando a vida útil do dispositivo. A estrutura **LDD** (*Lightly Doped Drain*, IBM, 1980) intercala uma extensão pouco dopada (**n⁻**) entre o canal e o contato fortemente dopado (**n⁺**): a queda de potencial se distribui por uma distância maior e o campo de pico cai. A extensão é definida por um **espaçador** lateral de nitreto — que depois seria reaproveitado nos processos de siliceto. O preço é uma pequena resistência série extra.

<DiagramFigure src="/assets/ldd.svg" alt="Comparação entre junção convencional e estrutura LDD com espaçadores">
À esquerda, junção convencional; à direita, LDD com extensões n⁻ definidas por espaçadores.
</DiagramFigure>

O conceito nasceu na IBM em **1980**, mas a adoção em produção veio com a **CHMOS III** da Intel: o próprio paper da Intel descreve a estrutura LDD como o recurso que garantia a confiabilidade do transistor, ao lado de uma porta de **250 Å** e canal elétrico típico de **1,0 µm**, e já anunciava o uso da tecnologia na produção do microprocessador de 32 bits seguinte <Cite id="intel-chmos3" />. O produto foi o **80386** (1985), fabricado em CHMOS III com 1,5 µm e duas camadas de metal <Cite id="intel-80386" /> — o processador dos PCs da era Windows 3.x. Deixou de ser exceção conforme os canais desciam abaixo de 1 µm: já em **1987** havia processos CMOS de **0,8 µm** construídos em torno dela <Cite id="ldd-08um" />.

## 1995 — STI (trincheira rasa)

O isolamento entre transistores vizinhos era feito por **LOCOS** (*Local Oxidation of Silicon*): um nitreto delimita as áreas ativas e a oxidação térmica cresce um óxido de campo espesso. O processo avança lateralmente sob o nitreto e forma o **“bico de pássaro”**, que consome área ativa e limita a densidade. A trincheira rasa foi **proposta no início dos anos 1980**, mas passou anos sem uso prático: faltavam tanto a planarização quanto uma deposição de óxido capaz de preencher trincheiras estreitas. Foi o **CMP** que destravou o processo <Cite id="shmj-sti" />. Abre-se então uma trincheira rasa no silício, preenchida com óxido depositado e planarizada por CMP: paredes verticais, sem bico de pássaro, e superfície plana — requisito para a profundidade de foco da litografia.

<DiagramFigure src="/assets/sti.svg" alt="Comparação entre isolamento LOCOS com bico de pássaro e trincheira rasa vertical">
À esquerda, LOCOS com o bico de pássaro invadindo a área ativa; à direita, trincheira rasa com paredes verticais.
</DiagramFigure>

A produção veio **antes do nó de 0,25 µm**, não nele. A IBM liderou a aplicação em **DRAM de 0,35 µm**, e a Toshiba já produzia em massa em 1996 <Cite id="shmj-sti" />. No lado lógico, a Intel também partiu de STI **uma geração antes**: o fluxo do P856 é descrito como igual ao do **P854 (0,35 µm)**, que já começava por trincheira rasa <Cite id="intel-p856" />. O **P856 (0,25 µm)**, certificado no **3º trimestre de 1997**, é que levou a STI ao **Pentium II** em volume <Cite id="intel-p856" /><Cite id="voldman-esd" />.

## 1998 — SOI (silício sobre isolante)

Em **SOI** (*Silicon On Insulator*), o transistor é construído num **filme fino de silício** sobre uma camada de **óxido enterrado** (*buried oxide*, BOX). As junções deixam de tocar o substrato, o que derruba a **capacitância de junção** — comutação mais rápida com menos energia —, elimina o **latch-up** típico do CMOS em silício maciço e melhora a tolerância à radiação. A IBM popularizou a técnica em processadores de alto desempenho a partir de ~**0.22 µm**; hoje a variante **FD-SOI** (corpo ultrafino) ocupa nichos de baixo consumo e RF.

<DiagramFigure src="/assets/soi.svg" alt="Comparação entre transistor em silício maciço e transistor SOI sobre óxido enterrado">
Acima, transistor em silício maciço; abaixo, filme fino de silício isolado por óxido enterrado.
</DiagramFigure>

A arquitetura ficou famosa na geração de consoles de 2005–2006: o **Cell** da PlayStation 3 e o **Xenon** do Xbox 360 saíram em SOI de 90 nm, e os **Athlon 64** da AMD levaram a mesma tecnologia aos PCs <Cite id="ibm-cell" />.

## 2003 — Silício esticado (Intel)

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

<DiagramFigure src="/assets/hkmg-gate-stack.svg" alt="Comparação entre porta de SiO₂/polissilício e porta High-K metálica">
A pilha de porta muda duas vezes de uma vez: o dielétrico deixa de ser SiO₂ e o metal substitui o polissilício.
</DiagramFigure>

Com óxido de portão (SiO₂) reduzido a ~**1 nm**, o vazamento por tunelamento tornou-se inviável. Em **2007** (45 nm), dielétricos de **High-K** (háfnio) e **portões metálicos** substituíram SiO₂/polissilício, mantendo acoplamento eletrostático com espessura física maior <Cite id="hkmg-paper" />.

A estreia comercial foi o **Core 2 Extreme QX9650**, em novembro de 2007, seguido em janeiro de 2008 pela linha de volume — os Core 2 Duo e Quad de 45 nm que equiparam laptops e MacBooks da época <Cite id="intel-45nm" />.

## 2011 — FinFET (Tri-Gate)

<DiagramFigure src="/pdf-images/p17-2.png" alt="Transistor FinFET Tri-Gate">
O canal sai do plano: a aleta vertical é envolvida pelo portão em três lados.
</DiagramFigure>

Abaixo de **20 nm**, planares perderam controle. A Intel comercializou **FinFET** no **22 nm** (2011): canal em “aleta” vertical; portão envolve três lados, reduzindo fuga e permitindo escalar corrente com múltiplas aletas adjacentes (**quantização de aleta**).

O **Ivy Bridge** (22 nm, abril de 2012) foi o primeiro produto de alto volume <Cite id="intel-trigate" />; no celular, o **Exynos 7420** (Galaxy S6) e o **Apple A9** (iPhone 6s) levaram o FinFET aos smartphones em 2015. A arquitetura dominou os nós de 22 nm a 5 nm.

## 2012 — FD-SOI (corpo ultrafino)

Enquanto o restante da indústria migrava para o FinFET, a **FD-SOI** seguiu outro caminho, retomando a ideia do SOI com um **filme de silício ultrafino** (~6 nm) sobre o óxido enterrado. Com o filme tão fino, o canal fica **totalmente depletado** — sem o “corpo flutuante” que causava efeitos indesejados no SOI parcialmente depletado — e um **plano traseiro** sob o BOX permite aplicar **polarização de corpo** (*back bias*) para subir ou baixar a tensão de limiar em tempo real. Na prática, isso permite gastar energia só quando o circuito precisa de desempenho, o que é valioso em IoT, RF e automotivo.

<DiagramFigure src="/assets/fdsoi.svg" alt="Comparação entre SOI parcialmente depletado com corpo flutuante e FD-SOI com filme ultrafino e plano traseiro">
Acima, SOI parcialmente depletado com corpo flutuante; abaixo, FD-SOI com filme ultrafino e plano traseiro para back bias.
</DiagramFigure>

As plataformas comerciais vieram da STMicroelectronics (28 nm) e da GlobalFoundries (**22FDX**). O caso mais conhecido é o **Google Nest Mini**, cujo SoC Synaptics AS-370 foi identificado em teardown como fabricado em 22FDX <Cite id="techinsights-22fdx" />. A tecnologia também sustenta MCUs BLE, câmeras Wi-Fi e SoCs de GNSS, com dezenas de projetos já em produção em massa <Cite id="verisilicon-fdsoi" />.

## 2022 — GAAFET (gate-all-around / nanosheets)

<DiagramFigure src="/pdf-images/p18-1.png" alt="Transistor GAAFET de nanofolhas">
Nanofolhas empilhadas, com o portão envolvendo as quatro faces de cada uma.
</DiagramFigure>

Em **3 nm** e abaixo, FinFETs encontram limites de variabilidade e efeitos quânticos. **GAAFET** empilha **nanofolhas** envolvidas pelo portão nos **quatro lados**. Samsung em massa no 3 nm (**MBCFET**, 2022); TSMC e Intel nos nós N2 e **18A (RibbonFET)** <Cite id="asml-gaa" />. Controle eletrostático superior, até **~40%** menos vazamento, largura de nanofolhas ajustável para performance vs. consumo.

O primeiro produto comercial com GAA foi o ASIC minerador **MicroBT WhatsMiner M56S++**, no processo SF3E da Samsung, identificado em 2023 <Cite id="techinsights-gaa" />. Vale a ressalva: o **N3 da TSMC ainda era FinFET** — o Apple A17 Pro do iPhone 15 Pro é um chip de 3 nm FinFET. A TSMC só adotou nanofolhas no **N2**, com produção em volume no fim de 2025 e o **Apple A20 Pro** entre os primeiros grandes produtos <Cite id="tsmc-n2" />.

## 2025/2026 — BSPDN (backside power)

<DiagramFigure src="/assets/bspdn.svg" alt="Comparação entre alimentação frontal e rede de alimentação no verso do wafer">
A alimentação migra para o verso do wafer e o lado frontal fica livre para sinal.
</DiagramFigure>

**Backside Power Delivery Network (BSPDN)** — *PowerVia* (Intel 18A), *Super Power Rail* (TSMC): barramentos de alimentação migram para o **verso** do wafer via **TSVs**, liberando camadas frontais para sinal, ~**11%** mais densidade e queda de tensão dinâmica (**IR drop**) até **10×** menor.

Chega ao mercado no **Intel Panther Lake** (Core Ultra série 3), o primeiro chip a combinar *PowerVia* e *RibbonFET* <Cite id="intel-18a" />; a TSMC estreia a *Super Power Rail* no **A16**, com produção em volume prevista para o segundo semestre de 2026 <Cite id="tsmc-n2" />.

## ~2029 — Forksheet

Para o nó **A10**, a imec propôs uma arquitetura intermediária chamada **forksheet**. A ideia é colocar uma **parede dielétrica** entre as portas n e p: a parede separa as duas trincheiras de porta e permite aproximá-las muito mais do que a distância exigida pelas nanofolhas convencionais, sem precisar empilhar os transistores como no CFET. O resultado é uma célula padrão menor mantendo boa parte do fluxo de fabricação das nanofolhas, o que torna a transição menos disruptiva.

<DiagramFigure src="/assets/forksheet.svg" alt="Comparação entre nanofolhas GAA com folga n-p larga e forksheet com parede dielétrica entre as portas">
À esquerda, nanofolhas GAA com folga larga entre as portas n e p; à direita, forksheet com a parede dielétrica permitindo aproximá-las.
</DiagramFigure>

A imec demonstrou o processo em wafers de 300 mm em 2021 e, em 2025, apresentou uma variante *outer wall* com melhor manufaturabilidade e desempenho. É a ponte declarada entre GAAFET e CFET <Cite id="imec-forksheet" />.

## Futuro — CFET

<DiagramFigure src="/assets/cfet.svg" alt="Comparação entre NFET e PFET lado a lado e um CFET empilhado">
NFET e PFET na mesma célula, empilhados em vez de lado a lado.
</DiagramFigure>

Abaixo de **1 nm** (era angstrom), **CFET (Complementary FET)** empilha verticalmente NFET e PFET na mesma célula, reduzindo até **~50%** a área por porta lógica (inversores, SRAM), estendendo a Lei de Moore além de GAAFET convencional. Como o empilhamento é muito mais complexo de fabricar, a imec só projeta produção em massa a partir do nó **A7**, depois de 2030 <Cite id="imec-forksheet" />.

## Adendo: o que o número do nó significa

A coluna "Nó" só corresponde a uma dimensão física real até meados dos anos 1990. Depois disso, virou um nome de geração. A história tem três etapas.

### 1. O número nasceu de uma coincidência

O "nó" não foi inventado como conceito. Ele registra a observação de que **duas dimensões diferentes davam aproximadamente o mesmo número**. A primeira é o **comprimento de porta** (*gate length*) — a distância entre fonte e dreno que o portão controla, historicamente a medida que mais determina a velocidade do transistor. A segunda é o **meio-passo do metal** (*metal half-pitch*) — metade da distância entre o início de uma interconexão metálica e o início da seguinte <Cite id="ieee-node" />.

Enquanto os dois andaram juntos, o rótulo funcionou. Cada geração encolhia essas dimensões em cerca de **30%** — e como 0,7 × 0,7 ≈ 0,5, a área de cada retângulo caía pela metade e a densidade dobrava. A Lei de Moore reduzida a aritmética <Cite id="ieee-node" />.

### 2. Os dois números se separaram em meados dos anos 1990

Para continuar ganhando velocidade, a indústria passou a encolher o **comprimento de porta mais rápido** que as demais dimensões. No nó dito "**130 nm**", os transistores reais tinham portas de **70 nm** — pouco mais da metade do número estampado no nome <Cite id="ieee-node" />.

O roteiro setorial que definia os nós, o **ITRS**, registrou a ruptura nos próprios documentos. Já na edição de **1999** ele eliminou o "nó de 150 nm" e redefiniu a designação a partir do **meio-passo de DRAM**, escrevendo que "o nó de tecnologia agora não é muito mais do que um rótulo simples para marcas de escala ainda meio convenientes ao longo desse caminho" <Cite id="itrs-1999" />. Em **2001**, o texto ficou explícito: a designação do nó "é definida pelo meio-passo do DRAM, e não pelo comprimento de porta do transistor nem pela dimensão mínima característica daquele nó" <Cite id="itrs-2001" />.

Em outras palavras: o número já não media o transistor. Media uma dimensão de memória — e servia, sobretudo, como marcador de geração.

### 3. Com o FinFET, o número deixou de medir qualquer coisa

A ruptura final veio com a mudança estrutural do transistor. No "**nó de 22 nm**" da Intel (2011), o primeiro com FinFET, os dispositivos tinham portas de **26 nm**, meio-passo de **40 nm** e aletas de **8 nm** <Cite id="ieee-node" />. Nenhuma dessas três medidas é 22.

Paolo Gargini, que presidiu o ITRS e depois o IRDS, resume: o número do nó "não tinha mais absolutamente nenhum sentido, porque não dizia respeito a nenhuma dimensão que se pudesse encontrar no chip" <Cite id="ieee-node" />. O artigo em que a citação aparece saiu na IEEE Spectrum com um título direto ao ponto: *“The Node is Nonsense”*.

### O que veio no lugar

Como nenhuma dimensão única resume mais um processo, o IRDS propôs trocar o rótulo por uma métrica de **três números**: o passo de porta contactada (**G**), o passo de metal (**M**) e o número de camadas de dispositivos (**T**). Os chips chamados de "5 nm", por exemplo, seriam **G48M36T1** — 48 nm de passo de porta, 36 nm de passo de metal, uma camada <Cite id="ieee-node" />. Não é um número redondo, mas diz algo verificável. Enquanto isso, a indústria segue usando 3 nm, 2 nm e 18A como **nomes de geração** — e é exatamente assim que eles devem ser lidos na tabela do início do capítulo.

<SourceNote :ids="['intel-4004', 'intel-chmos3', 'intel-80386', 'ldd-08um', 'intel-p856', 'shmj-sti', 'voldman-esd', 'ibm-cell', 'intel-90nm', 'hkmg-paper', 'intel-45nm', 'intel-trigate', 'techinsights-22fdx', 'verisilicon-fdsoi', 'techinsights-gaa', 'tsmc-n2', 'intel-18a', 'imec-forksheet', 'semiconductor-scale', 'chm-sigate', 'faggin-sgt', 'ieee-node', 'itrs-1999', 'itrs-2001']" />

<SeeAlso :links="[
  { text: 'Linha do tempo', href: '/linha-do-tempo', note: 'cronologia e comparador interativo' },
  { text: 'Fotolitografia', href: '/fotolitografia', note: 'patterning dos níveis do chip' },
  { text: 'Referências', href: '/referencias', note: 'fontes primárias e papers' },
]" />
