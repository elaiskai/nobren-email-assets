# Nobren - Abandoned CART flow (keičia buvusį checkout flow'ą)

Adaptuota iš `checkout/checkout-email1.html` + `checkout-email2.html` (2026-09-14).
Checkout flow'as nebenaudojamas, bet senos rinkmenos `checkout/` palikti kaip backup.

## Failai

| Laiškas | Failas | Raw URL Klaviyo Code editoriui |
|---|---|---|
| Cart #1 | `cart/cart-email1.html` | `https://raw.githubusercontent.com/elaiskai/nobren-email-assets/main/cart/cart-email1.html` |
| Cart #2 | `cart/cart-email2.html` | `https://raw.githubusercontent.com/elaiskai/nobren-email-assets/main/cart/cart-email2.html` |

## Subject + preheader

| # | Subject | Preheader |
|---|---|---|
| 1 | Jūsų krepšelyje liko prekių | Grįžkite prie pasirinktų kvepalų ir užbaikite pirkimą. |
| 2 | Dvejojate dėl kvapo? | Išbandykite 5 mėginėlius po 5 ml už 22,50 EUR. |

## Klaviyo flow setup

- **Trigger:** `Added to Cart` (PrestaShop metrika, NE Shopify - Shopify metrikos Nobren paskyroje tuščios)
- **Flow filter:** has not `Placed Order` (PrestaShop, id `W3TNbT`) since starting this flow
  - `Started Checkout` NEfiltruoti - checkout flow'as išjungiamas, todėl cart flow turi padengti ir tuos, kurie nuėjo iki checkout
- **Delay:** #1 po 4 val. → #2 po dar 20 val. (viso ~24 val.)
- **Smart sending:** ON
- **HTML:** kelti TIK per Code / Import HTML editorių (drag&drop išmeta `<head>` → dingsta fontai ir media queries)

## ⚠️ Prieš paleidžiant - token check

Produktų loop'as paveldėtas iš `Started Checkout` metrikos (`XdiD5K`), kur patvirtinti laukai:

```
{% for item in event.extra.line_items %}
  {{ item.ProductInfo.name }}
  {{ item.Image }}
  {{ item.Quantity }}
  {{ item.ProductURL }}
  {{ item.ProductInfo.price_with_reduction|floatformat:2 }}   ← kaina SU PVM
{% endfor %}
```

`Added to Cart` event'o payload gali skirtis. Klaviyo preview su realiu profiliu patikrinti,
ar loop'as užsipildo; jei ne - pakeisti laukų pavadinimus abiejuose failuose (pažymėta
`TOKEN CHECK` komentaru).

CTA nuoroda turi fallback'ą: `{% if event.CheckoutURL %}...{% else %}https://nobrenparfum.lt/lt/krepselis{% endif %}` -
jei cart event'as turi savo atkūrimo nuorodą, ją reikia įrašyti vietoj `event.CheckoutURL`.

## Patikrinta gyvai (2026-09-14)

- `https://nobrenparfum.lt/lt/krepselis` = krepšelio URL (tuščias krepšelis redirectina į pradinį)
- Mėginėlių rinkiniai TOP Gaivūs / Saldūs / Stiprūs - visi 22,50 EUR, nuotraukos 200 OK
