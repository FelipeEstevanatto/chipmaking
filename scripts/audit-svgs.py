#!/usr/bin/env python3
"""Audit the hand-made and third-party SVGs in docs/public/assets.

The rules come from README.md ("Esquemas proprios"). They exist because the
drawings are single files used by both locales, sized by ZoomableImage, and
opened directly in a browser as well as inside the site.

Errors (exit 1):
  svg-size          root <svg> needs width and height, else naturalWidth is 0
  svg-viewbox       root <svg> needs a viewBox
  svg-title         every drawing needs a non-empty <title>
  svg-desc          every drawing needs a non-empty <desc>
  svg-bgrect        the first drawing child must be an opaque <rect> over the viewBox
  svg-entity        named HTML entities like &minus; do not exist in XML
  svg-ascii         non-ASCII bytes must be numeric references (&#233;)
  svg-foreign       Inkscape/Sodipodi/RDF metadata is not part of the drawing
  svg-units         width/height must be unitless
  svg-sentence      explanation belongs in the caption, not in a <text> node
  svg-portuguese    labels are short English technical terms

Warnings (reported, do not fail):
  svg-overflow      a <text> seems to fall outside the viewBox
  svg-role          role="img" is missing
  svg-font          a font-size below the readable floor for its viewBox
  svg-color         a hex colour outside the shared palette

Third-party files are exempt from the label/sentence rules, because we ship
them as drawn; they still have to satisfy the structural rules.
"""

from __future__ import annotations

import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "docs" / "public" / "assets"

SVG = "{http://www.w3.org/2000/svg}"

# Shipped as drawn (attribution in the figcaption). Structural rules only.
THIRD_PARTY = {
    "czochralski-process.svg",
    "immersion-lithography.svg",
    "line-doubling.svg",
    "miller-indices.svg",
    "silicon-doping-p-n.svg",
}

# CSS classes are the only font sizes we control; anything else is a guess.
FONT_RE = re.compile(r"font(?:-size)?\s*:\s*(?:[^;]*?\s)?([0-9.]+)px")
CLASS_RE = re.compile(r"\.([A-Za-z0-9_-]+)\s*\{([^}]*)\}")
HEX_RE = re.compile(r"(?<!&)#[0-9a-fA-F]{3,8}")
NAMED_ENTITY_RE = re.compile(r"&([A-Za-z][A-Za-z0-9]*);")
XML_ENTITIES = {"amp", "lt", "gt", "quot", "apos"}
FOREIGN_RE = re.compile(r"inkscape:|sodipodi:|<metadata|xmlns:dc|xmlns:cc|xmlns:rdf")
UNIT_RE = re.compile(r"^\s*[0-9.]+\s*(mm|cm|pt|pc|in|px)\s*$")

# Palette shared by the schematic drawings. Kept small on purpose.
PALETTE = {
    "#ffffff", "#000000", "#1a202c", "#2d3748", "#3d4756", "#4a5568",
    "#718096", "#7d8b9c", "#8a94a6", "#a0aec0", "#cbd5e0", "#cfd8e3",
    "#dbe3ec", "#e2e8f0", "#f0f4f8", "#f7fafc", "#edf2f7",
    "#2b6cb0", "#2c5282", "#63b3ed", "#90cdf4", "#b9d9f5", "#4299e1",
    "#c05621", "#ed8936", "#f6ad55", "#fbd9b5", "#dd6b20",
    "#276749", "#2f855a", "#48bb78", "#68d391", "#c6f6d5",
    "#553c9a", "#805ad5", "#b794f4", "#44337a", "#6b46c1",
    "#9b2c2c", "#c53030", "#e53e3e", "#fed7d7",
    "#b7791f", "#f6e05e", "#fefcbf", "#975a16",
    "#234e52", "#285e61", "#319795", "#4fd1c5", "#b2f5ea",
    "#1a365d", "#2a4365",
    "#c0c0c0", "#646464", "#666666", "#8d8e8e", "#469aac",
}

PT_STRONG = re.compile(r"[áàâãéêíóôõúç]", re.IGNORECASE)
PT_WORDS = {
    "não", "são", "após", "até", "está", "também", "depois", "sobre",
    "cada", "quando", "onde", "pode", "pela", "pelo", "para", "sem",
    "uma", "dos", "das", "camada", "dentro", "fora", "linha", "volta",
    "etapas", "meses", "bilhões", "há", "será", "seu", "sua", "seus",
    "suas", "qual", "quais", "porque", "ainda", "nada", "tudo", "maior",
    "menor", "assim", "então", "apenas", "contra", "desde", "enquanto",
}
PT_MARKERS = ("ção", "ções", "ão", "ãos", "ável", "ível", "mente", "nh")

ENTITY_RE = re.compile(
    r"&(?:#(?P<dec>[0-9]+)|#[xX](?P<hex>[0-9a-fA-F]+)|(?P<name>[A-Za-z][A-Za-z0-9]*));"
)


def decode_entities(text: str) -> str:
    def repl(m: re.Match[str]) -> str:
        if m.group("hex"):
            return chr(int(m.group("hex"), 16))
        if m.group("dec"):
            return chr(int(m.group("dec")))
        return m.group(0)

    return ENTITY_RE.sub(repl, text)


def looks_portuguese(text: str) -> bool:
    if not text.strip():
        return False
    if PT_STRONG.search(text):
        return True
    lowered = text.lower()
    if any(marker in lowered for marker in PT_MARKERS):
        return True
    words = set(re.findall(r"[a-zà-ÿ]+", lowered))
    return len(words & PT_WORDS) >= 2


def parse_viewbox(root: ET.Element) -> tuple[float, float, float, float] | None:
    raw = root.get("viewBox")
    if not raw:
        return None
    parts = re.split(r"[,\s]+", raw.strip())
    if len(parts) != 4:
        return None
    try:
        return tuple(float(p) for p in parts)  # type: ignore[return-value]
    except ValueError:
        return None


def class_fonts(style_text: str) -> dict[str, float]:
    fonts: dict[str, float] = {}
    for name, body in CLASS_RE.findall(style_text):
        match = FONT_RE.search(body)
        if match:
            fonts[name] = float(match.group(1))
    return fonts


def text_width(text: str, size: float) -> float:
    # Rough advance width (0.5 em average for a UI sans-serif), just to catch gross overflow.
    return len(text) * size * 0.5


def walk_text(el: ET.Element, inherited: float) -> list[tuple[ET.Element, str, float]]:
    out: list[tuple[ET.Element, str, float]] = []
    for child in el.iter():
        if child.tag != SVG + "text":
            continue
        size = inherited
        inline = FONT_RE.search(child.get("style", ""))
        if inline:
            size = float(inline.group(1))
        else:
            classes = (child.get("class") or "").split()
            if classes:
                size = CLASSES.get(classes[0], inherited)
        content = "".join(child.itertext())
        out.append((child, content, size))
    return out


CLASSES: dict[str, float] = {}


def check(path: Path) -> tuple[list[str], list[str]]:
    global CLASSES
    raw = path.read_text(encoding="utf-8")
    errors: list[str] = []
    warnings: list[str] = []
    third_party = path.name in THIRD_PARTY

    try:
        root = ET.fromstring(raw)
    except ET.ParseError as exc:
        return [f"svg-parse  cannot parse: {exc}"], []

    # -- structure ---------------------------------------------------------
    for attr in ("width", "height"):
        value = root.get(attr)
        if not value:
            errors.append(f"svg-size  missing {attr}")
        elif UNIT_RE.match(value):
            errors.append(f"svg-units  {attr}=\"{value}\" carries a unit")
    vb = parse_viewbox(root)
    if vb is None:
        errors.append("svg-viewbox  missing or malformed viewBox")

    title = root.find(SVG + "title")
    desc = root.find(SVG + "desc")
    if title is None or not (title.text or "").strip():
        errors.append("svg-title  missing or empty <title>")
    if desc is None or not (desc.text or "").strip():
        errors.append("svg-desc  missing or empty <desc>")
    if root.get("role") != "img":
        warnings.append("svg-role  missing role=\"img\"")

    # -- boilerplate that does not belong in the drawing -------------------
    if FOREIGN_RE.search(raw):
        errors.append("svg-foreign  Inkscape/Sodipodi/RDF metadata present")
    for match in NAMED_ENTITY_RE.finditer(raw):
        if match.group(1) not in XML_ENTITIES:
            errors.append(f"svg-entity  named entity &{match.group(1)};")
            break
    non_ascii = sorted({ch for ch in raw if ord(ch) > 126})
    if non_ascii:
        shown = "".join(non_ascii[:8])
        errors.append(f"svg-ascii  non-ASCII characters: {shown!r}")

    # -- background --------------------------------------------------------
    children = [c for c in root if c.tag not in (SVG + "title", SVG + "desc", SVG + "metadata")]
    if children:
        first = children[0]
        if first.tag != SVG + "rect":
            errors.append("svg-bgrect  first drawing child is not a <rect>")
        else:
            fill = (first.get("fill") or "").strip().lower()
            if not fill:
                style_fill = re.search(r"fill\s*:\s*([^;]+)", first.get("style", ""))
                if style_fill:
                    fill = style_fill.group(1).strip().lower()
            if not fill or fill == "none" or fill.startswith("url("):
                errors.append("svg-bgrect  background <rect> is not opaque")
            if vb:
                try:
                    w = float(first.get("width", "0"))
                    h = float(first.get("height", "0"))
                    if w + 0.5 < vb[2] or h + 0.5 < vb[3]:
                        errors.append("svg-bgrect  background <rect> does not cover the viewBox")
                except ValueError:
                    errors.append("svg-bgrect  background <rect> has non-numeric size")
    else:
        errors.append("svg-bgrect  no drawing children")

    # -- text --------------------------------------------------------------
    styles = "".join((s.text or "") for s in root.iter(SVG + "style"))
    CLASSES = class_fonts(styles)
    for node, content, size in walk_text(root, 16.0):
        clean = decode_entities(content).strip()
        if not clean:
            continue
        if len(clean) >= 60:
            errors.append(f"svg-sentence  {len(clean)} chars: {clean[:70]!r}")
        elif not third_party and looks_portuguese(clean):
            errors.append(f"svg-portuguese  {clean[:60]!r}")

        if vb and not third_party:
            try:
                x = float(node.get("x", "0"))
                y = float(node.get("y", "0"))
            except ValueError:
                continue
            anchor = node.get("text-anchor", "start")
            width = text_width(clean, size)
            if anchor == "middle":
                left, right = x - width / 2, x + width / 2
            elif anchor == "end":
                left, right = x - width, x
            else:
                left, right = x, x + width
            top, bottom = y - size, y + size * 0.3
            if left < vb[0] - 1 or right > vb[0] + vb[2] + 1:
                warnings.append(f"svg-overflow  x-range {left:.0f}..{right:.0f} vs viewBox width {vb[2]:.0f}: {clean[:40]!r}")
            if top < vb[1] - 1 or bottom > vb[1] + vb[3] + 1:
                warnings.append(f"svg-overflow  y={y:.0f} outside viewBox height {vb[3]:.0f}: {clean[:40]!r}")

    if vb and not third_party:
        floor = 13.0 if vb[2] <= 800 else 15.0
        for node, content, size in walk_text(root, 16.0):
            if decode_entities(content).strip() and size < floor:
                warnings.append(f"svg-font  {size}px below {floor}px floor: {decode_entities(content).strip()[:40]!r}")
                break

    # -- palette -----------------------------------------------------------
    used = set()
    for match in HEX_RE.finditer(raw):
        color = match.group(0).lower()
        if len(color) == 4:
            color = "#" + "".join(c * 2 for c in color[1:])
        used.add(color)
    off = sorted(c for c in used if c not in PALETTE)
    if off:
        warnings.append("svg-color  outside palette: " + " ".join(off))

    return errors, warnings


def main() -> int:
    reconfigure = getattr(sys.stdout, "reconfigure", None)
    if reconfigure:
        reconfigure(encoding="utf-8", errors="backslashreplace")
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    show_warnings = "--all" in sys.argv or "-v" in sys.argv
    files = sorted(ASSETS.glob("*.svg"))
    if args:
        wanted = {a if a.endswith(".svg") else a + ".svg" for a in args}
        files = [f for f in files if f.name in wanted]

    total_errors = 0
    total_warnings = 0
    for path in files:
        errors, warnings = check(path)
        total_errors += len(errors)
        total_warnings += len(warnings)
        if errors or (show_warnings and warnings):
            print(f"\n{path.name}")
            for line in errors:
                print(f"  ERROR  {line}")
            if show_warnings:
                for line in warnings:
                    print(f"  warn   {line}")

    print()
    print(f"{len(files)} files, {total_errors} errors, {total_warnings} warnings")
    if total_errors:
        return 1
    print("OK")
    return 0


if __name__ == "__main__":
    sys.exit(main())
