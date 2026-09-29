<script lang="ts">
	import ServiciosHero from '$lib/components/servicios/ServiciosHero.svelte';
	import AudienceMarquee from '$lib/components/servicios/AudienceMarquee.svelte';
	import ServiciosProjects from '$lib/components/servicios/ServiciosProjects.svelte';
	import ServiciosSeoGeo from '$lib/components/servicios/ServiciosSeoGeo.svelte';
	import ServiciosPlans from '$lib/components/servicios/ServiciosPlans.svelte';
	import ServiciosWhy from '$lib/components/servicios/ServiciosWhy.svelte';
	import ServiciosSteps from '$lib/components/servicios/ServiciosSteps.svelte';
	import ServiciosAbout from '$lib/components/servicios/ServiciosAbout.svelte';
	import ServiciosFaq from '$lib/components/servicios/ServiciosFaq.svelte';
	import ServiciosCta from '$lib/components/servicios/ServiciosCta.svelte';

	let { data } = $props();

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.lang = data.locale;
			window.scrollTo(0, 0);
		}
	});
</script>

<ServiciosHero messages={data.messages} />
<AudienceMarquee messages={data.messages} />
<ServiciosProjects messages={data.messages} />
<ServiciosSeoGeo messages={data.messages} />
<ServiciosPlans messages={data.messages} />
<ServiciosWhy messages={data.messages} />
<ServiciosSteps messages={data.messages} />
<ServiciosAbout messages={data.messages} />
<ServiciosFaq messages={data.messages} />
<ServiciosCta messages={data.messages} />
