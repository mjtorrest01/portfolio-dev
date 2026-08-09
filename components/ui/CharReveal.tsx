"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations";

type CharRevealProps = {
  text: string;
  baseDelay?: number;
  stagger?: number;
  className?: string;
};

export function CharReveal({ text, baseDelay = 0.8, stagger = 0.05, className }: CharRevealProps) {
  return (
    <span aria-label={text} className={className}>
      <span aria-hidden>
        {text.split("").map((ch, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "115%", rotate: 6 }}
              animate={{ y: "0%", rotate: 0 }}
              transition={{
                duration: 0.9,
                ease: EASE_OUT_EXPO,
                delay: baseDelay + i * (stagger ?? 0.05),
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}