export type BookingService = {
  id: string;
  category: string;
  name: string;
  duration: number; // minutes
  price: number; // NGN
  description: string;
  image: string;
  popular?: boolean;
};

export const bookingServices: BookingService[] = [
  // Signature Rituals
  { id: "surrender", category: "Signature Rituals", name: "The Surrender", duration: 80, price: 90000, description: "Slow, flowing movements guide your body into deep relaxation.", image: "/images/ritual.webp", popular: true },
  { id: "surrender-swedish", category: "Signature Rituals", name: "The Surrender + Swedish Flow", duration: 80, price: 100000, description: "Swedish relaxation blended with flowing bodywork for full renewal.", image: "/images/ritual.webp" },
  { id: "surrender-deep", category: "Signature Rituals", name: "The Surrender + Deep Release", duration: 80, price: 100000, description: "Soothing relaxation with focused deep pressure.", image: "/images/ritual.webp" },
  { id: "escape", category: "Signature Rituals", name: "The Escape", duration: 80, price: 120000, description: "Warm oils and continuous flowing touch for deep surrender.", image: "/images/ritual.webp" },
  { id: "ancient-warmth", category: "Signature Rituals", name: "The Ancient Warmth", duration: 80, price: 100000, description: "Heated stone therapy that melts muscle tension.", image: "/images/ritual.webp" },
  { id: "aromatherapy", category: "Signature Rituals", name: "Aromatherapy Massage", duration: 80, price: 100000, description: "Custom essential oils + heated towels for sensory wellness.", image: "/images/ritual.webp" },
  { id: "scalp-hair", category: "Signature Rituals", name: "Scalp & Hair Ritual", duration: 80, price: 70000, description: "Deeply relaxing head spa that releases scalp tension.", image: "/images/ritual.webp" },
  { id: "four-hand", category: "Signature Rituals", name: "Four Hand Ritual", duration: 80, price: 200000, description: "Two therapists in perfect synchronization.", image: "/images/ritual.webp" },
  { id: "six-hand", category: "Signature Rituals", name: "Six Hand Ritual", duration: 80, price: 300000, description: "Three therapists for the ultimate luxury escape.", image: "/images/ritual.webp" },

  // Therapeutic
  { id: "stillness", category: "Therapeutic Massages", name: "The Stillness (Swedish)", duration: 60, price: 65000, description: "Gentle strokes to relax body and improve circulation.", image: "/images/massage.webp", popular: true },
  { id: "unburdening", category: "Therapeutic Massages", name: "The Unburdening (Deep Tissue)", duration: 60, price: 65000, description: "Targeted pressure to release deep muscle tension.", image: "/images/massage.webp" },
  { id: "balance", category: "Therapeutic Massages", name: "The Balance (Combination)", duration: 60, price: 80000, description: "Tailored blend of relaxation and therapeutic techniques.", image: "/images/massage.webp" },
  { id: "head-therapy", category: "Therapeutic Massages", name: "Head Therapy", duration: 30, price: 40000, description: "Relieves stress, headaches, and mental fatigue.", image: "/images/massage.webp" },
  { id: "sports-stretch", category: "Therapeutic Massages", name: "Sports Stretch Therapy", duration: 45, price: 50000, description: "Improves flexibility and supports muscle recovery.", image: "/images/massage.webp" },
  { id: "foot-ritual", category: "Therapeutic Massages", name: "Foot Ritual", duration: 30, price: 40000, description: "Pressure-point foot therapy to restore balance.", image: "/images/massage.webp" },

  // Couples
  { id: "reconnection", category: "Couples Experiences", name: "The Reconnection", duration: 80, price: 170000, description: "Side-by-side massage for relaxation and reconnection.", image: "/images/couples.webp", popular: true },
  { id: "reconnection-plus", category: "Couples Experiences", name: "The Reconnection Plus", duration: 80, price: 200000, description: "Includes wine + fresh fruit platter.", image: "/images/couples.webp" },

  // Beauty
  { id: "body-wax", category: "Beauty Care", name: "Full Body Wax", duration: 60, price: 80000, description: "Full-body waxing for smooth, polished skin.", image: "/images/beauty.webp" },
  { id: "bikini-wax", category: "Beauty Care", name: "Bikini Wax", duration: 30, price: 65000, description: "Professional grooming with comfort and discretion.", image: "/images/beauty.webp" },
  { id: "pedicure", category: "Beauty Care", name: "Pedicure", duration: 60, price: 40000, description: "Foot care that restores softness and freshness.", image: "/images/beauty.webp" },
];

export type Therapist = {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  initial: string;
  experience: string;
  rating: number;
};

export const therapists: Therapist[] = [
  { id: "any", name: "First Available", title: "Concierge's choice", specialties: ["All services"], initial: "✦", experience: "We'll match you with the best therapist for your booking.", rating: 5 },
  { id: "amara", name: "Amara K.", title: "Lead Wellness Therapist", specialties: ["Signature Rituals", "Deep Tissue"], initial: "A", experience: "12 years experience", rating: 5 },
  { id: "ngozi", name: "Ngozi O.", title: "Senior Therapist", specialties: ["Aromatherapy", "Swedish"], initial: "N", experience: "8 years experience", rating: 5 },
  { id: "tomi", name: "Tomi A.", title: "Wellness Specialist", specialties: ["Couples", "Hot Stone"], initial: "T", experience: "6 years experience", rating: 5 },
  { id: "ifeanyi", name: "Ifeanyi U.", title: "Master Therapist", specialties: ["Six Hand", "Scalp"], initial: "I", experience: "15 years experience", rating: 5 },
];

export type AddOn = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export const addOns: AddOn[] = [
  { id: "drifting", name: "The Drifting (+1HR Lounge)", price: 70000, description: "Extended relaxation time in our private lounge." },
  { id: "champagne", name: "Champagne Service", price: 35000, description: "A glass of premium champagne with your treatment." },
  { id: "fruit", name: "Fresh Fruit Platter", price: 15000, description: "Seasonal organic fruit selection." },
  { id: "scalp-addon", name: "Scalp Mini-Treatment (+20 MIN)", price: 25000, description: "Extend your bliss with a focused scalp ritual." },
  { id: "late-night", name: "Late-Night Booking (10pm – 6am)", price: 20000, description: "Surcharge for after-hours appointments." },
];

export type LocationOption = {
  id: "spa" | "island-home" | "mainland-home";
  label: string;
  description: string;
  surcharge: number;
};

export const locationOptions: LocationOption[] = [
  { id: "spa", label: "At the Spa", description: "14 Prince Bode Adebowale Crescent, Lekki Phase 1", surcharge: 0 },
  { id: "island-home", label: "Home — Island", description: "Lekki, VI, Ikoyi areas", surcharge: 25000 },
  { id: "mainland-home", label: "Home — Mainland", description: "Mainland Lagos — starting from ₦50,000 (varies by location)", surcharge: 50000 },
];

export const timeSlots = [
  "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00", "21:00", "22:00",
  "23:00", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00",
];

export const LATE_NIGHT_SLOTS = new Set([
  "22:00", "23:00", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
]);

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);
