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

### Two routes out of the same MG-Si

It is worth fixing the map before the details, because there is more than one way out of MG-Si — and the difference between them is whether or not chlorine is involved <Cite id="saimm" />:

```mermaid
flowchart TD
    Q["Quartz"] --> CR["Carbothermal reduction<br/>about 2000 °C"]
    CR --> MG["MG-Si<br/>98.5 to 99.5 % Si"]

    MG --> CQ["Chemical route<br/>chlorination and distillation"]
    MG --> PM["Metallurgical route<br/>chlorine-free refining"]

    CQ --> PS["Polysilicon"]
    PM --> SG["Solar grade (UMG)"]

    PS --> LF["Ingot and slicing"]
    SG --> LF
    LF --> WA["Mono or multicrystalline wafers"]
    WA --> CEL["Crystalline silicon solar cells"]
```

This page follows the **chemical route**, which dominates the market and is the only one that reaches electronic grade. The **metallurgical route** — which produces upgraded metallurgical-grade (UMG) solar silicon without touching chlorine — is covered further down.

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

The reaction runs in the **300 to 600 °C** range, under **0.18 to 0.5 MPa** of pressure — compressing the bed raises the TCS fraction in the outgoing gas, with an experimental optimum near **0.4 MPa** <Cite id="jarkin-2021" />. The number the industry chases is the **hydrogen chloride conversion**: in the newest Wacker reactors it approaches **100%**, and TCS selectivity passes **95%** with extra bed loading (*turbo loading*) <Cite id="jarkin-2021" />.

What leaves the reactor, however, is not pure TCS. It comes out mixed with **silicon tetrachloride** (SiCl₄, or STC), **dichlorosilane** (H₂SiCl₂) and high-boiling compounds with Si–Si bonds, among them **hexachlorodisilane** (Si₂Cl₆) <Cite id="jarkin-2021" /> <Cite id="wikipedia-tcs" />. Each has its own boiling point — which is precisely what the distillation just downstream exploits to separate them.

There is a second route to TCS that skips the HCl and recycles the STC itself <Cite id="wikipedia-tcs" />:

```text
Si + 3SiCl₄ + 2H₂ → 4SiHCl₃
```

Both routes coexist in industry, and choosing between them is a plant-design decision, not a bench-top one. Converting STC yields purer TCS; hydrochlorination is the more economical of the two <Cite id="jarkin-2021" />. Measured per kilogram of SiHCl₃ produced, the two ways of recovering STC compare like this <Cite id="jarkin-2021" />:

| Parameter | Hydrochlorination (Si + SiCl₄ + H₂) | STC conversion (SiCl₄ + H₂) |
| --- | --- | --- |
| Reaction temperature | 400–600 °C | 1200–1300 °C |
| Conversion rate | 23–28% | 17–22% |
| Energy per kg of SiHCl₃ | 0.4–0.7 kWh | 2.0–3.5 kWh |
| Continuous run | 150–330 days | ~120 days |

Which is why large plants rarely pick just one: above 10,000 t/y the usual route is the **hybrid method**, combining direct-synthesis reactors with hydrochlorination reactors <Cite id="jarkin-2021" />.

With a boiling point of just **31.8 °C**, TCS leaves the reactor already as a gas <Cite id="ratedpower" /> <Cite id="wikipedia-tcs" />. At the top of the reactor a filter separates the gaseous TCS from the residual hydrogen and HCl <Cite id="pv-mfg-polysilicon" />, and the gas goes on to **fractional distillation**, where the difference in volatility between TCS and the chlorides of boron, phosphorus and metals performs the separation with very high precision <Cite id="ratedpower" />. It is here, and not before, that silicon becomes genuinely pure.

## Processes for obtaining solid polysilicon

The purified TCS gas is converted back into solid, ultra-pure metallic silicon by two main methods.

### Siemens process (CVD)

Created in the 1950s by Siemens and Wacker, it is the dominant method worldwide <Cite id="bernreuter-production" />. TCS gas is injected together with hydrogen (H₂) into a steel bell-jar reactor where **graphite electrodes** pass current through a **U-shaped silicon core** — the seed <Cite id="pv-mfg-polysilicon" />. That core is electrically heated to about **1100–1150 °C** <Cite id="bernreuter-production" />, and the TCS undergoes **hydrogen reduction**, in a mechanism equivalent to a **CVD** (*chemical vapour deposition*) process: solid silicon deposits on the seed and grows around it, releasing gaseous HCl <Cite id="pv-mfg-polysilicon" />.

<DiagramFigure src="/assets/siemens-reactor.svg" alt="Cross-section of the Siemens bell-jar reactor: on the left, the steel bell jar with two incandescent U-shaped silicon filaments on graphite electrodes, TCS and hydrogen entering at the base and spent gas leaving at the top; on the right, a magnified view of the rod surface showing silicon depositing onto it">
The Siemens reactor in cross-section. On the left, the closed steel bell jar: graphite electrodes pass through the base and heat the U-shaped silicon filaments by Joule effect, so that they glow at 1100–1150 °C while the TCS and hydrogen rise between them. On the right, a magnified view of the rod surface: hydrogen reduction of TCS deposits silicon onto the filament, which thickens until it becomes a rod. Author's drawing, after Bernreuter Research and PV-Manufacturing.org <Cite id="bernreuter-production" /> <Cite id="pv-mfg-polysilicon" />.
</DiagramFigure>

The deposition reaction is exactly the **reverse** of the chlorination that produced the TCS a few steps earlier <Cite id="saimm" />:

```text
SiHCl₃ + H₂ → Si + 3HCl
```

When the process ends, the **steel bell jar is lifted off** and the assembly — U-shaped core plus deposited silicon — is removed whole and fractured into smaller chunks <Cite id="bernreuter-production" />. The rods reach **15 to 20 cm in diameter** <Cite id="bernreuter-production" /> and the material comes out at **9N** purity or better, ready to be graded <Cite id="pv-mfg-polysilicon" />.

It is an extremely energy-intensive process — **above 100 kWh per kilogram** of deposited silicon, with a low yield — which is the main drawback of the method <Cite id="saimm" />. Even so, it outlived everything set against it: in **1985** a single survey listed **17 alternative routes** to the Siemens process, and almost all of them died on the way <Cite id="bernreuter-production" />. The process's share of the global market **has dropped below 90% only once since 2004** — in 2008, at the peak of the shortage <Cite id="bernreuter-production" />. What changed was not the chemistry but who runs the reactor: Chinese plants, with cheap electricity and equipment from domestic suppliers, brought the **production cost** down to **below US$ 10 per kilogram** <Cite id="bernreuter-production" />.

Purity classes <Cite id="bernreuter-production" />:

- **Solar grade for multicrystalline** (*multi grade*): 7N (99.99999%) to 8N — multicrystalline cells;
- **Solar grade for monocrystalline** (*mono grade*): 9N to 10N — monocrystalline cells;
- **Electronic grade (EG-Si)**: 10N to 11N — semiconductors.

### Fluidized bed reactor (FBR)

<DiagramFigure src="/assets/fbr-reactor.svg" alt="Cross-section of the fluidized bed reactor: silicon seeds fall in from the top, silane gas injected at the base keeps the particles suspended, wall heaters hold 650 to 700 °C, and the granules grow until they are withdrawn continuously from the bottom">
The fluidized bed reactor in cross-section. Seeds enter from above and sink; the silane injected at the base rises and keeps the particles suspended, so every grain is surrounded by fresh gas at all times. Wall heaters hold 650–700 °C, and silicon accumulates on the seeds — which thicken as they descend — until the granules are withdrawn continuously from the bottom. Author's drawing, after Bernreuter Research <Cite id="bernreuter-production" />.
</DiagramFigure>

A continuous-flow method in which silicon seed particles are kept suspended by a carrier gas containing monosilane (SiH₄) or TCS <Cite id="bernreuter-production" />. The gas decomposes at much lower temperatures — **650–700 °C** for monosilane — accumulating silicon on the seeds until granules form and are continuously harvested, with none of the rod-fracturing step. It consumes roughly **90% less electricity** than the Siemens process, produces more silicon per unit of reactor volume and delivers the product in a directly usable form, although it also produces an unwanted fraction of silicon dust <Cite id="bernreuter-production" /> <Cite id="saimm" />.

There is a chemistry difference within the FBR family itself. REC Silicon feeds its reactors with **monosilane (SiH₄)**, which decomposes at **650–700 °C**; Wacker's smaller unit works with **TCS**, which only reacts at around **1000 °C** <Cite id="bernreuter-production" />. A lower temperature means less energy — and that is where the claim of consuming **one tenth** of the electricity of a conventional rod reactor comes from <Cite id="bernreuter-production" />.

The gain is not only energetic. Mixing FBR granules with Siemens chunks in a **50:50** ratio can **shorten the time to fill a melting crucible by 40%** and **increase the charge weight by 30%** <Cite id="bernreuter-production" /> — granules flow and pack the crucible better than irregular chunks do.

The technology predates the shortage: MEMC Electronic Materials was already producing granules in Pasadena, Texas <Cite id="bernreuter-production" />. Few companies managed to scale it, however. REC Silicon ran a plant at **Moses Lake, Washington (2009)** and another at **Yulin, Shaanxi (2017)**, the latter in a joint venture with Shaanxi Non-Ferrous Tianhong New Energy <Cite id="bernreuter-production" />. Four obstacles explain the limited penetration <Cite id="bernreuter-production" />:

- the technology is protected by **many patents**;
- the **fluid dynamics** are complex and take time, experience and capital to scale from lab to pilot to industrial size;
- a **liner** is needed so the wall material does not contaminate the granules — which drives up the reactor cost;
- and the electricity advantage can be **eaten up by the fraction of silicon dust** that never becomes product.

Even so, the two processes operate at very different scales: in 2008 the Siemens process accounted for about **78%** of the polysilicon produced worldwide and the fluidized bed for just **16%** <Cite id="saimm" />.

### The chlorine loop: what is actually consumed

Reading the two reactions side by side reveals the trick that closes the chemical route. Chlorination consumes HCl and produces TCS; deposition consumes TCS and gives HCl back:

```text
Si + 3HCl → SiHCl₃ + H₂        (chlorination)
SiHCl₃ + H₂ → Si + 3HCl        (deposition)
```

The HCl leaving the deposition reactor is **not waste**: it is the very reagent that feeds the chlorination reactor. Adding the two equations together, the HCl cancels out on both sides and only the transformation that matters remains — **raw silicon goes in, pure silicon comes out** <Cite id="wikipedia-tcs" />.

<DiagramFigure src="/assets/chlorine-loop.svg" alt="Diagram of the four-step chlorine loop: chlorination of raw silicon with HCl, distillation of the TCS, deposition returning solid silicon and HCl, and recycling of the silicon tetrachloride back into TCS; arrows show the HCl and SiCl4 returning to the start">
The chlorine loop. Raw silicon enters at step 1 and polysilicon leaves at step 3 — those are the only two open ends of the system. Everything else circulates: the HCl released during deposition goes back to chlorination, and the silicon tetrachloride separated in distillation is converted back into TCS rather than discarded. Author's drawing, after Wikipedia (trichlorosilane) and Jarkin et al. <Cite id="wikipedia-tcs" /> <Cite id="jarkin-2021" />.
</DiagramFigure>

The same applies to the most awkward byproduct of chlorination, **silicon tetrachloride** (SiCl₄). Instead of leaving as a chlorinated effluent, it returns to the process through **hydrochlorination**, together with hydrogen and more raw silicon <Cite id="wikipedia-tcs" /> <Cite id="jarkin-2021" />.

And the volumes are not small. For every kilogram of polysilicon produced, the direct-synthesis stage generates **2 to 5 kg** of SiCl₄, and the deposition stage another **11 to 14 kg** <Cite id="jarkin-2021" />. Without recycling, a plant would be a polysilicon factory and a tetrachloride factory at the same time, the latter at a ratio of ten to one. That is why a polysilicon plant is judged by the **energy** it consumes rather than by the raw material it throws away: the chlorine circulates, and what the system loses as waste is far less than the reactor equation suggests.

<VideoPressEmbed id="ZlxguS11" title="Animation of the polysilicon production route" />

<SourceNote label="Sources" :ids="['pv-mfg-polysilicon', 'bernreuter-production', 'ratedpower', 'csiro', 'saimm']" />

*Animation and route schematic: [PV-Manufacturing.org](https://pv-manufacturing.org/silicon-production/polysilicon-production/) — the flow chart above was redrawn from that page's diagram and from its description of the reactions* <Cite id="pv-mfg-polysilicon" />.

### The limits of the chemical route

The chemical route dominates, but it has bills to pay. The most cited is **energy**: chlorination, distillation and Siemens add up to an intensive process. The other is safety and environment — it **handles toxic and corrosive compounds** throughout, such as chlorosilanes and hydrochloric acid <Cite id="saimm" />.

TCS illustrates the problem well. It is a **colourless, volatile liquid** — density 1.34 g/cm³, melting point −126.5 °C, boiling at 31.8 °C — that **reacts violently with water**, including plain humidity, releasing hydrochloric acid and heat. Its flammable range in air runs from **1.2% to 90.5% by volume**, and it auto-ignites at just **185 °C** <Cite id="icsc-tcs" />. With a flash point of **−27 °C**, the liquid already gives off flammable vapour at room temperature, and that vapour is **4.7 times denser than air** — so it collects at floor level <Cite id="icsc-tcs" />. This is why TCS must be stored and handled under **inert gas**, and why the international safety card's firefighting instructions explicitly say **do not use water** <Cite id="icsc-tcs" />.

In **2006** the solar industry **overtook the semiconductor industry** as the largest consumer of polysilicon <Cite id="saimm" />. In 2008 world production was approximately **75,000 tonnes**, of which **45,000** went to photovoltaics <Cite id="saimm" />.

## The metallurgical route (UMG)

Not all solar silicon has to go through chlorine. The **metallurgical route** starts from MG-Si itself and refines it through a sequence of metallurgical steps, producing **metallurgical-route solar-grade silicon** — *upgraded metallurgical-grade silicon* (UMG). Its energy consumption is markedly lower than that of the Siemens process <Cite id="saimm" />.

The principle behind it is **segregation**: most metallic elements have a low segregation coefficient in silicon, meaning the solid **rejects the impurity into the liquid** as it crystallises. Two central techniques follow from that — **directional solidification** and **acid leaching** <Cite id="saimm" />. Directional solidification comes with a bonus: it doubles as the **ingot casting** step, mono- or multicrystalline, that later becomes wafers <Cite id="saimm" />.

The problem is that this principle does not hold for everyone. **Boron, carbon, oxygen and phosphorus have high segregation coefficients** and are not pushed out by crystal growth <Cite id="saimm" />. Each needs its own attack:

- **Phosphorus:** it is volatile, so it leaves through **vacuum refining** <Cite id="saimm" />.
- **Boron:** it only leaves through **slag refining** or **plasma refining** — which also remove carbon and oxygen <Cite id="saimm" />.

Because each technique is good at one target and weak at the others, the industry chains **combinations** of steps together <Cite id="saimm" />. Another precaution is to start from already-clean feedstock — purified quartz, carbon black and high-purity electrodes — so as not to introduce new impurities into the product <Cite id="saimm" />.

The route has the potential to become dominant, but in 2008 it accounted for **less than 8%** of solar silicon production <Cite id="saimm" />. The reason is simple: it does not reach electronic grade, so it cannot replace the chemical route for semiconductors.

### An industrial case: Elkem's silicon blocks in Kristiansand

The metallurgical route is not just an academic review exercise. Between **2009 and 2023**, a plant in Kristiansand, in southern Norway, operated at industrial scale what was probably the most successful attempt to produce solar-grade silicon without going through chlorine <Cite id="elkem-solar-route" />.

Elkem had been studying metallurgical routes since the late 1970s and reached the industrialised concept in **2009**. It chains **five stages**, of which **three are purification** <Cite id="elkem-solar-route" /> <Cite id="elkem-lca" />:

1. **Carbothermal reduction** of quartz in an electric arc furnace — the same stage that produces the MG-Si described in the mining chapter;
2. **Slag treatment** at high temperature;
3. **Wet-chemical leaching**, at low temperature;
4. **Directional solidification**, which segregates the residual contaminants;
5. **Post-treatment**, with cleaning and cutting into blocks.

The essential difference from the Siemens process is that **the silicon never passes through a vaporised phase** — there is no distillation of a gas, only successive metallurgy <Cite id="elkem-solar-route" />.

<DiagramFigure src="/assets/elkem-solar-kristiansand.jpg" alt="Exterior view of the Elkem Solar solar-grade silicon plant in Kristiansand, Norway">
The Kristiansand plant (Fiskå), where Elkem industrialised its metallurgical route in 2009. Production began at **5,000 t/year**, rose to **6,000 t/year** in 2011 and had a projected capacity of **~7,500 t/year** <Cite id="elkem-solar-route" />. Bjoertvedt — <a href="https://commons.wikimedia.org/wiki/File:Elkem_Solar_01.JPG" target="_blank" rel="noopener noreferrer">Elkem Solar</a> (CC BY-SA 3.0), Wikimedia Commons.
</DiagramFigure>

The energy gain is the core of the argument. The plant produced silicon with about **70% less energy** than the reference Siemens route, and CO₂-equivalent emissions were between **10 and 30%** of those of the Siemens process — **11 g against 40–150 g of CO₂-eq per kg**, depending on the route and plant location <Cite id="elkem-solar-route" />. The energy payback time of a solar module made from that material was **under one year** <Cite id="elkem-solar-route" />.

Purification evolved too. In the 1980s the product carried nearly **4 ppmw of boron and phosphorus**; typical values reached **0.22 ppmw boron and 0.62 ppmw phosphorus** <Cite id="elkem-solar-route" />. That brought the material — sold under the **ESS™** brand — into **group IV** of the **SEMI PV17-0611** standard, which classifies precisely the qualities of solar-grade silicon <Cite id="elkem-solar-route" />.

In the cell, the practical result was parity with conventional polysilicon: efficiencies of **16.5–17%** in multicrystalline cells and **18–18.5%** in monocrystalline ones, even in blends of 40 to 80% ESS with virgin polysilicon <Cite id="elkem-solar-route" />. The route could also **recycle ingot cuts** (*carbide cuts*) that the solar industry normally discards <Cite id="elkem-solar-route" />.

#### What the product looks like: blocks, not rods

Anyone who visits a Siemens plant sees **rods** of silicon coming out of the reactor. The metallurgical route delivers something else: **blocks**. The product left Norway on **pallets of 24 bricks**, each weighing **10–18 kg** and typically measuring **14–15 cm wide by 15–17 cm high and 27–28 cm long** — pallets of **300–350 kg** <Cite id="rec-solar-epd" />. Those bricks went on to be melted and re-crystallised into mono- or multicrystalline ingots.

The operation had two sites: **Fiskå, in Kristiansand**, produced the solar-grade silicon — around **7,300 tonnes per year** in 2018 — and **Herøya, in Porsgrunn**, turned the material into ingots and blocks for export, mainly to REC's plant in Singapore <Cite id="rec-solar-epd" /> <Cite id="snl-rec" />.

<DiagramFigure src="/assets/heroyha-industripark.jpg" alt="Herøya industrial park in Porsgrunn, Norway">
The **Herøya** industrial park in Porsgrunn, where the Kristiansand silicon was melted into ingots and cut into blocks before heading to Singapore <Cite id="rec-solar-epd" />. Bitjungle — <a href="https://commons.wikimedia.org/wiki/File:Her%C3%B8ya_Industripark.JPG" target="_blank" rel="noopener noreferrer">Herøya Industripark</a> (CC BY-SA 4.0), Wikimedia Commons.
</DiagramFigure>

#### The end of the Norwegian line

The arc ends bitterly. In **November 2023** REC closed polysilicon production in Kristiansand and Porsgrunn, citing **high electricity prices** and accumulated losses of **NOK 335 million** (about **US$ 31 million**); the closure affected around **250 workers** <Cite id="rec-closure-2023" />. In **January 2024** Elkem bought the facilities for **US$ 22 million**, with no plans to revive the previous business model <Cite id="elkem-buys-rec" />.

It is worth being precise about why. The metallurgical route **did not lose on quality** — the cells proved electrical parity with Siemens polysilicon. It lost on economics: the route's cost is dominated by **electricity**, which in Norway spiked with the European energy crisis, while the global polysilicon price collapsed under oversupply. An input rising against a falling selling price is the worst possible setup.

<SourceNote :ids="['elkem-solar-route', 'elkem-lca', 'rec-solar-epd', 'snl-rec', 'rec-closure-2023', 'elkem-buys-rec']" />

## How much purity is actually needed?

The purity classes mentioned above become far more concrete when you look at the numbers. Table I of the Xakalashe and Tangstad review compares the typical chemical analyses of the four products in the chain <Cite id="saimm" />:

| Element | MG-Si (ppm) | Solar grade (ppm) | Polycrystalline solar grade | Electronic grade (ppm) |
| --- | --- | --- | --- | --- |
| **Si** (mass fraction) | 99 % | 99.9999 % | 99.99999 % | 99.999999999 % |
| Fe | 2,000–3,000 | < 0.3 | — | < 0.01 |
| Al | 1,500–4,000 | < 0.1 | — | < 0.0008 |
| Ca | 500–600 | < 0.1 | — | < 0.003 |
| B | 40–80 | < 0.3 | — | < 0.0002 |
| P | 20–50 | < 0.1 | — | < 0.0008 |
| C | 600 | < 3 | — | < 0.5 |
| O | 3,000 | < 10 | — | — |
| Ti | 160–200 | < 0.01 | — | < 0.003 |
| Cr | 50–200 | < 0.1 | — | — |

Reading the table explains why chemical purification exists at all. Iron, the dominant impurity in MG-Si, drops from thousands of ppm to **below 0.01 ppm** at electronic grade; boron, which MG-Si carries in the tens of ppm, has to reach **below 0.0002 ppm** — a fall of more than five orders of magnitude. No metallurgy achieves that; only the distillation of a gas does <Cite id="saimm" />.

Note also that the polycrystalline solar grade column lists **only the silicon content**. That is not an omission: solar grade has **no formal specification**, and what gets published are acceptable impurity concentrations, used as a guideline rather than a standard <Cite id="saimm" />.

## Market dynamics and history

### The pork cycle

Polysilicon prices do not swing by accident. Between **1981 and 2004**, the long-term contract price alternated between peak and trough at a **remarkably regular interval of seven to eight years** <Cite id="bernreuter-market" />. The pattern has a name — the *pork cycle* — and the cause is always the same: **the delay between signal and response**.

<DiagramFigure src="/assets/polysilicon-pork-cycle.svg" alt="Diagram of the four-step price cycle — shortage, investment, the two-to-three-year delay before the plants start up, and oversupply — with a return arrow showing that investment stops and the shortage comes back; below it, a line chart of the price showing the peak at which the decision to build is taken and, two to three years later, the trough into which the capacity comes online">
Why the price cycles. The price signal is truthful, but the response arrives late: a polysilicon plant takes two to three years from engineering through construction to ramp-up. By the time the capacity actually starts up, the market that justified it no longer exists. Author's drawing, after Bernreuter Research <Cite id="bernreuter-market" /> <Cite id="bernreuter-pork-cycle" />.
</DiagramFigure>

The industry is, in Bernreuter Research's own words, **a supertanker with a long braking distance**: by the time a falling price signals that investment should stop, construction is already under way and cannot be halted without considerable loss. The result is overcapacity, which accelerates the fall. And because nobody invests while the price is falling, supply only reacts once the price rises again — too late <Cite id="bernreuter-market" />.

Before 2004, demand was dominated by the semiconductor industry, with its own cycles. The photovoltaic boom **halved the cycle**: the interval between trough and peak fell from eight to **four years** <Cite id="bernreuter-market" />. Afterwards, low-cost Chinese expansion practically **invalidated the cycle**, producing a sustained tendency to oversupply interrupted only by brief phases of shortage <Cite id="bernreuter-market" />. The cycle only returned once the slowdown in Chinese installations and the closure of more than a dozen manufacturers in 2018–2019 were followed by a rapid demand recovery in the second half of 2020 <Cite id="bernreuter-pork-cycle" />.

The recent extremes show the scale of the movement: in **June 2020** the spot price hit its historical low of **US$ 6.75/kg**; by **August 2022** it stood at **US$ 39/kg** — the entire climb in about two years, followed by another wave of projects and, by the consultancy's own account, another inevitable shakeout <Cite id="bernreuter-pork-cycle" />.

### The demand inversion

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

That growth during the 2000s made the number of plants jump from **11** (2004) to **61** (2010) — projects sprang up everywhere, including outside China, and dozens failed <Cite id="bernreuter-market" />. The oversupply closed **more than 40 plants** between late 2010 and early 2013, most of them in China — which had already lost **36 small and medium-scale units** in 2011/2012 <Cite id="bernreuter-market" />.

### The Chinese ascent

In 2004 China produced practically no polysilicon. By **2018** it held **55%** of global volume; by **2023**, **more than 90%** <Cite id="bernreuter-market" />. The path ran through tariffs. In **July 2013** the Chinese Ministry of Commerce (Mofcom) imposed duties on imports from the **United States and South Korea**, and several idle plants resumed production. The rates for the two main South Korean suppliers came in **below 3%** — hardly dissuasive — while US producers were hit with rates of up to **57%**, circumvented for a time through the *processing trade* loophole and closed in August 2014 <Cite id="bernreuter-market" />.

The expansion changed the nature of the market through three simultaneous forces:

- **Energy cost.** The new plants clustered in the autonomous regions of **Xinjiang and Inner Mongolia**, where electricity is very cheap — the decisive input for a process as intensive as the Siemens one. The environmental counterpart is that this electricity comes mostly from **coal-fired power stations**, so the polysilicon produced carries a large carbon footprint <Cite id="bernreuter-market" />.
- **A deliberate price war.** In 2018 the then-CEO of Daqo New Energy, Longgen Zhang, was explicit about the strategy: of the **300,000 tonnes** of Chinese capacity in 2017, roughly **100,000** were low-cost, and the other **200,000** "will be wiped out" to make room for the new capacity <Cite id="bernreuter-market" />.
- **Falling specific consumption.** The amount of silicon per installed watt dropped so far that the polysilicon consumed for each new gigawatt in **2023 was a quarter** of what it took in 2006. Contributors included the reduction of **wafer thickness**, the switch from slurry wire saws to **diamond wire saws** (less kerf loss), rising cell efficiency, the shift to **n-type monocrystalline cells**, and half-cut cells and other cell-to-module improvements <Cite id="bernreuter-market" />.

The shift to monocrystalline was not purely technical. In **2015** China's National Energy Administration launched the **Top Runner** programme, whose minimum efficiency thresholds **favoured monocrystalline over multicrystalline** — and that provided the push Longi and Zhonghuan needed to scale up <Cite id="bernreuter-market" />. Because monocrystalline cells, especially n-type, require purer feedstock, the programme also favoured China's higher-quality polysilicon plants — and kept a niche open for foreign suppliers such as Wacker and OCI <Cite id="bernreuter-market" />.

In the end the map turned geopolitical. Outside China, the last major project was **Wacker's plant in Tennessee (USA)**, opened in 2016 but decided back in 2010, before US anti-dumping duties existed <Cite id="bernreuter-market" />. And the **Uyghur Forced Labor Prevention Act** created a **separate, higher-priced segment** for non-Chinese polysilicon, reopening the conversation about capacity outside the country <Cite id="bernreuter-market" />.

### A note on the present

**2025** brought an attempted price recovery. The consultancy TrendForce projected polysilicon at **CNY 45/kg** for the second quarter, with modules at **CNY 0.70/W** and TOPCon cells rising about **1.7%** month on month <Cite id="trendforce-2025" />. The rise came from an artificial installation rush in China ahead of a regulatory change, not from structural demand — TrendForce itself already expected the reversal in the third quarter <Cite id="trendforce-2025" />. It is this kind of short cycle, against abundant installed capacity — and in a market where more than 90% of supply comes from a single country — that helps explain why European plants competitive on quality, such as the one in Kristiansand described above, could not sustain themselves.

<SourceNote label="Sources" :ids="['trendforce-2025', 'bernreuter', 'bernreuter-market', 'bernreuter-pork-cycle']" />

<SeeAlso title="See also" :links="[
  { text: 'Timeline', href: '/en/linha-do-tempo', note: 'milestones of the polysilicon market' },
  { text: 'Wafer fabrication', href: '/en/fabricacao-wafers', note: 'EG-Si → CZ ingot' },
  { text: 'Mining & MG-Si', href: '/en/mineracao-mg-si', note: 'the arc furnace before purification' },
  { text: 'References', href: '/en/referencias#ref-3', note: 'Bernreuter Research' },
]" />
