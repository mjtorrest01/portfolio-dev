"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowDown, DribbbleLogo, FacebookLogo, GithubLogo, InstagramLogo, XLogo } from "@phosphor-icons/react";
import { profile } from "@/lib/data";
import { Magnetic } from "@/components/ui/Magnetic";
import { CharReveal } from "@/components/ui/CharReveal";
import { EASE_OUT_EXPO } from "@/lib/animations";

const SOCIAL_ICONS: Record<string, typeof GithubLogo> = {
  instagram: InstagramLogo,
  facebook: FacebookLogo,
  x: XLogo,
  github: GithubLogo,
  dribbble: DribbbleLogo,
};

function StatCounter({
  value,
  prefix,
  suffix,
}: {
  value: number;
  prefix: string;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: EASE_OUT_EXPO,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

type Stat = { label: string; value: number; prefix: string; suffix: string };

export function ServiciosHero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yAurora = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const stats = t.raw("stats") as unknown as Stat[];

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24"
    >
      <motion.div style={{ y: yAurora }} className="absolute inset-0 -z-10" aria-hidden>
        <div className="animate-aurora absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-accent/15 blur-[120px]" />
        <div className="animate-aurora-slow absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-cyan/12 blur-[120px]" />
        <div className="bg-grid bg-grid-fade absolute inset-0" />
      </motion.div>

      <motion.div style={{ y: yContent, opacity }} className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mb-6 flex items-center gap-3 font-mono text-sm text-accent"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          <span>{t("location")}</span>
          <span className="hidden text-faint sm:inline">·</span>
          <span className="hidden sm:inline">{t("badge")}</span>
        </motion.p>

        <h1 className="font-display text-[13.5vw] font-bold leading-[0.9] tracking-tight sm:text-[5.5rem] lg:text-[7rem]">
          <span className="block">
            <CharReveal text={t("line1")} baseDelay={0.75} stagger={0.03} />
          </span>
          <span className="block text-outline-green">
            <CharReveal text={t("line2a")} baseDelay={1.05} stagger={0.03} />{" "}
            <span className="glow-text text-accent">
              <CharReveal text={t("line2b")} baseDelay={1.3} stagger={0.04} />
            </span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7, ease: EASE_OUT_EXPO }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
        >
          {t("sub")} <span className="glow-text font-bold text-accent">{t("subPrice")}</span>{" "}
          {t("subIn")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.85, duration: 0.7, ease: EASE_OUT_EXPO }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Magnetic strength={0.35}>
            <a
              href="#planes"
              className="group flex items-center gap-3 rounded-lg border-2 border-accent bg-accent px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-void transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.45)]"
            >
              {t("cta1")}
              <ArrowDown size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </Magnetic>
          <Magnetic strength={0.35}>
            <a
              href="#trabajos"
              className="rounded-lg border-2 border-line bg-surface/40 px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              {t("cta2")}
            </a>
          </Magnetic>
          <div className="flex items-center gap-2 border-l-2 border-line pl-4">
            {profile.socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition-all duration-300 hover:border-accent hover:bg-accent hover:text-void hover:shadow-hard-accent"
                  data-cursor="hover"
                >
                  {Icon && <Icon size={17} weight="fill" />}
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.7, ease: EASE_OUT_EXPO }}
          className="mt-14 grid max-w-2xl gap-6 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border-2 border-line bg-surface/40 px-6 py-5 transition-colors duration-300 hover:border-accent"
            >
              <p className="glow-text font-display text-4xl font-bold text-accent md:text-5xl">
                <StatCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute inset-x-0 bottom-6 mx-auto flex max-w-7xl justify-center px-5 md:px-8"
      >
        <a
          href="#como"
          className="flex flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-faint"
          data-cursor="hover"
        >
          {t("scroll")}
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown size={18} className="text-accent" />
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}