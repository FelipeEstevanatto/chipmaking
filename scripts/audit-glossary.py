#!/usr/bin/env python3
"""Audit the glossary tooltips against the built site.

`docs/.vitepress/glossary.ts` drives two things that are easy to break silently when a chapter is
added or a term is edited:

  * `theme/GlossaryTable.vue` renders `/glossario` and `/en/glossario` from that list, so the two
    locales have to stay identical, and
  * `glossary-tooltips.ts` annotates the *first* use of each entry in every chapter with its
    expansion.

This script checks both invariants on the rendered HTML, after `bun run build`:

  1. every annotation carries a `title` and is not nested in a link, a heading, a code block or a
     figure caption;
  2. no term is annotated twice on the same page;
  3. each entry's first use *that the plugin can reach* is the annotated one;
  4. mirrored pages annotate the same terms, and both glossary tables render the same entries.

Occurrences the plugin deliberately cannot reach — code, link labels, headings, `figcaption` and the
text Vue components render from props — do not count as first use, so a term may legitimately appear
bare near the top of a page and only be annotated further down.

Usage:
    bun run build
    python scripts/audit-glossary.py
"""
from __future__ import annotations

import glob
import os
import re
import sys
from html.parser import HTMLParser

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(REPO, "docs", ".vitepress", "dist")
GLOSSARY_TS = os.path.join(REPO, "docs", ".vitepress", "glossary.ts")

VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link",
        "meta", "param", "source", "track", "wbr"}
# NUL cannot appear inside a raw text node, so it separates segments without ever matching a term.
SEP = "\x00"
# Contexts the plugin never annotates. Such an occurrence does not count as an entry's first use,
# and an annotation must never end up inside one of them either.
SKIPPED = {"code", "link", "heading", "caption", "foreign"}


def read_glossary() -> list[list[str]]:
    """The spellings of every entry that gets a tooltip."""
    src = open(GLOSSARY_TS, encoding="utf-8").read()
    src = src[src.index("export const GLOSSARY"):]

    entries: list[list[str]] = []
    for block in re.finditer(r"\{(.*?)\}", src, re.S):
        body = block.group(1)
        term = re.search(r"term:\s*'([^']*)'", body)
        if not term or re.search(r"tooltip:\s*false", body):
            continue
        variants = re.search(r"variants:\s*\[([^\]]*)\]", body)
        spellings = [term.group(1)]
        if variants:
            spellings += re.findall(r"'([^']*)'", variants.group(1))
        entries.append([s for s in spellings if s])
    return entries


class Annotated(HTMLParser):
    """Annotations and locale-tagged visible text of a page."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.stack: list[tuple[str, str]] = []
        self.segments: list[tuple[str, str]] = []
        self.annotations: list[list[str | None]] = []  # [term, title, enclosing context]
        self.in_doc = False

    def _classify(self) -> str:
        """What kind of element the parser is currently inside."""
        tags = [t for t, _ in self.stack]
        classes = " ".join(c for _, c in self.stack)
        if "abbr" in tags:
            return "abbr"
        if "figcaption" in tags:
            return "caption"
        if any(t in ("pre", "code", "svg", "script") for t in tags) or "mermaid" in classes:
            return "code"
        if any(c in classes for c in ("transistor-timeline", "transistor-compare", "see-also",
                                      "glossary", "doc-meta", "build-footer")):
            return "foreign"
        if "a" in tags:
            return "link"
        if any(t in ("h1", "h2", "h3", "h4", "h5", "h6") for t in tags):
            return "heading"
        return "plain"

    def _refresh(self) -> None:
        self.in_doc = any(c.startswith("vp-doc") or " vp-doc" in c for _, c in self.stack)

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        classes = attributes.get("class") or ""
        if tag == "abbr" and "glossary-abbr" in classes:
            # Classify before pushing `abbr`, so this is the context the annotation sits in.
            self.annotations.append([None, attributes.get("title"), self._classify()])
        if tag not in VOID:
            self.stack.append((tag, classes))
        self._refresh()

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i][0] == tag:
                del self.stack[i:]
                break
        self._refresh()

    def handle_data(self, data):
        if not data or not self.in_doc:
            return
        kind = self._classify()
        if kind == "abbr" and self.annotations and self.annotations[-1][0] is None:
            self.annotations[-1][0] = data
        self.segments.append((data, kind))

    def text(self) -> tuple[str, list[str]]:
        parts: list[str] = []
        origin: list[str] = []
        for chunk, kind in self.segments:
            parts.append(chunk)
            origin.extend([kind] * len(chunk))
            parts.append(SEP)
            origin.append("sep")
        return "".join(parts), origin


def pattern(spelling: str) -> re.Pattern[str]:
    return re.compile(r"(?<![A-Za-z0-9-])" + re.escape(spelling) + r"(?![A-Za-z0-9-])")


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):  # keep the Windows console from choking on the report
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    if not os.path.isdir(DIST):
        print("dist/ not found - run `bun run build` first")
        return 1

    entries = read_glossary()
    problems: list[str] = []
    mirrors: dict[str, list[str]] = {}
    annotations = 0
    skipped_only = 0

    for path in sorted(glob.glob(os.path.join(DIST, "**", "*.html"), recursive=True)):
        rel = os.path.relpath(path, DIST).replace("\\", "/")
        if rel.startswith("assets/"):
            continue
        html = open(path, encoding="utf-8").read()
        if "vp-doc" not in html:
            continue

        parser = Annotated()
        parser.feed(html)
        terms = [a[0] for a in parser.annotations]

        if re.search(r"(glossario|referencias)\.html$", rel):
            continue

        # Checks 1 and 2.
        annotations += len(terms)
        mirrors[rel] = terms
        if len(terms) != len(set(terms)):
            problems.append("%s: repeats an annotation: %s" % (rel, sorted(terms)))
        for term, title, context in parser.annotations:
            if not term:
                problems.append("%s: an annotation has no text" % rel)
            if not (title or "").strip():
                problems.append("%s: the annotation for %r has no title" % (rel, term))
            if context in SKIPPED:
                problems.append("%s: the annotation for %r is nested in %s" % (rel, term, context))

        # Check 3.
        text, origin = parser.text()
        for spellings in entries:
            hits = [m for spelling in spellings for m in pattern(spelling).finditer(text)]
            if not hits:
                continue
            hits.sort(key=lambda m: m.start())
            first = next((m for m in hits if origin[m.start()] not in SKIPPED), None)
            if first is None:
                skipped_only += 1
            elif origin[first.start()] != "abbr":
                start = max(0, first.start() - 60)
                problems.append("%s: first reachable use of %s is not annotated -> ...%s..."
                                % (rel, first.group(0), text[start:first.end() + 40].replace("\n", " ")))

    # Check 4: a Portuguese page and its `en/` mirror annotate the same terms.
    for rel, terms in sorted(mirrors.items()):
        if rel.startswith("en/"):
            continue
        other = mirrors.get("en/" + rel)
        if other is not None and other != terms:
            problems.append("locale drift on %s:\n      pt = %s\n      en = %s"
                            % (rel, terms, other))

    # Check 4: both glossary tables render the same rows.
    tables: dict[str, list[str]] = {}
    for rel in ("glossario.html", "en/glossario.html"):
        path = os.path.join(DIST, rel)
        if not os.path.exists(path):
            continue
        page = open(path, encoding="utf-8").read()
        tables[rel] = re.findall(r"glossary-row__term[^>]*>([^<]*)<", page)
        if "glossary-filter" not in page:
            problems.append("%s: the filter box is missing" % rel)
    if len(tables) == 2 and len({tuple(rows) for rows in tables.values()}) != 1:
        problems.append("glossary tables differ: %s" % {k: len(v) for k, v in tables.items()})

    print("entries: %d | pages annotated: %d | annotations: %d | terms only in skipped contexts: %d"
          % (len(entries), len(mirrors), annotations, skipped_only))
    if tables:
        print("glossary table rows: %s" % {k: len(v) for k, v in tables.items()})

    if problems:
        print("\nPROBLEMS (%d):" % len(problems))
        for problem in problems:
            print("  x " + problem)
        return 1

    print("\nOK: annotations, first use and locale parity all check out.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
