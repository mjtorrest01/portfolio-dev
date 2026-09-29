const SITE_URL = 'https://mjtorres.dev';

export const prerender = true;

/** OpenAPI mínimo de la superficie pública (solo lectura, sin auth). */
export function GET() {
	const spec = {
		openapi: '3.1.0',
		info: {
			title: 'MJ Torres — public discovery API',
			version: '1.0.0',
			description:
				'Read-only machine-readable endpoints of the mjtorres.dev portfolio site. No authentication required.',
			contact: { name: 'MJ Torres', url: SITE_URL, email: 'hola@mjtorres.dev' }
		},
		servers: [{ url: SITE_URL }],
		paths: {
			'/api/health': {
				get: {
					summary: 'Service health',
					operationId: 'getHealth',
					responses: {
						'200': {
							description: 'OK',
							content: {
								'application/json': {
									schema: {
										type: 'object',
										properties: {
											status: { type: 'string' },
											site: { type: 'string' },
											time: { type: 'string', format: 'date-time' }
										}
									}
								}
							}
						}
					}
				}
			},
			'/.well-known/api-catalog': {
				get: {
					summary: 'API catalog (RFC 9727 linkset)',
					operationId: 'getApiCatalog',
					responses: { '200': { description: 'Linkset JSON' } }
				}
			},
			'/.well-known/ai-catalog.json': {
				get: {
					summary: 'Agentic Resource Discovery manifest',
					operationId: 'getAiCatalog',
					responses: { '200': { description: 'ARD manifest JSON' } }
				}
			}
		}
	};
	return new Response(JSON.stringify(spec), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Access-Control-Allow-Origin': '*',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
