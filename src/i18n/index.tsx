import { createContext, useContext, useState, type ReactNode } from 'react';
import es, { type Dict } from './es';

export type Lang = 'es' | 'en';

// Idiomas disponibles. 'en' se activará cuando exista en.ts.
const dictionaries: Partial<Record<Lang, Dict>> = { es };

export const isLangReady = (l: Lang) => Boolean(dictionaries[l]);

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => boolean };

const LangContext = createContext<Ctx>({ lang: 'es', t: es, setLang: () => false });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');
  const setLang = (l: Lang) => {
    if (!isLangReady(l)) return false;
    setLangState(l);
    document.documentElement.lang = l;
    return true;
  };
  return (
    <LangContext.Provider value={{ lang, t: dictionaries[lang] ?? es, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
