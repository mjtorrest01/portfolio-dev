<script lang="ts">
	interface Props {
		text: string;
		baseDelay?: number;
		stagger?: number;
		className?: string;
	}

	let { text, baseDelay = 0.8, stagger = 0.05, className }: Props = $props();

	const words = $derived(text.split(' '));
	// Offsets precomputados en $derived: evita O(n²) slice/reduce en el template.
	const wordOffsets = $derived.by(() => {
		const offsets: number[] = [];
		let acc = 0;
		for (const w of words) {
			offsets.push(acc);
			acc += w.length + 1;
		}
		return offsets;
	});
</script>

<span class={className}>
	<span class="sr-only">{text}</span>
	<span aria-hidden="true">
		{#each words as word, wi (wi)}
			<span>
				{#if wi > 0}<span>{' '}</span>{/if}
				<span class="inline-block whitespace-nowrap">
					{#each word.split('') as ch, i (`${wi}-${i}`)}
						<span class="inline-block overflow-hidden align-bottom -my-[0.2em] pt-[0.05em] pb-[0.2em]">
							<span
								class="block animate-char-reveal"
								style="animation-delay: {(baseDelay + (wordOffsets[wi] + i) * stagger).toFixed(2)}s"
							>
								{ch}
							</span>
						</span>
					{/each}
				</span>
			</span>
		{/each}
	</span>
</span>
