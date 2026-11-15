"""Extract embedded images from Resumo Chipmaking.pdf into docs/public/pdf-images/."""
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / "Resumo Chipmaking.pdf"
OUT = ROOT / "docs" / "public" / "pdf-images"

# Images the site replaced with original drawings. Kept out of the output so a re-extraction does
# not restore files nothing links to.
REPLACED = {"p08-1.png", "p15-1.png", "p15-2.png", "p16-1.png"}


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(PDF)
    for page_num in range(doc.page_count):
        page = doc[page_num]
        for img_index, img in enumerate(page.get_images(full=True)):
            xref = img[0]
            base = doc.extract_image(xref)
            ext = base["ext"]
            name = f"p{page_num + 1:02d}-{img_index + 1}.{ext}"
            if name in REPLACED:
                print(f"skip {name} (replaced by a drawing)")
                continue
            (OUT / name).write_bytes(base["image"])
            print(name)
    print(f"Wrote images to {OUT}")


if __name__ == "__main__":
    main()
