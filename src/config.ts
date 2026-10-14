// Datos de contacto del negocio. Editar aquí y se actualiza toda la web.
export const CONFIG = {
  brand: 'Super Buggies',
  phoneDisplay: '809-841-4125',
  phoneHref: 'tel:+18098414125',
  whatsapp: '18098414125',
  address: 'Calle Principal #2, Los Ciruelos, Montellano, Puerto Plata',
  mapQuery: 'Los Ciruelos, Montellano, Puerto Plata, República Dominicana',
  // Correo donde llegan las reservas del formulario (vía FormSubmit.co).
  // Mientras esté vacío, el formulario envía la solicitud por WhatsApp.
  // La primera vez que llegue un envío, FormSubmit manda un correo de activación a esta dirección.
  bookingEmail: '',
};

export const waLink = (text: string) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
