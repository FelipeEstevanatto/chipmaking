# Writing rules

Applies to every word this repo ships: `docs/**/*.md` in both locales, `README.md`, UI copy in
`docs/.vitepress/theme/*.vue`, and commit messages. Architecture and structure conventions live in
`README.md`; this file is about the prose.

The rules below come from the `no-ai-slop` skill (`~/.agents/skills/no-ai-slop/SKILL.md`, after
<https://github.com/petergyang/no-ai-slop>). Run that skill for a full prose pass. Apply these while
writing, not as a cleanup pass afterwards.

## The two locales

- Every chapter exists twice: `docs/<slug>.md` (Portuguese) and `docs/en/<slug>.md` (English).
  Change both in the same edit. `python scripts/audit-glossary.py` fails when they drift apart.
- Translate the sentence, don't transliterate it. The English is a mirror of the Portuguese, not a
  word-for-word rendering.
- Numbers: PT writes `1.700` and `0,47 %`; EN writes `1,700` and `0.47%`.
- `<Cite id="…" />` attaches to one specific claim. Never drop, duplicate, or move a marker to a
  different sentence.
- Glossary terms are annotated on first use per page. The audit enforces this; don't fight it.

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
- `python scripts/audit-glossary.py` — must print `OK` (it checks annotations, first use, and PT/EN
  parity).
