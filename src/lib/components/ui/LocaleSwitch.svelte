<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import type { Locale, Messages } from '$lib/types';

	interface Props {
		locale: Locale;
		messages: Messages;
	}
	let { locale, messages }: Props = $props();

	const nav = $derived(messages.nav);

	function switchTo(next: 'es' | 'en') {
		if (next === locale) return;
		const hash = typeof window !== 'undefined' ? window.location.hash : '';
		goto(`/${next}${hash}`, { invalidateAll: true });
	}
</script>

<div
	class="flex items-center overflow-hidden rounded-lg border-2 border-line font-mono text-xs font-bold uppercase tracking-wider"
	role="group"
	aria-label={nav.localeLabel}
	data-cursor="hover"
>
	{#each ['es', 'en'] as lang}
		<button
			onclick={() => switchTo(lang as 'es' | 'en')}
			aria-pressed={locale === lang}
			class={`px-3 py-2 transition-colors duration-200 ${
				locale === lang ? 'bg-accent text-void' : 'text-muted hover:text-fg'
			}`}
		>
			{lang}
		</button>
	{/each}
</div>
