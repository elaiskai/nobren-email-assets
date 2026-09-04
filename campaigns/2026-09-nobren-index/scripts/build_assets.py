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
IVORY = (241, 235, 224)
OXBLOOD = (73, 26, 36)
BLACK = (23, 23, 25)
BRASS = (183, 154, 98)
STEEL = (168, 165, 160)
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


def centered(draw: ImageDraw.ImageDraw, text: str, y: int, face: ImageFont.FreeTypeFont, fill: tuple[int, int, int]) -> None:
    box = draw.textbbox((0, 0), text, font=face)
    draw.text(((WIDTH - (box[2] - box[0])) / 2, y), text, font=face, fill=fill)


def build_hero() -> None:
    source = Image.open(HERO_DIR / "hero-integrated-generated.png").convert("RGB")
    canvas = cover_crop(source, (WIDTH, HERO_HEIGHT), y_bias=0.5).convert("RGBA")

    # Quiet the paper field behind exact campaign typography.
    canvas = Image.alpha_composite(canvas, fade_layer(canvas.size, IVORY, 0, 620, 155, 0))
    # Dissolve the archive into the live oxblood introduction below.
    canvas = Image.alpha_composite(
        canvas,
        fade_layer(canvas.size, OXBLOOD, HERO_HEIGHT - 285, HERO_HEIGHT - 1, 0, 255),
    )

    draw = ImageDraw.Draw(canvas)
    sans_path = "/System/Library/Fonts/Avenir.ttc"
    serif_path = "/System/Library/Fonts/Supplemental/Didot.ttc"
    sans_small = font(sans_path, 20)
    sans_body = font(sans_path, 26)
    sans_button = font(sans_path, 25)
    serif_main = font(serif_path, 86, index=0)
    serif_italic = font(serif_path, 76, index=1)

    logo = resize_to_width(Image.open(BRAND_DIR / "logo.png").convert("RGBA"), 224)
    canvas.alpha_composite(logo, ((WIDTH - logo.width) // 2, 38))

    tracked(
        draw,
        "THE NOBREN INDEX / RECORDS 001—006",
        WIDTH // 2,
        139,
        sans_small,
        OXBLOOD,
        4,
    )
    centered(draw, "Ne vardas.", 187, serif_main, BLACK)
    centered(draw, "Kodas. Įspūdis.", 277, serif_italic, OXBLOOD)
    centered(
        draw,
        "Tavo kvapas turi numerį. Charakterį suteiki tu.",
        371,
        sans_body,
        (73, 68, 63),
    )

    button_w, button_h = 378, 66
    button_x = (WIDTH - button_w) // 2
    button_y = 432
    draw.rectangle(
        (button_x, button_y, button_x + button_w, button_y + button_h),
        fill=OXBLOOD,
        outline=BRASS,
        width=2,
    )
    label = "ATVERTI INDEKSĄ"
    label_box = draw.textbbox((0, 0), label, font=sans_button)
    draw.text(
        (
            (WIDTH - (label_box[2] - label_box[0])) / 2,
            button_y + (button_h - (label_box[3] - label_box[1])) / 2 - label_box[1],
        ),
        label,
        font=sans_button,
        fill=IVORY,
    )

    add_exact_bands(canvas, IVORY, OXBLOOD)
    canvas.convert("RGB").save(
        HERO_DIR / "hero-final.jpg",
        quality=91,
        subsampling=0,
        optimize=True,
        progressive=True,
    )


def build_oxblood_to_ivory(source: Image.Image) -> None:
    crop = source.crop((0, round(source.height * 0.46), source.width, source.height))
    image = cover_crop(crop, (WIDTH, 250), y_bias=0.4).convert("RGBA")
    image = image.filter(ImageFilter.GaussianBlur(0.65))
    image = Image.alpha_composite(image, fade_layer(image.size, OXBLOOD, 0, 135, 255, 0))
    image = Image.alpha_composite(image, fade_layer(image.size, IVORY, 78, 249, 0, 255))
    add_exact_bands(image, OXBLOOD, IVORY)
    image.convert("RGB").save(TRANSITIONS_DIR / "oxblood-to-ivory.png", optimize=True)


def build_ivory_to_oxblood(source: Image.Image) -> None:
    crop = source.crop((0, round(source.height * 0.36), source.width, round(source.height * 0.88)))
    image = cover_crop(crop, (WIDTH, 230), y_bias=0.52).convert("RGBA")
    image = image.filter(ImageFilter.GaussianBlur(0.55))
    image = Image.alpha_composite(image, fade_layer(image.size, IVORY, 0, 115, 255, 0))
    image = Image.alpha_composite(image, fade_layer(image.size, OXBLOOD, 72, 229, 0, 255))
    draw = ImageDraw.Draw(image)
    draw.rectangle((WIDTH // 2 - 60, 125, WIDTH // 2 + 60, 128), fill=PINK)
    add_exact_bands(image, IVORY, OXBLOOD)
    image.convert("RGB").save(TRANSITIONS_DIR / "ivory-to-oxblood.png", optimize=True)


def build_closing(source: Image.Image) -> None:
    crop = source.crop((0, round(source.height * 0.48), source.width, source.height))
    image = cover_crop(crop, (WIDTH, 270), y_bias=0.7).convert("RGBA")
    image = image.filter(ImageFilter.GaussianBlur(0.75))
    image = Image.alpha_composite(image, fade_layer(image.size, OXBLOOD, 0, 130, 255, 0))
    image = Image.alpha_composite(image, fade_layer(image.size, BLACK, 90, 269, 0, 255))
    draw = ImageDraw.Draw(image)
    draw.rectangle((WIDTH // 2 - 52, 138, WIDTH // 2 + 52, 141), fill=PINK)
    add_exact_bands(image, OXBLOOD, BLACK)
    image.convert("RGB").save(TRANSITIONS_DIR / "archive-closing.png", optimize=True)


if __name__ == "__main__":
    HERO_DIR.mkdir(parents=True, exist_ok=True)
    TRANSITIONS_DIR.mkdir(parents=True, exist_ok=True)
    source_image = Image.open(HERO_DIR / "hero-integrated-generated.png").convert("RGB")
    build_hero()
    build_oxblood_to_ivory(source_image)
    build_ivory_to_oxblood(source_image)
    build_closing(source_image)
