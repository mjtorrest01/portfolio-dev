import type { Locale, Messages } from '$lib/types';
import { profile } from '$lib/data';

/** Representación Markdown del sitio para agentes (Accept: text/markdown). */
export function siteMarkdown(locale: Locale, messages: Messages): string {
	const lines: string[] = [
		`# ${messages.meta.title}`,
		'',
		`> ${messages.meta.description}`,
		'',
		`- Location: ${profile.location}`,
		`- WhatsApp: https://wa.me/${profile.whatsapp}`,
		`- Email: ${profile.email}`,
		`- URL: https://mjtorres.dev/${locale}`,
		'',
		`## ${messages.work.title}`,
		'',
		messages.work.subtitle,
		''
	];
	for (const p of messages.work.projects) {
		lines.push(
			`### ${p.name} (${p.plan})`,
			'',
			`- ${p.category} · ${p.tech}`,
			`- ${p.tagline}`,
			`- ${p.description}`,
			`- URL: ${p.url}`,
			`- Stack: ${p.stack.join(' · ')}`,
			''
		);
	}
	lines.push(`## ${messages.plans.title}`, '', messages.plans.subtitle, '');
	for (const plan of messages.plans.items) {
		lines.push(
			`### ${plan.name} — $${plan.price}${messages.plans.per}`,
			'',
			plan.tagline,
			'',
			...plan.features.map((f) => `- ${f}`),
			''
		);
	}
	lines.push(`## ${messages.faq.title}`, '');
	for (const item of messages.faq.items) {
		lines.push(`### ${item.q}`, '', item.a, '');
	}
	lines.push(`## ${messages.cta.titleA} ${messages.cta.titleB}`, '', messages.cta.sub, '');
	return lines.join('\n');
}
