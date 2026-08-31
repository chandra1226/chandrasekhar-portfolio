"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useMotionSafe, useScrolledPast } from "@/lib/hooks";

/** Floating "back to top" control, revealed after the first viewport. */
export function BackToTop() {
  const visible = useScrolledPast(700);
  const motionSafe = useMotionSafe();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: motionSafe ? "smooth" : "auto",
    });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          key="back-to-top"
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={motionSafe ? { opacity: 0, y: 12, scale: 0.9 } : false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={motionSafe ? { opacity: 0, y: 12, scale: 0.9 } : { opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-5 bottom-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-line bg-panel/90 text-fg-muted shadow-lift backdrop-blur transition-colors duration-200 hover:border-accent/40 hover:text-fg sm:right-8 sm:bottom-8"
        >
          <ArrowUp size={17} strokeWidth={1.8} aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
