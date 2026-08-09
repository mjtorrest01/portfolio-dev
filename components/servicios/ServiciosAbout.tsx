"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Crosshair, RocketLaunch } from "@phosphor-icons/react";
import { SectionTitle } from "@/components/SectionTitle";
import { EASE_OUT_EXPO } from "@/lib/animations";

export function ServiciosAbout() {
  const t = useTranslations("about");

  return (
    <section id="sobre" className="relative overflow-hidden bg-void/50 py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-aurora-slow absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-accent/10 blur-[130px]" />
        <div className="bg-grid bg-grid-fade absolute inset-0" />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTitle
          index={t("index")}
          label={t("label")}
          title={t("title")}
        />

        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            className="font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl"
          >
            {t("textA")}{" "}
            <span className="glow-text text-accent">{t("highlight")}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.15 }}
            className="relative rounded-2xl border-2 border-line bg-surface/40 p-8"
          >
            <div className="absolute -top-5 left-8 grid h-11 w-11 place-items-center rounded-xl border-2 border-accent bg-void text-accent shadow-hard-accent">
              <RocketLaunch size={22} weight="duotone" />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
              &lt; {t("missionLabel")} /&gt;
            </p>
            <p className="mt-4 leading-relaxed text-muted">{t("textB")}</p>
            <div className="mt-6 flex items-center gap-3 border-t border-line/60 pt-5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent font-mono text-sm font-bold text-void">
                {"</>"}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-fg">
                MJ Torres
              </span>
              <span className="text-accent" aria-hidden>
                <Crosshair size={16} weight="duotone" />
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}