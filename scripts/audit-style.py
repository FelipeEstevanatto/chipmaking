#!/usr/bin/env python3
"""Audit the shapes of machine-written prose that the word lists in audit-prose.py cannot see.

audit-prose.py bans words. The chapters passed it and still read as generated, because the tell is in
the sentence and the page: bold on every other phrase, the same "Topic: catchy subtitle" heading in
every section, "not X, but Y", commentary that labels a fact striking instead of stating it, and the
fact-checking process narrated to the reader. These rules come from AGENTS.md ("How it reads").

Rules, per chapter (prose lines only, as audit-prose.py reads them):

  style-bold        a **bold** span in running prose. AGENTS.md: no bold sprinkled mid-sentence.
  style-bold-long   a bold span long enough to be a clause rather than a term. It catches emphasis
                    that ran across a sentence, and the mixed ***term* clause** shape.
  style-heading     a heading shaped "Topic: subtitle". A plain noun is the heading; the section
                    says the rest. A year prefix ("1960: MOSFET") is a chronology label, not a
                    subtitle.
  style-contrast    "not X, but Y" / "não X, mas Y", "X, not Y". State Y.
  style-commentary  a word that grades the fact instead of stating it (striking, elegant, honest,
                    "matters", "here is" / impressionante, elegante, "eis").
  style-sourcing    the source check narrated in the prose ("has no clear primary source", "the
                    verifiable figure", "circulates widely"). That belongs in a citations.ts note.
  style-kicker      a paragraph that ends on a sentence of five words or fewer.

And per drawing, on the <text> of every own SVG in docs/public/assets (third-party files are
exempt, as in audit-svgs.py):

  svg-emdash        an em dash in a label.
  svg-slogan        a "Topic: subtitle" headline, or a label with a contrast or commentary pattern.

And per component, on the prose strings of the theme's data modules (the copy the explorers, the
chronologies, the home page and the chart captions render, which the Markdown rules never see):

  copy-emdash       an em dash in a string a reader sees.
  copy-bold         Markdown bold inside a string, which renders as literal asterisks.
  copy-contrast     "not X, but Y", as in prose.
  copy-commentary   a word that grades the fact, as in prose.
  copy-sourcing     the source check narrated, as in prose.

The backlog is large, so the audit is a ratchet rather than a plain gate: `style-baseline.json`
records each file's count per rule, the check fails when any count rises above it, and it says so
when a count falls, so the baseline can be lowered with --update-baseline. A new file starts at
zero. The baseline only ever moves down by hand; never raise it to make the check pass.

Usage:
    python scripts/audit-style.py                     # ratchet check against the baseline
    python scripts/audit-style.py --list              # per-file table, worst first
    python scripts/audit-style.py --show docs/en/na-fab.md   # every finding in one file
    python scripts/audit-style.py --update-baseline   # record the current counts (after a cleanup)
"""
from __future__ import annotations

import importlib.util
import json
import os
import re
import sys
import xml.etree.ElementTree as ET

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPTS = os.path.join(REPO, "scripts")
ASSETS = os.path.join(REPO, "docs", "public", "assets")
BASELINE = os.path.join(SCRIPTS, "style-baseline.json")


def load(name: str):
    spec = importlib.util.spec_from_file_location(name.replace("-", "_"), os.path.join(SCRIPTS, name + ".py"))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


prose = load("audit-prose")
svgs = load("audit-svgs")

# Navigation and bibliography pages are generated or tabular; they carry no argument to audit.
SKIP_FILES = {"referencias.md", "glossario.md"}

BOLD_RE = re.compile(r"\*\*(.+?)\*\*")
HEADING_RE = re.compile(r"^(#{2,6})\s+(.*?)\s*(\{#[^}]*\})?\s*$")
# "Topic: subtitle" where the part after the colon starts a phrase, not a number or a ratio.
HEADING_COLON_RE = re.compile(r"^[^:]{1,60}:\s+\D")

CONTRAST = [
    r"\bnot\b[^.;:!?]{1,60}?,?\s+but\b",
    r"\b(?:is|are|was|were)n't\b[^.;!?]{1,50}[;.]\s+(?:it|they)(?:'s| is| are)\b",
    r"\b(?:is|are|was|were) not\b[^.;!?]{1,50}[;.]\s+(?:it|they)(?:'s| is| are)\b",
    r",\s+not\s+(?:a|an|the|in|by|on|at|from|just|only)\b",
    r"(?<!\()(?<!para )\bnão\b[^.;:!?]{1,60}?,?\s+mas\b",
    r",\s+e não\s+(?:um|uma|o|a|os|as|em|por|de|só|apenas)\b",
    r",\s+não\s+(?:um|uma|o|a|os|as|em|por|de|só|apenas)\b",
]
CONTRAST_RE = re.compile("|".join(CONTRAST), re.IGNORECASE)

COMMENTARY = [
    # English
    r"striking(?:ly)?", r"elegant(?:ly)?", r"remarkabl[ey]", r"surprising(?:ly)?", r"notabl[ey]",
    r"crucial(?:ly)?", r"honest(?:ly)?", r"intuitive(?:ly)?", r"absurd", r"fascinating",
    r"(?:this|that|the) (?:difference|distinction|detail|point) matters", r"matters (?:because|more)",
    r"here's (?:why|the|what|how)\b",
    r"the key (?:point|idea|is)", r"the catch",
    r"the (?:reason|answer) is (?:simple|direct|intuitive)",
    # Portuguese
    r"impressionante(?:s|mente)?", r"elegante(?:s|mente)?", r"not[áa]ve(?:l|is)", r"notavelmente",
    r"surpreendente(?:s|mente)?", r"crucia(?:l|is)", r"honest[oa]s?", r"intuitiv[oa]s?",
    r"absurd[oa]s?", r"fascinante", r"eis", r"essa (?:diferença|distinção) importa", r"o pulo do gato",
    r"a (?:razão|resposta) é (?:simples|direta|intuitiva)",
]
COMMENTARY_RE = re.compile(r"\b(?:" + "|".join(COMMENTARY) + r")\b", re.IGNORECASE)

SOURCING = [
    r"(?:no|without|sem) (?:a )?(?:clear |clara )?(?:primary source|fonte primária)",
    r"has no (?:clear )?source", r"não tem fonte",
    r"circulates? widely", r"circula(?:m)? (?:muito|amplamente)",
    r"verifiable (?:figure|number|value)", r"(?:número|valor|dado) verificável",
    r"worth asking", r"vale perguntar",
    r"(?:often|commonly|widely) (?:quoted|repeated|cited)",
    r"(?:costuma ser|é muito|é frequentemente) (?:citad[oa]|repetid[oa])",
]
SOURCING_RE = re.compile(r"\b(?:" + "|".join(SOURCING) + r")", re.IGNORECASE)

# The content tells from Wikipedia:Signs of AI writing that the word lists above do not see.
# These are phrase-level on purpose: "serves as an insulator" is a fact; "serves as a testament"
# is puffery. A single adjective is not enough to fail a page.
SIGNIFICANCE = [
    r"stands? as (?:a |the )?testament", r"is (?:a |the )?testament to",
    r"serves? as (?:a |the )?reminder", r"plays? a (?:crucial|pivotal|vital|key|significant|central) role",
    r"underscor(?:es|ing) (?:its|the|his|her) (?:importance|significance|role)",
    r"reflects? a (?:broader|wider|growing|ongoing)", r"cements? (?:its|the|his|her)",
    r"solidifies? (?:its|the|his|her)", r"paved the way", r"ushered in",
    r"left an? (?:indelible|lasting) mark", r"key turning point", r"evolving landscape",
    r"focal point", r"deeply rooted",
    r"é um testemunho", r"serve(?:m)? de (?:testemunho|lembrete)",
    r"desempenha (?:um )?papel (?:crucial|pivotal|vital|central|fundamental)",
    r"papel (?:crucial|pivotal|vital|central|fundamental)", r"destaca a (?:sua )?importância",
    r"reflete (?:um|uma) (?:movimento|tendência|contexto) (?:maior|amplo)",
    r"consolid(?:a|ou) (?:sua|a) posição", r"abriu caminho", r"deixou (?:uma )?marca",
    r"ponto de virada", r"cenário em evolução", r"ponto focal",
]
SIGNIFICANCE_RE = re.compile(r"\b(?:" + "|".join(SIGNIFICANCE) + r")", re.IGNORECASE)

SUPERFICIAL = [
    r",\s+(?:highlighting|underscoring|emphasizing|reflecting|symbolizing|showcasing|cementing|solidifying|reinforcing|paving the way)\b",
    r",\s+(?:destacando|ressaltando|enfatizando|refletindo|simbolizando|consolidando|reforçando)\b",
]
SUPERFICIAL_RE = re.compile("|".join(SUPERFICIAL), re.IGNORECASE)

VAGUE = [
    r"\bexperts (?:agree|say|believe)", r"\bstudies (?:show|suggest)", r"\bindustry reports suggest",
    r"\bmany (?:argue|believe|say)", r"\banalysts (?:say|expect)",
    r"\bit is widely (?:believed|known|accepted)",
    r"\bespecialistas (?:dizem|afirmam|acreditam)", r"\bestudos (?:mostram|sugerem)",
    r"\bmuitos (?:argumentam|acreditam|dizem)", r"\banalistas (?:dizem|esperam)",
    r"\bé amplamente (?:sabido|aceito|reconhecido)",
]
VAGUE_RE = re.compile("|".join(VAGUE), re.IGNORECASE)

OUTLINE = [
    r"\bchallenges and opportunities", r"\bfuture prospects", r"\blooking ahead",
    r"\bthe road ahead", r"\bremains to be seen", r"\bin the years to come",
    r"\bwill (?:likely )?(?:shape|define) the future",
    r"\bdesafios e oportunidades", r"\bperspectivas futuras", r"\bolhando para frente",
    r"\bo caminho à frente", r"\bresta saber", r"\bnos próximos anos",
    r"\bvai (?:moldar|definir) o futuro",
]
OUTLINE_RE = re.compile("|".join(OUTLINE), re.IGNORECASE)

NOTABILITY = [
    r"\bindependent coverage", r"\bfeatured in\b", r"\bprofiled in\b", r"\btrade publications?",
    r"\bmaintains? an? (?:active|strong) (?:social media|digital) presence",
    r"\bcobertura independente", r"\bfoi destaque\b", r"\bfoi perfilad[oa]\b",
    r"\bimprensa especializada",
    r"\bmantém (?:uma )?(?:forte|ativa) presença digital",
]
NOTABILITY_RE = re.compile("|".join(NOTABILITY), re.IGNORECASE)

COLLABORATIVE = [
    r"\blet me know\b", r"\bI hope this helps\b", r"\bfeel free to\b", r"\bas an AI\b",
    r"\bI cannot\b", r"\bin this article\b", r"\bwe will (?:see|explore)\b",
    r"\bme avise\b", r"\bespero que (?:isso )?ajude\b", r"\bsinta-se à vontade\b",
    r"\bcomo uma IA\b", r"\bneste artigo\b", r"\bvamos (?:ver|explorar)\b",
]
COLLABORATIVE_RE = re.compile("|".join(COLLABORATIVE), re.IGNORECASE)

# A quote is data. The ITRS sentence in the transistor chapter carries "not by the gate length",
# and a rule that forces an edit to a cited quotation is wrong. Mask the quoted span, preserving
# character positions so the reported excerpt still points at the original text.
QUOTE_RE = re.compile(r'"[^"\n]*"|“[^”\n]*”')

# Markup that should not count as words when measuring a sentence.
STRIP_RE = re.compile(r"<[^>]+>|\$[^$]*\$|\[([^\]]*)\]\([^)]*\)|[*_`]")
SENTENCE_END_RE = re.compile(r"(?<=[.!?])\s+(?=[A-ZÀ-Ý])")


def plain(text: str) -> str:
    text = STRIP_RE.sub(lambda m: m.group(1) or "", text)
    # A stripped <Cite /> leaves "contest ." behind.
    return re.sub(r"\s+([.,;:!?])", r"\1", text).strip()


def unquoted(text: str) -> str:
    """Blank the inside of a quoted span without changing its length or the surrounding text."""
    return QUOTE_RE.sub(lambda m: " " * len(m.group(0)), text)


def words(text: str) -> int:
    return len(re.findall(r"[\wÀ-ÿ]+", plain(text)))


def kicker(paragraph: str) -> str | None:
    """The last sentence of a prose paragraph, when it is five words or fewer."""
    text = plain(paragraph)
    if not text or not text.endswith((".", "!", "?")):
        return None
    sentences = SENTENCE_END_RE.split(text)
    if len(sentences) < 2:
        return None
    last = sentences[-1]
    return last if words(last) <= 5 else None


def glossary_terms() -> set[str]:
    """The terms a chapter is allowed to bold, read from the glossary source."""
    text = open(os.path.join(REPO, "docs", ".vitepress", "glossary.ts"), encoding="utf-8").read()
    start = text.find("export const GLOSSARY")
    block = text[start:]
    terms: set[str] = set()
    for match in re.finditer(r"\bterm:\s*'((?:[^'\\]|\\.)*)'", block):
        term = re.sub(r"\s+", " ", match.group(1)).strip().lower()
        terms.add(term.strip(" .,:;"))
    for match in re.finditer(r"\bvariants:\s*\[([^\]]+)\]", block):
        for variant in re.findall(r"'((?:[^'\\]|\\.)*)'", match.group(1)):
            term = re.sub(r"\s+", " ", variant).strip().lower()
            terms.add(term.strip(" .,:;"))
    return terms


GLOSSARY_TERMS = glossary_terms()


def audit_page(path: str) -> tuple[int, list[tuple[str, int, str]]]:
    findings: list[tuple[str, int, str]] = []
    total_words = 0
    paragraph: list[tuple[int, str]] = []

    def close_paragraph() -> None:
        if paragraph:
            last = kicker(" ".join(text for _, text in paragraph))
            if last and paragraph[-1][0] not in in_caption:
                findings.append(("style-kicker", paragraph[-1][0], last))
            paragraph.clear()

    raw = open(path, encoding="utf-8").read().splitlines()
    frontmatter_end = 0
    if raw and raw[0].strip() == "---":
        frontmatter_end = next((n + 1 for n in range(1, len(raw)) if raw[n].strip() == "---"), 0)
    # A figure caption ends on its credit line ("Desenho do autor.", the licence), which is data and
    # not a kicker, so captions are left out of the kicker rule only.
    in_caption: set[int] = set()
    inside = False
    for n, text in enumerate(raw, start=1):
        if re.match(r"\s*<(DiagramFigure|figure)\b", text):
            inside = True
        if inside:
            in_caption.add(n)
        if re.search(r"</(DiagramFigure|figure)>", text):
            inside = False

    for number, line in prose.prose_lines(path):
        stripped = line.strip()
        if number <= frontmatter_end:
            # audit-prose.py yields the frontmatter for its `description`, which a reader sees in
            # search results: the sentence rules apply to it, but it is never a paragraph.
            for rule, regex in (
                ("style-contrast", CONTRAST_RE),
                ("style-commentary", COMMENTARY_RE),
                ("style-significance", SIGNIFICANCE_RE),
                ("style-superficial", SUPERFICIAL_RE),
                ("style-vague", VAGUE_RE),
                ("style-outline", OUTLINE_RE),
                ("style-notability", NOTABILITY_RE),
                ("style-collaborative", COLLABORATIVE_RE),
            ):
                for match in regex.finditer(stripped):
                    findings.append((rule, number, match.group(0)))
            continue

        heading = HEADING_RE.match(stripped)
        if heading:
            close_paragraph()
            text = heading.group(2)
            # A year prefix is a chronology label, not a subtitle.
            if HEADING_COLON_RE.match(text) and not re.match(r"^~?\d{4}\b", text):
                findings.append(("style-heading", number, text))
            continue
        is_list = bool(
            re.match(r"^(?:[-*+]\s|\d+\.\s|>)", stripped)
        ) or stripped.startswith((":::", "<"))
        is_table = stripped.startswith("|")
        if not stripped or is_list:
            close_paragraph()
            if not stripped or stripped.startswith((":::", "<")):
                continue
        else:
            paragraph.append((number, stripped))

        total_words += words(stripped)
        if not is_table:
            for match in BOLD_RE.finditer(stripped):
                span = match.group(1)
                long = len(span) > 60 or ";" in span or (
                    len(span.split()) >= 8 and any(mark in span for mark in (",", " e ", " and "))
                )
                if is_list:
                    if long:
                        findings.append(("style-bold-long", number, match.group(0)))
                    continue
                after = stripped[match.end():].lstrip()
                before = stripped[:match.start()].rstrip()
                defined = bool(
                    re.match(r"(?:é|são|is|are)\b", after)
                    or re.search(r"\b(?:é|são|is|are|chama|chamam|called)\s*$", before, re.I)
                )
                term = bool(re.search(r"\b(?:o|a|os|as|um|uma|an?|the|this|that)\s*$", before, re.I))
                # "Backside Power Delivery Network (BSPDN)" defines an acronym; that is a term,
                # not emphasis, even when the line starts with it.
                acronym = bool(
                    re.match(r"^[^()]+\([A-Z][A-Z0-9-]{1,}\)$", span)
                    and (not before or before.endswith((".", ":", "!", "?")))
                )
                if (
                    defined
                    or acronym
                    or (term and len(span.split()) <= 6)
                    or re.sub(r"\s+", " ", span).strip().lower().strip(" .,:;") in GLOSSARY_TERMS
                ):
                    continue
                if long:
                    findings.append(("style-bold-long", number, match.group(0)))
                else:
                    findings.append(("style-bold", number, match.group(0)))
        flat = unquoted(plain(stripped))
        for rule, regex in (
            ("style-contrast", CONTRAST_RE),
            ("style-commentary", COMMENTARY_RE),
            ("style-sourcing", SOURCING_RE),
            ("style-significance", SIGNIFICANCE_RE),
            ("style-superficial", SUPERFICIAL_RE),
            ("style-vague", VAGUE_RE),
            ("style-outline", OUTLINE_RE),
            ("style-notability", NOTABILITY_RE),
            ("style-collaborative", COLLABORATIVE_RE),
        ):
            for match in regex.finditer(flat):
                findings.append((rule, number, match.group(0)))
    close_paragraph()
    return total_words, findings


def audit_svg(path: str) -> list[tuple[str, int, str]]:
    findings: list[tuple[str, int, str]] = []
    try:
        root = ET.parse(path).getroot()
    except ET.ParseError:
        return findings  # audit-svgs.py reports the parse error
    for element in root.iter(svgs.SVG + "text"):
        text = " ".join("".join(element.itertext()).split())
        if not text:
            continue
        if "—" in text:
            findings.append(("svg-emdash", 0, text))
        head, _, tail = text.partition(": ")
        # "reticle limit: ~830 mm2" and "abrupt junction: peak field" are labels with a value; a
        # slogan has a phrase after the colon.
        if tail and not re.search(r"\d", tail) and len(tail.split()) >= 3:
            findings.append(("svg-slogan", 0, text))
        elif CONTRAST_RE.search(text) or COMMENTARY_RE.search(text):
            findings.append(("svg-slogan", 0, text))
    return findings


THEME = os.path.join(REPO, "docs", ".vitepress", "theme")
# The modules whose strings are prose a reader sees. Code identifiers and CSS live elsewhere.
COPY_MODULES = [
    "fab-stages.ts", "furnace-stages.ts", "milestones.ts", "transistor-eras.ts", "home-sections.ts",
    "chain.ts", "yield-presets.ts", "chokepoints.ts", "yield-references.ts",
    os.path.join("charts", "specs.ts"),
]
# A locale string: `pt: '...'`, `en: "..."`, or the `descPt`/`descEn`, `productsPt`/`productsEn`,
# `altPt`/`altEn` and `namePt`/`nameEn` pairs that `transistor-eras.ts` uses.
COPY_RE = re.compile(
    r"""\b(?:pt|en|descPt|descEn|productsPt|productsEn|altPt|altEn|namePt|nameEn|titlePt|titleEn|notePt|noteEn)"""
    r"""\s*:\s*(?:'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`([^`]*)`)"""
)


def audit_copy(path: str) -> list[tuple[str, int, str]]:
    findings: list[tuple[str, int, str]] = []
    for number, line in enumerate(open(path, encoding="utf-8"), start=1):
        for match in COPY_RE.finditer(line):
            text = next(g for g in match.groups() if g is not None)
            if len(text.split()) < 3:
                continue
            if "\u2014" in text:
                findings.append(("copy-emdash", number, text[:80]))
            if "**" in text:
                findings.append(("copy-bold", number, text[:80]))
            flat = unquoted(text)
            for rule, regex in (
                ("copy-contrast", CONTRAST_RE),
                ("copy-commentary", COMMENTARY_RE),
                ("copy-sourcing", SOURCING_RE),
                ("copy-significance", SIGNIFICANCE_RE),
                ("copy-superficial", SUPERFICIAL_RE),
                ("copy-vague", VAGUE_RE),
                ("copy-outline", OUTLINE_RE),
                ("copy-notability", NOTABILITY_RE),
                ("copy-collaborative", COLLABORATIVE_RE),
            ):
                for found in regex.finditer(flat):
                    findings.append((rule, number, found.group(0)))
    return findings


def collect() -> tuple[dict[str, dict[str, int]], dict[str, list[tuple[str, int, str]]], dict[str, int]]:
    counts: dict[str, dict[str, int]] = {}
    details: dict[str, list[tuple[str, int, str]]] = {}
    sizes: dict[str, int] = {}
    for path in prose.PAGES:
        if os.path.basename(path) in SKIP_FILES:
            continue
        rel = os.path.relpath(path, REPO).replace("\\", "/")
        sizes[rel], details[rel] = audit_page(path)
    for name in sorted(os.listdir(ASSETS)):
        if not name.endswith(".svg") or name in svgs.THIRD_PARTY:
            continue
        rel = "docs/public/assets/" + name
        details[rel] = audit_svg(os.path.join(ASSETS, name))
    for name in COPY_MODULES:
        path = os.path.join(THEME, name)
        if os.path.exists(path):
            rel = os.path.relpath(path, REPO).replace("\\", "/")
            details[rel] = audit_copy(path)
    for rel, found in details.items():
        per_rule: dict[str, int] = {}
        for rule, _, _ in found:
            per_rule[rule] = per_rule.get(rule, 0) + 1
        if per_rule:
            counts[rel] = per_rule
    return counts, details, sizes


RULES = ["style-bold", "style-heading", "style-contrast", "style-commentary", "style-sourcing", "style-kicker"]


def print_table(counts, sizes) -> None:
    header = "%-36s %6s %7s %5s %5s %5s %5s %5s %5s" % (
        "chapter", "words", "bold/1k", "bold", "head", "contr", "comm", "src", "kick")
    print(header)
    print("-" * len(header))
    pages = sorted(sizes, key=lambda rel: -sum(counts.get(rel, {}).values()) * 1000 / max(sizes[rel], 1))
    for rel in pages:
        c = counts.get(rel, {})
        print("%-36s %6d %7.0f %5d %5d %5d %5d %5d %5d" % (
            rel.replace("docs/", ""), sizes[rel], c.get("style-bold", 0) * 1000 / max(sizes[rel], 1),
            *(c.get(rule, 0) for rule in RULES)))
    drawings = {rel: c for rel, c in counts.items() if rel.startswith("docs/public/")}
    if drawings:
        print("\ndrawings")
        for rel, c in sorted(drawings.items()):
            print("  %-44s %s" % (rel.rsplit("/", 1)[1], ", ".join("%s %d" % kv for kv in sorted(c.items()))))
    totals: dict[str, int] = {}
    for c in counts.values():
        for rule, n in c.items():
            totals[rule] = totals.get(rule, 0) + n
    print("\ntotal: " + ", ".join("%s %d" % kv for kv in sorted(totals.items())))


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    args = sys.argv[1:]
    counts, details, sizes = collect()

    if "--list" in args:
        print_table(counts, sizes)
        return 0

    if "--show" in args:
        target = args[args.index("--show") + 1].replace("\\", "/")
        found = details.get(target)
        if found is None:
            print("not audited: %s" % target)
            return 1
        for rule, number, excerpt in found:
            print("  %s:%d [%s] %s" % (target, number, rule, excerpt[:100]))
        print("%d finding(s)" % len(found))
        return 0

    if "--update-baseline" in args:
        with open(BASELINE, "w", encoding="utf-8", newline="\n") as handle:
            json.dump(counts, handle, indent=2, sort_keys=True, ensure_ascii=False)
            handle.write("\n")
        print("baseline written: %d file(s), %d finding(s)" % (
            len(counts), sum(sum(c.values()) for c in counts.values())))
        return 0

    baseline: dict[str, dict[str, int]] = {}
    if os.path.exists(BASELINE):
        with open(BASELINE, encoding="utf-8") as handle:
            baseline = json.load(handle)

    worse: list[str] = []
    better: list[str] = []
    for rel in sorted(set(counts) | set(baseline)):
        now, before = counts.get(rel, {}), baseline.get(rel, {})
        for rule in sorted(set(now) | set(before)):
            a, b = now.get(rule, 0), before.get(rule, 0)
            if a > b:
                worse.append("  x %s [%s] %d > baseline %d" % (rel, rule, a, b))
            elif a < b:
                better.append("  - %s [%s] %d < baseline %d" % (rel, rule, a, b))

    total = sum(sum(c.values()) for c in counts.values())
    print("style: %d finding(s) across %d file(s); %d over the baseline, %d under it" % (
        total, len(counts), len(worse), len(better)))
    if worse:
        print("\nREGRESSIONS (run --show <file> for the lines):")
        print("\n".join(worse))
        return 1
    if better:
        print("\nImproved. Lower the ratchet with --update-baseline:")
        print("\n".join(better[:30]))
        if len(better) > 30:
            print("  ... and %d more" % (len(better) - 30))
    print("\nOK: no file got worse than the baseline.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
