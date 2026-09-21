"""Downscale oversized photo assets in docs/public/assets.

DEFERRED HELPER — do not run this yet. See .cursor/rules/prefer-original-images.mdc

This repo deliberately keeps original high-resolution images: the photos and
diagrams are the content, readers zoom into them, and the repository is still
small enough that the saved bytes are not worth the lost quality. Downscaling is
lossy and irreversible, so the original has to be re-fetched afterwards.

The script therefore refuses to run until the repository reaches THRESHOLD_MB.
Pass --force to override that gate on purpose.

Usage:
    python scripts/resize-photos.py                     # scan everything (gated)
    python scripts/resize-photos.py foo.jpg bar.jpg     # only these files (gated)
    python scripts/resize-photos.py --force             # ignore the size gate
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

REPO_ROOT = Path(__file__).resolve().parent.parent
ASSETS = REPO_ROOT / "docs" / "public" / "assets"

# Long edge above which a photo is considered oversized.
MAX_EDGE = 1600
JPEG_QUALITY = 82
PHOTO_SUFFIXES = {".jpg", ".jpeg", ".png"}

# Only once the repo is this large is the trade-off worth making.
THRESHOLD_MB = 400

# Build artefacts and dependencies are not part of what we are sizing.
EXCLUDED_DIRS = {"node_modules", ".git", ".cache", "dist", "cache", ".vitepress"}


def directory_size_mb(root: Path) -> float:
    total = 0
    for path in root.rglob("*"):
        if not path.is_file():
            continue
        if any(part in EXCLUDED_DIRS for part in path.relative_to(root).parts):
            continue
        try:
            total += path.stat().st_size
        except OSError:
            continue
    return total / (1024 * 1024)


def optimize(path: Path) -> str | None:
    """Shrink one image in place. Returns a summary line, or None if untouched."""
    before = path.stat().st_size
    with Image.open(path) as opened:
        if max(opened.size) <= MAX_EDGE:
            return None
        original_size = opened.size
        im = opened.convert("RGB").copy()

    scale = MAX_EDGE / max(original_size)
    im = im.resize(
        (round(original_size[0] * scale), round(original_size[1] * scale)),
        Image.LANCZOS,
    )

    if path.suffix.lower() == ".png":
        im.save(path, "PNG", optimize=True)
    else:
        im.save(path, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)

    return (
        f"{path.name}: {original_size[0]}x{original_size[1]} -> {im.size[0]}x{im.size[1]}, "
        f"{before / 1024:.0f} KB -> {path.stat().st_size / 1024:.0f} KB"
    )


def main(argv: list[str]) -> int:
    force = "--force" in argv
    names = [a for a in argv if not a.startswith("--")]

    size_mb = directory_size_mb(REPO_ROOT)
    if not force and size_mb < THRESHOLD_MB:
        print(
            f"Refusing to run: repository is {size_mb:.0f} MB, below the "
            f"{THRESHOLD_MB} MB threshold.\n"
            "This project prefers original high-resolution images. See\n"
            "  .cursor/rules/prefer-original-images.mdc\n"
            "Pass --force only if you have decided the trade-off is worth it."
        )
        return 1

    if names:
        candidates = [ASSETS / name for name in names]
    else:
        candidates = [
            p
            for p in sorted(ASSETS.iterdir())
            if p.is_file() and p.suffix.lower() in PHOTO_SUFFIXES
        ]

    changed = 0
    for path in candidates:
        if not path.exists():
            print(f"missing: {path.name}")
            continue
        try:
            summary = optimize(path)
        except OSError as exc:
            print(f"skipped {path.name}: {exc}")
            continue
        if summary:
            print(summary)
            changed += 1

    print(f"\n{changed} file(s) rewritten, {len(candidates)} checked.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
