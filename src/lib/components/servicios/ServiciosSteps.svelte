<script lang="ts">
	import { ChatTeardropDots, Palette, RocketLaunch, Wrench } from 'phosphor-svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import { reveal } from '$lib/animations';
	import type { Messages, StepsMessages } from '$lib/types';

	interface Props {
		messages: Messages;
	}
	let { messages }: Props = $props();

	const steps: StepsMessages = $derived(messages.steps);

	type StepIconName = 'chat' | 'palette' | 'rocket' | 'wrench';
	const ICONS: Record<StepIconName, typeof ChatTeardropDots> = {
		chat: ChatTeardropDots,
		palette: Palette,
		rocket: RocketLaunch,
		wrench: Wrench
	};
</script>

<section id="como" class="relative py-24 md:py-32">
	<div class="mx-auto max-w-7xl px-5 md:px-8">
		<SectionTitle index={steps.index} label={steps.label} title={steps.title} subtitle={steps.subtitle} />

		<div class="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
			{#each steps.items as step, i}
				{@const Icon = ICONS[(step.icon as StepIconName)] ?? ChatTeardropDots}
				<div use:reveal={{ delay: i * 0.12 }} class="group relative">
					<span class="text-outline font-display text-8xl font-bold leading-none" aria-hidden="true">
						{step.number}
					</span>
					<div class="mt-4 flex items-center gap-3">
						<div class="grid h-10 w-10 place-items-center rounded-lg border-2 border-line bg-void text-accent transition-all duration-300 group-hover:-rotate-6 group-hover:border-accent">
							<Icon aria-hidden="true" size={20} weight="duotone" />
						</div>
						<h3 class="font-display text-xl font-bold uppercase tracking-tight">
							{step.title}
						</h3>
					</div>
					<p class="mt-3 max-w-xs leading-relaxed text-muted">{step.text}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
