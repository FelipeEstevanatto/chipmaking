#!/usr/bin/env python3
"""Audit the internal links of the built site, fragments included.

VitePress fails the build on a link to a page that does not exist, but it does not check the fragment
that follows the `#`. A link to `#oxidacao-termica` that no heading produces is silently dead, which
is exactly how a cross-reference rots when a heading is renamed, or when an English page keeps a
Portuguese slug.

The audit reads the build output. For every internal href that carries a fragment it resolves the
target document and asserts that the document contains that `id`.

Usage:
    bun run build
    python scripts/audit-links.py
"""
from __future__ import annotations

import glob
import os
import re
import sys
from urllib.parse import unquote

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(REPO, "docs", ".vitepress", "dist")
BASE = "/chipmaking/"

HREF_RE = re.compile(r'href="([^"]+)"')
ID_RE = re.compile(r'id="([^"]+)"')
EXTERNAL = ("http://", "https://", "//", "mailto:", "tel:", "data:", "javascript:")


def resolve(src_rel: str, path: str) -> str | None:
    """The file inside dist a link points at, or None when it is not an internal page."""
    if path.startswith(EXTERNAL):
        return None
    if path.startswith(BASE):
        path = path[len(BASE):]
    elif path.startswith("/"):
        path = path.lstrip("/")
    else:
        path = os.path.normpath(os.path.join(os.path.dirname(src_rel), path)).replace("\\", "/")

    if path in ("", "."):
        return "index.html"
    if path.endswith("/"):
        return path + "index.html"

    _, extension = os.path.splitext(path)
    if extension in (".html", ".htm"):
        return path
    if not extension:
        # VitePress writes `page.html` and links it both as `/dir/page` and as `/dir/page.html`.
        if os.path.isfile(os.path.join(DIST, path + ".html")):
            return path + ".html"
        if os.path.isfile(os.path.join(DIST, path, "index.html")):
            return path + "/index.html"
    # Anything else (a CSV, a drawing, a font) is a file link, which VitePress already checks.
    return None


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    if not os.path.isdir(DIST):
        print("dist/ not found - run `bun run build` first")
        return 1

    pages = [
        path
        for path in sorted(glob.glob(os.path.join(DIST, "**", "*.html"), recursive=True))
        if not os.path.relpath(path, DIST).replace("\\", "/").startswith("assets/")
    ]
    if len(pages) < 10:
        print("only %d page(s) in dist/ - run `bun run build` first" % len(pages))
        return 1

    ids: dict[str, set[str]] = {}
    for path in pages:
        rel = os.path.relpath(path, DIST).replace("\\", "/")
        ids[rel] = set(ID_RE.findall(open(path, encoding="utf-8").read()))

    problems: list[str] = []
    checked = 0
    for path in pages:
        rel = os.path.relpath(path, DIST).replace("\\", "/")
        html = open(path, encoding="utf-8").read()
        for href in HREF_RE.findall(html):
            if "#" not in href:
                continue
            path_part, _, fragment = href.partition("#")
            fragment = unquote(fragment)
            if not fragment or href.startswith(EXTERNAL):
                continue
            target = rel if path_part == "" else resolve(rel, path_part)
            if target is None or target not in ids:
                continue
            checked += 1
            if fragment not in ids[target]:
                problems.append("%s: %s -> %s has no #%s" % (rel, href, target, fragment))

    print("internal anchors checked: %d across %d page(s)" % (checked, len(pages)))
    if problems:
        print("\nPROBLEMS (%d):" % len(problems))
        for problem in sorted(set(problems)):
            print("  x " + problem)
        return 1

    print("\nOK: every internal anchor resolves.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
