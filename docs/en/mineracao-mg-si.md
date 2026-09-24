---
title: Mining & MG-Si
description: HPQ quartz, the submerged-arc furnace, carbothermal reduction and metallurgical-grade silicon (MG-Si).
dataAsOf: 2025
---

# Quartz mining and metallurgical silicon production

## Quartz mining (HPQ)

The first step in the silicon chain is obtaining **High-Purity Quartz (HPQ)**, extracted from deposits of quartzite or mineral quartz, which is extremely abundant in the Earth's crust <Cite id="pv-education" />. Silicon is the **second most abundant element** in the crust, behind oxygen only, and occurs as near-pure silica or as silicates; the resources are, in practice, **unlimited** — although purity varies considerably from deposit to deposit <Cite id="saimm" />. In the 1970s this mining was highly selective, focusing on pegmatites in regions such as Brazil and Madagascar to ensure the samples were free of critical impurities like iron and boron <Cite id="sciencedirect-hpq" />. Today, large-scale extraction is concentrated in a handful of exceptional deposits: the subsequent physical and chemical purification can only start from material that was already good <Cite id="sciencedirect-hpq" />.

Quartz enters the chain along **two distinct paths**, and it is worth separating them from the outset: it is the **raw material** for silicon (reduced to MG-Si, as we shall see next) and it is also the material of the **crucible** that holds the melt during crystal growth. The first use tolerates impurities that the chemistry downstream removes; the second does not.

### Spruce Pine: where the quartz is pure enough

Not every silica will do for a crucible. The quartz must be free of **boron** and of alkali metals down to the **parts-per-billion** level, and deposits like that are exceedingly rare: roughly **70% to 90% of the world's high-purity quartz** comes from a single region — the pegmatites of **Spruce Pine**, in the Appalachian mountains of North Carolina <Cite id="sibelco-hpq" />.

Two companies mine there <Cite id="sibelco-hpq" /> <Cite id="quartzcorp-hpq" />:

| Company | Mining | Note |
| --- | --- | --- |
| **Sibelco** (IOTA® line) | Spruce Pine, USA | successor to the historic **Unimin** |
| **The Quartz Corp** | Spruce Pine + Drag (Norway) | 50/50 *joint venture* of Imerys and Norsk Mineral, since 2011 |

Unimin merged with Fairmount Santrol in 2018, and the resulting company took the name **Covia**. The **high-purity quartz business did not go with it**. It was carved out to the Belgian parent **Sibelco** before the merger, and Sibelco still operates Spruce Pine and sells the IOTA® line <Cite id="sibelco-hpq" />. Treating "Unimin became Covia" as the whole story leaves the impression that Spruce Pine changed hands. It stayed with Sibelco.

### Drag, Norway: where the quartz is purified

The other hub sits above the Arctic Circle. In **Drag**, in the municipality of Hamarøy (Nordland), **Norwegian Crystallites AS** was founded in 1996 by Norsk Mineral to produce ultra-high-purity quartz <Cite id="quartzcorp-hpq" />. In 2011 it and the quartz assets of France's Imerys merged to form **The Quartz Corp**, and the Drag plant became the final purification point on the route <Cite id="quartzcorp-hpq" />.

Part of the ore comes from the region's own dozens of pegmatite bodies; most of it, however, crosses the Atlantic from Spruce Pine. Purification is a sequence of steps <Cite id="quartzcorp-hpq" />:

1. **flotation** — removes feldspar and mica;
2. **magnetic separation** — removes ferrous contaminants;
3. **acid leaching** — attacks remaining surface inclusions and impurities;
4. **calcination** — eliminates residual organic contaminants.

The finished product reaches **99.999% SiO₂** <Cite id="quartzcorp-hpq" />.

### Why boron decides

Because the quartz becomes the **crucible** in which the silicon is melted, it sits in direct contact with the melt at over 1400 °C. Any impurity present in the quartz therefore has a clear path into the crystal that is growing.

**Boron** is the critical case, because it is the dopant that sets the resistivity of p-type silicon. A fraction of **1 ppm** is already enough to collapse the crystal's resistivity, and resistivity is what sets the finished wafer's electrical behaviour <Cite id="sibelco-hpq" />. CZ crucibles therefore require **boron below 0.04 ppm**, or 40 parts per billion <Cite id="sibelco-hpq" />. Alkali metals (**K, Li, Na**) are the other limit: they lower the crucible's softening point and reduce its resistance to deformation, shortening the component's life and hurting crystal yield <Cite id="sibelco-hpq" />.

The most demanding grade in the IOTA® line reaches **99.9992% SiO₂**, with K + Li + Na totalling **80 ppb** and critical transition metals below 50 ppb <Cite id="sibelco-hpq" />. It is a niche material: what sustains the industry's volume sits a few digits below, and The Quartz Corp works at **99.999%** silica <Cite id="quartzcorp-hpq" />.

## Carbothermal reduction (MG-Si)

To extract metallic silicon from quartz (silicon dioxide, SiO₂), the mineral undergoes **carbothermal reduction** <Cite id="elkem" />. This process takes place in submerged electric arc furnaces at temperatures of approximately 2000 °C, consuming high levels of energy <Cite id="csiro" />.

Quartz is mixed with carbon-rich reducing agents (charcoal, coke, coal and wood chips) <Cite id="saimm" />. The simplified overall reaction is:

```text
SiO₂ (s) + 2C (s) → Si (l) + 2CO (g)
```

Inside the furnace, the real reaction happens in distinct thermal stages <Cite id="pv-education" />:

1. **Upper region** (lower temperatures, ~1600 °C): the quartz reacts with carbon to form silicon carbide (SiC):

   ```text
   SiO₂ + 3C → SiC + 2CO (g)
   ```

2. **Lower region** (higher temperatures, >1780 °C): the silicon carbide descends and reacts with the remaining quartz to produce pure metallic silicon and gaseous carbon monoxide:

   ```text
   SiO₂ + 2SiC → 3Si + 2CO (g)
   ```

A third reaction closes the furnace's loop <Cite id="pv-mfg-polysilicon" />:

```text
2SiO₂ + SiC → 3SiO (g) + CO (g)
```

The **silicon monoxide** (SiO) and the CO rise through the cooler zones of the charge and recombine, regenerating SiO₂ and carbon that feed the top of the furnace again. That is why the furnace is practically **self-sufficient in reactants**: it is a major consumer of electricity, but it wastes very little raw material <Cite id="pv-mfg-polysilicon" />.

### The submerged-arc furnace

<DiagramFigure src="/assets/submerged-arc-furnace.svg" alt="Cross-section of a submerged electric arc furnace: three carbon electrodes in the charge, a solid outer reaction zone above a molten inner reaction zone, off-gas collected as condensed silica fume, and silicon tapped from the bottom">
Cross-section of a submerged-arc furnace: the two reaction zones, the three three-phase electrodes, the off-gas take-off and the tapping at the bottom.
</DiagramFigure>

The furnace is a shell roughly **10 m in diameter**, pierced by **three pre-baked carbon electrodes** submerged in the charge. They carry a **three-phase current** and take the material to about 2000 °C <Cite id="saimm" />.

A layer of solid material (the **outer reaction zone**) is kept on top of the molten bath (the **inner reaction zone**) to **raise the silicon yield**. That interface is where the SiO that forms can react again before it leaves with the gas <Cite id="saimm" />.

The silicon is then **tapped through a hole at the bottom** of the furnace and refined by slag treatment or gas purging, which remove inclusions and adjust the composition to the specified value. The metal is left to solidify in a mould and is then crushed to size <Cite id="saimm" />.

The resulting MG-Si has a typical specification of **98.5% to 99.5% Si**, with carbon, alkali-earth and transition metals, boron and phosphorus among its characteristic impurities <Cite id="saimm" />. Those impurities travel with the material into the chemical purification described in [Polysilicon](/en/polissilicio).

### Silica fume and off-gas energy

Not everything that enters the furnace leaves as silicon. Each tonne of silicon metal produces **0.2 to 0.4 tonnes of condensed silica fume**, an ultrafine dust carried by the gas and collected at the filter plant <Cite id="saimm" />. Far from being waste, silica fume has found a wide array of industrial applications <Cite id="saimm" />.

The off-gas is the other relevant by-product. Its energy content is of the **same order of magnitude** as the electrical energy fed into the furnace <Cite id="saimm" />. Plants usually recover it as hot water or saturated steam for heating, or as superheated steam for electricity <Cite id="saimm" />.

The furnace's own electricity consumption runs at **11 to 13 MWh per tonne** of silicon metal, and falls markedly when the end product is an alloy with more iron in it <Cite id="saimm" />. It is that energy bill, not the availability of quartz, that decides where MG-Si is produced: in countries with cheap electricity, abundant reductants and good quartz deposits <Cite id="saimm" />.

### Scale and uses of MG-Si

World MG-Si production exceeds **1 million metric tonnes per year**, at a cost of a few US dollars per kilogram depending on quality, purity and particle size <Cite id="saimm" />. Demand comes mainly from the **aluminium and chemical industries**, and only a small fraction goes on to be refined to semiconductor grade <Cite id="saimm" />.

Much of the silicon made in these furnaces never becomes MG-Si for chemicals or chips. It leaves as **ferrosilicon**, used to deoxidise and alloy steel and cast iron <Cite id="saimm" />. Photovoltaics is the fastest-growing outlet for the metal that does go on to be purified <Cite id="saimm" />.

<SourceNote label="Sources" :ids="['pv-education', 'pv-mfg-polysilicon', 'sciencedirect-hpq', 'sibelco-hpq', 'quartzcorp-hpq', 'elkem', 'csiro', 'saimm', 'asianometry-wafer']" />

<SeeAlso title="See also" :links="[
  { text: 'Introduction', href: '/en/introducao', note: 'world metallurgical silicon production', cite: 'usgs-mcs' },
  { text: 'Polysilicon', href: '/en/polissilicio', note: 'chemical refining from MG-Si' },
  { text: 'References', href: '/en/referencias', note: 'numbered list' },
]" />
