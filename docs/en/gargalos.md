---
title: The chokepoint map
description: The geography of the silicon chain on one page — who dominates each step, how concentrated each one is, and what would break if it stopped.
dataAsOf: 2026
---

# The chokepoint map

This site describes the silicon chain step by step, and the geographical facts ended up scattered: the quartz from [Spruce Pine](/en/mineracao-mg-si#spruce-pine-onde-o-quartzo-e-puro-o-suficiente), [Chinese](/en/polissilicio#a-ascensao-chinesa) polysilicon, [Japanese](/en/estrutura-wafers#quem-fabrica-os-wafers) wafers, [single-source](/en/historia-fotolitografia) lithography. This page puts the pieces into one table and asks the question they do not ask separately: **what stops in the world if each of these points stops?**

The answer has a pattern, and the pattern is this chapter's argument.

## The map

<ClientOnly>
  <DataChart chart="chokepoint-share" />
</ClientOnly>

| Step | Who dominates | Concentration | What would break |
| --- | --- | --- | --- |
| High-purity quartz (HPQ) | Spruce Pine, USA (Sibelco and The Quartz Corp) | **70 to 90%** of the world's high-purity quartz | The [Czochralski growth](/en/fabricacao-wafers) crucibles of the whole industry — and without a crucible there is no ingot |
| Metallurgical silicon (MG-Si) | China | **about 70%** of world output (2,300 of 3,300 kt in 2023) | The charge of the upstream refining furnaces |
| Polysilicon | China | **more than 90%** of global volume in 2023 | The feedstock of both the wafer and the solar cell |
| Silicon wafers | Japan (Shin-Etsu and SUMCO) | **44.1%** for the top two; the top five hold about **three quarters** | The starting wafer of every fab on the planet |
| EUV lithography | ASML (Netherlands) | **sole supplier** | The critical layers of leading-edge nodes |
| Semiconductor-grade neon | Ukraine | **about half** of world neon and **90%** of the semiconductor grade | The excimer lasers of [DUV lithography](/en/fotolitografia) |

<Cite id="sibelco-hpq" /> <Cite id="usgs-mcs" /> <Cite id="bernreuter-market" /> <Cite id="nikkei-wafer-share" /> <Cite id="asml-euv-products" /> <Cite id="fabm-neon-2022" />

Neon is the case that best illustrates the pattern, because it is not a silicon material at all: it is a noble gas left over from air separation, purified in a few plants whose feedstock comes largely from Russian steelmaking. When the invasion of Ukraine interrupted those plants in 2022, the industry discovered it depended on a by-product nobody monitored — and began designing neon recovery and recycling inside the fab itself <Cite id="fabm-neon-2017" />. It is exactly the shape of the Spruce Pine chokepoint: **a cheap, barely visible and short-term irreplaceable input**.

## The money of policy

Visible chokepoints generate industrial policy, and the amounts involved are the measure of how seriously each government took the risk.

- **United States.** The *CHIPS and Science Act* of 2022 gave the Department of Commerce **US$ 50 billion**, split into **US$ 39 billion** of manufacturing incentives and **US$ 11 billion** for R&D <Cite id="choke-nist-chips" />. The headline figure of **US$ 52.7 billion** includes items outside that envelope — it is worth knowing which of the two is being quoted.
- **European Union.** The *European Chips Act* entered into force on **21 September 2023** and, through its state-aid track, the Commission has already approved **18 decisions** totalling **more than EUR 32 billion** of public and private investment. A second round, **Chips Act 2.0**, was proposed in **June 2026** <Cite id="choke-eu-chips-act" />.
- **China.** The state fund known as the *Big Fund* has had three phases, and the third was launched in **2024** at a scale comparable to a national programme <Cite id="choke-big-fund" />.

What these programmes buy is **capacity**, not self-sufficiency. A new wafer plant takes years to qualify, and qualifying a supplier inside a fab is, as this site has already recorded, a multi-year process <Cite id="nikkei-wafer-share" />.

## Export control is an engineered chokepoint

There is a second category of chokepoint, more recent: one created neither by geology nor by economics, but by **rule**. The United States, the Netherlands and Japan aligned restrictions on the export of advanced lithography equipment — precisely the step where a single supplier exists <Cite id="choke-cset-controls" />.

The technical point is that this chokepoint **cannot be worked around by buying elsewhere**. A fab cannot replace one EUV scanner with two DUV scanners without redoing the process: every machine is qualified inside a specific recipe. The trade restriction therefore acts with the same force as a mineral monopoly — except that it is reversible by political decision, which is an important difference.

## Why concentration is not an accident

It is worth naming the mechanism, because intuition suggests the opposite: large markets should have many suppliers.

- **Idle capacity is punishingly expensive.** A polysilicon or wafer plant costs billions and has to run full. Two suppliers splitting a market of the same size both sit below break-even — it is more stable for there to be one.
- **Qualification is an asset.** Changing a materials supplier means requalifying the process. That locks in the customer and deters the entrant, as discussed in [fab consumables](/en/insumos-fab).
- **The risk is correlated.** When each step has one supplier, the risk of each step does not diversify: it adds up. That is the argument [wafer fabrication](/en/estrutura-wafers#quem-fabrica-os-wafers) already makes about Japan, and the one the [history of lithography](/en/historia-fotolitografia) makes about the consortium that bet on EUV when the candidate list still had six names.

The conclusion is not that the chain is fragile through carelessness. It is that it was **optimised for cost** for decades, and concentration is the result of that optimisation. The price of efficiency is the absence of a plan B.

<SourceNote label="Sources" :ids="['sibelco-hpq', 'usgs-mcs', 'bernreuter-market', 'nikkei-wafer-share', 'asml-euv-products', 'fabm-neon-2022', 'fabm-neon-2017', 'choke-nist-chips', 'choke-eu-chips-act', 'choke-big-fund', 'choke-cset-controls']" />

<SeeAlso title="See also" :links="[
  { text: 'Prices and value', href: '/en/precos-e-valor', note: 'where the money sits in the chain' },
  { text: 'Fab consumables', href: '/en/insumos-fab', note: 'the materials behind the steps' },
  { text: 'Mining & MG-Si', href: '/en/mineracao-mg-si', note: 'Spruce Pine in detail' },
  { text: 'References', href: '/en/referencias', note: 'numbered list' },
]" />
