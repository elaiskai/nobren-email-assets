from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
HERO_DIR = ASSETS / "hero"
TRANSITIONS_DIR = ASSETS / "transitions"
PRODUCTS_DIR = ASSETS / "products"
BRAND_DIR = ASSETS / "brand"

WIDTH = 1200
HEIGHT = 1550
DARK_OLIVE = (26, 33, 28)
CREAM = (233, 224, 211)
BRASS = (190, 155, 93)
INK = (24, 27, 24)


def cover_crop(image: Image.Image, size: tuple[int, int], y_bias: float = 0.45) -> Image.Image:
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


def remove_white_background(image: Image.Image) -> Image.Image:
    rgb = image.convert("RGB")
    alpha = Image.new("L", rgb.size)
    source = rgb.load()
    mask = alpha.load()
    for y in range(rgb.height):
        for x in range(rgb.width):
            r, g, b = source[x, y]
            distance = max(255 - r, 255 - g, 255 - b)
            saturation = max(r, g, b) - min(r, g, b)
            strength = max(distance, saturation * 0.9)
            mask[x, y] = max(0, min(255, round((strength - 5) * 5.2)))

    alpha = alpha.filter(ImageFilter.GaussianBlur(0.7))
    rgba = rgb.convert("RGBA")
    rgba.putalpha(alpha)
    bbox = alpha.getbbox()
    if not bbox:
        return rgba
    return rgba.crop(bbox)


def resize_to_width(image: Image.Image, width: int) -> Image.Image:
    height = round(image.height * width / image.width)
    return image.resize((width, height), Image.Resampling.LANCZOS)


def paste_with_shadow(
    canvas: Image.Image,
    cutout: Image.Image,
    x: int,
    bottom: int,
    shadow_blur: int = 22,
) -> None:
    y = bottom - cutout.height
    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    shadow_shape = Image.new("RGBA", cutout.size, (8, 7, 5, 0))
    shadow_shape.putalpha(cutout.getchannel("A").point(lambda p: round(p * 0.42)))
    shadow.alpha_composite(shadow_shape, (x + 13, y + 18))
    shadow = shadow.filter(ImageFilter.GaussianBlur(shadow_blur))
    canvas.alpha_composite(shadow)
    canvas.alpha_composite(cutout, (x, y))


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
    widths = [draw.textlength(char, font=font) for char in text]
    total = sum(widths) + tracking * max(0, len(text) - 1)
    x = center_x - total / 2
    for char, char_width in zip(text, widths):
        draw.text((x, y), char, font=font, fill=fill)
        x += char_width + tracking


def exact_edge_blend(image: Image.Image) -> Image.Image:
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    pixels = overlay.load()

    for y in range(0, 100):
        alpha = 255 if y < 44 else round(255 * (1 - (y - 44) / 56))
        alpha = max(0, min(255, alpha))
        for x in range(image.width):
            pixels[x, y] = (*DARK_OLIVE, alpha)

    start = image.height - 230
    for y in range(start, image.height):
        position = (y - start) / (image.height - start - 1)
        alpha = 255 if y >= image.height - 62 else round(255 * (position ** 1.45))
        for x in range(image.width):
            pixels[x, y] = (*CREAM, alpha)

    return Image.alpha_composite(image.convert("RGBA"), overlay)


def build_hero() -> None:
    background = Image.open(HERO_DIR / "hero-background-generated.png").convert("RGB")
    canvas = cover_crop(background, (WIDTH, HEIGHT), y_bias=0.34).convert("RGBA")

    # Keep the art direction intact while ensuring exact HTML boundary colors.
    canvas = exact_edge_blend(canvas)

    selected = [
        ("e7.jpg", 370, 48, 1338),
        ("k13.jpg", 405, 398, 1320),
        ("n11.jpg", 360, 805, 1342),
    ]
    for filename, target_width, x, bottom in selected:
        product = Image.open(PRODUCTS_DIR / filename)
        cutout = resize_to_width(remove_white_background(product), target_width)
        paste_with_shadow(canvas, cutout, x, bottom)

    # Subtle vignette binds the exact packshots into the generated studio scene.
    vignette = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    vg = ImageDraw.Draw(vignette)
    vg.rectangle((0, 0, WIDTH, 725), fill=(7, 12, 9, 36))
    canvas = Image.alpha_composite(canvas, vignette)

    draw = ImageDraw.Draw(canvas)
    sans_path = "/System/Library/Fonts/Avenir.ttc"
    serif_path = "/System/Library/Fonts/Supplemental/Didot.ttc"
    sans_small = load_font(sans_path, 24)
    sans_button = load_font(sans_path, 24)
    serif = load_font(serif_path, 98, index=0)

    logo = Image.open(BRAND_DIR / "logo-white.png").convert("RGBA")
    logo = resize_to_width(logo, 270)
    canvas.alpha_composite(logo, ((WIDTH - logo.width) // 2, 88))

    draw_tracking_text(
        draw,
        "NOBREN TEXTURE EDIT",
        WIDTH // 2,
        222,
        sans_small,
        (216, 198, 163),
        tracking=7,
    )

    headline = "Jei kvapą galėtum\npaliesti."
    headline_box = draw.multiline_textbbox(
        (0, 0), headline, font=serif, spacing=-5, align="center"
    )
    headline_width = headline_box[2] - headline_box[0]
    draw.multiline_text(
        ((WIDTH - headline_width) / 2, 276),
        headline,
        font=serif,
        fill=(247, 241, 231),
        spacing=-5,
        align="center",
    )

    button_w, button_h = 390, 78
    button_x = (WIDTH - button_w) // 2
    button_y = 525
    draw.rounded_rectangle(
        (button_x, button_y, button_x + button_w, button_y + button_h),
        radius=2,
        fill=(21, 25, 22),
        outline=BRASS,
        width=2,
    )
    button_text = "ATRASK SAVO TEKSTŪRĄ"
    text_box = draw.textbbox((0, 0), button_text, font=sans_button)
    text_w = text_box[2] - text_box[0]
    text_h = text_box[3] - text_box[1]
    draw.text(
        ((WIDTH - text_w) / 2, button_y + (button_h - text_h) / 2 - text_box[1]),
        button_text,
        font=sans_button,
        fill=(246, 239, 228),
    )

    # Exact strips are reapplied last so antialiasing or compositing cannot alter them.
    draw.rectangle((0, 0, WIDTH, 43), fill=DARK_OLIVE)
    draw.rectangle((0, HEIGHT - 61, WIDTH, HEIGHT), fill=CREAM)
    canvas.convert("RGB").save(HERO_DIR / "hero-final.png", optimize=True)


def build_transition_ribbon() -> None:
    source = Image.open(HERO_DIR / "hero-background-generated.png").convert("RGB")
    crop = source.crop((0, round(source.height * 0.55), source.width, round(source.height * 0.84)))
    ribbon = cover_crop(crop, (WIDTH, 210), y_bias=0.5).convert("RGBA")
    overlay = Image.new("RGBA", ribbon.size, (0, 0, 0, 0))
    pixels = overlay.load()
    top = (34, 38, 34)
    for y in range(ribbon.height):
        if y < 48:
            alpha_top = 255 if y < 18 else round(255 * (1 - (y - 18) / 30))
            color = top
            alpha = max(0, min(255, alpha_top))
        elif y > ribbon.height - 88:
            position = (y - (ribbon.height - 88)) / 87
            color = CREAM
            alpha = 255 if y >= ribbon.height - 30 else round(255 * position)
        else:
            color = (0, 0, 0)
            alpha = 0
        for x in range(ribbon.width):
            pixels[x, y] = (*color, alpha)
    ribbon = Image.alpha_composite(ribbon, overlay)
    out = ImageDraw.Draw(ribbon)
    out.rectangle((0, 0, WIDTH, 17), fill=top)
    out.rectangle((0, ribbon.height - 29, WIDTH, ribbon.height), fill=CREAM)
    ribbon.convert("RGB").save(TRANSITIONS_DIR / "texture-ribbon.png", optimize=True)


if __name__ == "__main__":
    HERO_DIR.mkdir(parents=True, exist_ok=True)
    TRANSITIONS_DIR.mkdir(parents=True, exist_ok=True)
    build_hero()
    build_transition_ribbon()

