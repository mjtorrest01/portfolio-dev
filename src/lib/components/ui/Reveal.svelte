<script lang="ts">
	import { reveal } from '$lib/animations';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		className?: string;
		delay?: number;
		once?: boolean;
	}

	let { children, className, delay = 0, once = true }: Props = $props();
</script>

<div use:reveal={{ delay, once }} class={className}>
	{@render children()}
</div>
