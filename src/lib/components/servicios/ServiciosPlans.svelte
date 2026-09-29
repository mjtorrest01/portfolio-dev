<script lang="ts">
	import { CheckCircle, WhatsappLogo } from 'phosphor-svelte';
	import { waLink } from '$lib/data-servicios';
	import { format } from '$lib/i18n';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import { reveal } from '$lib/animations';
	import type { Messages, PlansMessages } from '$lib/types';

	interface Props {
		messages: Messages;
	}
	let { messages }: Props = $props();

	const plans: PlansMessages = $derived(messages.plans);
</script>

<section id="planes" class="relative bg-void/50 py-24 md:py-32">
	<div class="mx-auto max-w-7xl px-5 md:px-8">
		<SectionTitle index={plans.index} label={plans.label} title={plans.title} subtitle={plans.subtitle} />

		<div class="grid gap-8 pt-6 md:grid-cols-3">
			{#each plans.items as plan}
				<div
					use:reveal
					class={`relative flex h-full flex-col rounded-2xl border-2 p-8 ${
						plan.featured
							? 'glow-box border-accent bg-accent/10 shadow-hard-accent lg:-translate-y-4'
							: 'border-line bg-surface/40 transition-transform duration-300 hover:-translate-y-2 hover:border-accent'
					}`}
				>
					{#if plan.featured}
						<span class="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-2 rounded-lg border-2 border-line bg-warn px-4 py-1.5 font-display text-sm font-bold uppercase tracking-wide text-void shadow-hard">
							{plans.featured}
						</span>
					{/if}

					<p class={`font-mono text-sm uppercase tracking-wider ${plan.featured ? 'text-accent' : 'text-muted'}`}>
						{plan.name}
					</p>
					<p class="mt-1 text-sm text-fg-dim">{plan.tagline}</p>

					<p class="mt-6 flex items-end gap-2">
						<span class={`font-display text-6xl font-bold ${plan.featured ? 'glow-text text-accent' : 'text-fg'}`}>
							${plan.price}
						</span>
						<span class="pb-2 font-mono text-sm text-faint">{plans.per}</span>
					</p>

					<ul class="mt-8 space-y-3">
						{#each plan.features as feature}
							<li class="flex items-start gap-3 text-sm leading-relaxed text-fg-dim">
								<CheckCircle size={18} weight="fill" class="mt-0.5 shrink-0 text-accent" />
								{feature}
							</li>
						{/each}
					</ul>

					<a
						href={waLink(format(plans.ctaMsg, { plan: plan.name, price: plan.price }))}
						target="_blank"
						rel="noreferrer"
						class={`mt-9 flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
							plan.featured
								? 'glow-box bg-accent text-void hover:bg-accent-soft'
								: 'border-2 border-accent text-accent hover:bg-accent hover:text-void'
						}`}
					>
						<WhatsappLogo size={16} weight="fill" />
						{plans.cta} {plan.name}
					</a>
				</div>
			{/each}
		</div>

		<p use:reveal={{ delay: 0.3 }} class="mx-auto mt-10 max-w-2xl text-center font-mono text-xs leading-relaxed text-faint">
			{plans.note}
		</p>
	</div>
</section>
