import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import es, { type Dict } from './es';
import en from './en';

export type Lang = 'es' | 'en';

const dictionaries: Record<Lang, Dict> = { es, en };
const STORAGE_KEY = 'sb-lang';

// Idioma inicial: el elegido antes por el visitante; si no hay, el del navegador (turistas en inglés); por defecto español
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    /* almacenamiento no disponible */
  }
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : navigator.language ? 'en' : 'es';
}

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void };

const LangContext = createContext<Ctx>({ lang: 'es', t: es, setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* almacenamiento no disponible */
    }
  };

  return <LangContext.Provider value={{ lang, t: dictionaries[lang], setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
