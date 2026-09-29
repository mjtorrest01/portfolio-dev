<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		className?: string;
		max?: number;
	}

	let { children, className, max = 12 }: Props = $props();

	let rotateX = $state(0);
	let rotateY = $state(0);
	let el: HTMLDivElement | null = null;

	function onMouseMove(e: MouseEvent) {
		const rect = el?.getBoundingClientRect();
		if (!rect) return;
		const px = (e.clientX - rect.left) / rect.width - 0.5;
		const py = (e.clientY - rect.top) / rect.height - 0.5;
		rotateY = px * max * 2;
		rotateX = -py * max * 2;
	}

	function onMouseLeave() {
		rotateX = 0;
		rotateY = 0;
	}
</script>

<div style="perspective: 1200px" class="h-full">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		bind:this={el}
		onmousemove={onMouseMove}
		onmouseleave={onMouseLeave}
		style="transform: rotateX({rotateX.toFixed(2)}deg) rotateY({rotateY.toFixed(
			2
		)}deg); transform-style: preserve-3d; transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
		class={className}
		data-cursor="hover"
	>
		{@render children()}
	</div>
</div>
