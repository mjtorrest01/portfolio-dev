<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import Preloader from '$lib/components/Preloader.svelte';
	import CustomCursor from '$lib/components/CustomCursor.svelte';
	import ScrollProgress from '$lib/components/ScrollProgress.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { registerSiteTools } from '$lib/webmcp';
	import type { Locale, Messages } from '$lib/types';

	interface Props {
		children: Snippet;
		locale: Locale;
		messages: Messages;
	}
	let { children, locale, messages }: Props = $props();

	let loaded = $state(false);

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = loaded ? '' : 'hidden';
		}
	});

	onMount(() => {
		// WebMCP: expone herramientas del sitio a agentes IA; se desregistran al desmontar.
		const controller = new AbortController();
		registerSiteTools(locale, messages, controller.signal);
		return () => {
			controller.abort();
			document.body.style.overflow = '';
		};
	});
</script>

<ScrollProgress />
<CustomCursor />
{#if !loaded}
	<div style="animation: none">
		<Preloader {messages} onDone={() => (loaded = true)} />
	</div>
{/if}
<Navbar show={loaded} {locale} {messages} />
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<main id="contenido" tabindex={-1}>
	{@render children()}
</main>
<Footer {messages} />
<div aria-hidden="true" class="pointer-events-none fixed inset-0 z-50 mix-blend-overlay opacity-[0.03]">
	<div class="h-full w-full bg-gradient-to-br from-accent via-transparent to-cyan"></div>
</div>
