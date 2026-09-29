<script lang="ts">
	import { reveal } from '$lib/animations';

	interface Props {
		index: string;
		label: string;
		title: string;
		subtitle?: string;
	}

	let { index, label, title, subtitle }: Props = $props();
</script>

<div class="mb-12 md:mb-16">
	<p
		use:reveal
		class="mb-3 flex items-center gap-3 font-mono text-sm text-accent"
	>
		<span class="text-outline-green font-display text-lg font-bold">{index}</span>
		<span class="h-[2px] w-8 bg-accent"></span>
		{label}
	</p>

	<div class="flex flex-wrap items-end justify-between gap-6">
		<h2
			use:reveal={{ delay: 0.05 }}
			class="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl"
		>
			{title}
		</h2>
		{#if subtitle}
			<p use:reveal={{ delay: 0.15 }} class="max-w-md text-muted">
				{subtitle}
			</p>
		{/if}
	</div>
</div>
