"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitch() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next: "es" | "en") => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  return (
    <div
      className="flex items-center overflow-hidden rounded-lg border-2 border-line font-mono text-xs font-bold uppercase tracking-wider"
      role="group"
      aria-label={t("localeLabel")}
      data-cursor="hover"
    >
      {(["es", "en"] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => switchTo(lang)}
          aria-pressed={locale === lang}
          className={`px-3 py-2 transition-colors duration-200 ${
            locale === lang
              ? "bg-accent text-void"
              : "text-muted hover:text-fg"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}