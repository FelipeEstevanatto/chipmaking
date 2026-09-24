---
title: Data and numbers
description: The site's series as charts and as files — transistor counts, the yield model, and each chapter's data-freshness stamp.
dataAsOf: 2026
---

# Data and numbers

This site has had one rule since its first line: **a number without a source does not go into the text**. Tables carry the `[n]` marker pointing at the [reference list](/en/referencias), and every page closes with the sources it used.

This page is the other side of that rule: gathering the **series** behind the chapters in one place, with the interactive chart and the matching data file, so any reader can redo the arithmetic instead of accepting the conclusion.

## Transistors per chip

The industry's most quoted curve is also the hardest to attribute, because no single primary source tabulates transistor counts across five decades and several vendors. The series below is a **compilation**, and the table names each product so that every point is traceable <Cite id="dados-transistor-count" />.

<ClientOnly>
  <DataChart chart="transistor-count" />
</ClientOnly>

| Year | Product | Transistors | Source |
| --- | --- | --- | --- |
| 1971 | Intel 4004 | **2,300** | <Cite id="intel-4004" /> |
| 1978 | Intel 8086 | **29,000** | <Cite id="dados-transistor-count" /> |
| 1985 | Intel 80386 | **275,000** | <Cite id="dados-transistor-count" /> |
| 1993 | Intel Pentium | **3.1 million** | <Cite id="dados-transistor-count" /> |
| 2000 | Pentium 4 | **42 million** | <Cite id="dados-transistor-count" /> |
| 2006 | Core 2 Duo | **291 million** | <Cite id="dados-transistor-count" /> |
| 2013 | Apple A7 | **1 billion** | <Cite id="dados-transistor-count" /> |
| 2020 | Apple M1 | **16 billion** | <Cite id="dados-transistor-count" /> |
| 2024 | Apple M4 | **28 billion** | <Cite id="dados-transistor-count" /> |

The series reads best on the **logarithmic** scale the button above toggles: on a linear scale the last two rows flatten everything before them, and the impression of Moore's law continuity disappears. What the log curve shows is a straight line — **exponential** growth with a doubling time of a few years — and it is that regularity, not the absolute value, that the industry chased for decades.

## Yield against area

The second chart is not a measurement: it is the **Poisson model** of yield, evaluated from the equation the [in the fab](/en/na-fab) chapter presents, for five defect densities <Cite id="leachman-yield" />.

<ClientOnly>
  <DataChart chart="yield-vs-area" />
</ClientOnly>

Look at the slope before the values. Doubling a die's area cuts yield by **more than half**, and the loss grows with defect density — the economic reason large dies are rare and the reason the industry moved to [chiplets](/en/empacotamento#chiplets-dividir-para-render) instead of continuing to enlarge the monolithic die. The Poisson model is optimistic at large areas, as the chapter itself records, and the correction the industry uses is the negative binomial distribution <Cite id="murphy-1964" />.

## The series as files

Every chart on the site also exists as a data file, generated from the **same definition** that draws it — not from a parallel spreadsheet that would age on its own:

- [Transistor count](/data/transistor-count.csv)
- [Yield against area](/data/yield-vs-area.csv)
- [Band gap × lattice constant](/data/band-gap.csv)
- [Concentration by step](/data/chokepoint-share.csv)
- [Photovoltaic efficiency](/data/pv-efficiency.csv)
- [Bathtub curve](/data/bathtub.csv)

The script `scripts/export-chart-data.ts` rewrites all of them from `docs/.vitepress/theme/charts/specs.ts`, so the chart and the CSV cannot drift apart.

## The freshness stamp

Not every chapter is equally recent, and until now a reader had no way to know. The [solar cells and modules](/en/celulas-solares) chapter used **2011** figures for the industry's scale and cost — which its own text admits are outdated — while [crystal structure](/en/estrutura-wafers) cites data from the current year.

That is why each chapter declares, below its title, the **year of the most recent data it cites**. It is a reading aid, not a validity stamp: a 2011 number may still be the best reference for what it describes, but the reader is entitled to know they are reading 2011.

<SourceNote label="Sources" :ids="['dados-transistor-count', 'intel-4004', 'leachman-yield', 'murphy-1964']" />

<SeeAlso title="See also" :links="[
  { text: 'In the fab', href: '/en/na-fab', note: 'where the yield equation comes from' },
  { text: 'Prices and value', href: '/en/precos-e-valor', note: 'the price rungs of the chain' },
  { text: 'References', href: '/en/referencias', note: 'the complete list of sources' },
]" />
