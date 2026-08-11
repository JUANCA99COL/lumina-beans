import Header from './components/Header';
import FrameSequenceHero from './components/FrameSequenceHero';
import Offer from './components/Offer';
import VarietyMarquee from './components/VarietyMarquee';
import Vision from './components/Vision';
import BrewGuide from './components/BrewGuide';
import Process from './components/Process';
import Reviews from './components/Reviews';
import Subscribe from './components/Subscribe';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <FrameSequenceHero />

      <Header />

      <main>
        <Offer />
        <Vision />
        <VarietyMarquee />
        <BrewGuide />
        <Process />
        <Reviews />
        <Contact />
        <Subscribe />
      </main>

      <Footer />
    </>
  );
}
