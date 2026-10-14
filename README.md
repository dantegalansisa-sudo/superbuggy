# Super Buggies · Web demo

Website for **Super Buggies**: buggy, four wheel and adventure tours in Puerto Plata, Dominican Republic.

**Stack:** React + TypeScript + Vite + Framer Motion

## Development

```bash
npm install
npm run dev
npm run build
```

## Where to edit

| What | File |
|---|---|
| Phone, WhatsApp, address, booking email | `src/config.ts` |
| All site copy (Spanish) | `src/i18n/es.ts` |
| Tours, experiences and gallery | `src/data.ts` |
| Optimized images and videos | `public/images`, `public/videos` |

## Booking form

- With `bookingEmail` empty in `src/config.ts`, the form opens WhatsApp (809-841-4125) with the booking details already filled in.
- Once you put the business email in `bookingEmail`, bookings arrive by email through [FormSubmit](https://formsubmit.co). The first submission sends an activation email that you have to confirm once.

## Languages

The site is in Spanish. The ES/EN switch is already in the menu. To turn on English, create `src/i18n/en.ts` with the same structure as `es.ts` and register it in `src/i18n/index.tsx`.
