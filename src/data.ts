export type Tour = {
  id: string;
  name: string;
  image: string;
  text: string;
  tags: string[];
  featured?: boolean;
};

export const TOURS: Tour[] = [
  {
    id: 'buggy-rio',
    name: 'Buggy Río & Lodo',
    image: '/images/buggy-18-agua.webp',
    text: 'Ríos, charcos y senderos de tierra.',
    tags: ['Río', 'Lodo', 'Senderos'],
    featured: true,
  },
  {
    id: 'buggy-costa',
    name: 'Buggy Costa & Playa',
    image: '/images/buggy-playa.webp',
    text: 'Arena, mar y vista a los cruceros.',
    tags: ['Playa', 'Vistas', 'Costa'],
  },
  {
    id: 'four-wheel',
    name: 'Four Wheel 4x4',
    image: '/images/atv-rio.webp',
    text: 'Tu propio ATV por agua y montaña.',
    tags: ['ATV', 'Agua', 'Adrenalina'],
  },
  {
    id: 'buggy-grupo',
    name: 'Buggy en Grupo',
    image: '/images/buggies-rojos.webp',
    text: 'Caravana para amigos y familias.',
    tags: ['Grupos', 'Familia', 'Caravana'],
  },
];

export const EXPERIENCES = [
  { id: 'catamaran', name: 'Catamarán & fiesta en el mar', image: '/images/catamaran.webp' },
  { id: 'cascadas', name: 'Cascadas & toboganes naturales', image: '/images/cascada-tobogan.webp' },
  { id: 'cabalgata', name: 'Cabalgata', image: '/images/caballos.webp' },
  { id: 'monos', name: 'Parque de monos', image: '/images/monos-2.webp' },
  { id: 'playas', name: 'Playas paradisíacas', image: '/images/playa-grupo.webp' },
];

// Opciones para el selector de reservas
export const BOOKING_OPTIONS = [
  ...TOURS.map((t) => t.name),
  ...EXPERIENCES.map((e) => e.name),
  'Combo de aventuras',
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
