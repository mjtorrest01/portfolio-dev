const SITE_URL = 'https://mjtorres.dev';

export const prerender = true;

/** Manifiesto ARD (Agentic Resource Discovery): capacidades del sitio para agentes. */
export function GET() {
	const manifest = {
		specVersion: '1.0',
		host: {
			domain: 'mjtorres.dev',
			name: 'MJ Torres — webs por suscripción',
			description:
				'Portfolio site of MJ Torres: subscription websites for small businesses in Panama. Spanish and English. Public content, no authentication required.',
			contact: 'hola@mjtorres.dev'
		},
		entries: [
			{
				id: 'urn:air:mjtorres.dev:site:homepage-es',
				displayName: 'Sitio en español',
				type: 'text/html',
				url: `${SITE_URL}/es`,
				representativeQueries: [
					'webs por suscripción en Panamá',
					'cuánto cuesta una página web con MJ Torres',
					'proyectos y planes en español'
				]
			},
			{
				id: 'urn:air:mjtorres.dev:site:homepage-en',
				displayName: 'English homepage',
				type: 'text/html',
				url: `${SITE_URL}/en`,
				representativeQueries: [
					'subscription websites in Panama',
					'MJ Torres website plans and pricing',
					'portfolio projects in English'
				]
			},
			{
				id: 'urn:air:mjtorres.dev:work:blue-horizon',
				displayName: 'Caso Blue Horizon PTY',
				type: 'text/html',
				url: 'https://bluehorizonpty.com/',
				data: {
					client: 'Blue Horizon PTY',
					segment: 'Travel agency in Panama',
					stack: 'SvelteKit 2, Svelte 5, TypeScript, Tailwind CSS v4, Paraglide JS, Supabase, Resend',
					languages: ['es', 'en', 'fr', 'pt']
				},
				representativeQueries: [
					'Blue Horizon Panama travel website case study',
					'multilingual SvelteKit tourism site example'
				]
			},
			{
				id: 'urn:air:mjtorres.dev:contact:whatsapp',
				displayName: 'Contacto por WhatsApp',
				type: 'text/html',
				url: 'https://wa.me/50769239002?text=Hola%20MJ%2C%20quiero%20una%20web%20para%20mi%20negocio.',
				representativeQueries: [
					'how to contact MJ Torres',
					'cómo pedir una web por WhatsApp'
				]
			},
			{
				id: 'urn:air:mjtorres.dev:discovery:api-catalog',
				displayName: 'Catálogo de APIs (RFC 9727)',
				type: 'application/linkset+json',
				url: `${SITE_URL}/.well-known/api-catalog`,
				representativeQueries: ['list machine-readable APIs of mjtorres.dev']
			},
			{
				id: 'urn:air:mjtorres.dev:discovery:health',
				displayName: 'Estado del servicio',
				type: 'application/json',
				url: `${SITE_URL}/api/health`,
				representativeQueries: ['is mjtorres.dev service healthy']
			}
		]
	};
	return new Response(JSON.stringify(manifest), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Access-Control-Allow-Origin': '*',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
