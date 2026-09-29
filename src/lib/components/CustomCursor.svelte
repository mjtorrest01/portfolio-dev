<script lang="ts">
	import { onMount } from 'svelte';

	let enabled = $state(false);
	let hovering = $state(false);
	let pressed = $state(false);

	// Posición en variables planas (no $state): el loop rAF muta el DOM
	// directamente y evita re-renders de Svelte a 60fps (over-reactivity).
	let x = -200;
	let y = -200;
	let dotX = -200;
	let dotY = -200;
	let ringX = -200;
	let ringY = -200;
	let raf = 0;
	let idle = true;
	let dotEl: HTMLDivElement | null = $state(null);
	let ringEl: HTMLDivElement | null = $state(null);

	function tick() {
		dotX += (x - dotX) * 0.5;
		dotY += (y - dotY) * 0.5;
		ringX += (x - ringX) * 0.25;
		ringY += (y - ringY) * 0.25;
		dotEl?.style.setProperty('transform', `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`);
		ringEl?.style.setProperty(
			'transform',
			`translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${pressed ? 0.6 : hovering ? 1.9 : 1})`
		);
		const settled =
			Math.abs(x - dotX) < 0.05 &&
			Math.abs(y - dotY) < 0.05 &&
			Math.abs(x - ringX) < 0.05 &&
			Math.abs(y - ringY) < 0.05;
		if (settled) {
			raf = 0;
			idle = true;
			return;
		}
		raf = requestAnimationFrame(tick);
	}

	function wake() {
		if (idle) {
			idle = false;
			raf = requestAnimationFrame(tick);
		}
	}

	onMount(() => {
		if (!window.matchMedia('(pointer: fine)').matches) return;
		enabled = true;
		document.body.classList.add('cursor-live');

		const onMove = (e: PointerEvent) => {
			x = e.clientX;
			y = e.clientY;
			wake();
		};
		const onOver = (e: PointerEvent) => {
			const target = e.target as HTMLElement | null;
			hovering = Boolean(target?.closest("[data-cursor='hover']"));
			wake();
		};
		const onDown = () => {
			pressed = true;
			wake();
		};
		const onUp = () => {
			pressed = false;
			wake();
		};

		window.addEventListener('pointermove', onMove, { passive: true });
		window.addEventListener('pointerover', onOver, { passive: true });
		window.addEventListener('pointerdown', onDown);
		window.addEventListener('pointerup', onUp);

		return () => {
			window.removeEventListener('pointermove', onMove);
			window.removeEventListener('pointerover', onOver);
			window.removeEventListener('pointerdown', onDown);
			window.removeEventListener('pointerup', onUp);
			if (raf) cancelAnimationFrame(raf);
			document.body.classList.remove('cursor-live');
		};
	});
</script>

{#if enabled}
	<div class="pointer-events-none fixed inset-0 z-[200]" aria-hidden="true">
		<div
			bind:this={dotEl}
			class="absolute h-1.5 w-1.5 rounded-full bg-accent"
			style="transform: translate(-200px, -200px) translate(-50%, -50%)"
		></div>
		<div
			bind:this={ringEl}
			class="absolute h-9 w-9 rounded-full border border-accent/70"
			style="transform: translate(-200px, -200px) translate(-50%, -50%); background-color: {hovering
				? 'rgba(34,197,94,0.12)'
				: 'rgba(34,197,94,0)'}; transition: background-color 0.2s"
		></div>
	</div>
{/if}
