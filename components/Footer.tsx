"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowUp, Heart } from "@phosphor-icons/react";
import { profile } from "@/lib/data";

export function Footer() {
  const t = useTranslations("footer");
  const heroT = useTranslations("hero");

  return (
    <footer className="relative overflow-hidden border-t-2 border-line bg-void/70 pt-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 pb-10 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <Link href="#inicio" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-accent font-mono text-sm font-bold text-void">
              {"</>"}
            </span>
            <span className="font-display text-lg font-bold">{profile.name}</span>
          </Link>
          <p className="mt-3 font-mono text-xs text-faint">
            {t("credit")} · {heroT("location")}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
            data-cursor="hover"
          >
            {t("backTop")}
            <span className="grid h-9 w-9 place-items-center rounded-lg border-2 border-line transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-void">
              <ArrowUp size={15} weight="bold" />
            </span>
          </button>
        </div>
      </div>

      <div className="border-t border-line/40">
        <p className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-5 py-5 text-center font-mono text-xs text-faint md:justify-start md:px-8">
          <Heart size={13} weight="fill" className="text-accent" /> {t("made")}
        </p>
      </div>

      <div className="flex w-max animate-marquee gap-10 py-4 [--marquee-duration:40s]" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="flex items-center gap-10 whitespace-nowrap font-display text-2xl font-bold uppercase tracking-tight text-outline"
          >
            <span>{profile.firstName}</span>
            <span className="h-2 w-2 rotate-45 bg-accent" />
            <span>build · ship · repeat</span>
            <span className="h-2 w-2 rotate-45 border border-accent" />
          </span>
        ))}
      </div>
    </footer>
  );
}