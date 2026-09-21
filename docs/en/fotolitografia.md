---
title: Photolithography
description: ASML equipment, wafer positioning and the steps of the DUV/EUV photolithography flow.
---

# Photolithography

**ASML** machines (which grew out of Philips), with nanometre precision, align wafers in equipment that projects ultraviolet light through a **mask (reticle)** carrying the printed circuit, reacting with the photoresist only at selected points.

The wafer positioning stage weighs about **15 kg** and can accelerate with a force of up to **20 G** (roughly three times the acceleration of a Formula 1 car), moving with **nanometre** precision for **multi-patterning** — several reticles in sequence to produce lines smaller than a single exposure allows. Any unwanted vibration can destroy the pattern.

When TSMC was still part of Philips, **hydraulic** linear motors were used: very precise, but demanding heavy maintenance — a significant cost and time sink until more robust solutions appeared.

<DiagramFigure src="/pdf-images/p12-1.png" alt="EUV exposure on an ASML wafer">
EUV exposure on a wafer — <a href="https://www.asml.com/" target="_blank" rel="noopener noreferrer">ASML</a> <Cite id="asml-gaa" />.
</DiagramFigure>

<DiagramFigure src="/pdf-images/p13-1.png" alt="Laser positioning diagram on a granite base">
*Laser controlled positioning and a solid, vibration-suppressing granite base ensure precise alignment of the exposure chuck.*
</DiagramFigure>

## Videos

<SourceNote label="Related videos" :ids="['asml-gaa']" />

<YouTubeEmbed id="jL7HvnBgrJ4" title="ASML process" />

<YouTubeEmbed id="rCwgAGG2sZQ" title="RTX 5090 chip deep-dive" />

## Step-by-step process

Performed in sequence, under strict control of temperature and contaminants:

1. **Substrate preparation and cleaning:** *dehydration bake* (200–400 °C); an adhesion promoter, **HMDS** (hexamethyldisilazane), makes the surface hydrophobic.
2. **Photoresist coating:** resist is deposited and spread by spin coating at thousands of RPM, forming a uniform micrometre- or nanometre-thick film.
3. **Soft bake:** hotplate at 90–100 °C — evaporates solvents, stabilises the film.
4. **Alignment and exposure:** steppers/scanners; a quartz reticle with chromium; **DUV (193 nm)** or **EUV (13.5 nm)** alters the solubility of the resist.
5. **Post-exposure bake (PEB):** 100–130 °C — catalyses latent reactions; reduces *standing waves* on the resist sidewalls.
6. **Development:** TMAH or puddle method; in a **positive** resist the exposed region dissolves; rinse with DIW and dry with N₂.
7. **Hard bake:** 120–150 °C — *cross-linking* so the resist withstands etching and implantation.
8. **Pattern transfer and stripping:** etching or **ion implantation**; resist removal with solvents or **plasma ashing**.

<SeeAlso title="See also" :links="[
  { text: 'Wafer fabrication', href: '/en/fabricacao-wafers', note: 'the post-CMP surface lithography requires' },
  { text: 'Glossary', href: '/en/glossario', note: 'DUV, EUV' },
  { text: 'References', href: '/en/referencias', note: 'ASML GAAFET' },
]" />
