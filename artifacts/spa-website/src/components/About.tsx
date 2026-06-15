import { useState } from "react";
import { motion } from "framer-motion";
import { LotusIcon, MedalIcon, DiamondIcon } from "./Icons";
import { Reveal, AnimatedCounter, StaggerGroup, StaggerItem, T, ease } from "./Motion";

const stats = [
  { icon: LotusIcon, value: 24, suffix: "/7", sub: "Always Open", sub2: "For You" },
  { icon: MedalIcon, value: 100, suffix: "%", sub: "Premium", sub2: "Experience" },
  { icon: DiamondIcon, value: 5, suffix: "★", sub: "Rated By", sub2: "Our Guests" },
];

export default function About() {
  const [aboutImage, setAboutImage] = useState("/images/new-6.webp");

  return (
    <section id="about" className="py-16 md:py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-16 items-center">
          {/* Image with reveal + fallback */}
          <div className="relative overflow-hidden rounded-xl border border-[var(--border-subtle)] aspect-[4/3] bg-[var(--bg-card)]">
            <motion.img
              src={aboutImage}
              alt="The Harmony Palms Wellness Spa reception in Lekki Lagos"
              loading="lazy"
              className="w-full h-full object-cover"
              initial={{ scale: 1.08, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.9, ease: ease.out }}
              onError={() => {
                if (aboutImage !== "/images/new-6.webp") {
                  setAboutImage("/images/new-6.webp");
                }
              }}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...T.base, delay: 0.6 }}
              className="absolute bottom-4 left-4 text-[#d6a24b]/90 font-display text-xs tracking-widest"
            >
              LEKKI · LAGOS
            </motion.div>
          </div>

          {/* Copy */}
          <div>
            <Reveal>
              <div className="text-[#d6a24b] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
                About Us
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.1] lg:leading-[1.05] text-[var(--text-primary)] mb-6">
                A sanctuary of
                <br />
                <span className="text-[#d6a24b] italic">luxury & wellness</span>
              </h2>
              <p className="text-[var(--text-secondary)] text-sm lg:text-base leading-relaxed max-w-lg mb-8">
                The Harmony Palms Wellness Spa is Lekki Phase 1's premier 24-hour wellness destination. We blend ancient therapies with modern techniques to deliver transformative results in an atmosphere of pure luxury and tranquility.
              </p>
            </Reveal>

            <StaggerGroup className="grid grid-cols-3 gap-4 lg:gap-6" delay={0.1}>
              {stats.map((s) => (
                <StaggerItem key={s.sub}>
                  <div className="flex items-start gap-3">
                    <s.icon size={28} className="text-[#d6a24b] shrink-0" />
                    <div>
                      <div className="font-display text-[var(--text-primary)] text-lg sm:text-xl lg:text-2xl leading-tight">
                        <AnimatedCounter value={s.value} suffix={s.suffix} />
                      </div>
                      <div className="text-[var(--text-muted)] text-[11px] mt-1 leading-tight">
                        {s.sub}
                        <br />
                        {s.sub2}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
