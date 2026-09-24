---
title: Fab consumables
description: What a semiconductor fab consumes besides silicon — photoresist, mask, slurry, gases and ultrapure water — and why that list is as silent a chokepoint as quartz.
dataAsOf: 2026
---

# Fab consumables

The wafer is this site's protagonist: it travels through the [fab](/en/na-fab), receives layers, is exposed in [photolithography](/en/fotolitografia) and leaves as a chip. But none of those steps happens in a materials vacuum — the fab consumes, for every wafer, a set of chemicals and gases whose supply chain has exactly the same shape as the Spruce Pine chokepoint described in [mining and MG-Si](/en/mineracao-mg-si).

This page is about the inputs that are not silicon but decide whether silicon becomes a product.

## Photoresist: chemical amplification

The most characteristic lithography input is **photoresist**, and the invention that transformed it came from Hiroshi Ito and C. Grant Willson in the early 1980s: instead of each photon triggering a single reaction in a resist molecule, they designed a system in which the photon generates an **acid catalyst**, which in turn unleashes hundreds of cascading reactions during development <Cite id="fabm-ito-1983" />.

That principle, **chemical amplification**, is what allows doses low enough to expose quickly and features fine enough for the following nodes. Without it, every reduction in wavelength would have demanded a larger dose — and lithography would have hit a productivity wall far earlier than it did.

In **EUV** the trade-off returns through thickness. Because extreme ultraviolet is absorbed by almost everything, the resist has to be **thinner** than in previous generations so the light passes through it and reaches the film to be patterned <Cite id="asianometry-euv" />. A thin resist protects the substrate less during etching — which pushes the problem to the next step of the flow.

## The mask, which is also optics

In DUV the mask is a quartz plate with chrome: light passes where the pattern is. In EUV that stops working, because no material is transparent at 13.5 nm, and the mask becomes a **multilayer mirror**, of the same kind as the scanner's mirrors <Cite id="asianometry-euv" />.

That changes the nature of a defect. A defect buried in a mask's multilayer cannot be repaired once the mask is finished: it replicates onto every wafer exposed with that mask, and the blank has to arrive **defect-free** for the mask to be usable <Cite id="asianometry-euv" />. It is the same logic as the quartz inputs: **the quality has to be in the incoming material**, because the next step does not fix it.

## The CMP slurry

[Chemical-mechanical planarisation](/en/fabricacao-wafers#polimento-quimico-mecanico-cmp) looks like polishing, and it is — with chemistry in the mix. The **slurry** is a suspension of abrasive particles in a solution that chemically attacks the surface, so the material is first weakened by reaction and then removed mechanically <Cite id="runnels-1994" />.

The design consequence is that slurry is **material-specific**: removing oxide without scratching copper, and the reverse, are different formulations. The history of the process, including the change of abrasives and the move from aluminium to copper, is in [in the fab](/en/na-fab) <Cite id="cmp-history" />.

## Gases and neon

DUV lithography excimer lasers need **neon** in the gas mixture, and recovering that gas became an engineering project inside the fab as its cost rose <Cite id="fabm-neon-2017" />.

The episode that exposed the dependency was the 2022 invasion of Ukraine. The country accounted for **about half** of world neon and **90%** of semiconductor-grade neon, produced as a by-product of steelmaking — and the interruption of the purification plants turned a gas nobody monitored into a supply-chain risk item <Cite id="fabm-neon-2022" />.

Worth keeping the shape, because it repeats: **a cheap input, barely visible, irreplaceable in the short term and produced as a by-product of another industry**. It is the same design as the Spruce Pine quartz and the Chinese share of polysilicon, both covered in [the chokepoint map](/en/gargalos).

## Ultrapure water

Water is, by volume, the most intimate input of a fab — and the easiest to underestimate, because "water" suggests an ordinary resource. The water that touches the wafer is **ultrapure** (UPW): resistivity around **18.2 MΩ·cm** at 25 °C and total organic carbon in the **parts per trillion** range <Cite id="fabm-upw" />.

The reason for those limits is the scale at which the fab works. Dissolved ions are, literally, **dopants** — sodium and potassium at the ppb level already shift a transistor's threshold voltage — and organic matter becomes a defect on the surface where the next layer has to grow. The upshot is that the water is produced and purified **on site**, with resistivity measured in line, because a specification like that does not survive transport.

## Why this list is a chokepoint

None of the inputs on this page is expensive per unit. All of them are hard to replace.

The reason is the same one that appears in [the chokepoint map](/en/gargalos): changing a materials supplier means **requalifying the entire process**, and a new resist or slurry means weeks of new recipe work, with uncertain yield, on a line that costs by the hour. The buyer therefore has a structural incentive not to switch — and the supplier, to remain the only one who knows how to formulate that product.

<SourceNote label="Sources" :ids="['fabm-ito-1983', 'asianometry-euv', 'runnels-1994', 'cmp-history', 'fabm-neon-2017', 'fabm-neon-2022', 'fabm-upw']" />

<SeeAlso title="See also" :links="[
  { text: 'The chokepoint map', href: '/en/gargalos', note: 'the concentration of each step' },
  { text: 'In the fab', href: '/en/na-fab', note: 'where each input enters the flow' },
  { text: 'Wafer fabrication', href: '/en/fabricacao-wafers', note: 'the crucible and CMP' },
  { text: 'References', href: '/en/referencias', note: 'numbered list' },
]" />
