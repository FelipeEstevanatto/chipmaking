---
title: The silicon element
description: The element's data card — atomic mass, densities, band gap, isotopes and why these numbers come back in every other chapter.
dataAsOf: 2026
---

# The silicon element

Every chapter of this site treats silicon as a feedstock: ore, furnace, ingot, wafer, transistor. This page goes the other way and looks at the **atom** — the constants the industry does not choose, only obeys.

They come back at every step of the chain. The [submerged arc furnace](/en/mineracao-mg-si) has to beat a strong bond; [crystal growth](/en/fabricacao-wafers) needs a lattice that repeats; the [solar cell](/en/celulas-solares) is limited by a number that sits in this table from the start.

## The element's data card

| Quantity | Value |
| --- | --- |
| Atomic number | **14** (group 14, period 3) |
| Standard atomic weight | **28.084 to 28.086 u** |
| Melting point | **1414 °C** |
| Boiling point | **3265 °C** |
| Solid density (25 °C) | **2.329 g/cm³** |
| Melt density | **≈ 2.57 g/cm³** |
| Lattice constant (diamond cubic) | **5.431 Å** |
| Band gap (300 K) | **1.12 eV**, indirect |
| Relative permittivity | **11.7** |
| Electron / hole mobility | **1400 / 450 cm²/V·s** |
| Thermal conductivity | **148 W/(m·K)** |
| Thermal expansion coefficient | **2.6 × 10⁻⁶ /K** |
| Intrinsic carrier concentration (300 K) | **≈ 1 × 10¹⁰ cm⁻³** |

<Cite id="elem-ioffe" /> <Cite id="elem-sze" /> <Cite id="elem-ciaaw" />

Three things in that table deserve attention, and all three have industrial consequences.

The first is density. Solid silicon is **less dense than its own melt** — 2.33 against about 2.57 g/cm³. Almost every material shrinks as it solidifies; silicon **expands**. That is why the crystal grows floating on the melt in the [Czochralski](/en/fabricacao-wafers) process rather than sinking into it <Cite id="zulehner-2000" />.

The second is thermal conductivity. **148 W/(m·K)** is a metal's number, not an insulator's, and it is one of the reasons silicon remains the substrate of choice even when another material could do the electrical job — it also does the job of carrying heat away <Cite id="elem-ioffe" />.

The third is the gap.

## The indirect gap explains more than solar

Silicon's gap is **1.12 eV**, narrow enough to conduct when you want it to and wide enough not to conduct when you do not — the reason it displaced [germanium](/en/estrutura-wafers), whose gap is 0.66 eV <Cite id="elem-sze" />.

The decisive detail, though, is that this gap is **indirect**: the conduction-band minimum and the valence-band maximum do not sit at the same point in momentum space. Absorbing or emitting a photon therefore needs a lattice vibration to help, which makes both processes far less likely <Cite id="elem-sze" />.

Two consequences follow, and they land in separate chapters of this site. The first is that **1 µm of gallium arsenide absorbs what 100 µm of silicon absorbs** — which explains the thickness of the solar wafer and the choice of thin-film materials in [solar cells and modules](/en/celulas-solares) <Cite id="saimm" />. The second is that silicon **does not emit light efficiently**, which forces silicon photonics to look for its laser in another material, as discussed in [Beyond silicon](/en/alem-do-silicio).

<ClientOnly>
  <DataChart chart="band-gap" />
</ClientOnly>

The map above shows where silicon falls among semiconductors: narrow gap, large lattice, next to germanium.

## The three isotopes

Natural silicon is a mixture of three stable isotopes, and the proportion between them is remarkably constant on Earth <Cite id="elem-ciaaw" />:

| Isotope | Abundance |
| --- | --- |
| ²⁸Si | **92.19% to 92.32%** |
| ²⁹Si | **4.65% to 4.70%** |
| ³⁰Si | **3.04% to 3.11%** |

The variation is small but not zero, and it is measured precisely enough to become a tool: the ratio of silicon isotopes in a sediment records the climate in which it formed <Cite id="elem-ciaaw" />.

For the industry the practical consequence is different. That **0.47% of ²⁹Si** is not a chemical detail: the ²⁹Si nucleus carries spin, and spin in silicon is magnetic noise for anyone trying to use silicon itself as a qubit. Purifying the isotope — not the substance, the **isotope** — is what turns silicon into a quantum material, the subject of [Beyond silicon](/en/alem-do-silicio) <Cite id="wbg-si28-qubit" />.

## Why the industry uses this element

It is worth closing with the question the earlier chapters answer in pieces: why **this** element, and why did it become a synonym for electronics and for solar power at the same time?

- It is the **second most abundant** element in the Earth's crust, which keeps the feedstock cheap <Cite id="saimm" />.
- It forms a stable, insulating, water-insoluble **native oxide**, which serves as a mask and as a gate dielectric — something germanium does not do <Cite id="ge-vs-si" />.
- And its **melting point**, 1414 °C, is within reach of ordinary metallurgy, which allows it to be reduced in electric furnaces before any fine chemistry <Cite id="saimm" />.

None of those properties is the best possible on its own. It is the combination, plus the industrial chain built around them, that sustains silicon's position — the same conclusion [solar cells and modules](/en/celulas-solares) reaches.

<SourceNote label="Sources" :ids="['elem-ioffe', 'elem-sze', 'elem-ciaaw', 'zulehner-2000', 'saimm', 'ge-vs-si', 'wbg-si28-qubit']" />

<SeeAlso title="See also" :links="[
  { text: 'Crystal structure', href: '/en/estrutura-wafers', note: 'the diamond cubic lattice and doping' },
  { text: 'Beyond silicon', href: '/en/alem-do-silicio', note: 'SiC, GaN and the other jobs of silicon' },
  { text: 'Solar cells and modules', href: '/en/celulas-solares', note: 'why the indirect gap makes absorption expensive' },
  { text: 'References', href: '/en/referencias', note: 'numbered list' },
]" />
