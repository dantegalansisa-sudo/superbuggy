import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// tour: slug (o nombre) de la excursión; people: cantidad de personas o buggies
export type Prefill = { tour?: string; date?: string; people?: string; counts?: Record<string, number>; nonce: number };

type Ctx = {
  prefill: Prefill;
  open: boolean;
  /** Botones "Reservar" generales: en una excursión abre el checkout; en el resto va al formulario de solicitud */
  book: (p?: Omit<Prefill, 'nonce'>) => void;
  /** Reservar y pagar: abre el checkout encima de la página */
  checkout: (p?: Omit<Prefill, 'nonce'>) => void;
  close: () => void;
};

const BookingContext = createContext<Ctx>({ prefill: { nonce: 0 }, open: false, book: () => {}, checkout: () => {}, close: () => {} });

const EXCURSION_PATH = /^\/excursiones\/([^/]+)/;

export function BookingProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<Prefill>({ nonce: 0 });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const checkout = useCallback((p: Omit<Prefill, 'nonce'> = {}) => {
    setPrefill((prev) => ({ ...p, nonce: prev.nonce + 1 }));
    setOpen(true);
  }, []);

  const book = useCallback(
    (p: Omit<Prefill, 'nonce'> = {}) => {
      const onExcursion = pathname.match(EXCURSION_PATH);
      // En la página de una excursión se reserva y paga esa misma excursión
      if (onExcursion) return checkout({ tour: onExcursion[1], ...p });
      setPrefill((prev) => ({ ...p, nonce: prev.nonce + 1 }));
      const form = document.getElementById('reservar');
      if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else navigate('/#reservar');
    },
    [pathname, navigate, checkout],
  );

  const close = useCallback(() => setOpen(false), []);
  return <BookingContext.Provider value={{ prefill, open, book, checkout, close }}>{children}</BookingContext.Provider>;
}

export const useBooking = () => useContext(BookingContext);
