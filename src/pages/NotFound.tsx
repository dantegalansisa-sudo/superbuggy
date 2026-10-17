import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';
import { useLang } from '../i18n';

export default function NotFound() {
  const { t } = useLang();
  const n = t.notFound;
  useSeo({ title: t.seo.notFoundTitle, description: n.text, path: '/404' });
  return (
    <section className="page page--center">
      <div className="container">
        <p className="eyebrow">{n.eyebrow}</p>
        <h1 className="page__title">{n.title}</h1>
        <p className="page__lead">{n.text}</p>
        <Link to="/#tours" className="btn btn--primary btn--lg">{n.cta} <ArrowRight size={18} /></Link>
      </div>
    </section>
  );
}
