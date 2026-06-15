import { motion } from "framer-motion";
import { Reveal, ease } from "./Motion";

const galleryImages = [
  { src: "/images/new-2.webp", alt: "Harmony Palms Wellness Spa interior lounge" },
  { src: "/images/new-3.webp", alt: "Harmony Palms Wellness Spa treatment room" },
  { src: "/images/new-4.webp", alt: "Harmony Palms Wellness Spa romantic suite" },
  { src: "/images/new-5.webp", alt: "Harmony Palms Wellness Spa spa essentials" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 md:py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal>
          <div className="text-[#d6a24b] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
            Our Space
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-[1.1] lg:leading-[1.05] text-[var(--text-primary)] mb-10">
            Step inside
            <br />
            <span className="text-[#d6a24b] italic">the sanctuary</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              className="relative overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-black aspect-[3/4]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.7, ease: ease.out, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
