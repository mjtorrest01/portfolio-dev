"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { EASE_IN_OUT_EXPO } from "@/lib/animations";

export function Preloader({ onDone }: { onDone: () => void }) {
  const t = useTranslations("preloader");
  const boot = t.raw("boot") as unknown as string[];
  const [progress, setProgress] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const calledOnDone = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + Math.random() * 13 + 4);
        if (next >= 100 && !calledOnDone.current) {
          calledOnDone.current = true;
          clearInterval(timer);
          setTimeout(onDone, 350);
        }
        return next;
      });
    }, 85);
    return () => clearInterval(timer);
  }, [onDone]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLineCount((c) => {
        if (c >= boot.length) {
          clearInterval(timer);
          return c;
        }
        return c + 1;
      });
    }, 300);
    return () => clearInterval(timer);
  }, [boot]);

  return (
    <motion.div
      exit={{ y: "-102%" }}
      transition={{ duration: 0.8, ease: EASE_IN_OUT_EXPO }}
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-void p-6 md:p-10"
      aria-label="Cargando"
    >
      <div className="flex items-center justify-between font-mono text-xs text-muted">
        <span className="text-accent">~/portfolio</span>
        <span>PORTFOLIO.BOOT v3.2.5</span>
      </div>

      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6 rounded-xl border-2 border-line bg-surface/40 p-5 font-mono text-xs md:text-sm">
          {boot.slice(0, lineCount).map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={i === lineCount - 1 && lineCount <= boot.length ? "text-fg-dim" : "text-muted"}
            >
              <span className="mr-2 text-accent">$</span>
              {line}
              {lineCount <= boot.length && i === lineCount - 1 && (
                <span className="animate-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-accent" />
              )}
            </motion.p>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-end justify-between font-mono text-sm">
          <span className="text-muted">{t("progress")}</span>
          <span className="glow-text font-bold text-accent">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full border border-line bg-surface">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-deep via-accent to-mint"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}