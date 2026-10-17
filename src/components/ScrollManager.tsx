import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Al cambiar de página sube al inicio; si la URL trae #ancla, baja a esa sección cuando ya está renderizada
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }
    let tries = 0;
    const id = hash.slice(1);
    const tick = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else if (tries++ < 20) window.setTimeout(tick, 50);
    };
    tick();
  }, [pathname, hash, key]);

  return null;
}
