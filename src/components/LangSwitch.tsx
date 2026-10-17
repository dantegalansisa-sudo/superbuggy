import { Globe } from 'lucide-react';
import { useLang, type Lang } from '../i18n';

export default function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang" role="group" aria-label="Idioma / Language">
      <Globe size={16} aria-hidden="true" />
      {(['es', 'en'] as Lang[]).map((l) => (
        <button key={l} className={`lang__btn${lang === l ? ' is-active' : ''}`} onClick={() => setLang(l)} aria-pressed={lang === l} lang={l}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
