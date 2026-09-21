---
title: Transistor evolution
description: From planar MOSFET to CFET — strained silicon, HKMG, FinFET, GAAFET and backside power.
---

# Architectural evolution of transistors

Compare the three main architectures visually:

<ClientOnly>
  <TransistorCompare />
</ClientOnly>

## Generations compared

| Era | Node | Architecture | Key change | Gain |
|-----|------|--------------|------------|------|
| **1960** | — | Planar MOSFET | Channel, gate, source and drain in the wafer plane | The basis of Moore's Law for decades |
| **2003** | 90 nm | Strained silicon | Si deposited on SiGe strains the crystal lattice | +10–20% mobility at marginal cost <Cite id="intel-strain" /> |
| **2007** | 45 nm | HKMG | High-K dielectric (hafnium) + metal gate replace SiO₂/polysilicon | Blocks leakage while keeping electrostatic coupling <Cite id="hkmg-paper" /> |
| **2011** | 22 nm | FinFET (Tri-Gate) | Vertical fin channel; gate wraps three sides | Electrostatic control; current scales by adding fins |
| **2022** | 3 nm | GAAFET / nanosheets | Stacked nanosheets wrapped by the gate on all four sides | Up to ~40% less leakage <Cite id="asml-gaa" /> |
| **2025/2026** | 18A / N2 | BSPDN | Power delivery moves to the wafer backside via TSVs | ~11% more density; IR drop up to 10× lower |
| **Future** | &lt;1 nm | CFET | NFET and PFET stacked in the same cell | Up to ~50% less area per logic gate |

## 1960 — Planar MOSFET

The original planar transistors (**MOSFET** — *Metal-Oxide-Semiconductor Field-Effect Transistor*), consolidated in the 1960s after Kahng and Atalla at Bell Labs, sustained Moore's Law for decades. The channel, the gate electrode, the source and the drain all sit in the two-dimensional plane of the wafer. Below **28 nm**, the proximity of source and drain degraded the gate's control, producing **short-channel effects (SCE)** and leakage through quantum tunnelling.

## 2003 — Strained silicon (Intel)

At the **90 nm** node (2003/2004), Intel used **strained silicon**: mechanical stress in the channel (e.g. Si on SiGe) increases atomic spacing and mobility by **10–20%** at marginal cost <Cite id="intel-strain" />.

<DiagramFigure src="/pdf-images/p15-1.png" alt="Silicon lattice vs silicon-germanium">
Lattice comparison: pure silicon vs. SiGe as a stress-inducing substrate.
</DiagramFigure>

<DiagramFigure src="/pdf-images/p15-2.png" alt="Strained silicon on SiGe">
A layer of “stretched” silicon on silicon-germanium — arrows indicate horizontal strain.
</DiagramFigure>

<DiagramFigure src="/pdf-images/p16-1.png" alt="Electron flow in normal vs strained silicon">
Normal vs. strained lattice and the faster electron flow in the channel.
</DiagramFigure>

## 2007 — High-K metal gate (HKMG)

With the gate oxide (SiO₂) reduced to ~**1 nm**, tunnelling leakage became unworkable. In **2007** (45 nm), **High-K** dielectrics (hafnium) and **metal gates** replaced SiO₂/polysilicon, keeping electrostatic coupling with a thicker physical layer <Cite id="hkmg-paper" />.

## 2011 — FinFET (Tri-Gate)

Below **20 nm**, planar devices lost control. Intel commercialised **FinFET** at **22 nm** (2011): the channel becomes a vertical “fin” and the gate wraps three sides, reducing leakage and allowing drive current to scale with adjacent fins (**fin quantization**).

## 2022 — GAAFET (gate-all-around / nanosheets)

At **3 nm** and below, FinFETs hit limits of variability and quantum effects. **GAAFET** stacks **nanosheets** wrapped by the gate on **all four sides**. Samsung went to mass production at 3 nm (**MBCFET**, 2022); TSMC and Intel followed at the N2 and **18A (RibbonFET)** nodes <Cite id="asml-gaa" />. Superior electrostatic control, up to **~40%** less leakage, and nanosheet width tunable for performance vs. power.

## 2025/2026 — BSPDN (backside power)

**Backside Power Delivery Network (BSPDN)** — *PowerVia* (Intel 18A), *Super Power Rail* (TSMC): power rails move to the **back side** of the wafer through **TSVs**, freeing the front layers for signal, with ~**11%** more density and dynamic voltage drop (**IR drop**) up to **10×** lower.

## Future — CFET

Below **1 nm** (the angstrom era), **CFET (Complementary FET)** stacks NFET and PFET vertically in the same cell, cutting the area per logic gate (inverters, SRAM) by up to **~50%** and extending Moore's Law beyond conventional GAAFET.

<SourceNote label="Sources" :ids="['intel-strain', 'hkmg-paper', 'asml-gaa']" />

<SeeAlso title="See also" :links="[
  { text: 'Timeline', href: '/en/linha-do-tempo', note: 'chronology and interactive comparator' },
  { text: 'Photolithography', href: '/en/fotolitografia', note: 'patterning the chip layers' },
  { text: 'References', href: '/en/referencias', note: 'Intel strained silicon, ASML GAA' },
]" />
