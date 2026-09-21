---
title: Polysilicon
description: Chemical purification via TCS, the Siemens and FBR processes, and the history of the polysilicon market.
---

# Chemical purification and polysilicon

Metallurgical-grade silicon ([MG-Si](/en/glossario)) contains metallic and dopant impurities that severely affect the performance of semiconductors and solar panels <Cite id="energy-central" />. To reach **polysilicon** grade (polycrystalline silicon of very high purity), it must be chemically refined <Cite id="csiro" />.

The raw material was never the bottleneck: silicon is the **second most abundant element in the Earth's crust**, behind oxygen only <Cite id="pv-mfg-polysilicon" />. All of the value in this step lies in separating from the silicon the few atoms of boron, phosphorus and metals that ruin a transistor or a solar cell — and no physical filtration can do that job.

## Overview of the route

<DiagramFigure src="/assets/polysilicon-process.svg" alt="Flow chart of the polysilicon route: quartz and carbon in the arc furnace, ground MG-Si, fluidized bed chlorination forming trichlorosilane, fractional distillation, and deposition in either the Siemens reactor or the fluidized bed reactor">
The full route: quartz becomes crude silicon in the arc furnace; crude silicon becomes a gas so that it can be distilled; and the gas becomes solid silicon again — now ultrapure — in the deposition reactors.
</DiagramFigure>

The principle that organises the route is counter-intuitive: **silicon is not purified as a solid, but as a gas**. Turning it into trichlorosilane, whose boiling point is just **31.8 °C**, allows **fractional distillation** — the same technology used in oil refineries — to separate impurities that no filter could hold back <Cite id="pv-mfg-polysilicon" />. Purifying a gas and then solidifying it again is what separates metallurgical-grade silicon from solar- or electronic-grade silicon.

## From the arc furnace to MG-Si

The step before this page already delivers the starting material. Quartz (SiO₂) is reduced with carbon in a **submerged electric arc furnace** at about 2000 °C <Cite id="csiro" />, in a sequence of reactions where silicon carbide (SiC) is an essential intermediate:

```text
SiO₂ + 3C → SiC + 2CO (g)          (upper region, ~1600 °C)
SiO₂ + 2SiC → 3Si + 2CO (g)        (lower region, >1780 °C)
```

The detail that explains the furnace's economics is a third reaction, which closes the loop <Cite id="pv-mfg-polysilicon" />:

```text
2SiO₂ + SiC → 3SiO (g) + CO (g)
```

The **silicon monoxide** gas rises together with the CO, recombines in the cooler zones of the charge and regenerates SiO₂ and carbon — which feed the first reaction again. That is why the furnace is practically **self-sufficient in reactants**: it consumes a great deal of electricity, but wastes very little raw material <Cite id="pv-mfg-polysilicon" />.

The product is **MG-Si**, drained from the bottom of the furnace at 98% to 99.5% purity <Cite id="saimm" />. The next step, chlorination, is exactly where impurity stops being a mining problem and becomes a chemistry problem. The details of carbothermal reduction are in [Mining & MG-Si](/en/mineracao-mg-si).

## Conversion to trichlorosilane (TCS)

To become a gas, MG-Si is not melted: it is **ground into a powder**. The grinding is not a detail — it multiplies the surface area exposed to the gas, which is what allows the reaction to happen in seconds rather than hours.

That powder is injected into a **fluidized bed reactor** running at **high pressure and velocity**, where the particles are acted on by **anhydrous hydrochloric acid (HCl)** in the presence of a **catalyst** <Cite id="pv-mfg-polysilicon" />. The result is not a single substance but a **family of chlorosilanes** and other volatile chlorides, of which **trichlorosilane** (TCS, SiHCl₃) is by far the most important <Cite id="pv-mfg-polysilicon" />:

```text
Si + 3HCl → SiHCl₃ + H₂
```

With a boiling point of just **31.8 °C**, TCS leaves the reactor already as a gas <Cite id="ratedpower" />. At the top of the reactor a filter separates the gaseous TCS from the residual hydrogen and HCl <Cite id="pv-mfg-polysilicon" />, and the gas goes on to **fractional distillation**, where the difference in volatility between TCS and the chlorides of boron, phosphorus and metals performs the separation with very high precision <Cite id="ratedpower" />. It is here, and not before, that silicon becomes genuinely pure.

## Processes for obtaining solid polysilicon

The purified TCS gas is converted back into solid, ultra-pure metallic silicon by two main methods.

### Siemens process (CVD)

Created in the 1950s by Siemens and Wacker, it is the dominant method worldwide <Cite id="bernreuter" />. TCS gas is injected together with hydrogen (H₂) into a steel bell-jar reactor where **graphite electrodes** pass current through a **U-shaped silicon core** — the seed <Cite id="pv-mfg-polysilicon" />. That core is electrically heated to about **1100–1150 °C** <Cite id="bernreuter" />, and the TCS undergoes **hydrogen reduction**, in a mechanism equivalent to a **CVD** (*chemical vapour deposition*) process: solid silicon deposits on the seed and grows around it, releasing gaseous HCl <Cite id="pv-mfg-polysilicon" />.

When the process ends, the U-shaped core and the deposited silicon are extracted together and fractured. The rods reach **15 to 20 cm in diameter** <Cite id="ratedpower" /> and the material comes out at **9N** purity or better, ready to be graded <Cite id="pv-mfg-polysilicon" />. It is an extremely energy-intensive process — the main drawback of the method.

Purity classes:

- **Solar grade (SoG-Si):** 7N (99.99999%) to 9N — photovoltaic cells <Cite id="ratedpower" />.
- **Electronic grade (EG-Si):** 10N to 11N — semiconductors <Cite id="ratedpower" />.

### Fluidized bed reactor (FBR)

A continuous-flow method in which silicon seed particles are kept suspended by a carrier gas containing monosilane (SiH₄) or TCS <Cite id="bernreuter" />. The gas decomposes at much lower temperatures — **650–700 °C** for monosilane — accumulating silicon on the seeds until granules form and are continuously harvested, with none of the rod-fracturing step. It consumes roughly **90% less electricity** than the Siemens process, although it produces an unwanted fraction of silicon dust <Cite id="bernreuter" />.

<VideoPressEmbed id="ZlxguS11" title="Animation of the polysilicon production route" />

<SourceNote label="Sources" :ids="['pv-mfg-polysilicon', 'bernreuter', 'ratedpower', 'csiro', 'saimm']" />

*Animation and route schematic: [PV-Manufacturing.org](https://pv-manufacturing.org/silicon-production/polysilicon-production/) — the flow chart above was redrawn from that page's diagram and from its description of the reactions* <Cite id="pv-mfg-polysilicon" />.

## Market dynamics and history

In **1995**, about 90% of global polysilicon demand went to semiconductors and 10% to photovoltaics <Cite id="bernreuter" />. By **2014** the proportions had reversed completely: the photovoltaic sector consumed the overwhelming majority, raising demand from **1,500 tonnes** (1995) to **420,000 tonnes** (2018).

<DiagramFigure src="/pdf-images/p05-1.png" alt="Polysilicon demand, semiconductors vs photovoltaics, 1995 and 2014">
Inversion of market shares and **18.4×** growth between 1995 and 2014 (15.1 kt → 278 kt).
</DiagramFigure>

<SourceNote label="Sources" :ids="['bernreuter']" />

*Between 1995 and 2014, the annual polysilicon demand increased by a factor of 18.4; the ratio between the shares of semiconductors and photovoltaics reversed completely* — chart sources: PV News, Sage Concepts and Bernreuter Research <Cite id="bernreuter" />.

<DiagramFigure src="/pdf-images/p05-2.png" alt="Historical polysilicon price, 1977–2017">
Shortage and oversupply cycles.
</DiagramFigure>

<SourceNote label="Sources" :ids="['bernreuter']" />

That growth during the 2000s made the number of plants jump from **11** (2004) to **61** (2010). The resulting global oversupply caused more than **40 plants** to close in China alone over the following three years <Cite id="bernreuter" />.

From that point on, China consolidated its market leadership by investing heavily in refining technology and in subsidies to lower production costs <Cite id="bernreuter" />.

<SeeAlso title="See also" :links="[
  { text: 'Timeline', href: '/en/linha-do-tempo', note: 'milestones of the polysilicon market' },
  { text: 'Wafer fabrication', href: '/en/fabricacao-wafers', note: 'EG-Si → CZ ingot' },
  { text: 'Mining & MG-Si', href: '/en/mineracao-mg-si', note: 'the arc furnace before purification' },
  { text: 'References', href: '/en/referencias#ref-3', note: 'Bernreuter Research' },
]" />
