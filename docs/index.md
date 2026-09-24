---
layout: home
title: Silício - Chip Making
description: Da mineração de quartzo aos transistores GAA — cadeia do silício para energia solar e semicondutores.
hero:
  name: Silício
  text: Chip Making
  tagline: Do quartzo ao chip — purificação, wafers, fotolitografia e arquiteturas de transistor explicadas em português.
  image:
    src: /pdf-images/p01-1.jpeg
    alt: Silício metálico cristalino
  actions:
    - theme: brand
      text: Começar leitura
      link: /introducao
    - theme: alt
      text: Linha do tempo
      link: /linha-do-tempo
features:
  - icon: 🪨
    title: Matéria-prima
    details: Mineração de quartzo HPQ e redução carbotérmica até silício metalúrgico (MG-Si).
    link: /mineracao-mg-si
  - icon: ⚗️
    title: Refino
    details: Triclorossilano, processos Siemens e FBR, mercado global de polissilício.
    link: /polissilicio
  - icon: 💿
    title: Wafer
    details: Czochralski, corte, CMP, limpeza RCA e estrutura cristalina do silício.
    link: /fabricacao-wafers
  - icon: 🔬
    title: Na fab
    details: Fotolitografia DUV/EUV, ASML e etapas do fluxo de padrões no wafer.
    link: /fotolitografia
  - icon: 📐
    title: Dispositivos
    details: Planar, silício esticado, FinFET, GAAFET, BSPDN e horizonte CFET.
    link: /transistores
  - icon: 📖
    title: Glossário
    details: Siglas e termos (MG-Si, TCS, CMP, EUV…) com links para os capítulos.
    link: /glossario
  - icon: 🧭
    title: Panorama
    details: Preços e valor, os vizinhos SiC e GaN, o mapa dos gargalos e as séries de dados.
    link: /gargalos
---

## Cadeia de produção

```mermaid
flowchart LR
  A[Quartzo HPQ] --> B[MG-Si]
  B --> C[Polissilício]
  C --> D[Lingote CZ]
  D --> E[Wafer]
  E --> F[Fotolitografia]
  F --> G[Transistores 3D]
  E --> H[Células solares]
```

<div class="supply-chain">

Explore cada etapa pela barra lateral ou use a [introdução](/introducao) para contexto de mercado e dados interativos da USGS.

</div>

## Trilha de leitura

A cadeia tem uma ordem, e a barra lateral a numera. Se você está começando, siga esta:

1. [Introdução](/introducao) — o tamanho do mercado e por que solar e chip exigem purezas diferentes.
2. [O elemento silício](/o-elemento-silicio) — as constantes que todas as etapas seguintes obedecem.
3. [Mineração e MG-Si](/mineracao-mg-si) — do quartzo ao silício metalúrgico, no forno de arco.
4. [Polissilício](/polissilicio) — a purificação química, e o mercado que ela criou.
5. [Fabricação de wafers](/fabricacao-wafers) — o lingote Czochralski vira lâmina polida.
6. [Estrutura e tipos](/estrutura-wafers) — a rede cristalina, a dopagem e como ler um wafer.
7. [Na fab](/na-fab) — a fábrica como laço: oxidação, deposição, corrosão, implantação.
8. [Fotolitografia](/fotolitografia) — como o desenho é impresso, do DUV ao High-NA.
9. [Evolução dos transistores](/transistores) — as quinze gerações, do planar ao CFET.
10. [Confiabilidade](/confiabilidade) — por que um chip deixa de funcionar.
11. [Empacotamento e teste](/empacotamento) — do wafer fatiado ao produto vendável.

O wafer também se divide para a [fotovoltaica](/celulas-solares), que é o outro destino do mesmo material. E, quando a cadeia toda já estiver clara, o [Panorama](/gargalos) amarra preço, geografia e dados.
