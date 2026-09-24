---
title: Beyond silicon
description: The wide-bandgap semiconductors that compete with silicon where it loses — SiC and GaN — and the other jobs silicon itself does beyond computing and generating power.
dataAsOf: 2026
---

# Beyond silicon

Every chapter of this site treats silicon as **the** semiconductor material. That is true for logic and for photovoltaics, and false in two directions that deserve a chapter.

In the first, there are semiconductors that are **not** silicon and beat it in specific applications — not by being better at everything, but by having one property silicon lacks. In the second, silicon does far more than process data and generate power: it is also mechanical structure, sensor, and more recently a qubit host.

## The wide-bandgap neighbours

The parameter that separates this family is the **band gap**, and the difference is large: silicon is **1.12 eV**, silicon carbide (4H-SiC) is **3.26 eV** and gallium nitride (GaN) is **3.40 eV** <Cite id="elem-ioffe" /> <Cite id="wbg-ioffe-sic" /> <Cite id="wbg-ioffe-gan" />.

| Material | Gap (300 K) | Where it wins |
| --- | --- | --- |
| **Si** | 1.12 eV | Logic, memory, photovoltaics, sensors |
| **4H-SiC** | 3.26 eV | High-voltage power switching |
| **GaN** | 3.40 eV | High-frequency power, radio frequency and blue light |

A wider gap means a **much higher breakdown voltage**: a material with a wide forbidden band withstands a larger electric field before going into avalanche <Cite id="elem-sze" />. And that changes device geometry. A power transistor needs a thick, lightly doped drift region to hold off voltage; the higher the critical field, **the thinner and more heavily doped** that region can be, and the lower the on-resistance. That is why SiC and GaN can do, in a small volume, what silicon can only do in a larger one.

In high-voltage switching — electric-vehicle traction inverters, grid converters and industrial supplies — SiC's direct competitor is not a silicon transistor but the **IGBT**, a bipolar device that stores minority carriers and therefore has a current tail when it turns off. A SiC MOSFET eliminates that tail, and the loss difference shows up precisely at switching frequency <Cite id="elem-sze" />.

In GaN the advantage comes from another interface: at the AlGaN/GaN contact a **two-dimensional electron gas** forms, a high-mobility carrier layer with no intentional doping — the origin of the HEMT transistor and of its power and radio-frequency versions <Cite id="wbg-ioffe-gan" />. And the same material family solved a problem silicon cannot solve by physics rather than by engineering: **emitting blue light**. The efficient blue LED of Akasaki, Amano and Nakamura is what made solid-state white lighting possible, and it earned the 2014 Nobel Prize in Physics <Cite id="wbg-nobel-2014" />.

It is worth keeping the reason these materials do **not** replace silicon in logic: the problem is not the gap, it is the **substrate**. Growing a large, defect-free crystal is the hard part, and that is where silicon has decades of advantage — the same argument [solar cells and modules](/en/celulas-solares) makes to explain why silicon dominates photovoltaics despite an indirect gap that is worse for absorbing light.

## Silicon's other lives

Before being a processor, silicon is an excellent structural material: hard, elastic within a predictable range, and mouldable to sub-micrometre precision. Three of those jobs deserve a note.

**MEMS.** Micro-electromechanical sensors — accelerometers, gyroscopes, microphones, pressure sensors — are machined silicon, not doped silicon. Manufacturing uses the same tools as the fab: **anisotropic** wet etching, which attacks different crystal planes at different rates, and deep plasma etching (**DRIE**), which digs vertical trenches <Cite id="bosch-drie" />. Every phone carries dozens of them.

**Image sensors.** The CMOS sensor is probably the most numerous silicon product in the world today. The current generation stacks two wafers — the pixel one and the circuit one — and joins them with **through-silicon vias** (TSV), the same technology the [packaging](/en/empacotamento) chapter describes for 3D packages <Cite id="semieng-tsv" />.

**Silicon photonics.** Here silicon is, once again, a victim of its own gap. An indirect-gap material **does not emit light efficiently** <Cite id="elem-sze" />, which is why a photonic circuit integrated in silicon cannot make its own laser: it guides, modulates and detects light very well, but has to look for the source in another material, bonded to the chip. It is the same physical property that explains, in the solar chapter, why **100 µm of silicon** are needed to absorb what **1 µm of gallium arsenide** absorbs <Cite id="saimm" />.

**Qubits.** And there is one use in which silicon is chosen precisely for being silicon: because the ²⁹Si isotope carries nuclear spin, natural silicon is a **magnetically noisy** environment for a qubit. Purifying the isotope — leaving almost only ²⁸Si — creates the quiet environment in which spin qubits operate <Cite id="wbg-si28-qubit" /> <Cite id="elem-ciaaw" />.

## What remains

Silicon did not win by being the best material at every job. It won by being **good enough** across an extremely wide range of jobs, with a native oxide that serves as an insulator, a substrate that can be grown to large diameters, and an industrial chain built around it for seven decades <Cite id="saimm" />.

The materials in this chapter step in where that combination is not enough — and their arrival does not replace silicon, it complements it. A SiC power chip is still mounted on silicon, packaged with silicon and driven by silicon.

<SourceNote label="Sources" :ids="['elem-ioffe', 'wbg-ioffe-sic', 'wbg-ioffe-gan', 'elem-sze', 'wbg-nobel-2014', 'bosch-drie', 'semieng-tsv', 'saimm', 'wbg-si28-qubit', 'elem-ciaaw']" />

<SeeAlso title="See also" :links="[
  { text: 'The silicon element', href: '/en/o-elemento-silicio', note: 'why silicon, and not germanium' },
  { text: 'Transistor evolution', href: '/en/transistores', note: 'the transistor in the silicon plane' },
  { text: 'Solar cells and modules', href: '/en/celulas-solares', note: 'the indirect gap as a limit' },
  { text: 'References', href: '/en/referencias', note: 'numbered list' },
]" />
