import Hero from '../components/Hero';
import Tours from '../components/Tours';
import Experiences from '../components/Experiences';
import Reels from '../components/Reels';
import Gallery from '../components/Gallery';
import Booking from '../components/Booking';
import { CtaBand } from '../components/Closing';
import PaymentStrip from '../components/PaymentStrip';
import { useSeo } from '../hooks/useSeo';

export default function Home() {
  useSeo({
    title: 'Super Buggies · Tours en buggy y excursiones en Puerto Plata',
    description: 'Tours en buggy, four wheel, catamarán, cascadas y más excursiones en Puerto Plata, República Dominicana. Reserva en línea o por WhatsApp al 809-841-4125.',
    path: '/',
  });
  return (
    <>
      <Hero />
      <Tours />
      <Experiences />
      <CtaBand />
      <Reels />
      <Gallery />
      <PaymentStrip />
      <Booking />
    </>
  );
}
