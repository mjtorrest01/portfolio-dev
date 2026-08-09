"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Handshake, Lightbulb, ShieldCheck } from "@phosphor-icons/react";
import { SectionTitle } from "@/components/SectionTitle";
import { EASE_OUT_EXPO } from "@/lib/animations";

const ICONS = {
  lightbulb: Lightbulb,
  handshake: Handshake,
  shield: ShieldCheck,
} as const;

type WhyItem = { title: string; text: string; icon: keyof typeof ICONS };

export function ServiciosWhy() {
  const t = useTranslations("why");
  const items = t.raw("items") as unknown as WhyItem[];

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTitle
          index={t("index")}
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Lightbulb;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: i * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl border-2 border-line bg-surface/40 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-accent ${
                  i === 1 ? "shadow-hard-accent" : ""
                }`}
              >
                <div
                  aria-hidden
                  className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/10 blur-2xl transition-opacity duration-500 group-hover:bg-accent/25"
                />
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-xl border-2 border-line bg-void text-accent transition-transform duration-300 group-hover:-rotate-6 group-hover:border-accent">
                  <Icon size={28} weight="duotone" />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}