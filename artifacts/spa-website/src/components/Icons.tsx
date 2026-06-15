import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const PalmLogo = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.5" />
    <path d="M32 12 C32 12, 22 22, 22 34 C22 42, 27 50, 32 52 C37 50, 42 42, 42 34 C42 22, 32 12, 32 12 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M32 20 L32 50" stroke="currentColor" strokeWidth="1" />
    <path d="M26 28 Q32 26, 38 28" stroke="currentColor" strokeWidth="1" />
    <path d="M25 36 Q32 34, 39 36" stroke="currentColor" strokeWidth="1" />
    <path d="M27 44 Q32 42, 37 44" stroke="currentColor" strokeWidth="1" />
    <path d="M28 22 Q26 24, 26 26" stroke="currentColor" strokeWidth="1" />
    <path d="M36 22 Q38 24, 38 26" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const CrownIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <path d="M3 17 L7 7 L12 12 L16 4 L20 12 L25 7 L29 17 Z" />
    <path d="M3 17 H29 V21 H3 Z" />
  </svg>
);

export const LotusIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <path d="M12 14 C12 14, 8 8, 4 12 C4 16, 10 18, 12 18 C14 18, 20 16, 20 12 C16 8, 12 14, 12 14 Z" />
    <path d="M12 18 C12 18, 10 22, 12 24 C14 22, 12 18, 12 18 Z" />
    <path d="M12 10 C12 10, 10 6, 12 4 C14 6, 12 10, 12 10 Z" />
  </svg>
);

export const DropIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <path d="M12 4 C12 4, 6 11, 6 15 C6 19, 9 22, 12 22 C15 22, 18 19, 18 15 C18 11, 12 4, 12 4 Z" />
  </svg>
);

export const LockIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <rect x="5" y="11" width="14" height="10" rx="1" />
    <path d="M8 11 V7 A4 4 0 0 1 16 7 V11" />
    <circle cx="12" cy="16" r="1" fill="currentColor" />
    <path d="M12 16 V18" />
  </svg>
);

export const GiftIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <rect x="4" y="10" width="16" height="10" rx="1" />
    <path d="M4 14 H20" />
    <path d="M12 10 V20" />
    <path d="M12 10 C12 6, 8 4, 6 6 C4 8, 8 10, 12 10 Z" />
    <path d="M12 10 C12 6, 16 4, 18 6 C20 8, 16 10, 12 10 Z" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 6 V12 L16 14" />
    <text x="12" y="20" fontSize="5" fill="currentColor" stroke="none" textAnchor="middle" fontWeight="700">24</text>
  </svg>
);

export const LocationIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <path d="M12 21 C12 21, 5 15, 5 9 A7 7 0 1 1 19 9 C19 15, 12 21, 12 21 Z" />
    <circle cx="12" cy="9" r="2" fill="currentColor" stroke="none" />
  </svg>
);

export const HandsIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <path d="M6 14 C8 12, 10 12, 12 14 L16 10 C17 9, 18 9, 19 10 L17 12 L19 14 C18 16, 16 18, 12 18 C8 18, 6 16, 6 14 Z" />
    <circle cx="18" cy="8" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

export const HeartIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <path d="M12 20 C12 20, 4 15, 4 9 A4 4 0 0 1 12 7 A4 4 0 0 1 20 9 C20 15, 12 20, 12 20 Z" />
  </svg>
);

export const FaceIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M8 10 Q9 8, 10 10" />
    <path d="M14 10 Q15 8, 16 10" />
    <path d="M9 15 Q12 17, 15 15" />
  </svg>
);

export const HomeIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <path d="M4 11 L12 4 L20 11 V20 A1 1 0 0 1 19 21 H5 A1 1 0 0 1 4 20 Z" />
    <path d="M10 21 V14 H14 V21" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <path d="M5 12 H19" />
    <path d="M13 6 L19 12 L13 18" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <path d="M4 7 H20" />
    <path d="M4 12 H20" />
    <path d="M4 17 H20" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <path d="M5 4 H9 L11 9 L8 11 C9.5 14, 11 15.5, 13 17 L15 14 L20 16 V20 C20 21, 19 21, 18 21 C9 21, 3 15, 3 6 C3 5, 4 4, 5 4 Z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7 L12 13 L21 7" />
  </svg>
);

export const InstagramIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
  </svg>
);

export const TikTokIcon = (p: IconProps) => (
  <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="currentColor" className={p.className} aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
  </svg>
);

export const FacebookIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <path d="M18 2 H15 A4 4 0 0 0 11 6 V8 H8 V12 H11 V22 H15 V12 H18 L19 8 H15 V6 A1 1 0 0 1 16 6 H18 V2 Z" />
  </svg>
);

export const WhatsappIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <path d="M20 4 A8 8 0 0 0 4.6 12 L3 21 L12 19.4 A8 8 0 0 0 20 12 Z" />
    <path d="M9 11 L10 13 L9 15 L11 16 L13 15 L14 14 L15 15 L13 17 C11 18, 9 17, 8 15 L7 13 L8 11 Z" />
  </svg>
);

export const DiamondIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <path d="M12 2 L20 8 L12 22 L4 8 Z" />
    <path d="M4 8 H20" />
    <path d="M12 2 L9 8 L12 22 L15 8 Z" />
  </svg>
);

export const MedalIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 4 V8" />
    <path d="M8 12 L11 15 L16 10" />
    <path d="M9 20 L8 24 L12 22 L16 24 L15 20" />
  </svg>
);

export const StarIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p} fill="currentColor">
    <path d="M12 2 L14.5 8.5 L21 9.3 L16 13.5 L17.5 20 L12 16.5 L6.5 20 L8 13.5 L3 9.3 L9.5 8.5 Z" />
  </svg>
);

export const QuoteIcon = (p: IconProps) => (
  <svg width={p.size || 32} height={p.size || 32} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M6 17 L6 10 C6 7, 8 5, 10 5 L10 7 C8.5 7, 8 8, 8 9 L10 9 L10 17 Z M14 17 L14 10 C14 7, 16 5, 18 5 L18 7 C16.5 7, 16 8, 16 9 L18 9 L18 17 Z" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <path d="M5 12 L10 17 L19 7" />
  </svg>
);

export const SunIcon = (p: IconProps) => (
  <svg {...base} width={p.size} height={p.size} {...p}>
    <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
    <path d="M12 3 V5 M12 19 V21 M5 12 H3 M21 12 H19 M7 7 L5.5 5.5 M19 19 L17.5 17.5 M7 17 L5.5 18.5 M19 5 L17.5 6.5" />
  </svg>
);
