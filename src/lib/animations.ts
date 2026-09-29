// Shared animation helpers — Svelte-native replacements for lib/animations.ts (framer-motion).

export const EASE_OUT_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)';
export const EASE_IN_OUT_EXPO = 'cubic-bezier(0.76, 0, 0.24, 1)';

/** IntersectionObserver action: adds .svelte-reveal when visible (once by default). */
export function reveal(
	node: HTMLElement,
	opts: { delay?: number; once?: boolean } = {}
): { update?: (o: { delay?: number; once?: boolean }) => void; destroy?: () => void } {
	const { delay = 0, once = true } = opts;
	node.style.setProperty('--reveal-delay', `${delay}s`);
	node.style.opacity = '0';

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('svelte-reveal');
					node.style.opacity = '';
					if (once) io.disconnect();
				} else if (!once) {
					node.classList.remove('svelte-reveal');
					node.style.opacity = '0';
				}
			}
		},
		{ threshold: 0.1, rootMargin: '-10% 0px -10% 0px' }
	);
	io.observe(node);

	return {
		update(o = {}) {
			node.style.setProperty('--reveal-delay', `${o.delay ?? 0}s`);
		},
		destroy() {
			io.disconnect();
		}
	};
}
