#!/usr/bin/env python3
"""Audit the shapes of machine-written prose that the word lists in audit-prose.py cannot see.

audit-prose.py bans words. The chapters passed it and still read as generated, because the tell is in
the sentence and the page: bold on every other phrase, the same "Topic: catchy subtitle" heading in
every section, "not X, but Y", commentary that labels a fact striking instead of stating it, and the
fact-checking process narrated to the reader. These rules come from AGENTS.md ("How it reads").

Rules, per chapter (prose lines only, as audit-prose.py reads them):

  style-bold        a **bold** span in running prose. AGENTS.md: no bold sprinkled mid-sentence.
  style-heading     a heading shaped "Topic: subtitle". A plain noun is the heading; the section
                    says the rest.
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

BOLD_RE = re.compile(r"\*\*[^*\n]+?\*\*")
HEADING_RE = re.compile(r"^(#{2,6})\s+(.*?)\s*(\{#[^}]*\})?\s*$")
# "Topic: subtitle" where the part after the colon starts a phrase, not a number or a ratio.
HEADING_COLON_RE = re.compile(r"^[^:]{1,60}:\s+\D")

CONTRAST = [
    r"\bnot\b[^.;:!?]{1,60}?,?\s+but\b",
    r"\b(?:is|are|was|were)n't\b[^.;!?]{1,50}[;.]\s+(?:it|they)(?:'s| is| are)\b",
    r"\b(?:is|are|was|were) not\b[^.;!?]{1,50}[;.]\s+(?:it|they)(?:'s| is| are)\b",
    r",\s+not\s+(?:a|an|the|in|by|on|at|from|just|only)\b",
    r"\bnão\b[^.;:!?]{1,60}?,?\s+mas\b",
    r",\s+e não\s+(?:um|uma|o|a|os|as|em|por|de|só|apenas)\b",
    r",\s+não\s+(?:um|uma|o|a|os|as|em|por|de|só|apenas)\b",
]
CONTRAST_RE = re.compile("|".join(CONTRAST), re.IGNORECASE)

COMMENTARY = [
    # English
    r"striking(?:ly)?", r"elegant(?:ly)?", r"remarkabl[ey]", r"surprising(?:ly)?", r"notabl[ey]",
    r"crucial(?:ly)?", r"honest(?:ly)?", r"intuitive(?:ly)?", r"absurd", r"fascinating",
    r"(?:this|that|the) (?:difference|distinction|detail|point) matters", r"matters (?:because|more)",
    r"here is", r"here's", r"the key (?:point|idea|is)", r"the catch",
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

# Markup that should not count as words when measuring a sentence.
STRIP_RE = re.compile(r"<[^>]+>|\$[^$]*\$|\[([^\]]*)\]\([^)]*\)|[*_`]")
SENTENCE_END_RE = re.compile(r"(?<=[.!?])\s+(?=[A-ZÀ-Ý])")


def plain(text: str) -> str:
    text = STRIP_RE.sub(lambda m: m.group(1) or "", text)
    # A stripped <Cite /> leaves "contest ." behind.
    return re.sub(r"\s+([.,;:!?])", r"\1", text).strip()


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
            for rule, regex in (("style-contrast", CONTRAST_RE), ("style-commentary", COMMENTARY_RE)):
                for match in regex.finditer(stripped):
                    findings.append((rule, number, match.group(0)))
            continue

        heading = HEADING_RE.match(stripped)
        if heading:
            close_paragraph()
            if HEADING_COLON_RE.match(heading.group(2)):
                findings.append(("style-heading", number, heading.group(2)))
            continue
        if not stripped or stripped.startswith((":::", "<", "- ", "* ", ">")) or re.match(r"^\d+\.\s", stripped):
            close_paragraph()
            if not stripped or stripped.startswith((":::", "<")):
                continue
        else:
            paragraph.append((number, stripped))

        total_words += words(stripped)
        for match in BOLD_RE.finditer(stripped):
            findings.append(("style-bold", number, match.group(0)))
        for rule, regex in (
            ("style-contrast", CONTRAST_RE),
            ("style-commentary", COMMENTARY_RE),
            ("style-sourcing", SOURCING_RE),
        ):
            for match in regex.finditer(plain(stripped)):
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
