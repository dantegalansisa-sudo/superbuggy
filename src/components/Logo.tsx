import { Link } from 'react-router-dom';

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className={`logo${light ? ' logo--light' : ''}`} aria-label="Super Buggies, inicio">
      <span className="logo__super">Super</span>
      <span className="logo__buggies">Buggies</span>
      <svg className="logo__peak" viewBox="0 0 60 22" aria-hidden="true">
        <path d="M2 20 L18 6 L26 13 L36 2 L58 20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </Link>
  );
}
