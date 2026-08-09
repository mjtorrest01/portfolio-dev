"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "@phosphor-icons/react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    const doc = document;
    const canAnimate =
      typeof doc.startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (canAnimate) {
      doc.startViewTransition(() => {
        doc.documentElement.setAttribute("data-theme", next);
        setTheme(next);
      });
    } else {
      setTheme(next);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="grid h-10 w-10 place-items-center overflow-hidden rounded-lg border-2 border-line text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
      aria-label={mounted ? (isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro") : "Cambiar tema"}
      title={mounted ? (isDark ? "Modo claro" : "Modo oscuro") : "Tema"}
      data-cursor="hover"
    >
      {mounted && (
        <span
          key={isDark ? "sun" : "moon"}
          aria-hidden
          className="animate-icon-pop"
        >
          {isDark ? <Sun size={17} weight="bold" /> : <Moon size={17} weight="bold" />}
        </span>
      )}
    </button>
  );
}