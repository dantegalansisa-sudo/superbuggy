import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSeo } from '../hooks/useSeo';

export default function NotFound() {
  useSeo({ title: 'Página no encontrada · Super Buggies', description: 'La página que buscas no existe.', path: '/404' });
  return (
    <section className="page page--center">
      <div className="container">
        <p className="eyebrow">Error 404</p>
        <h1 className="page__title">Esta ruta no existe</h1>
        <p className="page__lead">Pero tenemos muchas otras esperando por ti.</p>
        <Link to="/#tours" className="btn btn--primary btn--lg">Ver excursiones <ArrowRight size={18} /></Link>
      </div>
    </section>
  );
}
