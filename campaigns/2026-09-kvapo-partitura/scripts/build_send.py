#!/usr/bin/env python3
"""Build a compact Klaviyo HTML-block fragment with immutable CDN assets."""

from __future__ import annotations

import argparse
import re
from pathlib import Path


CAMPAIGN = Path(__file__).resolve().parent.parent
REPOSITORY = "elaiskai/nobren-email-assets"
REMOTE_DIRECTORY = "campaigns/2026-09-kvapo-partitura"


def compact(fragment: str) -> str:
    fragment = re.sub(
        r"<style>(.*?)</style>",
        lambda match: "<style>"
        + re.sub(r"\s+", " ", match.group(1)).strip()
        + "</style>",
        fragment,
        flags=re.DOTALL,
    )
    fragment = re.sub(r">\s+<", "><", fragment)
    return fragment.strip() + "\n"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("asset_commit", help="Immutable commit containing campaign assets")
    args = parser.parse_args()

    source = (CAMPAIGN / "newsletter.html").read_text(encoding="utf-8")
    cdn_root = (
        f"https://cdn.jsdelivr.net/gh/{REPOSITORY}@{args.asset_commit}/"
        f"{REMOTE_DIRECTORY}/"
    )
    send = source.replace('src="assets/', f'src="{cdn_root}assets/')
    send = compact(send)

    for filename in (
        "newsletter-klaviyo-block.html",
        "newsletter-klaviyo.html",
        "newsletter-klaviyo-block.txt",
    ):
        (CAMPAIGN / filename).write_text(send, encoding="utf-8")


if __name__ == "__main__":
    main()
