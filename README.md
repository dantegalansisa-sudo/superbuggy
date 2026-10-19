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
| Site copy (Spanish / English) | `src/i18n/es.ts` / `src/i18n/en.ts` |
| Excursion text in English | `src/content/excursions.en.ts` |
| Privacy policy and terms (ES / EN) | `src/content/legal.ts` / `src/content/legal.en.ts` |

## Pages

- `/`: home
- `/excursiones/<slug>`: one page per excursion (generated from `EXCURSIONS`)
- `/formas-de-pago`: PayPal and bank transfer
- `/terminos` and `/privacidad`: legal pages

To add an excursion, append an object to `EXCURSIONS`. Its page, the booking selector, the footer and the sitemap update automatically. Leave `priceUSD` empty to show "Consultar precio".

## Languages

The site is fully bilingual (ES/EN switch in the menu). The first visit uses the browser language (Spanish if the browser is in Spanish, English otherwise) and the visitor's choice is remembered. Prices, photos and durations live only in `data.ts`; the English files hold just the text.

## Bookings and payments

- Booking emails are sent by `api/booking.ts` with Resend (`RESEND_API_KEY`, `RESEND_FROM`, `BOOKING_TO`, `SEND_CUSTOMER_EMAIL` in Vercel).
- **PayPal:** set `PAYMENTS.paypalMe` and the button links to `paypal.me/<user>`. While it is empty, the button asks for a payment link on WhatsApp.
- **Transfer:** Banco Popular accounts in RD$ and US$, with a copy button and a "send receipt" shortcut to WhatsApp.

## PayPal business gateway

Card and PayPal payments run through server functions; the amount is always computed on the server.

| File | Purpose |
|---|---|
| `api/paypal/config.ts` | Tells the site whether the gateway is on and returns the public Client ID |
| `api/paypal/create-order.ts` | Creates the order with the amount computed from `api/_lib/prices.ts` |
| `api/paypal/capture-order.ts` | Captures the payment and emails the booking marked as paid |
| `api/_lib/prices.ts` | Server prices. The build fails if they don't match `src/data.ts` |

Environment variables in Vercel (Production):

- `PAYPAL_CLIENT_ID`: Client ID of the business account app
- `PAYPAL_CLIENT_SECRET`: Secret of the app (server only)
- `PAYPAL_ENV`: `sandbox` for testing, `live` for real payments

While these are missing, the "Card or PayPal" option falls back to the PayPal.me link. Bank transfer takes the customer to `/formas-de-pago#transferencia` with the booking code and amount, and cash bookings are emailed directly.

## Reviews and customer videos

- `src/content/reviews.ts`: selected Google reviews (`REVIEWS`) and the rating summary.
- `CUSTOMER_VIDEOS` in the same file: add `{ src, poster, name, caption }` entries (files in `public/videos`). The section stays hidden while the list is empty.

## SEO

- `sitemap.xml` and `robots.txt` are generated at build time from `CONFIG.siteUrl` and the excursion list. Change `siteUrl` when the final domain is connected.
- Every page sets its own title, description, canonical and Open Graph tags (`src/hooks/useSeo.ts`).
- Structured data: `TravelAgency` in `index.html` and `TouristTrip` on each excursion page.
- `vercel.json` rewrites routes to the SPA so direct links and refreshes work.
