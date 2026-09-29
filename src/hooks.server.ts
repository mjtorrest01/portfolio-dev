import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { getMessages, isLocale } from '$lib/i18n';
import { siteMarkdown } from '$lib/site-markdown';

const LOCALES = ['es', 'en'] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = 'en';
const SITE_URL = 'https://mjtorres.dev';

/**
 * RFC 8288: headers Link de descubrimiento para agentes en respuestas HTML.
 * rels registrados en IANA: api-catalog (RFC 9727), service-desc (RFC 8631),
 * describedby (RFC 6594).
 */
const AGENT_LINK_HEADER = [
	`<${SITE_URL}/.well-known/api-catalog>; rel="api-catalog"`,
	`<${SITE_URL}/.well-known/openapi.json>; rel="service-desc"`,
	`<${SITE_URL}/.well-known/ai-catalog.json>; rel="describedby"`
].join(', ');

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

function markdownResponse(locale: Locale): Response {
	const markdown = siteMarkdown(locale, getMessages(locale));
	return new Response(markdown, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'x-markdown-tokens': String(Math.ceil(markdown.length / 4)),
			'Link': AGENT_LINK_HEADER,
			'Vary': 'Accept',
			'Cache-Control': 'public, max-age=3600'
		}
	});
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
			return markdownResponse(maybeLocale);
		}
		const response = await resolve(event);
		if (response.headers.get('content-type')?.includes('text/html')) {
			response.headers.set('Link', AGENT_LINK_HEADER);
			response.headers.append('Vary', 'Accept');
		}
		return response;
	}

	// "/" → redirect según Accept-Language (paridad con next-intl middleware).
	// Si piden markdown, servirlo directo para no depender de que sigan el redirect.
	if (pathname === '/') {
		const locale = detectLocale(event.request.headers.get('accept-language'));
		if (event.request.method === 'GET' && wantsMarkdown(event.request)) {
			return markdownResponse(locale);
		}
		throw redirect(307, `/${locale}`);
	}

	// Rutas sin prefijo que no son assets → canonical al default (solo si no es ruta SvelteKit conocida)
	// Dejamos pasar; el layout [locale] hará 404 si hace falta. Aquí redirigir preserva /es /en always.
	const locale = detectLocale(event.request.headers.get('accept-language'));
	throw redirect(307, `/${locale}${pathname}`);
};
