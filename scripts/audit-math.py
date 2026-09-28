#!/usr/bin/env python3
"""Audit which pages carry typeset maths, against the built site.

Equations are written with `$...$` and `$$...$$` and rendered by MathJax at build time (`math: true` in
`config.ts`). Two things go wrong silently and both are only visible in the built HTML:

  * a literal dollar sign in prose closes a `$...$` span. A paragraph holding two currency amounts
    (say two `US$/Wp`) loses the text between them inside a formula. Literal dollars are therefore
    written `\\$` in the chapters, and
  * an equation whose delimiters are mistyped renders as nothing at all, with no warning.

The check is an allowlist: every page has to declare whether it is supposed to carry maths. Adding an
equation to a new chapter is a deliberate act, so the page joins EXPECTED once the author has looked
at the result.

Usage:
    bun run build
    python scripts/audit-math.py
"""
from __future__ import annotations

import glob
import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(REPO, "docs", ".vitepress", "dist")

# Pages that render at least one equation. `na-fab` has Deal-Grove and the yield model;
# `confiabilidade` has Black's equation and the Arrhenius factors.
EXPECTED = {
    "na-fab.html",
    "en/na-fab.html",
    "confiabilidade.html",
    "en/confiabilidade.html",
}


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    if not os.path.isdir(DIST):
        print("dist/ not found - run `bun run build` first")
        return 1

    problems: list[str] = []
    found: dict[str, int] = {}

    for path in sorted(glob.glob(os.path.join(DIST, "**", "*.html"), recursive=True)):
        rel = os.path.relpath(path, DIST).replace("\\", "/")
        if rel.startswith("assets/"):
            continue
        html = open(path, encoding="utf-8").read()
        if "vp-doc" not in html:
            continue
        count = len(re.findall(r"<mjx-container", html))
        if count:
            found[rel] = count

    for rel in sorted(EXPECTED):
        if rel not in found:
            problems.append("%s: expected an equation, found none (delimiters mistyped?)" % rel)

    for rel in sorted(set(found) - EXPECTED):
        problems.append(
            "%s: %d equation(s) in a page that should have none. A literal `$` in prose probably "
            "closed a `$...$` span; escape it as \\$." % (rel, found[rel])
        )

    print("pages with maths: %s" % (", ".join("%s (%d)" % kv for kv in sorted(found.items())) or "none"))
    if problems:
        print("\nPROBLEMS (%d):" % len(problems))
        for problem in problems:
            print("  x " + problem)
        return 1

    print("\nOK: maths renders exactly where it is expected.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
