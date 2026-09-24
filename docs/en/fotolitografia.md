---
title: Photolithography
description: How the scanner carries light from the source to the wafer, the photoresist, resolution enhancement, immersion and the step-by-step process.
dataAsOf: 2025
---

# Photolithography

Photolithography is the step that **draws the circuit** on the wafer. **ASML** machines (which grew out of Philips), with nanometre precision, align the wafer in equipment that projects ultraviolet light through a **mask (reticle)** carrying the printed circuit; the photoresist reacts only at selected points.

The wafer positioning stage weighs about **15 kg** and can accelerate with a force of up to **20 G** (roughly three times the acceleration of a Formula 1 car), moving with **nanometre** precision for **multi-patterning** — several reticles in sequence to produce lines smaller than a single exposure allows. Any unwanted vibration can destroy the pattern.

When TSMC was still part of Philips, **hydraulic** linear motors were used: very precise, but demanding heavy maintenance — a significant cost and time sink until more robust solutions appeared.

<DiagramFigure src="/pdf-images/p12-1.png" alt="EUV exposure on an ASML wafer">
EUV exposure on a wafer — <a href="https://www.asml.com/" target="_blank" rel="noopener noreferrer">ASML</a> <Cite id="asml-gaa" />.
</DiagramFigure>

<DiagramFigure src="/pdf-images/p13-1.png" alt="Laser positioning diagram on a granite base">
*Laser controlled positioning and a solid, vibration-suppressing granite base ensure precise alignment of the exposure chuck.*
</DiagramFigure>

## How the light reaches the wafer

A scanner is, at heart, a very carefully controlled **optical path**. Light is born in a source (the **193 nm** excimer laser for DUV, or the **13.5 nm** tin plasma for EUV), passes through the **illuminator**, which shapes the beam and sets the illumination mode and the dose, crosses the **reticle**, and is reduced by the **projection optics** down to the wafer <Cite id="kato-litho" />.

<DiagramFigure src="/assets/scanner-optical-column.svg" alt="Cutaway of the optical path of a DUV immersion scanner: source, illuminator, reticle, projection optics, immersion water, wafer and the stage on a granite block">
The optical path of a DUV immersion scanner, from source to wafer. Drawn by the author.
</DiagramFigure>

The reticle does not hold the pattern at its final size: it is **larger**, and the optics **reduces** it by a fixed factor (4× in today's scanners). The reason is that a mask with features a few nanometres wide would not be manufacturable — it is easier to draw large and shrink than to draw at the target size.

Two parts off the optical axis make the design possible. The first is the **wafer stage**, which steps from field to field with nanometre precision and is therefore measured continuously by **laser interferometry**; the second is the **granite block**, solid and heavy, which absorbs vibration before it reaches the pattern.

## The photoresist

The photoresist is a **light-sensitive** polymer: exposure changes its solubility, and development turns that chemical change into a physical mask. In **positive** resists the exposed region is the one that dissolves; in **negative** resists, the opposite.

Modern resists are **chemically amplified** (*chemically amplified resist*, CAR): a single photon generates a catalyst that triggers many reactions, which allows exposure at low doses — and that is what makes today's throughput possible. In exchange, the film becomes more sensitive to contamination and edge effects.

<DiagramFigure src="/assets/photoresist-spin-coating.jpg" alt="Photoresist being spread by rotation over a silicon wafer">
Photoresist being spread by rotation over a wafer — <a href="https://commons.wikimedia.org/wiki/File:Photoresist_spin_coating.jpg" target="_blank" rel="noopener noreferrer">Photoresist spin coating</a>, Sei (CC BY-SA 4.0), Wikimedia Commons.
</DiagramFigure>

## Step-by-step process

<DiagramFigure src="/assets/lithography-process-steps.svg" alt="Six steps of lithography on a positive resist: substrate preparation, coating, soft bake, exposure, development and pattern transfer">
The six steps of the cycle, from the clean substrate to the etched pattern. Drawn by the author.
</DiagramFigure>

Performed in sequence, under strict control of temperature and contaminants:

1. **Substrate preparation and cleaning:** *dehydration bake* (200–400 °C); an adhesion promoter, **HMDS** (hexamethyldisilazane), makes the surface hydrophobic.
2. **Photoresist coating:** resist is deposited and spread by spin coating at thousands of RPM, forming a uniform micrometre- or nanometre-thick film.
3. **Soft bake:** hotplate at 90–100 °C — evaporates solvents, stabilises the film.
4. **Alignment and exposure:** steppers/scanners; a quartz reticle with chromium; **DUV (193 nm)** or **EUV (13.5 nm)** alters the solubility of the resist.
5. **Post-exposure bake (PEB):** 100–130 °C — catalyses latent reactions; reduces *standing waves* on the resist sidewalls.
6. **Development:** TMAH or puddle method; in a **positive** resist the exposed region dissolves; rinse with DIW and dry with N₂.
7. **Hard bake:** 120–150 °C — *cross-linking* so the resist withstands etching and implantation.
8. **Pattern transfer and stripping:** etching or **ion implantation**; resist removal with solvents or **plasma ashing**.

## Resolution enhancement and multi-patterning

There is a physical limit to what a single exposure can draw, and the industry spent **decades** working around it in software and in process rather than replacing the light source: **phase-shift** masks, **off-axis** illumination, optical proximity correction (**OPC**) and, when none of that was enough, **exposing more than once** <Cite id="asianometry-euv" />.

**Line doubling** is the most direct form of multi-patterning: the first pattern is etched into the hard layer, the second is exposed in the photoresist **between** the features that already exist, and in the next etch the two masks add up — the number of lines doubles without either exposure becoming finer.

<DiagramFigure src="/assets/line-doubling.svg" alt="Sequence of line doubling: a second exposure between features already etched, and etching of the layer with the two masks added together">
Line doubling: the final pattern comes from adding two exposures — <a href="https://commons.wikimedia.org/wiki/File:Line_doubling.svg" target="_blank" rel="noopener noreferrer">Line doubling</a>, Wdwd (CC BY 3.0), Wikimedia Commons (based on Guiding light, en.Wikipedia).
</DiagramFigure>

## Immersion: the water that stretched 193 nm

The trick that kept optical lithography alive for more than a decade was replacing the **air** between the last lens and the wafer with **purified water**. Because the refractive index of water is higher than that of air, the **effective** wavelength drops from 193 nm to about **135 nm** — with no change to optics, mask or photoresist <Cite id="asml-immersion" />.

<DiagramFigure src="/assets/immersion-lithography.svg" alt="Comparison of dry exposure with immersion exposure with water between the last lens and the wafer">
The last lens, the water and the wafer in immersion lithography — <a href="https://commons.wikimedia.org/wiki/File:Immersion_lithography_illustration.svg" target="_blank" rel="noopener noreferrer">Immersion lithography illustration</a>, Oleg Alexandrov (public domain), Wikimedia Commons.
</DiagramFigure>

**EUV** goes the opposite way. Because **everything absorbs EUV**, it uses neither lenses nor immersion: the light travels **reflected by multilayer mirrors**, in vacuum, and the mask itself is **reflective** <Cite id="asianometry-euv" />. That is why EUV arrived as a parallel technology, for the **7 nm node and below**, rather than as a replacement for the installed 193 nm immersion fleet.

The story of how that combination came about — the four optical generations, the discarded candidates and the election of EUV — is in [History of photolithography](/en/historia-fotolitografia).

## DUV: what 193 nm light still does

**DUV** (*deep ultraviolet*) lithography is the one that uses **excimer lasers**. An excimer is a molecule that only exists while it is electrically excited: the discharge brings together a noble gas and a halogen, which do not normally combine, and the temporary molecule gives the energy back as light at a wavelength set by the pair chosen <Cite id="asml-light" />. The **krypton + fluorine** pair (KrF) emits at **248 nm**; the **argon + fluorine** pair (ArF), at **193 nm** <Cite id="asml-light" />.

Each change of source shrank the smallest printable feature:

| Source | Wavelength | Smallest feature it unlocked |
|---|---|---|
| **g-line** (mercury lamp) | 436 nm | about 1 µm |
| **i-line** (mercury lamp) | 365 nm | below 1 µm, reaching 220 nm |
| **KrF** (excimer laser) | 248 nm | 150 nm; modern KrF reaches 80 nm |
| **ArF** (excimer laser) | 193 nm | 38 nm |
| **ArF with immersion** | 193 nm, about 134 nm effective in water | the 7 nm node, with multi-patterning |

DUV was **not retired** by EUV. A leading-edge fab uses both technologies in the same recipe: EUV exposes the few most critical layers and DUV, which is cheaper, prints all the rest <Cite id="asml-duv" /> <Cite id="branch-euv" />. That is why the 2000s never really ended for 193 nm lithography: the **NXT** platform, entirely water-immersed, runs **more than 6,000 300 mm wafers per day** and can still be upgraded in the field with node-enhancement packages <Cite id="asml-duv" />.

## The EUV light source: turning tin into plasma

EUV does not come out of a laser: it comes out of a **tin explosion**. Its **13.5 nm** light is more than **14 times** shorter than DUV <Cite id="asml-light" />, and it does not exist on Earth — it has to be manufactured.

Inside the vacuum vessel, a generator releases droplets of molten tin about **25 µm across** at **70 m/s** <Cite id="asml-light" />. Two things happen to each droplet, **50,000 times every second** <Cite id="asml-light" />:

1. A low-intensity **pre-pulse** flattens the droplet into a disc — the flattened shape yields more EUV light than the original sphere <Cite id="asml-highna-video" />.
2. The **main pulse**, about ten times more powerful than the lasers used to cut steel, vaporises the disc and turns it into **plasma**, which emits a broad spectrum with a clear peak at 13.5 nm <Cite id="trumpf-euv" />.

That plasma sits at roughly **40 times the surface temperature of the Sun** <Cite id="asml-highna-video" />. A parabolic **collector mirror** gathers the light emitted in every direction and focuses it onto the **intermediate focus**, the aperture through which it enters the illuminator <Cite id="asml-euv-products" />.

<DiagramFigure src="/assets/euv-source.svg" alt="Schematic section through the EUV source: a tin droplet generator at the top, droplets falling along the axis, a CO2 laser arriving from the sub-fab, the plasma at the centre, a parabolic collector mirror on the right and the intermediate focus on the left, where the light leaves for the illuminator">
The tin plasma source, from droplet to intermediate focus. Drawn by the author, from ASML and TRUMPF.
</DiagramFigure>

<YouTubeEmbed id="MfFGRl00LKY" title="Inside the machine: how a High NA system generates EUV light" />

### The power that was missing

The CO₂ laser that drives the explosion is one of the most powerful machines ever built in series: about **40 kW** of pulsed power at 50 kHz, fed by a **1 MW** supply, and even so only around **200 W** reach the wafer <Cite id="laserfocus-euv" />. The reason is in the next section — the losses along the optical path.

Getting there took far longer than promised. When industrial development began the source delivered **single-digit watts**; the target that would make 125 wafers per hour viable was **250 W**, so it was **two orders of magnitude** short <Cite id="asml-euv-podcast" />. Power climbed in steps — 40 W, 80 W, 125 W and finally 250 W — and the first demonstration of continuous 250 W at a customer only came in **early 2018**, roughly **six years** after the date originally promised <Cite id="asml-euv-podcast" />.

Three obstacles dominated that period <Cite id="asml-euv-podcast" />. The first was the **pre-pulse**. The second appeared because of it: some of the light came **reflected back into the laser** and stole power from the next pulse, which called for a "light switch" — an optical isolation module. The third was **tin fouling the collector mirror**: the explosion threw debris in every direction and the mirror's reflectivity dropped. The fix came partly by accident — reflectivity improved after every maintenance session, and the cause turned out to be a small amount of **oxygen** chemically cleaning the mirror <Cite id="asml-euv-podcast" />.

<YouTubeEmbed id="EWVJ1Iwa00E" title="Making EUV work: Episode 3 — from lab to fab" />

## Mirrors instead of lenses

Because **everything absorbs EUV** — air, glass, the mask itself — the whole light path must be in **vacuum**, and there are no lenses: only **mirrors** <Cite id="asml-euv-products" />.

An EUV mirror does not look like an ordinary mirror. It is a **Bragg reflector**: dozens of alternating pairs of **molybdenum and silicon**, each layer a few nanometres thick <Cite id="branch-euv" />. At every boundary between the two materials only about **3%** of the light is reflected and the rest passes through <Cite id="branch-euv" />. But because all of those reflections emerge **in phase**, they add up through constructive interference to about **70% per mirror** <Cite id="branch-euv" />.

<DiagramFigure src="/assets/euv-bragg-mirror.svg" alt="On the left, a cross-section of a Bragg reflector with alternating molybdenum and silicon layers, an incoming beam and parallel partial reflections leaving it; on the right, the light-loss chain: 100% at the source, 70% after one mirror, 49% after two, 17% after five and under 10% at the wafer after ten mirrors">
The Bragg reflector and the light budget along the scanner. Drawn by the author, from ASML/Branch Education.
</DiagramFigure>

That explains the enormous laser in the previous section. An EUV scanner has **more than ten** mirrors between the source and the wafer; at 70% each, less than **10%** of the plasma light reaches the wafer <Cite id="branch-euv" />. That is why the source has to be unbelievably bright — and why every part of the path, including the mask, has to be a mirror.

The mirrors are made by **ZEISS**, a long-standing ASML partner, and are polished to a figure error of less than **one atom** <Cite id="branch-euv" />. But they absorb the 30% they do not reflect, so they heat up and distort: part of the control job is to **mitigate that heating** and keep the image stable <Cite id="asml-nxe3800e" />.

<DiagramFigure src="/assets/duv-vs-euv.svg" alt="Two optical paths side by side: on the left DUV at 193 nm, passing through a quartz reticle, glass lenses and a film of water to the wafer; on the right EUV at 13.5 nm, reflecting off a reticle and multilayer mirrors and travelling in vacuum to the wafer">
The two optical paths side by side. Drawn by the author, from ASML.
</DiagramFigure>

### The mask is a mirror too

In DUV the reticle is a plate of **quartz with chromium**, transparent: light passes through it and the pattern is printed by the chromium-covered parts. There is no material transparent to 13.5 nm, so the EUV reticle is **reflective** — a Bragg reflector with an absorbing layer patterned on top <Cite id="asml-euv-products" />.

That creates a problem DUV never had. In DUV, a protective **pellicle** covers the mask and keeps particles out of the focal plane. For EUV that pellicle **did not exist**: almost nothing is transparent to that light, and the version that proved viable is only **30 to 40 nm** thick — so thin that it was hard even to handle without breaking it <Cite id="asml-euv-podcast" />. The EUV pellicle had to be invented along with the rest of the ecosystem, because nobody wanted to invest in it before believing EUV would work <Cite id="asml-euv-podcast" />.

## DUV and EUV side by side

|  | **DUV with immersion** | **EUV** |
|---|---|---|
| Wavelength | 193 nm | 13.5 nm |
| Light source | ArF excimer laser | tin plasma |
| Optics | glass lenses, transmissive | multilayer mirrors, reflective |
| Medium | air and water | vacuum |
| Mask | quartz with chromium, transmissive | reflective, with a pellicle tens of nm thick |
| Numerical aperture | up to 1.35 | 0.33 (NXE) or 0.55 (EXE) |
| Resolution | 38 nm in one exposure; less with multi-patterning | 13 nm (NXE); 8 nm (EXE) |
| Role in the fab | prints most of the layers | prints the few critical layers |

## High-NA: the EXE system

The **numerical aperture** (NA) measures the cone of light the optics can collect and focus. Rayleigh's equation, `CD = k1 × λ ÷ NA`, shows what happens when NA goes up: keeping 13.5 nm light and a k1 near 0.3, the **NXE** (NA 0.33) resolves **13 nm** and the **EXE** (NA 0.55) resolves **8 nm** <Cite id="asml-nxe3600d" /> <Cite id="asml-highna" />.

<DiagramFigure src="/assets/high-na-anamorphic.svg" alt="Comparison of two numerical apertures: the 0.33 NA system with a narrow cone and 13 nm resolution, and the 0.55 NA system with a visibly wider cone and 8 nm resolution; below, exposure fields of 26 by 33 mm and 26 by 16.5 mm">
A larger numerical aperture collects a wider cone — and therefore resolves smaller features. Drawn by the author, from ASML.
</DiagramFigure>

<YouTubeEmbed id="h_zgURwr6nA" title="Unveiling High NA EUV (ASML)" />

The gain is large: features **1.7 times smaller** and therefore transistor densities **2.9 times higher** <Cite id="asml-highna" />. The price is the optics. To reach an NA of 0.55 the mirrors become much larger, and the light can no longer clear them unobstructed in the scan direction. The answer was **anamorphic** optics: **8× reduction in the scan direction** and 4× across it, which **halves the exposure field** (26 × 16.5 mm instead of 26 × 33 mm) and forces the wafer and reticle stages to be much faster <Cite id="asml-exe5200b" /> <Cite id="asml-highna" />.

The platform has three milestones so far:

- **EXE:5000** — the first High-NA system. Its first modules shipped to **Intel in December 2023**, and it prints **more than 185 wafers per hour** <Cite id="asml-highna" /> <Cite id="asml-unveiling-highna" />.
- **EXE:5200B** — the successor aimed at volume production. It keeps the 8 nm resolution, improves imaging contrast by **40%** and overlay to **0.7 nm**, and **Intel completed acceptance testing in December 2025** for its 14A node <Cite id="asml-exe5200b" /> <Cite id="intel-exe5200b" />.
- **Installed base** — five EXE:5000 research systems were installed at Intel (two), TSMC, Samsung and the joint ASML-imec lab, and the first production **EXE:5200B** shipped in **July 2025** <Cite id="bits-chips-exe5200b" />.

### The family of machines

The throughput figures below are measured at different doses — 30 mJ/cm² on the NXE systems and 50 mJ/cm² on the EXE — so the numbers are not directly comparable across columns <Cite id="asml-nxe3600d" /> <Cite id="asml-exe5200b" />.

| Platform | NA | Light | Resolution | Throughput |
|---|---|---|---|---|
| **NXT** (immersion) | 1.35 | ArF 193 nm | 38 nm in one exposure | more than 6,000 wafers/day |
| **NXE:3600D** | 0.33 | EUV 13.5 nm | 13 nm | 160 wafers/h |
| **NXE:3800E** | 0.33 | EUV 13.5 nm | 13 nm | 220 wafers/h |
| **NXE:4000F** (defined) | 0.33 | EUV 13.5 nm | 13 nm | 250 wafers/h or more |
| **EXE:5000** | 0.55 | EUV 13.5 nm | 8 nm | more than 185 wafers/h |
| **EXE:5200B** | 0.55 | EUV 13.5 nm | 8 nm | 175 wafers/h, at the higher dose |

<SourceNote label="Sources" :ids="['kato-litho', 'asml-immersion', 'asianometry-euv', 'asml-gaa', 'asml-light', 'asml-duv', 'asml-euv-products', 'trumpf-euv', 'asml-highna-video', 'asml-euv-podcast', 'laserfocus-euv', 'branch-euv', 'asml-nxe3600d', 'asml-nxe3800e', 'asml-investor-euv', 'asml-highna', 'asml-exe5200b', 'intel-exe5200b', 'bits-chips-exe5200b', 'asml-unveiling-highna']" />

## Videos

<SourceNote label="Related videos" :ids="['asml-gaa', 'asml-highna-video', 'asml-unveiling-highna', 'asml-euv-podcast', 'branch-euv']" />

<YouTubeEmbed id="B2482h_TNwg" title="The $200M Machine that Prints Microchips: the EUV Photolithography System (Branch Education, sponsored by ASML)" />

<YouTubeEmbed id="jL7HvnBgrJ4" title="ASML process" />

<YouTubeEmbed id="rCwgAGG2sZQ" title="RTX 5090 chip deep-dive" />

<SeeAlso title="See also" :links="[
  { text: 'History of photolithography', href: '/en/historia-fotolitografia', note: 'from contact printing to EUV' },
  { text: 'Wafer fabrication', href: '/en/fabricacao-wafers', note: 'the post-CMP surface lithography requires' },
  { text: 'Transistor evolution', href: '/en/transistores', note: 'what lithography made possible' },
  { text: 'Glossary', href: '/en/glossario', note: 'DUV, EUV' },
]" />
