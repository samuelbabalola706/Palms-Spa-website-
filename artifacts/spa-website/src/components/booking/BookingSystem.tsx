import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "../Motion";
import { ArrowRightIcon, CheckIcon, LocationIcon, ClockIcon } from "../Icons";
import {
  bookingServices,
  addOns,
  timeSlots,
  LATE_NIGHT_SLOTS,
  servicePricingOptions,
  formatPrice,
  type BookingService,
  type ServicePricingOption,
} from "./bookingData";

const parseDateLocal = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

/* ------------------------------------------------------------------ */
/*  BOOKING DESTINATION — Email + WhatsApp                              */
/*  All bookings are sent to WhatsApp automatically.                  */
/* ------------------------------------------------------------------ */
export const BOOKING_EMAIL = "theharmonypalmsspa@gmail.com";
export const BOOKING_WHATSAPP = "2348123020985";
export const BOOKING_WHATSAPP_DISPLAY = "0812 302 0985";

type Step = 1 | 2 | 3 | 4 | 5;

const steps = [
  { n: 1, label: "Location" },
  { n: 2, label: "Service" },
  { n: 3, label: "Date & Time" },
  { n: 4, label: "Details" },
  { n: 5, label: "Review" },
] as const;

export default function BookingSystem() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [completed, setCompleted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  // Form state
  const [service, setService] = useState<BookingService | null>(null);
  const [pricingOption, setPricingOption] = useState<ServicePricingOption | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guest, setGuest] = useState({ name: "", email: "", phone: "", notes: "" });

  // Listen for global "book" trigger
  useEffect(() => {
    const el = document.getElementById("book");
    if (!el) return;
    const onClick = (e: Event) => {
      e.preventDefault();
      const selectedInput = document.getElementById("selected-service") as HTMLInputElement | null;
      const selectedNameInput = document.getElementById("selected-service-name") as HTMLInputElement | null;
      const serviceName = selectedNameInput?.value?.trim() ?? "";

      let matchedService: BookingService | null = null;

      if (serviceName) {
        // Exact name match first
        matchedService = bookingServices.find((s) => s.name === serviceName) ?? null;
        // Fallback: prefix match (handles minor name differences like "(Swedish Relaxation)" vs "(Swedish)")
        if (!matchedService) {
          const prefix = serviceName.split("(")[0].trim();
          matchedService = bookingServices.find((s) => s.name.startsWith(prefix)) ?? null;
        }
      }

      // Fallback: match by category
      if (!matchedService && selectedInput?.value) {
        const map: Record<string, string> = {
          signature: "Signature Rituals",
          therapeutic: "Therapeutic Massages",
          couples: "Couples Experiences",
          beauty: "Beauty Care",
          addons: "Signature Rituals",
          home: "Therapeutic Massages",
        };
        const cat = map[selectedInput.value];
        if (cat) matchedService = bookingServices.find((s) => s.category === cat) ?? null;
      }

      setCompleted(false);
      if (matchedService) {
        setService(matchedService);
      }
      // Always start at step 1 (Location & Pricing) — it is required
      setStep(1);
      setDirection(1);
      setOpen(true);
    };
    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reset on close (always)
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep(1);
      setService(null);
      setPricingOption(null);
      setSelectedAddOns([]);
      setDate("");
      setTime("");
      setGuest({ name: "", email: "", phone: "", notes: "" });
      setCompleted(false);
    }, 400);
  };

  const goNext = () => {
    setDirection(1);
    setStep((s) => (s < 5 ? ((s + 1) as Step) : s));
  };
  const goPrev = () => {
    setDirection(-1);
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
  };

  // Validation
  const canProceed = useMemo(() => {
    switch (step) {
      case 1: return !!pricingOption;
      case 2: return !!service;
      case 3: return !!date && !!time;
      case 4: return guest.name.trim().length > 1 && /\S+@\S+\.\S+/.test(guest.email) && guest.phone.length >= 7;
      default: return true;
    }
  }, [step, service, pricingOption, date, time, guest]);

  const addOnsTotal = useMemo(
    () => selectedAddOns.reduce((sum, id) => sum + (addOns.find((a) => a.id === id)?.price ?? 0), 0),
    [selectedAddOns]
  );
  const total = (service?.price ?? 0) + addOnsTotal + (pricingOption?.surcharge ?? 0);

  /* ------------------------------------------------------------------ */
  /*  Build the formatted booking payload                               */
  /* ------------------------------------------------------------------ */
  const formatBookingPayload = (code: string) => {
    const chosenAddOns = addOns.filter((a) => selectedAddOns.includes(a.id));
    const dateFmt = date
      ? parseDateLocal(date).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "—";

    return {
      code,
      guestName: guest.name,
      guestEmail: guest.email,
      guestPhone: guest.phone,
      serviceName: service?.name ?? "—",
      serviceCategory: service?.category ?? "—",
      duration: service?.duration ? `${service.duration} MIN` : "—",
      date: dateFmt,
      time,
      pricingLabel: pricingOption?.label ?? "—",
      pricingBadge: pricingOption?.badge ?? "—",
      pricingDesc: pricingOption?.description ?? "—",
      isLateNight: pricingOption?.isLateNight ?? false,
      addOns: chosenAddOns,
      notes: guest.notes || "—",
      total: formatPrice(total),
    };
  };

  /* ------------------------------------------------------------------ */
  /*  Build well-formatted EMAIL body                                    */
  /* ------------------------------------------------------------------ */
  const buildEmailSubject = (code: string) =>
    `Booking Request ${code} — ${service?.name ?? "Spa"} — ${guest.name}`;

  const buildEmailBody = (p: ReturnType<typeof formatBookingPayload>) => {
    const addOnsSection = p.addOns.length
      ? p.addOns.map((a) => `    • ${a.name} — ${formatPrice(a.price)}`).join("\n")
      : "    (None)";

    return [
      "════════════════════════════════════════════",
      `        NEW BOOKING REQUEST — ${p.code}`,
      "════════════════════════════════════════════",
      "",
      "GUEST DETAILS",
      "───────────────────────────────────────────",
      `    Name  : ${p.guestName}`,
      `    Email : ${p.guestEmail}`,
      `    Phone : ${p.guestPhone}`,
      "",
      "SERVICE DETAILS",
      "───────────────────────────────────────────",
      `    Service    : ${p.serviceName}`,
      `    Category   : ${p.serviceCategory}`,
      `    Duration   : ${p.duration}`,
      `    Date       : ${p.date}`,
      `    Time       : ${p.time}`,
      "",
      "SERVICE LOCATION & PRICING",
      "───────────────────────────────────────────",
      `    Option     : ${p.pricingLabel} (${p.pricingBadge})`,
      `    Details    : ${p.pricingDesc}`,
      `    Late-Night : ${p.isLateNight ? "Yes" : "No"}`,
      "",
      "ADD-ONS",
      "───────────────────────────────────────────",
      addOnsSection,
      "",
      "SPECIAL REQUESTS",
      "───────────────────────────────────────────",
      `    ${p.notes}`,
      "",
      "PRICE SUMMARY",
      "───────────────────────────────────────────",
      `    TOTAL: ${p.total}`,
      "",
      "════════════════════════════════════════════",
      "",
      "Confirmation code: " + p.code,
      "Sent automatically from The Harmony Palms website.",
      "Date of submission: " + new Date().toLocaleString("en-NG", { dateStyle: "full", timeStyle: "short" }),
    ].join("\n");
  };

  /* ------------------------------------------------------------------ */
  /*  Build well-formatted WHATSAPP message                              */
  /* ------------------------------------------------------------------ */
  const buildWhatsAppMessage = (p: ReturnType<typeof formatBookingPayload>) => {
    const addOnsSection = p.addOns.length
      ? p.addOns.map((a) => `▸ ${a.name} — ${formatPrice(a.price)}`).join("\n")
      : "▸ _(None)_";

    return [
      `🌴 *NEW BOOKING REQUEST*`,
      `*Confirmation:* ${p.code}`,
      "",
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *GUEST DETAILS*`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `• *Name:* ${p.guestName}`,
      `• *Email:* ${p.guestEmail}`,
      `• *Phone:* ${p.guestPhone}`,
      "",
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `✨ *SERVICE DETAILS*`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `• *Service:* ${p.serviceName}`,
      `• *Category:* ${p.serviceCategory}`,
      `• *Duration:* ${p.duration}`,
      `• *Date:* ${p.date}`,
      `• *Time:* ${p.time}`,
      "",
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `📍 *SERVICE LOCATION & PRICING*`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `• *Option:* ${p.pricingLabel}`,
      `• *Fee:* ${p.pricingBadge}`,
      `• *Details:* ${p.pricingDesc}`,
      `• *Late-Night:* ${p.isLateNight ? "Yes (10pm–6am surcharge)" : "No"}`,
      "",
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `➕ *ADD-ONS*`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      addOnsSection,
      "",
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `📝 *SPECIAL REQUESTS*`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `${p.notes}`,
      "",
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `💰 *TOTAL: ${p.total}*`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      "",
      `📩 _Sent automatically from The Harmony Palms website._`,
      `📅 ${new Date().toLocaleString("en-NG", { dateStyle: "full", timeStyle: "short" })}`,
    ].join("\n");
  };

  /* ------------------------------------------------------------------ */
  /*  Trigger both email + WhatsApp delivery                            */
  /* ------------------------------------------------------------------ */
  const handleConfirm = () => {
    const code = `HP-${Date.now().toString(36).slice(-6).toUpperCase()}`;
    const payload = formatBookingPayload(code);

    // Send booking directly to WhatsApp
    const waMessage = buildWhatsAppMessage(payload);
    const waUrl = `https://wa.me/${BOOKING_WHATSAPP}?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, "_blank");

    setConfirmationCode(code);
    setCompleted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="booking"
          className="fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.5, ease: ease.out }}
            className="relative w-full sm:max-w-4xl bg-[var(--bg-elevated)] border border-[var(--border-base)] sm:rounded-2xl shadow-2xl flex flex-col max-h-screen sm:max-h-[92vh] overflow-hidden"
          >
            {!completed ? (
              <>
                {/* Header */}
                <div className="relative px-6 sm:px-8 py-5 border-b border-[var(--border-subtle)] bg-gradient-to-b from-[var(--bg-deep)] to-transparent">
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full hover:bg-[var(--bg-card)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
                    aria-label="Close"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 6 L18 18 M18 6 L6 18" />
                    </svg>
                  </button>
                  <div className="text-[#d6a24b] text-[10px] tracking-[0.25em] uppercase font-semibold">
                    Reserve Your Escape
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-[var(--text-primary)] leading-tight mt-1">
                    Book your <span className="italic text-[#d6a24b]">experience</span>
                  </h3>
                  <Stepper current={step} onJump={(s) => s < step && setStep(s as Step)} />
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 sm:py-8">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={step}
                      custom={direction}
                      initial={{ opacity: 0, x: direction * 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -direction * 20 }}
                      transition={{ duration: 0.35, ease: ease.out }}
                    >
                      {step === 1 && (
                        <StepLocationPricing
                          pricingOption={pricingOption}
                          onPricingChange={setPricingOption}
                        />
                      )}
                      {step === 2 && (
                        <StepService
                          selected={service}
                          onSelect={setService}
                          addOnIds={selectedAddOns}
                          onAddOnsChange={setSelectedAddOns}
                        />
                      )}
                      {step === 3 && (
                        <StepDateTime
                          date={date}
                          time={time}
                          onDate={setDate}
                          onTime={(t) => {
                            setTime(t);
                            if (LATE_NIGHT_SLOTS.has(t)) {
                              const lnOpt = servicePricingOptions.find((o) => o.id === "late-night")!;
                              setPricingOption(lnOpt);
                            }
                          }}
                        />
                      )}
                      {step === 4 && (
                        <StepDetails guest={guest} onChange={setGuest} />
                      )}
                      {step === 5 && (
                        <StepReview
                          service={service}
                          pricingOption={pricingOption}
                          addOnIds={selectedAddOns}
                          date={date}
                          time={time}
                          guest={guest}
                          total={total}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="border-t border-[var(--border-subtle)] px-6 sm:px-8 py-4 sm:py-5 bg-[var(--bg-deep)] flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-faint)]">
                      {service ? service.duration + " MIN · TOTAL" : "Total"}
                    </span>
                    <motion.span
                      key={total}
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.35, ease: ease.out }}
                      className="font-display text-xl sm:text-2xl text-[#d6a24b]"
                    >
                      {service ? formatPrice(total) : "—"}
                    </motion.span>
                  </div>

                  <div className="flex items-center gap-2">
                    {step > 1 && (
                      <motion.button
                        onClick={goPrev}
                        whileHover={{ x: -3 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.25, ease: ease.out }}
                        className="hidden sm:inline-flex items-center gap-2 border border-[var(--border-base)] hover:border-[var(--border-strong)] text-[var(--text-primary)] text-xs font-semibold tracking-wider uppercase px-5 py-3 rounded-full"
                      >
                        ← Back
                      </motion.button>
                    )}
                    {step < 5 ? (
                      <motion.button
                        onClick={goNext}
                        disabled={!canProceed}
                        whileHover={canProceed ? { y: -2 } : {}}
                        whileTap={canProceed ? { y: 0, scale: 0.97 } : {}}
                        transition={{ duration: 0.25, ease: ease.out }}
                        className="btn-gold inline-flex items-center gap-2 bg-[#c88e2e] hover:bg-[#d6a24b] disabled:opacity-40 disabled:cursor-not-allowed text-black text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded-full transition-colors"
                      >
                        Continue
                        <ArrowRightIcon size={13} />
                      </motion.button>
                    ) : (
                      <motion.button
                        onClick={handleConfirm}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0, scale: 0.97 }}
                        transition={{ duration: 0.25, ease: ease.out }}
                        className="btn-gold inline-flex items-center gap-2 bg-[#c88e2e] hover:bg-[#d6a24b] text-black text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded-full transition-colors"
                      >
                        Confirm Booking
                        <CheckIcon size={14} />
                      </motion.button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <ConfirmationView
                code={confirmationCode}
                guest={guest}
                service={service}
                date={date}
                time={time}
                pricingOption={pricingOption}
                total={total}
                onClose={handleClose}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  STEPPER                                                           */
/* ------------------------------------------------------------------ */
function Stepper({ current, onJump }: { current: Step; onJump: (s: number) => void }) {
  return (
    <>
      <div className="mt-4 sm:hidden">
        <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase mb-2">
          <span className="text-[#d6a24b] font-semibold">Step {current} of {steps.length}</span>
          <span className="text-[var(--text-muted)]">{steps[current - 1].label}</span>
        </div>
        <div className="h-1 bg-[var(--border-base)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#d6a24b] rounded-full"
            initial={false}
            animate={{ width: `${(current / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: ease.out }}
          />
        </div>
      </div>

      <div className="mt-5 hidden sm:flex items-center gap-2">
        {steps.map((s, i) => {
          const isDone = s.n < current;
          const isActive = s.n === current;
          return (
            <div key={s.n} className="flex items-center gap-2 flex-1">
              <button
                onClick={() => onJump(s.n)}
                disabled={s.n >= current}
                className="flex items-center gap-2 group"
              >
                <motion.span
                  animate={{
                    backgroundColor: isActive ? "#d6a24b" : isDone ? "rgba(214,162,75,0.2)" : "transparent",
                    borderColor: isActive || isDone ? "#d6a24b" : "rgba(255,255,255,0.15)",
                    color: isActive ? "#000" : isDone ? "#d6a24b" : "var(--text-faint)",
                  }}
                  transition={{ duration: 0.4, ease: ease.out }}
                  className="w-7 h-7 rounded-full border flex items-center justify-center text-[11px] font-semibold"
                >
                  {isDone ? <CheckIcon size={12} /> : s.n}
                </motion.span>
                <span className={`text-[10px] tracking-[0.15em] uppercase font-semibold transition-colors ${isActive ? "text-[var(--text-primary)]" : isDone ? "text-[#d6a24b]" : "text-[var(--text-faint)]"}`}>
                  {s.label}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div className="flex-1 h-px bg-[var(--border-base)] relative overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isDone ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: ease.out }}
                    className="absolute inset-0 bg-[#d6a24b] origin-left"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  STEP 1 — LOCATION & PRICING (dedicated, unskippable)              */
/* ------------------------------------------------------------------ */
function StepLocationPricing({
  pricingOption,
  onPricingChange,
}: {
  pricingOption: ServicePricingOption | null;
  onPricingChange: (o: ServicePricingOption) => void;
}) {
  const optionIcons: Record<string, JSX.Element> = {
    lekki: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    island: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    mainland: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="1"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    "late-night": (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
      </svg>
    ),
  };

  return (
    <div className="space-y-6">
      {/* Payment Notice */}
      <div className="flex items-start gap-3 rounded-xl border border-[#d6a24b]/40 bg-[#d6a24b]/8 px-4 py-3">
        <svg className="shrink-0 mt-0.5 text-[#d6a24b]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
        </svg>
        <div>
          <p className="text-[#d6a24b] text-xs font-bold tracking-wide uppercase">
            100% Payment Is Required To Confirm All Bookings.
          </p>
          <p className="text-[var(--text-muted)] text-xs mt-0.5">
            Kindly book your appointment in advance for a seamless experience.
          </p>
        </div>
      </div>

      {/* Heading */}
      <div>
        <h4 className="font-display text-2xl sm:text-3xl text-[var(--text-primary)] mb-1">
          Where would you like your treatment?
        </h4>
        <p className="text-[var(--text-muted)] text-sm">
          Select one option — this determines the price surcharge on your booking.
        </p>
      </div>

      {/* 4 option cards — single column on mobile, 2-col on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {servicePricingOptions.map((opt) => {
          const sel = pricingOption?.id === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onPricingChange(opt)}
              className={[
                "w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200",
                sel
                  ? "border-[#d6a24b] bg-[#d6a24b]/10"
                  : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/8",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                {/* Radio circle */}
                <div className={[
                  "shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                  sel ? "border-[#d6a24b] bg-[#d6a24b]" : "border-white/30",
                ].join(" ")}>
                  {sel && <div className="w-2 h-2 rounded-full bg-black" />}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Icon + name + badge */}
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className={sel ? "text-[#d6a24b]" : "text-white/40"}>
                        {optionIcons[opt.id]}
                      </span>
                      <span className="text-[var(--text-primary)] font-semibold text-sm sm:text-base leading-tight">
                        {opt.label}
                      </span>
                    </div>
                    <span className={[
                      "shrink-0 text-[11px] font-bold px-2.5 py-0.5 rounded-full border",
                      sel
                        ? "text-[#d6a24b] border-[#d6a24b]/50 bg-[#d6a24b]/10"
                        : opt.surcharge === 0
                        ? "text-emerald-400 border-emerald-500/40 bg-emerald-500/10"
                        : "text-white/60 border-white/15 bg-white/5",
                    ].join(" ")}>
                      {opt.badge}
                    </span>
                  </div>
                  {/* Description */}
                  <p className="mt-2 text-xs text-white/50 leading-relaxed">{opt.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {!pricingOption && (
        <p className="text-white/40 text-xs text-center">↑ Select an option above to continue to the next step.</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  STEP 2 — SERVICE + ADD-ONS                                         */
/* ------------------------------------------------------------------ */
function StepService({
  selected,
  onSelect,
  addOnIds,
  onAddOnsChange,
}: {
  selected: BookingService | null;
  onSelect: (s: BookingService) => void;
  addOnIds: string[];
  onAddOnsChange: (ids: string[]) => void;
}) {
  const categories = Array.from(new Set(bookingServices.map((s) => s.category)));
  const [activeCat, setActiveCat] = useState(selected?.category ?? categories[0]);
  const filtered = bookingServices.filter((s) => s.category === activeCat);

  const toggleAddOn = (id: string) =>
    onAddOnsChange(addOnIds.includes(id) ? addOnIds.filter((x) => x !== id) : [...addOnIds, id]);

  return (
    <div className="space-y-8">
      {/* Service selection */}
      <div>
        <h4 className="font-display text-xl sm:text-2xl text-[var(--text-primary)] mb-1">Choose your service</h4>
        <p className="text-[var(--text-muted)] text-sm mb-5">Browse by category and pick a treatment.</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {categories.map((c) => (
            <motion.button
              key={c}
              onClick={() => setActiveCat(c)}
              whileTap={{ scale: 0.97 }}
              className={`text-[11px] tracking-wider uppercase font-semibold px-4 py-2 rounded-full border transition-colors ${
                activeCat === c
                  ? "border-[#d6a24b] text-[#d6a24b] bg-[#d6a24b]/10"
                  : "border-[var(--border-base)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
              }`}
            >
              {c}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => {
              const isSelected = selected?.id === s.id;
              return (
                <motion.button
                  key={s.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: ease.out, delay: i * 0.03 }}
                  onClick={() => onSelect(s)}
                  whileHover={{ y: -2 }}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all relative overflow-hidden ${
                    isSelected
                      ? "border-[#d6a24b] bg-[#d6a24b]/10"
                      : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/8"
                  }`}
                >
                  {s.popular && (
                    <span className="absolute top-3 right-3 text-[9px] tracking-wider uppercase bg-[#d6a24b] text-black px-2 py-0.5 rounded-full font-bold">
                      Popular
                    </span>
                  )}
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center ${isSelected ? "border-[#d6a24b] bg-[#d6a24b]" : "border-white/30"}`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-[var(--text-primary)] text-base leading-tight pr-14">{s.name}</div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] tracking-wider">
                        <span className="text-[#d6a24b] font-semibold">{s.duration} MIN</span>
                        <span className="text-white/30">·</span>
                        <span className="text-[var(--text-secondary)]">{formatPrice(s.price)}</span>
                      </div>
                      <p className="text-white/40 text-xs mt-1.5 leading-relaxed">{s.description}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Add-ons */}
      <div>
        <h4 className="font-display text-xl sm:text-2xl text-[var(--text-primary)] mb-1">Enhance your experience</h4>
        <p className="text-[var(--text-muted)] text-sm mb-4">Optional add-ons to elevate your visit.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {addOns.filter((a) => a.id !== "late-night").map((a) => {
            const checked = addOnIds.includes(a.id);
            return (
              <motion.button
                key={a.id}
                onClick={() => toggleAddOn(a.id)}
                whileTap={{ scale: 0.99 }}
                className={`text-left p-3 rounded-lg border-2 transition-all flex items-start gap-3 ${
                  checked ? "border-[#d6a24b] bg-[#d6a24b]/10" : "border-white/10 bg-white/5 hover:border-white/25"
                }`}
              >
                <div className={`w-5 h-5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center ${checked ? "border-[#d6a24b] bg-[#d6a24b]" : "border-white/30"}`}>
                  {checked && <CheckIcon size={11} className="text-black" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[var(--text-primary)] text-sm font-medium">{a.name}</span>
                    <span className="text-[#d6a24b] text-xs font-semibold shrink-0">+{formatPrice(a.price)}</span>
                  </div>
                  <p className="text-white/40 text-xs mt-0.5">{a.description}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  STEP 2 — DATE & TIME                                              */
/* ------------------------------------------------------------------ */
function StepDateTime({
  date,
  time,
  onDate,
  onTime,
}: {
  date: string;
  time: string;
  onDate: (d: string) => void;
  onTime: (t: string) => void;
}) {
  const days = useMemo(() => {
    const list: { iso: string; day: string; date: number; month: string }[] = [];
    const now = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const iso = d.toISOString().split("T")[0];
      list.push({
        iso,
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        date: d.getDate(),
        month: d.toLocaleDateString("en-US", { month: "short" }),
      });
    }
    return list;
  }, []);

  const busySlots = useMemo(() => {
    if (!date) return new Set<string>();
    const seed = date.split("-").join("");
    const rand = (n: number) => Math.floor((parseInt(seed.slice(-4)) * n) % timeSlots.length);
    return new Set([timeSlots[rand(3)], timeSlots[rand(7)], timeSlots[rand(11)]]);
  }, [date]);

  return (
    <div className="space-y-8">
      <div>
        <h4 className="font-display text-xl sm:text-2xl text-[var(--text-primary)] mb-1">Select a date</h4>
        <p className="text-[var(--text-muted)] text-sm mb-4">Choose from the next 14 days.</p>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 snap-x scroll-hide">
          {days.map((d, i) => {
            const isSelected = date === d.iso;
            const isToday = i === 0;
            return (
              <motion.button
                key={d.iso}
                onClick={() => onDate(d.iso)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.25, ease: ease.out }}
                className={`snap-start shrink-0 w-16 sm:w-[72px] py-3 rounded-xl border flex flex-col items-center justify-center transition-colors ${
                  isSelected
                    ? "border-[#d6a24b] bg-[#d6a24b]/10"
                    : "border-[var(--border-base)] hover:border-[var(--border-strong)] bg-[var(--bg-card)]"
                }`}
              >
                <span className={`text-[10px] tracking-wider uppercase ${isSelected ? "text-[#d6a24b]" : "text-[var(--text-muted)]"}`}>
                  {isToday ? "Today" : d.day}
                </span>
                <span className={`font-display text-2xl mt-1 ${isSelected ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
                  {d.date}
                </span>
                <span className={`text-[10px] uppercase ${isSelected ? "text-[#d6a24b]" : "text-[var(--text-faint)]"}`}>
                  {d.month}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="font-display text-xl sm:text-2xl text-[var(--text-primary)] mb-1">Select a time</h4>
        <p className="text-[var(--text-muted)] text-sm mb-4">
          {date ? "We're open 24/7 — choose what works for you." : "Pick a date first."}
        </p>

        {/* Day slots */}
        <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-faint)] mb-2">Morning · Afternoon · Evening</p>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-4">
          {timeSlots.filter((s) => !LATE_NIGHT_SLOTS.has(s) && s !== "06:00").map((slot, i) => {
            const isBusy = busySlots.has(slot);
            const isSelected = time === slot;
            return (
              <motion.button
                key={slot}
                onClick={() => !isBusy && date && onTime(slot)}
                disabled={isBusy || !date}
                whileHover={!isBusy && date ? { y: -2 } : {}}
                whileTap={!isBusy && date ? { scale: 0.96 } : {}}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: ease.out, delay: i * 0.02 }}
                className={`relative py-3 rounded-lg border text-sm font-medium transition-colors ${
                  isSelected
                    ? "border-[#d6a24b] bg-[#d6a24b] text-black"
                    : isBusy
                    ? "border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-faint)] cursor-not-allowed line-through"
                    : !date
                    ? "border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-faint)] cursor-not-allowed"
                    : "border-[var(--border-base)] hover:border-[#d6a24b] hover:text-[#d6a24b] text-[var(--text-secondary)] bg-[var(--bg-card)]"
                }`}
              >
                {slot}
                {isBusy && (
                  <span className="absolute -top-1 -right-1 text-[8px] bg-red-500/20 text-red-300 px-1 rounded">
                    full
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Late-night slots */}
        <div className="flex items-center gap-2 mb-2">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#d6a24b]/70">
            🌙 Late Night (10pm – 6am · +₦20,000)
          </p>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {["22:00", "23:00", "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00"].map((slot, i) => {
            const isBusy = busySlots.has(slot);
            const isSelected = time === slot;
            return (
              <motion.button
                key={slot}
                onClick={() => !isBusy && date && onTime(slot)}
                disabled={isBusy || !date}
                whileHover={!isBusy && date ? { y: -2 } : {}}
                whileTap={!isBusy && date ? { scale: 0.96 } : {}}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: ease.out, delay: i * 0.02 }}
                className={`relative py-3 rounded-lg border text-sm font-medium transition-colors ${
                  isSelected
                    ? "border-[#d6a24b] bg-[#d6a24b] text-black"
                    : isBusy
                    ? "border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-faint)] cursor-not-allowed line-through"
                    : !date
                    ? "border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-faint)] cursor-not-allowed"
                    : "border-[#d6a24b]/30 hover:border-[#d6a24b] hover:text-[#d6a24b] text-[var(--text-secondary)] bg-[#d6a24b]/5"
                }`}
              >
                {slot}
                {isBusy && (
                  <span className="absolute -top-1 -right-1 text-[8px] bg-red-500/20 text-red-300 px-1 rounded">
                    full
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
        {date && time && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: ease.out }}
            className="mt-4 inline-flex items-center gap-2 text-[#d6a24b] text-sm"
          >
            <ClockIcon size={16} />
            Your slot:&nbsp;
            <span className="text-[var(--text-primary)] font-semibold">
              {parseDateLocal(date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {time}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  STEP 3 — GUEST DETAILS                                            */
/* ------------------------------------------------------------------ */
function StepDetails({
  guest,
  onChange,
}: {
  guest: { name: string; email: string; phone: string; notes: string };
  onChange: (g: { name: string; email: string; phone: string; notes: string }) => void;
}) {
  const update = (k: keyof typeof guest, v: string) => onChange({ ...guest, [k]: v });
  return (
    <div>
      <h4 className="font-display text-xl sm:text-2xl text-[var(--text-primary)] mb-1">Your details</h4>
      <p className="text-[var(--text-muted)] text-sm mb-6">So we can confirm your reservation.</p>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        className="space-y-4 max-w-xl"
      >
        <FormField label="Full name *">
          <input type="text" required value={guest.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Amaka Okafor" className="input-base" />
        </FormField>
        <div className="grid sm:grid-cols-2 gap-3">
          <FormField label="Email *">
            <input type="email" required value={guest.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" className="input-base" />
          </FormField>
          <FormField label="Phone *">
            <input type="tel" required value={guest.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+234 812 302 0985" className="input-base" />
          </FormField>
        </div>
        <FormField label="Special requests (optional)">
          <textarea value={guest.notes} onChange={(e) => update("notes", e.target.value)} rows={3} placeholder="Allergies, preferences, occasion notes…" className="input-base resize-none" />
        </FormField>
        <p className="text-[var(--text-faint)] text-xs leading-relaxed">
          By continuing you agree to our cancellation policy. Free rescheduling up to 12 hours before your appointment.
        </p>
      </motion.div>

      <style>{`
        .input-base {
          width: 100%;
          background: var(--bg-card);
          border: 1px solid var(--border-base);
          border-radius: 10px;
          padding: 12px 16px;
          color: var(--text-primary);
          font-size: 14px;
          outline: none;
          transition: border-color 0.4s var(--ease-out-soft);
        }
        .input-base::placeholder { color: var(--text-faint); }
        .input-base:focus { border-color: #d6a24b; }
      `}</style>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: ease.out } } }}>
      <label className="block text-[var(--text-muted)] text-[11px] tracking-wider uppercase mb-1.5">{label}</label>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  STEP 4 — REVIEW                                                   */
/* ------------------------------------------------------------------ */
function StepReview({ service, pricingOption, addOnIds, date, time, guest, total }: {
  service: BookingService | null; pricingOption: ServicePricingOption | null; addOnIds: string[];
  date: string; time: string; guest: { name: string; email: string; phone: string; notes: string }; total: number;
}) {
  const chosenAddOns = addOns.filter((a) => addOnIds.includes(a.id));
  const formattedDate = date ? parseDateLocal(date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : "";

  return (
    <div>
      <h4 className="font-display text-xl sm:text-2xl text-[var(--text-primary)] mb-1">Review your reservation</h4>
      <p className="text-[var(--text-muted)] text-sm mb-6">Please confirm the details below.</p>

      {/* Payment notice in review step too */}
      <div className="rounded-lg bg-[#d6a24b]/10 border border-[#d6a24b]/30 px-4 py-3 mb-5 flex items-center gap-2">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d6a24b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
        </svg>
        <p className="text-[#d6a24b] text-[11px] font-semibold tracking-wide uppercase">100% Payment Is Required To Confirm All Bookings.</p>
      </div>

      <div className="grid sm:grid-cols-[1.2fr_1fr] gap-4">
        <div className="space-y-3">
          <ReviewRow label="Service" value={service?.name} sub={service ? `${service.duration} MIN` : undefined} />
          <ReviewRow
            label="Location & Pricing"
            value={pricingOption?.label ?? "—"}
            sub={pricingOption ? `${pricingOption.badge} · ${pricingOption.description}` : undefined}
          />
          <ReviewRow label="Date & Time" value={formattedDate} sub={time} />
          <ReviewRow label="Guest" value={guest.name} sub={`${guest.email} · ${guest.phone}`} />
          {guest.notes && <ReviewRow label="Notes" value={guest.notes} />}
        </div>

        <div className="bg-gradient-to-br from-[#1a140a] to-[#0f0d09] border border-[#d6a24b]/20 rounded-xl p-5 self-start">
          <div className="text-[10px] tracking-[0.2em] uppercase text-[#d6a24b] font-semibold mb-3">Price Summary</div>
          <div className="space-y-2.5 text-sm">
            <PriceRow label={service?.name ?? "—"} value={formatPrice(service?.price ?? 0)} />
            {chosenAddOns.map((a) => <PriceRow key={a.id} label={a.name} value={`+${formatPrice(a.price)}`} small />)}
            {pricingOption && pricingOption.surcharge > 0 && (
              <PriceRow label={pricingOption.label} value={`+${formatPrice(pricingOption.surcharge)}`} small />
            )}
            <div className="border-t border-white/10 my-3" />
            <div className="flex justify-between items-baseline">
              <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase">Total</span>
              <span className="font-display text-2xl text-[#d6a24b]">{formatPrice(total)}</span>
            </div>
            <p className="text-white/40 text-[11px] mt-2 leading-relaxed">
              100% payment required to confirm. We'll reach out to you shortly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewRow({ label, value, sub }: { label: string; value?: string; sub?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-[var(--border-subtle)]">
      <span className="text-[var(--text-faint)] text-[11px] tracking-wider uppercase">{label}</span>
      <div className="text-right">
        <div className="text-[var(--text-primary)] text-sm">{value || "—"}</div>
        {sub && <div className="text-[var(--text-muted)] text-xs mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

function PriceRow({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="flex justify-between gap-2">
      <span className={small ? "text-white/50 text-xs" : "text-white/80"}>{label}</span>
      <span className={small ? "text-white/70 text-xs" : "text-white"}>{value}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CONFIRMATION VIEW                                                 */
/* ------------------------------------------------------------------ */
function ConfirmationView({ code, guest, service, date, time, pricingOption, total, onClose }: {
  code: string; guest: { name: string; email: string }; service: BookingService | null;
  date: string; time: string; pricingOption: ServicePricingOption | null; total: number; onClose: () => void;
}) {
  const formattedDate = date ? parseDateLocal(date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : "";

  const emailUrl = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(`Booking ${code} — ${service?.name ?? "Spa"} — ${guest.name}`)}`;
  const waUrl = `https://wa.me/${BOOKING_WHATSAPP}?text=${encodeURIComponent(`Hello, I just submitted booking ${code}. Please confirm. Thank you!`)}`;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="p-8 sm:p-12 text-center max-h-screen overflow-y-auto">
      <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full hover:bg-[var(--bg-card)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition" aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 6 L18 18 M18 6 L6 18" />
        </svg>
      </button>

      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: ease.out, delay: 0.1 }}
        className="w-20 h-20 mx-auto rounded-full bg-[#d6a24b]/15 border border-[#d6a24b] flex items-center justify-center text-[#d6a24b] mb-6 relative"
      >
        <CheckIcon size={36} />
        <motion.span
          className="absolute inset-0 rounded-full border border-[#d6a24b]"
          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
          transition={{ duration: 2, ease: ease.out, repeat: Infinity }}
        />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
        <div className="text-[#d6a24b] text-[10px] tracking-[0.25em] uppercase font-semibold mb-2">Confirmation #{code}</div>
        <h3 className="font-display text-3xl sm:text-4xl text-[var(--text-primary)]">
          Booking <span className="italic text-[#d6a24b]">submitted</span>
        </h3>
        <p className="mt-3 text-[var(--text-secondary)] text-sm max-w-md mx-auto">
          Thank you, <span className="text-[var(--text-primary)]">{guest.name || "guest"}</span>. Your booking details have been sent directly to our team on WhatsApp. We'll confirm your reservation shortly.
        </p>
      </motion.div>

      {/* WhatsApp delivery status */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="mt-6 max-w-sm mx-auto"
      >
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 rounded-xl border border-[#25D366]/40 hover:border-[#25D366] bg-[#25D366]/5 hover:bg-[#25D366]/10 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 32 32" fill="#25D366">
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.115.553 4.103 1.522 5.83L4 28l7.348-1.49A11.94 11.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 21.6c-1.65 0-3.243-.41-4.652-1.187l-.333-.184-4.357.884.91-4.226-.218-.347A9.55 9.55 0 0 1 5.6 15c0-5.736 4.667-10.4 10.4-10.4S26.4 9.264 26.4 15c0 5.736-4.661 10.4-10.4 10.4z" />
          </svg>
          <div className="text-left">
            <div className="text-[var(--text-primary)] text-sm font-semibold">Sent to WhatsApp</div>
            <div className="text-[var(--text-muted)] text-xs mt-0.5">Tap to re-open or follow up on {BOOKING_WHATSAPP_DISPLAY}</div>
          </div>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-8 max-w-md mx-auto bg-[var(--bg-card)] border border-[var(--border-base)] rounded-xl p-5 text-left"
      >
        <div className="flex items-start gap-3 mb-3">
          <ClockIcon size={18} className="text-[#d6a24b] shrink-0 mt-0.5" />
          <div>
            <div className="text-[var(--text-primary)] text-sm font-semibold">{service?.name ?? "—"}</div>
            <div className="text-[var(--text-muted)] text-xs mt-0.5">{formattedDate} · {time}</div>
          </div>
        </div>
        <div className="flex items-start gap-3 mb-3">
          <LocationIcon size={18} className="text-[#d6a24b] shrink-0 mt-0.5" />
          <div>
            <div className="text-[var(--text-primary)] text-sm">{pricingOption?.label ?? "—"}</div>
            <div className="text-[var(--text-muted)] text-xs mt-0.5">{pricingOption?.description ?? "—"}</div>
          </div>
        </div>
        <div className="border-t border-[var(--border-subtle)] mt-3 pt-3 flex items-center justify-between">
          <span className="text-[var(--text-muted)] text-[11px] tracking-wider uppercase">Total</span>
          <span className="font-display text-xl text-[#d6a24b]">{formatPrice(total)}</span>
        </div>
      </motion.div>

      <motion.button
        onClick={onClose}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.5 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="btn-gold mt-8 inline-flex items-center gap-2 bg-[#c88e2e] hover:bg-[#d6a24b] text-black text-xs font-semibold tracking-wider uppercase px-7 py-3 rounded-full transition-colors"
      >
        Done
        <CheckIcon size={13} />
      </motion.button>
    </motion.div>
  );
}
