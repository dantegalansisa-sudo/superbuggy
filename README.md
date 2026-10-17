# Super Buggies · Website

Website for **Super Buggies** (Victoriano Super Buggies S.R.L.): buggy, four wheel and adventure tours in Puerto Plata, Dominican Republic.

**Stack:** React + TypeScript + Vite + Framer Motion + React Router · Deployed on Vercel

```bash
npm install
npm run dev
npm run build   # also generates sitemap.xml and robots.txt
```

## Where to edit

| What | File |
|---|---|
| Phone, WhatsApp, email, address, RNC, site domain | `src/config.ts` (`CONFIG`) |
| PayPal.me user and bank accounts | `src/config.ts` (`PAYMENTS`) |
| Excursions: name, photos, description, includes, duration, price | `src/data.ts` (`EXCURSIONS`) |
| Hero carousel photos | `src/data.ts` (`HERO_SLIDES`) |
| Site copy (Spanish) | `src/i18n/es.ts` |
| Privacy policy and terms | `src/content/legal.ts` |

## Pages

- `/`: home
- `/excursiones/<slug>`: one page per excursion (generated from `EXCURSIONS`)
- `/formas-de-pago`: PayPal and bank transfer
- `/terminos` and `/privacidad`: legal pages

To add an excursion, append an object to `EXCURSIONS`. Its page, the booking selector, the footer and the sitemap update automatically. Leave `priceUSD` empty to show "Consultar precio".

## Bookings and payments

- The form sends the booking to `bookingEmail` through [FormSubmit](https://formsubmit.co). The first submission sends an activation email that must be confirmed once. The customer can also confirm by WhatsApp.
- **PayPal:** set `PAYMENTS.paypalMe` and the button links to `paypal.me/<user>`. While it is empty, the button asks for a payment link on WhatsApp.
- **Transfer:** Banco Popular accounts in RD$ and US$, with a copy button and a "send receipt" shortcut to WhatsApp.

## SEO

- `sitemap.xml` and `robots.txt` are generated at build time from `CONFIG.siteUrl` and the excursion list. Change `siteUrl` when the final domain is connected.
- Every page sets its own title, description, canonical and Open Graph tags (`src/hooks/useSeo.ts`).
- Structured data: `TravelAgency` in `index.html` and `TouristTrip` on each excursion page.
- `vercel.json` rewrites routes to the SPA so direct links and refreshes work.
