---
layout: home
title: Silicon — Chip Making
description: From quartz mining to GAA transistors — the silicon chain for solar energy and semiconductors.
hero:
  name: Silicon
  text: Chip Making
  tagline: From quartz to chip — purification, wafers, photolithography and transistor architectures explained.
  image:
    src: /pdf-images/p01-1.jpeg
    alt: Crystalline metallurgical silicon
  actions:
    - theme: brand
      text: Start reading
      link: /en/introducao
    - theme: alt
      text: Timeline
      link: /en/linha-do-tempo
features:
  - icon: 🪨
    title: Raw material
    details: HPQ quartz mining and carbothermal reduction down to metallurgical silicon (MG-Si).
    link: /en/mineracao-mg-si
  - icon: ⚗️
    title: Refining
    details: Trichlorosilane, Siemens and FBR processes, and the global polysilicon market.
    link: /en/polissilicio
  - icon: 💿
    title: Wafer
    details: Czochralski growth, slicing, CMP, RCA cleaning and the crystal structure of silicon.
    link: /en/fabricacao-wafers
  - icon: 🔬
    title: In the fab
    details: DUV/EUV photolithography, ASML, and the patterning flow on the wafer.
    link: /en/fotolitografia
  - icon: 📐
    title: Devices
    details: Planar, strained silicon, FinFET, GAAFET, BSPDN and the CFET horizon.
    link: /en/transistores
  - icon: 📖
    title: Glossary
    details: Acronyms and terms (MG-Si, TCS, CMP, EUV…) with links to each chapter.
    link: /en/glossario
  - icon: 🧭
    title: Panorama
    details: Prices and value, the SiC and GaN neighbours, the chokepoint map and the data series.
    link: /en/gargalos
---

## Supply chain

```mermaid
flowchart LR
  A[HPQ quartz] --> B[MG-Si]
  B --> C[Polysilicon]
  C --> D[CZ ingot]
  D --> E[Wafer]
  E --> F[Photolithography]
  F --> G[3D transistors]
  E --> H[Solar cells]
```

<div class="supply-chain">

Explore each stage from the sidebar, or use the [introduction](/en/introducao) for market context and interactive USGS data.

</div>

## Reading path

The chain has an order, and the sidebar numbers it. If you are starting out, follow this one:

1. [Introduction](/en/introducao) — the size of the market and why solar and chips need different purities.
2. [The silicon element](/en/o-elemento-silicio) — the constants every later step obeys.
3. [Mining & MG-Si](/en/mineracao-mg-si) — from quartz to metallurgical silicon, in the arc furnace.
4. [Polysilicon](/en/polissilicio) — the chemical purification, and the market it created.
5. [Wafer fabrication](/en/fabricacao-wafers) — the Czochralski ingot becomes a polished wafer.
6. [Crystal structure](/en/estrutura-wafers) — the lattice, doping, and how to read a wafer.
7. [In the fab](/en/na-fab) — the factory as a loop: oxidation, deposition, etch, implant.
8. [Photolithography](/en/fotolitografia) — how the pattern is printed, from DUV to High-NA.
9. [Transistor evolution](/en/transistores) — the fifteen generations, from planar to CFET.
10. [Reliability](/en/confiabilidade) — why a chip stops working.
11. [Packaging and test](/en/empacotamento) — from sliced wafer to sellable product.

The wafer also forks into [photovoltaics](/en/celulas-solares), the other destination for the same material. And once the whole chain is clear, the [Panorama](/en/gargalos) ties price, geography and data together.
