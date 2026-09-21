---
title: Evolução dos transistores
description: De MOSFET planar a CFET — silício esticado, HKMG, FinFET, GAAFET e backside power.
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
| **2003** | 90 nm | Silício esticado | Si depositado sobre SiGe tensiona a rede cristalina | +10–20% de mobilidade com custo marginal <Cite id="intel-strain" /> |
| **2007** | 45 nm | HKMG | Dielétrico High-K (háfnio) + portão metálico substituem SiO₂/polissilício | Bloqueia a fuga mantendo o acoplamento eletrostático <Cite id="hkmg-paper" /> |
| **2011** | 22 nm | FinFET (Tri-Gate) | Canal em aleta vertical; portão envolve três lados | Controle eletrostático; corrente escalável por aletas |
| **2022** | 3 nm | GAAFET / nanofolhas | Nanofolhas empilhadas envoltas pelo portão nos quatro lados | Até ~40% menos vazamento <Cite id="asml-gaa" /> |
| **2025/2026** | 18A / N2 | BSPDN | Alimentação migra para o verso do wafer via TSVs | ~11% mais densidade; IR drop até 10× menor |
| **Futuro** | &lt;1 nm | CFET | NFET e PFET empilhados na mesma célula | Até ~50% menos área por porta lógica |

## 1960 — MOSFET planar

Transistores planares (**MOSFET** — *Metal-Oxide-Semiconductor Field-Effect Transistor*), consolidados na década de 1960 após Kahng e Atalla (Bell Labs), sustentaram a Lei de Moore por décadas. Canal, portão (*gate*), fonte (*source*) e dreno (*drain*) ficam no plano bidimensional do wafer. Abaixo de **28 nm**, a proximidade fonte–dreno degradou o controle do portão, com **efeitos de canal curto (SCE)** e fuga por tunelamento quântico.

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

## 2007 — High-K metal gate (HKMG)

Com óxido de portão (SiO₂) reduzido a ~**1 nm**, o vazamento por tunelamento tornou-se inviável. Em **2007** (45 nm), dielétricos de **High-K** (háfnio) e **portões metálicos** substituíram SiO₂/polissilício, mantendo acoplamento eletrostático com espessura física maior <Cite id="hkmg-paper" />.

## 2011 — FinFET (Tri-Gate)

Abaixo de **20 nm**, planares perderam controle. A Intel comercializou **FinFET** no **22 nm** (2011): canal em “aleta” vertical; portão envolve três lados, reduzindo fuga e permitindo escalar corrente com múltiplas aletas adjacentes (**quantização de aleta**).

## 2022 — GAAFET (gate-all-around / nanosheets)

Em **3 nm** e abaixo, FinFETs encontram limites de variabilidade e efeitos quânticos. **GAAFET** empilha **nanofolhas** envolvidas pelo portão nos **quatro lados**. Samsung em massa no 3 nm (**MBCFET**, 2022); TSMC e Intel nos nós N2 e **18A (RibbonFET)** <Cite id="asml-gaa" />. Controle eletrostático superior, até **~40%** menos vazamento, largura de nanofolhas ajustável para performance vs. consumo.

## 2025/2026 — BSPDN (backside power)

**Backside Power Delivery Network (BSPDN)** — *PowerVia* (Intel 18A), *Super Power Rail* (TSMC): barramentos de alimentação migram para o **verso** do wafer via **TSVs**, liberando camadas frontais para sinal, ~**11%** mais densidade e queda de tensão dinâmica (**IR drop**) até **10×** menor.

## Futuro — CFET

Abaixo de **1 nm** (era angstrom), **CFET (Complementary FET)** empilha verticalmente NFET e PFET na mesma célula, reduzindo até **~50%** a área por porta lógica (inversores, SRAM), estendendo a Lei de Moore além de GAAFET convencional.

<SourceNote :ids="['intel-strain', 'hkmg-paper', 'asml-gaa']" />

<SeeAlso :links="[
  { text: 'Linha do tempo', href: '/linha-do-tempo', note: 'cronologia e comparador interativo' },
  { text: 'Fotolitografia', href: '/fotolitografia', note: 'patterning dos níveis do chip' },
  { text: 'Referências', href: '/referencias', note: 'Intel strained, ASML GAA' },
]" />
