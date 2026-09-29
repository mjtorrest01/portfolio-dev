import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { getMessages, isLocale } from '$lib/i18n';
import { siteMarkdown } from '$lib/site-markdown';

const LOCALES = ['es', 'en'] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = 'en';

function detectLocale(acceptLanguage: string | null): Locale {
	if (!acceptLanguage) return DEFAULT_LOCALE;
	const first = acceptLanguage.split(',')[0]?.split('-')[0]?.trim().toLowerCase();
	return first === 'es' ? 'es' : 'en';
}

function isAsset(pathname: string): boolean {
	// Dejar pasar archivos estáticos, sitemap, robots, verificación google, iconos
	if (pathname.startsWith('/_app/')) return true;
	// Endpoints máquina-legibles (agentes/SEO): no llevan prefijo de locale
	if (pathname.startsWith('/.well-known/')) return true;
	if (pathname.startsWith('/api/')) return true;
	if (
		pathname === '/sitemap.xml' ||
		pathname === '/robots.txt' ||
		pathname === '/auth.md' ||
		pathname === '/opengraph-image.png' ||
		pathname === '/opengraph-image.avif' ||
		pathname === '/icon.svg'
	)
		return true;
	const last = pathname.split('/').pop() ?? '';
	if (last.includes('.')) return true;
	return false;
}

function wantsMarkdown(request: Request): boolean {
	const accept = request.headers.get('accept') ?? '';
	return accept.split(',').some((part) => part.split(';')[0]?.trim() === 'text/markdown');
}

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	if (isAsset(pathname)) {
		return resolve(event);
	}

	const segments = pathname.split('/').filter(Boolean);
	const maybeLocale = segments[0] as string | undefined;

	if (maybeLocale === 'es' || maybeLocale === 'en') {
		event.locals.locale = maybeLocale;
		// Markdown for Agents: Accept: text/markdown → versión markdown, HTML sigue por defecto.
		if (event.request.method === 'GET' && segments.length === 1 && wantsMarkdown(event.request)) {
			const locale = maybeLocale;
			if (isLocale(locale)) {
				return new Response(siteMarkdown(locale, getMessages(locale)), {
					headers: {
						'Content-Type': 'text/markdown; charset=utf-8',
						'Vary': 'Accept',
						'Cache-Control': 'public, max-age=3600'
					}
				});
			}
		}
		return resolve(event);
	}

	// "/" → redirect según Accept-Language (paridad con next-intl middleware)
	if (pathname === '/') {
		const locale = detectLocale(event.request.headers.get('accept-language'));
		throw redirect(307, `/${locale}`);
	}

	// Rutas sin prefijo que no son assets → canonical al default (solo si no es ruta SvelteKit conocida)
	// Dejamos pasar; el layout [locale] hará 404 si hace falta. Aquí redirigir preserva /es /en always.
	const locale = detectLocale(event.request.headers.get('accept-language'));
	throw redirect(307, `/${locale}${pathname}`);
};
