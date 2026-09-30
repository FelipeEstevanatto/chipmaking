---
title: Data and numbers
description: The site's series as charts and as files — transistor counts, the yield model, binning by frequency, and each chapter's data-freshness stamp.
dataAsOf: 2026
---

# Data and numbers

This site has had one rule since its first line: **a number without a source does not go into the text**. Tables carry the `[n]` marker pointing at the [reference list](/en/referencias), and every page closes with the sources it used.

This page is the other side of that rule: gathering the **series** behind the chapters in one place, with the interactive chart and the matching data file, so any reader can redo the arithmetic instead of accepting the conclusion.

## Transistors per chip

The industry's most quoted curve is also the hardest to attribute, because no single primary source tabulates transistor counts across five decades and several vendors. The series below is a **compilation**, and the table names each product so that every point is traceable; where the manufacturer publishes the count, the row cites the manufacturer <Cite id="dados-transistor-count" />.

<ClientOnly>
  <DataChart chart="transistor-count" />
</ClientOnly>

| Year | Product | Transistors | Process node | Source |
| --- | --- | --- | --- | --- |
| 1971 | Intel 4004 | **2,300** | 10 µm | <Cite id="intel-4004" /> <Cite id="dados-transistor-count" /> |
| 1978 | Intel 8086 | **29,000** | 3 µm | <Cite id="dados-transistor-count" /> |
| 1985 | Intel 80386 | **275,000** | 1.5 µm | <Cite id="dados-transistor-count" /> |
| 1993 | Intel Pentium | **3.1 million** | 0.8 µm | <Cite id="dados-transistor-count" /> |
| 2000 | Pentium 4 | **42 million** | 180 nm | <Cite id="dados-transistor-count" /> |
| 2006 | Core 2 Duo | **291 million** | 65 nm | <Cite id="dados-transistor-count" /> |
| 2013 | Apple A7 | **1 billion** | 28 nm | <Cite id="dados-transistor-count" /> |
| 2020 | Apple M1 | **16 billion** | 5 nm | <Cite id="apple-m1" /> |
| 2024 | Apple M4 | **28 billion** | 3 nm | <Cite id="apple-m4" /> |

<DiagramFigure src="/assets/die-80386.jpg" alt="Die photograph of an Intel 80386 DX, showing bands of repeated cells framed by irregular logic blocks and a rim of bond pads">
The die of the Intel 80386, the 1985 chip in the table: 275,000 transistors <Cite id="dados-transistor-count" />. The bands of dense, repetitive blocks are the PLA and ROM arrays, where the same cell repeats in a grid; between them sit the irregular blocks of logic and datapath, and along the rim the frame of bond pads. Pauli Rautakorpi — <a href="https://commons.wikimedia.org/wiki/File:Intel_80386_DX_die.JPG" target="_blank" rel="noopener noreferrer">Intel 80386 DX die</a> (CC BY 3.0, downscaled), Wikimedia Commons.
</DiagramFigure>

The reading changes with the button above. On a linear scale the last two rows flatten everything before them and the impression of Moore's law continuity disappears. On a **logarithmic** scale what you see is a straight line: **exponential** growth with a doubling time of a few years, and it is that regularity the industry chased for decades.

The most recent point in the series is from 2024. Announced in August 2026 and debuting in the Mac mini, the **M6** is Apple's first chip on a **2 nm** process, but the release only describes "greater transistor density into a smaller die" and does not publish the count <Cite id="apple-m6" />. The figure of **around 46 billion transistors** that appears in third-party summaries has no primary source behind it, and the chip is not in the compilation the table rests on either. The M6 stays out of the series, by the same rule that governs the rest of the site: a number without a source does not go into the text.

## Yield against area

The second chart is not a measurement: it is the **Poisson model** of yield, evaluated from the equation the [in the fab](/en/na-fab) chapter presents, for five defect densities <Cite id="leachman-yield" />.

<ClientOnly>
  <DataChart chart="yield-vs-area" />
</ClientOnly>

Doubling a die's area **costs more than twice as much per good die**: at D₀ = 0.1 defect/cm², yield falls from 90% to 82% when the area doubles from 1 to 2 cm². That is the economic reason large dies are rare and the reason the industry moved to [chiplets](/en/empacotamento#chiplets-dividing-in-order-to-yield) instead of continuing to enlarge the monolithic die. The Poisson model is conservative at large areas, as the chapter itself records, and the correction the industry uses is the negative binomial distribution <Cite id="murphy-1964" />.

The chart above is a curve; clustering shows up in a map. The two controls below move the die area and the **clustering factor** α of the negative binomial: at α = ∞ defects land at random across the wafer and the model is the Poisson law itself; as α falls they arrive in clumps, most dies come out clean and the failures concentrate in a few. Poisson cannot see that, which is why it understates the yield of a real wafer; the gap between the two bars is the size of the error.

<ClientOnly>
  <YieldExplorer />
</ClientOnly>

## Binning by frequency

Yield tells you how many dies survive; **binning** tells you what each one sells for. An independent binning house, **Silicon Lottery**, measured every processor it resold and published the distribution of highest stable frequency <Cite id="siliconlottery-stats" />. The chart compares two models of the same Coffee Lake die: the 8086K is the batch Intel hand-picked, with a 5.0 GHz floor, against the 17% of the 8700K batch that never reach it <Cite id="tomshardware-8086k" />.

<ClientOnly>
  <DataChart chart="binning-bins" />
</ClientOnly>

The shares are the difference between consecutive published percentiles, rounded to the whole per cent, not a direct count.

## The series as files

Every chart on the site also exists as a data file, generated from the **same definition** that draws it — not from a parallel spreadsheet that would age on its own:

- [Transistor count](/data/transistor-count.csv)
- [Yield against area](/data/yield-vs-area.csv)
- [Band gap × lattice constant](/data/band-gap.csv)
- [Concentration by step](/data/chokepoint-share.csv)
- [Photovoltaic efficiency](/data/pv-efficiency.csv)
- [Bathtub curve](/data/bathtub.csv)
- [Binning by frequency](/data/binning-bins.csv)

The script `scripts/export-chart-data.ts` rewrites all of them from `docs/.vitepress/theme/charts/specs.ts`, so the chart and the CSV cannot drift apart.

## The freshness stamp

Not every chapter is equally recent, and until now a reader had no way to know. The [solar cells and modules](/en/celulas-solares) chapter used **2011** figures for the industry's scale and cost (which its own text admits are outdated) while [crystal structure](/en/estrutura-wafers) cites data from the current year.

That is why each chapter declares, below its title, the **year of the most recent data it cites**. It is a reading aid, not a validity stamp: a 2011 number may still be the best reference for what it describes, but the reader is entitled to know they are reading 2011.

<SourceNote :ids="['dados-transistor-count', 'intel-4004', 'apple-m1', 'apple-m4', 'apple-m6', 'leachman-yield', 'murphy-1964', 'siliconlottery-stats', 'tomshardware-8086k']" />

<SeeAlso title="See also" :links="[
  { text: 'In the fab', href: '/en/na-fab', note: 'where the yield equation comes from' },
  { text: 'Prices and value', href: '/en/precos-e-valor', note: 'the price rungs of the chain' },
  { text: 'References', href: '/en/referencias', note: 'the complete list of sources' },
]" />
