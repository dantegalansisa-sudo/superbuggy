import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

// tour: slug (o nombre) de la excursión; people: cantidad de personas o buggies
export type Prefill = { tour?: string; date?: string; people?: string; nonce: number };

type Ctx = {
  prefill: Prefill;
  open: boolean;
  book: (p?: Omit<Prefill, 'nonce'>) => void;
  close: () => void;
};

const BookingContext = createContext<Ctx>({ prefill: { nonce: 0 }, open: false, book: () => {}, close: () => {} });

// Cualquier botón "Reservar" abre el checkout (reserva + pago) encima de la página actual
export function BookingProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<Prefill>({ nonce: 0 });
  const [open, setOpen] = useState(false);
  const book = useCallback((p: Omit<Prefill, 'nonce'> = {}) => {
    setPrefill((prev) => ({ ...p, nonce: prev.nonce + 1 }));
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  return <BookingContext.Provider value={{ prefill, open, book, close }}>{children}</BookingContext.Provider>;
}

export const useBooking = () => useContext(BookingContext);
