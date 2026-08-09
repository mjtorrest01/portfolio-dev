"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle, WhatsappLogo } from "@phosphor-icons/react";
import { waLink } from "@/lib/data-servicios";
import { SectionTitle } from "@/components/SectionTitle";
import { EASE_OUT_EXPO } from "@/lib/animations";

type Plan = {
  name: string;
  price: number;
  tagline: string;
  features: string[];
  featured: boolean;
};

function PlanCard({ plan }: { plan: Plan }) {
  const t = useTranslations("plans");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      className={`relative flex h-full flex-col rounded-2xl border-2 p-8 ${
        plan.featured
          ? "glow-box border-accent bg-accent/10 shadow-hard-accent lg:-translate-y-4"
          : "border-line bg-surface/40 transition-transform duration-300 hover:-translate-y-2 hover:border-accent"
      }`}
    >
      {plan.featured && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-2 rounded-lg border-2 border-line bg-warn px-4 py-1.5 font-display text-sm font-bold uppercase tracking-wide text-void shadow-hard">
          {t("featured")}
        </span>
      )}

      <p className={`font-mono text-sm uppercase tracking-wider ${plan.featured ? "text-accent" : "text-muted"}`}>
        {plan.name}
      </p>
      <p className="mt-1 text-sm text-fg-dim">{plan.tagline}</p>

      <p className="mt-6 flex items-end gap-2">
        <span className={`font-display text-6xl font-bold ${plan.featured ? "glow-text text-accent" : "text-fg"}`}>
          ${plan.price}
        </span>
        <span className="pb-2 font-mono text-sm text-faint">{t("per")}</span>
      </p>

      <ul className="mt-8 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed text-fg-dim">
            <CheckCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-accent" />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={waLink(t("ctaMsg", { plan: plan.name, price: plan.price }))}
        target="_blank"
        rel="noreferrer"
        className={`mt-9 flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
          plan.featured
            ? "glow-box bg-accent text-void hover:bg-accent-soft"
            : "border-2 border-accent text-accent hover:bg-accent hover:text-void"
        }`}
      >
        <WhatsappLogo size={16} weight="fill" />
        {t("cta")} {plan.name}
      </a>
    </motion.div>
  );
}

export function ServiciosPlans() {
  const t = useTranslations("plans");
  const items = t.raw("items") as unknown as Plan[];

  return (
    <section id="planes" className="relative bg-void/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTitle
          index={t("index")}
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid gap-8 pt-6 md:grid-cols-3">
          {items.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-10 max-w-2xl text-center font-mono text-xs leading-relaxed text-faint"
        >
          {t("note")}
        </motion.p>
      </div>
    </section>
  );
}