#!/usr/bin/env python3
"""Build `docs/public/og.jpg`, the 1200x630 image a shared link shows.

The site's own drawings are SVG, which the social cards do not accept, and the photographs are kept
at full resolution for the zoom, so neither can be linked directly. This composites one of them onto
the site's light background at the card size instead, which keeps the original untouched and gives
every share a face.

Run it after adding or replacing the source photograph:

    python scripts/gen-og-image.py
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "docs" / "public" / "assets" / "silicon-wafer-300mm.jpg"
OUT = ROOT / "docs" / "public" / "og.jpg"

WIDTH, HEIGHT = 1200, 630
BACKGROUND = (247, 250, 252)


def main() -> None:
    photo = Image.open(SOURCE).convert("RGB")
    # Fit rather than fill: a centre crop of an unknown composition is a gamble, a margin is not.
    scale = min((WIDTH - 40) / photo.width, (HEIGHT - 40) / photo.height)
    fitted = photo.resize((round(photo.width * scale), round(photo.height * scale)), Image.LANCZOS)

    card = Image.new("RGB", (WIDTH, HEIGHT), BACKGROUND)
    card.paste(fitted, ((WIDTH - fitted.width) // 2, (HEIGHT - fitted.height) // 2))
    card.save(OUT, "JPEG", quality=84, optimize=True, progressive=True)
    print("wrote %s (%dx%d, %d kB)" % (OUT.relative_to(ROOT), WIDTH, HEIGHT, OUT.stat().st_size // 1024))


if __name__ == "__main__":
    main()
