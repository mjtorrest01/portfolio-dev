import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getMessages, isLocale } from '$lib/i18n';

export const load: LayoutServerLoad = async ({ params }) => {
	if (!isLocale(params.locale)) {
		throw error(404, 'Locale not found');
	}
	return {
		locale: params.locale,
		messages: getMessages(params.locale)
	};
};

export const prerender = true;
