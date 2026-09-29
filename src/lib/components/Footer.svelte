<script lang="ts">
	import { ArrowUp, Heart } from 'phosphor-svelte';
	import { profile } from '$lib/data';
	import type { FooterMessages, Messages } from '$lib/types';

	interface Props {
		messages: Messages;
	}
	let { messages }: Props = $props();

	const footer: FooterMessages = $derived(messages.footer);
	const heroLocation: string = $derived(messages.hero.location);
</script>

<footer class="relative overflow-hidden border-t-2 border-line bg-void/70 pt-12">
	<div class="mx-auto flex max-w-7xl flex-col gap-8 px-5 pb-10 md:flex-row md:items-end md:justify-between md:px-8">
		<div>
			<a href="#inicio" class="flex items-center gap-2">
				<span class="grid h-9 w-9 place-items-center rounded-md bg-accent font-mono text-sm font-bold text-void">
					{'</>'}
				</span>
				<span class="font-display text-lg font-bold">{profile.name}</span>
			</a>
			<p class="mt-3 font-mono text-xs text-faint">
				{footer.credit} · {heroLocation}
			</p>
		</div>

		<div class="flex items-center gap-6">
			<button
				onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				class="group flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
				data-cursor="hover"
			>
				{footer.backTop}
				<span
					class="grid h-9 w-9 place-items-center rounded-lg border-2 border-line transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-void"
				>
					<ArrowUp size={15} weight="bold" />
				</span>
			</button>
		</div>
	</div>

	<div class="border-t border-line/40">
		<p
			class="mx-auto flex max-w-7xl items-center justify-center gap-2 px-5 py-5 text-center font-mono text-xs text-faint md:justify-start md:px-8"
		>
			<Heart size={13} weight="fill" class="text-accent" /> {footer.made}
		</p>
	</div>

	<div class="flex w-max animate-marquee gap-10 py-4 [--marquee-duration:40s]" aria-hidden="true">
		{#each Array.from({ length: 12 }) as _, i}
			<span
				class="flex items-center gap-10 whitespace-nowrap font-display text-2xl font-bold uppercase tracking-tight text-outline"
			>
				<span>{profile.firstName}</span>
				<span class="h-2 w-2 rotate-45 bg-accent"></span>
				<span>build · ship · repeat</span>
				<span class="h-2 w-2 rotate-45 border border-accent"></span>
			</span>
		{/each}
	</div>
</footer>
