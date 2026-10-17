import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export type Prefill = { tour?: string; date?: string; people?: string; nonce: number };

type Ctx = { prefill: Prefill; book: (p?: Omit<Prefill, 'nonce'>) => void };

const BookingContext = createContext<Ctx>({ prefill: { nonce: 0 }, book: () => {} });

export function BookingProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<Prefill>({ nonce: 0 });
  const navigate = useNavigate();
  const book = useCallback((p: Omit<Prefill, 'nonce'> = {}) => {
    setPrefill((prev) => ({ ...p, nonce: prev.nonce + 1 }));
    const form = document.getElementById('reservar');
    // Páginas sin formulario (legales, pagos): ir al formulario del inicio
    if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else navigate('/#reservar');
  }, [navigate]);
  return <BookingContext.Provider value={{ prefill, book }}>{children}</BookingContext.Provider>;
}

export const useBooking = () => useContext(BookingContext);
