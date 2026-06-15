import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRightIcon, ClockIcon, LocationIcon } from "./Icons";
import { ease, T } from "./Motion";

const HEADLINE_LINES = [
  { text: "Wellness", className: "text-white" },
  { text: "Elevated.", className: "text-[#d6a24b] italic" },
  { text: "24/7 Luxury", className: "text-white", mt: true },
  { text: "Awakens.", className: "text-white", accentDot: true },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.5]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <motion.img
          src="/images/hero-therapist.webp"
          alt="Luxury spa massage therapist"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: ease.out }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <motion.div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      </motion.div>

      {/* Content */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 pb-20 lg:pt-44 lg:pb-28 min-h-screen flex flex-col justify-center">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Left: Copy */}
          <div className="relative">
            {/* Vertical "Scroll to Discover" */}
            <motion.div
              className="hidden xl:flex absolute -left-2 top-1/2 -translate-y-1/2 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...T.base, delay: 1.2 }}
            >
              <div className="scroll-text text-[10px] tracking-[0.3em] text-white/50 uppercase pr-3">
                Scroll to Discover
              </div>
              <div className="w-px h-32 bg-gradient-to-b from-[#d6a24b]/60 to-transparent" />
            </motion.div>

            {/* Headline — responsive scaling */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] lg:leading-[1.0] text-white mb-6">
              {HEADLINE_LINES.map((line, i) => (
                <span key={i} className={`block overflow-hidden ${line.mt ? "mt-2" : ""}`}>
                  <motion.span
                    className={`inline-block ${line.className}`}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, ease: ease.out, delay: 0.2 + i * 0.12 }}
                  >
                    {line.accentDot ? (
                      <>
                        {line.text.replace(".", "")}
                        <span className="text-[#d6a24b]">.</span>
                      </>
                    ) : (
                      line.text
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              className="max-w-md mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...T.base, delay: 0.9 }}
            >
              <p className="text-[#d6a24b] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
                24-Hour Wellness. Endless Harmony.
              </p>
              <p className="text-white/80 text-sm lg:text-base leading-relaxed">
                A private sanctuary in the heart of Lekki Phase 1, Lagos. Premium therapies. Signature rituals. Total renewal.
              </p>
            </motion.div>

            {/* Buttons — stack on mobile, side-by-side on desktop */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...T.base, delay: 1.05 }}
            >
              <motion.a
                href="#services"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={T.fast}
                className="btn-gold inline-flex items-center justify-center gap-2 bg-[#c88e2e] text-black text-xs font-semibold tracking-wider uppercase px-6 py-3.5 rounded-full hover:bg-[#d6a24b] group transition-colors duration-300"
              >
                Book Your Escape
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                  <ArrowRightIcon size={13} />
                </span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Info card */}
          <motion.div
            className="hidden lg:flex justify-end"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: ease.out, delay: 1.1 }}
          >
            <div className="backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-1">
              <div className="flex items-stretch divide-x divide-white/10">
                <InfoCell icon={<ClockIcon size={32} />} title="OPEN 24 HOURS" subtitle="Always here for you" />
                <InfoCell icon={<LocationIcon size={32} />} title="LEKKI PHASE 1" subtitle="Lagos, Nigeria" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile info cards */}
        <motion.div
          className="lg:hidden mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...T.base, delay: 1.2 }}
        >
          <MobileInfoCard icon={<ClockIcon size={28} />} title="OPEN 24 HOURS" subtitle="Always here for you" />
          <MobileInfoCard icon={<LocationIcon size={28} />} title="LEKKI PHASE 1" subtitle="Lagos, Nigeria" />
        </motion.div>
      </div>

      {/* Animated scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...T.base, delay: 1.8 }}
      >
        <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase">Scroll</div>
        <div className="w-px h-12 bg-white/10 relative overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-4 bg-[#d6a24b] animate-scroll-hint" />
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[var(--bg-base)] to-transparent pointer-events-none" />
    </section>
  );
}

function InfoCell({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-4 px-6 py-5">
      <span className="text-[#d6a24b] shrink-0">{icon}</span>
      <div>
        <div className="text-white font-display text-lg leading-tight">{title}</div>
        <div className="text-white/60 text-xs">{subtitle}</div>
      </div>
    </div>
  );
}

function MobileInfoCard({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-2xl p-4 flex items-center gap-4">
      <span className="text-[#d6a24b] shrink-0">{icon}</span>
      <div>
        <div className="text-white font-display text-base leading-tight">{title}</div>
        <div className="text-white/60 text-xs">{subtitle}</div>
      </div>
    </div>
  );
}
