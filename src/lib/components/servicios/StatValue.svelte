<script lang="ts">
	interface Props {
		value: number;
		prefix: string;
		suffix: string;
	}
	let { value, prefix, suffix }: Props = $props();

	let display = $state(0);
	let ref: HTMLSpanElement | null = null;

	$effect(() => {
		const el = ref;
		if (!el) return;
		// Respeta prefers-reduced-motion: muestra el valor final sin animar.
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			display = value;
			return;
		}
		let raf = 0;
		const io = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (!entry?.isIntersecting) return;
				io.disconnect();
				const start = performance.now();
				const dur = 1600;
				const step = (now: number) => {
					const p = Math.min(1, (now - start) / dur);
					const eased = 1 - Math.pow(1 - p, 4);
					display = Math.round(value * eased);
					if (p < 1) raf = requestAnimationFrame(step);
				};
				raf = requestAnimationFrame(step);
			},
			{ threshold: 0.4 }
		);
		io.observe(el);
		return () => {
			io.disconnect();
			cancelAnimationFrame(raf);
		};
	});
</script>

<span bind:this={ref}>{prefix}{display}{suffix}</span>
