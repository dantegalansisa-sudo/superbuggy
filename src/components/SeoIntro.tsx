import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import SectionHead from './SectionHead';
import { useLang } from '../i18n';
import { useCatalog } from '../content/catalog';
import { excursionPath } from '../data';
import { minPrice } from '../content/pricing';

// Sección de texto para buscadores: "excursiones en buggy en Puerto Plata" / "buggy tours in Puerto Plata",
// lista de todas las excursiones con precio y preguntas frecuentes (también como datos estructurados FAQPage).
export default function SeoIntro() {
  const { t, lang } = useLang();
  const s = t.seoIntro;
  const { all } = useCatalog();

  useEffect(() => {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: lang,
      mainEntity: s.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
    document.head.appendChild(el);
    return () => el.remove();
  }, [s, lang]);

  const price = (e: (typeof all)[number]) => {
    const p = minPrice(e);
    return p ? `${t.tours.priceFrom} US$${p}` : t.tours.priceAsk;
  };

  return (
    <section className="section seo" id="tours-puerto-plata">
      <div className="container seo__grid">
        <div>
          <SectionHead eyebrow={s.eyebrow} title={s.title} accent={s.titleAccent} />
          {s.paragraphs.map((p) => (
            <motion.p key={p.slice(0, 30)} className="seo__p" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              {p}
            </motion.p>
          ))}
          <h3 className="seo__h3">{s.listTitle}</h3>
          <ul className="seo__list">
            {all.map((e) => (
              <li key={e.slug}>
                <Link to={excursionPath(e.slug)}>
                  <span>{e.name}</span>
                  <small>{price(e)}</small>
                  <ArrowRight size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="seo__h3 seo__h3--faq">{s.faqTitle}</h3>
          <div className="seo__faq">
            {s.faq.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>
                  {f.q}
                  <span><Plus size={18} /></span>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
