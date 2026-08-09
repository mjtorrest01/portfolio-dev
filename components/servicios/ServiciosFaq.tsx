"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "@phosphor-icons/react";
import { SectionTitle } from "@/components/SectionTitle";
import { EASE_OUT_EXPO } from "@/lib/animations";

type FaqItem = { q: string; a: string };

export function ServiciosFaq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as unknown as FaqItem[];
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionTitle
          index={t("index")}
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="divide-y divide-line/60 border-y border-line">
          {items.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.q}>
                <button
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  data-cursor="hover"
                >
                  <span
                    className={`font-display text-lg font-bold transition-colors duration-300 md:text-xl ${
                      open ? "glow-text text-accent" : "text-fg"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border-2 transition-colors duration-300 ${
                      open ? "border-accent bg-accent text-void" : "border-line text-muted"
                    }`}
                  >
                    <Plus size={16} weight="bold" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden"
                    >
                      <p
                        id={`faq-panel-${i}`}
                        role="region"
                        className="pb-6 text-sm leading-relaxed text-muted md:text-base"
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}