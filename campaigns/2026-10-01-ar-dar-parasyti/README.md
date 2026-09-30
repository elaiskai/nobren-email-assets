# Nobren · 2026-10-01 · Ar dar parašyti?

Trumpas grįžtamojo ryšio laiškas esamam neaktyvių prenumeratorių segmentui. Tema pagal vartotojo planą: kas naujo ir ar dar nori gauti laiškus; neatsiliepusiesiems daugiau naujienlaiškių nebesiųsti.

## Subject ir preview line

- **Subject:** Ar dar parašyti?
- **Preview line:** Trumpai apie Nobren naujienas ir vienas klausimas tau.

Alternatyva: **Dar nori Nobren laiškų?** / **Kelios kvapų naujienos ir paprastas pasirinkimas — likti ar atsisveikinti.**

## Naudojimas

- [klaviyo-block.txt](klaviyo-block.txt) — kopijuoti visą turinį į vieną Klaviyo HTML bloką su 0 išoriniu padding ir 600 px turinio pločiu.
- [newsletter-klaviyo.html](newsletter-klaviyo.html) — pilnas HTML šablonas importui.
- [newsletter.html](newsletter.html) — vietinė vizualinė peržiūra; jos mygtukas tik atidaro Nobren naujienų puslapį ir nekeičia jokio profilio. Atsisakymo nuoroda peržiūroje yra neveikiantis vietinis inkaras.
- [newsletter.txt](newsletter.txt) — tekstinė versija su tikrais Klaviyo tagais.
- [Kompiuterio peržiūra](preview-desktop.png), [390 px telefono peržiūra](preview-mobile.png), [320 px telefono peržiūra](preview-mobile-320.png).
- [KLAVIYO_SETUP.md](KLAVIYO_SETUP.md) — mygtuko, laukimo ir neaktyvių gavėjų išjungimo nustatymai.

HTML ir vaizdai paskelbti GitHub. Kampanija Klaviyo paskyroje nesukurta, siuntimas nesuplanuotas ir gavėjai nepakeisti. Vien HTML įkėlimas neišjungia neaktyvių profilių.

## Turinio kryptis

Vienas aiškus mygtukas **TAIP, NORIU GAUTI LAIŠKUS**. Trumpa naujienų pastraipa apie „Madam A5“ ir TOP 10 mėginėlių rinkinį. Kainos ir papildoma nuolaida šioje kampanijoje nežadamos. Atsisakymo nuoroda matoma pagrindiniame tekste.

Naudotas gyvas HTML tekstas ir oficialus Nobren logotipas. Naujos AI fotografijos negeneruotos. Maketas šviesus, trumpas ir įskaitomas be paveikslėlių; tik prekės ženklo logotipas yra rastras.

## Perėjimai ir Gmail mobilus vaizdas

| Iš | Į | Plotis | Sprendimas |
|---|---|---:|---|
| Logo juosta | Gyvas tekstas | 600 px | Rastras ir bendras tėvinis blokas `#FFFDF9` |
| Įžanga | Naujienos | Tas pats teksto laukas | Vienas bendras fonas, tik kairioji akcento linija |
| Turinys | Footeris | 600 px | Vienas bendras fonas ir sąmoningas 1 px skyriklis |

Logotipas išsaugotas su nepermatomu fonu, be alpha. Galutinis failas `assets/logo-strip.png` (1200 × 144), redaguojamas šaltinis `logo-compose.html`, oficialus įvesties failas `assets/logo-original.png`. Pasitelkta „transitions“ patikra: viršus ir apačia lyginami su `#FFFDF9`. Paveikslėlis `display:block`, langelio eilutės aukštis ir padding lygūs 0. Vidiniai langeliai skaidrūs, foną apibrėžia vienas pagrindinis blokas.

## Patikrinimai ir šaltiniai

Naršyklės maketai tikrinami 820, 390 ir 320 px pločiu: nėra horizontalaus išsiliejimo, pagrindinis mygtukas bent 44 px aukščio, visi išdėstymo elementai — prezentacinės lentelės. Įrašai `qa/local.json`, `qa/hosted.json`, `qa/logo-edges.json`, `qa/sources.json`. HTML apie 6 KB. Tikro gavėjo paspaudimas Klaviyo ir Gmail programėlėje šiame darbe netestuotas.

Naujienų puslapis ir minimos prekės patikrintos 2026-09-30:

- [Nauji kvapai](https://nobrenparfum.lt/lt/nauji-kvapai)
- [Nobren Madam A5](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-nobren-nisiniai-kvepalai-unisex-a5.html)
- [TOP 10 mėginėlių rinkinys](https://nobrenparfum.lt/lt/dovanu-rinkiniai/--dovanu-rinkinys-idealu-top10.html)

## Pakartotinis generavimas

Su Node.js, Playwright, Sharp ir vietiniu Chrome: `node render.cjs --logo`, `node build.cjs`, `node render.cjs`, `node render.cjs --hosted`. Pakeitus logotipo failą, pirmiausia paskelbti naują asset commit, tada atnaujinti `assetCommit` reikšmę `build.cjs`.
