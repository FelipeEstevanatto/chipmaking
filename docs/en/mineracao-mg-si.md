---
title: Mining & MG-Si
description: HPQ quartz, the submerged-arc furnace, carbothermal reduction and metallurgical-grade silicon (MG-Si).
---

# Quartz mining and metallurgical silicon production

## Quartz mining (HPQ)

The first step in the silicon chain is obtaining **High-Purity Quartz (HPQ)**, extracted from deposits of quartzite or mineral quartz, which is extremely abundant in the Earth's crust <Cite id="pv-education" />. Silicon is the **second most abundant element** in the crust, behind oxygen only, and occurs as near-pure silica or as silicates; the resources are, in practice, **unlimited** — although purity varies considerably from deposit to deposit <Cite id="saimm" />. In the 1970s this mining was highly selective, focusing on pegmatites in regions such as Brazil and Madagascar to ensure the samples were free of critical impurities like iron and boron <Cite id="sciencedirect-hpq" />. Today, mining companies such as COVIA (North Carolina, USA) and Quartz Corp (Norway) extract quartz at large scale, since the subsequent physical and chemical purification process can raise the material's purity to acceptable levels <Cite id="sciencedirect-hpq" />.

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

The furnace geometry is simple and brutal: a shell roughly **10 m in diameter**, pierced by **three pre-baked carbon electrodes** submerged in the charge, which carry a **three-phase current** and take the material to about 2000 °C <Cite id="saimm" />.

The thermal design is deliberate. A layer of solid material (the **outer reaction zone**) is kept on top of the molten bath (the **inner reaction zone**) precisely to **maximise the silicon yield**: that interface is where the SiO that forms can react again before escaping with the gas <Cite id="saimm" />.

The silicon is then **tapped through a hole at the bottom** of the furnace and refined by slag treatment or gas purging, which remove inclusions and adjust the composition to the specified value. The metal is left to solidify in a mould and is then crushed to size <Cite id="saimm" />.

The resulting MG-Si has a typical specification of **98.5% to 99.5% Si**, with carbon, alkali-earth and transition metals, boron and phosphorus among its characteristic impurities <Cite id="saimm" />. Those impurities travel with the material into the chemical purification described in [Polysilicon](/en/polissilicio).

### Silica fume and off-gas energy

Not everything that enters the furnace leaves as silicon. Each tonne of silicon metal produces **0.2 to 0.4 tonnes of condensed silica fume**, an ultrafine dust carried by the gas and collected at the filter plant <Cite id="saimm" />. Far from being waste, silica fume has found a wide array of industrial applications <Cite id="saimm" />.

The off-gas is the other relevant by-product, and its energy content is of the **same order of magnitude** as the electrical energy fed into the furnace <Cite id="saimm" />. It is therefore usually routed to recovery systems, producing hot water or saturated steam for heating — or superheated steam for electricity generation <Cite id="saimm" />.

The furnace's own electricity consumption runs at **11 to 13 MWh per tonne** of silicon metal, and falls markedly when the end product is an alloy with more iron in it <Cite id="saimm" />. It is that energy bill, not the availability of quartz, that decides where MG-Si is produced: in countries with cheap electricity, abundant reductants and good quartz deposits <Cite id="saimm" />.

### Scale and uses of MG-Si

World MG-Si production exceeds **1 million metric tonnes per year**, at a cost of a few US dollars per kilogram depending on quality, purity and particle size <Cite id="saimm" />. Demand comes mainly from the **aluminium and chemical industries**, and only a small fraction goes on to be refined to semiconductor grade <Cite id="saimm" />.

Worth noting: much of the silicon produced industrially never becomes pure MG-Si at all — it leaves as **ferrosilicon**, used for deoxidation and alloying of steel and cast iron <Cite id="saimm" />. The fastest-growing market, however, is photovoltaics <Cite id="saimm" /> — and that is what gives the purification chain described next its economic point.

<SourceNote label="Sources" :ids="['pv-education', 'pv-mfg-polysilicon', 'sciencedirect-hpq', 'elkem', 'csiro', 'saimm']" />

<SeeAlso title="See also" :links="[
  { text: 'Introduction', href: '/en/introducao', note: 'world metallurgical silicon production', cite: 'usgs-mcs' },
  { text: 'Polysilicon', href: '/en/polissilicio', note: 'chemical refining from MG-Si' },
  { text: 'References', href: '/en/referencias', note: 'numbered list' },
]" />
