# Nobren · Pasimatymas su kvapu

Atnaujinta 2026-09-16 · v5 · Klaviyo šablono stilių konflikto pataisa. Lietuvių kalba, Klaviyo HTML.

## Dabartinė versija · v5 · Klaviyo stilių pataisa

Pagal vartotojo ekrano nuotrauką pataisyta įžangos antraštės lygiuotė ir padidėję tarpai po hero. Ankstesnis kodas leido įklijavimo šablono antraščių ir pastraipų stiliams perrašyti paveldimą lygiavimą bei bendrą paraščių nustatymą.

- Įžangos tekstai ir mygtukas išdėstyti atskirose lentelės eilutėse; tarpus valdo `td` padding, ne pastraipų ar antraščių margin.
- Visoms antraštėms ir pastraipoms įrašytas tiesioginis šriftas, nulinės paraštės bei lygiavimas. Įžangoje yra tiesioginis centravimas.
- Visoms lentelėms pridėti `cellpadding="0"`, `cellspacing="0"`, `border="0"` ir tiesioginiai border-collapse / border-spacing nustatymai.
- Visi vaizdai turi tiesioginį `display:block`, visos tekstinės lentelių celės – aiškų šriftą ir lygiavimą.
- Pagrindinis konteineris naudoja 100% plotį ir 600 px maksimalų plotį; Outlook 600 px apvalkalas išlaikytas.
- Turinys, kainos, hero ir kiti vaizdai išlaikyti. Viešų nuotraukų commit tas pats: `9d32d00304486684158efafc6da2f72213874810`.

Patikra `verify-klaviyo.cjs` įdeda kodą į 600 px tėvinį šabloną ir prideda didesnio specifiškumo antraščių, pastraipų, lentelių, šrifto bei vaizdų stilius. Su ankstesniu kodu atkartotas antraštės pasislinkimas į kairę ir papildomos paraštės. Pataisyto kodo įžangos koordinatės, tarpai ir viso laiško aukštis sutampa tiek be išorinių stilių, tiek su jais; patikrinti 820 / 390 / 320 px ekranai. 13 iš 13 nuotraukų užsikrauna, nėra horizontalaus slinkimo. Papildomai patikrinta, kad įžangos centravimas ir nulinės paraštės išlieka išėmus `<style>` bloką. Tai naršyklėje modeliuotas įklijavimo šablonas; tiesioginė Klaviyo paskyros ar išsiųsto laiško patikra neatlikta.

Pakeisti visą esamo Klaviyo HTML bloko turinį nauja `klaviyo-block.txt` / `.html` versija. Importuojant visą šabloną naudoti `newsletter-klaviyo.html`. Galutinės peržiūros atnaujintos; `preview-klaviyo-fixed-desktop.png`, `preview-klaviyo-fixed-mobile.png` ir `preview-klaviyo-fixed-mobile-320.png` rodo pataisytą įžangą bandymo šablone. Tema, preheader ir ankstesnių perėjimų sprendimai išlieka.

## Ankstesnė v4 versija · „transitions“ pataisymai

Atnaujintas ankstesnis „Pasimatymas su kvapu“ laiškas. Hero kraštai pereina į baltą bendrą foną, panaikinta juoda linija po logotipu. Įžanga centruota ir sutrumpinta:

- Maža žyma: PASIMATYMAS SU KVAPU.
- Antraštė: Šeši kvapai. Trys nuotaikos.
- Tekstas: Nuo figų žalumos iki dūminės vanilės. Kurią norisi pažinti iš arčiau?
- Mygtukas: ATRASK SAVO KVAPĄ.

Antraštės frazės telefone išlaikomos kartu, todėl 320 px pločiu nelieka pavienio žodžio eilutėje. Kvapų kortelės sudėtos bendrame baltame lauke: 24 px šoniniai tarpai kompiuteryje, 12 px telefone. Nuotraukų kraštai pereina į kiekvienos kortelės fono spalvą. Tamsus mėginėlių blokas prasideda lenktu perėjimu, poraštė tęsia jo foną. Oficialūs produktų vaizdai, kainos ir produktų pasirinkimas išlaikyti iš patikrintos ankstesnės versijos.

### Perėjimų žemėlapis ir patikra

| Jungtis | Loginis plotis | Bendras fonas / konstrukcija |
|---|---:|---|
| Logotipo juosta → hero viršus | 600 px | #FFFFFF |
| Hero apačia → įžanga | 600 px | #FFFFFF |
| Įžanga → kortelių išoriniai tarpai → produktai | 600 px | #FFFFFF |
| A vaizdas → A tekstas | 552 px kortelė | #E6EDBC |
| B vaizdas → B tekstas | 552 px kortelė | #F4C8A7 |
| C vaizdas → C tekstas | 552 px kortelė | #D4C6DF |
| Produktai → pabaigos blokas | 600 px | PNG kreivė iš #FFFFFF į #22231F |
| Pabaigos tekstas → mėginėlių vaizdas → aprašymas | 600 px | #22231F |
| Mėginėlių blokas → poraštė | 600 px | #22231F, subtilus skyriklis |

`transitions/scripts/check_image_edges.py` patikrinti galutinių JPEG/PNG failų 24 px kraštai. Hero ir lenkto perėjimo spalvos sutampa tiksliai; trijų kvapų vaizdų visų keturių kraštų didžiausias RGB kanalo nuokrypis 2; mėginėlių vaizdo viršaus ir apačios – 1. Visi patikros rezultatai telpa į toleranciją 2.

Galutinis vietinis ir viešų vaizdų HTML atvaizduoti 820, 390 ir 320 px pločiais. Konteineris 600 / 390 / 320 px, 13 iš 13 vaizdų užsikrauna, visi šeši pagrindiniai produktai turi kainą ir talpą, horizontalaus slinkimo nėra. Peržiūrėtas visas maketas, atskirai įžanga ir pabaiga. Po pirmo atvaizdavimo patobulinti kortelių fonai, tarpai bei antraštės laužymas siaurame ekrane ir atlikta pakartotinė patikra. HTML dydis apie 31 KB. Klaviyo įklijavimo blokas taip pat patikrintas 600 px tėviniame šablone 820 / 390 / 320 px ekranuose: 13 vaizdų, nėra horizontalaus slinkimo ar nukirsto teksto.

### Failai ir publikavimas

[GitHub kampanijos aplankas](https://github.com/elaiskai/nobren-email-assets/tree/main/campaigns/2026-09-pasimatymas-su-kvapu).

Dabartinis Klaviyo HTML naudoja viešą jsDelivr bazę, prisegtą prie vaizdų commit `9d32d00304486684158efafc6da2f72213874810`. Visos 13 HTTPS vaizdų nuorodų patikrintos be prisijungimo: HTTP 200, tinkamas MIME ir SHA-256 sutapimas su vietiniais failais. Ankstesnis vaizdų commit žemiau pateiktas tik kaip istorija.

- `klaviyo-block.txt` / `.html` – kodas vienam Klaviyo HTML blokui.
- `newsletter-klaviyo.html` – visas importuojamas HTML su viešais vaizdais.
- `newsletter.html` – vietinė peržiūra; GitHub šio failo kopija naudoja viešus vaizdus.
- `klaviyo-import/nobren.html` – atnaujinta senos vietinės nuorodos kopija.
- `preview-desktop.png`, `preview-mobile.png`, `preview-mobile-320.png` – dabartinės peržiūros.
- `build.cjs`, `render.cjs`, `hero-compose.html`, `notes-compose.html`, `closing-compose.html` ir atitinkami `render-*.cjs` – redaguojami šaltiniai.
- `assets/hero/hero-final-v4.jpg`, `assets/campaign/notes-*-v4.jpg`, `assets/transitions/closing-entry-v4.png` – nauji galutiniai failai. Mėginėlių vaizdas išlieka `closing-final-v3.jpg`.

Perėjimai paruošti redaguojant esamus HTML/CSS kompozitorius. Panaudotos ankstesnės originalios scenos; naujų ImageGen užklausų šiam pakeitimui nebuvo. Efektai eksportuoti į failus, todėl pats laiškas nepriklauso nuo CSS kaukių ar gradientų palaikymo. Klaviyo atsisakymo žyma išlaikyta; paskyra neredaguota ir laiškas nesiųstas.

## Ankstesnė v3 versija su viešomis nuotraukomis · 2026-09-14

Šios kampanijos 12 galutinių vaizdų įkelti į viešą [elaiskai/nobren-email-assets saugyklą](https://github.com/elaiskai/nobren-email-assets/tree/main/campaigns/2026-09-pasimatymas-su-kvapu). HTML naudoja jsDelivr HTTPS nuorodas, prisegtas prie assetų commit `ba4170cbf24aa9b3fdfeeb29b75d09bc9b119fd0`.

- `klaviyo-block.html` – kodas vienam Klaviyo HTML blokui; pašalinti išoriniai 24 / 12 px tarpai, kad blokas tilptų į 600 px konteinerį.
- `klaviyo-block.txt` – identiškas HTML kodas patogiam atidarymui ir kopijavimui.
- `newsletter-klaviyo.html` – pilnas HTML failas Klaviyo šablono importui.
- `klaviyo-import/nobren.html` – atnaujinta pilno HTML kopija ankstesnėje nuorodoje; ZIP šiai versijai nebereikalingas.
- `newsletter.html` – vietinė peržiūra, skirta kampanijos kūrimui. GitHub kampanijos aplanke `newsletter.html` pateikiama viešas nuorodas naudojanti versija.

Patikra: visi 12 CDN adresų be prisijungimo grąžino HTTP 200 ir tinkamą `image/*` tipą; atsisiųsti failai pagal SHA-256 tiksliai sutapo su vietiniais. Visas HTML ir blokas atvaizduoti Chrome 820 / 390 px ekranuose: visi vaizdai užsikrauna, horizontalaus slinkimo nėra. Išlaikyta Klaviyo `{% unsubscribe_link %}` žyma. Klaviyo paskyroje neredaguota ir laiškas nesiųstas.

Tai pakeičia žemiau aprašytą ankstesnį importo su ZIP būdą ir rankinio vaizdų adresų keitimo poreikį siunčiamose versijose. [jsDelivr GitHub failų dokumentacija](https://www.jsdelivr.com/?docs=gh).

## Kampanijos tekstai

- **Tema:** Kuris kvapas tave suvilios?
- **Preheader:** Šeši kvapai nuo figų žalumos iki dūminės vanilės. O pabaigoje – dar penkios pažintys.
- **Hero:** Kuris tave suvilios?
- **Laiško antraštė:** Pasimatymas su kvapu.
- **Produktų CTA:** RINKTIS KVAPĄ.
- **Pabaiga:** Penki pasimatymai. Vienas favoritas.
- **Pabaigos CTA:** PRADĖTI NUO PENKIŲ.

Ryškus rožinis hero, trys natų pažintys A / B / C, šeši konkretūs produktai su oficialiomis nuotraukomis ir kainomis. Pabaigoje – kontrastingas tamsus blokas su nauja mėginėlių rinkinio scena. Produktai sudėti poromis: P22 / C44, X1 / M12, B71 / T15. A / B / C raidės sieja juos su ankstesnėmis kvapų kryptimis. Kainos aiškiai priskirtos 30 ml variantui su buteliuku. Akcijos terminai, sutaupymas ar nuolaidos procentas nerodomi.

## Produktai ir šaltiniai

Oficialūs produktų puslapiai, natos, kainos ir pasirinktos talpos patikrinti 2026-09-13. Šešiems pagrindiniams produktams patikros metu buvo teigiamas likutis. Mėginėlių rinkinio 22,50 € kaina atskirai patikrinta naršyklėje pasirinkus moterims ir vyrams skirtus variantus. Kainų ir šaltinių įrašas: `sources.json`. Oficialios produktų nuotraukos katalogo skiltyje nekeistos.

| Produktas | Kaina / talpa | Oficialus puslapis | Vaizdas |
|---|---|---|---|
| Nobren Diptyque Nišiniai Kvepalai Unisex · P22 | 29,90 € / 30 ml, su buteliuku | [Produktas](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-nobren-nisiniai-kvepalai-unisex-p22.html) | [Oficiali nuotrauka](https://nobrenparfum.lt/3824-large_default/nobren-nisiniai-kvepalai-unisex-p22.jpg) |
| Nobren Silver Mountain Nišiniai Kvepalai Unisex · C44 | 29,90 € / 30 ml, su buteliuku | [Produktas](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-nobren-silver-nisiniai-kvepalai-unisex-c44.html) | [Oficiali nuotrauka](https://nobrenparfum.lt/2147-large_default/nobren-silver-nisiniai-kvepalai-unisex-c44.jpg) |
| Nobren Lira Nišiniai Kvepalai Moterims · X1 | 29,90 € / 30 ml, su buteliuku | [Produktas](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-nobren-nisiniai-kvepalai-moterims-x1.html) | [Oficiali nuotrauka](https://nobrenparfum.lt/3862-large_default/nobren-nisiniai-kvepalai-moterims-x1.jpg) |
| Nobren Intense Cafe Nišiniai Kvepalai Unisex · M12 | 29,90 € / 30 ml, su buteliuku | [Produktas](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-nobren-nisiniai-kvepalai-unisex-m12.html) | [Oficiali nuotrauka](https://nobrenparfum.lt/2701-large_default/nobren-nisiniai-kvepalai-unisex-m12.jpg) |
| Nobren Smoking Hot Nišiniai Kvepalai Unisex · B71 | 29,90 € / 30 ml, su buteliuku | [Produktas](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-nobren-nisiniai-kvepalai-unisex-b71.html) | [Oficiali nuotrauka](https://nobrenparfum.lt/4224-large_default/nobren-nisiniai-kvepalai-unisex-b71.jpg) |
| Nobren Oud Wood Nišiniai Kvepalai Unisex · T15* | 29,90 € / 30 ml, su buteliuku | [Produktas](https://nobrenparfum.lt/lt/nisiniai-kvepalai/-nobren-wood-nisiniai-kvepalai-unisex-t15.html) | [Oficiali nuotrauka](https://nobrenparfum.lt/3859-large_default/nobren-wood-nisiniai-kvepalai-unisex-t15.jpg) |
| Mėginėlių Rinkinys "NOBREN REKOMENDUOJA" · 5x5ml | 22,50 € / 5 × 5 ml | [Produktas](https://nobrenparfum.lt/lt/megineliu-rinkiniai/-megineliu-rinkinys-nobren-rekomenduoja-5x5ml.html) | [Oficiali nuotrauka](https://nobrenparfum.lt/3689-large_default/megineliu-rinkinys-nobren-rekomenduoja-5x5ml.jpg) |

Mėginėlių rinkinio turinys priklauso nuo pasirinkto varianto; laiškas nežada, kad jame yra šeši anksčiau pristatyti kvapai. Remiantis aprašymu, tai Nobren komandos atrinktos kompozicijos. Kūrybiniame vaizde matomos etiketės nėra faktinis rinkinio sudėties sąrašas; pridėta pastaba, kad vaizdas iliustracinis.

X1, C44 ir T15 puslapiuose nurodyti naujo dizaino buteliukai, tačiau pagrindiniai oficialūs vaizdai ne visur atnaujinti. Palikti originalūs parduotuvės vaizdai, laiške yra atitinkama pastaba.

[Oficialus logotipas](https://nobrenparfum.lt/img/shop_logo.png) nekeistas. [Privatumo politika](https://nobrenparfum.lt/lt/info/privatumo-politika) patvirtina poraštės juridinį asmenį ir adresą: MB „Nobren parfum“, Gintaro g. 56, Vydmantai. [Kontaktai](https://nobrenparfum.lt/lt/parduotuves). [Katalogas](https://nobrenparfum.lt/lt/nisiniai-kvepalai).

## Vizualai ir maketas

- Hero ir pabaigos scena sugeneruoti integruotu ImageGen pagal oficialias produktų nuotraukas. Tai kūrybinės AI kompozicijos. Šeši produktų skilties packshotai yra originalios parduotuvės nuotraukos.
- Hero: 1200 × 1440 px JPEG; rodomas 600 × 720 px. Lietuviška antraštė pridėta HTML kompozitoriumi.
- Naujas pabaigos vaizdas: 1200 × 930 px JPEG; rodomas 600 × 465 px. Antraštė, aprašymas, kaina ir CTA – gyvas HTML tekstas.
- Hero apačia sujungta su #F35482, pabaigos vaizdo viršus ir apačia – su #22231F. Visų tikrintų 24 px kraštinių juostų didžiausias spalvos nuokrypis nuo HTML fono – 1 kanalo reikšmė; tolerancija 2, patikra sėkminga.
- Spalvos: #F35482, #E6EDBC, #F4C8A7, #D4C6DF, #FAF8F2, #22231F. Rožinė paimta iš ankstesnio projekto, kitos – kampanijos kūrybinė paletė.
- Ingredientų vaizdai perteikia kvapų natas, ne fizinės sudėties patvirtinimą.
- Darbalaukyje natų blokai kaitalioja vaizdo pusę, telefone susideda vertikaliai. Produktų nuotraukos ir kainos lieka greta, kad būtų patogu palyginti.

## Failai

- `newsletter.html` – visas laiškas su vietiniais vaizdais.
- `klaviyo-block.html` – importuojamas HTML blokas.
- `newsletter.txt` – tekstinė versija, tema ir preheader.
- `assets/hero/hero-final-v2.jpg` – pagrindinis hero.
- `assets/closing/closing-final-v3.jpg` – naujas pabaigos vaizdas.
- `assets/products/` – šeši oficialūs produktų vaizdai ir oficialus mėginėlių rinkinio referencinis vaizdas.
- `assets/campaign/` – trys ingredientų vaizdai.
- `preview-desktop.png`, `preview-mobile.png`, `preview-mobile-320.png` – visas laiškas.
- `preview-products-desktop.png`, `preview-products-mobile.png` – produktų skiltis.
- `preview-closing-desktop.png`, `preview-closing-mobile.png` – pabaigos blokas.
- `build.cjs`, `render.cjs`, `hero-compose.html`, `render-hero.cjs`, `closing-compose.html`, `render-closing.cjs` – atkuriami šaltiniai.
- `sources.json`, `qa-report.json`, `imagegen-closing-prompt.txt` – kainų šaltiniai, patikra ir tiksli naujo vaizdo generavimo užklausa.

## Ankstesnis importo su ZIP būdas

`klaviyo-import/nobren.html` – visas HTML, skirtas įkelti kaip atskirą šabloną. `klaviyo-import/nobren-images.zip` – penki kampanijos vizualai ZIP šaknyje, tiksliai sutampantys su HTML `src` failų vardais. Logotipas ir šeši oficialūs produktų vaizdai naudoja originalius HTTPS adresus.

Klaviyo: Content → Templates → Email templates → Import. Įkelti HTML ir tame pačiame importe vaizdų ZIP. Klaviyo automatiškai įkelia ZIP vaizdus į savo CDN ir pakeičia jų nuorodas. Tai importo paketas; vien HTML įklijavimas į redaktorių penkių vaizdų neįkels. Importas į paskyrą ir testinis siuntimas neatlikti.

[Oficiali Klaviyo importo instrukcija](https://help.klaviyo.com/hc/en-us/articles/115005254068), patikrinta 2026-09-14. Šis importo būdas pašalina anksčiau aprašytą poreikį rankomis pakeisti penkių kūrybinių vaizdų adresus. Originalūs `newsletter.html` ir `klaviyo-block.html` palikti vietinei peržiūrai.

## Vietinės peržiūros failų vaizdai

`newsletter.html` vietinėje projekto kopijoje naudoja šiuos vaizdus. Galutinėse Klaviyo versijose jie jau pakeisti viešais HTTPS adresais:

1. `assets/brand/logo.png`.
2. `assets/hero/hero-final-v2.jpg`.
3. `assets/campaign/notes-a.jpg`.
4. `assets/campaign/notes-b.jpg`.
5. `assets/campaign/notes-c.jpg`.
6. `assets/products/p22.jpg`.
7. `assets/products/c44.jpg`.
8. `assets/products/x1.jpg`.
9. `assets/products/m12.jpg`.
10. `assets/products/b71.jpg`.
11. `assets/products/t15.jpg`.
12. `assets/closing/closing-final-v3.jpg`.

Logotipui ir šešiems oficialiems packshotams galima naudoti lentelėje pateiktus originalius HTTPS adresus. Pirminių scenų ir referencinio `samples.jpg` hostinti nereikia, nes jie tiesiogiai nerodomi laiške.

Naudojama Klaviyo žyma `{% unsubscribe_link %}`. HTML bloką dėti į 600 px pločio konteinerį be papildomų šoninių tarpų. Prieš siuntimą peržiūrėti realų platformos testinį laišką ir aktualias kainas. Kampanija neišsiųsta, gavėjai bei laikas nenustatyti.

UTM: `utm_source=klaviyo`, `utm_medium=email`, `utm_campaign=2026_09_pasimatymas_su_kvapu`. Produktų vaizdai / CTA ir pabaigos vaizdas / CTA turi atskiras `utm_content` reikšmes.

## Patikra

Atvaizduota vietiniame Chrome: 820 px ekranas su 600 px laišku, 390 px ir 320 px telefonai. Galutiniai aukščiai: 4555 / 5332 / 5132 px. Visur užsikrauna 12 vaizdų (apie 1,07 MB), horizontalus slinkimas neaptiktas. HTML dydis 28 739 baitai; visi vietiniai vaizdai egzistuoja. Patikrinta, kad visi šeši produktai turi 29,90 € kainą ir 30 ml talpą, lentelės pažymėtos `role="presentation"`. Po pirmos peržiūros telefone padidintas natų tekstas iki 13 px ir atlikta pakartotinė patikra. Naujos produktų ir pabaigos skiltys apžiūrėtos atskirai. Naršyklės patikra neatstoja tikro Klaviyo / Gmail / Outlook testinio laiško.

Naujo pabaigos vaizdo tiksli ImageGen užklausa saugoma `imagegen-closing-prompt.txt`; toliau – hero ir ingredientų užklausos.

## ImageGen užklausos

Naudotas integruotas `imagegen`. Žemiau pateikta tiksli hero užklausa; natų kadrų užklausos pateiktos po jos.

### Hero

```text
Use case: ads-marketing
Asset type: high-end vertical fragrance email hero photograph, portrait 1200 x 1440.
Primary request: Create a striking contemporary fragrance still-life advertising photograph for Nobren, vivid warm rose pink world, black perfume bottles and lush fragrance notes. It must feel like a real unified expensive studio photograph with sculptural art direction, playful and desirable, not a mockup or graphic collage.
Input images: Image 1 is the authoritative identity reference for Nobren P22, matte black rectangular bottle with elongated black wood-textured square cap, exact gold Nobren NP crowned crest and gold wordmark. Image 2 is the authoritative identity reference for Nobren X1, same exact gold-label black bottle and cap. Image 3 is the authoritative identity reference for Nobren B71, same geometry but a SILVER/WHITE Nobren crowned NP crest and wordmark. Keep geometry, cap shape, finish, lettering, logo and label placement very close to the real references. Do not bring over boxes, white backgrounds, floating round code badges, or ingredient collages from the reference images.
Composition: A beautiful bold portrait photograph, camera slightly above the tabletop, 80 mm product lens. Reserve the upper 32 percent as totally empty luminous matte rose pink wall, with subtle directional light, so I can add the headline later. In the lower 65 percent exactly THREE authentic Nobren perfume bottles form a dynamic asymmetrical triangle. Gold P22 stands at left rear on a low pale chartreuse angular plinth. Gold X1 is the dominant central foreground bottle, standing on the rose tabletop, sharply in focus. Silver B71 is at right, leaning gently 15 degrees against a low folded lavender acrylic slab, physically supported, label fully visible. The products have distinct depth, realistic scale and strong natural grounded shadows. Black bottles collectively fill at least 60 percent of canvas width, not tiny distant objects. Keep every cap and base visible. All three face mostly toward camera.
Fragrance notes arranged in the SAME physical scene: one juicy cut purple fig and a sculptural green fig leaf around left P22; a cut blood orange and a small restrained glossy amber caramel ribbon near central X1; two dark vanilla pods and one elegantly curled dry copper tobacco leaf near right B71. Use only these real fragrance cues, no cigarettes, cigars, pipes, glasses, smoke machines or fire.
Scene and lighting: Matte rose pink cyclorama wall flowing continuously into a glossy rose pink lacquer tabletop, dominant base color #F35482 with tactile luminous pink gradients, no horizon seam. Direct editorial flash from upper left, crisp assertive cast shadows to lower right, realistic glass reflections, premium details, high dynamic range, warm orange and fig colors with a small cool lilac counterpoint. Use sophisticated controlled highlights; no gold podiums, beige spa aesthetic, velvet, marble, arches, cosmic theme or conventional three matching boxes lineup.
Constraints: EXACTLY THREE BOTTLES, no boxes, no duplicates, no invented extra brand or cap shapes. Preserve the official logo/crest and package typography from reference. Do not add campaign headline, CTA, decorative writing or any extra text. Keep upper 32 percent clean. Main objects must be inside safe margins, no cut-off products. Photorealism, coherent shadows and perspective, no flat pasted cutouts.
```

### A

```text
Use case: ads-marketing
Asset type: square photographic ingredient image for a playful luxury fragrance blind-date email, no typography.
Primary request: an art-directed editorial macro still life of two ripe fresh purple figs, one cut in half exposing lush red pink flesh, and one sculptural fresh green fig leaf, with a small third slice. All arranged on a glossy pale chartreuse tabletop against a seamless pale chartreuse background (#E6EDBC). Bold, tactile, fresh, confident, modern independent perfume magazine aesthetic. Extremely realistic food botanical photography, direct afternoon studio flash, decisive crisp dark olive shadows cast diagonally behind, visible tiny dew droplets, richly detailed purple skin and translucent fig flesh. Objects occupy middle 78% of square, a dynamic diagonal composition seen from slightly above, generous narrow clean margins. Harmonious green and plum colors, no beige styling. No perfume bottle, packaging, logos, writing, numbers, cards, frames, human, cutlery or other ingredients. One cohesive physical still life, not a collage. Square 1024 x 1024.
```

### B

```text
Use case: ads-marketing
Asset type: square photographic ingredient image for a playful luxury fragrance blind-date email, no typography.
Primary request: an art-directed editorial macro still life with two halves of a blood orange exposing deep ruby flesh, a beautiful small flowing ribbon and puddle of glossy caramel amber sauce, and one cinnamon stick. Arranged on a buttery peach lacquer tabletop against seamless warm peach (#F4C8A7), bold and tactile, modern independent perfume magazine aesthetic. Extremely realistic botanical and confection still life photography, direct afternoon studio flash from upper left, decisive crisp burnt orange shadows, wet pulp sparkle and caramel viscosity. Objects occupy middle 78% of square in a striking asymmetric diagonal composition seen from slightly above with narrow clean margins. No perfume bottle, packaging, logos, writing, numbers, cards, frames, human, cutlery or other ingredients. One cohesive physical still life, not a collage. Square 1024 x 1024.
```

### C

```text
Use case: ads-marketing
Asset type: square photographic ingredient image for a playful luxury fragrance blind-date email, no typography.
Primary request: an art-directed editorial macro still life with one beautiful curled dry tobacco leaf in rich copper brown, three long black bourbon vanilla pods resting beside it, and one fine translucent sculptural curl of pale smoke rising behind them. Arranged on a glossy dusty lilac tabletop against a seamless muted lilac background (#D4C6DF). Bold tactile perfume ingredient photography, modern independent perfume magazine aesthetic. Extremely realistic high end studio photography, direct studio flash from upper left, decisive crisp purple shadows, tobacco veins and ridged vanilla pod texture rendered precisely. Objects occupy middle 78% of square in an elegant asymmetric composition seen from slightly above, narrow clean margins. Suggest warmth and aromatic depth rather than smoking activity. No cigarette, cigar, pipe, tobacco product packaging, person, perfume bottle, packaging, logos, writing, numbers, cards, frames or other ingredients. One cohesive physical still life, not a collage. Square 1024 x 1024.
```
