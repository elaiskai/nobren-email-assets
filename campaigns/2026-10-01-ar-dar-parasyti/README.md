# Nobren · 2026-10-01 · Ar dar parašyti?

Laiškas neaktyviems prenumeratoriams pagal kampanijų planą: kas naujo ir ar dar nori gauti laiškus. Pridėtas hero ir dvi tikros dabartinio naujienų asortimento prekės.

## Subject ir preview line

- **Subject:** Ar dar parašyti?
- **Preview line:** Nauji kvapai tavo namams. Ar dar nori Nobren naujienų?
- Alternatyvus subject: **Dar nori Nobren laiškų?**

## Naudojimas

- [klaviyo-block.txt](klaviyo-block.txt) — visas turinys vienam Klaviyo HTML blokui, 0 išorinio padding ir 600 px turinio plotis.
- [newsletter-klaviyo.html](newsletter-klaviyo.html) — pilnas HTML importui, su viešais paveikslėlių adresais ir tikrais Klaviyo tagais.
- [newsletter.html](newsletter.html) — vietinė vizualinė peržiūra. Jos pagrindinis mygtukas tik atidaro naujienų puslapį ir nekeičia profilio; atsisakymas — neveikiantis vietinis inkaras.
- [newsletter.txt](newsletter.txt) — tekstinė versija su Klaviyo tagais.
- [Kompiuterio peržiūra](preview-desktop.png), [390 px telefono peržiūra](preview-mobile.png), [320 px telefono peržiūra](preview-mobile-320.png).
- [KLAVIYO_SETUP.md](KLAVIYO_SETUP.md) — pasirinkimo mygtuko ir neaktyvių gavėjų nustatymų planas.

HTML bei vaizdai paskelbti GitHub. Šiame darbe Klaviyo siuntimas nesuplanuotas ir gavėjai nepakeisti. Vien HTML įkėlimas neaktyvių profilių neišjungia.

## Turinys ir produktai

Pagrindinis mygtukas **TAIP, NORIU GAUTI LAIŠKUS** pateikiamas prieš prekes. Dvi kompaktiškos kortelės turi trumpus aprašymus, kainas ir **PERŽIŪRĖTI PREKĘ** mygtukus. Atsisakymo nuoroda matoma tekste. Prekių paspaudimai taip pat laikomi įsitraukimu pagal pridėtą Klaviyo nustatymų planą.

| Naujiena | Talpa | Patikrinta kaina |
|---|---:|---:|
| [Amber Expresso](https://nobrenparfum.lt/lt/namu-kvapai/--amber-expresso-namu-kvapas.html) | 50 ml | 18,90 € |
| [Velvet Dust](https://nobrenparfum.lt/lt/namu-kvapai/--velvet-dust-namu-kvapas.html) | 50 ml | 18,90 € |

Abi prekės patikrintos 2026-09-30 oficialiame [Nauji kvapai](https://nobrenparfum.lt/lt/nauji-kvapai) puslapyje ir produkto duomenyse turi žymą „Nauja“. Faktai ir patikros laikas — `products.json`, `qa/new-arrivals.json`, `qa/sources.json`. Svetainė leidžia užsakymą, tačiau duomenų likutis nėra teigiamas; laiškas nežada sandėlio likučio ar pristatymo termino. Papildoma nuolaida nesiūloma.

## Hero ir perėjimai

Hero sukurtas integruotu ImageGen įrankiu pagal abiejų oficialių produktų nuotraukas. Jauki bordo aplinka, du „Nobren“ namų kvapai ir balta antraštė „Nauji kvapai. Tavo namams.“. Nuotraukų kortelėse naudojamos oficialios prekių nuotraukos.

- Tikslus generavimo promptas: [imagegen-hero-prompt.txt](imagegen-hero-prompt.txt).
- Originalus generuotas vaizdas: `assets/hero/hero-home-scene-v1.png` (1536 × 1024).
- Hero kompozicija su tikslia balta tipografija ir perėjimais: `hero-compose.html`.
- Galutinis hero: [assets/hero/hero-home-v1.jpg](assets/hero/hero-home-v1.jpg) (1200 × 800), laiške rodomas 600 × 400.
- Oficialios produktų nuotraukos: `assets/products/amber-expresso.jpg`, `assets/products/velvet-dust.jpg` (600 × 680).

| Iš | Į | Rodomas plotis | Sprendimas |
|---|---|---:|---|
| Logo juosta | Hero | 600 px | Nepermatomas logo ir hero viršus sutampa su `#FFFDF9` |
| Hero | Įžanga | 600 px | Hero apačia išblunka į `#FFFDF9` |
| Įžanga | Prekių kortelės | Bendras turinio laukas | Tas pats tėvinis fonas; balti packshotų stačiakampiai sąmoningi |
| Prekės | Atsisveikinimas ir footeris | 600 px | Bendras fonas; footerį atskiria plona linija |

Logo `assets/logo-strip.png` yra nepermatomas, be alpha. Hero ir logo langeliai turi 0 padding bei line-height, paveikslėliai `display:block`. Vidiniai langeliai skaidrūs, fonas nustatytas pagrindinei lentelei. „transitions“ patikra tikrina pirmą ir paskutinę 24 px juostą, leistinas RGB nuokrypis 2; galutinis hero nuo `#FFFDF9` skiriasi daugiausia 1.

## Patikrinimai

Naršyklėje patikrinti vietiniai ir viešus failus naudojantys maketai 820, 390 ir 320 px pločiu: visi keturi vaizdai įsikrauna, nėra horizontalaus išsiliejimo, pagrindinio mygtuko aukštis bent 44 px, prekių mygtukai lygiuoti, nėra fiksuotų aprašymų aukščių. HTML blokas apie 13 KB. Vaizdų vieši failai pagal SHA-256 sutampa su vietiniais, produktų ir naujienų nuorodos atsako HTTP 200.

Rezultatai: `qa/local.json`, `qa/hosted.json`, `qa/links.json`, `qa/logo-edges.json`, `qa/hero-edges.json`. Tikras gavėjo paspaudimas Klaviyo ir pristatymas Gmail programėlėje šiame darbe netestuoti.

## Pakartotinis generavimas

Su Node.js, Playwright, Sharp ir vietiniu Chrome: `node render.cjs --hero`, `node build.cjs`, `node render.cjs`, `node render.cjs --hosted`, `node check-links.cjs`. Pakeitus vaizdus, pirmiausia paskelbti asset commit ir jo SHA įrašyti į `build.cjs` kintamąjį `assetCommit`, kad laiške liktų nekintantys vieši adresai.
