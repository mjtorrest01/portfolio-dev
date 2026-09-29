<script lang="ts">
	import { Crosshair, RocketLaunch } from 'phosphor-svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import { reveal } from '$lib/animations';
	import type { AboutMessages, Messages } from '$lib/types';

	interface Props {
		messages: Messages;
	}
	let { messages }: Props = $props();

	const about: AboutMessages = $derived(messages.about);
</script>

<section id="sobre" class="relative overflow-hidden bg-void/50 py-24 md:py-32">
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
		<div class="animate-aurora-slow absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-accent/10 blur-[130px]"></div>
		<div class="bg-grid bg-grid-fade absolute inset-0"></div>
	</div>

	<div class="mx-auto max-w-7xl px-5 md:px-8">
		<SectionTitle index={about.index} label={about.label} title={about.title} />

		<div class="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
			<p
				use:reveal
				class="font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl"
			>
				{about.textA}
				{' '}<span class="glow-text text-accent">{about.highlight}</span>
			</p>

			<div
				use:reveal={{ delay: 0.15 }}
				class="relative rounded-2xl border-2 border-line bg-surface/40 p-8"
			>
				<div class="absolute -top-5 left-8 grid h-11 w-11 place-items-center rounded-xl border-2 border-accent bg-void text-accent shadow-hard-accent">
					<RocketLaunch size={22} weight="duotone" />
				</div>
				<p class="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
					&lt; {about.missionLabel} /&gt;
				</p>
				<p class="mt-4 leading-relaxed text-muted">{about.textB}</p>
				<div class="mt-6 flex items-center gap-3 border-t border-line/60 pt-5">
					<span class="grid h-9 w-9 place-items-center rounded-lg bg-accent font-mono text-sm font-bold text-void">
						{'</>'}
					</span>
					<span class="font-mono text-xs uppercase tracking-wider text-fg"> MJ Torres </span>
					<span class="text-accent" aria-hidden="true">
						<Crosshair size={16} weight="duotone" />
					</span>
				</div>
			</div>
		</div>
	</div>
</section>
