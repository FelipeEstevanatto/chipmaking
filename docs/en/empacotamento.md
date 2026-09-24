---
title: Packaging and test
description: >-
  After the fab: the wafer is tested, diced, connected to a package, protected
  and tested again. This is where HBM, chiplets and hybrid bonding come from.
dataAsOf: 2025
---

# Packaging and test

The [fab](/en/na-fab) delivers a wafer holding thousands of finished chips — and useless ones. They are stuck to each other, with no connection to the outside world, exposed to air and moisture, and nobody yet knows **which** of them work.

This is the part of the chain that usually gets left out of explanations, and that is a mistake. In value it is small; in **capacity** it has become the bottleneck of the AI industry. And it is where some of the most interesting technology bets in the sector live: the memory that had to move next to the processor, the chips that started being assembled like a puzzle, and the connection that does away with solder.

<DiagramFigure src="/assets/back-end-flow.svg" alt="The sequence after the fab: wafer test, dicing, packaging with wire bonding, encapsulation and final test of the assembled part">
The wafer enters on the left as a single piece and leaves on the right as individual parts, tested and ready to be soldered onto a board.
</DiagramFigure>

## Wafer test: separating the wheat before paying for the mould

The first thing that happens to the wafer is a measurement. A **probe card** descends onto each die, needles make contact with its pads, and an electrical tester checks whether it works <Cite id="semiprobe-wafer-test" />.

The reason is purely economic: **packaging costs money**, and there is no sense spending package, wire and mould on a die that was born bad. Wafer test finds the bad dies **before** any of that spending <Cite id="semiprobe-wafer-test" />.

The manufacturing sequence therefore runs: **fab → wafer test → packaging → final test** <Cite id="semiprobe-wafer-test" />.

### The probe card is a bespoke part

Every product needs its own card. It is a set of needles or springs positioned exactly over the die's pads, and a card "may have literally a couple of thousand probes" — which makes it complex and expensive to create <Cite id="cadence-kgd" />.

That imposes a practical limitation which often surprises: wafer test **is not the same** as final test. The card has different electrical characteristics from the package and often **cannot run at the product's operating speed** <Cite id="cadence-kgd" />. Wafer test is a coarse sieve, not the definitive measurement.

### The known good die problem

One concept has become central to advanced packaging: the **known good die** (KGD). In a package where several dies are assembled together, a bad die that escapes can take the others down with it — the Cadence article calls this **collateral damage** <Cite id="cadence-kgd" />.

In a monolithic package, a bad die costs one die. In a 2.5D package with eight HBM stacks and two logic chips, a bad die costs the entire package. That is why wafer test, which began as an economy measure, has become a **viability requirement** in modern packages.

### Who tests what

The market for electrical testers (**ATE**, *automated test equipment*) is one of the most concentrated in the sector. Advantest estimates it held **58% of the global market in 2024**, and states that **Advantest and Teradyne together account for about 80%** of the tester market <Cite id="advantest-ir" />.

Test cost is often described as a small fraction of a chip's value, and that is true — with nuances. The ITRS records that continuous improvements brought the typical cost of test to **under 2 to 3% of revenue** for an integrated circuit <Cite id="itrs-2015-test" />. The same document offers a useful calculation: for a device that costs **US$1.00** to manufacture, with test at **5%**, cutting test cost by 10% saves **US$0.005** per unit, while gaining 1% of yield saves **US$0.01** <Cite id="itrs-2015-test" />.

The practical conclusion of that arithmetic is that test **does not pay for itself**: it is justified by what it prevents. And what it prevents has a name — in one memory test floor analysed by the ITRS, **the probe card accounted for 60% of the entire cost of wafer test** <Cite id="itrs-2013-test" />.

### A third sieve

Beyond wafer test and final test there is a third insertion point, increasingly common: **system-level test** (SLT). Rather than measuring electrical parameters, it **boots the device** — the assembled part runs real firmware and executes workloads in an environment resembling actual use <Cite id="teradyne-slt" />.

It is the answer to a growing problem: some defects only appear when the chip does what it was built to do, and no isolated parameter measurement captures them.

## Dicing: separating the dies

With testing done, the wafer has to be **cut**. It looks like the most trivial step in the process, and it is not: every cut introduces microscopic cracks, and a crack at a die edge is a mechanical failure that will show up later, often in the customer's product.

The most common method is the **diamond blade**, and the geometry matters. The width of the cut — the **kerf** — is not the blade thickness: it is the thickness **plus chipping**. In silicon, chipping adds about **20 µm on each side**; in glass, about **10 µm** <Cite id="ku-dicing-sop" />. The blade itself is tens of micrometres wide: a standard nickel-bonded blade measures **40 µm**, and resin-bonded blades for glass reach **100 µm** <Cite id="ku-dicing-sop" />.

The parameters follow the material. For silicon the spindle runs at **30,000 rpm** with a feed of **5 to 10 mm/s**; for glass, slower <Cite id="disco-dad3221" />.

### When the blade stops working

Three situations pushed the industry toward alternatives.

The first is the **fragility of low-k dielectrics**. The *low-k* films of the [BEOL](/en/na-fab) are mechanically weak and are **easily damaged** by blade dicing, which motivated the search for other methods <Cite id="ectc-2016-dicing" />.

The second is **chipping in thin wafers**. In a wafer **25 µm** thick — a common figure today in stacked memory — a standard blade causes substantial backside chipping; much finer grit is required <Cite id="disco-thin-wafer" />.

The third is **HBM**, where the layers are thin and part strength is critical. A study comparing blade, laser and stealth dicing in wafers for 2.5D/3D integration found the **highest fracture strength with stealth dicing**, and observed that **60 µm** wafers resist more than 90 or 120 µm ones <Cite id="mdpi-singulation-hbm" />.

The alternatives fall into three families:

- **Laser cutting** and ***stealth dicing***: in stealth dicing, a laser at a wavelength that **passes through** silicon is focused **inside** the wafer, forming a modified layer; separation happens afterwards, by tape expansion. The process is completely dry, **kerf-free** and chip-free <Cite id="hamamatsu-stealth" />.
- ***Laser grooving* + plasma**: the laser opens a narrow groove and the plasma deepens and separates it, with widths **below 10 µm** and clean edges <Cite id="imaps-plasma-dicing" />.
- **PDBG** (*plasma dicing before grinding*): separates by plasma **before** thinning, which reduces contamination and cracking <Cite id="pdbg-dicing" />.

It is worth noting how much this care pays. A classic study showed that **mechanical grinding** creates weak regions where chip strength falls **30 to 35%** below the wafer average. Two interventions improved this dramatically: **halving the grinding speed raised average chip strength by 56%**, and **deliberately blunting a new saw blade raised strength five-fold** <Cite id="ieee-die-strength" />. Dicing is not the end of a process; it is the beginning of the product's mechanical reliability.

## Wire bonding: the technology that assembles 80% of the world

There is a temptation to treat *wire bonding* as yesterday's technology. The numbers say otherwise: **more than 80% of semiconductor packages** are still assembled by wiring <Cite id="semieng-wirebond" />, and a 2023 academic review confirms the same level, adding an uncomfortable detail — about **one quarter to one third of package failures** come precisely from the wire bond <Cite id="pmc-bonding-wire" />.

The principle is what the figure shows: the die sits **face up**, and extremely fine wires run from the pads on its **periphery** down to the substrate. Each wire is an electrical connection, and there are two kinds of tip: the **ball bond**, in which a ball of wire is melted and pressed onto the pad, and the **wedge bond**, in which the wire is crushed sideways — the latter produces lower loops, which matters at radio frequencies <Cite id="inseto-wire-guide" />.

Wire diameter is the critical dimension. Leading-edge copper wiring uses **15 µm wire at 40 µm pitch**; gold uses **18 µm** at the same pitch <Cite id="imaps-cu-wire" />.

### Gold giving way to copper

For decades the wire was **gold**. Around **2010**, the gold price rose and the industry migrated to **copper** <Cite id="semieng-wirebond2" />. Today about **70% of wire-bonded packages use copper** <Cite id="semieng-wirebond2" />, and SEMI recorded copper passing **54% of bonding-wire shipments** in 2019, with gold **below 32%** <Cite id="semi-gspmo-2020" />.

It was not only price. Copper is a **better conductor** and has **higher thermal conductivity** than gold, and it grows intermetallic compounds more slowly with aluminium, which improves reliability <Cite id="pmc-bonding-wire" />. The comparison is eloquent: copper's resistivity is **1.72×10⁻⁸ Ω·m** against gold's **2.2×10⁻⁸**; Vickers hardness is **369** against **216**; and Young's modulus is **130 GPa** against **78** <Cite id="gold-bulletin-ball-bonds" />.

Those last two are the price of the choice. Copper is **harder**, which increases stress on the silicon, and it **oxidises** readily, requiring an inert nitrogen atmosphere during bonding <Cite id="pmc-bonding-wire" />.

### Why wiring still wins

Economics explains it well. A 25 µm copper wire costs **less than one tenth** of an equivalent gold wire; and while **gold** wire bonding becomes more expensive than flip-chip above **1,024 connections**, **copper** wiring stays competitive **up to about 2,000 connections** <Cite id="imaps-cu-wire" />.

In other words: wiring did not survive out of inertia. It won itself a much wider application band, and that is where most of the world's chips live — microcontrollers, regulators, sensors, memories, practically everything that is not a high-performance processor.

## Flip-chip: turning the die face down

The limitation of wiring is geometric: the pads have to sit on the **edge** of the die, because that is where the wire leaves from. That limits the number of connections to the perimeter — and the perimeter grows with the square root of the area.

**Flip-chip** solves it by inverting the die. It is mounted **face down**, and the connection is made by solder bumps or copper pillars distributed across **the entire active surface** <Cite id="wiley-packaging-ch3" />.

<DiagramFigure src="/assets/wirebond-vs-flipchip.svg" alt="Side-by-side comparison: on the left, the die face up with looping wires leaving the edge; on the right, the die face down with solder bumps distributed across the whole area">
It is a single choice — face up or face down — and it determines how many connections the package can have.
</DiagramFigure>

The gain is threefold: the electrical path becomes **short**, **inductance** falls sharply, and the number of contacts is no longer limited by the perimeter. That is why microprocessors, GPUs and accelerators are flip-chip: they need **thousands** of simultaneous connections <Cite id="wiley-packaging-ch3" />.

### C4: a sixty-year-old invention

Solder-bump connection was born at IBM. In the **summer of 1962**, the company reduced to practice a flip-chip transistor with solder connections — there were just **3 bumps per chip**, each with a *5 mil* copper ball embedded to act as a standoff <Cite id="totta-flipchip" />. Glass dams followed, preventing the solder from spreading and the chip from collapsing: hence the name **C4**, *controlled collapse chip connection* <Cite id="totta-flipchip" />.

The formal description of the C4 process is by **L. F. Miller**, in 1969, and US patent **3,429,040** was granted in February of that year <Cite id="springer-flipchip-history" />. Over **forty years**, the number of bumps per chip went from **3 to 7,018** <Cite id="totta-flipchip" /> — probably the best measure of how far the idea travelled.

### From C4 to the copper pillar

Solder bumps have a scale limit. Standard C4 operates at **130 to 250 µm** pitches, and below about **130 µm** there is simply no lateral room left — with a bump height of ~70 µm, neighbouring solders touch and short-circuit <Cite id="semieng-flipchip-bumps" />.

The answer was the **copper pillar**: instead of a flattened ball, a copper cylinder with a solder cap. IBM patented the technology in **2001**; Intel used it in 65 nm processors in **2006**, citing better electromigration resistance, better thermal conduction and higher contact density <Cite id="synopsys-cu-pillar" />. The pillar is used **below a 130 µm pitch**, typically with **~40 µm of copper and ~25 µm of solder**, and microbumps are **under 10 µm tall** <Cite id="semieng-flipchip-bumps" />.

## 2.5D, 3D and the package hierarchy

Up to here, each package held **one** die. From here on the question changes: how do you put several chips in the same package, connected fast enough to behave as one?

<DiagramFigure src="/assets/package-generations.svg" alt="Four connection generations side by side: edge wiring with 15 to 25 micrometre wire, flip-chip with bumps above 130 micrometres, 2.5D with about 40 micrometre microbumps on an interposer, and 3D stacking with direct bonding below 10 micrometres">
The road of advanced packaging is a single metric going down: the distance between two neighbouring connections.
</DiagramFigure>

### 2.5D: chips side by side

In **2.5D** integration, the dies sit **side by side** on an intermediate piece called an **interposer**, usually made of silicon. An important detail: only the **interposers** need vias running through the silicon, not the chips — which allows existing die designs to be reused <Cite id="fue-packaging-roadmap" />.

TSMC calls its 2.5D platform **CoWoS** (*chip on wafer on substrate*), and it has been in production **since 2012** <Cite id="tsmc-cowos" />. There are now three variants worth distinguishing:

- **CoWoS-S**: a **silicon** interposer, supporting up to **3.3× the reticle** (about **2,700 mm²**), with embedded deep-trench capacitors <Cite id="tsmc-cowos" />.
- **CoWoS-R**: instead of silicon, a **redistribution interposer** — polymer with copper traces. It has been in volume production **since 2023** and scales beyond 3.3× <Cite id="tsmc-cowos" />.
- **CoWoS-L**: combines a redistribution interposer with **local silicon interconnect** (*LSI*) bridges, placed only where connection density demands <Cite id="tsmc-cowos" />.

The first breach of the reticle barrier came in **March 2020**, when TSMC and Broadcom announced a **2× reticle** (~1,700 mm²) interposer. It supported up to **6 HBM cubes**, **96 GB** of memory and **2.7 TB/s** of bandwidth — **2.7 times** the 2016 CoWoS solution — using **mask stitching** to exceed the size of one exposure field <Cite id="tsmc-2x-cowos" />.

### 3D: chips stacked

In **3D** integration, dies are **stacked** and connected by **through-silicon vias** (TSV). The dimensions tell the story of the process: in HBM, TSVs are typically **2 to 5 µm in diameter** and **30 to 60 µm deep**, in the *via-middle* scheme — formed **after** the front-end and **before** the BEOL, a balance between density, cost and thermal behaviour <Cite id="semieng-tsv" />. In interposers, TSVs are larger, **10 µm or more**, with an aspect ratio around **10:1** <Cite id="semieng-tsv" />.

These are holes a few micrometres across, tens of micrometres deep, **filled with copper** and polished — in each of the hundreds of thousands of vias in a memory stack.

### Hybrid bonding

Stacking by microbumps has a ceiling. Today's most advanced microbumps sit at around a **40 µm pitch** — meaning bumps of **20 to 25 µm** separated by **15 µm** — and the technology is viable down to about **10 to 20 µm**. Below that, solder no longer works <Cite id="semieng-bump-pitch" />.

The way out is to eliminate the solder. In **hybrid bonding**, the surfaces of **copper** and dielectric are polished until atomically flat, brought into contact and heated. The copper diffuses and bonds **directly** to the copper on the other side, with no solder in between.

The numbers this unlocks are of another order: **more than one million interconnects per mm²** at a copper pitch of about **1 µm** <Cite id="imec-hybrid-bonding" />. imec demonstrated **die-to-wafer bonding at 2 µm pitch with better than 350 nm overlay** <Cite id="imec-d2w-hb" />, and **wafer-to-wafer bonding at 400 nm pitch** requires overlay **below 100 nm** <Cite id="imec-hybrid-bonding" />. imec itself estimates that solder-based die-to-wafer will **stagnate at 10 to 5 µm pitch** <Cite id="imec-hybrid-bonding" />.

Intel describes its implementation — **Foveros Direct 3D** — as capable of **sub-10 µm pitch** and **up to 10 times** the interconnect density of conventional microbumps <Cite id="intel-foveros-direct" />.

There is a yield argument behind this, and it is elegant: bonding **die to wafer** allows stacking only **known good dies**, raising compound yield, and allows joining **dies of different sizes** — which wafer-to-wafer bonding does not <Cite id="imec-d2w-hb" />.

## HBM: the memory that had to move next door

A system's memory bandwidth is limited by **bandwidth**, and bandwidth is limited by **distance**. Sending data across a circuit board is slow, laborious and energetically expensive. **HBM** (*high bandwidth memory*) took a radical approach: instead of bringing the memory closer to the processor, **put it in the same package**.

HBM is a JEDEC standard, and the evolution of its versions is the history of the AI bottleneck:

| Standard | Published | Interface | Bandwidth per stack |
| --- | --- | --- | --- |
| HBM2 (JESD235A) | January 2016 | 1,024-bit, 8 channels | 256 GB/s |
| HBM3 (JESD238) | January 2022 | 1,024-bit, 16 channels | 819 GB/s |
| HBM4 (JESD270-4) | April 2025 | 2,048-bit, 32 channels | 2 TB/s |

<Cite id="jedec-hbm2" /> <Cite id="jedec-hbm3" /> <Cite id="jedec-hbm4" />

<DiagramFigure src="/assets/hbm-bandwidth.svg" alt="Bar chart of bandwidth per HBM stack, from 128 gigabytes per second in the first generation to about 2,048 in HBM4 and a projected 4,096 for HBM4E, with JEDEC-numbered standards highlighted">
Each generation doubles something: the per-pin rate, the interface width or the channel count. The compound result is the jump visible in the chart.
</DiagramFigure>

HBM4 is the clearest example of why this memory **cannot** be a plug-in module. The standard doubles the interface from **1,024 to 2,048 bits** and the channels from **16 to 32 per stack**, with speeds up to **8 Gb/s** and densities from **4 to 64 GB** <Cite id="jedec-hbm4" />.

On the processor side, that means a trace count that has no way of existing on a board: there are already **more than a thousand wires** between the accelerator and a single HBM stack at the HBM3E generation, a density **impossible to route** on an organic substrate or circuit board <Cite id="semianalysis-hbm" />. In HBM4 there are **2,048 data wires** and about **3,000 traces** once clock, control and address are counted <Cite id="rambus-hbm" />.

That is where **2.5D** integration, described above, comes in. The silicon interposer exists, to a large extent, to make that trace count physically possible.

### What HBM costs

None of this is free, and the cost shows up in density. The TSVs, which must pass through every die in the stack, occupy **area that stores nothing**. SemiAnalysis's comparison using SK hynix figures is blunt: a D1z DDR4 die delivers **0.296 Gb/mm²**, while an HBM3 die delivers **0.16 Gb/mm²** — **85% denser** in the DDR4 case <Cite id="semianalysis-hbm" />.

In other words: the fastest memory in the world is also the **least dense**. The industry accepts the trade-off because, in AI systems, bandwidth constrains performance more than capacity does — and an accelerator without enough bandwidth leaves compute units **idle** <Cite id="semianalysis-hbm" />.

## Chiplets: dividing in order to yield

A chip is limited by a physical number: the **reticle**. One lithography exposure covers at most about **830 mm²** <Cite id="ectc-cowos-s5" />. No design larger than that is possible — not because it is hard to design, but because it does not fit the equipment.

The reticle is not the only limit, though. Yield is another, and it gets worse with area.

<DiagramFigure src="/assets/chiplet-yield.svg" alt="Yield as a function of die area: a single 800 square millimetre die yields about 45%, while a 200 square millimetre chiplet yields about 82%; the reticle limit is marked near 830 square millimetres">
Every defect kills an entire die. The larger the die, the more defects it runs into.
</DiagramFigure>

The alternative is to **split the product into smaller chips**. Instead of one large monolithic die, several *chiplets* are fabricated and then assembled together in the same package, communicating over fast interconnects rather than internal wiring.

AMD's arithmetic, presented at Hot Chips 2017, is the classic example. Replacing a hypothetical **777 mm²** monolithic die with **four 213 mm² dies** — totalling **852 mm²**, that is, about **10% more silicon** — produced a cost of roughly **0.59 times** the monolithic one <Cite id="amd-chiplet-economics" />. More total area, **41% less cost**.

The reason is exactly the one in the figure: the four small dies each yield much better individually, and only the working ones go on to assembly.

### UCIe and the standardisation of the interface

Chiplets created a new problem: each manufacturer defined its own way for dies to talk to each other. That locks the customer to the supplier — the opposite of the ecosystem that made the rest of the industry grow.

The answer came in **March 2022**, when **ASE, AMD, Arm, Google Cloud, Intel, Meta, Microsoft, Qualcomm, Samsung and TSMC** came together to ratify the **UCIe** (*Universal Chiplet Interconnect Express*) specification, an open die-to-die interface. UCIe 1.0 provided for rates up to **32 GT/s** with **16 to 64 lanes** <Cite id="ucie-formation" />. In August **2025**, version **3.0** doubled the rates to **48 and 64 GT/s** <Cite id="ucie-3" />.

The bet is the same one that made PCIe and USB work: a common bus turns a proprietary product into a market.

## Final test, burn-in and binning

Once assembled, the part goes back to the tester. **Final test** repeats much of what wafer test already did, and that is not redundancy: it exists to catch **defects that assembly itself created** — a missing solder ball, an unattached wire <Cite id="anysilicon-wafer-sort" />.

### Burn-in

There is a class of failure that no simple electrical test captures: **latent** defects that only manifest after some time in use. They produce what is called **infant mortality** — the concentration of failures in the first months of a product's life.

***Burn-in*** exists to bring that forward: components are subjected to conditions **at or above the specified maximum**, in order to **stress the defects out** before shipment <Cite id="mil-std-883" />. In production it is done on the **already assembled** part, in sockets and ovens, typically for **24 to 48 hours** <Cite id="semieng-burnin" />.

It is an explicit trade: burn-in **reduces warranty cost at the cost of some yield**, because some devices do not survive the test itself <Cite id="ieee-burnin" />. It can also **damage** devices through thermal runaway, electrostatic discharge or overvoltage <Cite id="semieng-burnin" />. There is an optimal duration, and it is an economic decision, not a technical one.

### Binning: one die, several products

Not every working chip is equal. At **final test**, devices are sorted — ***binned*** — by **maximum operating frequency**, by **voltage**, by **temperature**, by **leakage current** or by output drive capability <Cite id="semieng-binning" />.

That is why the same die appears in the shop in several versions at different prices. Binning happens **after packaging**, at final test <Cite id="semieng-binning" />, and it converts the process's natural variability into a **product line** instead of waste. A die that cannot reach the top model's frequency can still be sold as the model below.

## What packaging is worth

It is worth closing with the economic size of this part of the chain, because it is counterintuitive in two directions at once.

The first: it is **small**. CSET cites an earlier report estimating assembly, test and packaging (*ATP*) at about **10% of the value of a finished chip**, against roughly **45%** contributed by design and front-end fabrication. A report by the SIA with BCG arrives at an even smaller number, **6%** — with the segment accounting for **3% of R&D** and **13% of industry capital expenditure** <Cite id="cset-packaging" />.

The second: despite that, the **ITRS records that packaging cost often exceeds the cost of fabricating the integrated circuit itself** <Cite id="itrs-assembly" />. The two statements coexist because they measure different things — share of the product's final value on one hand, industrial cost of the step on the other.

And there is a third, more recent figure that explains why the subject stopped being peripheral. The **advanced packaging** market — the part that does CoWoS, HBM and chiplets — was worth about **US$46 billion in 2024** and is heading for **more than US$79 billion by 2030** <Cite id="yole-advanced-packaging" />. It is a minority of the total, but it is the minority that **constrains** the rest: TSMC stated in 2024 that CoWoS capacity had **more than doubled** year on year and that it intended to double it again, and that customer demand still **far exceeded** its ability to supply <Cite id="tsmc-q3-2024" />.

A bottleneck that is small in value can be large in consequence. That is what happened to packaging: for decades the cheap step at the end of the line, it is now the step that decides how many AI chips the world can assemble.

<SourceNote label="Sources" :ids="['semiprobe-wafer-test', 'cadence-kgd', 'advantest-ir', 'itrs-2015-test', 'itrs-2013-test', 'teradyne-slt', 'ku-dicing-sop', 'disco-dad3221', 'disco-thin-wafer', 'ectc-2016-dicing', 'mdpi-singulation-hbm', 'hamamatsu-stealth', 'imaps-plasma-dicing', 'pdbg-dicing', 'ieee-die-strength', 'semieng-wirebond', 'semieng-wirebond2', 'pmc-bonding-wire', 'inseto-wire-guide', 'imaps-cu-wire', 'semi-gspmo-2020', 'gold-bulletin-ball-bonds', 'wiley-packaging-ch3', 'totta-flipchip', 'springer-flipchip-history', 'semieng-flipchip-bumps', 'synopsys-cu-pillar', 'fue-packaging-roadmap', 'tsmc-cowos', 'tsmc-2x-cowos', 'semieng-tsv', 'semieng-bump-pitch', 'imec-hybrid-bonding', 'imec-d2w-hb', 'intel-foveros-direct', 'jedec-hbm2', 'jedec-hbm3', 'jedec-hbm4', 'rambus-hbm', 'semianalysis-hbm', 'ectc-cowos-s5', 'amd-chiplet-economics', 'ucie-formation', 'ucie-3', 'anysilicon-wafer-sort', 'mil-std-883', 'semieng-burnin', 'ieee-burnin', 'semieng-binning', 'cset-packaging', 'itrs-assembly', 'yole-advanced-packaging', 'tsmc-q3-2024']" />

<SeeAlso title="See also" :links="[
  { text: 'In the fab', href: '/en/na-fab', note: 'where the processed wafer comes from' },
  { text: 'Photolithography', href: '/en/fotolitografia', note: 'the reticle limit' },
  { text: 'Transistor evolution', href: '/en/transistores', note: 'what is inside the die' },
  { text: 'Wafer fabrication', href: '/en/fabricacao-wafers', note: 'thickness and thinning' },
  { text: 'References', href: '/en/referencias', note: 'numbered list' },
]" />
