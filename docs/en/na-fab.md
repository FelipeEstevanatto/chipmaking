---
title: In the fab
description: >-
  How a blank wafer becomes a chip: oxidation, deposition, etching, implantation,
  polishing and metrology, over 600 to more than 1,000 process steps.
dataAsOf: 2024
---

# In the fab: how a wafer becomes a chip

At the end of [wafer fabrication](/en/fabricacao-wafers) there is a blank disc of silicon with the right purity, the right crystal orientation and a surface flat to within a nanometre, and no devices on it yet.

The [photolithography](/en/fotolitografia) chapter shows how a pattern is printed onto that disc. This one covers the processes around the printing, which add the material, remove it, dope it and measure it.

## Fabrication is a loop

<DiagramFigure src="/assets/fab-loop.svg" alt="Seven numbered process modules (oxidation, deposition, lithography, etching, implantation, planarisation and metrology) arranged around a central lot-transport hub, each joined to it by a two-way arrow; the hub gives 600 to more than 1,100 steps and a cycle time of about 40 days at 28 nm to 80 to 85 days at 7 nm">
The seven modules, numbered in the order this chapter covers them. Lots travel between them through the fab's transport system, and the recipe decides the route, so a wafer returns to most modules dozens of times. Lithography is highlighted because it has its own chapter, and metrology because it measures the result. Author's diagram; the counts in the centre are those of the text below.
</DiagramFigure>

The loop has seven modules. Six of them have a section in this chapter, in the order the wafer visits them; the seventh, lithography, has [its own chapter](/en/fotolitografia), because that is where most of the difficulty of scaling sits:

1. [Thermal oxidation](#thermal-oxidation): silicon growing its own insulator.
2. [Deposition](#deposition): adding a film.
3. [Lithography](/en/fotolitografia): printing the pattern, in a separate chapter.
4. [Etching](#etching): removing material where the pattern is open.
5. [Ion implantation](#ion-implantation): placing dopants at a chosen depth.
6. [Planarisation](#planarisation): polishing the surface flat so the next layer can be printed.
7. [Metrology](#metrology): measuring the result and correcting the next wafers.

<ClientOnly>
  <FabProcess />
</ClientOnly>

Two sections outside the loop close the chapter: [interconnection](#interconnection), which builds the wiring, and [yield](#yield), which measures how many dies work.

The wafer is processed in a loop: it goes to lithography, back to a furnace, back to lithography, down to a plasma reactor, and up again. An advanced process can have 600 to more than 1,000 steps, with 5 nm flows quoted above 1,100 <Cite id="semieng-cycle-time" />. Hitachi High-Tech, which builds the inspection equipment, describes the same process as 400 to 600 steps taking one to two months <Cite id="hitachi-metrology" />. The two counts differ because they measure different things (one counts recipe steps, the other counts equipment visits), and where one step ends and the next begins is a convention.

Fabs plan with a different metric, days per mask layer. The average sits between 1 and 1.5 days per layer, and the best fabs reach 0.8 days <Cite id="semieng-cycle-time" />. Because the mask count grows with the node, total time grows with it:

| Node | Mask layers | Approximate cycle time |
| --- | --- | --- |
| 28 nm | 40 to 50 | ~40 days |
| 14 / 10 nm | ~60 | ~60 days |
| 7 nm | 80 to 85 | 80 to 85 days |
| 5 nm | over 100 | — |

<Cite id="semieng-cycle-time" />

Wafers travel in lots, and the standard lot is 25 wafers <Cite id="semieng-cycle-time" />. Lots are sometimes reshuffled between each other to level the load on the equipment.

<DiagramFigure src="/assets/wafer-cassette-200mm.jpg" alt="An empty dark plastic cassette for 200 mm wafers, with rows of parallel slots on both inner walls">
A cassette for 200 mm (8-inch) wafers: the parallel slots on each wall hold the wafers upright and apart. 邱鈺乾, <a href="https://commons.wikimedia.org/wiki/File:8_inch_cassette.JPG" target="_blank" rel="noopener noreferrer">8 inch cassette</a> (CC BY-SA 3.0), Wikimedia Commons.
</DiagramFigure>

Lithography is the module the wafer returns to most. A 32/28 nm flow used 38 lithography exposures, 15 of them immersion; a 22/20 nm flow used 52 exposures, with 31 immersion and 11 multi-patterning steps <Cite id="semieng-litho-layers" />. The exact count depends on the node and the manufacturer.

### The three zones of a chip

A leading-edge logic flow is divided into three regions, which use different equipment and different temperatures <Cite id="imec-roadmap" />:

- **FEOL** (*front-end-of-line*): builds the transistors. It covers isolation between devices, well formation, the gate module and the source and drain.
- **MOL** (*middle-of-line*): makes the contacts that connect the transistor to the first metal level.
- **BEOL** (*back-end-of-line*): builds the stack of metal wires that ties everything together.

The FEOL runs hot, because it is still forming crystal and doping. The BEOL runs cold, because from the first metal level onward excess heat ruins what is already finished. After the FEOL the thermal budget closes: the finished transistor and the first metal level no longer take those temperatures, so the rest of the flow, [photolithography](/en/fotolitografia) at each layer included, runs cold.

## Thermal oxidation

Silicon grows its own insulator. The surface is exposed to oxygen or water vapour at high temperature, and the silicon itself converts into silicon dioxide.

Almost no other semiconductor can do this. Germanium, the first transistor material, was abandoned in large part because it does not form a stable native oxide. The quality of the silicon interface (a defect density low enough not to swallow the transistor) is what makes SiO₂ work as a gate insulator, and it is what germanium lacks <Cite id="ecs-sio2-limits" />.

The growth model dates from 1965, by Deal and Grove, and it is still taught. In compact notation,

$$
x_0^2 + A\,x_0 = B\,(t + \tau)
$$

where $x_0$ is the oxide thickness. The model has two regimes. While the oxide is thin, the oxidant reaches the surface quickly and the reaction sets the pace, so growth is linear in time. As the oxide thickens, the oxidant has to diffuse through it, and growth becomes parabolic: it slows down <Cite id="deal-grove-1965" />.

The paper states the range over which the model fits: 700 to 1,300 °C, 0.1 to 1.0 atm, and thicknesses from 300 to 20,000 Å, for both oxidants <Cite id="deal-grove-1965" />. That is the range over which the model was validated; it is not a process recipe.

<ClientOnly>
  <DataChart chart="deal-grove-oxidation" />
</ClientOnly>

<ClientOnly>
  <OxidationExplorer />
</ClientOnly>

### Dry versus wet

Water vapour penetrates the oxide far better than molecular oxygen: the solubility of water in SiO₂ at 1,000 °C is about 600 times that of O₂ <Cite id="tu-wien-oxidation" />. Wet oxidation is therefore much faster, reaching hundreds of nanometres per hour, and is used for thick oxides: isolation, masks, passivation.

Dry oxidation is slow but produces a better oxide with a cleaner interface, so it is used for the gate oxide.

### Gate oxide and the 1.2 nm limit

Thirty years before 2005, the gate oxide was 120 nm thick. By 2005 it was 1.2 nm, a reduction of two orders of magnitude <Cite id="ecs-sio2-limits" />.

The gate oxide separates the gate from the channel, and the thinner it is, the stronger the gate's control over the channel. Below a certain thickness it stops insulating. Direct tunnelling current grows exponentially as thickness falls, and the practical limit appears around 3 nm. At 1.2 nm, the leakage current reaches ~100 A/cm² at 1 V <Cite id="ecs-sio2-limits" />, in a device meant to draw almost nothing at rest.

The ultimate limit of SiO₂ is near 0.7 nm, or two atomic layers <Cite id="ecs-sio2-limits" />. That limit forced the replacement of silicon dioxide with high-k dielectrics, which achieve the same capacitance in a physically thicker layer, starting at the 45 nm node. The same pressure on gate control later took the transistor from planar to FinFET and then to [gate-all-around](/en/transistores).

## Deposition

Oxidation consumes silicon; deposition adds material on top. The hard part is laying down a film of the right thickness on every surface, including the sidewalls and the bottom of trenches that keep getting narrower.

<DiagramFigure src="/assets/deposition-step-coverage.svg" alt="Three cross-sections of the same trench filled by PVD, CVD and ALD: sputtering leaves the bottom almost bare, CVD covers everything but thickens at the mouth, and ALD deposits the same thickness on the bottom and the walls">
The methods differ in how much film they leave at the bottom of the trench.
</DiagramFigure>

- **CVD** (*chemical vapour deposition*): gaseous precursors react at the wafer surface and form the film. This is the general-purpose method.
- **PECVD** (*plasma-enhanced*): the same reaction, with a plasma to lower the temperature. The plasma ionises the species and reduces the reaction barrier, so a good film can be deposited at much lower temperatures, which the BEOL needs because the wafer can no longer be heated <Cite id="lam-ald" />.
- **LPCVD** (*low pressure*): low pressure for better uniformity and conformality; the typical method for polysilicon and nitride.
- **PVD** (*physical vapour deposition*) or sputtering: accelerated argon ions knock atoms off a target, and those atoms land on the wafer. The atoms arrive from one direction, so sidewalls get little film.

### ALD

ALD (*atomic layer deposition*) lays down one atomic layer at a time and then stops by itself. Each cycle has two chemical reaction steps in which the precursor reacts until it exhausts the available surface sites; after that, extra precursor deposits nothing <Cite id="amat-ald" />.

Thickness therefore depends only on the number of cycles, not on time, flow rate or temperature <Cite id="amat-ald" />. Because each cycle covers everything exposed, the film is as thick on the wall and at the bottom as on top, including in very deep structures. ASM reports gap-filling structures with aspect ratios greater than 100:1, a technology selected for several 3D NAND applications <Cite id="asm-ald-gapfill" />.

ALD is slow. Growth per cycle is on the order of 0.1 nm, and a full cycle including purges takes seconds <Cite id="yim-ald-gpc" />. Thick films are made by other methods, and ALD is kept for what must be thin, exact and conformal: high-k gate oxides, diffusion barriers and the spacers of leading-edge transistors <Cite id="amat-trillium" />.

## Etching

Lithography decides where material goes; etching removes what the pattern leaves exposed.

<DiagramFigure src="/assets/etch-anisotropy.svg" alt="The same mask opening under three chemistries: a wet etch is isotropic and undercuts the mask, RIE is directional and leaves near-vertical walls, and the Bosch DRIE process cuts narrow, deep trenches">
The mask sets the width and the chemistry sets the shape. An isotropic etch widens the hole underneath the mask itself.
</DiagramFigure>

A wet etch, in solution, removes material at the same rate in every direction. It is isotropic, so it also etches underneath the mask and opens the profile beyond what lithography drew. A dry etch, in plasma, is directional: ions are accelerated at the wafer and attack preferentially downward.

RIE (*reactive ion etching*) combines both and dominates the industry. It uses the chemical reactivity of the plasma, which removes material quickly, together with ion bombardment, which gives the etch a direction. The ions arrive perpendicular because the wafer sits on the electrode carrying the highest voltage, and the combination produces near-vertical walls <Cite id="mks-rie" />.

### Selectivity

No etch is perfectly selective. **Selectivity** is the ratio between the etch rate of the intended material and that of the material that must stay, usually the mask or the layer underneath.

DRIE (*deep reactive ion etching*) uses the Bosch process, which alternates an etch step and a passivation step. A photoresist mask withstands a selectivity of 150:1 and an oxide mask 450:1 <Cite id="bosch-drie" />, enough to cut more than 400 µm of silicon under a mask a few micrometres thick. The same process reaches an aspect ratio of 80:1 in capability, 60:1 in development and 40:1 in mass production <Cite id="bosch-drie" />, and it cuts 3D NAND trenches and MEMS structures.

### ALE

Lower pressure and more directional ions only go so far. Once critical dimensions are a few nanometres and films are 2 or 3 nm thick, a continuous process cannot stop halfway through an atomic layer.

ALE (*atomic layer etching*) applies the idea of ALD to etching: a self-limiting cycle with two steps, one that modifies the surface and one that removes only the modified layer <Cite id="ale-overview" />. The ion energy has to sit in a window, high enough to remove the modified layer and below the sputtering threshold of the bulk material. Outside that window the process stops being self-limiting <Cite id="ale-overview" />.

Equipment makers sell ALE as removal of "a few atomic layers per cycle" <Cite id="lam-etch" />, and it is used on the thinnest films of leading-edge transistors.

## Ion implantation

Doping silicon means introducing atoms of another element into the crystal lattice to change its conductivity. For decades this was done by diffusion: the wafer was exposed to a dopant gas at high temperature and the atoms spread in. The resulting profile depends on temperature and time together, which makes it hard to control.

Ion implantation accelerates the dopant ions to high energy and fires them into the silicon, where they stop at a depth set by the beam energy; the amount that enters is the dose, measured directly as electrical current <Cite id="cityu-implant" />. Depth and dose become independent variables, which is why the method took over.

Energies run from a few hundred eV to several MeV, placing ions from under 10 nm to about 10 µm deep. Doses run from 10¹¹ cm⁻², to adjust the transistor threshold voltage, up to 10¹⁸ cm⁻², to form buried dielectric layers <Cite id="cityu-implant" />.

<DiagramFigure src="/assets/implant-profile.svg" alt="On the left, the ion beam tilted 7 degrees from vertical over the crystal lattice; on the right, two concentration-versus-depth profiles, one untilted with a deep tail and one at 7 degrees that is much narrower">
The wafer is tilted on purpose. Without the tilt, some ions slide down the open channels of the crystal and end up much deeper than intended.
</DiagramFigure>

### Channelling and the 7° tilt

Viewed along certain directions, the silicon lattice has open corridors between rows of atoms, down which an ion travels almost without colliding. This is **channelling**, and it adds a deep tail to the profile, made of ions that went far beyond the intended depth.

The industrial fix is to tilt the wafer about 7° relative to the beam <Cite id="cityu-implant" />, so no ion enters aligned with a channel and the profile stays narrow. In practice 8 to 9° of tilt with 30° of rotation are used, and the values also depend on beam current <Cite id="implant-dose-rate" />.

### How many implants a chip has

A simple MOS transistor in the 1970s needed 6 to 8 implants. A modern CMOS with embedded memory can need 35 <Cite id="axcelis-implant" />. A large fab processes up to 50,000 wafers per month, with 20 to 30 implants per wafer, which takes about 20 implanters running in parallel <Cite id="axcelis-implant" />.

Each implant is a full lap of the loop: lithography, implantation, photoresist strip, and usually a measurement.

### Damage and anneal

High-energy ions knock silicon atoms out of position along their path. The implanted region becomes amorphous, and a transistor does not work in amorphous silicon.

An anneal restores the crystal order and, at the same time, electrically activates the dopants, which must occupy substitutional sites in the lattice to work. The anneal must be hot enough to repair the crystal and short enough not to spread the dopants that were just placed.

That trade-off led to rapid thermal processing (RTP) and, more recently, to laser anneals measured in milliseconds. The shallower the profile, the shorter the pulse.

<DiagramFigure src="/assets/rtp-thermal-budget.svg" alt="Two temperature-versus-time plots: on the left, a furnace ramping to a thousand degrees and holding for hours; on the right, RTP reaching the same temperature for about ten seconds">
A furnace anneal holds the wafer hot for hours; RTP reaches the same temperature for seconds. The band around 450 °C, which a furnace crosses slowly, is where oxygen thermal donors form. Author's drawing, after Tokuda et al. (1989) and Stein et al. (1986) <Cite id="tokuda-1989" /> <Cite id="stein-1986" />.
</DiagramFigure>

## Planarisation

After a few layers the wafer surface is no longer flat. Every deposition and every etch leaves steps, and the steps accumulate.

The steps matter because lithography is photographic. A projection system has a finite depth of focus, and outside it the image blurs. On an uneven wafer, parts of the field fall outside it and critical dimensions come out wrong <Cite id="cmp-depth-of-focus" />.

CMP (*chemical mechanical planarization*) combines chemical attack from a slurry with mechanical wear from a rotating pad. The wafer is pressed against the spinning pad until the relief is worn away <Cite id="amat-cmp" />. The slurry chemistry is described in [fab consumables](/en/insumos-fab).

CMP entered production in the 1980s, at IBM, to planarise the dielectric between metal levels. It was widely adopted when the critical dimension reached 0.35 µm, the point at which the alternatives (reflowed glass, reverse etch, spin-on glass) could no longer meet the requirement <Cite id="cmp-history" />. A CMP step can take little more than 60 seconds, including the post-polish clean <Cite id="amat-cmp" />.

CMP has two characteristic defects. In wide metal areas the metal sinks below the surface, which is called **dishing**. In dense areas the dielectric between wires wears faster than the metal, which is called **erosion** <Cite id="cmp-history" />. Both get worse with overpolishing, and both degrade the lithography of the next layer.

<DiagramFigure src="/assets/cmp-dishing-erosion.svg" alt="Two cross-sections after copper polishing: on the left a single wide copper line whose top is dished below the dielectric around it; on the right a dense block of narrow copper lines where metal and dielectric together sit below the open field">
Dishing hollows out a wide line; erosion lowers a whole dense block, metal and dielectric together. Author's diagram; the recesses are exaggerated many times relative to the line widths.
</DiagramFigure>

## Metrology

KLA, which builds inspection equipment, says that most process steps have some metrology or inspection associated with them <Cite id="kla-msa" />. The two are different jobs:

- **Metrology** measures what is there: thickness, width, alignment.
- **Inspection** looks for what should not be there: particles, scratches, defects <Cite id="kla-msa" />.

Measuring every wafer would be impractical, so fabs sample by lot. Metrology typically runs on 100% of lots, but only 2 to 5 wafers of each lot; defect inspection runs on 10 to 33% of lots, with 1 to 5 wafers <Cite id="kla-msa" />. The four main measurement types are overlay, film thickness, critical dimension and wafer shape <Cite id="kla-msa" />.

<ClientOnly>
  <DataChart chart="metrology-sampling" />
</ClientOnly>

CD-SEM uses an electron beam to measure a line's width at nanometre resolution, which is how a fab checks that the gate came out as wide as the drawing asked. Spectroscopic ellipsometry measures thickness without touching the wafer: it measures how light changes polarisation on reflection and solves for thickness with a model <Cite id="horiba-ellipsometry" />. It is the standard method for ultrathin films, from a few ångströms to tens of micrometres, and for multilayer stacks <Cite id="horiba-ellipsometry" />.

### The control loop

The measurements also feed back into the process. SPC (*statistical process control*) monitors the process and raises an alarm when it shifts or drifts. Run-to-run control closes the loop: it compares the post-process measurement against the process model, updates that model (typically with an exponential moving average) and computes a bounded recipe adjustment for the following wafers <Cite id="r2r-control" />.

In the paper that consolidated the technique, the authors distinguish a rapid mode for sudden shifts and a gradual mode for slow drifts <Cite id="r2r-control" />. This feedback keeps a process with a tolerance of a few nanometres on target from lot to lot without an engineer adjusting each one.

## Interconnection

The transistors occupy a thin layer at the bottom of a modern chip. Above them sits the BEOL, a stack of dozens of wiring levels that carries signal, power and clock to billions of devices.

For a long time those wires were aluminium. In September 1997, IBM announced the first manufacturable integrated copper interconnect technology, and began shipping product in 1998 <Cite id="ibm-copper" />. Copper wiring showed 40 to 45% lower resistance than aluminium and much better resistance to electromigration <Cite id="ibm-cu-electroplating" />.

The reason for the switch is in the delay. As wires grew thinner and closer together, the RC time constant of the wire grew while the intrinsic delay of the transistor fell. Around 0.25 µm the two curves crossed, and the wire became slower than the gate <Cite id="mpr-rc-limits" />. The ITRS recorded that RC delay had come to be dominated by global interconnect and that changing materials alone was not enough <Cite id="itrs-interconnect" />.

### Damascene

Copper is hard to etch, so the wire cannot be carved out of a copper film. The damascene process reverses the order: the trench is etched into the dielectric first, and the copper is poured into it.

<DiagramFigure src="/assets/copper-damascene.svg" alt="Four cross-sections of the damascene process: trench and via opened in the dielectric, barrier and seed layer deposited, copper electroplated from the bottom up, and finally the polish that removes the overburden">
The name comes from damascene metalwork, in which metal is inlaid into grooves cut into a surface.
</DiagramFigure>

The electrolyte is formulated so that copper grows from the bottom up, closing the via before the mouth of the trench closes; otherwise a void would be left in the middle of the contact <Cite id="ibm-cu-electroplating" />. CMP then removes the copper above the trench and leaves the surface flat again. Damascene needs that polish, which is why CMP and copper wiring arrived together.

### Low-k dielectrics

Every pair of neighbouring wires forms a capacitor, and the dielectric between them sets its capacitance. SiO₂ has a dielectric constant around 4.0. Lowering it reduces capacitance and, with it, delay. The alternatives used in industry range from SiOF (k ≈ 3.5 to 3.8) and SiCOH (k ≈ 2.2 to 3.2) to air, with k = 1.0 <Cite id="cu-interconnect-review" />. Air-gap architectures leave deliberate voids between the wires.

<ClientOnly>
  <DataChart chart="low-k-dielectric" />
</ClientOnly>

Measurements on air-gap structures find an effective k around 2.2 <Cite id="air-gap-keff" />, and technologies reaching more than 75% void fraction achieve an effective k below 2.1 <Cite id="hollow-airgap" />. The cost is mechanical: a structure that is 75% air has little material to support the stack above it.

### How many metal levels

imec describes BEOL stacks with up to 15 layers, 3 to 6 of them the thin "Mx" levels <Cite id="imec-roadmap" />. Teardowns of real products find more: the TSMC N3 die used in Lunar Lake has 20 metal interconnection layers <Cite id="techinsights-n3-beol" />.

Each of those layers has its own lithography, its own CMP and its own metrology, so each one adds another set of laps to the loop.

## Yield

**Yield** is the fraction of dies on a wafer that work. The simplest model assumes defects are distributed randomly, in which case yield falls exponentially with area:

$$
Y = e^{-D_0 A}
$$

where $D_0$ is the defect density and $A$ the die area <Cite id="leachman-yield" />. The model works for small dies (the Berkeley reference considers it adequate up to about 0.25 cm²) and is conservative for large dies <Cite id="leachman-yield" />.

In 1964, B. T. Murphy at Bell Labs observed that defects cluster rather than fall at random. Treating the density as a random variable and integrating over its distribution gives Murphy's model <Cite id="murphy-1964" />. The industry later adopted the negative binomial formulation, which is easier to manipulate and fits real data better <Cite id="murphy-integral" />.

The explorer below moves the die area and the clustering factor α of the negative binomial. At α = ∞ defects land at random and the model is the Poisson law; as α falls they arrive in clumps, most dies come out clean, and the failures concentrate in a few. The [data page](/en/dados#yield-against-area) plots the Poisson curve for five defect densities.

<ClientOnly>
  <YieldExplorer />
</ClientOnly>

### Why yield takes months

Yield rises as the fab learns the process, and no single recipe change gets it there. The Competitive Semiconductor Manufacturing survey at Berkeley measured how long that learning takes across companies. For a new technology, the average process qualification time was 12 months, with the best case at 7. For a technology similar to one already in production, the average fell to 7 months, with a best case of 4 <Cite id="berkeley-csm" />. The gap between the average and the benchmark in yield ramp time was around 40% <Cite id="berkeley-csm" />.

<SourceNote label="Sources" :ids="['semieng-cycle-time', 'semieng-litho-layers', 'hitachi-metrology', 'imec-roadmap', 'deal-grove-1965', 'tu-wien-oxidation', 'ecs-sio2-limits', 'amat-ald', 'lam-ald', 'asm-ald-gapfill', 'yim-ald-gpc', 'amat-trillium', 'mks-rie', 'bosch-drie', 'lam-etch', 'ale-overview', 'cityu-implant', 'axcelis-implant', 'implant-dose-rate', 'cmp-depth-of-focus', 'cmp-history', 'amat-cmp', 'kla-msa', 'horiba-ellipsometry', 'r2r-control', 'ibm-copper', 'ibm-cu-electroplating', 'mpr-rc-limits', 'itrs-interconnect', 'cu-interconnect-review', 'air-gap-keff', 'hollow-airgap', 'techinsights-n3-beol', 'leachman-yield', 'murphy-1964', 'murphy-integral', 'berkeley-csm', 'stanford-ee212-oxidation', 'tokuda-1989', 'stein-1986']" />

<SeeAlso title="See also" :links="[
  { text: 'Photolithography', href: '/en/fotolitografia', note: 'how the pattern is printed' },
  { text: 'Transistor evolution', href: '/en/transistores', note: 'what the FEOL builds' },
  { text: 'Packaging and test', href: '/en/empacotamento', note: 'what happens after the fab' },
  { text: 'Wafer fabrication', href: '/en/fabricacao-wafers', note: 'before the fab' },
  { text: 'References', href: '/en/referencias', note: 'numbered list' },
]" />
