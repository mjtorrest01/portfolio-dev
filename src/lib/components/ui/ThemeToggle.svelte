<script lang="ts">
	import { onMount } from 'svelte';
	import { Moon, Sun } from 'phosphor-svelte';
	import { theme } from '$lib/theme.svelte';

	let mounted = $state(false);
	// $derived sobre estado runes: se actualiza solo, sin subscribe manual.
	let isDark = $derived(theme.resolved === 'dark');

	onMount(() => {
		mounted = true;
	});
</script>

<button
	onclick={() => theme.toggle()}
	class="grid h-10 w-10 place-items-center overflow-hidden rounded-lg border-2 border-line text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
	aria-label={mounted ? (isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro') : 'Cambiar tema'}
	title={mounted ? (isDark ? 'Modo claro' : 'Modo oscuro') : 'Tema'}
	data-cursor="hover"
>
	{#if mounted}
		{#key isDark}
			<span aria-hidden="true" class="animate-icon-pop">
				{#if isDark}
					<Sun aria-hidden="true" size={17} weight="bold" />
				{:else}
					<Moon aria-hidden="true" size={17} weight="bold" />
				{/if}
			</span>
		{/key}
	{/if}
</button>
