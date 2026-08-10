import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { hasLocale } from "next-intl";
import { ThemeProvider } from "next-themes";
import { Space_Grotesk, Archivo, JetBrains_Mono } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import { AppShell } from "@/components/AppShell";
import { PixelPageView } from "@/components/ui/MetaPixel";
import { CookieConsent } from "@/components/ui/CookieConsent";
import "../globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://mjtorres.dev";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../i18n/messages/${locale}.json`)).default;

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    keywords: ["webs por suscripción", "diseño web", "mj torres", "wordpress", "e-commerce"],
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        es: `${SITE_URL}/es`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: `${SITE_URL}/${locale}`,
      siteName: "MJ Torres",
      locale: locale === "es" ? "es_PA" : "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: messages.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.meta.title,
      description: messages.meta.description,
      images: [`${SITE_URL}/opengraph-image.png`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const sameAs = [
    "https://www.instagram.com/mjtorresdev/",
    "https://www.facebook.com/mjtorrest01/",
    "https://x.com/mjtorrestdev",
    "https://github.com/mjtorrest01",
  ];

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "MJ Torres",
    url: SITE_URL,
    jobTitle: "Web Designer & Developer",
    address: { "@type": "PostalAddress", addressLocality: "Panamá", addressCountry: "PA" },
    sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      email: "hola@mjtorres.dev",
      telephone: "+507-6923-9002",
      contactType: "customer support",
    },
  };

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MJ Torres",
    url: SITE_URL,
    sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      email: "hola@mjtorres.dev",
      telephone: "+507-6923-9002",
      contactType: "customer support",
      availableLanguage: [locale],
    },
  };

  const faqItems = ((messages as Record<string, Record<string, unknown>>).faq as {
    items: { q: string; a: string }[];
  }).items;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${grotesk.variable} ${archivo.variable} ${jetbrains.variable}`}
    >
      <body className="noise min-h-screen bg-bg font-body text-fg antialiased">
        <PixelPageView />
        <a href="#contenido" className="skip-link">
          {messages.meta.skip}
        </a>
        <JsonLd data={personLd} />
        <JsonLd data={organizationLd} />
        <JsonLd data={faqLd} />
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <AppShell>{children}</AppShell>
            <CookieConsent />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}