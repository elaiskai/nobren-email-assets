from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
HERO_DIR = ASSETS / "hero"
TRANSITIONS_DIR = ASSETS / "transitions"
BRAND_DIR = ASSETS / "brand"

WIDTH = 1200
HERO_HEIGHT = 1650
MUSEUM_BLACK = (21, 23, 25)
GRAPHITE = (36, 40, 43)
GALLERY = (241, 238, 231)
CHROME = (166, 173, 176)
SPOTLIGHT = (199, 165, 107)
PINK = (243, 84, 130)


def cover_crop(image: Image.Image, size: tuple[int, int], y_bias: float = 0.5) -> Image.Image:
    target_w, target_h = size
    scale = max(target_w / image.width, target_h / image.height)
    resized = image.resize(
        (round(image.width * scale), round(image.height * scale)),
        Image.Resampling.LANCZOS,
    )
    left = max(0, (resized.width - target_w) // 2)
    excess_y = max(0, resized.height - target_h)
    top = round(excess_y * y_bias)
    return resized.crop((left, top, left + target_w, top + target_h))


def resize_to_width(image: Image.Image, width: int) -> Image.Image:
    return image.resize(
        (width, round(image.height * width / image.width)),
        Image.Resampling.LANCZOS,
    )


def load_font(path: str, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size, index=index)


def draw_tracking_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    center_x: int,
    y: int,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int],
    tracking: int,
) -> None:
    widths = [draw.textlength(character, font=font) for character in text]
    total = sum(widths) + tracking * max(0, len(text) - 1)
    x = center_x - total / 2
    for character, character_width in zip(text, widths):
        draw.text((x, y), character, font=font, fill=fill)
        x += character_width + tracking


def vertical_color_fade(
    size: tuple[int, int],
    color: tuple[int, int, int],
    start_y: int,
    end_y: int,
    max_alpha: int = 255,
    reverse: bool = False,
) -> Image.Image:
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    pixels = layer.load()
    span = max(1, end_y - start_y)
    for y in range(max(0, start_y), min(size[1], end_y + 1)):
        position = (y - start_y) / span
        if reverse:
            position = 1 - position
        alpha = round(max_alpha * max(0.0, min(1.0, position)))
        for x in range(size[0]):
            pixels[x, y] = (*color, alpha)
    return layer


def build_hero() -> None:
    # The gallery, products, boxes, glass, shadows and reflections originate
    # from one integrated photographic exposure. Only exact brand typography
    # and deterministic edge bands are added here.
    source = Image.open(HERO_DIR / "hero-integrated-generated.png").convert("RGB")
    canvas = cover_crop(source, (WIDTH, HERO_HEIGHT), y_bias=0.45).convert("RGBA")

    # Protect the baked headline while keeping the gallery lighting intact.
    veil = Image.new("RGBA", canvas.size, (11, 13, 15, 0))
    veil_pixels = veil.load()
    for y in range(0, 630):
        alpha = round(124 * (1 - y / 630) ** 0.8)
        for x in range(WIDTH):
            veil_pixels[x, y] = (11, 13, 15, alpha)
    canvas = Image.alpha_composite(canvas, veil)

    # Feather the polished gallery floor into the live gallery-wall section.
    canvas = Image.alpha_composite(
        canvas,
        vertical_color_fade(canvas.size, GALLERY, HERO_HEIGHT - 270, HERO_HEIGHT - 1),
    )

    draw = ImageDraw.Draw(canvas)
    sans_path = "/System/Library/Fonts/Avenir.ttc"
    serif_path = "/System/Library/Fonts/Supplemental/Didot.ttc"
    sans_small = load_font(sans_path, 22)
    sans_button = load_font(sans_path, 34)
    serif = load_font(serif_path, 84, index=0)

    logo = Image.open(BRAND_DIR / "logo-white.png").convert("RGBA")
    logo = resize_to_width(logo, 250)
    canvas.alpha_composite(logo, ((WIDTH - logo.width) // 2, 54))

    draw_tracking_text(
        draw,
        "NOBREN PRIVATE VIEWING · AFTER HOURS",
        WIDTH // 2,
        169,
        sans_small,
        (214, 196, 165),
        tracking=5,
    )

    headline = "Galerija užsidarė.\nKvapai liko."
    box = draw.multiline_textbbox((0, 0), headline, font=serif, spacing=-5, align="center")
    text_width = box[2] - box[0]
    draw.multiline_text(
        ((WIDTH - text_width) / 2, 220),
        headline,
        font=serif,
        fill=(249, 246, 240),
        spacing=-5,
        align="center",
    )

    button_width, button_height = 565, 82
    button_x = (WIDTH - button_width) // 2
    button_y = 432
    draw.rectangle(
        (button_x, button_y, button_x + button_width, button_y + button_height),
        fill=(23, 25, 27),
        outline=CHROME,
        width=2,
    )
    button_text = "ĮEIK Į PRIVAČIĄ PERŽIŪRĄ"
    button_box = draw.textbbox((0, 0), button_text, font=sans_button)
    button_text_width = button_box[2] - button_box[0]
    button_text_height = button_box[3] - button_box[1]
    draw.text(
        (
            (WIDTH - button_text_width) / 2,
            button_y + (button_height - button_text_height) / 2 - button_box[1],
        ),
        button_text,
        font=sans_button,
        fill=(246, 242, 235),
    )

    # One restrained NoBren direction mark, mechanically exact.
    draw.rectangle((WIDTH // 2 - 42, 548, WIDTH // 2 + 42, 552), fill=PINK)

    # Exact bands are reapplied last so antialiasing cannot shift boundary RGB.
    draw.rectangle((0, 0, WIDTH, 31), fill=MUSEUM_BLACK)
    draw.rectangle((0, HERO_HEIGHT - 47, WIDTH, HERO_HEIGHT), fill=GALLERY)
    canvas.convert("RGB").save(HERO_DIR / "hero-final.png", optimize=True)


def build_closing_raster() -> None:
    source = Image.open(HERO_DIR / "hero-integrated-generated.png").convert("RGB")
    # Use only the quiet gallery architecture; no product crop in the closing.
    crop = source.crop((0, 0, source.width, round(source.height * 0.43)))
    closing = cover_crop(crop, (WIDTH, 320), y_bias=0.35).convert("RGBA")
    closing = closing.filter(ImageFilter.GaussianBlur(0.3))
    closing = Image.alpha_composite(
        closing,
        vertical_color_fade(closing.size, GRAPHITE, 0, 125, max_alpha=255, reverse=True),
    )
    closing = Image.alpha_composite(
        closing,
        vertical_color_fade(closing.size, MUSEUM_BLACK, 132, 319, max_alpha=255),
    )
    draw = ImageDraw.Draw(closing)
    draw.rectangle((0, 0, WIDTH, 47), fill=GRAPHITE)
    draw.rectangle((0, closing.height - 47, WIDTH, closing.height), fill=MUSEUM_BLACK)
    draw.rectangle((WIDTH // 2 - 58, 125, WIDTH // 2 + 58, 128), fill=PINK)
    closing.convert("RGB").save(TRANSITIONS_DIR / "gallery-closing.png", optimize=True)


if __name__ == "__main__":
    HERO_DIR.mkdir(parents=True, exist_ok=True)
    TRANSITIONS_DIR.mkdir(parents=True, exist_ok=True)
    build_hero()
    build_closing_raster()
