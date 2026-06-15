import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import type { Variants, MotionProps, Transition } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  DESIGN TOKENS — ONE SOURCE OF TRUTH                                */
/*  All timing & easing is centralized so motion feels consistent.    */
/* ------------------------------------------------------------------ */

export const ease = {
  /** Primary easing — smooth, premium feel. Used for 95% of motion. */
  out: [0.22, 1, 0.36, 1] as [number, number, number, number],
  /** Symmetric easing for hover toggles and looping animations. */
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
};

/** Standard durations — keep choices few to maintain rhythm. */
export const duration = {
  fast: 0.25,   // hover, tap, micro-interactions
  base: 0.45,   // most reveals
  slow: 0.7,    // hero, image reveals
};

/** Stagger interval between sequenced items. */
export const stagger = {
  tight: 0.05,
  base: 0.08,
  loose: 0.12,
};

/** Viewport defaults — reveal once, trigger slightly before in view. */
export const viewport = { once: true, margin: "0px 0px -80px 0px" };

/** Default transition presets. */
export const T = {
  fast: { duration: duration.fast, ease: ease.out } as Transition,
  base: { duration: duration.base, ease: ease.out } as Transition,
  slow: { duration: duration.slow, ease: ease.out } as Transition,
};

/* ------------------------------------------------------------------ */
/*  VARIANTS                                                          */
/* ------------------------------------------------------------------ */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: T.base },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: T.base },
};

export const containerStagger = (delay = stagger.base): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: delay,
      delayChildren: 0.05,
    },
  },
});

/* ------------------------------------------------------------------ */
/*  Reveal — Single fade-up wrapper for any element                   */
/* ------------------------------------------------------------------ */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: keyof React.JSX.IntrinsicElements;
} & Omit<MotionProps, "initial" | "animate" | "variants" | "whileInView" | "viewport" | "transition">;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  as = "div",
  ...rest
}: RevealProps) {
  const MotionTag = motion(as as any);
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ ...T.base, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/*  StaggerGroup — wrap children to stagger reveal them               */
/* ------------------------------------------------------------------ */

export function StaggerGroup({
  children,
  className,
  delay = stagger.base,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={containerStagger(delay)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const item: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: T.base },
  };
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  ImageReveal — Elegant clip-path mask reveal for hero/banner imgs  */
/* ------------------------------------------------------------------ */

export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className ?? ""}`}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={viewport}
      transition={{ duration: 1, ease: ease.out, delay }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover ${imgClassName ?? ""}`}
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={viewport}
        transition={{ duration: 1.4, ease: ease.out, delay }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  AnimatedCounter — counts up when scrolled into view               */
/* ------------------------------------------------------------------ */

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration: dur = 1.4,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: dur, ease: ease.out });
    return controls.stop;
  }, [inView, value, dur, mv]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Standard hover presets                                            */
/* ------------------------------------------------------------------ */

export const hoverLift = {
  whileHover: { y: -3 },
  whileTap: { y: 0, scale: 0.98 },
  transition: T.fast,
};

export const hoverScale = {
  whileHover: { scale: 1.04 },
  whileTap: { scale: 0.96 },
  transition: T.fast,
};
