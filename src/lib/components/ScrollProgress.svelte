<script lang="ts">
	import { onMount } from 'svelte';

	let scaleX = $state(0);

	onMount(() => {
		const onScroll = () => {
			const doc = document.documentElement;
			const max = doc.scrollHeight - window.innerHeight;
			scaleX = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<div
	class="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-accent-deep via-accent to-cyan"
	style="transform: scaleX({scaleX})"
	aria-hidden="true"
></div>
