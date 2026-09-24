---
title: Prices and value
description: The silicon price ladder — from dollars per kilogram in MG-Si to a chip's value split — and the rung the industry does not publish.
dataAsOf: 2026
---

# Prices and value

The earlier chapters count silicon in kilograms, purity grades and nanometres. This page counts the same chain in **money**, because price is what decides where each step is done, who survives a downturn, and why the geography described in the [chokepoint map](/en/gargalos) exists at all.

The exercise has one virtue and one limit. The virtue is that price is the most honest summary of an industrial chain: it already contains energy, yield, capital and risk. The limit is that not every rung is public — and it is worth saying **which** are not, rather than filling the gap with a round number.

## The ladder

| Rung | Unit | Order of magnitude | Source |
| --- | --- | --- | --- |
| Metallurgical silicon (MG-Si) | US$/kg | **a few dollars**, depending on grade and particle size | <Cite id="saimm" /> |
| Polysilicon — cycle trough | US$/kg | **6.75** (June 2020, spot price) | <Cite id="bernreuter-pork-cycle" /> |
| Polysilicon — cycle peak | US$/kg | **39** (August 2022) | <Cite id="bernreuter-pork-cycle" /> |
| Solar cell | US$/Wp | **≈ 1** (2011) | <Cite id="saimm" /> |
| Solar module | US$/Wp | **≈ 2** for crystalline silicon (2011); **¥ 0.70/W** in 2025 | <Cite id="saimm" /> <Cite id="trendforce-2025" /> |
| Integrated-circuit test | % of revenue | **under 2 to 3%** | <Cite id="itrs-2015-test" /> |
| Assembly, test and packaging | % of finished chip value | **about 10%** (SIA/BCG estimate **6%**) | <Cite id="cset-packaging" /> |
| Design + front-end fabrication | % of finished chip value | **about 45%** | <Cite id="cset-packaging" /> |

Two readings of that table stand out.

The first is the **loss of mass**. A kilogram of metallurgical silicon becomes less than a kilogram of polysilicon, which becomes a wafer of a few hundred grams, which becomes a chip of a few grams. Mass shrinks at every rung; the price **per unit of mass** rises by orders of magnitude.

The second is that most of the value is **not in the material**. Design and front-end together account for about 45% of a finished chip's value, while the assembly and test step — the one this site covers in [packaging](/en/empacotamento) — sits near 10%, and the semiconductor material itself is a smaller fraction still <Cite id="cset-packaging" />.

## The commodity rung

Polysilicon is the rung where price behaves like a commodity, and it is therefore the only one where the whole cycle is visible in public numbers: **US$ 6.75/kg** at the all-time low of June 2020 and **US$ 39/kg** in August 2022, the entire climb taking about two years <Cite id="bernreuter-pork-cycle" />.

That range — nearly **6×** between trough and peak — is what decided who built new plants and who closed. The *pork cycle* dynamics and the list of companies that left the market are in the [polysilicon](/en/polissilicio) chapter.

At the other end of the chain, the module price fell for a different reason: scale and efficiency, with cost dropping a fixed fraction for every doubling of cumulative production <Cite id="fraunhofer-pv-report" />. It is the same physics that took the cell from about **US$ 1/Wp** in 2011 to a module around **¥ 0.70/W** in 2025 <Cite id="saimm" /> <Cite id="trendforce-2025" />.

## The rung nobody publishes

Missing from the table is the rung most interesting to anyone trying to understand the real cost of a chip: the **wafer price**, and above all the price of a wafer **processed** at a leading-edge node.

It is absent because it is not published in a comparable way. Wafer supply contracts are negotiated case by case and covered by confidentiality, so the numbers that circulate in presentations rarely have a primary source behind them — the same problem this site already recorded when handling wafer makers' market share in [crystal structure](/en/estrutura-wafers#quem-fabrica-os-wafers), where the round "60%" figure did not survive the data.

The practical consequence is a reading rule: **when a rung is presented as a closed number, ask where it came from**. Where a public index exists — as with polysilicon contract prices — the series is auditable; where it does not, what exists is a consultancy estimate.

## From kilogram to square millimetre

The chain's final unit is neither mass nor area: it is the **cost per logic gate**, or per transistor. That is what decides whether shrinking pays.

The [transistor evolution](/en/transistores) chapter shows that the "node number" stopped measuring a physical dimension — today it is a generation name, not a measurement <Cite id="ieee-node" />. Price followed the same path: since density no longer doubles every generation, cost per transistor now depends on how many functions fit into the same metal pitch, not on the process label.

That is why the chain's value migrated to its two extremes — **design**, which decides the architecture, and the **tool**, which decides what can be built. Both are the subject of the [chokepoint map](/en/gargalos).

<SourceNote label="Sources" :ids="['saimm', 'bernreuter-pork-cycle', 'trendforce-2025', 'itrs-2015-test', 'cset-packaging', 'fraunhofer-pv-report', 'ieee-node']" />

<SeeAlso title="See also" :links="[
  { text: 'Polysilicon', href: '/en/polissilicio', note: 'the price cycle and the Chinese ascent' },
  { text: 'The chokepoint map', href: '/en/gargalos', note: 'where the value is concentrated' },
  { text: 'Data and numbers', href: '/en/dados', note: 'the series as charts and CSV' },
  { text: 'References', href: '/en/referencias', note: 'numbered list' },
]" />
