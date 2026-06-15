import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Services from "./components/Services";
import Experiences from "./components/Experiences";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import FooterCTA from "./components/FooterCTA";
import Footer from "./components/Footer";
import BookingSystem from "./components/booking/BookingSystem";
import ScrollProgress from "./components/ScrollProgress";
import WhatsAppButton from "./components/WhatsAppButton";
import { ThemeProvider } from "./components/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <div className="bg-[var(--bg-base)] text-[var(--text-primary)] min-h-screen overflow-x-hidden transition-theme">
        <ScrollProgress />
        <Header />
        <main>
          <Hero />
          <Features />
          <Services />
          <Experiences />
          <Gallery />
          <Testimonials />
          <About />
        </main>
        <FooterCTA />
        <Footer />
        <a
          id="book"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute opacity-0 pointer-events-none"
        />
        <BookingSystem />
        <WhatsAppButton />
      </div>
    </ThemeProvider>
  );
}
