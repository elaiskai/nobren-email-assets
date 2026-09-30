# Spalio 1 d. kampanijos Klaviyo nustatymai

Tai konkretus nustatymo planas prie paruošto HTML. Klaviyo paskyroje jis dar nepritaikytas. Kontaktai nenusiųsti, neištrinti ir neišjungti.

## 1. Kampanija ir auditorija

Pavadinimas: **Nobren | 2026-10-01 | Ar dar parašyti?**

Naudoti esamą miegantiems / neaktyviems skirtą segmentą, kuriame profiliai gali gauti el. pašto rinkodarą. Jo aktyvumo kriterijai šiame darbe nekeičiami. Naudoti `newsletter-klaviyo.html` importui arba `klaviyo-block.txt` vienam HTML blokui. Įrašyti README pateiktus subject ir preview line.

## 2. Mygtukas „TAIP, NORIU GAUTI LAIŠKUS“

Kode jau yra šis Klaviyo tagas:

```liquid
{% update_property_link 'nobren_keep_emails_20261001' 'yes' 'https://nobrenparfum.lt/lt/nauji-kvapai' %}
```

Klaviyo siunčiamame laiške jis įrašo pasirinkimą į gavėjo profilį ir nukreipia į Nobren naujienas. Išsaugoma tekstinė reikšmė `yes`, ne boolean. Tai konkrečios kampanijos pasirinkimo žyma; ji neatkuria panaikintos prenumeratos ir neturi panaikinti atsisakymo ar suppression. [Klaviyo dokumentacija](https://help.klaviyo.com/hc/en-us/articles/115005255248).

## 3. Laukimo laikas

**Siūlomas nustatymas — 7 pilnos dienos po faktinio siuntimo.** Vartotojui pateiktas klausimas dėl termino; kol atsakymo nėra, tai pasiūlymas, o ne patvirtintas ar sukonfigūruotas grafikas. Jei laiškas išsiunčiamas spalio 1 d., 7 dienų vertinimas galimas spalio 8 d. tuo pačiu laiku; siunčiant porcijomis skaičiuoti nuo paskutinės porcijos. Kampanija nesiunčiama automatiškai iš šio repo.

## 4. Kam po laukimo nebesiųsti

Pasirinkti tik realiai šią kampaniją gavusius profilius. Kriterijai visi kartu (**AND**):

1. Gali gauti el. pašto rinkodarą.
2. `Received Email` bent 1 kartą, filtras — būtent šios kampanijos ID.
3. `Opened Email` 0 kartų, filtras — tas pats kampanijos ID.
4. `Clicked Email` 0 kartų, filtras — tas pats kampanijos ID.
5. `nobren_keep_emails_20261001` nenustatyta **ARBA** reikšmė nėra `yes`.

Atidariusių, paspaudusių ar įrašytą `yes` turinčių profilių į šį segmentą neįtraukti. Paspaudimas turi apsaugoti gavėją ir tada, kai atidarymas neužfiksuotas. Filtruoti pagal tikrą naujos kampanijos ID, o ne bendrą istorinių laiškų kiekį. Atsisakymą visada gerbti, net jei anksčiau buvo įrašyta `yes`.

Atidarymų matavimas nėra tikslus žmogaus perskaitymo įrodymas, todėl vien atidarymo kriterijumi nesiūloma remtis be paspaudimo ir pasirinkimo žymos.

## 5. Kaip sustabdyti tolesnį siuntimą

Po laukimo patikrintam neatsiliepusių gavėjų segmentui Klaviyo naudoti **Suppress current members**. Taip profiliai išjungiami el. pašto rinkodarai, išsaugant istoriją. Vien profilio savybė ar segmento sukūrimas siuntimo nesustabdo. Segmento atsisakymus Klaviyo apdoroja savo atsisakymo nuoroda. [Klaviyo sąrašo valymo instrukcija](https://help.klaviyo.com/hc/en-us/articles/360044054732).

Jei vėliau šią logiką perkelsite į sunset flow, laukimą ir Opened / Clicked filtrus reikia nustatyti pačiame flow, o pažymėtiems profiliams vis tiek pritaikyti realų suppression arba nuolatinį išskyrimą. [Klaviyo sunset flow instrukcija](https://help.klaviyo.com/hc/en-us/articles/360017518492).

## 6. Funkcinis mygtuko patikrinimas

Prieš siuntimą auditorijai patikrinti su savo testiniu prenumeratoriaus profiliu: tikrame Klaviyo laiške paspaudus mygtuką turi atsirasti `nobren_keep_emails_20261001 = yes` ir atsidaryti naujienų puslapis. Klaviyo Preview režimas šios savybės neatnaujina; reikia asmeninio testinio laiško. Šiame darbe toks siuntimas neatliktas. [Oficiali testavimo instrukcija](https://help.klaviyo.com/hc/en-us/articles/115005255248).

Įsitikinti, kad tikrai paspaudęs / atidaręs testinis profilis neatitinka 4 žingsnio segmento, o kampanijos negavęs profilis į jį apskritai nepatenka.
