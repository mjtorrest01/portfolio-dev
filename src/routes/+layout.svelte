<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { theme } from '$lib/theme.svelte';
	import grotesk from '$lib/fonts/space-grotesk-latin.woff2';
	import archivo from '$lib/fonts/archivo-latin.woff2';
	import jetbrains from '$lib/fonts/jetbrains-mono-latin.woff2';

	let { children } = $props();

	onMount(() => {
		theme.init();
	});
</script>

<svelte:head>
	<link rel="preload" href={grotesk} as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" href={archivo} as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" href={jetbrains} as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

{@render children()}
