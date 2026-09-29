# Project rules

Applies to every file this repo ships: `docs/**/*.md` in both locales, `README.md`, this file, UI copy
in `docs/.vitepress/theme/*.vue`, the drawings in `docs/public/assets/`, and commit messages.

Two halves. First how the site is put together, then how it reads. Both apply while writing, not as a
cleanup pass afterwards.

## Sources

Every factual claim carries a `<Cite id="…" />` that resolves to a key in
`docs/.vitepress/theme/citations.ts`.

- **Never invent a source, and never ship a number without one.** Cite who measured, not who repeated
  it.
- One marker, one claim. Never drop, duplicate, or move a `<Cite>` to a different sentence.
- A new source appends an entry to `citations.ts`: `key`, `num`, `title`, `publisher?`, `url?`,
  `short`. `num` is both the display number and the row order on `/referencias`, so append at the end;
  renumbering breaks every marker and every `#ref-<n>` anchor in the repo.
- The numbered list on `/referencias` renders from that array through `RefList`. Never write it by
  hand.
- When no primary source tabulates a series, the entry says it is a **compilation** and names the
  aggregator. Don't lend a paper's authority to a number it does not publish. A number derived from
  an already-cited table cites that table, not a new source.
- Series and components use `SourceNote` (label, short names, `<Cite>`). Prose uses `<Cite>` inline.
- Third-party media credits author, original file and licence in the `figcaption`, with a link to the
  source page. Prefer public domain or CC BY / CC BY-SA, and check the file description before using
  it: the Commons `ImageDescription` often reveals the image is something else.

## The two locales

- Every chapter exists twice: `docs/<slug>.md` (Portuguese) and `docs/en/<slug>.md` (English). Change
  both in the same edit. `python scripts/audit-glossary.py` fails when they drift apart.
- Translate the sentence, don't transliterate it. The English is a mirror of the Portuguese, not a
  word-for-word rendering.
- Numbers: PT writes `1.700` and `0,47 %`; EN writes `1,700` and `0.47%`.
- Glossary terms are annotated on first use per page. The audit enforces this; don't fight it.
- Cross-links use the `SeeAlso` component, never a raw `<a href="/…">`. VitePress only rewrites
  Markdown links, so a raw anchor loses the `/chipmaking/` base.

## Chapters

- **One spine, declared at the start.** A chapter opens with the ordered list of what it explains (the
  steps of a cell, the transistor generations, the modules of the fab), once, as navigation: a
  sentence introducing it, the list, and a sentence saying the rest follows that order. The list
  points at the sections; it does not summarise them.
- **An enumeration has one home.** A list that also appears in an interactive component or a table
  lives in a `.ts` module. `theme/transistor-eras.ts` is the example, read by `TransistorTimeline`,
  `TransistorFacts` and the timeline page. No consumer keeps its own copy.
- **Reference material never opens a chapter.** Summary table, addendum and chronology come after the
  narrative.
- Every item of the spine needs a figure. A gap is a visible hole, not an economy.

## Glossary

`docs/.vitepress/glossary.ts` is the single source: each entry declares `pt` and `en` (both required
by the type, which stops the locales from drifting), the chapter that explains it, optional
`variants`, and `tooltip: false` for spellings too ambiguous to annotate in running prose.
`theme/GlossaryTable.vue` renders `/glossario` and `/en/glossario` from it; never write the table by
hand. `glossary-tooltips.ts` annotates the first occurrence of each term per page, but it cannot reach
code (including Mermaid), link labels, headings, `figcaption`, equations, or text a component builds
from props. A term may therefore appear bare near the top and be annotated further down, and a term
first used inside an equation is annotated at its first prose mention. Any component that renders
prose from props goes on the audit's ignore list.

## Charts

- `theme/charts/specs.ts` is the single source for every chart. A spec is deliberately serialisable,
  no functions, because `scripts/export-chart-data.ts` reads the same list into
  `docs/public/data/<slug>.csv`. Run it after touching a series; the chart and the CSV cannot diverge.
- A chart in Markdown goes inside `<ClientOnly>`. Without it the caption text lands in the built HTML
  and counts as a glossary first use the plugin cannot reach.
- Captions render as plain text, so no `[links](…)` and no `**bold**` inside a spec.
- A chart with data cites `sourceIds`; a drawing with no data behind it sets `schematic: true` and the
  caption says it is a diagram.
- Every string a chart draws carries both locales: axis titles, series names, and category labels,
  which `ChartSpec.labels` types as a pair so a word cannot reach the wrong page. A number is its own
  label in either language. `scripts/export-chart-data.ts` refuses a bare string label, since the
  build strips types without checking them.
- The CSVs are the one place the site writes English. Both locales link the same file, so it follows
  the drawings' rule rather than either page's language.

## The 3D viewer

`theme/CrystalViewer.vue` draws the crystals of `theme/crystal/structures.ts` in WebGL2: a cell (lattice
parameters, basis sites, the symmetry operations in CIF form) goes in, `crystal/geometry.ts` repeats
it and finds the bonds by distance, and `crystal/renderer.ts` instantiates a sphere and a cylinder
over the result. A new structure is a data entry, never a hand-placed set of coordinates.

- Distances follow the published cell and the display radii are one common fraction of the covalent
  radii; the panel states that in the reader's language, because a drawing that shrinks atoms has to
  say so.
- The occupancy panel beside the view draws one unit cell at true size, cut open at its own faces,
  so a corner atom shows the fraction that belongs to the cell rather than a whole sphere hanging
  outside it. The percentage is computed from the cell contents and the covalent radii, never typed
  in, and the model it uses (spheres touching along the bond) is printed with it: for silicon it
  reproduces the textbook 34%, which is what keeps the number honest for the other four.
- A cut atom is solved, not clipped: the fragment finds where the eye ray first meets the sphere
  inside the cell, and draws the cell face it was cut on as a section, hatched at 45 degrees at a
  fixed pitch on the screen. Clipping the sphere and trusting the depth buffer instead leaves the
  atom's far inside wall in place of the cut, which reads as a scooped-out ball.
- The panel opens on a corner of the cell, where those cut faces point at the reader rather than
  away from them; `CrystalRenderer.create` takes the opening angle and `reset` returns to it.
- Both drawings can take the whole screen. The unit cell expands the panel and not just the canvas,
  so the percentage and the model line travel with the picture; the buttons are left out where the
  browser says full screen is not available, which is what an embedded frame without the permission
  reports.
- The viewer is wrapped in `<ClientOnly>` and its class sits on the glossary audit's ignore list, like
  every component that renders prose from props.
- It has to work without a pointer and without a mouse: the buttons, the arrow keys and `Home` are
  wired, and the scene stands still for a reader who asked for reduced motion.

## The furnace animation

`theme/FurnaceChemistry.vue` is the interactive view of the carbothermal reactions in *Mineração e MG-Si*: a
canvas player with four beats, wrapped in `<ClientOnly>`.

- `theme/furnace-stages.ts` holds the beats (temperature band, equation, localised title and note, and
  the cast of atoms). `theme/furnace-scene.ts` is the plain canvas model that animates them, with no
  Vue in it, so the choreography can be exercised from a scratch page.
- Actors are matched by `id` across stages, so an atom that carries over keeps travelling; a stage
  that does not mention an actor sends it away. Bonds are only drawn while their two atoms are close
  enough, which is what keeps a later stage's bond from stretching across the panel.
- The drawing is a schematic of the bond changes, not a balanced atom count, and the caption says so.
  The equation printed under the canvas carries the stoichiometry.
- The class sits on the glossary audit's ignore list, the palette follows the site's light and dark
  themes, the loop pauses when the component is off screen, and reduced motion gets the same four
  pictures without the animation.

## Reading aids

`ReadingProgress.vue` draws the progress bar; `DocMeta.vue` shows reading time, figure count and the
freshness stamp. The stamp comes from the `dataAsOf` frontmatter field: the year of the most recent
datum cited, not the edit date. `celulas-solares` describes the industry with 2011 numbers while
`estrutura-wafers` cites the current year, and the reader should be able to tell. Purely historical
chapters (`linha-do-tempo`, `historia-fotolitografia`) and navigation pages (`glossario`,
`referencias`) carry no field on purpose.

## Drawings

Own schematics live in `docs/public/assets/*.svg`; PDF-extracted figures in `docs/public/pdf-images/`.
`python scripts/extract-pdf-images.py` regenerates the second set.

- Pure ASCII. Use numeric references (`&#176;`, `&#8594;`) for `°` and `→`: named HTML entities such
  as `&minus;` do not exist in XML and break the whole file.
- Root `<svg>` carries `width`, `height`, `viewBox` and `role="img"`. Without `width`/`height`,
  `naturalWidth` is 0 and `ZoomableImage` cannot size the image.
- The first drawing child is an opaque `<rect>` covering the `viewBox`, in high-contrast ink
  (`#1a202c` / `#2d3748` on white). The zoom overlay is a dark lightbox, so a transparent drawing
  disappears in dark mode and on zoom.
- `<title>` and `<desc>` on every drawing, both in English and locale-neutral. The `<desc>` restates
  the drawing for a screen reader and records the scale caveat. Neither replaces the translated
  caption.
- Labels are short English technical terms. Sentences, paragraphs and footnotes go in the caption.
  Numbers use the decimal point, because the file is shared (`1.00 mm`, not `1,00 mm`).
  `python scripts/audit-svgs.py` fails on any `<text>` of 60 characters or more, any Portuguese label,
  and any named entity.
- Body text 17–18 px, notes 16,5 px. The prose column is 638 px wide, so a 960-wide `viewBox` reaches
  the screen at roughly 0.66×. Measure with `img.getBoundingClientRect()` instead of trusting the
  `viewBox`.
- Annotation grammar, shared by every figure. Arrows come from a `<marker>` in `<defs>` (triangle
  `M 0 0 L 10 5 L 0 10 z`, `orient="auto-start-reverse"`). A label that reaches a feature uses class
  `.lead` (dashed `#718096`, 1.2 px, no arrowhead); a dimension line uses `.dim` (solid, same grey).
  The value is bold and the unit regular, one space apart (`3 nm`). Comparison panels share an axis
  and keep their titles in `.pt`/`.t`. Fixed colours: silicon `#cfd8e3` on `#7d8b9c`, mask and
  dielectric wall `#805ad5`, copper `#ed8936`, alert `#c53030`.
- `wafer-identification.svg` is generated by `scripts/gen-wafer-identification-svg.py`; run the
  script, don't edit the SVG.
- To check a drawing without looking at it, build a `<canvas>`, draw the SVG, sample pixels at known
  coordinates and read `getBBox()` of its `<text>` nodes. Run it before writing the caption: the usual
  error is a label that clips the edge, not the geometry. For a `<pattern>` fill, sample the fraction
  of painted pixels, since a missing `url(#id)` draws nothing and fails silently.

## Embeds

`YouTubeEmbed` (youtube-nocookie.com) and `VideoPressEmbed` (the PV-Manufacturing.org player) are 16:9
and lazy-loaded; credit the source in the text and in the references. Mermaid fences render in the
client through `theme/Mermaid.vue`, with the renderer swapped for an async import so the ~680 kB
library is not preloaded on pages without a diagram. Timelines set `useMaxWidth: false` to keep their
labels legible.

## Equations

Maths is delimited with `$...$` and `$$...$$` and typeset by MathJax at build time (`math: true` in
`config.ts`). The output is SVG, so a page with equations adds no JavaScript and no webfont to the
client.

`\[ ... \]` and `\( ... \)` do not work, and never did: markdown-it's inline escape rule strips the
backslash from every punctuation escape, so `\,` arrives as a comma and `\[` as a literal bracket.

A literal dollar sign in prose must be written `\$`. Two unescaped `$` in the same block are read as
delimiters and the text between them disappears into a formula, which is how `US$/Wp` and `US$/kg`
used to swallow the sentence around them. Every currency amount in the chapters is escaped this way.

`scripts/audit-math.py` holds the list of pages that are supposed to carry maths, so an equation that
loses its delimiters, or a currency amount that regains them, fails a check instead of the page.

`markdown-it-mathjax3` writes a MathJax stylesheet beside every equation, and Vue discards `<style>`
tags found inside a component template, so those blocks never applied and `vite dev` logged one warning
per equation. `math-styles.ts` strips them and restores the `tabindex` VitePress wants on display
maths; the rules the pages need (the display centring, the clipped accessibility copy, the error
colour) live in `theme/custom.css`, where the build leaves them alone.

# How it reads

The rules below come from the `no-ai-slop` skill (`~/.agents/skills/no-ai-slop/SKILL.md`, after
<https://github.com/petergyang/no-ai-slop>). Run that skill for a full prose pass.

## Words to cut

Banned outright: delve, foster, leverage, utilize, facilitate, empower, streamline, robust,
cutting-edge, paradigm shift, game changer, tapestry, realm, beacon, multifaceted, meticulous,
intricate, paramount, transformative, elevate, embark, supercharge, harness, ever-evolving.

Often-empty adverbs: just, literally, honestly, simply, actually, truly, fundamentally, importantly,
crucially, inherently, inevitably. Keep one when it carries emphasis, uncertainty, contrast, or the
writer's spoken rhythm.

Often-empty phrases: it's worth noting, it's important to note, at the end of the day, when it comes
to, at its core, in today's world, in the age of, the reality is, the truth is, in terms of, with
regard to, in order to, going forward.

## Patterns to cut

**Binary contrasts.** "This is not X. It's Y." State Y. "The question isn't the model. It's the
eval." becomes "The eval matters more than the model."

**Throat-clearing openers.** "Here's the thing," "Let me be clear," "I'll be honest," "The
uncomfortable truth is." Cut them and state the point.

**Faux-insight setups.** "What most people get wrong," "Here's what nobody tells you," "The part
everyone misses." These flatter the writer as the lone expert. Make the claim stand on its own.

**Colon reveals.** A noun phrase, a colon, then a lowercase dramatic payoff: "The best part: it
learns." Write a plain sentence instead. Colons are for lists, labels, and quotes. Use sentence case
after a colon unless grammar, a proper noun, a title, or code requires otherwise.

**Superficial analysis.** Cut trailing `-ing` clauses that pretend to explain meaning: "highlighting
the team's commitment," "showcasing," "underscoring," "reflecting." Say what actually happened and
what it changed.

**Importance puffery.** "Stands as a testament," "marks a pivotal moment," "plays a vital role,"
"solidifies its position." State the fact and let the reader judge. "The launch marks a pivotal
moment" becomes "The launch is the company's first paid product."

**Interpretive metadiscourse.** "That last part matters more than it sounds," "The key point is,"
"As you can see," "This distinction matters," "In other words." If the point is clear, delete the
aside.

**Weasel attribution.** "Experts agree," "industry reports suggest," "many argue," "studies show."
Name the source or cut the claim. Never invent a source; this repo cites primary documents via
`<Cite>`.

**Fake-strong verbs.** Prefer "is" and "has" when they are clearer. "The app serves as a centralized
hub for sponsors" becomes "The app tracks sponsors, drafts, and approvals in one place."

**Synonym cycling.** If the clear word is right, repeat it. "The agent reviews the draft. The
assistant scores the piece." becomes "The agent reviews the draft, scores it, and suggests fixes."

**Negative listing.** "Not X. Not Y. Z." Say Z.

**Dramatic fragmentation.** "That's it. That's the whole thing." Use complete sentences.

**Robotic rhythm.** Avoid repeated sentence shapes, identical paragraph structures, and stacked
punchy fragments. Vary the shape only when it helps the point.

**Rhetorical setups.** "What if I told you…", "Think about it:", "Plot twist:", self-answered
"Question? Answer." pairs. Drop them.

**Fake-profound kickers.** Delete the final "deep" line when it turns the point into a metaphor,
aphorism, or mic-drop. Don't rewrite it into a better metaphor; end on the clearest concrete sentence
you already have.

**Summary-recap endings.** "In conclusion," "Ultimately," "Overall," or a last paragraph that
restates the piece. End on the last concrete point, takeaway, or next action.

**Formatting slop.** No emoji in headings. No bold sprinkled mid-sentence for emphasis. No bullet
list where two sentences of prose read better. No header over a two-sentence section.

## Em dashes

The appositive dash (a pair setting off a clause) is part of the author's voice and can stay. But
**any line carrying two or more em dashes is a cluster** and should be thinned to commas,
parentheses, a colon, or a split sentence. Watch for the `— …,` sequence, which is always a mistake.

Never touch an em dash that is data:

- empty-cell placeholders in tables (`| O | 3 000 | < 10 | — | — |`);
- bibliography separators and dashes inside a cited title in `referencias.md`;
- dashes in URLs, file names, or slugs.

## Fundamentals

- **Preserve the writer's voice.** Note the vocabulary, cadence, bluntness, and level of polish
  first, and keep what is personal. Don't make every paragraph equally tidy.
- **Make the minimum effective edit.** Fix what is broken and leave strong sentences alone.
- **Be concrete.** Names, numbers, dates, and mechanisms beat abstractions. "Improved efficiency"
  becomes "cut deploy time from 40 minutes to 4".
- **Portability test.** If a sentence could move unchanged to another project, it is filler. Replace
  it with a fact, an example, a mechanism, a consequence, or a judgment about *this* subject.
- **Show, don't tell.** Make the facts carry the emphasis. Cut commentary that labels a point
  important, surprising, or subtle instead of demonstrating why.
- **Use active voice.** Never let inanimate things do human verbs. "Made a decision" becomes
  "decided"; "has the ability to" becomes "can".
- **Untangle without flattening.** Split sentences that are genuinely hard to follow, but keep long
  spoken sentences and changes in pace when they are clear and characteristic.
- **Keep the meaning.** Never invent claims, examples, or statistics. If something is unclear, ask.

## Before you finish

- `bun run build` — VitePress must build clean.
- `python scripts/audit-glossary.py` — after the build; must print `OK` (annotations, first use, PT/EN
  parity).
- `python scripts/audit-svgs.py` — must print `OK` (structure, title/desc, background, long text,
  Portuguese labels, named entities).
- `python scripts/audit-math.py` — after the build; must print `OK` (maths renders only on the pages
  that declare it).
