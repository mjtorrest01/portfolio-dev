"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "@phosphor-icons/react";

const CONSENT_KEY = "mj_consent";
const COOKIE_ATTRS = ";path=/;max-age=31536000;SameSite=Lax";
const ACCEPTED = "accepted";

const GTM_ID = "GTM-NNWX5D4C";
const GA_ID = "G-28WBDZ5HWY";
const FB_PIXEL_ID = "3582088715287818";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function setConsent(value: string) {
  document.cookie = `${CONSENT_KEY}=${value}${COOKIE_ATTRS}`;
}

function getConsent(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_KEY}=([^;]*)`));
  return match ? match[1] : null;
}

function injectInline(id: string, code: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.textContent = code;
  document.head.appendChild(script);
}

function injectScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function loadTrackers() {
  injectInline(
    "gtm-init",
    `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`
  );
  injectScript("gtag-src", `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
  injectInline(
    "gtag-init",
    `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`
  );
  injectInline(
    "meta-pixel",
    `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${FB_PIXEL_ID}');
fbq('track', 'PageView');`
  );
}

export function CookieConsent() {
  const t = useTranslations("cookie");
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (getConsent() === ACCEPTED) {
      loadTrackers();
      return;
    }
    if (getConsent() === null) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted) return null;

  const accept = () => {
    setConsent(ACCEPTED);
    setVisible(false);
    loadTrackers();
  };

  const decline = () => {
    setConsent("declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label={t("title")}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-x-4 bottom-4 z-[70] mx-auto w-full max-w-2xl rounded-2xl border border-line bg-surface/95 p-4 shadow-2xl backdrop-blur-md sm:p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <Cookie size={20} weight="duotone" className="text-accent" aria-hidden />
                <p className="font-display text-sm font-bold tracking-wide text-fg">{t("title")}</p>
              </div>
              <p className="pr-1 text-[13px] leading-relaxed text-muted">{t("text")}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:w-52">
              <button
                type="button"
                onClick={accept}
                className="rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-on-accent transition-colors hover:bg-accent-deep"
              >
                {t("accept")}
              </button>
              <button
                type="button"
                onClick={decline}
                className="rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-fg-dim transition-colors hover:bg-surface-2"
              >
                {t("decline")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}