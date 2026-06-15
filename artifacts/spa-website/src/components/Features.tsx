import { motion } from "framer-motion";
import { CrownIcon, LotusIcon, DropIcon, LockIcon, ArrowRightIcon } from "./Icons";
import { StaggerGroup, StaggerItem, T } from "./Motion";

const features = [
  { icon: CrownIcon, title: "5-STAR EXPERIENCE", desc: "World-class service in every detail." },
  { icon: LotusIcon, title: "EXPERT THERAPISTS", desc: "Highly trained professionals. Intuitive care." },
  { icon: DropIcon, title: "PREMIUM PRODUCTS", desc: "Luxury wellness brands. Visible results." },
  { icon: LockIcon, title: "PRIVATE SANCTUARY", desc: "Discreet. Serene. Exclusively yours." },
];

export default function Features() {
  return (
    <section className="relative border-t border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" delay={0.08}>
          {features.map((f) => (
            <StaggerItem
              key={f.title}
              className="border-b sm:border-b-0 sm:border-r border-[var(--border-subtle)] last:sm:border-r-0"
            >
              <div className="flex items-start gap-4 px-4 sm:px-6 py-6 sm:py-8 h-full transition-colors duration-300 hover:bg-[var(--bg-card)]">
                <f.icon size={26} className="text-[#d6a24b] shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] tracking-[0.2em] text-[var(--text-primary)] font-semibold leading-tight">
                    {f.title}
                  </div>
                  <div className="text-[var(--text-muted)] text-xs mt-1.5 leading-relaxed">
                    {f.desc}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
          <StaggerItem className="sm:col-span-2 lg:col-span-1">
            <motion.a
              href="#services"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              transition={T.fast}
              className="bg-[#d6a24b] hover:bg-[#c88e2e] flex items-center justify-between gap-4 px-4 sm:px-6 py-6 sm:py-8 cursor-pointer h-full transition-colors duration-300 group"
            >
              <div className="flex-1 min-w-0">
                <div className="text-[11px] tracking-[0.2em] text-black font-semibold leading-tight">
                  GIFT WELLNESS
                </div>
                <div className="text-black/70 text-xs mt-1.5 leading-relaxed">
                  Give the gift of relaxation.
                </div>
              </div>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/10 group-hover:bg-black/20 transition-all duration-300 group-hover:translate-x-1 shrink-0">
                <ArrowRightIcon size={14} className="text-black" />
              </span>
            </motion.a>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
