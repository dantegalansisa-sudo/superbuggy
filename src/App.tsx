import { MotionConfig } from 'framer-motion';
import { LangProvider } from './i18n';
import { BookingProvider } from './booking';
import { ToastProvider } from './components/Toast';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Tours from './components/Tours';
import WhyUs from './components/WhyUs';
import Experiences from './components/Experiences';
import Reels from './components/Reels';
import Gallery from './components/Gallery';
import Steps from './components/Steps';
import Faq from './components/Faq';
import Booking from './components/Booking';
import { CtaBand, Footer } from './components/Closing';
import FloatingActions from './components/FloatingActions';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <ToastProvider>
          <BookingProvider>
            <CustomCursor />
            <Navbar />
            <main>
              <Hero />
              <Tours />
              <WhyUs />
              <Experiences />
              <Reels />
              <Gallery />
              <Steps />
              <Booking />
              <Faq />
              <CtaBand />
            </main>
            <Footer />
            <FloatingActions />
          </BookingProvider>
        </ToastProvider>
      </LangProvider>
    </MotionConfig>
  );
}
