#!/usr/bin/env python3
"""Audit the prose against the writing rules in AGENTS.md ("How it reads").

The rules come from the no-ai-slop skill. Most of them need a reader; three do not, and they are the
three that drifted:

  prose-emdash    an em dash in running prose. The repo bans it (AGENTS.md, and the always-on
                  `.cursor/rules/avoid-em-dashes.mdc`): it reads as machine-written, and there is
                  always a better mark, whether a comma, parentheses, a colon or a second sentence.
  prose-banned    a word from the banned list (delve, robust, leverage, ...).
  prose-empty     an often-empty phrase ("it is worth noting", "in order to", "vale notar", ...).

Data dashes are exempt, exactly as AGENTS.md lists them: empty-cell placeholders in tables, the
bibliography separators and dashes inside a cited title in `referencias.md`, dashes in URLs or file
names, and site or page titles (a component tag's props are markup, so a video's own title is left
as published; likewise a page's frontmatter `title`). The auditor therefore skips fenced code
(including the Mermaid blocks), table rows, standalone tags and `title` fields, and never looks at
ASCII hyphens, only at U+2014. A page's frontmatter `description` is audited: it is the summary the
reader sees in search results and link previews.

Usage:
    python scripts/audit-prose.py            # check, exit 1 on a violation
    python scripts/audit-prose.py --list     # per-file em-dash counts, for working the backlog
"""
from __future__ import annotations

import glob
import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Prose lives in the chapter pairs only; the theme's own strings are not audited here.
PAGES = sorted(
    glob.glob(os.path.join(REPO, "docs", "*.md"))
    + glob.glob(os.path.join(REPO, "docs", "en", "*.md"))
)

# A bibliography, not prose: separators and dashes inside cited titles are data.
SKIP_FILES = {"referencias.md"}

EM_DASH = "\u2014"

BANNED = [
    "delve", "foster", "leverage", "utilize", "facilitate", "empower", "streamline", "robust",
    "cutting-edge", "paradigm shift", "game changer", "tapestry", "realm", "beacon", "multifaceted",
    "meticulous", "intricate", "paramount", "transformative", "elevate", "embark", "supercharge",
    "harness", "ever-evolving",
]

EMPTY = [
    "it's worth noting", "it is worth noting", "at the end of the day", "when it comes to",
    "at its core", "in today's world", "in the age of", "the reality is", "the truth is",
    "with regard to", "going forward",
    # Portuguese mirrors of the same phrases.
    "vale notar", "vale a pena notar", "é importante notar", "no final do dia",
    "no mundo de hoje", "a realidade é", "a verdade é", "com relação a", "daqui para frente",
]

BANNED_RE = re.compile(r"\b(" + "|".join(re.escape(w) for w in BANNED) + r")\b", re.IGNORECASE)
EMPTY_RE = re.compile("|".join(re.escape(p) for p in EMPTY), re.IGNORECASE)


def prose_lines(path: str):
    """Yield (line number, text) for the lines of a page that count as running prose."""
    lines = open(path, encoding="utf-8").read().splitlines()

    start = 0
    if lines and lines[0].strip() == "---":
        end = 1
        while end < len(lines) and lines[end].strip() != "---":
            end += 1
        # Frontmatter is metadata, with one exception: `description` ships as the page's own summary,
        # in search results and in link previews, so it is prose the reader sees. `title` is a page
        # title and is exempt; the other fields carry no sentences.
        for n in range(1, end):
            if not lines[n].lstrip().startswith("title:"):
                yield n + 1, lines[n]
        start = end + 1

    fence = False
    for n in range(start, len(lines)):
        stripped = lines[n].strip()
        if stripped.startswith("```"):
            fence = not fence
            continue
        if fence or stripped.startswith("|") or stripped.startswith("<!--"):
            continue
        # A line that is nothing but an HTML or Vue tag is markup: its props are data, such as a
        # video's own published title (`<YouTubeEmbed … title="… — …" />`), which must not be
        # reworded. The caption that follows the tag is prose and is still audited.
        if stripped.startswith("<") and stripped.endswith(">"):
            continue
        yield n + 1, lines[n]


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    listing = "--list" in sys.argv[1:]

    problems: list[tuple[str, str, int, str]] = []
    per_file: dict[str, int] = {}

    for path in PAGES:
        if os.path.basename(path) in SKIP_FILES:
            continue
        rel = os.path.relpath(path, REPO).replace("\\", "/")
        hits = 0
        for number, line in prose_lines(path):
            if EM_DASH in line:
                hits += line.count(EM_DASH)
                problems.append(("prose-emdash", rel, number, line.strip()[:110]))
            for match in BANNED_RE.finditer(line):
                hits += 1
                problems.append(("prose-banned", rel, number, match.group(0)))
            for match in EMPTY_RE.finditer(line):
                hits += 1
                problems.append(("prose-empty", rel, number, match.group(0)))
        if hits:
            per_file[rel] = hits

    if listing:
        print("per file (worst first):")
        for rel, count in sorted(per_file.items(), key=lambda kv: -kv[1]):
            print("  %4d  %s" % (count, rel))
        print("  %4d  TOTAL" % sum(per_file.values()))
        return 0

    by_rule: dict[str, int] = {}
    for rule, _, _, _ in problems:
        by_rule[rule] = by_rule.get(rule, 0) + 1

    print(
        "prose: %d violation(s) across %d file(s) - %s"
        % (
            len(problems),
            len(per_file),
            ", ".join("%s %d" % kv for kv in sorted(by_rule.items())) or "none",
        )
    )
    if problems:
        print("\nPROBLEMS (%d):" % len(problems))
        for rule, rel, number, excerpt in problems[:80]:
            print("  x %s:%d [%s] %s" % (rel, number, rule, excerpt))
        if len(problems) > 80:
            print("  ... and %d more (run --list for the per-file counts)" % (len(problems) - 80))
        return 1

    print("\nOK: the prose keeps the house rules.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
