const SITE_URL = 'https://mjtorres.dev';

export const prerender = false;

/** Catálogo de APIs para descubrimiento automatizado (RFC 9727, application/linkset+json). */
export function GET() {
	const catalog = {
		linkset: [
			{
				anchor: `${SITE_URL}/`,
				'service-doc': [{ href: `${SITE_URL}/es` }, { href: `${SITE_URL}/en` }],
				'service-desc': [{ href: `${SITE_URL}/.well-known/openapi.json` }],
				status: [{ href: `${SITE_URL}/api/health` }]
			}
		]
	};
	return new Response(JSON.stringify(catalog), {
		headers: {
			// RFC 9727 §4.2: profile del API catalog; §2: Link self en HEAD/GET.
			'Content-Type':
				'application/linkset+json; charset=utf-8; profile="https://www.rfc-editor.org/info/rfc9727"',
			'Link': `<${SITE_URL}/.well-known/api-catalog>; rel="api-catalog"`,
			'Access-Control-Allow-Origin': '*',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
