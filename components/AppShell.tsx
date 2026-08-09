"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = loaded ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  useLayoutEffect(() => {
    if (!loaded) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
  }, [locale, pathname, loaded]);

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <CustomCursor />
      <AnimatePresence mode="wait">
        {!loaded && <Preloader key="preloader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>
      <Navbar show={loaded} />
      <main id="contenido" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay opacity-[0.03]">
        <div className="h-full w-full bg-gradient-to-br from-accent via-transparent to-cyan" />
      </div>
    </MotionConfig>
  );
}