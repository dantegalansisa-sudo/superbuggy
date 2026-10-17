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
  schedule?: string; // horarios de salida
  priceUSD?: number; // vacío = "Consultar precio"
  priceUnit?: string; // por defecto 'por persona'
  priceBasis?: 'person' | 'buggy'; // cómo se cuenta el total: por persona (defecto) o por buggy doble
  // Tipos de vehículo con su precio (ej. buggy de 2 y de 4 personas). Si existen, el cliente elige cantidades de cada uno.
  options?: { id: string; label: string; unit: string; seats: number; priceUSD: number }[];
  note?: string; // aviso destacado (ofertas, condiciones)
  includes: string[];
  bring: string[];
  highlights: string[];
  featured?: boolean;
};

const LOCAL_NOTE = 'Reservando por la web te incluimos los lentes. ¿Eres cliente local? Pregunta por nuestras ofertas.';
const WEB_GOGGLES = 'Lentes protectores (incluidos al reservar por la web)';

export const EXCURSIONS: Excursion[] = [
  {
    slug: 'buggy-maimon-playa-teco',
    name: 'Buggy Maimón Guzmancito & Playa Teco',
    category: 'buggy',
    image: '/images/buggy-18-agua.webp',
    gallery: ['/images/buggy-18-agua.webp', '/images/buggy-rio.webp', '/images/buggies-rojos.webp', '/images/buggy-naranja.webp', '/images/grupo-buggies.webp'],
    short: 'Charcos, lodo, caminos rocosos y Playa Teco.',
    description:
      'Nuestra aventura comienza en Maimón Guzmancito: conducirás por charcos de agua, lodo, polvo y caminos rocosos llenos de adrenalina. Haremos una parada en una casa tradicional dominicana con café, agua, frutas frescas y un shot de mamajuana (hay baño y puedes comprar accesorios locales). Luego seguimos hacia Playa Teco, con tiempo para bañarte, caminar, relajarte y, si quieres, comprar comida. Al final regresamos para concluir la excursión.',
    tags: ['Lodo', 'Casa típica', 'Playa Teco'],
    duration: '2 horas y 30 minutos',
    schedule: 'Salidas en la mañana y en la tarde, todos los días de 8:00 a. m. a 6:00 p. m.',
    priceUSD: 44,
    priceUnit: 'por persona',
    options: [
      { id: 'buggy-2', label: 'Buggy para 2 personas', unit: 'por buggy', seats: 2, priceUSD: 99 },
      { id: 'buggy-4', label: 'Buggy para 4 personas', unit: 'por buggy (US$44 por persona)', seats: 4, priceUSD: 176 },
    ],
    note: LOCAL_NOTE,
    includes: [
      'Buggy 4x4 para 2 o 4 personas',
      'Casco protector',
      WEB_GOGGLES,
      'Agua potable',
      'Instrucciones de seguridad y explicación de manejo antes de salir',
      'Café, frutas frescas y agua en la casa tradicional',
      'Shot de mamajuana',
      'Parada en Playa Teco',
    ],
    bring: ['Ropa y calzado que no te importe ensuciar o mojar', 'Traje de baño', 'Protector solar', 'Toalla', 'Dinero si quieres comprar comida o accesorios'],
    highlights: ['Buggy para 2 o 4 personas', 'Charcos, lodo y caminos rocosos', 'Casa tradicional dominicana', 'Baño en Playa Teco'],
    featured: true,
  },
  {
    slug: 'four-wheel-4x4',
    name: 'Four Wheel 4x4',
    category: 'buggy',
    image: '/images/atv-rio.webp',
    gallery: ['/images/atv-rio.webp', '/images/atv-luces.webp', '/images/atv-playa.webp'],
    short: 'El mismo recorrido en tu propio ATV.',
    description:
      'El recorrido de Maimón Guzmancito y Playa Teco, pero manejando tu propio four wheel: charcos, lodo y caminos rocosos, parada en la casa tradicional dominicana con café, frutas y mamajuana, y tiempo para disfrutar Playa Teco. Ideal si quieres manejar solo.',
    tags: ['ATV', 'Lodo', 'Playa Teco'],
    duration: '2 horas y 30 minutos',
    schedule: 'Salidas en la mañana y en la tarde, todos los días de 8:00 a. m. a 6:00 p. m.',
    priceUSD: 69,
    note: LOCAL_NOTE,
    includes: ['Four wheel (ATV / quad) individual', 'Casco protector', WEB_GOGGLES, 'Agua potable', 'Instrucciones de seguridad antes de salir', 'Café, frutas y shot de mamajuana en la casa tradicional', 'Parada en Playa Teco'],
    bring: ['Ropa y calzado que no te importe ensuciar o mojar', 'Traje de baño', 'Protector solar', 'Toalla'],
    highlights: ['ATV individual', 'Charcos, lodo y caminos rocosos', 'Casa tradicional dominicana', 'Playa Teco'],
  },
  {
    slug: 'party-boat',
    name: 'Party boat: fiesta en el mar',
    category: 'aventura',
    image: '/images/catamaran.webp',
    gallery: ['/images/catamaran.webp', '/images/catamaran-piscina.webp', '/images/barco-fiesta.webp', '/images/barco-tobogan.webp', '/images/barco-amigos.webp'],
    short: '4 horas con BBQ y barra libre.',
    description:
      'Cuatro horas navegando la costa de Puerto Plata con música, BBQ y barra libre, y paradas para nadar en aguas turquesa. El plan perfecto para celebrar con amigos o cerrar tus vacaciones.',
    tags: ['Mar', 'BBQ', 'Open bar'],
    duration: '4 horas',
    priceUSD: 99,
    includes: ['Paseo en barco de 4 horas', 'BBQ', 'Barra libre (open bar)', 'Música a bordo', 'Paradas para nadar', 'Tripulación'],
    bring: ['Traje de baño', 'Toalla', 'Protector solar', 'Gafas de sol'],
    highlights: ['BBQ a bordo', 'Barra libre', 'Tobogán al mar', 'Ambiente de fiesta'],
  },
  {
    slug: 'cascadas-toboganes',
    name: 'Cascadas & toboganes naturales',
    category: 'aventura',
    image: '/images/cascada-tobogan.webp',
    gallery: ['/images/cascada-tobogan.webp', '/images/cascada-grupo.webp', '/images/cascada-salto.webp'],
    short: 'Medio día con almuerzo y transporte.',
    description:
      'Sube por el río entre cascadas y lánzate por toboganes naturales de roca. Una experiencia refrescante en plena selva, con chaleco y casco y guías que conocen cada salto.',
    tags: ['Cascadas', 'Saltos', 'Naturaleza'],
    duration: 'Medio día',
    priceUSD: 59,
    includes: ['Recogida y regreso al puerto o tu hotel', 'Entrada al parque', 'Almuerzo', 'Bebidas', 'Chaleco y casco', 'Guía local'],
    bring: ['Traje de baño', 'Calzado para agua', 'Muda de ropa', 'Toalla'],
    highlights: ['Toboganes naturales', 'Saltos al agua', 'Senderos en la selva', 'Fotos en las cascadas'],
  },
  {
    slug: 'pesca-de-altura',
    name: 'Pesca de altura',
    category: 'aventura',
    image: '/images/barco-proa.webp',
    gallery: ['/images/barco-proa.webp', '/images/barco-amigos.webp', '/images/catamaran-2.webp'],
    short: 'Mar abierto con snacks y bebidas.',
    description:
      'Sal a mar abierto frente a la costa de Puerto Plata a pescar con tripulación local. Snacks y bebidas a bordo para disfrutar la jornada, tengas o no experiencia pescando.',
    tags: ['Pesca', 'Mar abierto', 'Bebidas'],
    priceUSD: 99,
    includes: ['Salida en bote de pesca', 'Equipo de pesca', 'Snacks', 'Cerveza y refrescos', 'Cuba libre', 'Tripulación'],
    bring: ['Protector solar', 'Gorra', 'Gafas de sol', 'Pastilla para el mareo si la necesitas'],
    highlights: ['Mar abierto', 'Apto para principiantes', 'Bebidas a bordo', 'Ideal para grupos'],
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
