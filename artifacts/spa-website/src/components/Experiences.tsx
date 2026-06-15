import { motion } from "framer-motion";
import { ArrowRightIcon } from "./Icons";
import { Reveal, T } from "./Motion";

export default function Experiences() {
  return (
    <section
      id="experiences"
      className="py-16 md:py-20 lg:py-28 relative bg-gradient-to-b from-[var(--bg-base)] to-[var(--bg-elevated)]"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-[1.1] lg:leading-[1.05] text-[var(--text-primary)] mb-5">
            Experience
            <br />
            <span className="text-[#d6a24b] italic">Harmony</span>
            <br />
            your way
          </h2>
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-md mb-6">
            Choose from our curated experiences designed for total mind, body & soul renewal.
          </p>
          <motion.a
            href="#services"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={T.fast}
            className="btn-gold inline-flex items-center gap-2 bg-[#c88e2e] hover:bg-[#d6a24b] text-black text-xs font-semibold tracking-wider uppercase px-6 py-3.5 rounded-full transition-colors duration-300 group"
          >
            Book An Experience
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
              <ArrowRightIcon size={12} />
            </span>
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
