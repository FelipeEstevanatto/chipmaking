---
title: Mining & MG-Si
description: HPQ quartz mining, carbothermal reduction in an electric arc furnace, and how metallurgical silicon (MG-Si) is obtained.
---

# Quartz mining and metallurgical silicon production

## Quartz mining (HPQ)

The first step in the silicon chain is obtaining **High-Purity Quartz (HPQ)**, extracted from deposits of quartzite or mineral quartz, which is extremely abundant in the Earth's crust <Cite id="pv-education" />. In the 1970s this mining was highly selective, focusing on pegmatites in regions such as Brazil and Madagascar to ensure the samples were free of critical impurities like iron and boron <Cite id="sciencedirect-hpq" />. Today, mining companies such as COVIA (North Carolina, USA) and Quartz Corp (Norway) extract quartz at large scale, since the subsequent physical and chemical purification process can raise the material's purity to acceptable levels <Cite id="sciencedirect-hpq" />.

## Carbothermal reduction (MG-Si)

To extract metallic silicon from quartz (silicon dioxide, SiO₂), the mineral undergoes **carbothermal reduction** <Cite id="elkem" />. This process takes place in submerged electric arc furnaces at temperatures of approximately 2000 °C, consuming high levels of energy <Cite id="csiro" />.

The quartz is mixed with carbon-rich reducing agents (charcoal, coke, coal and wood chips) <Cite id="saimm" />. The simplified overall reaction is:

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

The molten silicon is drained from the bottom of the furnace at **98% to 99.5%** purity, and is called **Metallurgical-Grade Silicon (MG-Si)** <Cite id="saimm" />. It goes through impurity-removal treatments (gas purging or slag treatment) before being cooled and crushed <Cite id="saimm" />.

<SourceNote label="Sources" :ids="['pv-education', 'pv-mfg-polysilicon', 'sciencedirect-hpq', 'elkem', 'csiro', 'saimm']" />

<SeeAlso title="See also" :links="[
  { text: 'Introduction', href: '/en/introducao', note: 'world metallurgical silicon production', cite: 'usgs-mcs' },
  { text: 'Polysilicon', href: '/en/polissilicio', note: 'chemical refining from MG-Si' },
  { text: 'References', href: '/en/referencias', note: 'numbered list' },
]" />
