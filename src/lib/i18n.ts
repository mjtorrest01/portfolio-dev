import en from '$lib/messages/en.json';
import es from '$lib/messages/es.json';
import type { Locale, Messages } from '$lib/types';

export const locales = ['es', 'en'] as const satisfies readonly Locale[];
export const defaultLocale: Locale = 'en';

const dict = { es, en } as const satisfies Record<Locale, Messages>;

export function isLocale(value: unknown): value is Locale {
	return value === 'es' || value === 'en';
}

export function getMessages(locale: Locale): Messages {
	return (dict[locale] ?? dict.en) as Messages;
}

/** Interpola "{plan}" / "${price}" como hacía next-intl en ctaMsg. */
export function format(template: string, params: Record<string, string | number> = {}): string {
	let out = template;
	for (const [key, value] of Object.entries(params)) {
		out = out.replaceAll(`{${key}}`, String(value));
	}
	return out;
}
