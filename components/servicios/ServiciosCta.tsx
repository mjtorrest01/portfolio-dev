"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, DribbbleLogo, FacebookLogo, GithubLogo, InstagramLogo, WhatsappLogo, XLogo } from "@phosphor-icons/react";
import { profile } from "@/lib/data";
import { waLink } from "@/lib/data-servicios";
import { Magnetic } from "@/components/ui/Magnetic";
import { EASE_OUT_EXPO } from "@/lib/animations";

const SOCIAL_ICONS: Record<string, typeof GithubLogo> = {
  instagram: InstagramLogo,
  facebook: FacebookLogo,
  x: XLogo,
  github: GithubLogo,
  dribbble: DribbbleLogo,
};

export function ServiciosCta() {
  const t = useTranslations("cta");

  return (
    <section id="contacto" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-aurora absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 blur-[130px]" />
        <div className="bg-grid bg-grid-fade absolute inset-0" />
      </div>

      <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
          className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
        >
          {t("titleA")} <span className="glow-text text-accent">{t("titleB")}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl text-lg text-muted"
        >
          {t("sub")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.3 }}
          className="mt-11 flex flex-col items-center justify-center gap-5 sm:flex-row"
        >
          <Magnetic strength={0.3}>
            <a
              href={waLink(t("whatsappMsg"))}
              target="_blank"
              rel="noreferrer"
              className="glow-box group flex items-center gap-3 rounded-2xl border-2 border-accent bg-accent px-10 py-5 font-mono text-base font-bold uppercase tracking-wider text-void transition-shadow duration-300 hover:shadow-[0_0_45px_rgba(34,197,94,0.55)] md:text-lg"
            >
              <WhatsappLogo size={24} weight="fill" />
              {t("whatsapp")}
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-3 rounded-2xl border-2 border-line bg-surface/40 px-10 py-5 font-mono text-base uppercase tracking-wider text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              {t("mail")}
              <ArrowUpRight size={20} weight="bold" className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="mt-10 flex flex-col items-center gap-5"
        >
          <div className="flex gap-3">
            {profile.socials.map((s, i) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.5, ease: EASE_OUT_EXPO }}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition-all duration-300 hover:border-accent hover:bg-accent hover:text-void hover:shadow-hard-accent"
                  data-cursor="hover"
                >
                  {Icon && <Icon size={18} weight="fill" />}
                </motion.a>
              );
            })}
          </div>
          <p className="font-mono text-xs text-faint">
            {profile.name} · {t("note")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}