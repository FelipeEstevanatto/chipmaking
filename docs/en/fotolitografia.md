---
title: Photolithography
description: How the scanner carries light from the source to the wafer, the photoresist, resolution enhancement, immersion and the step-by-step process.
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

<SourceNote label="Sources" :ids="['kato-litho', 'asml-immersion', 'asianometry-euv', 'asml-gaa']" />

## Videos

<SourceNote label="Related videos" :ids="['asml-gaa']" />

<YouTubeEmbed id="jL7HvnBgrJ4" title="ASML process" />

<YouTubeEmbed id="rCwgAGG2sZQ" title="RTX 5090 chip deep-dive" />

<SeeAlso title="See also" :links="[
  { text: 'History of photolithography', href: '/en/historia-fotolitografia', note: 'from contact printing to EUV' },
  { text: 'Wafer fabrication', href: '/en/fabricacao-wafers', note: 'the post-CMP surface lithography requires' },
  { text: 'Transistor evolution', href: '/en/transistores', note: 'what lithography made possible' },
  { text: 'Glossary', href: '/en/glossario', note: 'DUV, EUV' },
]" />
