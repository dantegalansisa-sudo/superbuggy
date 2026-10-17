// Datos del negocio. Editar aquí y se actualiza toda la web (incluye sitemap y SEO).
export const CONFIG = {
  brand: 'Super Buggies',
  legalName: 'Victoriano Super Buggies S.R.L.',
  rnc: '132603761',
  siteUrl: 'https://www.superbuggyspop.com', // dominio oficial (superbuggyspop.com redirige aquí)
  phoneDisplay: '809-841-4125',
  phoneHref: 'tel:+18098414125',
  whatsapp: '18098414125',
  email: 'superbuggiesmaimonpop@gmail.com',
  address: 'Calle Principal #2, Los Ciruelos, Montellano, Puerto Plata',
  mapQuery: 'Los Ciruelos, Montellano, Puerto Plata, República Dominicana',
  // Las reservas se envían a esta función (api/booking.ts), que manda el correo con Resend.
  // El correo de destino y la clave se configuran en Vercel (BOOKING_TO, RESEND_API_KEY).
  bookingEndpoint: '/api/booking',
};

// Formas de pago
export const PAYMENTS = {
  // Usuario de PayPal.me (cuenta personal por ahora). Ej.: 'superbuggies' → https://paypal.me/superbuggies
  // Mientras esté vacío, el botón de PayPal pide el enlace de pago por WhatsApp.
  paypalMe: 'samaleej',
  // Nombre que ve el cliente en PayPal al pagar (cuenta personal)
  paypalName: 'Samalee Santos',
  // Porcentaje del depósito para asegurar el cupo (confirmar con el cliente)
  depositPercent: 50,
  bank: {
    name: 'Banco Popular Dominicano',
    holder: 'Victoriano Super Buggies S.R.L.',
    rnc: '132603761',
    accounts: [
      { currency: 'RD$', label: 'Cuenta en pesos (RD$)', number: '858812258' },
      { currency: 'US$', label: 'Cuenta en dólares (US$)', number: '858812415' },
    ],
  },
};

export const waLink = (text: string) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

export const paypalLink = (amount?: number) =>
  PAYMENTS.paypalMe ? `https://paypal.me/${PAYMENTS.paypalMe}${amount ? `/${amount}USD` : ''}` : '';
