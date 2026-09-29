import type { Locale, Messages } from '$lib/types';
import { profile } from '$lib/data';
import { waLink } from '$lib/data-servicios';

declare global {
	interface Document {
		modelContext?: {
			registerTool(
				def: {
					name: string;
					description: string;
					inputSchema: Record<string, unknown>;
					execute: (input: Record<string, unknown>, signal: AbortSignal) => unknown;
				},
				options?: { signal?: AbortSignal }
			): Promise<unknown>;
		};
	}
}

/**
 * Expone las acciones clave del sitio a agentes IA vía WebMCP.
 * No-op en navegadores sin `document.modelContext`. Sin <form> que anotar:
 * el contacto es vía WhatsApp/mailto, por eso todo es programático.
 */
export function registerSiteTools(
	locale: Locale,
	messages: Messages,
	signal: AbortSignal
): void {
	const mc = typeof document !== 'undefined' ? document.modelContext : undefined;
	if (!mc) return;

	const tools: Parameters<NonNullable<Document['modelContext']>['registerTool']>[0][] = [
		{
			name: 'site_get_summary',
			description: 'Get a summary of the MJ Torres portfolio site: what it offers and contact channels.',
			inputSchema: { type: 'object', properties: {} },
			execute: () => ({
				name: profile.name,
				role: profile.role,
				location: profile.location,
				description: messages.meta.description,
				url: `https://mjtorres.dev/${locale}`,
				contact: { whatsapp: `https://wa.me/${profile.whatsapp}`, email: profile.email }
			})
		},
		{
			name: 'site_get_plans',
			description: 'List subscription website plans with prices and features.',
			inputSchema: { type: 'object', properties: {} },
			execute: () =>
				messages.plans.items.map((p) => ({
					name: p.name,
					priceUSD: p.price,
					per: messages.plans.per,
					tagline: p.tagline,
					features: p.features
				}))
		},
		{
			name: 'site_get_projects',
			description: 'List client projects with stack, languages and URLs.',
			inputSchema: { type: 'object', properties: {} },
			execute: () =>
				messages.work.projects.map((p) => ({
					name: p.name,
					category: p.category,
					url: p.url,
					tech: p.tech,
					plan: p.plan,
					tagline: p.tagline,
					description: p.description,
					stack: p.stack,
					languages: p.languages ?? []
				}))
		},
		{
			name: 'site_get_faq',
			description: 'Get frequently asked questions and answers.',
			inputSchema: { type: 'object', properties: {} },
			execute: () => messages.faq.items
		},
		{
			name: 'site_contact_whatsapp',
			description: 'Build a WhatsApp deep link to MJ Torres with a prefilled message.',
			inputSchema: {
				type: 'object',
				properties: { message: { type: 'string', description: 'Message to prefill in the chat' } },
				required: ['message']
			},
			execute: (input) => ({ url: waLink(String(input.message ?? messages.cta.whatsappMsg)) })
		},
		{
			name: 'site_contact_email',
			description: 'Get the contact email address with a suggested subject.',
			inputSchema: {
				type: 'object',
				properties: { subject: { type: 'string', description: 'Suggested email subject' } }
			},
			execute: (input) => ({
				email: profile.email,
				mailto: `mailto:${profile.email}?subject=${encodeURIComponent(String(input.subject ?? messages.cta.mail))}`
			})
		}
	];

	for (const tool of tools) {
		void mc.registerTool(tool, { signal });
	}
}
