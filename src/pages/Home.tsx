import Hero from '../components/Hero';
import Tours from '../components/Tours';
import Experiences from '../components/Experiences';
import Reels from '../components/Reels';
import Gallery from '../components/Gallery';
import Booking from '../components/Booking';
import { CtaBand } from '../components/Closing';
import SeoIntro from '../components/SeoIntro';
import Reviews from '../components/Reviews';
import CustomerVideos from '../components/CustomerVideos';
import { useSeo } from '../hooks/useSeo';
import { useLang } from '../i18n';

export default function Home() {
  const { t } = useLang();
  useSeo({ title: t.seo.homeTitle, description: t.seo.homeDesc, path: '/' });
  return (
    <>
      <Hero />
      <Tours />
      <Experiences />
      <CtaBand />
      <Reels />
      <Reviews />
      <CustomerVideos />
      <Gallery />
      <SeoIntro />
      <Booking />
    </>
  );
}
