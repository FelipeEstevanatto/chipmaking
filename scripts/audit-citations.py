#!/usr/bin/env python3
"""Audit the citation registry and every reference to it.

The prose cites sources through five shapes:

  <Cite id="..." />                 a marker in the text
  <SourceNote :ids="['a', 'b']" />  the source list at the foot of a page
  sourceIds: ['a', 'b']             a chart, milestone, stage or chokepoint
  cite: 'a'                         a SeeAlso link or a yield preset
  processCite: 'a'                  the yield explorer's process source

A registry that drifts from those shapes fails quietly: a missing key renders a marker with no
entry, a duplicate number sends two markers to the same row, and an entry nobody cites is a source
the reader pays for but never sees. This script checks the registry and every shape above.

It also checks the hygiene the Wikipedia citation section lists: duplicate keys and numbers, URLs
with tracking parameters or whitespace, and entries missing the `short` or `publisher` field.

Usage:
    python scripts/audit-citations.py
"""
from __future__ import annotations

import glob
import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CITATIONS = os.path.join(REPO, "docs", ".vitepress", "theme", "citations.ts")

ENTRY_RE = re.compile(r"\{\s*key:\s*'([^']+)',(.*?)\n  \},", re.S)
FIELD_RE = re.compile(r"(\w+):\s*(?:'((?:[^'\\]|\\.)*)'|\"((?:[^\"\\]|\\.)*)\")")
NUM_RE = re.compile(r"num:\s*(\d+)")


def entries() -> list[dict[str, object]]:
    src = open(CITATIONS, encoding="utf-8").read()
    found: list[dict[str, object]] = []
    for key, body in ENTRY_RE.findall(src):
        fields: dict[str, object] = {"key": key}
        for name, single, double in FIELD_RE.findall(body):
            fields[name] = single if single else double
        num = NUM_RE.search(body)
        fields["num"] = int(num.group(1)) if num else None
        found.append(fields)
    return found


def page_texts() -> str:
    paths = (
        glob.glob(os.path.join(REPO, "docs", "**", "*.md"), recursive=True)
        + glob.glob(os.path.join(REPO, "docs", ".vitepress", "theme", "**", "*.ts"), recursive=True)
        + glob.glob(os.path.join(REPO, "docs", ".vitepress", "theme", "**", "*.vue"), recursive=True)
    )
    parts = []
    for path in paths:
        if path.endswith("citations.ts"):
            continue
        parts.append(open(path, encoding="utf-8").read())
    return "\n".join(parts)


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    registry = entries()
    keys = {str(entry["key"]) for entry in registry}
    problems: list[str] = []

    # Duplicates.
    seen_keys: dict[str, int] = {}
    seen_nums: dict[int, str] = {}
    for entry in registry:
        key = str(entry["key"])
        num = entry["num"]
        seen_keys[key] = seen_keys.get(key, 0) + 1
        if isinstance(num, int):
            if num in seen_nums:
                problems.append("duplicate number %d: %s and %s" % (num, seen_nums[num], key))
            seen_nums[num] = key
    for key, count in seen_keys.items():
        if count > 1:
            problems.append("duplicate key %s (%d entries)" % (key, count))

    # Number coverage. A gap is allowed only if it is explained; a duplicate is never allowed.
    nums = sorted(n for n in seen_nums)
    if nums:
        missing = [n for n in range(1, max(nums) + 1) if n not in seen_nums]
        if missing:
            problems.append("number gaps: %s" % ", ".join(map(str, missing[:20])))

    # Fields and URL hygiene.
    for entry in registry:
        key = str(entry["key"])
        for field in ("title", "short"):
            if not entry.get(field):
                problems.append("[%s] missing %s" % (key, field))
        if not entry.get("publisher"):
            problems.append("[%s] missing publisher" % key)
        url = str(entry.get("url") or "")
        if url:
            if "utm_" in url:
                problems.append("[%s] tracking parameter in URL: %s" % (key, url))
            if any(ch.isspace() for ch in url):
                problems.append("[%s] whitespace in URL: %s" % (key, url))
            if not re.match(r"https?://[^\s]+$", url):
                problems.append("[%s] malformed URL: %s" % (key, url))

    # Every reference shape.
    text = page_texts()
    used: set[str] = set()
    used |= set(re.findall(r'<Cite\s+id="([^"]+)"', text))
    used |= set(re.findall(r"<Cite\s+id='([^']+)'", text))
    for match in re.finditer(r':ids="\[([^\]]*)\]"', text):
        used |= set(re.findall(r"'([^']+)'", match.group(1)))
    for match in re.finditer(r"sourceIds\s*:\s*\[([^\]]*)\]", text):
        used |= set(re.findall(r"'([^']+)'", match.group(1)))
    used |= set(re.findall(r"(?:cite|processCite|sourceCite)\s*:\s*'([^']+)'", text))
    used = {key for key in used if key and key != "..."}

    for key in sorted(used - keys):
        problems.append("cited but not registered: %s" % key)
    for key in sorted(keys - used):
        problems.append("registered but never cited: %s" % key)

    print("entries: %d | keys: %d | numbers: %d..%d | referenced keys: %d"
          % (len(registry), len(keys), min(nums) if nums else 0, max(nums) if nums else 0, len(used & keys)))
    if problems:
        print("\nPROBLEMS (%d):" % len(problems))
        for problem in problems:
            print("  x " + problem)
        return 1
    print("\nOK: every citation resolves, every entry is used, and the registry has no duplicates.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
