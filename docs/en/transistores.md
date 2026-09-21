---
title: Transistor evolution
description: From planar MOSFET to CFET — strained silicon, HKMG, FinFET, FD-SOI, GAAFET, backside power and forksheet.
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
| **1963** | — | CMOS (complementary pair) | Complementary NMOS and PMOS on the same substrate | Near-zero standby power — the basis of all digital logic |
| **1968** | — | Silicon gate (self-aligned) | The polysilicon gate masks its own source/drain implant | Less overlap capacitance; smaller, faster devices |
| **1985** | 1.5 µm | LDD (lightly doped drain) | n⁻ extensions under nitride spacers | Smooths the drain field and tames hot carriers |
| **1995** | 0.35 µm | STI (shallow trench) | An oxide trench replaces LOCOS isolation | Vertical walls, no “bird’s beak”; higher density |
| **1998** | 0.22 µm | SOI (silicon on insulator) | A thin silicon film on a buried oxide | Less junction capacitance and latch-up immunity |
| **2003** | 90 nm | Strained silicon | Si deposited on SiGe strains the crystal lattice | +10–20% mobility at marginal cost <Cite id="intel-strain" /> |
| **2007** | 45 nm | HKMG | High-K dielectric (hafnium) + metal gate replace SiO₂/polysilicon | Blocks leakage while keeping electrostatic coupling <Cite id="hkmg-paper" /> |
| **2011** | 22 nm | FinFET (Tri-Gate) | Vertical fin channel; gate wraps three sides | Electrostatic control; current scales by adding fins |
| **2012** | 28 nm | FD-SOI (ultra-thin body) | Ultra-thin film on oxide + a back plane | Body bias tunes threshold voltage; low power, less variability |
| **2022** | 3 nm | GAAFET / nanosheets | Stacked nanosheets wrapped by the gate on all four sides | Up to ~40% less leakage <Cite id="asml-gaa" /> |
| **2025/2026** | 18A / N2 | BSPDN | Power delivery moves to the wafer backside via TSVs | ~11% more density; IR drop up to 10× lower |
| **~2029** | A10 | Forksheet | A dielectric wall separates the n and p gates | Brings n and p closer without stacking; smaller standard cells |
| **Future** | &lt;1 nm | CFET | NFET and PFET stacked in the same cell | Up to ~50% less area per logic gate |

## 1960 — Planar MOSFET

The original planar transistors (**MOSFET** — *Metal-Oxide-Semiconductor Field-Effect Transistor*), consolidated in the 1960s after Kahng and Atalla at Bell Labs, sustained Moore's Law for decades. The channel, the gate electrode, the source and the drain all sit in the two-dimensional plane of the wafer. Below **28 nm**, the proximity of source and drain degraded the gate's control, producing **short-channel effects (SCE)** and leakage through quantum tunnelling.

In practice this generation powered pocket calculators and the first home microcomputers: the NMOS **6502** family, for instance, drove the Apple II, the Commodore 64 and the NES.

## 1963 — CMOS (complementary pair)

In **1963** Frank Wanlass (Fairchild) patented **CMOS** (*Complementary MOS*): an NMOS and a PMOS wired in series so that **one conducts while the other is cut off**. Because there is never a direct path between supply and ground in the steady state, standby current reduces to leakage alone — essentially zero static power. RCA brought the 4000 family to market in 1968 and, ever since, CMOS has been the basis of virtually all digital logic: it is what allows billions of gates on one chip without melting it.

<DiagramFigure src="/assets/cmos.svg" alt="CMOS cross-section with an NMOS in a p-well and a PMOS in an n-well">
Complementary pair: an NMOS in a p-well and a PMOS in an n-well, with a single path between V<sub>DD</sub> and GND.
</DiagramFigure>

Its first large-scale use was the **RCA CD4000 logic family** (1968), which made CMOS the standard for digital watches, calculators and battery-powered instruments. Decades later the same principle became the **real-time clock** of every PC — still kept alive by what the industry nicknamed the “CMOS battery”.

## 1968 — Self-aligned silicon gate

Until the late 1960s the gate was **aluminium**, deposited **after** the source and drain diffusion. To guarantee that the channel was fully covered, the gate had to **overlap** source and drain, adding parasitic capacitance and forcing alignment tolerances that wasted area. In **1968** Bell Labs and Fairchild proposed the **self-aligned silicon gate**: the polysilicon is deposited and patterned **first**, and then serves itself as the mask for the source/drain implant. The junctions end up automatically aligned to the gate, with minimal overlap — and polysilicon also survives the high-temperature anneals that aluminium could not. This is the technique that made the first microprocessors viable (Intel 4004, 1971).

<DiagramFigure src="/assets/silicon-gate.svg" alt="Comparison of an overlapping aluminium gate with a self-aligned silicon gate">
Above, an aluminium gate overlapping source and drain; below, a self-aligned silicon gate.
</DiagramFigure>

The first product to exploit the technique at scale was the **Intel 4004** (1971), the first microprocessor: 2,300 transistors on a 12 mm² die, built on a 10 µm pMOS process for the Busicom 141-PF calculator <Cite id="intel-4004" />.

## 1985 — LDD (lightly doped drain)

With channels on the order of **1 µm**, the electric field concentrated at the drain accelerated carriers to energies high enough to cross the gate oxide. These **hot carriers** became trapped in the oxide, shifting the threshold voltage and shortening the device's useful life. The **LDD** structure (*Lightly Doped Drain*, IBM, 1980) inserts a lightly doped (**n⁻**) extension between the channel and the heavily doped (**n⁺**) contact: the potential drop spreads over a longer distance and the peak field falls. The extension is defined by a nitride **sidewall spacer**, which later processes would reuse for silicide formation. The price is a small extra series resistance.

<DiagramFigure src="/assets/ldd.svg" alt="Comparison of a conventional junction with an LDD structure with spacers">
Left, a conventional junction; right, an LDD with n⁻ extensions defined by spacers.
</DiagramFigure>

The concept originated at IBM in **1980**, but production adoption came with Intel's **CHMOS III**: Intel's own paper describes the LDD structure as the feature that insured transistor reliability, alongside a **250 Å** gate oxide and a typical **1.0 µm** electrical channel, and already announced that the technology would be used to produce the next 32-bit microprocessor <Cite id="intel-chmos3" />. That product was the **80386** (1985), built in CHMOS III at 1.5 µm with two layers of metal <Cite id="intel-80386" /> — the processor behind the Windows 3.x era. The structure remained standard from 1.5 µm down to 0.8 µm <Cite id="voldman-esd" />.

## 1995 — STI (shallow trench)

Isolation between neighbouring transistors used to be done with **LOCOS** (*Local Oxidation of Silicon*): a nitride mask delimits the active areas and thermal oxidation grows a thick field oxide. The process creeps sideways under the nitride and forms the **“bird’s beak”**, which eats into the active area and limits density. The shallow trench was **proposed in the early 1980s**, but spent years without practical use: both the planarisation and an oxide deposition able to fill narrow trenches were missing. It was **CMP** that unlocked the process <Cite id="shmj-sti" />. A shallow trench is then etched into the silicon, filled with deposited oxide and planarised by CMP: vertical walls, no bird’s beak, and a flat surface — a requirement for the lithographic depth of focus.

<DiagramFigure src="/assets/sti.svg" alt="Comparison of LOCOS isolation with a bird’s beak against a vertical shallow trench">
Left, LOCOS with the bird’s beak intruding into the active area; right, a shallow trench with vertical walls.
</DiagramFigure>

Production arrived **before the 0.25 µm node**, not at it. IBM led the application in **0.35 µm DRAM**, and Toshiba was already in mass production by 1996 <Cite id="shmj-sti" />. On the logic side, Intel started from STI **a generation earlier** too: the P856 flow is described as identical to that of **P854 (0.35 µm)**, which already began with a shallow trench <Cite id="intel-p856" />. It was **P856 (0.25 µm)**, certified in **Q3 1997**, that carried STI into the **Pentium II** at volume <Cite id="intel-p856" /><Cite id="voldman-esd" />.

## 1998 — SOI (silicon on insulator)

In **SOI** (*Silicon On Insulator*) the transistor is built in a **thin silicon film** on top of a **buried oxide** layer (BOX). The junctions no longer touch the substrate, which slashes **junction capacitance** — faster switching for less energy — eliminates the **latch-up** that plagues bulk CMOS, and improves radiation tolerance. IBM popularised the technique in high-performance processors from ~**0.22 µm**; today the **FD-SOI** variant (ultra-thin body) occupies niches in low-power and RF designs.

<DiagramFigure src="/assets/soi.svg" alt="Comparison of a bulk silicon transistor with an SOI transistor on a buried oxide">
Above, a bulk silicon transistor; below, a thin silicon film isolated by a buried oxide.
</DiagramFigure>

The architecture became famous in the 2005–2006 console generation: the **Cell** in the PlayStation 3 and the **Xenon** in the Xbox 360 both shipped on 90 nm SOI, while AMD's **Athlon 64** brought the same technology to PCs <Cite id="ibm-cell" />.

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

The first high-volume processor with strained silicon was the **Pentium 4 “Prescott”**, launched in February 2004 at the 90 nm node, which also introduced copper interconnects and a low-k dielectric <Cite id="intel-90nm" />.

## 2007 — High-K metal gate (HKMG)

With the gate oxide (SiO₂) reduced to ~**1 nm**, tunnelling leakage became unworkable. In **2007** (45 nm), **High-K** dielectrics (hafnium) and **metal gates** replaced SiO₂/polysilicon, keeping electrostatic coupling with a thicker physical layer <Cite id="hkmg-paper" />.

The commercial debut was the **Core 2 Extreme QX9650** in November 2007, followed in January 2008 by the volume line — the 45 nm Core 2 Duo and Quad chips that went into the laptops and MacBooks of the period <Cite id="intel-45nm" />.

## 2011 — FinFET (Tri-Gate)

Below **20 nm**, planar devices lost control. Intel commercialised **FinFET** at **22 nm** (2011): the channel becomes a vertical “fin” and the gate wraps three sides, reducing leakage and allowing drive current to scale with adjacent fins (**fin quantization**).

**Ivy Bridge** (22 nm, April 2012) was the first high-volume product <Cite id="intel-trigate" />; on mobile, the **Exynos 7420** (Galaxy S6) and Apple's **A9** (iPhone 6s) brought FinFET to smartphones in 2015. The architecture dominated every node from 22 nm down to 5 nm.

## 2012 — FD-SOI (ultra-thin body)

While the rest of the industry moved to FinFET, **FD-SOI** took a different route, reviving the SOI idea with an **ultra-thin silicon film** (~6 nm) on top of the buried oxide. With the film that thin the channel becomes **fully depleted** — no “floating body” effects as in partially depleted SOI — and a **back plane** under the BOX allows **body bias** to raise or lower the threshold voltage on the fly. In practice this lets a circuit spend energy only when it needs performance, which is valuable in IoT, RF and automotive designs.

<DiagramFigure src="/assets/fdsoi.svg" alt="Comparison of partially depleted SOI with a floating body against FD-SOI with an ultra-thin film and a back plane">
Above, partially depleted SOI with a floating body; below, FD-SOI with an ultra-thin film and a back plane for body bias.
</DiagramFigure>

The commercial platforms came from STMicroelectronics (28 nm) and GlobalFoundries (**22FDX**). The best-known case is the **Google Nest Mini**, whose Synaptics AS-370 SoC was identified in a teardown as built on 22FDX <Cite id="techinsights-22fdx" />. The technology also underpins BLE MCUs, Wi-Fi cameras and GNSS SoCs, with dozens of designs already in mass production <Cite id="verisilicon-fdsoi" />.

## 2022 — GAAFET (gate-all-around / nanosheets)

At **3 nm** and below, FinFETs hit limits of variability and quantum effects. **GAAFET** stacks **nanosheets** wrapped by the gate on **all four sides**. Samsung went to mass production at 3 nm (**MBCFET**, 2022); TSMC and Intel followed at the N2 and **18A (RibbonFET)** nodes <Cite id="asml-gaa" />. Superior electrostatic control, up to **~40%** less leakage, and nanosheet width tunable for performance vs. power.

The first commercial GAA product was MicroBT's **WhatsMiner M56S++** mining ASIC, on Samsung's SF3E process, identified in 2023 <Cite id="techinsights-gaa" />. One caveat: **TSMC's N3 was still FinFET** — Apple's A17 Pro in the iPhone 15 Pro is a 3 nm FinFET chip. TSMC only moved to nanosheets with **N2**, in volume production since late 2025, with the **Apple A20 Pro** among the first major products <Cite id="tsmc-n2" />.

## 2025/2026 — BSPDN (backside power)

**Backside Power Delivery Network (BSPDN)** — *PowerVia* (Intel 18A), *Super Power Rail* (TSMC): power rails move to the **back side** of the wafer through **TSVs**, freeing the front layers for signal, with ~**11%** more density and dynamic voltage drop (**IR drop**) up to **10×** lower.

It reached the market in **Intel Panther Lake** (Core Ultra series 3), the first chip to combine *PowerVia* and *RibbonFET* <Cite id="intel-18a" />; TSMC introduces *Super Power Rail* on **A16**, with volume production scheduled for the second half of 2026 <Cite id="tsmc-n2" />.

## ~2029 — Forksheet

For the **A10** node, imec proposed an intermediate architecture called the **forksheet**. The idea is to place a **dielectric wall** between the n and p gates: the wall separates the two gate trenches and lets them sit far closer than conventional nanosheets allow, without having to stack the transistors as CFET does. The result is a smaller standard cell while keeping much of the nanosheet manufacturing flow, which makes the transition less disruptive.

<DiagramFigure src="/assets/forksheet.svg" alt="Comparison of gate-all-around nanosheets with a wide n-p gap and a forksheet with a dielectric wall between the gates">
Left, gate-all-around nanosheets with a wide gap between the n and p gates; right, a forksheet with the dielectric wall bringing them closer.
</DiagramFigure>

Imec demonstrated the process on 300 mm wafers in 2021 and, in 2025, presented an *outer wall* variant with better manufacturability and performance. It is the declared bridge between GAAFET and CFET <Cite id="imec-forksheet" />.

## Future — CFET

Below **1 nm** (the angstrom era), **CFET (Complementary FET)** stacks NFET and PFET vertically in the same cell, cutting the area per logic gate (inverters, SRAM) by up to **~50%** and extending Moore's Law beyond conventional GAAFET. Because the stacking is far harder to manufacture, imec expects mass production only from the **A7** node, after 2030 <Cite id="imec-forksheet" />.

<SourceNote label="Sources" :ids="['intel-4004', 'intel-chmos3', 'intel-80386', 'intel-p856', 'shmj-sti', 'voldman-esd', 'ibm-cell', 'intel-90nm', 'hkmg-paper', 'intel-45nm', 'intel-trigate', 'techinsights-22fdx', 'verisilicon-fdsoi', 'techinsights-gaa', 'tsmc-n2', 'intel-18a', 'imec-forksheet']" />

<SeeAlso title="See also" :links="[
  { text: 'Timeline', href: '/en/linha-do-tempo', note: 'chronology and interactive comparator' },
  { text: 'Photolithography', href: '/en/fotolitografia', note: 'patterning the chip layers' },
  { text: 'References', href: '/en/referencias', note: 'primary sources and papers' },
]" />
