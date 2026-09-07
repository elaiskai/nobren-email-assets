from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
HERO_DIR = ASSETS / "hero"
TRANSITIONS_DIR = ASSETS / "transitions"
BRAND_DIR = ASSETS / "brand"

WIDTH = 1200
HERO_HEIGHT = 1560
SOLAR = (243, 239, 230)
CREAM = (229, 210, 172)
ICE = (220, 233, 232)
HORIZON = (175, 201, 206)
GRAPHITE = (26, 30, 34)
CHAMPAGNE = (197, 164, 107)
PINK = (243, 84, 130)


def font(path: str, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size, index=index)


def resize_to_width(image: Image.Image, width: int) -> Image.Image:
    return image.resize(
        (width, round(image.height * width / image.width)),
        Image.Resampling.LANCZOS,
    )


def centered(
    draw: ImageDraw.ImageDraw,
    text: str,
    y: int,
    face: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int],
    width: int = WIDTH,
) -> None:
    box = draw.textbbox((0, 0), text, font=face)
    draw.text(((width - (box[2] - box[0])) / 2, y), text, font=face, fill=fill)


def tracked(
    draw: ImageDraw.ImageDraw,
    text: str,
    center_x: int,
    y: int,
    face: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int],
    tracking: int,
) -> None:
    widths = [draw.textlength(character, font=face) for character in text]
    total = sum(widths) + tracking * max(0, len(text) - 1)
    x = center_x - total / 2
    for character, character_width in zip(text, widths):
        draw.text((x, y), character, font=face, fill=fill)
        x += character_width + tracking


def fade_layer(
    size: tuple[int, int],
    color: tuple[int, int, int],
    start_y: int,
    end_y: int,
    start_alpha: int,
    end_alpha: int,
) -> Image.Image:
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    span = max(1, end_y - start_y)
    for y in range(max(0, start_y), min(size[1], end_y + 1)):
        progress = (y - start_y) / span
        alpha = round(start_alpha + (end_alpha - start_alpha) * progress)
        draw.line((0, y, size[0], y), fill=(*color, alpha))
    return layer


def exact_bands(
    image: Image.Image,
    top: tuple[int, int, int],
    bottom: tuple[int, int, int],
    top_band: int = 32,
    bottom_band: int = 48,
) -> None:
    draw = ImageDraw.Draw(image)
    draw.rectangle((0, 0, image.width, top_band - 1), fill=top)
    draw.rectangle(
        (0, image.height - bottom_band, image.width, image.height),
        fill=bottom,
    )


def vertical_gradient(
    height: int,
    top: tuple[int, int, int],
    bottom: tuple[int, int, int],
) -> Image.Image:
    image = Image.new("RGB", (WIDTH, height), top)
    draw = ImageDraw.Draw(image)
    for y in range(height):
        p = y / max(1, height - 1)
        # Smoothstep avoids a synthetic-looking linear midpoint.
        p = p * p * (3 - 2 * p)
        color = tuple(round(top[i] + (bottom[i] - top[i]) * p) for i in range(3))
        draw.line((0, y, WIDTH, y), fill=color)
    return image.convert("RGBA")


def add_fine_grain(image: Image.Image, opacity: int = 8) -> Image.Image:
    random.seed(2109)
    noise = Image.new("RGBA", image.size, (0, 0, 0, 0))
    pixels = noise.load()
    for y in range(0, image.height, 3):
        for x in range(0, image.width, 3):
            value = random.randint(205, 255)
            pixels[x, y] = (value, value, value, opacity)
    noise = noise.filter(ImageFilter.GaussianBlur(0.45))
    return Image.alpha_composite(image, noise)


def build_hero() -> None:
    source = Image.open(HERO_DIR / "hero-integrated-generated.png").convert("RGB")
    canvas = source.resize((WIDTH, HERO_HEIGHT), Image.Resampling.LANCZOS).convert("RGBA")

    # Calm the upper light disc so the exact campaign copy remains legible.
    canvas = Image.alpha_composite(canvas, fade_layer(canvas.size, SOLAR, 0, 590, 122, 0))
    # Make the handoff to the following live ice-glass section exact.
    canvas = Image.alpha_composite(
        canvas,
        fade_layer(canvas.size, ICE, HERO_HEIGHT - 250, HERO_HEIGHT - 1, 0, 255),
    )

    draw = ImageDraw.Draw(canvas)
    sans_path = "/System/Library/Fonts/Avenir.ttc"
    serif_path = "/System/Library/Fonts/Supplemental/Didot.ttc"
    sans_small = font(sans_path, 19)
    sans_body = font(sans_path, 25)
    sans_button = font(sans_path, 23)
    serif_main = font(serif_path, 94, index=0)
    serif_italic = font(serif_path, 101, index=1)

    logo = resize_to_width(Image.open(BRAND_DIR / "logo.png").convert("RGBA"), 210)
    canvas.alpha_composite(logo, ((WIDTH - logo.width) // 2, 41))

    tracked(
        draw,
        "NOBREN / SCENT IN ORBIT",
        WIDTH // 2,
        125,
        sans_small,
        GRAPHITE,
        5,
    )
    centered(draw, "Nematoma", 166, serif_main, GRAPHITE)
    centered(draw, "trauka.", 251, serif_italic, GRAPHITE)
    centered(draw, "Kvapas, kuris pakeičia atstumą.", 357, sans_body, (72, 78, 80))

    button_w, button_h = 330, 64
    button_x = (WIDTH - button_w) // 2
    button_y = 411
    draw.rounded_rectangle(
        (button_x, button_y, button_x + button_w, button_y + button_h),
        radius=32,
        fill=GRAPHITE,
        outline=CHAMPAGNE,
        width=2,
    )
    label = "PAJUSTI TRAUKĄ"
    label_box = draw.textbbox((0, 0), label, font=sans_button)
    draw.text(
        (
            (WIDTH - (label_box[2] - label_box[0])) / 2,
            button_y + (button_h - (label_box[3] - label_box[1])) / 2 - label_box[1],
        ),
        label,
        font=sans_button,
        fill=SOLAR,
    )

    exact_bands(canvas, SOLAR, ICE)
    canvas.convert("RGB").save(
        HERO_DIR / "hero-final.jpg",
        quality=92,
        subsampling=0,
        optimize=True,
        progressive=True,
    )


def build_ice_to_solar() -> None:
    image = vertical_gradient(230, ICE, SOLAR)
    draw = ImageDraw.Draw(image, "RGBA")
    # A fading water-caustic horizon borrowed from the hero's material language.
    for x in range(-80, WIDTH + 100, 105):
        points = []
        for dx in range(0, 190, 8):
            y = 62 + 18 * math.sin((x + dx) / 55) + dx * 0.28
            points.append((x + dx, y))
        draw.line(points, fill=(*HORIZON, 55), width=4)
    image = image.filter(ImageFilter.GaussianBlur(0.55))
    exact_bands(image, ICE, SOLAR)
    image.convert("RGB").save(TRANSITIONS_DIR / "ice-to-solar.png", optimize=True)


def build_eclipse() -> None:
    height = 280
    image = vertical_gradient(height, SOLAR, GRAPHITE)
    glow = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow, "RGBA")
    draw.ellipse((-170, 24, WIDTH + 170, 590), fill=(*CREAM, 105))
    draw.ellipse((-122, 74, WIDTH + 122, 588), outline=(*CHAMPAGNE, 185), width=4)
    draw.arc((-45, 108, WIDTH + 45, 490), 196, 344, fill=(230, 236, 234, 180), width=5)
    glow = glow.filter(ImageFilter.GaussianBlur(4.5))
    image = Image.alpha_composite(image, glow)
    exact_bands(image, SOLAR, GRAPHITE)
    image.convert("RGB").save(TRANSITIONS_DIR / "solar-eclipse.png", optimize=True)


def build_graphite_to_ice() -> None:
    height = 270
    image = vertical_gradient(height, GRAPHITE, ICE)
    glow = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow, "RGBA")
    draw.arc((-90, -235, WIDTH + 90, 355), 14, 166, fill=(*CHAMPAGNE, 185), width=5)
    draw.arc((-180, -205, WIDTH + 180, 400), 17, 163, fill=(222, 239, 238, 115), width=10)
    draw.rectangle((WIDTH // 2 - 60, 175, WIDTH // 2 + 60, 178), fill=(*PINK, 165))
    glow = glow.filter(ImageFilter.GaussianBlur(2.2))
    image = Image.alpha_composite(image, glow)
    exact_bands(image, GRAPHITE, ICE)
    image.convert("RGB").save(TRANSITIONS_DIR / "graphite-to-ice.png", optimize=True)


def build_closing() -> None:
    height = 270
    image = vertical_gradient(height, ICE, GRAPHITE)
    glow = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow, "RGBA")
    draw.ellipse((300, -330, 900, 250), fill=(*SOLAR, 80), outline=(*CHAMPAGNE, 170), width=4)
    draw.arc((190, -250, 1010, 335), 18, 162, fill=(230, 242, 241, 135), width=6)
    glow = glow.filter(ImageFilter.GaussianBlur(3.2))
    image = Image.alpha_composite(image, glow)
    exact_bands(image, ICE, GRAPHITE)
    image.convert("RGB").save(TRANSITIONS_DIR / "ice-to-graphite.png", optimize=True)


if __name__ == "__main__":
    HERO_DIR.mkdir(parents=True, exist_ok=True)
    TRANSITIONS_DIR.mkdir(parents=True, exist_ok=True)
    build_hero()
    build_ice_to_solar()
    build_eclipse()
    build_graphite_to_ice()
    build_closing()
