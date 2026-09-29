const SITE_URL = 'https://mjtorres.dev';

export const prerender = false;

/** Manifiesto ARD (Agentic Resource Discovery): capacidades del sitio para agentes. */
export function GET() {
	const manifest = {
		specVersion: '1.0',
		host: {
			displayName: 'MJ Torres — webs por suscripción',
			identifier: 'mjtorres.dev',
			logoUrl: `${SITE_URL}/icon.svg`
		},
		entries: [
			{
				identifier: 'urn:air:mjtorres.dev:site:homepage-es',
				displayName: 'Sitio en español',
				type: 'text/html',
				url: `${SITE_URL}/es`,
				description:
					'MJ Torres — webs profesionales por suscripción desde $25/mes en Panamá. Planes, trabajos publicados y contacto directo.',
				representativeQueries: [
					'webs por suscripción en Panamá',
					'cuánto cuesta una página web con MJ Torres',
					'proyectos y planes en español'
				]
			},
			{
				identifier: 'urn:air:mjtorres.dev:site:homepage-en',
				displayName: 'English homepage',
				type: 'text/html',
				url: `${SITE_URL}/en`,
				description:
					'MJ Torres — professional subscription websites from $25/mo in Panama. Plans, published work and direct contact.',
				representativeQueries: [
					'subscription websites in Panama',
					'MJ Torres website plans and pricing',
					'portfolio projects in English'
				]
			},
			{
				identifier: 'urn:air:mjtorres.dev:work:blue-horizon',
				displayName: 'Caso Blue Horizon PTY',
				type: 'text/html',
				url: 'https://bluehorizonpty.com/',
				description:
					'Caso de estudio: web de agencia de viajes en Panamá construida con SvelteKit 2 y Svelte 5, multilingüe (es, en, fr, pt), con Supabase y Resend.',
				metadata: {
					client: 'Blue Horizon PTY',
					segment: 'Travel agency in Panama',
					stack: 'SvelteKit 2, Svelte 5, TypeScript, Tailwind CSS v4, Paraglide JS, Supabase, Resend',
					languages: 'es, en, fr, pt'
				},
				representativeQueries: [
					'Blue Horizon Panama travel website case study',
					'multilingual SvelteKit tourism site example'
				]
			},
			{
				identifier: 'urn:air:mjtorres.dev:contact:whatsapp',
				displayName: 'Contacto por WhatsApp',
				type: 'text/html',
				url: 'https://wa.me/50769239002?text=Hola%20MJ%2C%20quiero%20una%20web%20para%20mi%20negocio.',
				description:
					'Conversación directa con MJ Torres para pedir una web. Alternativa por correo: hola@mjtorres.dev.',
				representativeQueries: [
					'how to contact MJ Torres',
					'cómo pedir una web por WhatsApp'
				]
			},
			{
				identifier: 'urn:air:mjtorres.dev:discovery:api-catalog',
				displayName: 'Catálogo de APIs (RFC 9727)',
				type: 'application/linkset+json',
				url: `${SITE_URL}/.well-known/api-catalog`,
				description:
					'Linkset RFC 9727 con las interfaces máquina-a-máquina del sitio (documentación, OpenAPI y estado).',
				representativeQueries: [
					'list machine-readable APIs of mjtorres.dev',
					'what public endpoints does mjtorres.dev expose',
					'APIs y documentación OpenAPI del sitio mjtorres.dev'
				]
			},
			{
				identifier: 'urn:air:mjtorres.dev:discovery:health',
				displayName: 'Estado del servicio',
				type: 'application/json',
				url: `${SITE_URL}/api/health`,
				description: 'Comprobación de estado del servicio en tiempo real para agentes autónomos.',
				representativeQueries: [
					'is mjtorres.dev service healthy',
					'estado del servicio mjtorres.dev',
					'¿mjtorres.dev está caído o funcionando?'
				]
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
