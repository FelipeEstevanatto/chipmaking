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

## Why silicon, and not germanium

The first transistors were not made of silicon but of **germanium** — the material Bardeen and Brattain used in 1947. The switch was not an aesthetic preference: three properties settled the contest <Cite id="ge-vs-si" />.

The first is the **band gap**. Germanium's is 0.7 eV; silicon's is 1.1 eV. A narrow gap means electron-hole pairs form thermally with little energy, and the material starts conducting on its own as it warms up. Germanium devices lost control at modest temperatures, whereas silicon ones operated hundreds of degrees higher, with far lower leakage currents <Cite id="ge-vs-si" />.

The second — and historically the decisive one — is the **native oxide**. Exposed to oxygen, silicon spontaneously forms a layer of **SiO₂** that is stable, insulating and insoluble in water, protecting the crystal's surface and serving as a diffusion mask during manufacturing. Germanium's oxide (**GeO₂**) is the opposite: thermally unstable and water-soluble, useless as protection. That difference is what made the **planar process** possible and, with it, the integrated circuit — and later the MOSFET itself, which depends on an SiO₂–Si interface with a very low density of surface states <Cite id="ge-vs-si" />.

The third is the most prosaic: silicon is **abundant** and therefore cheap, whereas germanium is rare <Cite id="ge-vs-si" />.

None of that made germanium useless: it returned as **SiGe**, straining the silicon lattice in advanced channels ([Transistor evolution](/en/transistores)) <Cite id="ge-vs-si" />. But the starting wafer is still silicon.

## Wafer types

We classify wafers by **size**, **purity**, **doping type** and **Miller indices** (the orientation of planes in the crystal lattice). The crystallographic orientation of silicon is verified by XRD and marked on the ingot (flat/notch) before processing in the fab.

## Reading a wafer by its edge

A round slice has no "up". Without a reference on the edge, nothing tells the tooling which way the crystal axes point — and that reference is what lets mask and lattice be aligned layer after layer. Every wafer therefore carries an **orientation fiducial**: a straight *flat* at the smaller diameters, or a **V-shaped notch** from 200 mm upwards <Cite id="semi-m1" />. Reading that fiducial is the most direct way to identify a wafer in your hand.

<DiagramFigure src="/assets/wafer-identification.svg" alt="Four wafers with flats showing the orientation and doping combinations (P 111 with no secondary flat, N 111 at 45 degrees, P 100 at 90 degrees, N 100 at 180 degrees) and, below, a 300 mm wafer with a notch, with a magnified detail of the 90 degree, 1.00 mm deep groove">
How the edge encodes orientation — and, on smaller wafers, doping type as well. Author's drawing, after SEMI M1 <Cite id="semi-m1" />.
</DiagramFigure>

### Flats: wafers up to 150 mm

These wafers carry **two** flats of different lengths. The **primary** flat, the longer one, sits at the bottom and is parallel to a {110} plane: it is the orientation reference. The **secondary** flat, the shorter one, exists on only some wafers — and its **angular position** is what reports orientation and doping type together <Cite id="semi-m1" />.

| Secondary flat angle | Type | Orientation |
| --- | --- | --- |
| none | P | &lt;111&gt; |
| 45° | N | &lt;111&gt; |
| 90° | P | &lt;100&gt; |
| 180° | N | &lt;100&gt; |

There is one exception for **150 mm** (100) N-type wafers: the secondary flat sits at **135°**, not 180°. The standard records the change with a date — it applies from 1 January 1990, and wafers made before that follow the older convention <Cite id="semi-m1" />.

### Notch: 200 mm and 300 mm

From 200 mm upwards the straight flat gives way to a single **V-shaped notch** with a 90° included angle. The reason is usable area: the straighter the edge, the fewer whole dies fit inside the circle. The dimensions are fixed by SEMI M1 <Cite id="semi-m1" />:

- depth of **1.00 mm** (+0.25 / −0.00);
- included angle of **90°** (+5 / −1);
- axis aligned to **&lt;110&gt;**, within **±1°**.

That is the notch's entire informational payload: **orientation**. The standard also defines 200 mm wafers *with* a flat, and those come explicitly **without** a secondary fiducial <Cite id="semi-m1" />. In other words, from 200 mm upwards the edge stops telling you whether the wafer is **P** or **N**. That information moves to the lot certificate or to the **laser mark on the back** (SEMI **T7** format, with an optional **A/N** field) <Cite id="semi-m1" />.

### What the diameter tells you

Diameter and thickness move together, because the slice has to stay stiff as it grows. Nominal SEMI M1 values, all with a **±20 µm** tolerance <Cite id="semi-m1" />:

| Diameter | Nominal thickness | Fiducial |
| --- | --- | --- |
| 100 mm | 525 µm | two flats |
| 125 mm | 625 µm | two flats |
| 150 mm | 675 µm | two flats |
| 200 mm | 725 µm | notch |
| 300 mm | 775 µm | notch |

The same standard caps thickness variation (**TTV**) at **10 µm** and the wafer's shape deviation — *bow* and *warp*. For 200 mm, M1 allows up to **65 µm** of bow and **75 µm** of warp; for 300 mm, bow is left open and warp is **100 µm** <Cite id="semi-m1" />. Supplier datasheets usually quote much tighter numbers, because the standard's limit is the floor a prime wafer must meet — not what the industry actually ships.

### 450 mm: the transition that never happened

The diameter stopped growing at 300 mm, and not for want of ambition. The logic is irrefutable: a 450 mm wafer has **2.25×** the area of a 300 mm one, which would multiply the number of dies per slice with almost no multiplication of processing cost.

The story actually began earlier, and with a different number. The first **400 mm** crystals were pulled in **1995**, and the plan was to continue at that size — but in 2000 the industry roadmap (ITRS) fixed the next generation at **450 mm**, not 400 <Cite id="eng-450mm" />. The plan called for pilot lines in 2012 and production between 2014 and 2016 <Cite id="eng-450mm" />.

In May 2008, **Intel, Samsung and TSMC** announced an agreement to pursue exactly that goal <Cite id="intel-450mm" />. On the other side of the table sat the equipment and wafer suppliers, who would have had to rebuild the entire installed base — and who saw no return in it. The **G450C** consortium was assembled in 2012, but Intel pulled its resources back in 2014 and the transition drifted to a halt <Cite id="eng-450mm" />.

The verdict that remains is economic, not technical: the move depended on the economies of scale outweighing the cost of rebuilding equipment, metrology and infrastructure, and that bill never added up <Cite id="eng-450mm" />. 300 mm remains the ceiling.

### Surface: virgin or processed

A **virgin**, polished wafer is a grey mirror. A wafer that has been through lithography shows an **iridescent** pattern, and the colours are neither paint nor oxidation: they are **thin-film interference** in the few-nanometre layers stacked on the slice, plus diffraction from the trace grid itself. Under strong light the die grid and the *scribe lines* are visible to the naked eye — which instantly separates a processed wafer from a blank test slice.

## Who makes the wafers

The wafer industry is one of the most concentrated oligopolies in the entire semiconductor chain, and it speaks with a Japanese accent. In Nikkei's annual market-share survey, **Shin-Etsu** ranks first with **26.3%** and **SUMCO** second with **17.8%** — **44.1%** combined, comfortably ahead of their nearest rivals <Cite id="nikkei-wafer-share" />.

One figure that circulates widely deserves a note: that the two hold "60% of the market". The survey data point to **44.1%** by units, and to just over half of **300 mm volume** <Cite id="nikkei-wafer-share" /> <Cite id="wafer-market" /> — not 60%. What is not in doubt is the concentration: the next three companies come from Taiwan, Germany and South Korea and together account for **31.9%** <Cite id="nikkei-wafer-share" />. The top five therefore supply roughly **three quarters** of everything.

There is no real room for a new entrant, and the barriers have been stacking up for decades: the crystal is hard to pull, the specification is unforgiving, and qualifying a supplier at a fab takes years.

The geography is just as telling. Most of that capacity sits in **Japan**, a legacy of the 1980s, when the big Japanese chemical companies invested in materials to serve their own domestic semiconductor industry <Cite id="nikkei-wafer-share" />. That creates a single point of failure — when an earthquake or a fire hits one of those plants, the global chain feels it <Cite id="asianometry-wafer" />.

## Doping

Doping introduces intentional impurities into an **intrinsic** semiconductor (one with no deliberate doping) to modulate its electrical, optical or structural properties, producing an **extrinsic** semiconductor.

- **Light doping:** ~1 dopant atom per 100 million silicon atoms.
- **Heavy doping:** ~1 per 10 thousand atoms.

A semiconductor with an equal number of excited electrons and holes (**n = p**) is **compensated** (behaving close to intrinsic in thermal equilibrium).

There is one case where the choice of dopant stops being a process detail and starts deciding the reliability of the product: in photovoltaics, boron reacts with the oxygen in Cz silicon and degrades the cell under illumination, which pushed the industry to replace it with **gallium** — covered in the [solar cells and modules](/en/celulas-solares) chapter.

<DiagramFigure src="/assets/silicon-doping-p-n.svg" alt="Intrinsic silicon, P-type (B) and N-type (Sb) doping">
P-type: a hole with boron (B). N-type: a fifth valence electron with antimony (Sb). VectorVoyager — <a href="https://commons.wikimedia.org/wiki/File:Silicon_doping_-_Type_P_and_N.svg" target="_blank" rel="noopener noreferrer">Silicon doping (P and N)</a> (CC BY-SA 4.0), SVG from Wikimedia Commons.
</DiagramFigure>

<SourceNote label="Sources" :ids="['ge-vs-si', 'semi-m1', 'nikkei-wafer-share', 'wafer-market', 'eng-450mm', 'intel-450mm', 'asianometry-wafer', 'lid-hallam']" />

<SeeAlso title="See also" :links="[
  { text: 'Wafer fabrication', href: '/en/fabricacao-wafers', note: '&lt;100&gt; / &lt;111&gt; orientation in CZ growth' },
  { text: 'Transistors', href: '/en/transistores', note: 'doping and ion implantation' },
]" />
