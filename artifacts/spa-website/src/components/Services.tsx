import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  ArrowRightIcon,
  HandsIcon,
  LotusIcon,
  HeartIcon,
  FaceIcon,
  HomeIcon,
  SunIcon,
} from "./Icons";
import { Reveal, StaggerGroup, StaggerItem, ease, T } from "./Motion";

type Service = {
  name: string;
  duration?: string;
  price: string;
  description: string;
};

type Category = {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  services: Service[];
};

const categories: Category[] = [
  {
    id: "signature", icon: LotusIcon, title: "Signature Rituals",
    subtitle: "Our exclusive wellness journeys",
    tagline: "Relieve. Restore. Rebalance.",
    image: "/images/service-1.webp",
    services: [
      { name: "The Surrender", duration: "80 MIN", price: "₦90,000", description: "Let go completely as slow, flowing movements and soothing touch guide your body into deep relaxation. Perfect for a peaceful escape from daily stress." },
      { name: "The Surrender + Swedish Flow", duration: "80 MIN", price: "₦100,000", description: "A refined blend of Swedish relaxation and flowing bodywork designed for full mind-body renewal." },
      { name: "The Surrender + Deep Release", duration: "80 MIN", price: "₦100,000", description: "Combines soothing relaxation with focused deep pressure to release tension without breaking the spa-like calm." },
      { name: "The Escape", duration: "80 MIN", price: "₦120,000", description: "A full sensory ritual with warm oils and continuous flowing touch for deep surrender and indulgent relaxation." },
      { name: "The Ancient Warmth", duration: "80 MIN", price: "₦100,000", description: "Heated stone therapy that melts muscle tension, improves circulation, and restores inner calm." },
      { name: "Aromatherapy Massage", duration: "80 MIN", price: "₦100,000", description: "Custom essential oils + heated towels for a calming, sensory wellness experience." },
      { name: "Scalp & Hair Ritual", duration: "80 MIN", price: "₦70,000", description: "A deeply relaxing head spa treatment that releases scalp tension and revitalizes the senses." },
      { name: "Four Hand Ritual", duration: "80 MIN", price: "₦200,000", description: "Two therapists in perfect synchronization deliver a seamless, immersive full-body experience." },
      { name: "Six Hand Ritual", duration: "80 MIN", price: "₦300,000", description: "Three therapists working in harmony for the ultimate luxury sensory escape." },
    ],
  },
  {
    id: "therapeutic", icon: HandsIcon, title: "Therapeutic Massages",
    subtitle: "Targeted relief, expert hands",
    tagline: "Precision. Pressure. Relief.",
    image: "/images/service-2.webp",
    services: [
      { name: "The Stillness (Swedish Relaxation)", duration: "60 MIN", price: "₦65,000", description: "Gentle strokes designed to relax the body and improve circulation." },
      { name: "The Unburdening (Deep Tissue)", duration: "60 MIN", price: "₦65,000", description: "Targeted pressure to release deep muscle tension and stiffness." },
      { name: "The Balance (Combination Massage)", duration: "60 MIN", price: "₦80,000", description: "A tailored blend of relaxation and therapeutic techniques." },
      { name: "Head Therapy", price: "₦40,000", description: "Relieves stress, headaches, and mental fatigue." },
      { name: "Sports Stretch Therapy", price: "₦50,000", description: "Improves flexibility and supports muscle recovery." },
      { name: "Foot Ritual", price: "₦40,000", description: "Pressure-point foot therapy to restore balance and circulation." },
    ],
  },
  {
    id: "couples", icon: HeartIcon, title: "Couples Experiences",
    subtitle: "Shared wellness journeys",
    tagline: "Reconnect. Relax. Reignite.",
    image: "/images/service-3.webp",
    services: [
      { name: "The Reconnection", duration: "80 MIN", price: "₦170,000", description: "Side-by-side massage experience designed for relaxation and emotional reconnection." },
      { name: "The Reconnection Plus", duration: "80 MIN", price: "₦200,000", description: "Includes wine + fresh fruit platter for a premium couples wellness escape." },
    ],
  },
  {
    id: "beauty", icon: FaceIcon, title: "Beauty Care",
    subtitle: "Enhance your natural radiance",
    tagline: "Refine. Glow. Radiate.",
    image: "/images/service-4.webp",
    services: [
      { name: "Full Body Wax", duration: "60 MIN", price: "₦80,000", description: "Full-body waxing for smooth, polished skin." },
      { name: "Bikini Wax", price: "₦65,000", description: "Professional grooming with comfort and discretion." },
      { name: "Pedicure", duration: "60 MIN", price: "₦40,000", description: "Foot care treatment that restores softness and freshness." },
    ],
  },
  {
    id: "addons", icon: SunIcon, title: "Exclusive Add-Ons & Experiences",
    subtitle: "Extend your sanctuary",
    tagline: "Linger longer. Deeper calm.",
    image: "/images/service-5.webp",
    services: [
      { name: "The Drifting", price: "₦70,000 / HR", description: "Extended relaxation experience beyond treatment time for deeper calm and luxury immersion." },
      { name: "The Still Corner", price: "Complimentary", description: "A quiet relaxation space to unwind before leaving the spa environment." },
    ],
  },
  {
    id: "home", icon: HomeIcon, title: "Home Services",
    subtitle: "Wellness, wherever you are",
    tagline: "Luxury at your doorstep.",
    image: "/images/new-1.webp",
    services: [
      { name: "Island Home Service", price: "+₦25,000", description: "Home spa service across Lekki & Island areas." },
      { name: "Mainland Home Service", price: "From ₦50,000", description: "Home spa services across Mainland areas (varies by location)." },
      { name: "Late-Night Bookings", price: "+₦20,000", description: "Additional surcharge for after-hours appointments." },
    ],
  },
];

export default function Services() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [bookCategory, setBookCategory] = useState<string | null>(null);

  const activeCategory = categories.find((c) => c.id === openCategory);

  const handleBook = (catId: string, serviceName = "") => {
    setBookCategory(catId);
    const nameInput = document.getElementById("selected-service-name") as HTMLInputElement | null;
    if (nameInput) nameInput.value = serviceName;
    const bookLink = document.getElementById("book");
    if (bookLink) bookLink.click();
  };

  const handleOpen = (id: string) => {
    setOpenCategory(id);
    setTimeout(() => {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <section id="services" className="py-16 md:py-20 lg:py-28 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-end mb-12 lg:mb-16">
          <Reveal>
            <div className="text-[#d6a24b] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
              Our Services
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-[1.1] lg:leading-[1.05] text-[var(--text-primary)]">
              Curated for<br />
              your <span className="text-[#d6a24b] italic">well-being</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-md mb-4">
              From indulgent massages to signature rituals, we offer a complete journey of relaxation, beauty and renewal. Explore by category.
            </p>
            <AnimatePresence>
              {openCategory && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={T.fast}
                  onClick={() => setOpenCategory(null)}
                  whileHover={{ x: -4 }}
                  className="inline-flex items-center gap-2 text-[#d6a24b] text-xs font-semibold tracking-[0.2em] uppercase"
                >
                  ← Back to all categories
                </motion.button>
              )}
            </AnimatePresence>
          </Reveal>
        </div>

        <AnimatePresence mode="wait">
          {!openCategory && (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={T.base}
            >
              <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" delay={0.08}>
                {categories.map((c) => (
                  <StaggerItem key={c.id}>
                    <CategoryCard category={c} onClick={() => handleOpen(c.id)} />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </motion.div>
          )}

          {openCategory && activeCategory && (
            <motion.div
              key={`detail-${activeCategory.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={T.base}
            >
              <CategoryBanner category={activeCategory} />

              <StaggerGroup
                className="mt-10 grid lg:grid-cols-2 gap-x-12 gap-y-0"
                delay={0.05}
              >
                {activeCategory.services.map((s, idx) => (
                  <StaggerItem key={s.name}>
                    <ServiceRow service={s} index={idx} onBook={(name) => handleBook(activeCategory.id, name)} />
                  </StaggerItem>
                ))}
              </StaggerGroup>

              <Reveal delay={0.1}>
                <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                  <motion.a
                    href="#book"
                    onClick={(e) => {
                      e.preventDefault();
                      handleBook(activeCategory.id);
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={T.fast}
                    className="btn-gold inline-flex items-center gap-2 bg-[#c88e2e] hover:bg-[#d6a24b] text-black text-xs font-semibold tracking-wider uppercase px-6 py-3.5 rounded-full transition-colors duration-300 group"
                  >
                    Book This Category
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                      <ArrowRightIcon size={13} />
                    </span>
                  </motion.a>
                  <motion.button
                    onClick={() => setOpenCategory(null)}
                    whileHover={{ x: -3 }}
                    whileTap={{ scale: 0.97 }}
                    transition={T.fast}
                    className="inline-flex items-center gap-2 border border-[var(--border-base)] hover:border-[#d6a24b] hover:text-[#d6a24b] text-[var(--text-primary)] text-xs font-semibold tracking-wider uppercase px-6 py-3.5 rounded-full transition-colors duration-300"
                  >
                    ← Back to All Categories
                  </motion.button>
                </div>
              </Reveal>
            </motion.div>
          )}
        </AnimatePresence>

        <input type="hidden" id="selected-service" value={bookCategory ?? ""} />
        <input type="hidden" id="selected-service-name" value="" />
      </div>
    </section>
  );
}

function CategoryCard({ category, onClick }: { category: Category; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={T.fast}
      className="group relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-black text-left"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 transition-opacity duration-500 group-hover:opacity-90" />

      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/40 border border-[#d6a24b]/40 backdrop-blur-sm transition-transform duration-500 group-hover:rotate-12">
          <category.icon size={16} className="text-[#d6a24b]" />
        </span>
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/70 font-semibold bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
          {category.services.length} services
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col items-start z-10">
        <div className="text-[10px] tracking-[0.2em] uppercase text-[#d6a24b] font-semibold mb-1">
          {category.subtitle}
        </div>
        <div className="font-display text-white text-xl sm:text-2xl lg:text-3xl leading-tight mb-2">
          {category.title}
        </div>
        <p className="text-white/60 text-xs leading-snug mb-4">{category.tagline}</p>
        <div className="inline-flex items-center gap-2 text-white text-[10px] tracking-[0.2em] uppercase group-hover:text-[#d6a24b] transition-colors duration-300">
          <span>View Menu</span>
          <ChevronDown size={12} className="transition-transform duration-500 group-hover:translate-y-1" />
        </div>
      </div>
    </motion.button>
  );
}

function CategoryBanner({ category }: { category: Category }) {
  const Icon = category.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: ease.out }}
      className="relative rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-black aspect-[16/9] sm:aspect-[21/9]"
    >
      <motion.img
        src={category.image}
        alt={category.title}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: ease.out }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <motion.div
        className="absolute inset-0 flex items-end p-6 sm:p-8 lg:p-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: ease.out, delay: 0.4 }}
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: ease.out, delay: 0.6 }}
              className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#d6a24b]/20 border border-[#d6a24b]/40 backdrop-blur-sm"
            >
              <Icon size={20} className="text-[#d6a24b]" />
            </motion.span>
            <span className="text-[#d6a24b] text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold">
              {category.subtitle}
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl xl:text-6xl text-white leading-[1.05] mb-3">
            {category.title}
          </h3>
          <p className="text-white/70 text-sm max-w-xl">{category.tagline}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ServiceRow({ service, index, onBook }: { service: Service; index: number; onBook: (name: string) => void }) {
  return (
    <div className="group py-6 border-b border-[var(--border-subtle)] transition-colors duration-300 hover:bg-[var(--bg-card)] px-2 -mx-2 rounded-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h4 className="font-sans font-semibold text-base sm:text-[17px] lg:text-lg text-[var(--text-primary)] leading-snug transition-colors duration-300 group-hover:text-[#d6a24b] tracking-[-0.01em]">
              {service.name}
            </h4>
            {service.name === "The Escape" && (
              <span className="text-[9px] tracking-[0.15em] uppercase bg-[#d6a24b] text-black font-bold px-2 py-0.5 rounded-full shrink-0">
                Most Loved
              </span>
            )}
          </div>
          {service.duration && (
            <div className="text-[#d6a24b] text-[11px] tracking-[0.15em] uppercase font-semibold mb-2">
              {service.duration}
            </div>
          )}
          <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-md">
            {service.description}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 shrink-0">
          <div className="font-sans font-bold text-base sm:text-lg lg:text-xl text-[#d6a24b] whitespace-nowrap tracking-[-0.02em]">
            {service.price}
          </div>
          <motion.button
            onClick={onBook}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={T.fast}
            className="w-9 h-9 rounded-full border border-[var(--border-strong)] hover:border-[#d6a24b] hover:bg-[#d6a24b] hover:text-black flex items-center justify-center text-[var(--text-primary)] transition-colors duration-300"
            aria-label={`Book ${service.name}`}
            onClick={() => onBook(service.name)}
          >
            <ArrowRightIcon size={14} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
