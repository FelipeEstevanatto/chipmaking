---
title: Reliability and aging
description: Why a chip stops working — the bathtub curve, wear-out mechanisms, FIT, soft errors and automotive qualification.
dataAsOf: 2026
---

# Reliability and aging

The earlier chapters tell you how a chip is made. The [fab](/en/na-fab) builds the transistor layer by layer, [transistor evolution](/en/transistores) shows what ended up inside the die, and [packaging](/en/empacotamento) seals it into a case. What is missing is the question that decides whether the product really exists: **how long does it keep working?**

Reliability is not a single measurement. It is the **distribution of failures over time** — and that distribution is almost never uniform. Understanding it is what separates "the chip works" from "the chip can be sold".

## The bathtub curve

Plot the failure rate of a population against time and the same shape reappears, across mechanical and electronic components of every kind: a bathtub <Cite id="rel-nist-bathtub" />.

- **Infant mortality.** At the start the rate is high and falls quickly. It lasts from a few weeks to a few months, and it corresponds to defects that were already present in the lot <Cite id="rel-nist-bathtub" />.
- **Useful life.** The rate levels off at a roughly constant value — this is where most systems spend most of their lives <Cite id="rel-nist-bathtub" />.
- **Wear-out.** If the product lives long enough, the rate rises again, because the materials degrade <Cite id="rel-nist-bathtub" />.

The chart below is a **schematic**, not a data set: it exists to fix the three regions in your head, not to be measured.

<ClientOnly>
  <DataChart chart="bathtub" />
</ClientOnly>

### Where burn-in acts

[Burn-in](/en/empacotamento) exists to attack the first region. Components are subjected to conditions **at or above the specified maximum**, in order to **stress the defects out** before shipment <Cite id="mil-std-883" />; in production this happens on the already assembled part, typically for **24 to 48 hours** <Cite id="semieng-burnin" />. It is an explicit trade: burn-in **reduces warranty cost at the cost of some yield** <Cite id="ieee-burnin" />, and it can itself **damage** devices through thermal runaway, electrostatic discharge or overvoltage <Cite id="semieng-burnin" />.

The point that matters here: burn-in moves the **infant mortality**. It does nothing for the flat region or the wear-out region — what decides a product's long life is the physics that follows.

## Wear-out mechanisms

A chip does not wear out by mechanical fatigue: it wears out through interface chemistry and physics, slowly and **cumulatively**. Every mechanism has a physical driver and a signature that gives it away.

| Mechanism | Physical driver | Observable signature | Technology most affected |
| --- | --- | --- | --- |
| NBTI / PBTI | Interface traps generated under gate bias and temperature | Threshold-voltage shift, with partial recovery | Thin-oxide CMOS (gate) |
| HCI | Hot carriers near the drain, injected into the oxide | Degraded gain and saturation current | Short-channel nMOS |
| TDDB | Defect accumulation in the dielectric under electric field | Rising leakage until sudden breakdown | Gate oxide and thin dielectrics |
| Electromigration | Momentum transfer from electrons to metal atoms | A void (*open*) and a hillock (*short*) in the wire | BEOL interconnect, vias and bumps |
| Soft errors | Charge deposited by an energetic particle | A bit flipped transiently, non-destructively | SRAM, DRAM and logic |
| ESD / EOS | Electrostatic discharge or electrical overstress | Instant oxide or junction breakdown | Inputs and outputs (*I/O*) |

<Cite id="rel-schroder-2003" /> <Cite id="rel-hu-1985" /> <Cite id="rel-mcpherson-2012" /> <Cite id="rel-black-1969" /> <Cite id="rel-baumann-2001" /> <Cite id="voldman-esd" />

### NBTI and PBTI

Bias temperature instability is the wear-out the industry came to measure at every node. Under bias and elevated temperature, **traps form at the oxide–silicon interface**; they capture charge and shift the **threshold voltage**, degrading the transistor <Cite id="rel-schroder-2003" />.

The classic case is the **pMOS** under negative gate bias (NBTI); its mirror in the nMOS is **PBTI**, and both enter qualification "as appropriate" <Cite id="rel-aec-q100" />. The complication that makes NBTI so debated is **recovery**: part of the shift vanishes when the stress is removed, which makes the measured number depend on how quickly you measure it <Cite id="rel-schroder-2003" />.

### Hot carriers

Near the drain, the electric field accelerates channel carriers to energies high enough to **jump into the gate oxide**. There they create traps, and the transistor gradually loses gain and current <Cite id="rel-hu-1985" />. It is a **short-channel** mechanism, worse at high drain voltages, and that is exactly why qualification requires it "for all MOS technologies below 1 micron" <Cite id="rel-aec-q100" />.

### Gate oxide breakdown

The gate dielectric does not fail all at once. It **accumulates defects** under the electric field until a **conductive path** crosses the oxide layer and the gate shorts to the channel — time-dependent dielectric breakdown (TDDB) <Cite id="rel-mcpherson-2012" />. Because the field accelerates the rate of defect generation, lifetime depends on **voltage**, and voltage extrapolation is as central as temperature extrapolation <Cite id="rel-mcpherson-2012" />.

That same wall, decades ago, ended pure SiO₂ as the gate insulator: once the oxide reached the **1.2 nm** range, tunnelling leakage became unacceptable and the high-k dielectric took its place <Cite id="ecs-sio2-limits" />. It is the same frontier the [fab](/en/na-fab) describes from the process side.

### Electromigration

In metal wires, moving electrons transfer momentum to the metal atoms. At high current and high temperature, that push makes the metal **migrate**: a **void** opens where atoms left, and a **hillock** grows where they piled up. A void becomes an open wire; a hillock becomes a short to its neighbour <Cite id="rel-black-1969" />.

The time to failure follows **Black's equation**:

\[ \mathrm{MTTF} = A \cdot J^{-n} \cdot \exp\!\left(\frac{E_a}{k_B T}\right) \]

where \(J\) is the current density and \(T\) is the temperature <Cite id="rel-black-1969" />. The exponent \(n\) sits typically near **2** for aluminium, and the activation energy \(E_a\) depends on the metal and on the diffusion path, on the order of **0.5 to 0.7 eV** for aluminium and **0.8 to 1.0 eV** for copper <Cite id="rel-jep122" />.

Be wary of any \(n\) or \(E_a\) presented as a universal constant: qualification material itself records that measured activation energies range from negative values up to **1.4 eV**, with **0.7 eV** called "typical" only by convention <Cite id="rel-aec-q100" />. What is robust is the **direction**: doubling \(J\) shortens life far more than doubling room temperature — which is why swapping aluminium for copper in **1997** mattered so much <Cite id="ibm-copper" />. Copper's electromigration lifetime is **more than two orders of magnitude longer** <Cite id="ibm-cu-electroplating" />.

## Quantifying failure

To compare components, the industry needed a common unit. That is the **FIT** — *failure in time* — defined as **one failure per 10⁹ device-hours**, and whose calculation JEDEC standardises in JESD85A <Cite id="rel-jesd85a" />.

The arithmetic is what makes the number usable. Since 10⁹ divided by the rate in FIT gives the **MTTF** in hours, a component at 10 FIT has an MTTF of 10⁸ h <Cite id="rel-jesd85a" />. Converting: **100,000 h** is about **11 years** of continuous operation, and ten calendar years add up to **87,600 h** (10 × 8,760 h). Writing the goal in hours and the failure in FIT is what lets you compare a single chip with a customer's entire installed base.

Those goals differ by market. AEC-Q100 demonstrates the method with an automotive profile of **15 years** — **12,000 h** of operation within **131,400 h** of calendar time <Cite id="rel-aec-q100" />. The useful-life horizon assumed for a component is usually counted in **a decade** <Cite id="rel-jep122" />; the two numbers coexist because they measure different things, powered time on one side and calendar time on the other.

### Accelerated testing

Nobody can wait ten years. The way to measure a long life is to **accelerate** the mechanism and extrapolate back with a model. For thermally activated mechanisms the model is **Arrhenius**, with an acceleration factor depending on \(\exp[-(E_a/k_B)(1/T_u - 1/T_t)]\), where \(u\) and \(t\) subscripts are use and test <Cite id="rel-aec-q100" />.

AEC-Q100 fixes the constants for the example: \(E_a = 0.7\) eV and \(k_B = 8.61733 \times 10^{-5}\) eV/K, arriving at a test duration of **1,393 h** for the case shown <Cite id="rel-aec-q100" />. The warning that comes with the calculation is the part that matters: pushing conditions beyond the reasonable can **induce unrealistic failure mechanisms** and destroy the extrapolation <Cite id="rel-aec-q100" />. Accelerating is not exaggerating — it is choosing a regime where the *same* mechanism still governs.

## Soft errors

There is a class of failure that leaves no scar. In the late 1970s it became clear that **alpha particles** — from radioactive traces in the packaging materials themselves — deposited enough charge to **flip a bit** in a DRAM. The bit worked again on the next write: hence the name **soft error** <Cite id="rel-may-woods-1979" />.

Then came the uncomfortable generalisation: it was not just the package. **Cosmic-ray neutrons** do the same at sea level, and the error rate **increases with altitude** — which turned a materials problem into an environment problem <Cite id="rel-ziegler-1979" />. The relevant radiation sources came to be known as a set of three <Cite id="rel-baumann-2001" />.

Because the probability grows with the number of bits exposed, the natural metric is **FIT per megabit**, not FIT per component <Cite id="rel-baumann-2001" />. It was the existence of that irreducible error floor that pushed error-correcting codes (**ECC**) into memories and controllers: you cannot stop the particle, but you can detect and correct the bit it flipped <Cite id="rel-baumann-2001" />.

## Qualification

"Reliable" is not an opinion; it is a set of tests a supplier must pass before selling. JEDEC publishes the methods — including how to calculate and declare a failure rate in FIT, in JESD85A <Cite id="rel-jesd85a" /> <Cite id="rel-jep122" />.

The **automotive** regime is harsher than consumer, and AEC-Q100 is the document that defines it: components meeting its specifications are held suitable for the harsh automotive environment **without additional component-level qualification testing** <Cite id="rel-aec-q100" />. The axis of that harshness is **operating temperature**, divided into grades:

| Grade | Ambient operating temperature range |
| --- | --- |
| **Grade 0** | **−40 °C to +150 °C** |
| Grade 1 | −40 °C to +125 °C |
| Grade 2 | −40 °C to +105 °C |
| Grade 3 | −40 °C to +85 °C |

<Cite id="rel-aec-q100" />

A high-temperature operating life (**HTOL**) test at grade 0 stresses the device at **+150 °C** for **1,000 h** <Cite id="rel-aec-q100" />. That is why automotive is a different regime: it demands that the silicon survive a thermal window and a mission time the consumer never sees, and the qualification explicitly lists the mechanisms that must be covered — **electromigration, TDDB, hot carrier injection, bias temperature instability and stress migration** <Cite id="rel-aec-q100" />.

## Why this is a materials story

It is worth closing on what this chapter shares with the rest of the site: **reliability starts in the material, not in the design**.

- Oxide breakdown is governed by the **defect density** in the dielectric, not by the circuit geometry <Cite id="rel-mcpherson-2012" />.
- The quality of the **oxide–silicon interface** is what let silicon work as a semiconductor — and what germanium could not deliver <Cite id="ecs-sio2-limits" />.
- Electromigration life depends on the metal's **purity and structure** and on the barrier that confines it; that is why copper only replaced aluminium once it came with a barrier <Cite id="ibm-cu-electroplating" />.

A good design **manages** these mechanisms — chooses margins, adds ECC, sizes wires. But it does not eliminate them: the materials decide which mechanisms exist and how fast they run. Just as [yield](/en/na-fab) is a measure of process defects, reliability is the measure of how those same defects age.

<SourceNote label="Sources" :ids="['rel-nist-bathtub', 'mil-std-883', 'semieng-burnin', 'ieee-burnin', 'rel-schroder-2003', 'rel-hu-1985', 'rel-mcpherson-2012', 'rel-black-1969', 'rel-jep122', 'rel-aec-q100', 'rel-jesd85a', 'rel-may-woods-1979', 'rel-ziegler-1979', 'rel-baumann-2001', 'voldman-esd', 'ecs-sio2-limits', 'ibm-cu-electroplating', 'ibm-copper']" />

<SeeAlso title="See also" :links="[
  { text: 'Packaging and test', href: '/en/empacotamento', note: 'burn-in and final test' },
  { text: 'Transistor evolution', href: '/en/transistores', note: 'what ages inside the die' },
  { text: 'In the fab', href: '/en/na-fab', note: 'gate oxide and copper interconnect' },
  { text: 'References', href: '/en/referencias', note: 'numbered list' },
]" />
