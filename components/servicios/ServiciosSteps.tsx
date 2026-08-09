"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ChatTeardropDots, Palette, RocketLaunch, Wrench } from "@phosphor-icons/react";
import { SectionTitle } from "@/components/SectionTitle";
import { EASE_OUT_EXPO } from "@/lib/animations";

const ICONS = {
  chat: ChatTeardropDots,
  palette: Palette,
  rocket: RocketLaunch,
  wrench: Wrench,
} as const;

type Step = { number: string; title: string; text: string; icon: keyof typeof ICONS };

export function ServiciosSteps() {
  const t = useTranslations("steps");
  const items = t.raw("items") as unknown as Step[];

  return (
    <section id="como" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTitle
          index={t("index")}
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {items.map((step, i) => {
            const Icon = ICONS[step.icon] ?? ChatTeardropDots;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: i * 0.12 }}
                className="group relative"
              >
                <span className="text-outline font-display text-8xl font-bold leading-none" aria-hidden>
                  {step.number}
                </span>
                <div className="mt-4 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg border-2 border-line bg-void text-accent transition-all duration-300 group-hover:-rotate-6 group-hover:border-accent">
                    <Icon size={20} weight="duotone" />
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-xs leading-relaxed text-muted">{step.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}