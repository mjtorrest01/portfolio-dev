import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	const al = request.headers.get('accept-language') ?? '';
	const locale = al.split(',')[0]?.split('-')[0]?.trim().toLowerCase() === 'es' ? 'es' : 'en';
	throw redirect(307, `/${locale}`);
};
