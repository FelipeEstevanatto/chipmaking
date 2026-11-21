<p align="center">
  <img src="docs/public/favicon.svg" alt="Silicon wafer with its orientation notch" width="88" height="88">
</p>

<h1 align="center">Chipmaking</h1>

<p align="center">A sourced, bilingual guide to how silicon becomes a chip, from the quartz mine to the gate-all-around transistor.</p>

<p align="center">
  <a href="https://felipeestevanatto.github.io/chipmaking/en/"><b>Read the site</b></a> ·
  <a href="https://felipeestevanatto.github.io/chipmaking/">Versão em português</a> ·
  <a href="README.pt-BR.md">README em português</a>
</p>

<img width="1753" height="707" alt="Home page of the Chipmaking site: a drawing of a silicon wafer beside the title, the chapter cards and the production-chain strip" src="https://github.com/user-attachments/assets/55ab5a82-8b2b-454a-942d-c018d1561f52" />

Written and maintained by [Felipe Estevanatto](https://github.com/FelipeEstevanatto).

## About

Chipmaking follows silicon through its whole production chain: quartz mining, the arc furnace, polysilicon refining, crystal growth and wafer slicing, the fab loop, lithography from contact printing to High-NA EUV, transistor generations from planar to CFET, packaging, and the solar branch of the same material. It grew out of a Portuguese summary document, `Resumo Chipmaking.pdf`, and became a static site with every factual claim tied to the source that measured it.

## What is in it

- **Two languages, one text.** Every chapter exists in Portuguese and English, file for file, and a CI check fails when their glossary annotations drift apart.
- **292 numbered sources.** Each number in the prose carries a `[n]` marker that resolves to the references page, and the rule is to cite whoever measured, not whoever repeated it.
- **54 original drawings** of process steps and device structures, plus four credited third-party diagrams, and interactive pieces: USGS production charts, a WebGL crystal viewer that computes packing fractions from the unit cell, an animation of the arc-furnace chemistry, a fab-loop explorer, a yield explorer, a lithography resolution calculator and an oxide-growth explorer.
- **A 67-term glossary** that annotates each term on its first use per page.
- **Chart data as CSV**, generated from the same specs that draw the charts, so the downloadable data and the picture cannot disagree.
- **Audits in CI.** Every push runs checks for prose style, drawing structure, glossary coverage, maths rendering, internal links, citation integrity, a sentence-length budget and a number-parity report between the two languages.

## Chapters

The site follows the order of the chain. Links go to the English edition.

| Stage | Chapters |
| --- | --- |
| Overview | [Introduction](https://felipeestevanatto.github.io/chipmaking/en/introducao) · [The silicon element](https://felipeestevanatto.github.io/chipmaking/en/o-elemento-silicio) · [Timeline](https://felipeestevanatto.github.io/chipmaking/en/linha-do-tempo) · [Glossary](https://felipeestevanatto.github.io/chipmaking/en/glossario) |
| 1. Raw material | [Mining & MG-Si](https://felipeestevanatto.github.io/chipmaking/en/mineracao-mg-si) |
| 2. Refining | [Polysilicon](https://felipeestevanatto.github.io/chipmaking/en/polissilicio) |
| 3. Wafer | [Wafer fabrication](https://felipeestevanatto.github.io/chipmaking/en/fabricacao-wafers) · [Crystal structure](https://felipeestevanatto.github.io/chipmaking/en/estrutura-wafers) |
| 4. In the fab | [In the fab](https://felipeestevanatto.github.io/chipmaking/en/na-fab) · [Photolithography](https://felipeestevanatto.github.io/chipmaking/en/fotolitografia) · [History of photolithography](https://felipeestevanatto.github.io/chipmaking/en/historia-fotolitografia) · [Fab consumables](https://felipeestevanatto.github.io/chipmaking/en/insumos-fab) |
| 5. Devices | [Transistor evolution](https://felipeestevanatto.github.io/chipmaking/en/transistores) · [Reliability](https://felipeestevanatto.github.io/chipmaking/en/confiabilidade) |
| 6. After the fab | [Packaging and test](https://felipeestevanatto.github.io/chipmaking/en/empacotamento) |
| Photovoltaics | [Solar cells and modules](https://felipeestevanatto.github.io/chipmaking/en/celulas-solares) |
| Panorama | [Prices and value](https://felipeestevanatto.github.io/chipmaking/en/precos-e-valor) · [Beyond silicon](https://felipeestevanatto.github.io/chipmaking/en/alem-do-silicio) · [The chokepoint map](https://felipeestevanatto.github.io/chipmaking/en/gargalos) · [Data and numbers](https://felipeestevanatto.github.io/chipmaking/en/dados) |
| Sources | [References](https://felipeestevanatto.github.io/chipmaking/en/referencias) |

## Running it locally

Built with [VitePress](https://vitepress.dev/) and [Bun](https://bun.sh/). The audits need Python 3.

```bash
bun install
bun run dev       # http://localhost:5000/chipmaking/
bun run build     # writes docs/.vitepress/dist
bun run audit     # the audits CI runs
```

Each push to `main` builds the site and publishes it to GitHub Pages through `.github/workflows/deploy-pages.yml`.

## Contributing

Pull requests are welcome, under four rules:

1. **Source every fact.** A number or factual claim goes in with a `<Cite id="…" />` and an entry in `docs/.vitepress/theme/citations.ts`. A PR without a source is not merged, and an invented source closes it.
2. **Change both languages.** An edit to `docs/<slug>.md` goes in the same commit as `docs/en/<slug>.md`.
3. **One change per PR.** A new chapter, a data fix and a layout change go in separate PRs.
4. **Run the checks.** `bun run build`, then `bun run audit`. Every audit must print `OK`, except `audit-numbers`, which is a report to read.

Third-party images need a free licence (public domain, CC BY or CC BY-SA) and a full credit in the caption. The writing and structure conventions are in [`AGENTS.md`](AGENTS.md).

## Licence

The text, the original drawings and the data are released under [CC BY 4.0](LICENSE-CONTENT): you may copy and adapt them with credit to the author. The code (theme, components and scripts) is [MIT](LICENSE). Third-party images keep the licence stated in their captions.
