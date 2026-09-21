---
title: Wafer fabrication
description: From EG-Si polysilicon to a fab-ready wafer — Czochralski growth, slicing, CMP and RCA cleaning.
---

# Silicon wafer fabrication

Turning electronic-grade polysilicon ([EG-Si](/en/glossario)) into monocrystalline wafers requires a rigorous sequence of precision physical, chemical and mechanical processes. The primary goal is to produce ingots free of crystal defects and convert them into extremely flat wafers with atomic-level surface roughness. The eight steps below cover that sequence, from growing the crystal to final inspection.

## Crystal growth (Czochralski — CZ)

The **Czochralski** method is the dominant industrial standard <Cite id="zulehner-2000" />. Pieces of ultra-high-purity polysilicon are placed in a highly purified quartz crucible, inside a vacuum furnace under inert argon. The material is melted above **1420 °C**. A crystallographically oriented seed crystal (usually &lt;100&gt; or &lt;111&gt;) is dipped into the surface of the molten silicon and slowly pulled upwards while rotating in the opposite direction to the crucible. By controlling the pull rate and temperature precisely, a cylindrical monocrystalline ingot (**boule**) is formed with diameters of **200 mm** or **300 mm** and a length greater than **1 m**.

## Ingot preparation and pre-machining

After cooling, the conical ends of the ingot (head and tail) are removed. The cylindrical body is ground to its exact diameter. In addition, a **flat** or a **notch** is produced along the ingot to indicate the exact crystal orientation and the silicon's doping during automated handling in later steps.

## Wafer slicing

The ground ingot is **divided into blocks** and sliced using **diamond wire saws (DWS)** <Cite id="moller-2012" />. A parallel set of steel wires coated with diamond microparticles moves at very high speed under controlled tension, cutting hundreds of wafers simultaneously at typical thicknesses of **700–800 µm**, maximising yield and reducing **kerf** loss.

## Edge profiling and lapping

The edges of the sliced wafers are sharp and prone to mechanical chipping, so they go through **edge profiling** to prevent future cracks and particle shedding. Next, **lapping** with an abrasive slurry (alumina or silicon carbide) evens out thickness, improves surface parallelism and removes large irregularities left by the cut.

## Chemical etching

Mechanical lapping leaves residual stress and microcracks in the silicon's surface layer. Chemical **etching** removes this damaged layer without introducing new mechanical stress — using an acid solution (HF/HNO₃/CH₃COOH) for rapid dissolution of defects, or an alkaline solution (KOH/NaOH) for controlled anisotropic removal — leaving a chemically clean surface free of structural stress.

## Thermal treatment and RTP

**Thermal treatment** or **RTP (Rapid Thermal Processing)** eliminates the oxygen thermal donors created during Czochralski growth, equalises point defects and homogenises resistivity by rearranging impurities and dopants in the crystal lattice.

## Chemical-mechanical polishing (CMP)

**CMP** <Cite id="runnels-1994" /> is critical for [photolithography](/en/fotolitografia). The wafer is pressed against a rotating pad while an alkaline colloidal suspension of silica nanoparticles is injected: gentle chemical attack oxidises the surface while the mechanical abrasive removes the resulting oxide microscopically. The result is a mirror-like surface with sub-nanometre roughness.

## RCA cleaning and inspection

Standardised **RCA** cleaning <Cite id="kern-1990" />:

1. **RCA-1 (SC-1):** NH₄OH / H₂O₂ / H₂O at 70–80 °C — organic oxidation and particle removal.
2. **RCA-2 (SC-2):** HCl / H₂O₂ / H₂O at 70–80 °C — alkaline and heavy metals.

After Marangoni or IPA drying, the wafers go through optical metrology (**Laser Surface Scanning System**) to detect surface defects and count particles. Finally, wafers that need special layers go through **epitaxial growth (EPI Growing)** by **CVD** before being vacuum-packed under a clean atmosphere (**cleanroom** class 1/10) for shipment to **fabs** (semiconductor foundries).

<SourceNote label="Sources" :ids="['zulehner-2000', 'moller-2012', 'runnels-1994', 'kern-1990']" />

<SeeAlso title="See also" :links="[
  { text: 'Crystal structure & wafer types', href: '/en/estrutura-wafers', note: 'crystal, Miller indices, doping' },
  { text: 'Polysilicon', href: '/en/polissilicio', note: 'the EG-Si raw material' },
  { text: 'References', href: '/en/referencias', note: 'papers [6]–[9]' },
]" />
