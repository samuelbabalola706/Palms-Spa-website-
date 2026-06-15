import { motion } from "framer-motion";
import { Reveal, StaggerGroup, StaggerItem, ease } from "./Motion";

const testimonials = [
  {
    name: "Adaeze O.",
    initials: "AO",
    service: "The Ancient Warmth — Signature Ritual",
    rating: 5,
    text: "Absolutely world-class. The Ancient Warmth ritual was transformative — I left feeling completely renewed and at peace. The ambience, the therapist's skill, the attention to detail. Worth every naira.",
    hue: "#c88e2e",
  },
  {
    name: "Chidi N.",
    initials: "CN",
    service: "The Escape — Signature Ritual",
    rating: 5,
    text: "Best spa in Lagos, hands down. The Escape is exactly that — a full escape from reality. Warm oils, expert hands, total silence. I didn't want to leave.",
    hue: "#b17223",
  },
  {
    name: "Fatima A.",
    initials: "FA",
    service: "The Reconnection Plus — Couples",
    rating: 5,
    text: "My partner and I did The Reconnection Plus for our anniversary — the wine, the fresh fruit platter, the ambience. Magical. We're already planning our next visit.",
    hue: "#c88e2e",
  },
  {
    name: "Tolu B.",
    initials: "TB",
    service: "Four Hand Ritual — Signature",
    rating: 5,
    text: "I've visited luxury spas across London and Dubai. Harmony Palms rivals them all. The Four Hand Ritual is seamless — two therapists in perfect sync. Truly exceptional.",
    hue: "#b17223",
  },
  {
    name: "Emeka K.",
    initials: "EK",
    service: "Late Night — Home Service",
    rating: 5,
    text: "The 24-hour availability is a game-changer. I booked a late-night home session after a tough week. They arrived on time, set up beautifully, and made us feel like royalty.",
    hue: "#c88e2e",
  },
  {
    name: "Ngozi M.",
    initials: "NM",
    service: "The Stillness — Therapeutic",
    rating: 5,
    text: "I was skeptical at first, but from the moment I walked in, the experience was immaculate. The Swedish relaxation session was exactly what I needed. I'm now a regular.",
    hue: "#b17223",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-[3px]" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 20 20" fill="#d6a24b" aria-hidden>
          <path d="M10 1l2.39 4.84 5.34.78-3.86 3.77.91 5.32L10 13.27l-4.78 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials, hue }: { initials: string; hue: string }) {
  return (
    <div
      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0 ring-2 ring-[#d6a24b]/30"
      style={{ background: `radial-gradient(circle at 30% 30%, ${hue}cc, ${hue}66)` }}
    >
      {initials}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-16 md:py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#d6a24b]/[0.03] blur-[80px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative">
        {/* Section header */}
        <Reveal>
          <div className="text-[#d6a24b] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
            Guest Voices
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 lg:mb-16">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-[1.1] lg:leading-[1.05] text-[var(--text-primary)]">
              Words from
              <br />
              <span className="text-[#d6a24b] italic">our guests</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs sm:text-right">
              Trusted by those who choose only the finest wellness experiences in Lagos.
            </p>
          </div>
        </Reveal>

        {/* Testimonial cards grid */}
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" delay={0.07}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <TestimonialCard testimonial={t} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Bottom trust signal */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 text-[var(--text-muted)] text-xs tracking-[0.12em] uppercase">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-[2px]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="11" height="11" viewBox="0 0 20 20" fill="#d6a24b" aria-hidden>
                    <path d="M10 1l2.39 4.84 5.34.78-3.86 3.77.91 5.32L10 13.27l-4.78 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z" />
                  </svg>
                ))}
              </div>
              <span className="font-semibold text-[var(--text-secondary)]">5.0</span>
            </div>
            <span className="hidden sm:block opacity-40">·</span>
            <span>100+ verified guest reviews</span>
            <span className="hidden sm:block opacity-40">·</span>
            <span>Google · WhatsApp</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[number] }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: ease.out }}
      className="group relative flex flex-col gap-5 p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] backdrop-blur-sm hover:border-[#d6a24b]/30 transition-colors duration-400"
    >
      {/* Decorative quote mark */}
      <svg
        className="absolute top-5 right-5 text-[#d6a24b]/10 group-hover:text-[#d6a24b]/20 transition-colors duration-400"
        width="36"
        height="28"
        viewBox="0 0 36 28"
        fill="currentColor"
        aria-hidden
      >
        <path d="M0 28V16.8C0 7.467 4.8 2.133 14.4 0l1.6 2.4C11.6 3.6 8.933 5.6 7.6 8.4 6.267 11.067 5.6 14.133 5.6 17.6H11.2V28H0zm20.8 0V16.8C20.8 7.467 25.6 2.133 35.2 0l1.6 2.4C32.4 3.6 29.733 5.6 28.4 8.4c-1.333 2.667-2 5.733-2 9.2H32V28H20.8z" />
      </svg>

      {/* Star rating */}
      <StarRating count={testimonial.rating} />

      {/* Review text */}
      <p className="text-[var(--text-secondary)] text-sm leading-[1.75] flex-1 pr-6">
        {testimonial.text}
      </p>

      {/* Divider */}
      <div className="h-px bg-[var(--border-subtle)] group-hover:bg-[#d6a24b]/20 transition-colors duration-400" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <Avatar initials={testimonial.initials} hue={testimonial.hue} />
        <div className="min-w-0">
          <div className="font-sans font-semibold text-[var(--text-primary)] text-sm leading-tight">
            {testimonial.name}
          </div>
          <div className="text-[#d6a24b] text-[11px] tracking-[0.08em] font-medium mt-0.5 truncate">
            {testimonial.service}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
