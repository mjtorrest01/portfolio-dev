# 💻 MJ Torres — Webs por suscripción

> 🚀 Sitio web bilingüe de presentación y captación de clientes para **MJ Torres** — webs profesionales por suscripción desde **$25/mes**.

![Next.js](https://img.shields.io/badge/Next.js%2016-black?logo=next.js&logoColor=white&style=flat) ![React 19](https://img.shields.io/badge/React%2019-61DAFB?logo=react&logoColor=black&style=flat) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat) ![Tailwind 4](https://img.shields.io/badge/Tailwind%20CSS%204-06B6D4?logo=tailwindcss&logoColor=white&style=flat) ![next-intl](https://img.shields.io/badge/next--intl%204-0ea5e9?style=flat) ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-E24FEF?logo=framer&logoColor=white&style=flat) ![ES](https://img.shields.io/badge/🇪🇸%20ES%20+%20EN-blue?style=flat)

---

## ✨ Características

- 🌐 **Bilingüe (ES/EN)** — routing con `next-intl`, detección de idioma del navegador (`/es` `/en`, default `en`)
- 🌙☀️ **Tema claro/oscuro** — automático según el sistema, con transición animada (View Transitions API)
- 💰 **Planes por suscripción** — Starter $25 · **Pro $45** (destacado) · Business $75
- 🏢 **Proyectos reales** — Blue Horizon y Panamá Market, con badge `completada`
- 🎨 **Animaciones** — hero con char reveal, auroras, cursor y anillo personalizados, tilt cards, marquee infinito
- ♿ **Accesibilidad (WCAG 2.2)** — skip link, focus visible, `aria-controls`/`role="region"`, menú móvil con `Esc`, targets ≥ 24px
- 🔍 **SEO** — sitemap con hreflang, `robots.txt`, `opengraph-image.png`, JSON-LD (`Person`, `Organization`, `FAQPage`), verificado en Google Search Console
- 🍪 **Rastreadores con consentimiento** — Google Analytics 4, Google Tag Manager y Meta Pixel solo se cargan tras aceptar (cookie `mj_consent`)

---

## 🧰 Stack

| Capa | Tecnología |
|------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| UI | [React 19](https://react.dev) + [Tailwind CSS 4](https://tailwindcss.com) (config CSS-first con `@theme`) |
| Animaciones | [Framer Motion](https://motion.dev) |
| i18n | [next-intl](https://next-intl.dev) |
| Temas | [next-themes](https://github.com/pacocoursey/next-themes) |
| Iconos | [@phosphor-icons/react](https://phosphoricons.com) |
| Tipografías | Space Grotesk · Archivo · JetBrains Mono (`next/font`) |

---

## 📁 Estructura

```
├── app
│   ├── [locale]/              # Rutas localizadas (SSG: /es, /en)
│   │   ├── layout.tsx         # <html lang>, fonts, ThemeProvider, JSON-LD, skip link
│   │   └── page.tsx           # Portada (hero → marquee → trabajos → planes → … → CTA)
│   ├── globals.css            # Tokens HSL duales (claro/oscuro) + utilidades
│   ├── layout.tsx             # Root mínimo (+ metadataBase, robots)
│   ├── icon.svg               # Favicon
│   ├── opengraph-image.png    # Imagen OG 1200×630
│   ├── robots.ts
│   └── sitemap.ts             # hreflang es/en + x-default
├── components
│   ├── servicios/             # Secciones de negocio (Hero, Plans, FAQ, CTA…)
│   └── ui/                    # ThemeToggle, LocaleSwitch, CookieConsent, MetaPixel…
├── i18n
│   ├── messages/              # es.json + en.json (todo el contenido)
│   ├── navigation.ts          # createNavigation (Link, useRouter…)
│   ├── request.ts
│   └── routing.ts             # locales, defaultLocale «always»
├── lib
│   ├── data.ts                # Perfil, redes, contacto
│   ├── data-servicios.ts      # Helper waLink() para WhatsApp
│   └── animations.ts          # Easings compartidos
├── public
│   └── googleca90bb66ade8a84b.html  # Verificación de Google Search Console
└── proxy.ts                   # Middleware i18n (Next 16)
```

---

## 🚀 Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | 🛠️ Servidor de desarrollo en `http://localhost:3000` |
| `npm run build` | 📦 Build de producción (SSG con `generateStaticParams`) |
| `npm run start` | ▶️ Servir el build en producción |
| `npm run typecheck` | 🔎 Typecheck estricto (`tsc --noEmit`) |

---

## 🌍 Idiomas

- URL con prefijo siempre: `/es` y `/en` (`localePrefix: "always"`)
- Detección automática: `Accept-Language` del navegador (ej. `es` → `/es`, otros → `/en`)
- Todo el contenido vive en `i18n/messages/{es,en}.json` — agregar un idioma = nuevo archivo + entrada en `i18n/routing.ts`
- Meta por idioma: `hreflang`, `canonical`, `og:locale` (`es_PA` / `en_US`) generados por locale

## 🎨 Tema claro/oscuro

- Tokens CSS (`--t-*`) en `app/globals.css` bajo el sistema **HSL** semántico:
  `bg`, `surface`, `fg`, `accent`, `line`…
- `:root` = claro · `@media (prefers-color-scheme: dark)` = oscuro automático · `[data-theme="dark"]` = forzado
- `next-themes` sincroniza el atributo `data-theme` en `<html>` escoltando al sistema
- El cambio de tema se anima con **View Transitions API** (con fallback instantáneo y respeto a `prefers-reduced-motion`)

## 📄 Secciones (numeración 01→06)

| # | Sección | id |
|---|---------|----|
| 01 | Trabajos (proyectos reales) | `#trabajos` |
| 02 | Planes ($25/$45/$75) | `#planes` |
| 03 | Por qué conmigo | — |
| 04 | Cómo funciona (4 pasos) | `#como` |
| 05 | Sobre el proyecto | `#sobre` |
| 06 | Preguntas frecuentes | `#faq` |
| — | CTA final + redes | `#contacto` |

## 🍪 Privacidad y rastreadores

El sitio cumple con el consentimiento previo a la medición:

| Rastreador | ID | Carga |
|------------|----|-------|
| Google Tag Manager | `GTM-NNWX5D4C` | Solo tras aceptar |
| Google Analytics 4 | `G-28WBDZ5HWY` | Solo tras aceptar |
| Meta Pixel | `3582088715287818` | Solo tras aceptar |

- El banner **«Privacidad y cookies»** avisa de los rastreadores y pide aceptar o rechazar (bilingüe, animado con Framer Motion)
- La decisión se guarda en la cookie `mj_consent` (1 año, `path=/`, `SameSite=Lax`)
- **Aceptar** → inyecta GTM, GA4 y Pixel con la primera visita ya contada (`PageView`)
- **Rechazar** → ninguna cookie de rastreo se instala y el banner no vuelve a aparecer
- El HTML prerenderizado (SSG) **no contiene** ningún código de rastreador
- La verificación de Google Search Console se sirve desde `/googleca90bb66ade8a84b.html` (`public/`)

## ✍️ Personalización rápida

| ¿Qué quieres cambiar? | Dónde |
|-----------------------|-------|
| Textos / precios / FAQ | `i18n/messages/es.json` y `en.json` |
| Nombre, email, WhatsApp | `lib/data.ts` |
| Redes sociales | `lib/data.ts` → `socials` (iconos: `instagram`, `facebook`, `x`, `github`) |
| Mensaje de WhatsApp | Claves `…whatsappMsg` / `ctaMsg` de los mensajes |
| Textos del banner de cookies | `i18n/messages/{es,en}.json` → `cookie` |
| IDs de GTM / GA4 / Pixel | `components/ui/CookieConsent.tsx` |
| Colores y tema | `app/globals.css` → tokens `--t-*` |

## 🚀 Despliegue

1. `npm run build` (genera `/es`, `/en`, sitemap y robots estáticos)
2. Desplegar en **Vercel** (recomendado) o cualquier host de Node estático
3. Ajustar `SITE_URL` (`https://mjtorres.dev`) en `app/[locale]/layout.tsx`, `app/layout.tsx`, `app/sitemap.ts` y `app/robots.ts`
4. Enviar `sitemap.xml` a Google Search Console

---

## 📬 Contacto

[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?logo=whatsapp&logoColor=white&style=flat)](https://wa.me/50769239002) [![Instagram](https://img.shields.io/badge/Instagram-E4405F?logo=instagram&logoColor=white&style=flat)](https://www.instagram.com/mjtorresdev/) [![Facebook](https://img.shields.io/badge/Facebook-1877F2?logo=facebook&logoColor=white&style=flat)](https://www.facebook.com/mjtorrest01/) [![X](https://img.shields.io/badge/X-000000?logo=x&logoColor=white&style=flat)](https://x.com/mjtorrestdev) [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white&style=flat)](https://github.com/mjtorrest01)

📧 [hola@mjtorres.dev](mailto:hola@mjtorres.dev) · 🌐 https://mjtorres.dev