---
title: Solar cells and modules
description: >-
  From the silicon wafer to the photovoltaic cell: texturing, emitter,
  antireflection coating, metallisation and module assembly, with today's industry figures.
dataAsOf: 2026
---

# Solar cells and modules

A silicon wafer has two industrial destinations. One is the semiconductor **fab**, which runs through [photolithography](/en/fotolitografia) on its way to [transistors](/en/transistores). The other is the **photovoltaic cell line**, where the same material — multicrystalline and of lower purity — becomes the cell that turns light into electricity.

The crystalline silicon cell is by far the dominant technology: in **2023** it accounted for about **97%** of the photovoltaic market, against **3%** for thin-film technologies <Cite id="itrpv-2024" />. Within silicon, **monocrystalline Czochralski** dominates almost absolutely — multicrystalline wafers are no longer mass-produced <Cite id="itrpv-2024" />. The older figure that recurs through this chapter, **at least 80%**, comes from the 2011 survey by Xakalashe and Tangstad <Cite id="saimm" />.

## The seven steps of a cell

<DiagramFigure src="/assets/solar-cell.svg" alt="Cross-section of a crystalline silicon solar cell: silver front contacts, silicon nitride anti-reflection coating, phosphorus-doped n+ emitter, boron-doped p base, p+ back surface field and aluminium rear contact">
The finished cell in cross-section: the layers light crosses on its way to the p-n junction, and the two contacts that collect the current.
</DiagramFigure>

### Saw-damage removal

The wafer leaves the saw with a surface that has been **damaged and contaminated**. At the start of the process, **10 to 20 µm** are etched from both sides, typically with alkaline solutions, followed by a rinse in de-ionised water <Cite id="saimm" />.

### Texturing

After etching, the surface is mirror-like and **reflects more than 35% of the incident light**. Texturing solves this by creating roughness at the micrometre scale <Cite id="saimm" />.

On **monocrystalline** wafers, a weak solution of sodium and potassium hydroxide with isopropanol at **80 °C** attacks silicon **anisotropically** — different crystal planes react at different rates — producing **randomly distributed pyramids** that make light enter and bounce around instead of leaving <Cite id="saimm" />. On **multicrystalline** wafers this trick fails, because the orientation changes from grain to grain; there the texture is **mechanical** <Cite id="saimm" />. Either way, reflection drops **below 10%** <Cite id="saimm" />.

### Emitter diffusion (the p-n junction)

This is the step that turns a silicon slab into a device. The starting wafer is **p-type**; **phosphorus** (n-type) is introduced to form the **p-n junction** <Cite id="saimm" />. Which element provides that p-type doping, however, has changed — and that is the subject of the next subsection.

The process runs in a furnace at roughly **900 °C for about 30 minutes**, producing a penetration depth of **0.5 µm** — that shallow layer is what the figure shows as the emitter. The most common dopant source is **POCl₃**, though screen printing and chemical vapour deposition are also used <Cite id="saimm" />.

### The switch from boron to gallium

The starting wafer is **p-type**, and for decades that meant **boron-doped** <Cite id="saimm" />. Boron doping brings a defect that changed the dopant the industry uses.

Boron reacts with the **oxygen** dissolved in Cz silicon (the impurity the quartz crucible itself introduces, as covered in [wafer fabrication](/en/fabricacao-wafers#oxygen-and-carbon-what-the-crucible-dissolves)) and forms a recombination-active **boron–oxygen** complex. The defect activates under illumination and carrier injection, which is why the effect is known as **BO-LID** (*boron-oxygen light-induced degradation*) <Cite id="lid-hallam" />.

The theoretical loss reaches **10% relative** in efficiency. In the field it is about **3 to 4%** in Al-BSF cells and **4 to 6%** in PERC <Cite id="lid-hallam" />. That shows up as lower energy from the installed system.

The way out was to change the dopant. **Gallium** fills boron's role as acceptor but **does not form the complex with oxygen**, so the cell does not suffer BO-LID <Cite id="lid-hallam" />. The substitution was swift once the blocking patents expired in **2020**: the share of gallium-doped wafers jumped from about **10% in 2019 to over 95% in 2021**, and the ITRPV already recorded boron **disappearing** as a p-type dopant in **2023** <Cite id="ga-transition" />.

Gallium's **segregation coefficient** is only **0.008**, against 0.8 for boron, so resistivity varies a lot along one ingot and less of the piece is usable <Cite id="lid-hallam" />. That trade-off is described in [doping and the resistivity gradient](/en/fabricacao-wafers#doping-and-the-resistivity-gradient). Gallium-doped cells can still suffer **LeTID** (*light and elevated temperature induced degradation*), a hydrogen-related loss of up to **3% relative** power <Cite id="letid-ga" />.

The industry is also moving to **n-type**. In **2024** the ITRPV projected that n-type wafers would pass p-type and reach **69% of the market** by the end of that year <Cite id="itrpv-2024" />.

### Edge isolation

Diffusion from the gas phase forms an emitter over the wafer's **entire surface**, edges included. The result is a **short circuit (shunt)** between the n and p regions <Cite id="saimm" />.

To isolate the front emitter from the rear one, the industry uses **mechanical, laser cutting or plasma etching** techniques — the last being most associated with screen-printed cells. Wafers are stacked in a vacuum chamber and etched in a fluoride or oxide plasma, removing **2 to 5 µm** from the edges <Cite id="saimm" />.

### Anti-reflection coating

Reducing the front-surface reflectance is one of the most direct ways to gain efficiency. Materials with a **refractive index between 1.4 and 2.7** work as an anti-reflective coating on silicon <Cite id="saimm" />.

**Titanium dioxide** was the industrial choice for a long time. Today **silicon nitride deposited by PECVD** dominates, because it combines a near-optimal refractive index with an important bonus: it also **passivates the surface**, reducing recombination <Cite id="saimm" />.

### Metallisation

Contact formation affects practically every aspect of cell performance: short-circuit current, open-circuit voltage, series resistance, shunt resistance and fill factor <Cite id="saimm" />. And it carries a built-in trade-off — the front metal needs **low resistance while covering little area**, because every millimetre of silver is a millimetre that receives no light <Cite id="saimm" />.

The dominant technique is **screen printing**, in use since the beginning of the 1970s: **silver** paste on the front, **aluminium** paste on the rear, which alloys with the silicon to form both the contact and the back surface field. The pastes are dried in an oven at about **300 °C** <Cite id="saimm" />. It is a simple, fast, cheap process with little chemical waste <Cite id="saimm" />.

### Contact firing

The screen-printed contacts are born **on top of** the anti-reflection coating, which is an insulator. The cell then undergoes a short heat treatment, up to **900 °C**, in a belt-driven furnace <Cite id="saimm" />.

During firing, the coating undergoes **selective dissolution** and the contacts punch through it to reach the emitter, without penetrating too far into the silicon — a narrow process window. This is also where the **back surface field** forms with the aluminium <Cite id="saimm" />.

## From cell to module

A crystalline silicon cell produces about **0.5 V** — far too little for any practical use. Cells are therefore **interconnected in series** until they reach a useful voltage, then **encapsulated** for protection against moisture and mechanical impact. The assembly is the **module** (panel), which can be used on its own or integrated into a photovoltaic system <Cite id="saimm" />.

The **energy payback time** is **1 to 2 years**. Module lifetime is **25 to 30 years** <Cite id="saimm" />. After the panel has returned the energy used to make it, it still has most of its service life left.

## A history that starts before semiconductors

Photovoltaics is older than solid-state electronics. In **1839**, Alexandre-Edmond Becquerel observed that an electric current appeared in a silver-coated platinum electrode immersed in an electrolyte when it was exposed to light — the **photovoltaic effect** <Cite id="saimm" />. In **1876**, the same effect was demonstrated in an entirely solid-state system, using selenium and platinum contacts <Cite id="saimm" />.

The modern cell arrives in **1954**, at Bell Laboratories, with Chapin, Fuller and Pearson: silicon at **6% efficiency** <Cite id="saimm" />. Earlier figures had been modest — between **0.1% and 0.5%** — which gives the measure of the leap. That same year a cadmium sulphide thin-film cell appeared with equivalent efficiency; in **1956** came RCA's gallium arsenide cells, also at 6%, by which point silicon had already reached **10%** <Cite id="saimm" />.

The first large-scale application was in space: in **1958** the United States launched the first satellite powered by solar cells, and they were silicon <Cite id="saimm" />.

## Silicon is not the ideal material

Silicon is an **indirect band gap** semiconductor: the conduction-band minimum and the valence-band maximum sit at different crystal momenta. Absorbing a photon is less likely than in a direct-gap material, and light travels farther into the wafer before it is absorbed <Cite id="saimm" />.

The consequence is material: **1 µm of gallium arsenide** (a direct band gap) absorbs what **100 µm of silicon** absorbs — two orders of magnitude apart <Cite id="saimm" />.

On top of that, the theoretical maximum efficiency occurs for band gaps between **1.4 and 1.6 eV**, and silicon sits **below** that range <Cite id="saimm" />. Cadmium telluride, which is direct and sits inside the optimum, is the second-largest in market share <Cite id="saimm" />.

So why does silicon dominate? For **historical and supply reasons**: the semiconductor industry had already built the capacity to produce ultra-high-purity silicon at large volumes <Cite id="saimm" />. Silicon's advantage is not in the atom, but in the industrial chain built around it.

## Scale, efficiency and cost

The industry figures at the time of the Xakalashe and Tangstad review give a sense of scale <Cite id="saimm" />:

- Solar cell production jumped from **1 GW (2004)** to **10 GW (2009)**, with crystalline silicon accounting for at least **80%**.
- Cumulative global photovoltaic capacity reached almost **40 GW** by the end of 2010.
- Efficiencies of up to **22%** were reported in industry.
- Cell prices were approaching **US$1 per watt-peak**; the cheapest crystalline silicon module was around **US$2/Wp**, while CdTe modules were already **below US$1/Wp**.

These are 2011 numbers and they aged fast — annual production today is measured in hundreds of gigawatts, not tens. But they show the shape of the contest that has defined photovoltaics since: silicon wins on scale and industrial chain, not on physics.

## Today's numbers

The Xakalashe and Tangstad survey is from 2011, and the section above keeps its figures because they describe the decade's turning point that explains today's photovoltaics. For the present, the annual reference is the Fraunhofer ISE report, which publishes the sector's price, efficiency and output in a new edition every year <Cite id="fraunhofer-pv-report" />.

A few numbers from the most recent report measure how much has changed:

- **Module price** keeps falling at a published learning rate: about **26.7%** for every **doubling of cumulative production** <Cite id="fraunhofer-pv-report" />.
- Commercial silicon module efficiency rose from about **17% to just under 25%** over ten years <Cite id="fraunhofer-pv-report" />.
- **Energy payback time** has fallen to about **1 year**, and the assumed system lifetime is about **20 years** <Cite id="fraunhofer-pv-report" />.
- The levelised cost of electricity from large solar plants is around **4 euro cents per kWh** <Cite id="fraunhofer-pv-report" />.

<ClientOnly>
  <DataChart chart="pv-efficiency" />
</ClientOnly>

The gap between the first bar in that chart and the last three is this chapter's contest in miniature: what you can buy today is silicon, and what promises the next jump is the perovskite-on-silicon **tandem**, which has already reached **35%** in the laboratory <Cite id="fraunhofer-pv-report" />. Single-cell records are in the comparative chart from [NREL](/en/referencias) <Cite id="nrel-efficiency" />.

Worth noting what that number means for the silicon chain. If the tandem takes hold, it does **not replace** the silicon wafer: it uses it as a substrate and adds a layer on top — which preserves the entire quartz-to-wafer path described on this site and raises the value per wafer.

<SourceNote label="Sources" :ids="['saimm', 'moller-2012', 'itrpv-2024', 'lid-hallam', 'ga-transition', 'letid-ga', 'fraunhofer-pv-report', 'nrel-efficiency']" />

<SeeAlso title="See also" :links="[
  { text: 'Wafer fabrication', href: '/en/fabricacao-wafers', note: 'where the wafer comes from' },
  { text: 'Polysilicon', href: '/en/polissilicio', note: 'solar grade, electronic grade and the UMG route' },
  { text: 'Mining & MG-Si', href: '/en/mineracao-mg-si', note: 'the submerged-arc furnace' },
  { text: 'References', href: '/en/referencias', note: 'numbered list' },
]" />
