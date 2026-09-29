<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { theme } from '$lib/theme.svelte';

	let { children } = $props();

	onMount(() => {
		theme.init();
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Archivo:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
		rel="stylesheet"
	/>
	<style>
		:root {
			--font-grotesk: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
			--font-archivo: 'Archivo', ui-sans-serif, system-ui, sans-serif;
			--font-jetbrains: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		}
	</style>
</svelte:head>

{@render children()}
