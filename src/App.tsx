import { MotionConfig } from 'framer-motion';
import { Route, Routes } from 'react-router-dom';
import { LangProvider } from './i18n';
import { BookingProvider } from './booking';
import { ToastProvider } from './components/Toast';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import { Footer } from './components/Closing';
import FloatingActions from './components/FloatingActions';
import ScrollManager from './components/ScrollManager';
import Home from './pages/Home';
import ExcursionPage from './pages/Excursion';
import PaymentsPage from './pages/Payments';
import LegalPage from './pages/Legal';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <ToastProvider>
          <BookingProvider>
            <ScrollManager />
            <CustomCursor />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/excursiones/:slug" element={<ExcursionPage />} />
                <Route path="/formas-de-pago" element={<PaymentsPage />} />
                <Route path="/privacidad" element={<LegalPage doc="privacy" />} />
                <Route path="/terminos" element={<LegalPage doc="terms" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <FloatingActions />
          </BookingProvider>
        </ToastProvider>
      </LangProvider>
    </MotionConfig>
  );
}
