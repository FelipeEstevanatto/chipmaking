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
