// Catálogo de excursiones. Cada una tiene su propia página en /excursiones/<slug>.
// ⚠️ Contenido de ejemplo: duración, precios, "incluye" y descripciones se reemplazan con la info real del cliente.
// Para agregar una excursión nueva basta con añadir un objeto a EXCURSIONS (la web, el menú de reservas y el sitemap se actualizan solos).

export type Excursion = {
  slug: string;
  name: string;
  category: 'buggy' | 'aventura';
  image: string; // portada (tarjetas)
  gallery: string[]; // fotos de la página de detalle
  short: string; // una línea para la tarjeta
  description: string; // párrafo de la página de detalle
  tags: string[];
  duration?: string; // ej. '3 horas'
  priceUSD?: number; // precio por persona; vacío = "Consultar precio"
  includes: string[];
  bring: string[];
  highlights: string[];
  featured?: boolean;
};

const BRING_DEFAULT = ['Ropa que se pueda ensuciar o mojar', 'Gafas de sol', 'Protector solar', 'Muda de ropa'];

export const EXCURSIONS: Excursion[] = [
  {
    slug: 'buggy-rio-lodo',
    name: 'Buggy Río & Lodo',
    category: 'buggy',
    image: '/images/buggy-18-agua.webp',
    gallery: ['/images/buggy-18-agua.webp', '/images/buggy-rio.webp', '/images/buggies-rojos.webp', '/images/grupo-buggies.webp'],
    short: 'Ríos, charcos y senderos de tierra.',
    description:
      'El tour más buscado: maneja tu propio buggy por caminos rurales de Puerto Plata, cruza ríos y atraviesa charcos de lodo con un guía local acompañando al grupo. Pura adrenalina y paisajes de campo dominicano.',
    tags: ['Río', 'Lodo', 'Senderos'],
    includes: ['Buggy 4x4', 'Casco y gafas', 'Guía local', 'Full insurance', 'Agua'],
    bring: BRING_DEFAULT,
    highlights: ['Cruce de ríos', 'Caminos de lodo', 'Paisajes rurales', 'Fotos en ruta'],
    featured: true,
  },
  {
    slug: 'buggy-costa-playa',
    name: 'Buggy Costa & Playa',
    category: 'buggy',
    image: '/images/buggy-playa.webp',
    gallery: ['/images/buggy-playa.webp', '/images/buggy-crucero.webp', '/images/buggy-crucero-2.webp'],
    short: 'Arena, mar y vista a los cruceros.',
    description:
      'Recorre la costa de Puerto Plata en buggy: arena, brisa del Atlántico y vistas a los cruceros que llegan a la bahía. Una ruta más tranquila, ideal para parejas y familias.',
    tags: ['Playa', 'Vistas', 'Costa'],
    includes: ['Buggy 4x4', 'Casco y gafas', 'Guía local', 'Full insurance', 'Parada en la playa'],
    bring: [...BRING_DEFAULT, 'Traje de baño'],
    highlights: ['Manejo en la arena', 'Vista a los cruceros', 'Parada para fotos', 'Baño en la playa'],
  },
  {
    slug: 'four-wheel-4x4',
    name: 'Four Wheel 4x4',
    category: 'buggy',
    image: '/images/atv-rio.webp',
    gallery: ['/images/atv-rio.webp', '/images/atv-luces.webp', '/images/atv-playa.webp'],
    short: 'Tu propio ATV por agua y montaña.',
    description:
      'Un four wheel solo para ti. Sube por caminos de montaña, cruza el río y siente la velocidad en cada curva. Perfecto para quien quiere manejar en solitario.',
    tags: ['ATV', 'Agua', 'Adrenalina'],
    includes: ['Four wheel 4x4', 'Casco', 'Guía local', 'Full insurance', 'Agua'],
    bring: BRING_DEFAULT,
    highlights: ['ATV individual', 'Cruce de ríos', 'Caminos de montaña', 'Playa'],
  },
  {
    slug: 'buggy-en-grupo',
    name: 'Buggy en Grupo',
    category: 'buggy',
    image: '/images/buggies-rojos.webp',
    gallery: ['/images/buggies-rojos.webp', '/images/buggy-naranja.webp', '/images/grupo-buggies.webp', '/images/buggy-polvo.webp'],
    short: 'Caravana para amigos y familias.',
    description:
      'Organizamos caravanas de buggies para grupos de amigos, familias, empresas y celebraciones. Armamos la ruta según el grupo y la edad de los participantes.',
    tags: ['Grupos', 'Familia', 'Caravana'],
    includes: ['Buggies para el grupo', 'Cascos y gafas', 'Guías locales', 'Full insurance', 'Ruta a la medida'],
    bring: BRING_DEFAULT,
    highlights: ['Precio especial por grupo', 'Buggies de 2 y 4 plazas', 'Ideal para celebraciones', 'Fotos del grupo'],
  },
  {
    slug: 'catamaran-fiesta',
    name: 'Catamarán & fiesta en el mar',
    category: 'aventura',
    image: '/images/catamaran.webp',
    gallery: ['/images/catamaran.webp', '/images/catamaran-piscina.webp', '/images/barco-fiesta.webp', '/images/barco-tobogan.webp', '/images/barco-amigos.webp'],
    short: 'Mar turquesa, música y snorkel.',
    description:
      'Navega la costa de Puerto Plata en catamarán con música, bebidas y paradas para nadar en aguas turquesa. El plan perfecto para celebrar o descansar después del buggy.',
    tags: ['Mar', 'Fiesta', 'Snorkel'],
    includes: ['Paseo en catamarán', 'Música a bordo', 'Paradas para nadar', 'Tripulación'],
    bring: ['Traje de baño', 'Toalla', 'Protector solar', 'Gafas de sol'],
    highlights: ['Aguas turquesa', 'Tobogán al mar', 'Ambiente de fiesta', 'Ideal para grupos'],
  },
  {
    slug: 'cascadas-toboganes',
    name: 'Cascadas & toboganes naturales',
    category: 'aventura',
    image: '/images/cascada-tobogan.webp',
    gallery: ['/images/cascada-tobogan.webp', '/images/cascada-grupo.webp', '/images/cascada-salto.webp'],
    short: 'Saltos y toboganes de roca natural.',
    description:
      'Sube por el río entre cascadas y lánzate por toboganes naturales de roca. Una experiencia refrescante en plena selva, con chaleco y casco y guías que conocen cada salto.',
    tags: ['Cascadas', 'Saltos', 'Naturaleza'],
    includes: ['Chaleco salvavidas', 'Casco', 'Guía local', 'Transporte a la entrada'],
    bring: ['Traje de baño', 'Calzado para agua', 'Muda de ropa', 'Toalla'],
    highlights: ['Toboganes naturales', 'Saltos al agua', 'Senderos en la selva', 'Fotos en las cascadas'],
  },
  {
    slug: 'cabalgata',
    name: 'Cabalgata',
    category: 'aventura',
    image: '/images/caballos.webp',
    gallery: ['/images/caballos.webp'],
    short: 'A caballo por senderos de campo.',
    description:
      'Paseo a caballo por senderos de campo y montaña, a un ritmo tranquilo y con caballos mansos. Apta para principiantes y familias.',
    tags: ['Caballos', 'Campo', 'Familia'],
    includes: ['Caballo', 'Guía local', 'Agua'],
    bring: ['Pantalón largo', 'Calzado cerrado', 'Protector solar', 'Gorra'],
    highlights: ['Caballos mansos', 'Apto para principiantes', 'Paisajes de montaña', 'Ritmo tranquilo'],
  },
  {
    slug: 'parque-de-monos',
    name: 'Parque de monos',
    category: 'aventura',
    image: '/images/monos-2.webp',
    gallery: ['/images/monos-2.webp', '/images/monos-1.webp', '/images/monos-3.webp', '/images/monos-grupo.webp'],
    short: 'Monos ardilla en tus hombros.',
    description:
      'Visita el parque donde los monos ardilla se suben a tus hombros para comer. Una experiencia divertida para niños y adultos, ideal para combinar con el buggy.',
    tags: ['Monos', 'Niños', 'Fotos'],
    includes: ['Entrada al parque', 'Comida para los monos', 'Guía'],
    bring: ['Cámara o celular', 'Ropa cómoda', 'Protector solar'],
    highlights: ['Contacto con los monos', 'Ideal para niños', 'Fotos únicas', 'Combinable con buggy'],
  },
  {
    slug: 'playas',
    name: 'Playas paradisíacas',
    category: 'aventura',
    image: '/images/playa-grupo.webp',
    gallery: ['/images/playa-grupo.webp', '/images/atv-playa.webp', '/images/barco-proa.webp'],
    short: 'Arena blanca y agua cristalina.',
    description:
      'Te llevamos a las mejores playas de la costa norte para nadar, relajarte y disfrutar del Caribe dominicano. Se puede combinar con buggy o four wheel.',
    tags: ['Playa', 'Relax', 'Caribe'],
    includes: ['Transporte a la playa', 'Guía local', 'Tiempo libre para nadar'],
    bring: ['Traje de baño', 'Toalla', 'Protector solar', 'Gafas de sol'],
    highlights: ['Agua cristalina', 'Arena blanca', 'Tiempo para relajarte', 'Combinable con buggy'],
  },
];

export const TOURS = EXCURSIONS.filter((e) => e.category === 'buggy');
export const EXPERIENCES = EXCURSIONS.filter((e) => e.category === 'aventura');
export const findExcursion = (slug?: string) => EXCURSIONS.find((e) => e.slug === slug);
export const excursionPath = (slug: string) => `/excursiones/${slug}`;

// Opciones para el selector de reservas
export const BOOKING_OPTIONS = [...EXCURSIONS.map((e) => e.name), 'Combo de aventuras'];

// Fotos del carrusel del hero
export const HERO_SLIDES = [
  { src: '/images/hero.webp', alt: 'Buggy verde cruzando el río entre salpicaduras' },
  { src: '/images/hero-2.webp', alt: 'Buggy número 18 atravesando el agua' },
  { src: '/images/hero-3.webp', alt: 'Four wheel cruzando el río con luces encendidas' },
  { src: '/images/hero-4.webp', alt: 'Buggy frente a un crucero en Puerto Plata' },
];

// Orden pensado para que la rejilla (4 columnas, altas = 2 filas) cierre sin huecos: T S S T / S S
export const GALLERY = [
  { tall: true, src: '/images/buggy-crucero.webp', alt: 'Buggy frente a un crucero en Puerto Plata' },
  { src: '/images/grupo-buggies.webp', alt: 'Grupo celebrando después del tour de buggies' },
  { src: '/images/cascada-grupo.webp', alt: 'Grupo con chalecos en las cascadas' },
  { tall: true, src: '/images/atv-luces.webp', alt: 'Four wheel cruzando el río' },
  { src: '/images/barco-grupo.webp', alt: 'Amigos en la proa del barco' },
  { src: '/images/monos-grupo.webp', alt: 'Grupo en el parque de monos' },
];
