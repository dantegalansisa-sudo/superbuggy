import { useMemo } from 'react';
import { useLang } from '../i18n';
import { EXCURSIONS, GALLERY, HERO_SLIDES, type Excursion } from '../data';
import { EXCURSIONS_EN } from './excursions.en';

const GALLERY_ALT_EN: Record<string, string> = {
  '/images/buggy-crucero.webp': 'Buggy in front of a cruise ship in Puerto Plata',
  '/images/grupo-buggies.webp': 'Group celebrating after the buggy tour',
  '/images/cascada-grupo.webp': 'Group in life vests at the waterfalls',
  '/images/atv-luces.webp': 'ATV crossing the river',
  '/images/barco-grupo.webp': 'Friends on the bow of the boat',
  '/images/monos-grupo.webp': 'Group at the monkey park',
  '/images/hero.webp': 'Green buggy splashing through the river',
  '/images/hero-2.webp': 'Buggy number 18 driving through the water',
  '/images/hero-3.webp': 'ATV crossing the river with its lights on',
  '/images/hero-4.webp': 'Buggy in front of a cruise ship in Puerto Plata',
};

// Catálogo en el idioma activo: misma estructura, textos traducidos
export function useCatalog() {
  const { lang } = useLang();
  return useMemo(() => {
    const en = lang === 'en';
    const all: Excursion[] = EXCURSIONS.map((e) => (en ? { ...e, ...EXCURSIONS_EN[e.slug] } : e));
    const alt = <T extends { src: string; alt: string }>(item: T): T => (en && GALLERY_ALT_EN[item.src] ? { ...item, alt: GALLERY_ALT_EN[item.src] } : item);
    return {
      all,
      tours: all.filter((e) => e.category === 'buggy'),
      experiences: all.filter((e) => e.category === 'aventura'),
      find: (slug?: string) => all.find((e) => e.slug === slug),
      bookingOptions: [...all.map((e) => e.name), en ? 'Adventure combo' : 'Combo de aventuras'],
      gallery: GALLERY.map(alt),
      heroSlides: HERO_SLIDES.map(alt),
    };
  }, [lang]);
}
