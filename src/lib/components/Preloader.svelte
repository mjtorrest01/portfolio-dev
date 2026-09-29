<script lang="ts">
	import { onMount } from 'svelte';
	import type { Messages, PreloaderMessages } from '$lib/types';

	interface Props {
		messages: Messages;
		onDone: () => void;
	}
	let { messages, onDone }: Props = $props();

	const pre: PreloaderMessages = $derived(messages.preloader);
	const boot = $derived(pre.boot);

	let progress = $state(0);
	let lineCount = $state(0);
	let done = false;

	onMount(() => {
		const timer = setInterval(() => {
			progress = Math.min(100, progress + Math.random() * 13 + 4);
			if (progress >= 100 && !done) {
				done = true;
				clearInterval(timer);
				setTimeout(onDone, 350);
			}
		}, 85);
		const lines = setInterval(() => {
			lineCount += 1;
			if (lineCount >= boot.length) clearInterval(lines);
		}, 300);
		return () => {
			clearInterval(timer);
			clearInterval(lines);
		};
	});
</script>

<div
	class="fixed inset-0 z-[90] flex flex-col justify-between bg-void p-6 md:p-10"
	aria-label="Cargando"
>
	<div class="flex items-center justify-between font-mono text-xs text-muted">
		<span class="text-accent">~/portfolio</span>
		<span>PORTFOLIO.BOOT v3.2.5</span>
	</div>

	<div class="mx-auto w-full max-w-2xl">
		<div class="mb-6 rounded-xl border-2 border-line bg-surface/40 p-5 font-mono text-xs md:text-sm">
			{#each boot.slice(0, lineCount) as line, i}
				<p class={i === lineCount - 1 && lineCount <= boot.length ? 'text-fg-dim' : 'text-muted'}>
					<span class="mr-2 text-accent">$</span>{line}{#if lineCount <= boot.length && i === lineCount - 1}<span
							class="animate-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-accent"
						></span>{/if}
				</p>
			{/each}
		</div>
	</div>

	<div>
		<div class="mb-3 flex items-end justify-between font-mono text-sm">
			<span class="text-muted">{pre.progress}</span>
			<span class="glow-text font-bold text-accent">{Math.round(progress)}%</span>
		</div>
		<div class="h-2 w-full overflow-hidden rounded-full border border-line bg-surface">
			<div
				class="h-full bg-gradient-to-r from-accent-deep via-accent to-mint"
				style="width: {progress}%"
			></div>
		</div>
	</div>
</div>
