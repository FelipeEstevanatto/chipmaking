---
title: Polysilicon
description: Chemical purification via TCS, the Siemens and FBR processes, and the history of the polysilicon market.
---

# Chemical purification and polysilicon

Metallurgical-grade silicon ([MG-Si](/en/glossario)) contains metallic and dopant impurities that severely affect the performance of semiconductors and solar panels <Cite id="energy-central" />. To reach **polysilicon** grade (polycrystalline silicon of very high purity), it must be chemically refined <Cite id="csiro" />.

## Conversion to trichlorosilane (TCS)

Crushed MG-Si is injected into a fluidized bed reactor where it reacts with anhydrous hydrochloric acid (HCl) under high pressure, producing **trichlorosilane** gas (TCS, SiHCl₃) and hydrogen (H₂) <Cite id="pv-education" />:

```text
Si + 3HCl → SiHCl₃ + H₂
```

With a low boiling point of just **31.8 °C**, the gaseous TCS is purified through successive fractional distillation steps <Cite id="ratedpower" />, removing metal chlorides, boron and phosphorus with high precision.

## Processes for obtaining solid polysilicon

The purified TCS gas is converted back into solid, ultra-pure metallic silicon by two main methods:

### 1. Siemens process (CVD)

Created in the 1950s by Siemens and Wacker, it is the dominant method worldwide <Cite id="bernreuter" />. TCS gas is injected together with hydrogen (H₂) into a steel bell-jar reactor where U-shaped silicon filaments are electrically heated to about **1100–1150 °C** <Cite id="bernreuter" />. Silicon deposits thermally on the filaments until solid rods 15 to 20 cm in diameter are formed <Cite id="ratedpower" />. It is an extremely energy-intensive process. The rods are harvested and fractured into chunks for use.

Purity classes:

- **Solar grade (SoG-Si):** 7N (99.99999%) to 9N — photovoltaic cells <Cite id="ratedpower" />.
- **Electronic grade (EG-Si):** 10N to 11N — semiconductors <Cite id="ratedpower" />.

### 2. Fluidized bed reactor (FBR)

A continuous-flow method in which silicon seed particles are kept suspended by a carrier gas containing monosilane (SiH₄) or TCS <Cite id="bernreuter" />. The gas decomposes at lower temperatures (650–700 °C for monosilane), accumulating silicon on the seeds until granules form and are continuously harvested. It consumes roughly **90% less electricity** than the Siemens process, although it produces an unwanted fraction of silicon dust <Cite id="bernreuter" />.

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
  { text: 'References', href: '/en/referencias#ref-3', note: 'Bernreuter Research' },
]" />
