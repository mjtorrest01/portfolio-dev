<script lang="ts">
	import { Check, MagnifyingGlass, Robot, WhatsappLogo } from 'phosphor-svelte';
		import SectionTitle from '$lib/components/SectionTitle.svelte';
	import Magnetic from '$lib/components/ui/Magnetic.svelte';
	import { reveal } from '$lib/animations';
	import type { Messages, SeoGeoMessages } from '$lib/types';

	interface Props {
		messages: Messages;
	}
	let { messages }: Props = $props();

	const seogeo: SeoGeoMessages = $derived(messages.seogeo);

	const ICONS = [MagnifyingGlass, Robot];
</script>

<section id="seo-geo" class="relative bg-void/50 py-24 md:py-32">
	<div class="mx-auto max-w-7xl px-5 md:px-8">
		<SectionTitle
			index={seogeo.index}
			label={seogeo.label}
			title={seogeo.title}
			subtitle={seogeo.subtitle}
		/>

		<p
			use:reveal
			class="mx-auto mb-10 max-w-3xl text-center font-display text-2xl font-bold leading-tight tracking-tight text-fg-dim sm:text-3xl"
		>
			{seogeo.pain}
		</p>

		<div class="grid gap-6 md:grid-cols-2">
			{#each seogeo.cards as card, i}
				{@const Icon = ICONS[i % ICONS.length]}
				<div
					use:reveal={{ delay: i * 0.12 }}
					class="group relative overflow-hidden rounded-2xl border-2 border-line bg-surface/40 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-accent"
				>
					<div
						aria-hidden="true"
						class="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/10 blur-2xl transition-opacity duration-500 group-hover:bg-accent/25"
					></div>
					<div class="mb-6 flex items-center justify-between gap-3">
						<div class="grid h-14 w-14 place-items-center rounded-xl border-2 border-line bg-void text-accent transition-transform duration-300 group-hover:-rotate-6 group-hover:border-accent">
							<Icon aria-hidden="true" size={28} weight="duotone" />
						</div>
						<span class="rounded-full border border-accent/60 bg-accent/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-accent-soft">
							{card.tag}
						</span>
					</div>
					<h3 class="font-display text-2xl font-bold uppercase tracking-tight">
						{card.title}
					</h3>
					<p class="mt-3 leading-relaxed text-muted">{card.text}</p>
					<ul class="mt-6 space-y-3">
						{#each card.items as item}
							<li class="flex items-start gap-2.5 text-[15px] leading-relaxed text-fg-dim">
								<span class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-accent/15 text-accent-soft">
									<Check aria-hidden="true" size={13} weight="bold" />
								</span>
								{item}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div
			use:reveal={{ delay: 0.1 }}
			class="mt-6 rounded-2xl border-2 border-accent/40 bg-accent/5 p-8 md:p-10"
		>
			<p class="mb-6 text-center font-mono text-[11px] uppercase tracking-widest text-faint">
				{seogeo.proof.label}
			</p>
			<div class="mx-auto grid max-w-3xl gap-6 sm:grid-cols-3">
				{#each seogeo.proof.stats as stat}
					<div class="text-center">
						<p class="font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
							{stat.value}
						</p>
						<p class="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">
							{stat.label}
						</p>
					</div>
				{/each}
			</div>
			<p class="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-muted">
				{seogeo.proof.note}
			</p>
		</div>

		<div class="mt-10 flex justify-center">
			<Magnetic strength={0.35}>
				<a
					href="#planes"
					class="group flex items-center gap-3 rounded-lg border-2 border-accent bg-accent px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-void transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.45)]"
				>
					{seogeo.cta}
					<WhatsappLogo aria-hidden="true" size={17} weight="fill" class="transition-transform duration-300 group-hover:scale-110" />
				</a>
			</Magnetic>
		</div>
	</div>
</section>
