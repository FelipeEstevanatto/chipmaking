#!/usr/bin/env python3
"""Report the numbers a chapter and its translation do not share.

Every chapter exists twice, and the rule is that the English mirrors the Portuguese rather than
retelling it: the same claim carries the same number, and only the notation differs (PT writes 1.700
where EN writes 1,700; 0,47 % against 0.47%). Nothing watched for a quantity edited on one side only.

The report extracts every numeric token from a page and from its twin, normalises the notation away
(the thousands separator, the decimal comma, the `{,}` brace MathJax wants, and a space-grouped
thousand) and lists the values that appear on one side only. It is deliberately about the digits and
not the prose, so a reworded sentence is not a finding. It is also deliberately a report rather than
a gate: the two languages legitimately differ in how they write a quantity (PT `50 mil` against EN
`50,000`, EN `eight hundredfold` against PT `800 vezes`), so every line is a candidate for a reader to
check, not a defect. Pass --strict to make it exit non-zero.

Usage:
    python scripts/audit-numbers.py
    python scripts/audit-numbers.py --strict
"""
from __future__ import annotations

import glob
import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(REPO, "docs")

URL_RE = re.compile(r"https?://\S+")
ATTR_RE = re.compile(r"\b(?:src|href)=\"[^\"]*\"")
MDTARGET_RE = re.compile(r"\]\([^)]*\)")
CODE_RE = re.compile(r"`[^`]*`")
COMMENT_RE = re.compile(r"<!--.*?-->", re.S)
NUMBER_RE = re.compile(r"\d+(?:[.,]\d+)*")
# A space between digits followed by exactly three more is a thousands separator (`11 100 mm`). The
# lookbehind keeps it off a number that is already grouped with a separator, so `6,000 300 mm` (two
# quantities side by side) is not read as one.
SPACE_GROUP_RE = re.compile(r"(?<![.,\d])\d{1,3}[ \u00a0](?=\d{3}(?!\d))")


def numbers(path: str) -> dict[str, int]:
    text = open(path, encoding="utf-8").read()
    text = COMMENT_RE.sub(" ", text)
    text = URL_RE.sub(" ", text)
    text = ATTR_RE.sub(" ", text)
    text = MDTARGET_RE.sub("]", text)
    text = CODE_RE.sub(" ", text)
    # MathJax wants a brace group around a decimal comma (`0{,}7`), which is notation, not a value.
    text = text.replace("{,}", ",")
    while SPACE_GROUP_RE.search(text):
        text = SPACE_GROUP_RE.sub(lambda m: m.group(0).replace(" ", "").replace("\u00a0", ""), text)
    found: dict[str, int] = {}
    for token in NUMBER_RE.findall(text):
        value = token.replace(".", "").replace(",", "")
        if value:
            found[value] = found.get(value, 0) + 1
    return found


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    strict = "--strict" in sys.argv[1:]

    lines: list[str] = []
    pairs = 0

    for pt in sorted(glob.glob(os.path.join(DOCS, "*.md"))):
        slug = os.path.basename(pt)
        en = os.path.join(DOCS, "en", slug)
        if not os.path.isfile(en):
            lines.append("%s: no English twin" % slug)
            continue
        pairs += 1
        pt_numbers = numbers(pt)
        en_numbers = numbers(en)
        for value, count in sorted(pt_numbers.items()):
            if en_numbers.get(value, 0) < count:
                lines.append("docs/%s: %s is on the Portuguese only" % (slug, value))
        for value, count in sorted(en_numbers.items()):
            if pt_numbers.get(value, 0) < count:
                lines.append("docs/en/%s: %s is on the English only" % (slug, value))

    print("chapter pairs compared: %d" % pairs)
    if lines:
        print("\nTO REVIEW (%d):" % len(lines))
        for line in lines:
            print("  ? " + line)
        return 1 if strict else 0

    print("\nOK: both locales carry the same numbers.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
