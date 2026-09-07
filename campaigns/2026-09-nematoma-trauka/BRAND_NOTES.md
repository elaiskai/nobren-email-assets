# NoBren — „Nematoma trauka“

- Subject: **Kai kvapas traukia arčiau.**
- Preview: **Šeši aromatai – nuo artimos auros iki atmintyje liekančio pėdsako.**
- Tema: kvapas kaip nematomas traukos laukas, išreikštas šviesia šiuolaikine saulės observatorija.
- Hero headline: **Nematoma trauka.**
- Hero CTA: **PAJUSTI TRAUKĄ**
- Hero produktai: X14 Torino 21, T39 Green Pearl ir C36 Aventus vienoje integruotoje fotosesijoje.

## Produktai

Produktų puslapiai ir oficialūs 600 × 680 px packshotai patikrinti 2026-09-07. Atrinkti kodai ankstesnėse repo kampanijose nebuvo naudoti.

1. [T39 · Green Pearl](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-nobren-nisiniai-kvepalai-unisex-t39.html) — unisex, aromatinis; arbata, žalios natos, obuolys, samanos. [Oficialus packshotas](https://nobrenparfum.lt/4485-large_default/nobren-nisiniai-kvepalai-unisex-t39.jpg).
2. [X14 · Torino 21](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-nobren-nisiniai-kvepalai-unisex-x14.html) — unisex, aromatiniai; mėta, citrina, juodieji serbentai, bazilikas. [Oficialus packshotas](https://nobrenparfum.lt/4664-large_default/nobren-nisiniai-kvepalai-unisex-x14.jpg).
3. [C36 · Aventus](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-nobren-nisiniai-kvepalai-moterims-c36.html) — moterims, šypro / vaisių; persikai, obuoliai, juodieji serbentai. [Oficialus packshotas](https://nobrenparfum.lt/3834-large_default/nobren-nisiniai-kvepalai-moterims-c36.jpg).
4. [T20 · Cassiopea](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-nobren-nisiniai-kvepalai-unisex-t20.html) — unisex, šypro / gėlių; pasiflora, baltasis muskusas, tongapupė. [Oficialus packshotas](https://nobrenparfum.lt/3842-large_default/nobren-nisiniai-kvepalai-unisex-t20.jpg).
5. [M42 · Tilia](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-nobren-nisiniai-kvepalai-unisex-m42.html) — unisex, gėlių / medienos / muskuso; liepų žiedai, sambakiniai jazminai, heliotropai. [Oficialus packshotas](https://nobrenparfum.lt/4482-large_default/nobren-nisiniai-kvepalai-unisex-m42.jpg).
6. [A4 · Arabia Magic](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-nobren-magic-nisiniai-kvepalai-unisex-a4.html) — unisex, rytietiški / gėlių; jūros druska, ozoninės natos, vanilė, praline. [Oficialus packshotas](https://nobrenparfum.lt/4666-large_default/nobren-magic-nisiniai-kvepalai-unisex-a4.jpg).

## Paletė ir perėjimai

- Solar ivory `#F3EFE6`
- Cream core `#E5D2AC`
- Ice glass `#DCE9E8`
- Horizon blue `#AFC9CE`
- Graphite orbit `#1A1E22`
- Champagne `#C5A46B`
- NoBren pink `#F35482`
- Outer canvas `#D6DADB`

Boundary map:

- hero `#F3EFE6 → #DCE9E8`;
- `ice-to-solar.png` `#DCE9E8 → #F3EFE6`;
- `solar-eclipse.png` `#F3EFE6 → #1A1E22`;
- `graphite-to-ice.png` `#1A1E22 → #DCE9E8`;
- `ice-to-graphite.png` `#DCE9E8 → #1A1E22`.

Visi rasteriai yra 1200 px pločio ir HTML rodomi 600 px. Siuntimo HTML turi naudoti prie assetų commit SHA prisegtas jsDelivr nuorodas, ne `raw.githubusercontent.com`.

## ImageGen

Built-in `imagegen` panaudotas vienai vientisai šviesios observatorijos fotosesijai. X14, C36 ir T39 oficialūs packshotai buvo autoritetingos produkto tapatybės nuorodos. Tikslus oficialus logotipas, lietuviškas tekstas ir CTA uždėti mechaniškai.

- Pirminis generuotas failas: `assets/hero/hero-integrated-generated.png`
- Galutinis hero: `assets/hero/hero-final.jpg`

Galutinis promptas:

```text
Use case: ads-marketing
Asset type: vertical premium email hero base photograph for NoBren, intended to be cropped to 1200 x 1560
Primary request: Create one cohesive high-key editorial still-life photograph called a contemporary solar fragrance observatory. Three authentic NoBren products are photographed together in the same physical scene, never as pasted cutouts.
Input images: Image 1 is the authoritative identity reference for NoBren Torino 21 X14; Image 2 is the authoritative identity reference for NoBren Aventus C36; Image 3 is the authoritative identity reference for NoBren Green Pearl T39. Preserve each real bottle silhouette, matching box geometry, cap type, official crest/logo placement, glass color, label proportions and exact code marker X14, C36 or T39. Use only the bottle and matching box identity from each reference; omit the ingredient collages from the source packshots.
Scene/backdrop: a bright contemporary sun observatory made of warm solar-ivory plaster and pale mineral blue glass. A large matte cream circular light disc is built into the rear wall, crossed by two very thin real chrome orbital rails. A single translucent ice-blue glass table spans the lower scene, with soft water-caustic daylight reflections. No sky and no outer-space imagery.
Subject: exactly three product-and-box pairs on the same glass table. X14 is the dominant central pair, T39 sits left slightly farther back, C36 sits right slightly farther back. All objects share the same perspective, surface reflection, window light and natural contact shadows. Products remain upright, grounded and fully visible.
Style/medium: photorealistic luxury fragrance campaign photography, clean European editorial art direction, refined, airy and tactile, shot with an 80mm lens.
Composition/framing: strong vertical composition. Reserve the upper 38 percent as calm uncluttered solar-ivory negative space for typography to be added later. Products occupy the lower 50 percent with generous breathing room and no cropping. Symmetrical with subtle asymmetry in depth. The bottom 5 percent should visually settle into pale ice-glass blue.
Lighting/mood: crisp diffused morning sunlight from upper left, delicate water reflections, controlled studio fill, cool highlights on glass and restrained warm champagne glints on metal. Fresh, quiet, magnetic, premium.
Color palette: solar ivory #F3EFE6, cream #E5D2AC, ice glass #DCE9E8, horizon blue #AFC9CE, graphite #1A1E22, restrained champagne #C5A46B.
Materials/textures: fine mineral plaster, frosted glass, clear blue-tinted glass, slender chrome rails, authentic fragrance glass and cardboard packaging.
Text: add no campaign headline, no CTA and no extra typography. Retain only authentic marks already present on the referenced products and their exact X14, C36 and T39 codes.
Constraints: exactly three bottles and exactly three matching boxes; one pair per fragrance; preserve product identity closely; all products photographed together in one scene; realistic scale, perspective, reflections and contact shadows; no floating objects; no halos; no duplicate products; no watermark.
Avoid: dark space, stars, planets, galaxies, telescope, clock, arches, archive drawers, galleries, museums, marble podiums, wardrobes, music motifs, flowers, fruit, herbs, ingredient collages, fabric drapes, candles, people, hands, excessive gold, fake brand text, extra bottles.
```
