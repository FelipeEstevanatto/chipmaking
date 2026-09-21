---
title: Wafer fabrication
description: From EG-Si polysilicon to a fab-ready wafer — Czochralski growth, slicing, CMP and RCA cleaning.
---

# Silicon wafer fabrication

Turning electronic-grade polysilicon ([EG-Si](/en/glossario)) into monocrystalline wafers requires a rigorous sequence of precision physical, chemical and mechanical processes. The primary goal is to produce ingots free of crystal defects and convert them into extremely flat wafers with atomic-level surface roughness. The eight steps below cover that sequence, from growing the crystal to final inspection.

## Crystal growth (Czochralski — CZ)

The **Czochralski** method is the dominant industrial standard <Cite id="zulehner-2000" />. Pieces of ultra-high-purity polysilicon are placed in a highly purified quartz crucible, inside a vacuum furnace under inert argon. The material is melted at about **1414 °C**. A crystallographically oriented seed crystal (usually &lt;100&gt; or &lt;111&gt;) is dipped into the surface of the molten silicon and slowly pulled upwards while rotating in the opposite direction to the crucible. By controlling the pull rate and temperature precisely, a cylindrical monocrystalline ingot (**boule**) is formed with diameters of **200 mm** or **300 mm** and a length greater than **1 m**.

<DiagramFigure src="/assets/czochralski-process.svg" alt="The Czochralski process in four frames: melting and doping the polysilicon in the crucible, introducing the seed crystal, the start of crystal growth, and pulling the ingot">
The Czochralski process in four frames: melting and doping, introducing the seed, the start of growth, and pulling the ingot. Twisp — <a href="https://commons.wikimedia.org/wiki/File:Czochralski_Process.svg" target="_blank" rel="noopener noreferrer">Czochralski Process</a> (public domain), Wikimedia Commons.
</DiagramFigure>

The principle has not changed since the industry's earliest years: an oriented seed crystal touches the surface of the liquid silicon and rises slowly, rotating against the crucible, while the ingot solidifies behind it.

<DiagramFigure src="/assets/silicon-czochralski-1956.jpg" alt="A silicon crystal being pulled from the crucible by the Czochralski process in 1956">
A silicon crystal being pulled at Raytheon in 1956, for the first silicon transistors. George E. Meyers — <a href="https://commons.wikimedia.org/wiki/File:Silicon_grown_by_Czochralski_process_1956.jpg" target="_blank" rel="noopener noreferrer">Silicon grown by Czochralski process, 1956</a> (public domain), Wikimedia Commons.
</DiagramFigure>

<DiagramFigure src="/assets/silicon-seed-crystal-rod.jpg" alt="A puller rod with the monocrystalline silicon seed crystal at its tip">
The puller rod: the mirror-like tip is the **seed** itself, a piece of monocrystalline silicon, and it is from this that the ingot inherits its crystal orientation. Warut Roonguthai — <a href="https://commons.wikimedia.org/wiki/File:Silicon_seed_crystal_puller_rod.jpg" target="_blank" rel="noopener noreferrer">Silicon seed crystal puller rod</a> (CC BY-SA 4.0), Wikimedia Commons.
</DiagramFigure>

### An accident with a pen

The method was born of a mistake. In **1916**, the Polish metallurgist **Jan Czochralski** was working in Berlin, measuring the crystallisation rate of metal alloys, when he absent-mindedly dipped his pen into the **crucible of molten tin** instead of the inkwell. Pulling it out, he saw a thin thread of solidified metal hanging from the nib <Cite id="iucr-czochralski" />.

He repeated the gesture deliberately, with several nibs, and noticed the thread formed every time — but not when he pulled quickly. He replaced the nib with glass capillaries and began controlling the extraction, obtaining threads of tin, zinc and lead about **1 mm in diameter** and up to **150 cm long** <Cite id="iucr-czochralski" />. The finding that made the experiment famous, however, came later: those threads were a **single crystal**, continuous from end to end — something contemporary physics could only obtain by costly, slow methods.

Czochralski published the method in 1918, two years late because of the war <Cite id="iucr-czochralski" />. Turning the technique into a semiconductor tool, though, was not his work.

### From germanium to silicon

On **1 October 1948**, **Gordon Teal** and **John Little** at Bell Labs assembled improvised equipment — mounted on wheels, so it could be hidden in a closet at the end of each night — and pulled the first **monocrystalline germanium** crystals <Cite id="nae-teal" /> <Cite id="chm-grown-junction" />. The gain was immediate: with no grain boundaries, minority carriers crossed the material without being trapped, and transistors became far more uniform. William Shockley called it "the most important scientific development in the semiconductor field in the early days" <Cite id="chm-grown-junction" />.

The next step was silicon, a far more hostile material. The melt has to be contained in a **quartz** crucible (graphite contaminates it) and pulled **under a controlled atmosphere**, because molten silicon oxidises on contact with air. Between **1951 and 1952**, Teal and technician **Ernest Buehler** solved both problems and announced the first silicon crystals and the first p-n junction grown inside one of them <Cite id="teal-buehler-1952" />. It is that arrangement — quartz, inert atmosphere, a rotating seed — that the industry still uses today.

## Ingot preparation and pre-machining

After cooling, the conical ends of the ingot (head and tail) are removed. The cylindrical body is ground to its exact diameter. The **orientation fiducial** is then produced — a **flat** at the smaller diameters or a **V-shaped notch** from 200 mm upwards — giving automated tools their crystallographic reference and, on small wafers, the doping type as well ([reading a wafer by its edge](/en/estrutura-wafers#reading-a-wafer-by-its-edge)) <Cite id="semi-m1" />.

<DiagramFigure src="/assets/silicon-crystal-boule.jpg" alt="A monocrystalline silicon ingot (boule) and silicon rods on display">
A monocrystalline ingot (*boule*) and silicon rods. Sebastian Wallroth — <a href="https://commons.wikimedia.org/wiki/File:Single-crystal_silicon_boule.jpg" target="_blank" rel="noopener noreferrer">Single-crystal silicon boule</a> (public domain), Wikimedia Commons.
</DiagramFigure>

## Wafer slicing

The ground ingot is **divided into blocks** and sliced using **diamond wire saws (DWS)** <Cite id="moller-2012" />. A parallel set of steel wires coated with diamond microparticles moves at very high speed under controlled tension, cutting hundreds of wafers simultaneously at typical thicknesses of **700–800 µm**, maximising yield and reducing **kerf** loss.

### From the inner-diameter saw to diamond wire

Slicing used to be the bottleneck of the chain, and its evolution has three stages.

Until the 1990s, the standard instrument was the **inner-diameter (ID) saw**: a thin disc with the abrasive on the *inner* face of a ring, which cut **one wafer at a time** and took several minutes per cut. The blade could flex or carry defects of its own, which transferred to the slice and had to be corrected later. Even so, it was the dominant technology through the last three decades of the 20th century <Cite id="pv-tech-dws" />.

The turning point came with the **multi-wire saw**. At first the wire cut nothing at all: it merely **carried** a slurry of **silicon carbide** in mineral oil — later, polyethylene glycol — to the ingot. It was the abrasive that wore the silicon away, by successive indentation. Because hundreds of wires run in parallel, every cut in an ingot comes out **at once**, unlike the ID saw, which sliced wafer by wafer. The substitution was gradual and tracked the fall in thickness: wire saws gained ground once slices went from **500 µm** downwards <Cite id="pv-tech-dws" />.

The third stage is under way. With **diamond wire**, the abrasive leaves the slurry and becomes **fixed to the wire itself** — steel coated with diamond. Throughput rises, kerf falls, the slice can be thinner, and the process does away with SiC slurry in favour of a water-based cutting fluid with a far smaller environmental footprint. In exchange, the wire costs more, breaks more easily and demands careful cleaning <Cite id="pv-tech-dws" />.

It is worth noting that, for fab wafers, the goal of slicing is not minimum thickness — it is **flatness**. A 300 mm slice comes out at 775 µm and will *lose* material in lapping and polishing precisely to guarantee parallelism and the absence of subsurface damage <Cite id="semi-m1" />. It is in photovoltaics, which accepts slices three times thinner, that kerf becomes the decisive economic variable — as seen in [Solar wafers](#solar-wafers-the-other-product-of-the-same-chain).

## Edge profiling and lapping

The edges of the sliced wafers are sharp and prone to mechanical chipping, so they go through **edge profiling** to prevent future cracks and particle shedding. Next, **lapping** with an abrasive slurry (alumina or silicon carbide) evens out thickness, improves surface parallelism and removes large irregularities left by the cut.

## Chemical etching

Mechanical lapping leaves residual stress and microcracks in the silicon's surface layer. Chemical **etching** removes this damaged layer without introducing new mechanical stress — using an acid solution (HF/HNO₃/CH₃COOH) for rapid dissolution of defects, or an alkaline solution (KOH/NaOH) for controlled anisotropic removal — leaving a chemically clean surface free of structural stress.

## Thermal treatment and RTP

**Thermal treatment** or **RTP (Rapid Thermal Processing)** eliminates the oxygen thermal donors created during Czochralski growth, equalises point defects and homogenises resistivity by rearranging impurities and dopants in the crystal lattice.

## Chemical-mechanical polishing (CMP)

**CMP** <Cite id="runnels-1994" /> is critical for [photolithography](/en/fotolitografia). The wafer is pressed against a rotating pad while an alkaline colloidal suspension of silica nanoparticles is injected: gentle chemical attack oxidises the surface while the mechanical abrasive removes the resulting oxide microscopically. The result is a mirror-like surface with sub-nanometre roughness.

The pad does not work unaided: it is continuously reconditioned by an abrasive disc that reopens the pores clogged by removed material and keeps the removal rate stable across thousands of wafers.

<DiagramFigure src="/assets/cmp-pad-conditioner.jpg" alt="A pad conditioner (Chiaping 108) used in chemical-mechanical polishing of wafers">
The CMP pad conditioner, which reopens the pad's pores between one wafer and the next. cpxmn — <a href="https://commons.wikimedia.org/wiki/File:Chemical-mechanical_polishing_(CMP-108,_conditioner).jpg" target="_blank" rel="noopener noreferrer">Chemical-mechanical polishing</a> (CC BY-SA 2.0), Wikimedia Commons.
</DiagramFigure>

<DiagramFigure src="/assets/silicon-wafer-300mm.jpg" alt="A 300 mm silicon wafer with a mirror-like surface">
The result: a 300 mm wafer with a mirror-like surface. Peellden — <a href="https://commons.wikimedia.org/wiki/File:12-inch_silicon_wafer.jpg" target="_blank" rel="noopener noreferrer">12-inch silicon wafer</a> (CC BY-SA 3.0), Wikimedia Commons.
</DiagramFigure>

## RCA cleaning and inspection

Standardised **RCA** cleaning <Cite id="kern-1990" />:

1. **RCA-1 (SC-1):** NH₄OH / H₂O₂ / H₂O at 70–80 °C — organic oxidation and particle removal.
2. **RCA-2 (SC-2):** HCl / H₂O₂ / H₂O at 70–80 °C — alkaline and heavy metals.

<DiagramFigure src="/assets/wet-bench.jpg" alt="A cleanroom wet bench with tanks for chemical etching">
The wet bench where etches and cleans happen: chemical tanks, exhaust, and cascade rinsing. KristianMolhave — <a href="https://commons.wikimedia.org/wiki/File:WetEtchBench.jpg" target="_blank" rel="noopener noreferrer">WetEtchBench</a> (CC BY 2.5), Wikimedia Commons.
</DiagramFigure>

After Marangoni or IPA drying, the wafers go through optical metrology (**Laser Surface Scanning System**) to detect surface defects and count particles. Finally, wafers that need special layers go through **epitaxial growth (EPI Growing)** by **CVD** before being vacuum-packed under a clean atmosphere (**cleanroom** class 1/10) for shipment to **fabs** (semiconductor foundries).

## Solar wafers: the other product of the same chain

Not every silicon wafer ends up in a fab. The photovoltaic industry consumes the same material under quite different rules — and the divergence starts with the choice of crystal <Cite id="saimm" />.

### Monocrystalline or multicrystalline

Electronics uses **single-crystal silicon exclusively**, because the quality requirements are far too strict to make exceptions. Photovoltaics uses **both** <Cite id="saimm" />.

**Multicrystalline** silicon delivers lower cell efficiency but costs less — and that trade-off is what explains its presence on the market <Cite id="saimm" />. Instead of pulling a cylindrical ingot, it is produced by **block casting** (the Bridgman process): silicon is melted in a crucible and the **crystal-liquid interface moves upward** as cooling is controlled <Cite id="saimm" />.

<DiagramFigure src="/assets/multicrystalline-silicon-wafer.jpg" alt="A multicrystalline silicon wafer with visible grain boundaries and the iridescence of a thin silicon nitride film">
The difference is visible to the naked eye: on a multicrystalline wafer the **grain boundaries** show up as a mosaic — something a monocrystalline wafer never does. Radiotrefoil — <a href="https://commons.wikimedia.org/wiki/File:Multicrystalline_silicon_wafer_with_thin_film_iridescence.jpg" target="_blank" rel="noopener noreferrer">Multicrystalline silicon wafer</a> (CC BY-SA 4.0), Wikimedia Commons.
</DiagramFigure>

The goal is **vertically aligned grains**, which avoids high thermal stress and reduces dislocation density. Since wafers are cut horizontally, this also guarantees consistent quality from wafer to wafer <Cite id="saimm" />. There is a purity bonus too: metal impurities are **pushed to the top of the ingot** as the crystal grows — a refinement that happens for free inside the crucible itself <Cite id="saimm" />. The crucible is made of **silica**, lined with **Si₃N₄** so the liquid silicon does not stick to the walls <Cite id="saimm" />.

The **Czochralski** process described above, by contrast, is a batch process taking about **two days per ingot** <Cite id="saimm" />.

### Thickness: where photovoltaics diverges

This is the most visible difference. Extracting the electrical power needs only about **100 µm of silicon** — light does not require more material than that <Cite id="saimm" />. In practice the photovoltaic industry works with wafers **below 200 µm** <Cite id="saimm" />, against the **700 to 800 µm** typical of fab wafers.

This is not just material savings: it is savings across an entire chain. The crystalline wafer accounts for **nearly half of the final module cost**, and the wafer manufacturing step for about **30%** of that cost <Cite id="saimm" />.

### Slicing and waste

Slicing uses **multi-wire saws**: a single stainless steel wire about **180 µm in diameter** and **several kilometres long** is drawn through the crystal in an abrasive slurry, forming a **wire web** between two coils <Cite id="saimm" />. The advantages are high throughput and the ability to cut thinner wafers <Cite id="saimm" />.

The cost of that is **kerf**: roughly **30% of the silicon is lost as saw dust** during cutting <Cite id="saimm" />. Before that, sectioning the ingot into blocks already discards more material — about **25% for monocrystalline ingots and 15% for multicrystalline** ones <Cite id="saimm" />. Monocrystalline cylinders are sectioned down to a cubic block; multicrystalline ones are cut to remove the **most contaminated peripheral regions** <Cite id="saimm" />.

### Wafers keep growing

The photovoltaic industry has migrated to larger areas over time: from the **10 × 10 cm²** standard to **12.5 × 12.5 cm²** and, more recently, **15.6 × 15.6 cm²** <Cite id="saimm" />. The driving force is simple: a larger cell means a **lower cost per watt-peak** <Cite id="saimm" />.

<SourceNote label="Sources" :ids="['zulehner-2000', 'moller-2012', 'runnels-1994', 'kern-1990', 'saimm', 'semi-m1', 'iucr-czochralski', 'nae-teal', 'chm-grown-junction', 'teal-buehler-1952', 'pv-tech-dws', 'asianometry-wafer']" />

## Videos

<YouTubeEmbed id="sIRfWyyOFPg" title="The Amazing, Humble Silicon Wafer (Asianometry)" />

<YouTubeEmbed id="skRmyhSOu28" title="Pulling a Czochralski ingot (UNSW)" />

<YouTubeEmbed id="Q5paWn7bFg4" title="From Sand To Silicon: The Making of a Chip (Intel)" />

<YouTubeEmbed id="xo-ir73TA_U" title="Ingot growth inside an LCT furnace (Linton Crystal Technologies)" />

<SeeAlso title="See also" :links="[
  { text: 'Crystal structure & wafer types', href: '/en/estrutura-wafers', note: 'reading a wafer by its edge' },
  { text: 'Polysilicon', href: '/en/polissilicio', note: 'the EG-Si raw material' },
  { text: 'References', href: '/en/referencias', note: 'papers [6]–[9]' },
]" />
