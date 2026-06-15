import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, ArrowRightIcon } from "./Icons";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";
import { ease, T } from "./Motion";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Experiences", href: "#experiences" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems.map((n) => n.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const found = navItems.find((n) => n.href === `#${id}`);
            if (found) setActive(found.label);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Background colors depend on theme
  const bgIdle = isLight ? "rgba(255,255,255,0.5)" : "rgba(8,7,5,0.4)";
  const bgScrolled = isLight ? "rgba(255,255,255,0.9)" : "rgba(8,7,5,0.85)";
  const borderIdle = isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.05)";
  const borderScrolled = isLight ? "rgba(214,162,75,0.3)" : "rgba(214,162,75,0.15)";

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: ease.out, delay: 0.1 }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6">
        <motion.div
          animate={{
            backgroundColor: scrolled ? bgScrolled : bgIdle,
            borderColor: scrolled ? borderScrolled : borderIdle,
          }}
          transition={{ duration: 0.3, ease: ease.out }}
          className="flex items-center justify-between backdrop-blur-xl border rounded-full px-4 sm:px-5 lg:px-7 py-2.5 sm:py-3"
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group shrink-0">
            <motion.span
              className="inline-flex"
              whileHover={{ rotate: 8 }}
              transition={T.fast}
            >
              <Logo size={40} />
            </motion.span>
            <div className="leading-tight hidden sm:block">
              <div className="text-[9px] tracking-[0.2em] text-[#d6a24b] uppercase">The</div>
              <div className="font-display text-base lg:text-lg text-[var(--text-primary)] leading-none">
                Harmony Palms
              </div>
              <div className="text-[9px] tracking-[0.25em] text-[#d6a24b] uppercase opacity-80">
                Wellness Spa
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 relative">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`relative px-4 py-2 text-sm tracking-wide transition-colors duration-300 ${
                  active === item.label
                    ? "text-[#d6a24b]"
                    : "text-[var(--text-secondary)] hover:text-[#d6a24b]"
                }`}
              >
                {active === item.label && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-4 right-4 -bottom-0.5 h-px bg-[#d6a24b]"
                    transition={{ duration: 0.4, ease: ease.out }}
                  />
                )}
                {item.label.toUpperCase()}
              </a>
            ))}
          </nav>

          {/* CTA + theme + menu */}
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <motion.a
              href="#services"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={T.fast}
              className="btn-gold hidden sm:inline-flex items-center gap-2 bg-[#c88e2e] hover:bg-[#d6a24b] text-black text-xs font-semibold tracking-wider uppercase px-4 lg:px-5 py-2.5 rounded-full transition-colors duration-300 group"
            >
              Book Now
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                <ArrowRightIcon size={12} className="text-black" />
              </span>
            </motion.a>
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors lg:hidden"
              aria-label="Toggle menu"
            >
              <motion.span animate={{ rotate: open ? 90 : 0 }} transition={T.fast}>
                <MenuIcon size={22} />
              </motion.span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: ease.out }}
            className="lg:hidden overflow-hidden mt-3"
          >
            <div className="mx-4 sm:mx-6 bg-[var(--bg-elevated)]/95 backdrop-blur-xl border border-[var(--border-subtle)] rounded-2xl p-5">
              <motion.nav
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05 } },
                }}
                className="flex flex-col gap-1"
              >
                {navItems.map((item) => (
                  <motion.a
                    key={item.label}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      show: { opacity: 1, x: 0, transition: T.fast },
                    }}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-lg text-sm tracking-wider text-[var(--text-secondary)] hover:text-[#d6a24b] hover:bg-[var(--bg-card)] transition-colors"
                  >
                    {item.label.toUpperCase()}
                  </motion.a>
                ))}
                <motion.a
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0, transition: T.fast },
                  }}
                  href="#services"
                  onClick={() => setOpen(false)}
                  className="btn-gold mt-3 inline-flex items-center justify-center gap-2 bg-[#c88e2e] text-black text-xs font-semibold tracking-wider uppercase px-5 py-3 rounded-full"
                >
                  Book Your Escape <ArrowRightIcon size={14} />
                </motion.a>
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
