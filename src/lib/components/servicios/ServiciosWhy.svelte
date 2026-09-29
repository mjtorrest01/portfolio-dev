<script lang="ts">
	import { Handshake, Lightbulb, ShieldCheck } from 'phosphor-svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import { reveal } from '$lib/animations';
	import type { Messages, WhyMessages } from '$lib/types';

	interface Props {
		messages: Messages;
	}
	let { messages }: Props = $props();

	const why: WhyMessages = $derived(messages.why);

	const ICONS = [Lightbulb, Handshake, ShieldCheck];
</script>

<section class="relative py-24 md:py-32">
	<div class="mx-auto max-w-7xl px-5 md:px-8">
		<SectionTitle index={why.index} label={why.label} title={why.title} subtitle={why.subtitle} />

		<div class="grid gap-6 md:grid-cols-3">
			{#each why.items as item, i}
				{@const Icon = ICONS[i % ICONS.length]}
				<div
					use:reveal={{ delay: i * 0.1 }}
					class={`group relative overflow-hidden rounded-2xl border-2 border-line bg-surface/40 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-accent ${
						i === 1 ? 'shadow-hard-accent' : ''
					}`}
				>
					<div
						aria-hidden="true"
						class="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/10 blur-2xl transition-opacity duration-500 group-hover:bg-accent/25"
					></div>
					<div class="mb-6 grid h-14 w-14 place-items-center rounded-xl border-2 border-line bg-void text-accent transition-transform duration-300 group-hover:-rotate-6 group-hover:border-accent">
						<Icon aria-hidden="true" size={28} weight="duotone" />
					</div>
					<h3 class="font-display text-2xl font-bold uppercase tracking-tight">
						{item.title}
					</h3>
					<p class="mt-3 leading-relaxed text-muted">{item.text}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
