import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckIcon,
  ArrowRightIcon,
  TikTokIcon,
} from "./Icons";
import { Reveal, T } from "./Motion";

export default function FooterCTA() {
  return (
    <section className="py-16 md:py-20 lg:py-24 border-t border-[var(--border-subtle)] bg-gradient-to-b from-[var(--bg-elevated)] to-[var(--bg-base)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="relative border border-[var(--border-subtle)] rounded-xl overflow-hidden bg-[var(--bg-card)] p-8 sm:p-10 lg:p-12">
            {/* Decorative background diamond */}
            <div className="absolute -right-16 -top-16 text-[#d6a24b] opacity-[0.10] pointer-events-none select-none">
              <svg width="300" height="300" viewBox="0 0 200 200" fill="currentColor">
                <path d="M100 0 L120 80 L200 100 L120 120 L100 200 L80 120 L0 100 L80 80 Z" />
              </svg>
            </div>

            <div className="relative max-w-xl">
              <div className="text-[#d6a24b] text-[10px] tracking-[0.25em] uppercase font-semibold mb-4">
                Ready to unwind?
              </div>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] leading-tight mb-4">
                Reserve your sanctuary
                <br />
                <span className="text-[#d6a24b] italic">in moments</span>
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-md mb-6">
                Book online 24/7. Instant confirmation. Cancel or reschedule up to 12 hours before with no charge.
              </p>

              <motion.a
                href="#services"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={T.fast}
                className="btn-gold inline-flex items-center gap-2 bg-[#c88e2e] hover:bg-[#d6a24b] text-black text-xs font-semibold tracking-wider uppercase px-6 py-3.5 rounded-full transition-colors duration-300 group"
              >
                Book Your Escape
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                  <ArrowRightIcon size={13} />
                </span>
              </motion.a>
            </div>

            {/* Newsletter + social */}
            <div className="relative mt-10 pt-8 border-t border-[var(--border-base)] max-w-xl">
              <div className="text-[#d6a24b] text-[10px] tracking-[0.25em] uppercase font-semibold mb-3">
                Stay In Harmony
              </div>
              <p className="text-[var(--text-secondary)] text-xs mb-3">
                Wellness tips, exclusive offers, and first access to new rituals.
              </p>
              <NewsletterForm />

              {/* TikTok only */}
              <div className="mt-5 flex items-center gap-3">
                <motion.a
                  href="https://www.tiktok.com/@theharmonypalmsspa"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={T.fast}
                  className="w-10 h-10 rounded-full border border-[var(--border-base)] hover:border-[#d6a24b] hover:text-[#d6a24b] flex items-center justify-center text-[var(--text-secondary)] transition-colors duration-300"
                  aria-label="TikTok @theharmonypalmsspa"
                >
                  <TikTokIcon size={18} />
                </motion.a>
                <span className="text-[var(--text-muted)] text-xs">@theharmonypalmsspa</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="relative"
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setEmail("");
        }, 2400);
      }}
    >
      <div className="flex items-center border-b border-[var(--border-strong)] focus-within:border-[#d6a24b] transition-colors duration-300 pb-1">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder-[var(--text-faint)] text-sm py-2"
        />
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={T.fast}
          className="w-9 h-9 rounded-full bg-[#c88e2e] hover:bg-[#d6a24b] text-black flex items-center justify-center transition-colors duration-300 shrink-0"
          aria-label="Subscribe"
        >
          <ArrowRightIcon size={14} />
        </motion.button>
      </div>
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={T.fast}
            className="absolute -bottom-6 left-0 text-[#d6a24b] text-xs flex items-center gap-1.5"
          >
            <CheckIcon size={12} />
            Thank you — check your inbox.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
