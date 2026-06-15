/* ------------------------------------------------------------------ */
/*  DESIGN SYSTEM — The Harmony Palms                                  */
/*  Consistent spacing, typography, and layout tokens                 */
/* ------------------------------------------------------------------ */

// Spacing scale (4px base unit)
export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
} as const;

// Section padding (consistent across all sections)
export const sectionPadding = {
  mobile: 'py-16 px-4',     // 64px vertical, 16px horizontal
  tablet: 'md:py-20 md:px-6', // 80px vertical, 24px horizontal
  desktop: 'lg:py-28 lg:px-10', // 112px vertical, 40px horizontal
} as const;

// Container max-widths
export const containers = {
  sm: 'max-w-6xl',    // 1152px
  md: 'max-w-7xl',    // 1280px
  lg: 'max-w-[1400px]', // 1400px
} as const;

// Typography scale (mobile-first)
export const typography = {
  // Display headings (hero sections)
  display: {
    mobile: 'text-4xl',        // 36px
    tablet: 'sm:text-5xl',     // 48px
    desktop: 'lg:text-6xl xl:text-7xl', // 60px / 72px
    leading: 'leading-[1.05]',
  },
  // Section headings
  heading: {
    mobile: 'text-2xl',        // 24px
    tablet: 'sm:text-3xl',     // 30px
    desktop: 'lg:text-4xl',    // 36px
    leading: 'leading-tight',
  },
  // Subheadings
  subheading: {
    mobile: 'text-xl',         // 20px
    tablet: 'sm:text-2xl',     // 24px
    leading: 'leading-snug',
  },
  // Body text
  body: {
    small: 'text-sm',          // 14px
    base: 'text-base',         // 16px
    leading: 'leading-relaxed',
  },
  // Labels & captions
  label: {
    small: 'text-[10px]',      // 10px
    base: 'text-xs',           // 12px
    tracking: 'tracking-wider',
    uppercase: 'uppercase',
  },
} as const;

// Grid gaps
export const gridGaps = {
  tight: 'gap-3',      // 12px
  base: 'gap-4',       // 16px
  medium: 'gap-6',     // 24px
  large: 'gap-8',      // 32px
  xl: 'gap-12',        // 48px
} as const;

// Button sizes
export const buttons = {
  primary: 'btn-gold inline-flex items-center gap-2 bg-[#c88e2e] hover:bg-[#d6a24b] text-black text-xs font-semibold tracking-wider uppercase px-6 py-3.5 rounded-full transition-colors duration-300',
  secondary: 'inline-flex items-center gap-2 border border-[var(--border-base)] hover:border-[#d6a24b] hover:text-[#d6a24b] text-[var(--text-primary)] text-xs font-semibold tracking-wider uppercase px-6 py-3.5 rounded-full transition-colors duration-300',
  small: 'inline-flex items-center gap-2 bg-[#c88e2e] hover:bg-[#d6a24b] text-black text-[10px] font-semibold tracking-wider uppercase px-4 py-2.5 rounded-full transition-colors duration-300',
} as const;

// Border radius
export const radius = {
  sm: 'rounded',       // 4px
  md: 'rounded-lg',    // 8px
  lg: 'rounded-xl',    // 12px
  xl: 'rounded-2xl',   // 16px
  full: 'rounded-full', // 9999px
} as const;

// Shadows
export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
} as const;

// Z-index scale
export const zIndices = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  toast: 50,
} as const;
