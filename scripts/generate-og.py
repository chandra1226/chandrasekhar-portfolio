#!/usr/bin/env python3
"""Regenerate public/og.png — the social preview card.

Optional helper. The site does not need Python to build; this only exists so
the Open Graph image can be rebuilt after editing name/title/tagline.

    pip install pillow
    python scripts/generate-og.py

If you would rather not run it, just drop your own 1200x630 PNG at
public/og.png — nothing else references the generator.
"""

from __future__ import annotations

import os
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

# --- Content ---------------------------------------------------------------
NAME = "Bonumahanthi Chandrasekhar"
TITLE = "Senior Software Engineer"
TAGLINE = "Building scalable backend systems & AI evaluation infrastructure."
STACK = "Java  ·  Spring Boot  ·  Python  ·  Kafka  ·  Docker  ·  Kubernetes  ·  AWS"
MONOGRAM = "BC"

# --- Design tokens (kept in step with src/app/globals.css) -----------------
W, H = 1200, 630
INK = (5, 7, 12)
PANEL = (11, 15, 24)
LINE = (23, 29, 42)
LINE_STRONG = (35, 43, 60)
FG = (233, 237, 245)
FG_MUTED = (153, 163, 184)
FG_SUBTLE = (102, 113, 135)
ACCENT = (77, 141, 255)
SIGNAL = (52, 211, 153)

FONT_DIRS = [
    r"C:\Windows\Fonts",
    "/usr/share/fonts/truetype/dejavu",
    "/System/Library/Fonts",
]

FONT_CANDIDATES = {
    "bold": ["segoeuib.ttf", "DejaVuSans-Bold.ttf", "Helvetica.ttc", "arialbd.ttf"],
    "semibold": ["seguisb.ttf", "segoeuib.ttf", "DejaVuSans-Bold.ttf", "arialbd.ttf"],
    "regular": ["segoeui.ttf", "DejaVuSans.ttf", "Helvetica.ttc", "arial.ttf"],
    "mono": ["consola.ttf", "DejaVuSansMono.ttf", "Menlo.ttc", "cour.ttf"],
}


def load_font(kind: str, size: int) -> ImageFont.FreeTypeFont:
    for name in FONT_CANDIDATES[kind]:
        for directory in FONT_DIRS:
            path = os.path.join(directory, name)
            if os.path.exists(path):
                try:
                    return ImageFont.truetype(path, size)
                except OSError:
                    continue
    print(f"warning: no {kind} font found, falling back to PIL default", file=sys.stderr)
    return ImageFont.load_default(size)


def add_glow(
    base: Image.Image,
    centre: tuple[int, int],
    radius: tuple[int, int],
    colour: tuple[int, int, int],
    strength: float,
) -> Image.Image:
    """Composite a soft elliptical glow over the whole canvas.

    The falloff is drawn small, upscaled across the full canvas and then
    blurred, which keeps the gradient smooth and free of the banding a direct
    concentric-ellipse fill produces.
    """
    steps = 96
    small = Image.new("L", (steps * 2, steps * 2), 0)
    pen = ImageDraw.Draw(small)
    for step in range(steps, 0, -1):
        alpha = int(255 * strength * (step / steps) ** 2.6)
        pen.ellipse(
            (steps - step, steps - step, steps + step, steps + step),
            fill=alpha,
        )

    rx, ry = radius
    mask = Image.new("L", base.size, 0)
    resized = small.resize((rx * 2, ry * 2), Image.BICUBIC)
    mask.paste(resized, (centre[0] - rx, centre[1] - ry))
    mask = mask.filter(ImageFilter.GaussianBlur(48))

    layer = Image.new("RGBA", base.size, colour + (0,))
    layer.putalpha(mask)
    return Image.alpha_composite(base.convert("RGBA"), layer).convert("RGB")


def main() -> None:
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out_path = os.path.join(root, "public", "og.png")

    image = Image.new("RGB", (W, H), INK)

    # Engineering grid sits under the glow so the light reads as being in front.
    draw = ImageDraw.Draw(image)
    for x in range(0, W, 56):
        draw.line([(x, 0), (x, H)], fill=LINE, width=1)
    for y in range(0, H, 56):
        draw.line([(0, y), (W, y)], fill=LINE, width=1)

    image = add_glow(image, (330, 40), (620, 460), ACCENT, 0.30)
    image = add_glow(image, (1120, 620), (420, 320), SIGNAL, 0.09)
    draw = ImageDraw.Draw(image)

    # Frame.
    draw.rectangle([(0, 0), (W - 1, H - 1)], outline=LINE_STRONG, width=1)
    draw.rectangle([(0, 0), (W - 1, 5)], fill=ACCENT)

    pad = 84
    y = 92

    # Monogram tile.
    draw.rounded_rectangle([(pad, y), (pad + 64, y + 64)], radius=16, fill=PANEL, outline=LINE_STRONG)
    mono_font = load_font("mono", 28)
    draw.text((pad + 32, y + 32), MONOGRAM, font=mono_font, fill=ACCENT, anchor="mm")

    # Availability pill.
    pill_font = load_font("mono", 17)
    pill_text = "OPEN TO SENIOR BACKEND ROLES"
    pill_w = draw.textlength(pill_text, font=pill_font) + 54
    px = pad + 88
    draw.rounded_rectangle([(px, y + 16), (px + pill_w, y + 48)], radius=16, fill=PANEL, outline=LINE_STRONG)
    draw.ellipse([(px + 20, y + 28), (px + 30, y + 38)], fill=SIGNAL)
    draw.text((px + 40, y + 32), pill_text, font=pill_font, fill=FG_MUTED, anchor="lm")

    # Name.
    y = 226
    draw.text((pad, y), NAME, font=load_font("bold", 62), fill=FG, anchor="ls")

    # Title.
    y += 62
    draw.text((pad, y), TITLE, font=load_font("semibold", 38), fill=ACCENT, anchor="ls")

    # Tagline.
    y += 72
    draw.text((pad, y), TAGLINE, font=load_font("regular", 28), fill=FG_MUTED, anchor="ls")

    # Divider + stack strip.
    y = H - 118
    draw.line([(pad, y), (W - pad, y)], fill=LINE_STRONG, width=1)
    draw.text((pad, y + 42), STACK, font=load_font("mono", 22), fill=FG_SUBTLE, anchor="lm")

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    image.save(out_path, "PNG", optimize=True)
    print(f"wrote {out_path} ({os.path.getsize(out_path) // 1024} KB)")


if __name__ == "__main__":
    main()
