<script lang="ts">
	import { slide } from 'svelte/transition';
	import { Plus } from 'phosphor-svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import type { FaqMessages, Messages } from '$lib/types';

	interface Props {
		messages: Messages;
	}
	let { messages }: Props = $props();

	const faq: FaqMessages = $derived(messages.faq);

	let openIndex = $state(0);
</script>

<section id="faq" class="relative py-24 md:py-32">
	<div class="mx-auto max-w-3xl px-5 md:px-8">
		<SectionTitle index={faq.index} label={faq.label} title={faq.title} subtitle={faq.subtitle} />

		<div class="divide-y divide-line/60 border-y border-line">
			{#each faq.items as item, i}
				{@const open = openIndex === i}
				<div>
					<button
						onclick={() => (openIndex = open ? -1 : i)}
						aria-expanded={open}
						aria-controls={`faq-panel-${i}`}
						class="flex w-full items-center justify-between gap-6 py-6 text-left"
						data-cursor="hover"
					>
						<span
							class={`font-display text-lg font-bold transition-colors duration-300 md:text-xl ${
								open ? 'glow-text text-accent' : 'text-fg'
							}`}
						>
							{item.q}
						</span>
						<span
							class={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border-2 transition-all duration-300 ${
								open ? 'rotate-45 border-accent bg-accent text-void' : 'border-line text-muted'
							}`}
						>
							<Plus aria-hidden="true" size={16} weight="bold" />
						</span>
					</button>
					{#if open}
						<div transition:slide={{ duration: 350 }} class="overflow-hidden">
							<p id={`faq-panel-${i}`} role="region" class="pb-6 text-sm leading-relaxed text-muted md:text-base">
								{item.a}
							</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
