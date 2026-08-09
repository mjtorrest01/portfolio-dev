"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { List, WhatsappLogo, X } from "@phosphor-icons/react";
import { profile } from "@/lib/data";
import { waLink } from "@/lib/data-servicios";
import { Magnetic } from "@/components/ui/Magnetic";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LocaleSwitch } from "@/components/ui/LocaleSwitch";
import { EASE_IN_OUT_EXPO } from "@/lib/animations";

type NavLink = { label: string; href: string };

const NAVLinkProps =
  "relative py-1 font-mono text-sm uppercase tracking-wider text-muted transition-colors hover:text-fg";

export function Navbar({ show }: { show: boolean }) {
  const t = useTranslations("nav");
  const links = t.raw("links") as unknown as NavLink[];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: show ? 0 : -90, opacity: show ? 1 : 0 }}
        transition={{ duration: 0.7, ease: EASE_IN_OUT_EXPO, delay: 0.15 }}
        className={`fixed inset-x-0 top-0 z-[70] transition-colors duration-300 ${
          scrolled ? "border-b border-line/60 bg-void/70 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <nav aria-label={t("aria")} className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link href="#inicio" className="group flex items-center gap-2" data-cursor="hover">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-accent font-mono text-sm font-bold text-void transition-transform duration-300 group-hover:rotate-[360deg]">
              {"</>"}
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm font-bold leading-tight">{profile.firstName}</span>
              <span className="block font-mono text-[11px] uppercase text-faint">{profile.handle}</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="group relative">
                  <span className={`${NAVLinkProps} group-hover:text-fg`}>{link.label}</span>
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-right scale-x-0 bg-accent transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <LocaleSwitch />
            <ThemeToggle />
            <Magnetic strength={0.4} className="hidden md:block">
              <a
                href={waLink(t("whatsappMsg"))}
                target="_blank"
                rel="noreferrer"
                className="glow-box flex items-center gap-2 rounded-lg border-2 border-accent bg-accent px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-void transition-colors duration-200 hover:bg-accent-soft"
              >
                <WhatsappLogo size={15} weight="fill" /> {t("ctaWhatsapp")}
              </a>
            </Magnetic>

            <button
              onClick={() => setOpen(!open)}
              className="grid h-10 w-10 place-items-center rounded-lg border-2 border-line text-fg lg:hidden"
              aria-label={open ? t("menuClose") : t("menuOpen")}
              aria-expanded={open}
              aria-controls="menu-movil"
              data-cursor="hover"
            >
              {open ? <X size={18} weight="bold" aria-hidden /> : <List size={18} weight="bold" aria-hidden />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.55, ease: EASE_IN_OUT_EXPO }}
            className="fixed inset-0 z-[65] flex flex-col justify-center bg-void/95 backdrop-blur-xl lg:hidden"
            id="menu-movil"
          >
            <ul className="space-y-1 px-8">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: EASE_IN_OUT_EXPO }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-line/50 py-4 font-display text-4xl font-bold text-fg"
                  >
                    <span className="font-mono text-sm text-accent">0{i + 1}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      {link.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 px-8 font-mono text-sm text-muted"
            >
              <span className="text-accent">$</span> {profile.email}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}