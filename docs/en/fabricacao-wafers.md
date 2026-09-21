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

### Oxygen and carbon: what the crucible dissolves

The quartz of the crucible is not inert. In contact with the molten silicon it slowly dissolves into the melt — and that is the origin of Cz silicon's dominant impurity, **oxygen**, present at concentrations far above any metallic contaminant: **[O] ≈ 5–10 × 10¹⁷ cm⁻³** and **[C] ≈ 5–10 × 10¹⁵ cm⁻³** <Cite id="pv-mfg-cz" />.

Oxygen's solubility in silicon falls by several orders of magnitude between the melting point and room temperature <Cite id="pv-mfg-cz" />. The crystal finishes the pull **supersaturated**, and on cooling the excess has to leave solution: the oxygen **precipitates** as SiO₂ particles.

The process cuts both ways. The precipitates are efficient traps for metals and act as **internal gettering** — a cleaning that happens inside the wafer itself <Cite id="pv-mfg-cz" />. But oxygen that stays interstitial, never precipitating, forms electrically active **thermal donors** that shift the measured resistivity. That is the defect the thermal treatment removes later, in the RTP step described below.

There is a third consequence, which shows up only in solar cells and is therefore treated in the [solar cell chapter](/en/celulas-solares): interstitial oxygen reacts with **boron** under illumination and forms a defect that degrades efficiency.

### Doping and the resistivity gradient

Doping an ingot is not the same as doping a homogeneous solution. The dopant **does not partition equally** between liquid and solid — each element has a **segregation coefficient** (k), and the crystal incorporates dopant in a different proportion as it grows. For the usual dopants, the values could hardly be more different <Cite id="lid-hallam" />:

| Dopant | Segregation coefficient (k) |
| --- | --- |
| Phosphorus (n-type) | ≈ 0.35 |
| Boron (p-type) | 0.8 |
| Gallium (p-type) | 0.008 |

With k < 1, the solid **rejects the dopant into the liquid**. As the melt shrinks while the ingot is pulled, the concentration in the liquid **rises** through the process — and the crystal solidifying behind it follows. The result is a **resistivity gradient**: the head of the ingot comes out more resistive than the tail <Cite id="pv-mfg-cz" />.

**Gallium** is the extreme case. With k = 0.008 it barely leaves the melt, and resistivity varies by an enormous factor along a single ingot — reducing the usable fraction of the piece <Cite id="lid-hallam" />. That is the price photovoltaics accepted when it swapped boron for gallium, as detailed in the [solar cell chapter](/en/celulas-solares).

### Process variants: RCz and CCz

Two variations attack precisely this uniformity problem.

In **RCz** (*Recharge Czochralski*), the crucible is **reloaded with polysilicon without being cooled, opened or dismantled** — a feeder introduces fresh material into the still-hot melt <Cite id="pv-mfg-cz" />. Because the furnace is no longer opened for every ingot, maintenance stops drop, the hot zone is less exposed to air and equipment life improves. The technique also reduces the abrupt thermal cycles that crack the crucible <Cite id="pv-mfg-cz" />.

In **CCz** (*Continuous Czochralski*), material is added **during** the pull, not between ingots. That allows much shallower crucibles — hence less contact with the quartz walls — and keeps the melt composition **constant**, producing ingots of uniform resistivity that are far longer, since the process is no longer limited to the initial melt volume <Cite id="pv-mfg-cz" />. The trade-off is that low-k impurities **build up** in the melt and contaminate the final part of the ingot. Because of that complexity, CCz remains restricted to a small scale <Cite id="pv-mfg-cz" />.

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

The edge a saw leaves behind is sharp and brittle. **Edge profiling** grinds a curved contour — a crown at the apex with a bevel on either side — so that stress spreads out instead of concentrating in a corner. Without it the edge chips during handling and transport and, worse, every crack becomes a source of particles that later return to the active surface; contouring the edge reduces exactly that chipping and also limits epitaxial edge crown and photoresist edge bead <Cite id="semi-mf928" />. On 300 mm wafers the standard asks for more: a **polished edge**, because the valleys left by grinding trap particles and even phosphorus that comes back to the surface during doping <Cite id="prostek-edge" /> <Cite id="semi-m1" />.

Then comes **lapping**: a batch of wafers is pressed between two metal plates rotating in opposite directions, with an alumina slurry injected between them. Because both faces are attacked at once, the operation corrects thickness, parallelism and the waviness left by the cut <Cite id="pei-2005" />.

<DiagramFigure src="/assets/wafer-edge-profile.svg" alt="Cross-section of a wafer edge: above, the sharp as-cut corner with a chip and microcracks; below, the rounded and polished profile with a crown at the apex and front and back bevels">
Edge profile. Above, the sharp corner the saw leaves behind: the corner concentrates stress, chips and holds microcracks. Below, the rounded profile — crown and bevels — which spreads the load over the whole contour and, once polished, offers no valleys to trap particles. Author's drawing, after SEMI M1 and SEMI MF928 <Cite id="semi-mf928" /> <Cite id="prostek-edge" />.
</DiagramFigure>

<DiagramFigure src="/assets/wafer-lapping.svg" alt="Double-side lapping: on the left, a cross-section with two plates rotating in opposite directions and abrasive slurry between them, with three wafers in the middle; on the right, a wavy wafer above and a wafer with parallel faces after lapping below">
Double-side lapping. On the left, the principle: the wafers sit coplanar between two plates that rotate in opposite directions, and the alumina slurry works both faces at the same time. On the right, what it buys — the waviness of the cut is gone and the faces are parallel. Author's drawing, after Pei et al. (2005) <Cite id="pei-2005" />.
</DiagramFigure>

Lapping has a cost, though: it is slow, consumes a great deal of abrasive, loads and unloads wafers by hand and leaves subsurface damage that must be removed afterwards. That is why modern lines replace it with **simultaneous double-side grinding (SDSG)**, in which a single wafer passes between two diamond cup wheels — higher throughput, fewer consumables, more automation and far less slurry to dispose of <Cite id="pei-2005" />.

## Chemical etching

Slicing and lapping leave a damaged layer — microfractures, strain and residual stress — reaching from a few to a few tens of micrometres below the surface. Chemical **etching** exists to erase it: no later polishing repairs a defect that is still buried under a mirror-like face.

The acid etch (HF + HNO₃ + CH₃COOH) is **isotropic** — it removes silicon at the same rate in every direction, ignoring crystal orientation — and is used precisely to strip the damaged layer left by slicing, chamfering and lapping, with removals of a few to a few tens of micrometres <Cite id="us-6346485" />. The alkaline etch (KOH or NaOH) depends on crystal orientation and yields flatter wafers, better back-side geometry and less risk of metal plating — advantages that led it to replace acid in damage removal on many production lines <Cite id="dyer-1989" />.

<DiagramFigure src="/assets/wafer-damage-etch.svg" alt="Two cross-sections on the same depth scale: on the left, the layer damaged by slicing and lapping with microcracks down to 20 micrometres; on the right, the same surface after etching, with the removed region marked in dashed outline">
Before and after the etch, on the same depth scale (in micrometres below the original surface). The acid etch eats the damaged silicon on both faces until the microcracked layer is gone; the alkaline etch does the same, but following the crystal orientation. Author's drawing, after US 6,346,485 and Dyer et al. (1989) <Cite id="us-6346485" /> <Cite id="dyer-1989" />.
</DiagramFigure>

## Thermal treatment and RTP

The oxygen dissolved in a Czochralski crystal is not inert. Held for hours at around **450 °C**, it forms small clusters that donate electrons — **thermal donors** — and pull the wafer's resistivity away from the value that was wanted. The treatment exists to undo that: a rapid anneal (**RTP**, *Rapid Thermal Processing*), with lamps taking the wafer to **800–1000 °C for about 10 seconds**, annihilates the thermal donors and restores the resistivity they had shifted <Cite id="tokuda-1989" /> <Cite id="stein-1986" />.

Choosing RTP over a furnace is not about temperature — it is about time. A furnace would take **hours** in the same range; in seconds the wafer gets the same effect on the donors without giving the boron and phosphorus already implanted any time to diffuse. It is this "temperature × time" product that the industry calls the **thermal budget** <Cite id="tokuda-1989" />.

<DiagramFigure src="/assets/rtp-thermal-budget.svg" alt="Two temperature-versus-time plots: on the left, a furnace ramping to a thousand degrees and holding for hours; on the right, RTP reaching the same temperature for about ten seconds, with a horizontal band marking the 450 degrees where thermal donors form">
Thermal budget. A furnace step is measured in hours; RTP is measured in seconds. Both pass through the same temperature range — and the band around 450 °C, shaded orange, is exactly where the Czochralski oxygen builds thermal donors. Author's drawing, after Tokuda et al. (1989) and Stein et al. (1986) <Cite id="tokuda-1989" /> <Cite id="stein-1986" />.
</DiagramFigure>

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

This is the most visible difference. Extracting the electrical power needs only about **100 µm of silicon** — light does not require more material than that <Cite id="saimm" />. In practice the photovoltaic industry works with wafers **below 200 µm** <Cite id="saimm" /> — and the 2023 standard was already **150 µm** for p-type monocrystalline wafers, with n-type wafers about **5 to 10 µm thinner** <Cite id="itrpv-2024" /> — against the **700 to 800 µm** typical of fab wafers.

This is not just material savings: it is savings across an entire chain. The crystalline wafer accounts for **nearly half of the final module cost**, and the wafer manufacturing step for about **30%** of that cost <Cite id="saimm" />.

### Slicing and waste

Slicing uses **multi-wire saws**: a single stainless steel wire about **180 µm in diameter** and **several kilometres long** is drawn through the crystal in an abrasive slurry, forming a **wire web** between two coils <Cite id="saimm" />. The advantages are high throughput and the ability to cut thinner wafers <Cite id="saimm" />.

The cost of that is **kerf**: roughly **30% of the silicon is lost as saw dust** during cutting <Cite id="saimm" />. Before that, sectioning the ingot into blocks already discards more material — about **25% for monocrystalline ingots and 15% for multicrystalline** ones <Cite id="saimm" />. Monocrystalline cylinders are sectioned down to a cubic block; multicrystalline ones are cut to remove the **most contaminated peripheral regions** <Cite id="saimm" />.

### Wafers keep growing

The photovoltaic industry has migrated to larger areas over time: from the **10 × 10 cm²** standard to **12.5 × 12.5 cm²** and, more recently, **15.6 × 15.6 cm²** <Cite id="saimm" />. The driving force is simple: a larger cell means a **lower cost per watt-peak** <Cite id="saimm" />.

<SourceNote label="Sources" :ids="['zulehner-2000', 'moller-2012', 'runnels-1994', 'kern-1990', 'saimm', 'semi-m1', 'iucr-czochralski', 'nae-teal', 'chm-grown-junction', 'teal-buehler-1952', 'pv-tech-dws', 'asianometry-wafer', 'pv-mfg-cz', 'lid-hallam', 'itrpv-2024']" />

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
