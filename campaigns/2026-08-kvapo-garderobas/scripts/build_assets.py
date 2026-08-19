from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
HERO_DIR = ASSETS / "hero"
TRANSITIONS_DIR = ASSETS / "transitions"
BRAND_DIR = ASSETS / "brand"

WIDTH = 1200
HEIGHT = 1550
INK = (23, 23, 23)
OXBLOOD = (74, 31, 42)
BONE = (242, 236, 228)
BRASS = (182, 142, 82)


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


def gradient_overlay(
    size: tuple[int, int],
    color: tuple[int, int, int],
    start_y: int,
    end_y: int,
    reverse: bool = False,
    max_alpha: int = 255,
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
    # The wardrobe, products, boxes, reflections and contact shadows come from
    # one generated photographic exposure. Only exact brand-safe type is added.
    source = Image.open(HERO_DIR / "hero-integrated-generated.png").convert("RGB")
    canvas = cover_crop(source, (WIDTH, HEIGHT), y_bias=0.5).convert("RGBA")

    # A restrained top veil keeps the baked headline readable without making the
    # products look separately composited.
    top_veil = Image.new("RGBA", canvas.size, (9, 7, 7, 0))
    veil_pixels = top_veil.load()
    for y in range(0, 565):
        alpha = round(118 * (1 - y / 565) ** 0.75)
        for x in range(WIDTH):
            veil_pixels[x, y] = (9, 7, 7, alpha)
    canvas = Image.alpha_composite(canvas, top_veil)

    # Feather the photographic shelf into the HTML bone background.
    canvas = Image.alpha_composite(
        canvas,
        gradient_overlay(canvas.size, BONE, HEIGHT - 238, HEIGHT - 1, max_alpha=255),
    )

    draw = ImageDraw.Draw(canvas)
    sans_path = "/System/Library/Fonts/Avenir.ttc"
    serif_path = "/System/Library/Fonts/Supplemental/Didot.ttc"
    sans_small = load_font(sans_path, 24)
    sans_button = load_font(sans_path, 32)
    serif = load_font(serif_path, 74, index=0)

    logo = Image.open(BRAND_DIR / "logo-white.png").convert("RGBA")
    logo = resize_to_width(logo, 250)
    canvas.alpha_composite(logo, ((WIDTH - logo.width) // 2, 54))

    draw_tracking_text(
        draw,
        "NOBREN SCENT WARDROBE",
        WIDTH // 2,
        167,
        sans_small,
        (219, 194, 151),
        tracking=6,
    )

    headline = "Paskutinė tavo derinio\ndetalė — nematoma."
    box = draw.multiline_textbbox((0, 0), headline, font=serif, spacing=-3, align="center")
    text_width = box[2] - box[0]
    draw.multiline_text(
        ((WIDTH - text_width) / 2, 214),
        headline,
        font=serif,
        fill=(249, 244, 237),
        spacing=-3,
        align="center",
    )

    button_width, button_height = 470, 80
    button_x = (WIDTH - button_width) // 2
    button_y = 395
    draw.rounded_rectangle(
        (button_x, button_y, button_x + button_width, button_y + button_height),
        radius=2,
        fill=(20, 17, 17),
        outline=BRASS,
        width=2,
    )
    button_text = "ATVERK GARDEROBĄ"
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
        fill=(247, 241, 232),
    )

    # Exact full-width edge strips are painted last for deterministic seams.
    draw.rectangle((0, 0, WIDTH, 39), fill=INK)
    draw.rectangle((0, HEIGHT - 47, WIDTH, HEIGHT), fill=BONE)
    canvas.convert("RGB").save(HERO_DIR / "hero-final.png", optimize=True)


def build_wardrobe_ribbon() -> None:
    source = Image.open(HERO_DIR / "hero-integrated-generated.png").convert("RGB")
    # Pull lacquer, mirror and brass from the exact same wardrobe scene.
    crop = source.crop((round(source.width * 0.53), 0, source.width, round(source.height * 0.46)))
    ribbon = cover_crop(crop, (WIDTH, 250), y_bias=0.28).convert("RGBA")
    ribbon = Image.alpha_composite(
        ribbon,
        gradient_overlay(ribbon.size, OXBLOOD, 0, 105, reverse=True, max_alpha=255),
    )
    ribbon = Image.alpha_composite(
        ribbon,
        gradient_overlay(ribbon.size, BONE, 112, 249, max_alpha=255),
    )
    draw = ImageDraw.Draw(ribbon)
    draw.rectangle((0, 0, WIDTH, 35), fill=OXBLOOD)
    draw.rectangle((0, ribbon.height - 39, WIDTH, ribbon.height), fill=BONE)
    ribbon.convert("RGB").save(TRANSITIONS_DIR / "wardrobe-ribbon.png", optimize=True)


def build_closing_raster() -> None:
    source = Image.open(HERO_DIR / "hero-integrated-generated.png").convert("RGB")
    crop = source.crop((round(source.width * 0.47), 0, source.width, round(source.height * 0.70)))
    closing = cover_crop(crop, (WIDTH, 320), y_bias=0.08).convert("RGBA")
    closing = closing.filter(ImageFilter.GaussianBlur(0.35))
    closing = Image.alpha_composite(
        closing,
        gradient_overlay(closing.size, BONE, 0, 123, reverse=True, max_alpha=255),
    )
    closing = Image.alpha_composite(
        closing,
        gradient_overlay(closing.size, INK, 140, 319, max_alpha=255),
    )
    draw = ImageDraw.Draw(closing)
    draw.rectangle((0, 0, WIDTH, 39), fill=BONE)
    draw.rectangle((0, closing.height - 49, WIDTH, closing.height), fill=INK)
    # A fine brass wardrobe seam keeps the transition intentional.
    draw.rectangle((WIDTH // 2 - 1, 96, WIDTH // 2 + 1, 260), fill=BRASS)
    closing.convert("RGB").save(TRANSITIONS_DIR / "closing-raster.png", optimize=True)


if __name__ == "__main__":
    HERO_DIR.mkdir(parents=True, exist_ok=True)
    TRANSITIONS_DIR.mkdir(parents=True, exist_ok=True)
    build_hero()
    build_wardrobe_ribbon()
    build_closing_raster()
