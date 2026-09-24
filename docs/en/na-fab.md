---
title: In the fab
description: >-
  The wafer stops being a blank disc and becomes a chip: oxidation, deposition,
  etching, implantation, polishing and metrology, repeated about a thousand times.
dataAsOf: 2025
---

# In the fab: how a wafer becomes a chip

At the end of [wafer fabrication](/en/fabricacao-wafers) there is a flawless, **empty** disc of silicon. It has the right purity, the right crystal orientation and a surface flat to within a nanometre. There is nothing inside it.

The [photolithography](/en/fotolitografia) chapter shows how a pattern is printed onto that disc. This one shows what happens **around** the printing — because lithography on its own builds nothing. It only opens the door; the other processes are what walk through it.

## A fab is a loop, not an assembly line

<DiagramFigure src="/assets/fab-loop.svg" alt="The wafer cycles repeatedly through seven modules — oxidation, deposition, lithography, etching, implantation, planarisation and metrology — accumulating about a thousand steps over roughly three months">
The wafer does not travel through the fab once: it goes round the same equipment dozens of times. Each lap adds a layer, erases part of it and measures the result.
</DiagramFigure>

The mental image of an assembly line — raw material in at one end, finished product out at the other — does not describe a semiconductor fab. The wafer is **processed in a loop**: it goes to lithography, back to a furnace, back to lithography, down to a plasma reactor, up again. That repetition is why the industry's numbers are so large.

An advanced process can have **600 to more than 1,000 steps**, with 5 nm flows quoted above **1,100** <Cite id="semieng-cycle-time" />. Hitachi High-Tech, which builds the inspection equipment, describes the same process as **400 to 600 steps** taking **one to two months** <Cite id="hitachi-metrology" />. Both counts coexist because they measure different things — one counts recipe steps, the other counts equipment visits — and because the boundary between "one step" and "one set of steps" is a convention, not physics.

The metric the industry actually plans with is different, and more useful: **days per mask layer**. The average sits between **1 and 1.5 days per layer**, and the best fabs reach **0.8 days** <Cite id="semieng-cycle-time" />. Because the mask count grows with the node, total time grows with it:

| Node | Mask layers | Approximate cycle time |
| --- | --- | --- |
| 28 nm | 40 to 50 | ~40 days |
| 14 / 10 nm | ~60 | ~60 days |
| 7 nm | 80 to 85 | 80 to 85 days |
| 5 nm | over 100 | — |

<Cite id="semieng-cycle-time" />

The standard lot is **25 wafers** <Cite id="semieng-cycle-time" />, and that is how a fab thinks: not in loose wafers but in lots that travel together and are sometimes **reshuffled** between each other to level the load on the equipment.

### The honest count of exposures

There is a line that circulates widely in presentations — "a wafer goes through lithography about 50 to 80 times" — and it **has no clear primary source**. What can be documented is more precise and less round: a **32/28 nm** flow used **38 lithography exposures**, **15 of them immersion**; a **22/20 nm** flow used **52 exposures**, with **31 immersion** and **11 multi-patterning steps** <Cite id="semieng-litho-layers" />.

The practical conclusion is the same — it is **dozens** of round trips, not one — but the exact number depends on the node and the manufacturer. When someone quotes a round number, it is worth asking where it came from.

### The three zones of a chip

A leading-edge logic flow is divided into three regions, and the distinction matters because the equipment and the temperatures differ <Cite id="imec-roadmap" />:

- **FEOL** (*front-end-of-line*): builds the transistors. It covers isolation between devices, well formation, the gate module and the source and drain.
- **MOL** (*middle-of-line*): makes the contacts that connect the transistor to the first metal level.
- **BEOL** (*back-end-of-line*): builds the staircase of metal wires that ties everything together.

The FEOL runs hot, because it is still forming crystal and doping. The BEOL runs cold, because from the first metal level onward any excess heat ruins what is already finished. That is why the FEOL → BEOL transition in [photolithography](/en/fotolitografia) has to happen inside a tight thermal budget.

## Thermal oxidation: silicon growing its own insulator

Before anything else, silicon needs an insulator. And it is not given one: it **grows** one. The surface is exposed to oxygen or water vapour at high temperature and the silicon itself converts into **silicon dioxide**.

This is an advantage almost no other semiconductor has. Germanium, the first transistor material, was abandoned in large part because it **does not form a stable native oxide**. It is the quality of that interface — a defect density low enough not to swallow the transistor — that makes SiO₂ work as a gate insulator, and it is what germanium lacks <Cite id="ecs-sio2-limits" />.

The model that describes the growth dates from **1965**, by Deal and Grove, and it is still taught: in compact notation,

\[ x_0^2 + A\,x_0 = B\,(t + \tau) \]

where \(x_0\) is the oxide thickness. The model has two regimes, and the reason is intuitive: while the oxide is thin, the oxidant reaches the surface quickly and the **reaction** dominates — growth is **linear** in time. As the oxide thickens, the oxidant has to **diffuse** through it, and diffusion dominates — growth becomes **parabolic**, meaning it slows down <Cite id="deal-grove-1965" />.

The fit of the original model is excellent over a range stated explicitly in the paper: **700 to 1,300 °C**, **0.1 to 1.0 atm**, and thicknesses from **300 to 20,000 Å**, for both oxidants <Cite id="deal-grove-1965" />. Note that this is the range over which the model was **validated** — not a process recipe. Quoting "800 to 1,200 °C" as an oxidation temperature is common, but the verifiable figure is the one in the paper.

### Dry versus wet

The two oxidants are not equivalent. **Water vapour** penetrates the oxide far better than molecular oxygen: the solubility of water in SiO₂ at 1,000 °C is about **600 times** that of O₂ <Cite id="tu-wien-oxidation" />. Wet oxidation is therefore much faster — reaching **hundreds of nanometres per hour** — and is used for **thick oxides**: isolation, masks, passivation.

The **dry** oxidant is slow but produces a better-quality oxide with a cleaner interface. It is the oxidant of the layer that matters most: the **gate**.

### Gate oxide and the 1.2 nm wall

Here is one of the best-documented transitions in transistor history. Thirty years before 2005, the gate oxide was **120 nm**. By 2005 it was **1.2 nm** — a reduction of two orders of magnitude <Cite id="ecs-sio2-limits" />.

The reason is direct: the gate oxide separates the gate from the channel, and the thinner it is, the stronger the electrostatic control. But there comes a point where it stops being an insulator. **Direct tunnelling current** grows exponentially as thickness falls, and the practical limit appears around **3 nm**. At **1.2 nm**, the leakage current reaches **~100 A/cm² at 1 V** <Cite id="ecs-sio2-limits" /> — absurd for a device built to draw almost nothing at rest.

The ultimate limit of SiO₂ is near **0.7 nm**, or **two atomic layers** <Cite id="ecs-sio2-limits" />. That wall is what forced the replacement of silicon dioxide with **high-k dielectrics**, which achieve the same capacitance in a physically thicker layer, starting at the 45 nm node. It is the same logic that later took the transistor from planar to FinFET and then to [gate-all-around](/en/transistores).

## Deposition: putting material where there was none

If oxidation **consumes** silicon, deposition **adds** material. It is the baker's problem with the cake: the difficulty is not only laying down the layer, it is laying it down with the right thickness **on every surface**, including the sidewalls and the bottom of trenches that keep getting narrower.

<DiagramFigure src="/assets/deposition-step-coverage.svg" alt="Three cross-sections of the same trench filled by PVD, CVD and ALD: sputtering leaves the bottom almost bare, CVD covers everything but thickens at the mouth, and ALD deposits the same thickness on the bottom and the walls">
The difference between the methods is not the thickness they can achieve: it is the thickness they can achieve **at the bottom** of the trench.
</DiagramFigure>

- **CVD** (*chemical vapour deposition*): gaseous precursors react at the wafer surface and form the film. This is the general-purpose method.
- **PECVD** (*plasma-enhanced*): the same idea, but with a plasma to **lower the temperature**. The plasma ionises the species and reduces the reaction barrier, allowing deposition with good film quality at much lower temperatures — essential in the BEOL, where the wafer can no longer be heated <Cite id="lam-ald" />.
- **LPCVD** (*low pressure*): low pressure for better uniformity and conformality; the typical method for polysilicon and nitride.
- **PVD** (*physical vapour deposition*) or **sputtering**: not a chemical reaction but **bombardment**. Accelerated argon ions knock atoms off a target, and those atoms land on the wafer. The process is directional, and that is exactly why it covers sidewalls poorly.

### Why ALD became indispensable

**ALD** (*atomic layer deposition*) solves the problem elegantly: instead of controlling how much material arrives, it lays down **one atomic layer at a time** and then **stops by itself**. Each cycle has two chemical reaction steps in which the precursor reacts until it **exhausts the available surface sites**; after that, no matter how much extra precursor you feed, nothing more deposits <Cite id="amat-ald" />.

The result is that thickness depends **only on the number of cycles**, not on time, flow rate or temperature <Cite id="amat-ald" />. And because each cycle covers everything exposed, the thickness is the same on top, on the wall and at the bottom — including in very deep structures. ASM reports gap-filling structures with **aspect ratios greater than 100:1**, a technology selected for several 3D NAND applications <Cite id="asm-ald-gapfill" />.

The price is slowness: growth per cycle is on the order of **0.1 nm**, and a full cycle including purges takes seconds <Cite id="yim-ald-gpc" />. Thick deposits are not made by ALD. What is made by ALD is whatever must be thin, exact and conformal — high-k gate oxides, diffusion barriers and the spacers of leading-edge transistors <Cite id="amat-trillium" />.

## Etching: removing material on purpose

Depositing and then etching is the pair that gives a chip its shape. Lithography defines **where**; etching defines **what is left**.

<DiagramFigure src="/assets/etch-anisotropy.svg" alt="The same mask opening under three chemistries: a wet etch is isotropic and undercuts the mask, RIE is directional and leaves near-vertical walls, and the Bosch DRIE process cuts narrow, deep trenches">
The mask sets the width; the chemistry sets the shape. An isotropic etch widens the hole underneath the mask itself.
</DiagramFigure>

The central difference is **direction**. A **wet** etch, in solution, removes material at the same rate in every direction — it is **isotropic** — and therefore also etches **underneath the mask**, opening the profile beyond what lithography drew. A **dry** etch, in plasma, is **directional**: ions are accelerated at the wafer and attack preferentially downward.

**RIE** (*reactive ion etching*) is the technique that combines both and dominates the industry. It uses simultaneously the **chemical reactivity** of the plasma, which removes material quickly, and **ion bombardment**, which provides direction. The ions arrive perpendicular because the wafer sits on the electrode carrying the highest voltage, and that combination is what produces near-vertical walls <Cite id="mks-rie" />.

### Selectivity: etching the target without etching the rest

No etch process is perfectly selective. **Selectivity** measures the ratio between the etch rate of the intended material and that of the material that must **not** be removed — usually the mask or the layer underneath.

In **DRIE** (*deep reactive ion etching*), which uses the so-called **Bosch process** of alternating an etch step and a passivation step, the numbers are striking: a **photoresist** mask withstands a selectivity of **150:1** and an **oxide** mask, **450:1** <Cite id="bosch-drie" />. That is what allows cutting more than 400 µm of silicon with a mask a few micrometres thick. The same process reaches **80:1 aspect ratio in capability**, **60:1 in development** and **40:1 in mass production** <Cite id="bosch-drie" /> — and it is what fabricates 3D NAND trenches and MEMS structures.

### The final refinement: ALE

There is a limit to what can be controlled by lowering pressure and raising directionality. Once critical dimensions are measured in a few nanometres and films are **2 or 3 nm** thick, a continuous process becomes too coarse: there is no way to stop halfway through an atomic layer.

**ALE** (*atomic layer etching*) applies to etching the same idea as ALD: a **self-limiting** cycle with two steps — one that **modifies** the surface and one that **removes only the modified layer** <Cite id="ale-overview" />. There is even an "ion energy window": enough energy to remove the modified layer, but **below** the sputtering threshold of the bulk material. Outside that window the process stops being self-limiting <Cite id="ale-overview" />.

It is the technology that lets equipment makers promise removal of "a few atomic layers per cycle" <Cite id="lam-etch" /> — and it is what makes possible the etching of leading-edge transistors, where missing by a nanometre is missing the device.

## Ion implantation: doping by force

Doping silicon means introducing atoms of another element into the crystal lattice to change its conductivity. For decades this was done by **diffusion** — exposing the wafer to a dopant gas at high temperature and letting the atoms spread. Diffusion works, but it is hard to control: the resulting profile depends on temperature and time in a coupled way, with no way to be precise.

**Ion implantation** solves this by **shooting** the atoms in. Ions are accelerated to high energies and literally penetrate the silicon, stopping at a depth that depends on the **beam energy**; the amount that enters is the **dose**, measured directly as electrical current <Cite id="cityu-implant" />. The two variables become **independent** — which is why the method became dominant.

The ranges are wide. Energies run from **a few hundred eV to several MeV**, placing ions from **under 10 nm** to about **10 µm** deep. Doses run from **10¹¹ cm⁻²**, to adjust the transistor threshold voltage, up to **10¹⁸ cm⁻²**, to form buried dielectric layers <Cite id="cityu-implant" />.

<DiagramFigure src="/assets/implant-profile.svg" alt="On the left, the ion beam tilted seven degrees from vertical over the crystal lattice; on the right, two concentration-versus-depth profiles, one untilted with a deep tail and one at seven degrees that is much narrower">
The wafer is tilted deliberately. Without it, some ions slide down the open channels of the crystal and end up much deeper than they should.
</DiagramFigure>

### Channelling and the 7° tilt

The silicon lattice is not a uniform obstacle. Viewed along certain directions there are **channels** — empty corridors between rows of atoms — down which an ion travels almost without colliding. This is **channelling**, and it ruins the profile: a **deep tail** appears, made of ions that went far beyond the intended depth.

The industrial fix is almost banal in its simplicity: **tilt the wafer about 7° relative to the beam** <Cite id="cityu-implant" />. No ion then enters aligned with a channel, and the profile stays narrow and predictable. In practice **8 to 9° of tilt with 30° of rotation** are used, and the values also depend on beam current <Cite id="implant-dose-rate" />.

### How many implants a chip has

The number grew with complexity. A simple MOS transistor in the 1970s needed **6 to 8 implants**. A modern CMOS with embedded memory can reach **35** <Cite id="axcelis-implant" />. And they are not rare: a large fab processes up to **50,000 wafers per month**, with **20 to 30 implants per wafer** — which requires about **20 implanters** running in parallel <Cite id="axcelis-implant" />.

It is worth noticing what that means at scale. Each implant is a complete round trip: lithography, implantation, photoresist strip, and usually a metrology check. This kind of counting is what pushes the total step count into the thousands.

### Damage and cure

Implanting ions at high energy **destroys the crystal lattice** along the way: silicon atoms are knocked out of position. The material becomes amorphous, and a transistor does not work in amorphous silicon.

The cure is thermal. An **anneal** restores crystal order and, at the same time, electrically activates the dopants, which must occupy substitutional sites in the lattice to work. The catch is the thermal budget: the anneal must be hot enough to repair the crystal and **short enough** not to spread the dopants that were just placed with such precision.

That tension is what led to rapid thermal processing — **RTP** — and, more recently, to laser anneals measured in **milliseconds**. The shallower the profile you want, the shorter the pulse has to be.

## Planarisation: erasing the relief

After a few layers, the wafer surface stops being flat. Every deposition and every etch leaves steps, and the steps accumulate.

That would be a cosmetic problem if lithography were not **photographic**. A projection system has a finite **depth of focus**: outside it, the image is blurred. With a bumpy wafer, parts of the field fall outside it and critical dimensions come out wrong <Cite id="cmp-depth-of-focus" />.

The solution is **CMP** (*chemical mechanical planarization*), which does exactly what the name says: it combines **chemical** attack from a slurry with **mechanical** wear from a rotating pad. The wafer is pressed against a spinning pad with a **slurry** of abrasive particles and reagents, and the relief is worn away <Cite id="amat-cmp" />.

CMP entered production in the **1980s**, at IBM, to planarise the dielectric between metal levels. It was widely adopted when the critical dimension reached **0.35 µm**, the point at which the alternatives — reflowed glass, reverse etch, spin-on glass — could no longer meet the requirement <Cite id="cmp-history" />. A CMP step can take **little more than 60 seconds**, including the post-polish clean <Cite id="amat-cmp" />.

The characteristic defects of CMP have names and are easy to picture. In **wide** metal areas the material sinks: that is **dishing**. In **dense** areas the dielectric between wires wears faster than the metal: that is **erosion** <Cite id="cmp-history" />. Both get worse with overpolishing, and both degrade the lithography of the next layer.

## Metrology: measuring so you can continue

None of the steps above finishes without a measurement. KLA, which builds inspection equipment, describes the arrangement in one sentence: **most process steps have some metrology or inspection associated with them** <Cite id="kla-msa" />.

The distinction between the two functions is worth keeping:

- **Metrology** measures what **is there** — thickness, width, alignment.
- **Inspection** looks for what **should not be there** — particles, scratches, defects <Cite id="kla-msa" />.

Measuring everything would be impractical, so sampling is done per lot. Metrology typically runs on **100% of lots, but only 2 to 5 wafers of each lot**; defect inspection runs on **10 to 33% of lots**, with **1 to 5 wafers** <Cite id="kla-msa" />. The four main measurement types are **overlay**, **film thickness**, **critical dimension** and **wafer shape** <Cite id="kla-msa" />.

Two techniques deserve a name. **CD-SEM** uses an electron beam to measure a line's width at nanometre resolution — it is what answers "did the gate come out the width the drawing asked for?" And **spectroscopic ellipsometry** measures thickness **without touching** the wafer, and **indirectly**: rather than measuring thickness, it measures how light changes polarisation on reflection, and solves for thickness by model <Cite id="horiba-ellipsometry" />. It is the standard method for ultrathin films, from a few ångströms to tens of micrometres, and for multilayer stacks <Cite id="horiba-ellipsometry" />.

### The control loop

There is one detail that separates a semiconductor fab from an ordinary factory: the measurement is **not there only to reject**. It goes back into the process.

**SPC** (*statistical process control*) monitors the process and **raises the alarm** when it shifts or drifts. But SPC only watches: it triggers an alert. What **closes the loop** is **run-to-run control**: comparing the post-process measurement against the process model, updating that model — typically with an exponential moving average — and **computing a bounded recipe adjustment** for the following wafers <Cite id="r2r-control" />.

In the paper that consolidated the technique, the authors distinguish two modes: a **rapid** one for sudden shifts and a **gradual** one for slow drifts <Cite id="r2r-control" />. It is this feedback mesh that allows a process with a tolerance of a few nanometres to stay stable for months without human intervention on every lot.

## Interconnection: the part of the chip nobody sees

The transistor is the famous part, but it occupies a small fraction of the volume of a modern chip. Above it sits a **city of wires** — the BEOL — distributing signal, power and clock to billions of devices across dozens of stacked levels.

For a long time those wires were **aluminium**. In **September 1997**, IBM announced the first manufacturable integrated **copper** interconnect technology, and began shipping product in 1998 <Cite id="ibm-copper" />. The gain was not cosmetic: copper conducts about **twice** as well as aluminium, with wire resistance about **40 to 45% lower**, and **electromigration** lifetime more than **two orders of magnitude** longer <Cite id="ibm-cu-electroplating" />.

The reason for the switch became clear in the same period. As wires grew thinner and closer together, the **RC time constant** of the wire grew while the intrinsic delay of the transistor fell. Around **0.25 µm** the two curves crossed: the **wire became slower than the gate** <Cite id="mpr-rc-limits" />. The ITRS itself recorded the problem, noting that RC delay had come to be dominated by **global interconnect** and that changing materials alone was not enough <Cite id="itrs-interconnect" />.

### Damascene: how a copper wire is made

Copper has one practical drawback: **it is hard to etch**. Without etching, there is no way to carve the wire out of the metal. The industry got around this by **reversing the order**.

Instead of carving the metal, you carve the **mould** and pour the metal into it:

<DiagramFigure src="/assets/copper-damascene.svg" alt="Four cross-sections of the damascene process: trench and via opened in the dielectric, barrier and seed layer deposited, copper electroplated from the bottom up, and finally the polish that removes the overburden">
The name comes from *damascene* metalwork, in which metal is inlaid into grooves cut into the material. The principle is the same.
</DiagramFigure>

The electrolyte is formulated so that copper grows **bottom-up**, closing the via before the mouth of the trench closes — otherwise a void would be left in the middle of the contact <Cite id="ibm-cu-electroplating" />. Then **CMP** removes the copper deposited above the trench, and the surface is flat again. That is why CMP and copper arrived together: neither closes the cycle without the other.

### Low-k and the price of proximity

Changing the metal solves half the problem. The other half is on the far side of the capacitor that every pair of wires forms: the **dielectric between them**.

SiO₂ has a dielectric constant around **4.0**. Lowering it reduces capacitance and, with it, delay. The alternatives used in industry range from **SiOF** (k ≈ 3.5 to 3.8) and **SiCOH** (k ≈ 2.2 to 3.2) to the extreme: **air**, with k = **1.0** <Cite id="cu-interconnect-review" />. Hence the name **air gap** for architectures that leave deliberate voids between wires.

Measurements on air-gap structures find effective k around **2.2** <Cite id="air-gap-keff" />, and technologies reaching **more than 75% void fraction** achieve effective k **below 2.1** <Cite id="hollow-airgap" />. That is a considerable gain — and a considerable mechanical problem, because a structure that is 75% air has very little material to support the stack.

### How many metal levels

The number grew, and it is larger than intuition suggests. imec describes BEOL stacks with **up to 15 layers**, with **3 to 6** being the thin "Mx" levels <Cite id="imec-roadmap" />. Physical analysis of real products goes further: the **TSMC N3** die used in Lunar Lake has **20 metal interconnection layers** <Cite id="techinsights-n3-beol" />.

Each of those layers has its own lithography, its own CMP and its own metrology. It is this multiplication, not the transistor, that pushes the step count into the thousands.

## Yield: the number that decides whether a product exists

Of everything measured in a fab, one number decides more than the others: **yield**, the fraction of dies that work.

The simplest model assumes defects are distributed randomly, in which case yield falls exponentially with area:

\[ Y = e^{-D_0 A} \]

where \(D_0\) is the defect density and \(A\) the die area <Cite id="leachman-yield" />. The model is good for small dies — the Berkeley reference considers it adequate up to about **0.25 cm²** — and conservative for large dies, which are precisely the ones that matter <Cite id="leachman-yield" />.

The first important refinement comes from **1964**, from B. T. Murphy at Bell Labs: defects are **not** distributed at random, they **cluster**. Treating the density as a random variable and integrating over its distribution gives Murphy's model <Cite id="murphy-1964" />. In practice the formulation the industry later adopted was the **negative binomial**, easier to manipulate and in better agreement with real data <Cite id="murphy-integral" />.

### Why yield takes months

The counterintuitive part is that yield is not **fixed** by an adjustment. It is **learned**.

The Competitive Semiconductor Manufacturing survey at Berkeley measured this across companies. For a **new** technology, the average process qualification time was **12 months**, with the best case at **7**. For a technology **similar to one already in production**, the average fell to **7 months**, with a best case of **4** <Cite id="berkeley-csm" />. And the gap between the average and the benchmark in yield ramp time was around **40%** <Cite id="berkeley-csm" />.

In other words: the competitive advantage is not in having the right recipe, it is in **reaching the right recipe faster**. It is a learning race, and half the value of a new fab lies in the speed at which it travels that curve.

<SourceNote label="Sources" :ids="['semieng-cycle-time', 'semieng-litho-layers', 'hitachi-metrology', 'imec-roadmap', 'deal-grove-1965', 'tu-wien-oxidation', 'ecs-sio2-limits', 'amat-ald', 'lam-ald', 'asm-ald-gapfill', 'yim-ald-gpc', 'amat-trillium', 'mks-rie', 'bosch-drie', 'lam-etch', 'ale-overview', 'cityu-implant', 'axcelis-implant', 'implant-dose-rate', 'cmp-depth-of-focus', 'cmp-history', 'amat-cmp', 'kla-msa', 'horiba-ellipsometry', 'r2r-control', 'ibm-copper', 'ibm-cu-electroplating', 'mpr-rc-limits', 'itrs-interconnect', 'cu-interconnect-review', 'air-gap-keff', 'hollow-airgap', 'techinsights-n3-beol', 'leachman-yield', 'murphy-1964', 'murphy-integral', 'berkeley-csm']" />

<SeeAlso title="See also" :links="[
  { text: 'Photolithography', href: '/en/fotolitografia', note: 'how the pattern is printed' },
  { text: 'Transistor evolution', href: '/en/transistores', note: 'what the FEOL builds' },
  { text: 'Packaging and test', href: '/en/empacotamento', note: 'what happens after the fab' },
  { text: 'Wafer fabrication', href: '/en/fabricacao-wafers', note: 'before the fab' },
  { text: 'References', href: '/en/referencias', note: 'numbered list' },
]" />
