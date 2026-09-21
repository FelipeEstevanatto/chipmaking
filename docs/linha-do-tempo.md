---
title: Linha do tempo
description: Marcos da indústria de polissilício e evolução arquitetônica dos transistores de silício (1960–futuro).
---

# Linha do tempo

Visão cronológica dos temas centrais do site. Detalhes completos nos capítulos linkados.

## Mercado de polissilício

```mermaid
timeline
    title Demanda e mercado (polissilício)
    1995 : ~90% semicondutores
         : ~10% fotovoltaica
    2014 : Participação solar domina
         : Demanda ~18× vs 1995
    2004 : 11 plantas globais
    2010 : 61 plantas — sobreoferta
```

Mais contexto e gráficos Bernreuter em [Polissilício](/polissilicio).

## Arquitetura dos transistores

```mermaid
timeline
    title Transistores em silício
    1960 : MOSFET planar
    1963 : CMOS (par complementar)
    1968 : Porta de silício autoalinhada
    1985 : LDD (dreno levemente dopado)
    1995 : STI (trincheira rasa, 0.35 µm)
    1998 : SOI (0.22 µm)
    2003 : Silício esticado (Intel 90 nm)
    2007 : High-K metal gate (45 nm)
    2011 : FinFET / Tri-Gate (22 nm)
    2012 : FD-SOI (corpo ultrafino)
    2022 : GAAFET / nanosheets (3 nm)
    2025 : BSPDN (PowerVia, Super Power Rail)
    2029 : Forksheet (nó A10)
    Futuro : CFET empilhado (&lt;1 nm)
```

As quatorze gerações, com a estrutura de cada transistor e exemplos de produtos que a usaram (clique para ampliar):

<ClientOnly>
  <TransistorTimeline />
</ClientOnly>

Cada era em detalhe em [Evolução dos transistores](/transistores).

<SeeAlso :links="[
  { text: 'Evolução dos transistores', href: '/transistores', note: 'arquiteturas principais em detalhe' },
  { text: 'Fotolitografia', href: '/fotolitografia', note: 'padrões no wafer' },
  { text: 'História da fotolitografia', href: '/historia-fotolitografia', note: 'do contato ao EUV' },
]" />
