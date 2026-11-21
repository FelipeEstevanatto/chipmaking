#!/usr/bin/env python3
"""Audit the sentence-load budget from the AI-writing audit.

The arXiv study in `audit/ai-writing.md` measures dependency length, not sentence length, but the
practical fix for a long dependency is usually to split the sentence. The house budget is:

  - no sentence over 60 words;
  - no sentence over 45 words that still carries a colon or semicolon, because the punctuation is
    almost always the seam;
  - clefts (`É ... que`, `It is ... that`, `That is why`) are reported per file, not failed, because
    a cleft is grammatical and sometimes the clearest option. The report shows the files above
    3 per 1,000 words.

The splitter is deliberately simple. It only breaks after `.`, `!` or `?` followed by whitespace and
a capital letter, so decimals and most abbreviations survive. Maths, links and component tags are
removed before counting.

Usage:
    python scripts/audit-syntax.py          # check the hard budget, print the cleft report
    python scripts/audit-syntax.py --all    # also list every sentence over 40 words
    python scripts/audit-syntax.py --clefts # print every cleft sentence
"""
from __future__ import annotations

import glob
import importlib.util
import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPTS = os.path.join(REPO, "scripts")


def load(name: str):
    spec = importlib.util.spec_from_file_location(name.replace("-", "_"), os.path.join(SCRIPTS, name + ".py"))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


prose = load("audit-prose")

SKIP_FILES = {"referencias.md", "glossario.md"}
HARD_WORDS = 60
SOFT_WORDS = 45
CLEFT_BUDGET = 3.0

CLEFT_RE = re.compile(r"^(?:É\b.*\bque\b|It is\b.*\bthat\b|That is why\b)", re.IGNORECASE)
# The second branch catches a sentence that starts in lowercase after a stripped <Cite />, which
# leaves " . imec" behind. Brand names such as imec are the reason the first branch is not enough.
SENTENCE_RE = re.compile(r"(?<=[.!?])\s+(?=[A-ZÀ-Ý])|(?<=\s[.!?])\s+(?=\S)")
STRIP_RE = re.compile(r"<[^>]+>|\$[^$]*\$|\[([^\]]*)\]\([^)]*\)|https?://\S+|[*_`#]")


def clean(line: str) -> str:
    line = STRIP_RE.sub(lambda m: m.group(1) or "", line)
    return re.sub(r"\s+", " ", line).strip()


def sentences(line: str) -> list[str]:
    return [part.strip() for part in SENTENCE_RE.split(clean(line)) if part.strip()]


def words(text: str) -> int:
    return len(re.findall(r"[\wÀ-ÿ]+", text))


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    show_all = "--all" in sys.argv[1:]
    show_clefts = "--clefts" in sys.argv[1:]

    problems: list[tuple[str, int, int, str]] = []
    over_40: list[tuple[str, int, int, str]] = []
    cleft_rows: list[tuple[str, int, str]] = []
    file_words: dict[str, int] = {}
    file_clefts: dict[str, int] = {}

    for path in prose.PAGES:
        if os.path.basename(path) in SKIP_FILES:
            continue
        rel = os.path.relpath(path, REPO).replace("\\", "/")
        file_words.setdefault(rel, 0)
        file_clefts.setdefault(rel, 0)
        for number, raw in prose.prose_lines(path):
            stripped = raw.strip()
            if not stripped or stripped.startswith("#"):
                continue
            for sentence in sentences(stripped):
                count = words(sentence)
                if count < 3:
                    continue
                file_words[rel] += count
                if count > 40:
                    over_40.append((rel, number, count, sentence))
                if count > HARD_WORDS:
                    problems.append((rel, number, count, sentence))
                elif count > SOFT_WORDS and (";" in sentence or ":" in sentence):
                    problems.append((rel, number, count, sentence))
                if CLEFT_RE.match(sentence):
                    file_clefts[rel] += 1
                    cleft_rows.append((rel, number, sentence))

    print("sentences over %d words: %d | over %d with a colon or semicolon: %d"
          % (SOFT_WORDS, len(over_40), SOFT_WORDS,
             sum(1 for _, _, n, _ in problems if n <= HARD_WORDS)))

    if show_all:
        print("\nover 40 words:")
        for rel, number, count, sentence in sorted(over_40, key=lambda row: -row[2]):
            print("  %3d  %s:%d  %s" % (count, rel, number, sentence[:150]))

    if show_clefts:
        print("\nclefts:")
        for rel, number, sentence in cleft_rows:
            print("  %s:%d  %s" % (rel, number, sentence[:150]))

    print("\ncleft density (reported, not failed):")
    for rel in sorted(file_clefts, key=lambda name: -(file_clefts[name] * 1000 / max(file_words[name], 1))):
        count = file_clefts[rel]
        if not count:
            continue
        density = count * 1000 / max(file_words[rel], 1)
        flag = "  over budget" if density > CLEFT_BUDGET else ""
        print("  %5.1f / 1k  %-38s %d%s" % (density, rel, count, flag))

    if problems:
        print("\nPROBLEMS (%d):" % len(problems))
        for rel, number, count, sentence in problems:
            print("  x %s:%d [%d words] %s" % (rel, number, count, sentence[:160]))
        return 1

    print("\nOK: every sentence fits the 60-word cap and the 45-word colon rule.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
