<script lang="ts">
	import AppShell from '$lib/components/AppShell.svelte';
	import CookieConsent from '$lib/components/ui/CookieConsent.svelte';
	import PixelPageView from '$lib/components/ui/MetaPixel.svelte';
	import type { FaqMessages } from '$lib/types';

	let { data, children } = $props();

	const SITE_URL = 'https://mjtorres.dev';

	const sameAs = [
		'https://www.instagram.com/mjtorresdev/',
		'https://www.facebook.com/mjtorrest01/',
		'https://x.com/mjtorrestdev',
		'https://github.com/mjtorrest01'
	];

	const personLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'MJ Torres',
		url: SITE_URL,
		jobTitle: 'Web Designer & Developer',
		address: { '@type': 'PostalAddress', addressLocality: 'Panamá', addressCountry: 'PA' },
		sameAs,
		contactPoint: {
			'@type': 'ContactPoint',
			email: 'hola@mjtorres.dev',
			telephone: '+507-6923-9002',
			contactType: 'customer support'
		}
	};

	const organizationLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'MJ Torres',
		url: SITE_URL,
		sameAs,
		contactPoint: {
			'@type': 'ContactPoint',
			email: 'hola@mjtorres.dev',
			telephone: '+507-6923-9002',
			contactType: 'customer support',
			availableLanguage: [data.locale]
		}
	});

	const faqLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: ((data.messages.faq as FaqMessages).items).map((item) => ({
			'@type': 'Question',
			name: item.q,
			acceptedAnswer: { '@type': 'Answer', text: item.a }
		}))
	});
</script>

<svelte:head>
	<title>{data.messages.meta.title}</title>
	<meta name="description" content={data.messages.meta.description} />
	<meta
		name="keywords"
		content="webs por suscripción, diseño web, mj torres, wordpress, e-commerce"
	/>
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href={`${SITE_URL}/${data.locale}`} />
	<link rel="alternate" hreflang="es" href={`${SITE_URL}/es`} />
	<link rel="alternate" hreflang="en" href={`${SITE_URL}/en`} />
	<link rel="alternate" hreflang="x-default" href={`${SITE_URL}/en`} />
	<meta property="og:title" content={data.messages.meta.title} />
	<meta property="og:description" content={data.messages.meta.description} />
	<meta property="og:url" content={`${SITE_URL}/${data.locale}`} />
	<meta property="og:site_name" content="MJ Torres" />
	<meta property="og:locale" content={data.locale === 'es' ? 'es_PA' : 'en_US'} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={`${SITE_URL}/opengraph-image.png`} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={data.messages.meta.title} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={data.messages.meta.title} />
	<meta name="twitter:description" content={data.messages.meta.description} />
	<meta name="twitter:image" content={`${SITE_URL}/opengraph-image.png`} />
	{@html `<script type="application/ld+json">${JSON.stringify(personLd)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(organizationLd)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(faqLd)}</script>`}
</svelte:head>

<PixelPageView />
<a href="#contenido" class="skip-link">{data.messages.meta.skip}</a>
<AppShell locale={data.locale} messages={data.messages}>
	{@render children()}
</AppShell>
<CookieConsent messages={data.messages} />
