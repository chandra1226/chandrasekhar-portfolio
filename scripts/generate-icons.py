#!/usr/bin/env python3
"""Regenerate the raster favicons from the same mark as src/app/icon.svg.

Optional helper — the committed icons are already correct. Re-run it only if
you change the mark:

    pip install pillow
    python scripts/generate-icons.py

Writes src/app/favicon.ico (16/32/48) and src/app/apple-icon.png (180x180).
Next.js picks both up automatically from the app directory.
"""

from __future__ import annotations

import os

from PIL import Image, ImageDraw

PANEL = (11, 15, 24, 255)
LINE_STRONG = (35, 43, 60, 255)
ACCENT = (77, 141, 255, 255)
SIGNAL = (52, 211, 153, 255)


def render(size: int) -> Image.Image:
    """Draw the mark at 8x and downsample, which gives clean antialiasing."""
    scale = 8
    s = size * scale
    image = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)

    unit = s / 64  # the SVG is authored on a 64x64 grid

    draw.rounded_rectangle(
        [(unit, unit), (s - unit, s - unit)],
        radius=14 * unit,
        fill=PANEL,
        outline=LINE_STRONG,
        width=max(1, int(2 * unit)),
    )

    stroke = max(1, int(7 * unit))

    # Chevron.
    draw.line(
        [(18 * unit, 21 * unit), (30 * unit, 32 * unit), (18 * unit, 43 * unit)],
        fill=ACCENT,
        width=stroke,
        joint="curve",
    )
    # Rounded caps, drawn by hand since PIL's line has none.
    for point in ((18, 21), (30, 32), (18, 43)):
        cx, cy = point[0] * unit, point[1] * unit
        draw.ellipse(
            [cx - stroke / 2, cy - stroke / 2, cx + stroke / 2, cy + stroke / 2],
            fill=ACCENT,
        )

    # Prompt underscore.
    draw.line([(36 * unit, 44 * unit), (46 * unit, 44 * unit)], fill=SIGNAL, width=stroke)
    for cx in (36 * unit, 46 * unit):
        cy = 44 * unit
        draw.ellipse(
            [cx - stroke / 2, cy - stroke / 2, cx + stroke / 2, cy + stroke / 2],
            fill=SIGNAL,
        )

    return image.resize((size, size), Image.LANCZOS)


def main() -> None:
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    app_dir = os.path.join(root, "src", "app")

    ico_path = os.path.join(app_dir, "favicon.ico")
    render(256).save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"wrote {ico_path}")

    apple_path = os.path.join(app_dir, "apple-icon.png")
    apple = Image.new("RGBA", (180, 180), (5, 7, 12, 255))
    apple.alpha_composite(render(180))
    apple.convert("RGB").save(apple_path, "PNG", optimize=True)
    print(f"wrote {apple_path}")


if __name__ == "__main__":
    main()
