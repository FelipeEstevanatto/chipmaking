---
title: Introduction
description: Silicon metal production (USGS), the quartz feedstock, and why solar cells and chips need different purities.
dataAsOf: 2025
---

# Introduction

<DiagramFigure src="/pdf-images/p01-1.jpeg" alt="Crystalline metallurgical silicon">
A sample of metallurgical silicon, the industrial product that later becomes wafers for solar cells and chips.
</DiagramFigure>

Producing silicon wafers in sufficient quantity and quality is the main factor determining the price of solar panels, and it is essential for manufacturing computer chips. The purity each sector requires, however, is completely different, and according to the 2026 edition of the *Mineral Commodity Summaries* from the United States Geological Survey (USGS) <Cite id="usgs-mcs-2026" />, China accounted for almost 80% of the estimated world output of silicon materials (silicon metal and ferrosilicon) in 2025.

## Production estimates {#producao-estimada}

Thousands of tonnes of **silicon metal** (not to be confused with electronic-grade polysilicon) and **ferrosilicon**, from the 2024–2026 USGS editions:

<UsgsProductionTable />

The USGS has published silicon metal and ferrosilicon separately since the 2024 edition, which publishes 2022; the 2020–2023 editions added the two products together in a single series, on a silicon-content basis, and that is why the table starts in 2022. Each edition revises earlier years, so part of the variation between columns is revision rather than output. Each column carries the most recent estimate for the year: 2022 in the 2024 edition <Cite id="usgs-mcs-2024" />, 2023 in the 2025 edition <Cite id="usgs-mcs-2025" />, and 2024 and 2025 in the 2026 edition <Cite id="usgs-mcs-2026" />. The United States appears as *W* (withheld) in all three editions, and the world total excludes U.S. production.

<SourceNote label="Sources" :ids="['usgs-mcs-2024', 'usgs-mcs-2025', 'usgs-mcs-2026']" />

### Interactive chart

<ClientOnly>
  <UsgsProductionChart />
</ClientOnly>

<SourceNote label="Chart data" :ids="['usgs-mcs-2024', 'usgs-mcs-2025', 'usgs-mcs-2026']" />

Silicon is the second most abundant material in the Earth's crust (27%) and can be mined from many sources, appearing as oxide (silica) and silicates: sand, quartz, amethyst, agate and flint. The most efficient route begins with mining and burning quartz, which is silicon dioxide (SiO₂).

<SeeAlso title="See also" :links="[
  { text: 'Mining & MG-Si', href: '/en/mineracao-mg-si', note: 'the first industrial step after quartz' },
  { text: 'Glossary', href: '/en/glossario', note: 'the difference between MG-Si, polysilicon and EG-Si' },
  { text: 'References', href: '/en/referencias', note: 'the complete list of sources' },
]" />
