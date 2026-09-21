---
title: Evolução dos transistores
description: De MOSFET planar a CFET — silício esticado, HKMG, FinFET, FD-SOI, GAAFET, backside power e forksheet.
---

# Evolução arquitetônica dos transistores

Compare visualmente três arquiteturas principais:

<ClientOnly>
  <TransistorCompare />
</ClientOnly>

## Comparativo das gerações

| Era | Nó | Arquitetura | Mudança-chave | Ganho |
|-----|-----|-------------|---------------|-------|
| **1960** | — | MOSFET planar | Canal, portão, fonte e dreno no plano do wafer | Base da Lei de Moore por décadas |
| **1963** | — | CMOS (par complementar) | NMOS e PMOS complementares no mesmo substrato | Consumo quase nulo em repouso — base de toda a lógica digital |
| **1968** | — | Porta de silício (autoalinhada) | A porta de polissilício mascara o próprio implante de fonte/dreno | Menos capacitância de sobreposição; dispositivos menores e mais rápidos |
| **1985** | 1.5 µm | LDD (dreno levemente dopado) | Extensões n⁻ sob espaçadores de nitreto | Suaviza o campo no dreno e contém portadores quentes |
| **1995** | 0.35 µm | STI (trincheira rasa) | Trincheira de óxido substitui o isolamento LOCOS | Paredes verticais, sem “bico de pássaro”; mais densidade |
| **1998** | 0.22 µm | SOI (silício sobre isolante) | Filme fino de silício sobre óxido enterrado | Menos capacitância de junção e imunidade ao latch-up |
| **2003** | 90 nm | Silício esticado | Si depositado sobre SiGe tensiona a rede cristalina | +10–20% de mobilidade com custo marginal <Cite id="intel-strain" /> |
| **2007** | 45 nm | HKMG | Dielétrico High-K (háfnio) + portão metálico substituem SiO₂/polissilício | Bloqueia a fuga mantendo o acoplamento eletrostático <Cite id="hkmg-paper" /> |
| **2011** | 22 nm | FinFET (Tri-Gate) | Canal em aleta vertical; portão envolve três lados | Controle eletrostático; corrente escalável por aletas |
| **2012** | 28 nm | FD-SOI (corpo ultrafino) | Filme ultrafino sobre óxido + plano traseiro | Back bias ajusta a tensão de limiar; baixo consumo e menos variabilidade |
| **2022** | 3 nm | GAAFET / nanofolhas | Nanofolhas empilhadas envoltas pelo portão nos quatro lados | Até ~40% menos vazamento <Cite id="asml-gaa" /> |
| **2025/2026** | 18A / N2 | BSPDN | Alimentação migra para o verso do wafer via TSVs | ~11% mais densidade; IR drop até 10× menor |
| **~2029** | A10 | Forksheet | Parede dielétrica separa as portas n e p | Aproxima n e p sem empilhar; células padrão menores |
| **Futuro** | &lt;1 nm | CFET | NFET e PFET empilhados na mesma célula | Até ~50% menos área por porta lógica |

## 1960 — MOSFET planar

Transistores planares (**MOSFET** — *Metal-Oxide-Semiconductor Field-Effect Transistor*), consolidados na década de 1960 após Kahng e Atalla (Bell Labs), sustentaram a Lei de Moore por décadas. Canal, portão (*gate*), fonte (*source*) e dreno (*drain*) ficam no plano bidimensional do wafer. Abaixo de **28 nm**, a proximidade fonte–dreno degradou o controle do portão, com **efeitos de canal curto (SCE)** e fuga por tunelamento quântico.

Na prática, essa geração equipou as calculadoras de bolso e os primeiros microcomputadores domésticos: a família NMOS **6502**, por exemplo, movia o Apple II, o Commodore 64 e o NES.

## 1963 — CMOS (par complementar)

Em **1963**, Frank Wanlass (Fairchild) patenteou o **CMOS** (*Complementary MOS*): um transistor NMOS e um PMOS ligados em série, de modo que **um conduz enquanto o outro está cortado**. Como nunca há um caminho direto entre alimentação e terra no estado estacionário, o consumo em repouso se resume à fuga — potência estática praticamente nula. A RCA levou a família 4000 ao mercado em 1968 e, desde então, CMOS é a base de praticamente toda a lógica digital — é o que permite bilhões de portas num único chip sem derreter.

<DiagramFigure src="/assets/cmos.svg" alt="Corte transversal de CMOS com NMOS em poço p e PMOS em poço n">
Par complementar: NMOS em poço p e PMOS em poço n, com um único caminho entre V<sub>DD</sub> e GND.
</DiagramFigure>

O primeiro uso em larga escala foi a **família lógica RCA CD4000** (1968), que popularizou o CMOS em relógios digitais, calculadoras e instrumentos a bateria. Décadas depois, o mesmo princípio virou o **relógio de tempo real** de todo PC — alimentado até hoje por aquela que o mercado apelidou de “bateria da CMOS”.

## 1968 — Porta de silício autoalinhada

Até o fim da década de 1960 a porta era de **alumínio**, depositada **depois** da difusão de fonte e dreno. Para garantir que o canal ficasse inteiramente coberto, a porta precisava **sobrepor** fonte e dreno, somando capacitância parasita e obrigando a folgas de alinhamento que desperdiçavam área. Em **1968**, Bell Labs e Fairchild propuseram a **porta de silício autoalinhada**: o polissilício é depositado e definido **antes**, e passa ele próprio a servir de máscara para o implante de fonte e dreno. As junções ficam automaticamente alinhadas à porta, com sobreposição mínima — e o polissilício ainda suporta os recozimentos em alta temperatura que o alumínio não tolerava. Foi essa técnica que tornou viáveis os primeiros microprocessadores (Intel 4004, 1971).

<DiagramFigure src="/assets/silicon-gate.svg" alt="Comparação entre porta de alumínio com sobreposição e porta de silício autoalinhada">
Acima, porta de alumínio com sobreposição de fonte e dreno; abaixo, porta de silício autoalinhada.
</DiagramFigure>

O primeiro produto a explorar a técnica em escala foi o **Intel 4004** (1971), o primeiro microprocessador: 2 300 transistores numa pastilha de 12 mm², em pMOS de 10 µm, projetado para a calculadora Busicom 141-PF <Cite id="intel-4004" />.

## 1985 — LDD (dreno levemente dopado)

Com canais da ordem de **1 µm**, o campo elétrico concentrado junto ao dreno acelerava os portadores a energias altas o bastante para atravessar o óxido de porta. Esses **portadores quentes** ficavam presos no óxido, deslocando a tensão de limiar e encurtando a vida útil do dispositivo. A estrutura **LDD** (*Lightly Doped Drain*, IBM, 1980) intercala uma extensão pouco dopada (**n⁻**) entre o canal e o contato fortemente dopado (**n⁺**): a queda de potencial se distribui por uma distância maior e o campo de pico cai. A extensão é definida por um **espaçador** lateral de nitreto — que depois seria reaproveitado nos processos de siliceto. O preço é uma pequena resistência série extra.

<DiagramFigure src="/assets/ldd.svg" alt="Comparação entre junção convencional e estrutura LDD com espaçadores">
À esquerda, junção convencional; à direita, LDD com extensões n⁻ definidas por espaçadores.
</DiagramFigure>

O conceito nasceu na IBM em **1980**, mas a adoção em produção veio com a **CHMOS III** da Intel: o próprio paper da Intel descreve a estrutura LDD como o recurso que garantia a confiabilidade do transistor, ao lado de uma porta de **250 Å** e canal elétrico típico de **1,0 µm**, e já anunciava o uso da tecnologia na produção do microprocessador de 32 bits seguinte <Cite id="intel-chmos3" />. O produto foi o **80386** (1985), fabricado em CHMOS III com 1,5 µm e duas camadas de metal <Cite id="intel-80386" /> — o processador dos PCs da era Windows 3.x. A estrutura seguiu padrão de 1,5 µm até 0,8 µm <Cite id="voldman-esd" />.

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

Com óxido de portão (SiO₂) reduzido a ~**1 nm**, o vazamento por tunelamento tornou-se inviável. Em **2007** (45 nm), dielétricos de **High-K** (háfnio) e **portões metálicos** substituíram SiO₂/polissilício, mantendo acoplamento eletrostático com espessura física maior <Cite id="hkmg-paper" />.

A estreia comercial foi o **Core 2 Extreme QX9650**, em novembro de 2007, seguido em janeiro de 2008 pela linha de volume — os Core 2 Duo e Quad de 45 nm que equiparam laptops e MacBooks da época <Cite id="intel-45nm" />.

## 2011 — FinFET (Tri-Gate)

Abaixo de **20 nm**, planares perderam controle. A Intel comercializou **FinFET** no **22 nm** (2011): canal em “aleta” vertical; portão envolve três lados, reduzindo fuga e permitindo escalar corrente com múltiplas aletas adjacentes (**quantização de aleta**).

O **Ivy Bridge** (22 nm, abril de 2012) foi o primeiro produto de alto volume <Cite id="intel-trigate" />; no celular, o **Exynos 7420** (Galaxy S6) e o **Apple A9** (iPhone 6s) levaram o FinFET aos smartphones em 2015. A arquitetura dominou os nós de 22 nm a 5 nm.

## 2012 — FD-SOI (corpo ultrafino)

Enquanto o restante da indústria migrava para o FinFET, a **FD-SOI** seguiu outro caminho, retomando a ideia do SOI com um **filme de silício ultrafino** (~6 nm) sobre o óxido enterrado. Com o filme tão fino, o canal fica **totalmente depletado** — sem o “corpo flutuante” que causava efeitos indesejados no SOI parcialmente depletado — e um **plano traseiro** sob o BOX permite aplicar **polarização de corpo** (*back bias*) para subir ou baixar a tensão de limiar em tempo real. Na prática, isso permite gastar energia só quando o circuito precisa de desempenho, o que é valioso em IoT, RF e automotivo.

<DiagramFigure src="/assets/fdsoi.svg" alt="Comparação entre SOI parcialmente depletado com corpo flutuante e FD-SOI com filme ultrafino e plano traseiro">
Acima, SOI parcialmente depletado com corpo flutuante; abaixo, FD-SOI com filme ultrafino e plano traseiro para back bias.
</DiagramFigure>

As plataformas comerciais vieram da STMicroelectronics (28 nm) e da GlobalFoundries (**22FDX**). O caso mais conhecido é o **Google Nest Mini**, cujo SoC Synaptics AS-370 foi identificado em teardown como fabricado em 22FDX <Cite id="techinsights-22fdx" />. A tecnologia também sustenta MCUs BLE, câmeras Wi-Fi e SoCs de GNSS, com dezenas de projetos já em produção em massa <Cite id="verisilicon-fdsoi" />.

## 2022 — GAAFET (gate-all-around / nanosheets)

Em **3 nm** e abaixo, FinFETs encontram limites de variabilidade e efeitos quânticos. **GAAFET** empilha **nanofolhas** envolvidas pelo portão nos **quatro lados**. Samsung em massa no 3 nm (**MBCFET**, 2022); TSMC e Intel nos nós N2 e **18A (RibbonFET)** <Cite id="asml-gaa" />. Controle eletrostático superior, até **~40%** menos vazamento, largura de nanofolhas ajustável para performance vs. consumo.

O primeiro produto comercial com GAA foi o ASIC minerador **MicroBT WhatsMiner M56S++**, no processo SF3E da Samsung, identificado em 2023 <Cite id="techinsights-gaa" />. Vale a ressalva: o **N3 da TSMC ainda era FinFET** — o Apple A17 Pro do iPhone 15 Pro é um chip de 3 nm FinFET. A TSMC só adotou nanofolhas no **N2**, com produção em volume no fim de 2025 e o **Apple A20 Pro** entre os primeiros grandes produtos <Cite id="tsmc-n2" />.

## 2025/2026 — BSPDN (backside power)

**Backside Power Delivery Network (BSPDN)** — *PowerVia* (Intel 18A), *Super Power Rail* (TSMC): barramentos de alimentação migram para o **verso** do wafer via **TSVs**, liberando camadas frontais para sinal, ~**11%** mais densidade e queda de tensão dinâmica (**IR drop**) até **10×** menor.

Chega ao mercado no **Intel Panther Lake** (Core Ultra série 3), o primeiro chip a combinar *PowerVia* e *RibbonFET* <Cite id="intel-18a" />; a TSMC estreia a *Super Power Rail* no **A16**, com produção em volume prevista para o segundo semestre de 2026 <Cite id="tsmc-n2" />.

## ~2029 — Forksheet

Para o nó **A10**, a imec propôs uma arquitetura intermediária chamada **forksheet**. A ideia é colocar uma **parede dielétrica** entre as portas n e p: a parede separa as duas trincheiras de porta e permite aproximá-las muito mais do que a distância exigida pelas nanofolhas convencionais, sem precisar empilhar os transistores como no CFET. O resultado é uma célula padrão menor mantendo boa parte do fluxo de fabricação das nanofolhas, o que torna a transição menos disruptiva.

<DiagramFigure src="/assets/forksheet.svg" alt="Comparação entre nanofolhas GAA com folga n-p larga e forksheet com parede dielétrica entre as portas">
À esquerda, nanofolhas GAA com folga larga entre as portas n e p; à direita, forksheet com a parede dielétrica permitindo aproximá-las.
</DiagramFigure>

A imec demonstrou o processo em wafers de 300 mm em 2021 e, em 2025, apresentou uma variante *outer wall* com melhor manufaturabilidade e desempenho. É a ponte declarada entre GAAFET e CFET <Cite id="imec-forksheet" />.

## Futuro — CFET

Abaixo de **1 nm** (era angstrom), **CFET (Complementary FET)** empilha verticalmente NFET e PFET na mesma célula, reduzindo até **~50%** a área por porta lógica (inversores, SRAM), estendendo a Lei de Moore além de GAAFET convencional. Como o empilhamento é muito mais complexo de fabricar, a imec só projeta produção em massa a partir do nó **A7**, depois de 2030 <Cite id="imec-forksheet" />.

<SourceNote :ids="['intel-4004', 'intel-chmos3', 'intel-80386', 'intel-p856', 'shmj-sti', 'voldman-esd', 'ibm-cell', 'intel-90nm', 'hkmg-paper', 'intel-45nm', 'intel-trigate', 'techinsights-22fdx', 'verisilicon-fdsoi', 'techinsights-gaa', 'tsmc-n2', 'intel-18a', 'imec-forksheet']" />

<SeeAlso :links="[
  { text: 'Linha do tempo', href: '/linha-do-tempo', note: 'cronologia e comparador interativo' },
  { text: 'Fotolitografia', href: '/fotolitografia', note: 'patterning dos níveis do chip' },
  { text: 'Referências', href: '/referencias', note: 'fontes primárias e papers' },
]" />
