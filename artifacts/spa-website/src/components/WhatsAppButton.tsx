import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T, ease } from "./Motion";

// Business WhatsApp number — Nigerian format: +234 812 302 0985
// International format (E.164 without +): 2348123020985
const WHATSAPP_NUMBER = "2348123020985";
const WHATSAPP_DISPLAY = "+234 812 302 0985";

const PREFILLED_MESSAGE =
  "Welcome to Harmony Palms. 🌿 A cozy, private space curated just for you, appointments only, and spaces are limited this week.\n\nPrefer to stay in? We also offer home services.\n\nWhat are you looking to experience today?\n\nBook a Session?";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay mount so the button appears after the hero
    const t1 = setTimeout(() => setMounted(true), 1500);
    // Show tooltip once after 4 seconds
    const t2 = setTimeout(() => setShowTooltip(true), 4000);
    // Auto-hide tooltip after 8 seconds
    const t3 = setTimeout(() => setShowTooltip(false), 9000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`;

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          key="wa"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.5, ease: ease.out }}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] flex items-center gap-3"
        >
          {/* Tooltip / Quick message */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                key="tip"
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                transition={T.base}
                className="hidden sm:flex items-center bg-white text-[#0a0908] text-sm pl-4 pr-2 py-2 rounded-full shadow-2xl shadow-black/30 relative max-w-[260px]"
              >
                <span className="font-medium">Chat on WhatsApp: {WHATSAPP_DISPLAY}</span>
                <button
                  onClick={() => setShowTooltip(false)}
                  aria-label="Dismiss"
                  className="ml-2 w-6 h-6 rounded-full hover:bg-black/5 flex items-center justify-center text-black/50"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 6 L18 18 M18 6 L6 18" />
                  </svg>
                </button>
                {/* Pointer arrow */}
                <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp Button */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setShowTooltip(false)}
            onMouseEnter={() => setShowTooltip(true)}
            aria-label={`Chat on WhatsApp at ${WHATSAPP_DISPLAY}`}
            className="relative group"
          >
            <motion.span
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={T.fast}
              className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-xl shadow-black/30 animate-whatsapp-pulse"
            >
              {/* WhatsApp glyph */}
              <svg width="23" height="23" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
                <path d="M16.003 3C9.373 3 4 8.373 4 15c0 2.115.553 4.103 1.522 5.83L4 28l7.348-1.49A11.94 11.94 0 0 0 16.003 27C22.633 27 28 21.627 28 15S22.633 3 16.003 3zm0 21.6c-1.65 0-3.243-.41-4.652-1.187l-.333-.184-4.357.884.91-4.226-.218-.347A9.55 9.55 0 0 1 5.6 15c0-5.736 4.667-10.4 10.403-10.4S26.4 9.264 26.4 15c0 5.736-4.661 10.4-10.397 10.4zm5.69-7.797c-.312-.156-1.84-.91-2.126-1.014-.285-.104-.49-.156-.696.156-.207.312-.798 1.014-.978 1.221-.18.208-.36.234-.673.078-.312-.156-1.314-.484-2.502-1.546-.924-.825-1.548-1.844-1.73-2.156-.18-.312-.019-.48.137-.636.14-.14.312-.36.467-.54.156-.18.207-.312.312-.52.104-.208.052-.39-.026-.546-.078-.156-.696-1.68-.954-2.3-.252-.605-.508-.523-.696-.532l-.594-.011a1.14 1.14 0 0 0-.825.39c-.286.312-1.09 1.066-1.09 2.6 0 1.534 1.116 3.017 1.27 3.226.156.208 2.196 3.353 5.32 4.704.743.32 1.323.512 1.775.655.745.237 1.424.204 1.96.124.598-.089 1.84-.752 2.1-1.479.26-.728.26-1.351.182-1.479-.078-.13-.286-.208-.598-.364z" />
              </svg>
            </motion.span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
