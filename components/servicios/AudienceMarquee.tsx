"use client";

import { useTranslations } from "next-intl";

export function AudienceMarquee() {
  const t = useTranslations("marquee");
  const rowA = t.raw("a") as unknown as string[];
  const rowB = t.raw("b") as unknown as string[];

  return (
    <section className="marquee-hover overflow-hidden border-y-2 border-line bg-void/60 py-4" aria-hidden>
      <div className="animate-marquee flex w-max gap-8 [--marquee-duration:30s]">
        {[...rowA, ...rowA].map((item, i) => (
          <span key={`a-${i}`} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-display text-2xl font-bold uppercase tracking-tight text-fg/90 md:text-3xl">
              {item}
            </span>
            <span className="h-2.5 w-2.5 rotate-45 bg-accent" />
          </span>
        ))}
      </div>
      <div className="animate-marquee-reverse mt-3 flex w-max gap-8 text-outline [--marquee-duration:38s]">
        {[...rowB, ...rowB].map((item, i) => (
          <span key={`b-${i}`} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">{item}</span>
            <span className="h-2.5 w-2.5 rotate-45 border border-accent" />
          </span>
        ))}
      </div>
    </section>
  );
}