from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
HERO_DIR = ASSETS / "hero"
TRANSITIONS_DIR = ASSETS / "transitions"
BRAND_DIR = ASSETS / "brand"

WIDTH = 1200
HERO_HEIGHT = 1600
MIDNIGHT = (16, 18, 22)
DEEP = (23, 25, 29)
WALNUT = (74, 48, 38)
PARCHMENT = (238, 231, 219)
CHAMPAGNE = (196, 166, 106)
SMOKE = (139, 144, 148)
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


def font(path: str, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size=size, index=index)


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


def add_exact_bands(image: Image.Image, top: tuple[int, int, int], bottom: tuple[int, int, int]) -> None:
    draw = ImageDraw.Draw(image)
    draw.rectangle((0, 0, image.width, 31), fill=top)
    draw.rectangle((0, image.height - 47, image.width, image.height), fill=bottom)


def build_hero() -> None:
    source = Image.open(HERO_DIR / "hero-integrated-generated.png").convert("RGB")
    canvas = cover_crop(source, (WIDTH, HERO_HEIGHT), y_bias=0.5).convert("RGBA")

    # Quiet the acoustic wall only where exact campaign typography is added.
    canvas = Image.alpha_composite(
        canvas,
        fade_layer(canvas.size, MIDNIGHT, 0, 560, 205, 0),
    )
    # Let the lacquered console dissolve into the live walnut manifesto field.
    canvas = Image.alpha_composite(
        canvas,
        fade_layer(canvas.size, WALNUT, HERO_HEIGHT - 285, HERO_HEIGHT - 1, 0, 255),
    )

    draw = ImageDraw.Draw(canvas)
    sans_path = "/System/Library/Fonts/Avenir.ttc"
    serif_path = "/System/Library/Fonts/Supplemental/Didot.ttc"
    sans_small = font(sans_path, 21)
    sans_button = font(sans_path, 28)
    serif_main = font(serif_path, 82, index=0)
    serif_italic = font(serif_path, 39, index=1)

    logo = resize_to_width(Image.open(BRAND_DIR / "logo-white.png").convert("RGBA"), 220)
    canvas.alpha_composite(logo, ((WIDTH - logo.width) // 2, 36))

    tracked(
        draw,
        "NOBREN LISTENING SESSION / 06 TRACKS",
        WIDTH // 2,
        135,
        sans_small,
        CHAMPAGNE,
        5,
    )

    headline = "Jei kvapas\nturėtų garsą."
    box = draw.multiline_textbbox((0, 0), headline, font=serif_main, spacing=-8, align="center")
    draw.multiline_text(
        ((WIDTH - (box[2] - box[0])) / 2, 179),
        headline,
        font=serif_main,
        fill=(247, 243, 235),
        spacing=-8,
        align="center",
    )

    subtitle = "Kuris skambėtų kaip tu?"
    subtitle_box = draw.textbbox((0, 0), subtitle, font=serif_italic)
    draw.text(
        ((WIDTH - (subtitle_box[2] - subtitle_box[0])) / 2, 350),
        subtitle,
        font=serif_italic,
        fill=(222, 214, 201),
    )

    button_w, button_h = 420, 66
    button_x = (WIDTH - button_w) // 2
    button_y = 414
    draw.rectangle(
        (button_x, button_y, button_x + button_w, button_y + button_h),
        fill=(16, 18, 22),
        outline=CHAMPAGNE,
        width=2,
    )
    label = "RASTI ATSAKYMĄ"
    label_box = draw.textbbox((0, 0), label, font=sans_button)
    draw.text(
        (
            (WIDTH - (label_box[2] - label_box[0])) / 2,
            button_y + (button_h - (label_box[3] - label_box[1])) / 2 - label_box[1],
        ),
        label,
        font=sans_button,
        fill=(247, 243, 235),
    )

    add_exact_bands(canvas, MIDNIGHT, WALNUT)
    canvas.convert("RGB").save(
        HERO_DIR / "hero-final.jpg",
        quality=90,
        subsampling=0,
        optimize=True,
        progressive=True,
    )


def build_walnut_to_parchment(source: Image.Image) -> None:
    crop = source.crop((0, 0, source.width, round(source.height * 0.42)))
    image = cover_crop(crop, (WIDTH, 250), y_bias=0.35).convert("RGBA")
    image = image.filter(ImageFilter.GaussianBlur(0.7))
    image = Image.alpha_composite(image, fade_layer(image.size, WALNUT, 0, 135, 255, 0))
    image = Image.alpha_composite(image, fade_layer(image.size, PARCHMENT, 80, 249, 0, 255))
    add_exact_bands(image, WALNUT, PARCHMENT)
    image.convert("RGB").save(TRANSITIONS_DIR / "walnut-to-parchment.png", optimize=True)


def build_parchment_to_deep(source: Image.Image) -> None:
    crop = source.crop((0, round(source.height * 0.65), source.width, source.height))
    image = cover_crop(crop, (WIDTH, 230), y_bias=0.5).convert("RGBA")
    image = image.filter(ImageFilter.GaussianBlur(0.5))
    image = Image.alpha_composite(image, fade_layer(image.size, PARCHMENT, 0, 115, 255, 0))
    image = Image.alpha_composite(image, fade_layer(image.size, DEEP, 75, 229, 0, 255))
    draw = ImageDraw.Draw(image)
    draw.rectangle((WIDTH // 2 - 64, 125, WIDTH // 2 + 64, 128), fill=PINK)
    add_exact_bands(image, PARCHMENT, DEEP)
    image.convert("RGB").save(TRANSITIONS_DIR / "parchment-to-deep.png", optimize=True)


def build_closing(source: Image.Image) -> None:
    crop = source.crop((0, 0, source.width, round(source.height * 0.48)))
    image = cover_crop(crop, (WIDTH, 270), y_bias=0.25).convert("RGBA")
    image = image.filter(ImageFilter.GaussianBlur(0.8))
    image = Image.alpha_composite(image, fade_layer(image.size, DEEP, 0, 130, 255, 0))
    image = Image.alpha_composite(image, fade_layer(image.size, MIDNIGHT, 95, 269, 0, 255))
    draw = ImageDraw.Draw(image)
    draw.rectangle((WIDTH // 2 - 52, 137, WIDTH // 2 + 52, 140), fill=PINK)
    add_exact_bands(image, DEEP, MIDNIGHT)
    image.convert("RGB").save(TRANSITIONS_DIR / "listening-room-closing.png", optimize=True)


if __name__ == "__main__":
    HERO_DIR.mkdir(parents=True, exist_ok=True)
    TRANSITIONS_DIR.mkdir(parents=True, exist_ok=True)
    source_image = Image.open(HERO_DIR / "hero-integrated-generated.png").convert("RGB")
    build_hero()
    build_walnut_to_parchment(source_image)
    build_parchment_to_deep(source_image)
    build_closing(source_image)
