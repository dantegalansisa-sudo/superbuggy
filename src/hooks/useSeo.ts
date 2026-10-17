import { useEffect } from 'react';
import { CONFIG } from '../config';
import { useLang } from '../i18n';

type Seo = { title: string; description: string; path: string; image?: string };

const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
};

const setLink = (rel: string, href: string, hreflang?: string) => {
  const sel = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(sel);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
};

// Título, descripción, canonical, hreflang (es/en) y Open Graph por página.
// Cada idioma tiene su propia URL: <ruta>?lang=es y <ruta>?lang=en
export function useSeo({ title, description, path, image = '/images/hero.webp' }: Seo) {
  const { lang } = useLang();
  useEffect(() => {
    const base = CONFIG.siteUrl + path;
    const url = `${base}?lang=${lang}`;
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', CONFIG.siteUrl + image);
    setMeta('property', 'og:locale', lang === 'en' ? 'en_US' : 'es_DO');
    setLink('canonical', url);
    setLink('alternate', `${base}?lang=es`, 'es');
    setLink('alternate', `${base}?lang=en`, 'en');
    setLink('alternate', base, 'x-default');
  }, [title, description, path, image, lang]);
}
