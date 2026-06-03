import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / ".codex_tmp" / "py_pkgs"))

import fitz  # type: ignore


INPUT = Path(r"C:\Users\HOME\I_Hesabat_Times_New_Roman_FIXED.pdf")
OUTPUT = Path(r"C:\Users\HOME\I_Hesabat_REAL_Times_New_Roman.pdf")

FONTS = {
    "regular": Path(r"C:\Windows\Fonts\times.ttf"),
    "bold": Path(r"C:\Windows\Fonts\timesbd.ttf"),
    "italic": Path(r"C:\Windows\Fonts\timesi.ttf"),
    "bolditalic": Path(r"C:\Windows\Fonts\timesbi.ttf"),
}

FONT_NAMES = {
    "regular": "RealTNRRegular",
    "bold": "RealTNRBold",
    "italic": "RealTNRItalic",
    "bolditalic": "RealTNRBoldItalic",
}


def color_tuple(color: int) -> tuple[float, float, float]:
    return (
        ((color >> 16) & 255) / 255,
        ((color >> 8) & 255) / 255,
        (color & 255) / 255,
    )


def font_role(span: dict) -> str:
    name = span.get("font", "").lower()
    flags = int(span.get("flags", 0))
    bold = "bold" in name or bool(flags & 16)
    italic = "italic" in name or "oblique" in name or bool(flags & 2)
    if bold and italic:
        return "bolditalic"
    if bold:
        return "bold"
    if italic:
        return "italic"
    return "regular"


def extract_spans(page: fitz.Page) -> list[dict]:
    spans: list[dict] = []
    data = page.get_text("dict")
    for block in data.get("blocks", []):
        if block.get("type") != 0:
            continue
        for line in block.get("lines", []):
            direction = tuple(line.get("dir", (1, 0)))
            if direction != (1, 0):
                continue
            for span in line.get("spans", []):
                text = span.get("text", "")
                if not text:
                    continue
                bbox = fitz.Rect(span["bbox"])
                if bbox.is_empty or bbox.is_infinite:
                    continue
                spans.append(
                    {
                        "text": text,
                        "bbox": bbox,
                        "origin": fitz.Point(span["origin"]),
                        "size": float(span["size"]),
                        "color": color_tuple(int(span.get("color", 0))),
                        "role": font_role(span),
                    }
                )
    return spans


def main() -> None:
    doc = fitz.open(INPUT)
    for page in doc:
        spans = extract_spans(page)

        for role, font_path in FONTS.items():
            page.insert_font(fontname=FONT_NAMES[role], fontfile=str(font_path))

        for span in spans:
            # Keep the redaction rectangle tight so table/grid line art is preserved.
            page.add_redact_annot(span["bbox"], cross_out=False, fill=(1, 1, 1))

        page.apply_redactions(
            images=fitz.PDF_REDACT_IMAGE_NONE,
            graphics=fitz.PDF_REDACT_LINE_ART_NONE,
            text=fitz.PDF_REDACT_TEXT_REMOVE,
        )

        for span in spans:
            page.insert_text(
                span["origin"],
                span["text"],
                fontname=FONT_NAMES[span["role"]],
                fontfile=str(FONTS[span["role"]]),
                fontsize=span["size"],
                color=span["color"],
                overlay=True,
            )

        page.clean_contents(sanitize=True)

    doc.subset_fonts()
    doc.save(
        OUTPUT,
        garbage=4,
        clean=True,
        deflate=True,
        deflate_fonts=True,
        use_objstms=True,
    )
    doc.close()
    print(OUTPUT)


if __name__ == "__main__":
    main()
