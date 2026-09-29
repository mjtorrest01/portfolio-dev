# Spec: Best-practices Svelte 5 + Tailwind v4 + TypeScript

## Objective
Alinear `portfolio-dev` (SvelteKit 2 + Svelte 5 + Tailwind v4) con las skills
`svelte5-best-practices`, `svelte-code-writer`, `tailwind-css-patterns` y
`typescript-advanced-types`. Sin cambios visuales ni de contenido: solo calidad,
tipos y rendimiento.

## Tech Stack
SvelteKit ^2.70, Svelte ^5.57, Tailwind CSS ^4.3 (@tailwindcss/vite),
TypeScript ^5.9 strict, adapter-vercel (nodejs22.x), phosphor-svelte.

## Commands
- Dev: `npm run dev`
- Check: `npm run check` (svelte-kit sync + svelte-check, 0 errors / 0 warnings)
- Build: `npm run build`
- Autofixer (skill svelte-code-writer): `npx @sveltejs/mcp svelte-autofixer <file> --svelte-version 5`

## Project Structure
- `src/lib/types.ts` → tipos compartidos (Messages, secciones i18n, Profile, Plan…)
- `src/lib/theme.svelte.ts` → tema runes `$state` (data-theme light/dark, system default)
- `src/lib/i18n.ts` → `Locale`/`Messages` desde types.ts, `isLocale` type-guard
- `src/lib/components/ui/` → Reveal, CharReveal, Magnetic, TiltCard, ThemeToggle…
- `src/lib/components/servicios/` → secciones de la landing
- `src/app.css` → tokens dual-theme + `@theme` + `@utility` + keyframes

## Code Style
- Props: `interface Props { … }` + `let { … }: Props = $props()` (interface > type).
- Estado: `$state` / `$derived` / `$effect` con cleanup (`return () => …`).
- Eventos Svelte 5: `onclick`, `onmousemove` (nunca `on:click`).
- Snippets: `{@render children()}` (nunca `<slot>`).
- i18n: `const hero: HeroMessages = $derived(messages.hero)` — prohibido `as unknown as`.
- Icon maps: `Record<SocialIconName, …>` / `Record<StepIconName, …>`, nunca `Record<string, …>`.
- Tailwind v4: custom utilities con `@utility` (habilita `hover:`); colores vía `@theme`
  (`--color-on-accent`, `--color-shade` incluidos). Base mobile-first.

## Testing Strategy
- `npm run check` como puerta de calidad (tipos + Svelte).
- `svelte-autofixer` sobre archivos tocados antes de cerrar.
- `npm run build` verde (adapter-vercel) como verificación final.
- Sin framework de tests unitarios en el repo (pendiente si se añade lógica).

## Boundaries
- Always: check 0/0 antes de dar por hecho; cleanup en `$effect`/rAF/IO/listeners;
  `prefers-reduced-motion` en animaciones JS.
- Ask first: cambios de esquema i18n (es/en deben mantener la forma `Messages`),
  nuevas dependencias, cambios en tokens de tema.
- Never: `as unknown as` para secciones de mensajes; `Record<string, …>` abierto;
  clases custom planas si se usan con variantes `hover:`; `bind:` sin `$bindable`.

## Success Criteria
- [x] `theme.svelte.ts` usa `$state`; ThemeToggle deriva con `$derived` (sin subscribe manual)
- [x] 0 `as unknown as` en componentes (12 eliminados); `src/lib/types.ts` creado
- [x] `app.css`: sin `:focus-visible` duplicado; `@utility` para shadow/glow/outline/grid;
      `--color-on-accent` y `--color-shade` registrados
- [x] CharReveal sin O(n²) en template + keys; StatValue con cleanup rAF + reduced-motion;
      CustomCursor sin re-render 60fps (mutación DOM directa)
- [x] `npm run check` 0/0 + `npm run build` verde

## Open Questions
- Ninguna. Seguimiento posible: extraer botones/cards repetidos a componentes,
  añadir suite de tests si crece la lógica, `@custom-variant dark` si se adopta `dark:`.
