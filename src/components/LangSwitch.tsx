import { Globe } from 'lucide-react';
import { useLang, type Lang } from '../i18n';
import { useToast } from './Toast';

export default function LangSwitch() {
  const { lang, setLang, t } = useLang();
  const toast = useToast();
  const choose = (l: Lang) => {
    if (!setLang(l)) toast(t.nav.langSoon);
  };
  return (
    <div className="lang" role="group" aria-label="Idioma / Language">
      <Globe size={16} aria-hidden="true" />
      {(['es', 'en'] as Lang[]).map((l) => (
        <button key={l} className={`lang__btn${lang === l ? ' is-active' : ''}`} onClick={() => choose(l)} aria-pressed={lang === l}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
