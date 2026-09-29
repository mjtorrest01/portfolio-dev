<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		strength?: number;
		className?: string;
	}

	let { children, strength = 0.35, className }: Props = $props();

	let x = $state(0);
	let y = $state(0);
	let el: HTMLDivElement | null = null;

	function onMouseMove(e: MouseEvent) {
		const rect = el?.getBoundingClientRect();
		if (!rect) return;
		x = (e.clientX - (rect.left + rect.width / 2)) * strength;
		y = (e.clientY - (rect.top + rect.height / 2)) * strength;
	}

	function onMouseLeave() {
		x = 0;
		y = 0;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={el}
	onmousemove={onMouseMove}
	onmouseleave={onMouseLeave}
	style="transform: translate({x.toFixed(1)}px, {y.toFixed(1)}px); transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
	class={className}
	data-cursor="hover"
>
	{@render children()}
</div>
