"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function PixelPageView() {
  const pathname = usePathname();
  const fired = useRef(false);

  useEffect(() => {
    if (!fired.current) {
      fired.current = true;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}