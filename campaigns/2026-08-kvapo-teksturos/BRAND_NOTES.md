# NoBren kampanija: „Kvapo tekstūros“

Patikrinta: 2026-08-18.

## Kampanijos kryptis

- Tema: **„Jei kvapą galėtum paliesti.“**
- Subject: **Jei kvapą galėtum paliesti…**
- Preview: **Šilkas, zomša ar dūmai? Atrask 6 aromatus pagal pojūtį.**
- Pagrindinė idėja: aromatus pristatyti ne kaip įprastą natų sąrašą, o per juntamą tekstūrą — krištolinę, aksominę arba dūminę.
- Hero yra vienas paspaudžiamas 1200 × 1550 PNG: logotipas, antraštė, CTA ir tikri produktų packshotai įkepti į rastrą. HTML hero teksto sluoksnių nėra.

## Produktai ir gyvi šaltiniai

1. [E7 · Blue Talisman](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-nobren-nisiniai-kvepalai-unisex-e7.html) — citrusiniai / vaisių; kriaušės, Ambroflix, mandarinai, bergamotės.
2. [P32 · Valaya](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-nobren-nisiniai-kvepalai-moterims-p32.html) — gėlių / vaisių; aldehidai, dyglialapė, mandarinai.
3. [K13 · Ruby](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-nobren-nisiniai-kvepalai-unisex-k13.html) — rytietiški / vanilės; vyšnios, plakta grietinėlė, cukrus, kokosas.
4. [A10 · Purpose](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-nobren-nisiniai-kvepalai-unisex-a10.html) — rytietiški / medienos; šafranas, zomša, Akigalawood, papirusas.
5. [N11 · Black Afgano](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-ikvepti-black-afgano-nisiniai-kvepalai-unisex-n11.html) — medienos / aromatiniai; kanapės, agarmedis, smilkalai, žaluma.
6. [M36 · Arabian Tonka](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-nobren-nisiniai-unisex-kvepalai-m36.html) — rytietiški / medienos; šafranas, tonka pupelės, oudas, cukranendrės.

## Vizualų metodas

- Hero fotografinė bazė sugeneruota vienu bendru **compositing** veiksmu: E7, K13 ir N11 buteliukai, dėžutės, podiumai, aksomas, oda, šviesa, kontaktiniai šešėliai bei atspindžiai yra vienos scenos dalys. Atskiro produktų „cutout“ sluoksnio galutiniame hero nėra.
- Oficialūs E7, K13 ir N11 packshotai naudoti kaip produkto tapatybės reference’ai. Promptas reikalavo išlaikyti atpažįstamus siluetus, pakuočių spalvas, logotipus ir matomus kodus `E7`, `K13`, `N11`, bet perkurti bendrą apšvietimą ir fizinį kontaktą su scena.
- Naudotas promptas: viena fotorealistiška premium NoBren studijos ekspozicija su tamsiai alyvuogių tinko siena, travertino podiumais, bordo aksomu ir juoda oda; E7 kairėje, K13 centre, N11 dešinėje; vienoda šampano šviesa, tikri kontaktiniai šešėliai, bendras color grade, jokių baltų packshotų fonų, halo ar papildomų produktų; viršus paliktas tekstui, apačia pereina į `#E9E0D3`.
- Tikslus oficialus logotipas, kampanijos antraštė ir CTA uždėti po generavimo, todėl tekste bei logotipe nėra generatyvinių iškraipymų.
- Oficialus logotipas naudotas iš `brand/logo-white.png`.
- Sugeneruoto vientiso originalo kelias kūrimo aplinkoje: `/Users/kiprastinfavicius/.codex/generated_images/019fb815-79fd-7cf0-b284-27b50df7f9fe/exec-46b2e01e-f656-4992-9d5b-bf20432112c3.png`.

## Perėjimų sistema

- Išorinis fonas: `#D8D4CE`.
- Hero viršutinis 24 px band patikrintas kaip tikslus `#1A211C`.
- Hero apatinis 24 px band patikrintas kaip tikslus `#E9E0D3`.
- Hero ir įžangos blokai susilieja be tarpo per `font-size:0; line-height:0; padding:0` vaizdo celę.
- Produktų laukas baigiasi `#222622`; perėjimo rastras prasideda tiksliu `#222622` ir baigiasi tiksliu `#E9E0D3`.
- Uždarymas nuo footer atskirtas sąmoninga 2 px žalvario linija `#B59055`.

## Failai

- `newsletter-klaviyo-block.html` — grynas turinys vienam Klaviyo **HTML** blokui.
- `newsletter-klaviyo-block.txt` — identiška kopija patogiam „Select all / Copy“.
- `newsletter-klaviyo.html` — send-ready kopija.
- `newsletter.html` — lokali peržiūra.
- `newsletter.txt` — plain-text versija ir subject/preview.
