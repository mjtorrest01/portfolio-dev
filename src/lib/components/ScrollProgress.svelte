<script lang="ts">
	import { onMount } from 'svelte';

	let bar: HTMLDivElement | null = null;

	onMount(() => {
		const doc = document.documentElement;
		let max = doc.scrollHeight - window.innerHeight;
		let lastMeasure = performance.now();
		let raf = 0;

		const apply = () => {
			raf = 0;
			const now = performance.now();
			if (now - lastMeasure > 1000) {
				max = doc.scrollHeight - window.innerHeight;
				lastMeasure = now;
			}
			const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
			bar?.style.setProperty('transform', `scaleX(${progress})`);
		};

		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(apply);
		};
		const onResize = () => {
			max = doc.scrollHeight - window.innerHeight;
			lastMeasure = performance.now();
			onScroll();
		};

		apply();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onResize, { passive: true });
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
			if (raf) cancelAnimationFrame(raf);
		};
	});
</script>

<div
	bind:this={bar}
	class="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-accent-deep via-accent to-cyan"
	style="transform: scaleX(0)"
	aria-hidden="true"
></div>
