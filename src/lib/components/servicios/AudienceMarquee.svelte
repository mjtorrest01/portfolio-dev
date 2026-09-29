<script lang="ts">
	import type { MarqueeMessages, Messages } from '$lib/types';

	interface Props {
		messages: Messages;
	}
	let { messages }: Props = $props();

	const marquee: MarqueeMessages = $derived(messages.marquee);
</script>

<section class="marquee-hover overflow-hidden border-y-2 border-line bg-void/60 py-4" aria-hidden="true">
	<div class="animate-marquee flex w-max gap-8 [--marquee-duration:30s]">
		{#each [...marquee.a, ...marquee.a] as item, i}
			<span class="flex items-center gap-8 whitespace-nowrap">
				<span class="font-display text-2xl font-bold uppercase tracking-tight text-fg/90 md:text-3xl">
					{item}
				</span>
				<span class="h-2.5 w-2.5 rotate-45 bg-accent"></span>
			</span>
		{/each}
	</div>
	<div class="animate-marquee-reverse mt-3 flex w-max gap-8 text-outline-dim [--marquee-duration:38s]">
		{#each [...marquee.b, ...marquee.b] as item, i}
			<span class="flex items-center gap-8 whitespace-nowrap">
				<span class="font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">{item}</span>
				<span class="h-2.5 w-2.5 rotate-45 border border-accent"></span>
			</span>
		{/each}
	</div>
</section>
