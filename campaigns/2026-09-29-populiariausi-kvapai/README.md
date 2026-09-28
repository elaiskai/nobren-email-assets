# Nobren · 2026-09-29 · Jūsų favoritai

Kampanija pirkėjams ir aktyviems prenumeratoriams pagal rugsėjo 29 d. planą. Šeši populiarūs kvapai ir atskiras TOP 10 mėginėlių rinkinio pasiūlymas su −10 %. Siuntimas Klaviyo nesukurtas ir nesuplanuotas.

## Subject ir preview line

Rekomenduojama pora:

- **Subject:** Ar tavo kvapas tarp Nobren favoritų?
- **Preview line:** 6 populiarūs kvapai ir TOP 10 mėginėlių rinkinys su −10 %.

Alternatyva:

- **Subject:** Nobren favoritai. Kuris taps tavo?
- **Preview line:** Nuo Aventus iki MYSLF — peržiūrėk šešis kvapus ir TOP 10 rinkinį su −10 %.

## Failai ir įkėlimas į Klaviyo

- `klaviyo-block.txt` — kopijuoti visą turinį į vieną Klaviyo HTML bloką; išorinis plotis 600 px, bloko padding 0. Tai laiško turinys su savo footeriu ir atsisakymo nuoroda.
- `klaviyo-block.html` — tas pats turinys HTML formatu.
- `newsletter-klaviyo.html` — pilnas HTML dokumentas importuojamam šablonui.
- `newsletter.html` — vietinė versija su santykinėmis paveikslėlių nuorodomis, skirta peržiūrai.
- `newsletter.txt` — tekstinė versija.
- `preview-hosted-desktop.png`, `preview-hosted-mobile.png`, `preview-hosted-mobile-320.png` — galutinės peržiūros su viešai talpinamomis nuotraukomis.

Nuotraukų nuorodos nukreiptos į viešus GitHub raw failus, prisegtus prie konkretaus commit. Importui naudoti hosted failus. Subject ir preview line įrašyti kampanijos nustatymuose. Auditorija: esami pirkėjų ARBA aktyvių prenumeratorių segmentai, dubliuotus gavėjus skaičiuojant vieną kartą. Aktyvumo laikotarpis nekeistas ir naujas segmentas nekurtas.

## Produktai ir pasiūlymas

Patikrinta oficialiuose produktų puslapiuose 2026-09-28; šaltinių išrašai ir nuorodos saugomi `products.json`.

| Kvapas | Nobren žymėjimas | Laiške rodoma kaina |
|---|---|---|
| Aventus | C35 | 29,90 € / 30 ml su buteliuku |
| Delina | P20* | 29,90 € / 30 ml su buteliuku |
| Kirke | T3* | 29,90 € / 30 ml su buteliuku |
| Side Effect | I3 / 13 | 29,90 € / 30 ml su buteliuku |
| Fleur Narcotique (FLE N7) | N7 | 29,90 € / 30 ml su buteliuku |
| MYSLF | Y12 | 29,90 € / 30 ml su buteliuku |
| TOP 10 rinkinys | 10 × 5 ml | 44,87 € vietoje 49,86 € |

−10 % taikoma tik TOP 10 rinkiniui. Patikrinimo metu nuolaida jau rodoma prekės puslapyje, todėl laiške nenurodytas kuponas ar išgalvotas galiojimo terminas. Rinkinio variantą vyrui arba moteriai galima pasirinkti prekės puslapyje. Laiške neteigiama, kad rinkinyje yra visi šeši pristatyti kvapai.

Oficialios kai kurių kvapų katalogo nuotraukos rodo kitą talpą; kainos patikrintos 30 ml variantui. Šalia produktų pateiktas trumpas paaiškinimas. Kai kurių produktų skaitinis likutis neigiamas, bet parduotuvės duomenys leidžia juos užsakyti (`available_for_order=1`, `allow_oosp=true`). Laiške nežadamas pristatymo terminas ar likutis.

## Vaizdai ir jų kūrimas

Naudotas integruotas **ImageGen**, be CLI / API pakaitalo. Produktų kortelėse paliktos originalios parduotuvės fotografijos. Naujam hero panaudotos Kirke, Delina ir MYSLF pakuočių nuorodos; TOP 10 vaizdui pakeista oficialios rinkinio nuotraukos aplinka.

- Galutinis hero: `assets/hero/hero-final.jpg` (1200 × 1380).
- Galutinis rinkinio vaizdas: `assets/closing/top10-final.jpg` (1200 × 800).
- Logotipas su nepermatomu fonu: `assets/brand/logo-strip.png` (1200 × 150, be alpha).
- Generuoti originalai: `assets/hero/hero-scene.png`, `assets/closing/top10-scene.png`.
- Tikslūs generavimo promptai: `imagegen-hero-prompt.txt`, `imagegen-closing-prompt.txt`.
- Redaguojami tekstų / perėjimų šaltiniai: `hero-compose.html`, `closing-compose.html`, `brand-compose.html`.

Antraštė ir kraštų spalvos sudėtos deterministiškai iš HTML kompozicijų. Hero teksto spalva balta; žalias pagrindas `#173F38`, šviesus produktų laukas `#F6F1E7`, mygtukų akcentas `#DFEA9C`.

## Perėjimų žemėlapis

| Iš | Į | Loginis plotis | Sprendimas |
|---|---|---:|---|
| Logo rastras | Hero rastras | 600 px | Vienodas `#173F38` kraštas |
| Hero rastras | Gyvas įžangos tekstas | 600 px | Hero baigiasi žalia juosta, abiem vienas žalias tėvinis blokas |
| Įžanga | Produktai | 600 px | Sąmoningas tiesus perėjimas į šviesų `#F6F1E7` |
| Produktai | TOP 10 pasiūlymas | 600 px | Sąmoningas tiesus perėjimas į žalią `#173F38` |
| Pasiūlymo antraštė | Rinkinio rastras | 600 px | Viršutinė 24 px kraštinė sutampa su žaliu fonu |
| Rinkinio rastras | Kaina ir mygtukas | 600 px | Apatinė 24 px kraštinė sutampa su žaliu fonu |
| Pasiūlymas | Footeris | 600 px | Vienas bendras žalias tėvinis blokas, vidiniai langeliai skaidrūs |

HTML paveikslėliams nustatyta `display:block`, aiškūs matmenys, nulinis vaizdų langelių šrifto dydis ir eilučių aukštis. Produktų tekstams nenaudojami fiksuoti aukščiai. Porų eilutės sulygina kainas ir mygtukus pagal tikrą turinį.

## Patikrinimai

`qa/local.json` ir `qa/hosted.json`: 820, 390 ir 320 px naršyklės peržiūros šviesiu režimu; šeši produktai, visos kainos / talpos, nėra horizontalaus išsiliejimo, porų mygtukai lygiuojasi. Aprašymo ir kainos tarpas 12–30 px, priklausomai nuo gretimo aprašymo eilučių.

`qa/edges-*.json`: visų trijų galutinių rastrų plotis 1200 px; viršutinės ir apatinės 24 px juostos atitinka `#173F38` iki 1 RGB kanalo reikšmės (leistina 2). `qa/links.json`: vieši paveikslėliai HTTP 200, sutampa su vietinių failų SHA-256; tikrinamos ir visos paskirties nuorodos. HTML mažesnis nei 50 KB.

Tai naršyklės maketo patikra. Tikras siuntimas į Gmail / Outlook ar Klaviyo paskyros peržiūra šiame darbe neatlikti; `{% unsubscribe_link %}` apdorojimą atliks Klaviyo.

## Pakartotinis generavimas

Su Node.js, Playwright, Sharp ir vietiniu Chrome:

```sh
node render-assets.cjs
node build.cjs
node render.cjs
node render.cjs --hosted
node check-links.cjs
```

`research.cjs` atnaujina oficialius produktų duomenis ir katalogo nuotraukas; paleisti tik norint sąmoningai atnaujinti kampanijos šaltinius. Naujiems vaizdams pirmiausia sukurti naują assets commit ir atnaujinti `assetCommit` reikšmę `build.cjs`.
