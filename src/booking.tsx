import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

export type Prefill = { tour?: string; date?: string; people?: string; nonce: number };

type Ctx = { prefill: Prefill; book: (p?: Omit<Prefill, 'nonce'>) => void };

const BookingContext = createContext<Ctx>({ prefill: { nonce: 0 }, book: () => {} });

export function BookingProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<Prefill>({ nonce: 0 });
  const book = useCallback((p: Omit<Prefill, 'nonce'> = {}) => {
    setPrefill((prev) => ({ ...p, nonce: prev.nonce + 1 }));
    document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);
  return <BookingContext.Provider value={{ prefill, book }}>{children}</BookingContext.Provider>;
}

export const useBooking = () => useContext(BookingContext);
