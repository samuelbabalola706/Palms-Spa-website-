import { motion } from "framer-motion";
import { LocationIcon, PhoneIcon, MailIcon, ArrowRightIcon } from "./Icons";
import Logo from "./Logo";
import { Reveal, T } from "./Motion";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Experiences", href: "#experiences" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const servicesLinks = [
  "Massage Therapies",
  "Signature Rituals",
  "Couples Experiences",
  "Beauty Services",
  "Home Spa Services",
  "Gift Cards",
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[var(--border-subtle)] bg-[var(--bg-deep)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16 lg:py-20">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-4 lg:col-span-2">
              <a href="#home" className="inline-flex items-center gap-3 group">
                <motion.span
                  className="inline-flex"
                  whileHover={{ rotate: 10 }}
                  transition={T.fast}
                >
                  <Logo size={56} />
                </motion.span>
                <div>
                  <div className="font-display text-[var(--text-primary)] text-xl leading-tight">
                    The Harmony Palms
                  </div>
                  <div className="text-[10px] tracking-[0.25em] text-[#d6a24b] uppercase opacity-80">
                    Wellness Spa
                  </div>
                </div>
              </a>
              <p className="mt-6 text-[var(--text-secondary)] text-sm leading-relaxed max-w-sm">
                24-hour luxury wellness spa in Lekki Phase 1, Lagos, Nigeria.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <div className="text-[10px] tracking-[0.25em] text-[#d6a24b] uppercase font-semibold mb-5">
                Quick Links
              </div>
              <ul className="space-y-2.5">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="link-underline text-[var(--text-secondary)] hover:text-[#d6a24b] text-sm transition-colors duration-300 inline-block"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <div className="text-[10px] tracking-[0.25em] text-[#d6a24b] uppercase font-semibold mb-5">
                Services
              </div>
              <ul className="space-y-2.5">
                {servicesLinks.map((l) => (
                  <li key={l}>
                    <a
                      href="#services"
                      className="link-underline text-[var(--text-secondary)] hover:text-[#d6a24b] text-sm transition-colors duration-300 inline-block"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="text-[10px] tracking-[0.25em] text-[#d6a24b] uppercase font-semibold mb-5">
                Contact
              </div>
              <ul className="space-y-3">
                <li className="flex gap-2 text-[var(--text-secondary)] text-sm">
                  <LocationIcon size={16} className="text-[#d6a24b] shrink-0 mt-0.5" />
                  14 Prince Bode Adebowale Crescent, Lekki Phase 1, Lagos
                </li>
                <li>
                  <a
                    href="tel:+2348123020985"
                    className="flex gap-2 text-[var(--text-secondary)] text-sm hover:text-[#d6a24b] transition-colors duration-300"
                  >
                    <PhoneIcon size={16} className="text-[#d6a24b] shrink-0" />
                    0812 302 0985
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/2349133075751"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 text-[var(--text-secondary)] text-sm hover:text-[#d6a24b] transition-colors duration-300"
                  >
                    <PhoneIcon size={16} className="text-[#d6a24b] shrink-0" />
                    0913 307 5751 (WhatsApp)
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:theharmonypalmsspa@gmail.com"
                    className="flex gap-2 text-[var(--text-secondary)] text-sm hover:text-[#d6a24b] transition-colors duration-300 break-all"
                  >
                    <MailIcon size={16} className="text-[#d6a24b] shrink-0 mt-0.5" />
                    theharmonypalmsspa@gmail.com
                  </a>
                </li>
                <li className="flex gap-2 text-[var(--text-secondary)] text-sm items-center">
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-[#d6a24b] text-[#d6a24b] text-[9px]">
                    24
                  </span>
                  Open 24 Hours
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Map CTA + bottom bar */}
        <div className="mt-12 lg:mt-16 grid lg:grid-cols-[1fr_auto] gap-6 items-end">
          <Reveal delay={0.1} className="hidden lg:block">
            <a
              href="https://maps.google.com/?q=14+Prince+Bode+Adebowale+Crescent+Lekki+Phase+1+Lagos+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative aspect-[2.4/1] w-full max-w-md rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-elevated)] group"
            >
              <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 200">
                <g stroke="#d6a24b" strokeWidth="0.5" fill="none" opacity="0.3">
                  <path d="M0 40 H400 M0 80 H400 M0 120 H400 M0 160 H400" />
                  <path d="M40 0 V200 M120 0 V200 M200 0 V200 M280 0 V200 M360 0 V200" />
                  <path d="M0 40 L80 60 L160 40 L240 80 L320 60 L400 100" strokeWidth="1" />
                  <path d="M0 120 L100 100 L200 140 L300 110 L400 150" strokeWidth="1" />
                </g>
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#d6a24b] text-black shadow-lg shadow-[#d6a24b]/30">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2 C12 2 5 8 5 13 A7 7 0 0 0 12 20 A7 7 0 0 0 19 13 C19 8, 12 2, 12 2 Z M12 15 A2 2 0 1 1 12 11 A2 2 0 0 1 12 15 Z" />
                  </svg>
                  <motion.span
                    className="absolute inset-0 rounded-full bg-[#d6a24b]"
                    animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                    transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity }}
                  />
                </span>
              </div>
              <span className="btn-gold absolute bottom-3 right-3 inline-flex items-center gap-2 bg-[#c88e2e] group-hover:bg-[#d6a24b] text-black text-[10px] font-semibold tracking-wider uppercase px-4 py-2 rounded-full transition-colors duration-300">
                Get Directions
                <ArrowRightIcon size={11} />
              </span>
            </a>
          </Reveal>

          <div className="lg:border-l lg:border-[var(--border-subtle)] lg:pl-10 lg:text-right">
            <div className="flex flex-wrap lg:justify-end gap-4 text-[var(--text-muted)] text-xs">
              <a href="#" className="link-underline hover:text-[#d6a24b] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="link-underline hover:text-[#d6a24b] transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col md:flex-row justify-between gap-2 text-[var(--text-faint)] text-xs">
          <div>© 2026 The Harmony Palms Wellness Spa. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
