---
title: Crystal structure & wafer types
description: Diamond cubic structure, Miller indices, wafer classification and P/N type doping.
---

# Crystal structure and wafer types

## Structure of pure silicon

Crystalline silicon adopts the **diamond cubic crystal structure**.

<DiagramFigure src="/pdf-images/p08-1.png" alt="Diamond cubic crystal structure">
The diamond cubic crystal structure.
</DiagramFigure>

<DiagramFigure src="/pdf-images/p08-2.png" alt="Silicon unit cell">
Crystallographic orientations (&lt;100&gt;, &lt;110&gt;, &lt;001&gt;) and the lattice constant a<sub>Si</sub>.
</DiagramFigure>

### Further reading

- [Crystal structure — YouTube](https://www.youtube.com/watch?v=lgYQE2aTNNc)
- [Wafer orientation and crystal structure — WaferPro](https://waferpro.com/understanding-silicon-wafer-orientation-and-crystal-structure/)
- [Miller indices — YouTube](https://www.youtube.com/watch?v=_A7oqoMFIiA)
- [Miller Indices (SVG) — Wikimedia](https://upload.wikimedia.org/wikipedia/commons/d/d5/Miller_Indices_Felix_Kling.svg) · [Commons page](https://commons.wikimedia.org/wiki/File:Miller_Indices_Felix_Kling.svg) (DeepKling, CC BY 3.0)

We can infer the crystal structure with **XRD (X-ray diffraction)** under controlled conditions (a clean, oriented sample). **Bragg's law** describes the reflection of X-rays by crystal planes and allows the lattice geometry to be determined — including in some partially crystalline materials or thin films when experimental resolution is sufficient.

### Miller indices

Indices that describe crystallographic directions and planes; planes can have **anisotropic** properties (dependent on direction).

<DiagramFigure src="/assets/miller-indices.svg" alt="Miller indices in a cubic structure">
DeepKling — <a href="https://commons.wikimedia.org/wiki/File:Miller_Indices_Felix_Kling.svg" target="_blank" rel="noopener noreferrer">Miller Indices</a> (CC BY 3.0), SVG from Wikimedia Commons.
</DiagramFigure>

## Wafer types

We classify wafers by **size**, **purity**, **doping type** and **Miller indices** (the orientation of planes in the crystal lattice). The crystallographic orientation of silicon is verified by XRD and marked on the ingot (flat/notch) before processing in the fab.

## Doping

Doping introduces intentional impurities into an **intrinsic** semiconductor (one with no deliberate doping) to modulate its electrical, optical or structural properties, producing an **extrinsic** semiconductor.

- **Light doping:** ~1 dopant atom per 100 million silicon atoms.
- **Heavy doping:** ~1 per 10 thousand atoms.

A semiconductor with an equal number of excited electrons and holes (**n = p**) is **compensated** (behaving close to intrinsic in thermal equilibrium).

<DiagramFigure src="/assets/silicon-doping-p-n.svg" alt="Intrinsic silicon, P-type (B) and N-type (Sb) doping">
P-type: a hole with boron (B). N-type: a fifth valence electron with antimony (Sb). VectorVoyager — <a href="https://commons.wikimedia.org/wiki/File:Silicon_doping_-_Type_P_and_N.svg" target="_blank" rel="noopener noreferrer">Silicon doping (P and N)</a> (CC BY-SA 4.0), SVG from Wikimedia Commons.
</DiagramFigure>

<SeeAlso title="See also" :links="[
  { text: 'Wafer fabrication', href: '/en/fabricacao-wafers', note: '&lt;100&gt; / &lt;111&gt; orientation in CZ growth' },
  { text: 'Transistors', href: '/en/transistores', note: 'doping and ion implantation' },
]" />
