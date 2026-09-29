// Theme store Svelte 5 (runes) — reemplazo de next-themes.
// Atributo data-theme en <html>: "light" | "dark". Por defecto sigue al sistema.

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'mj_theme';

function systemTheme(): Theme {
	if (typeof window === 'undefined') return 'dark';
	return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function storedTheme(): Theme | null {
	try {
		const v = localStorage.getItem(STORAGE_KEY);
		return v === 'light' || v === 'dark' ? v : null;
	} catch {
		return null;
	}
}

let current: Theme = $state('dark');
let resolved: Theme = $state('dark');
const listeners = new Set<() => void>();

function apply(theme: Theme) {
	current = theme;
	resolved = theme === 'light' || theme === 'dark' ? theme : systemTheme();
	if (typeof document !== 'undefined') {
		document.documentElement.setAttribute('data-theme', resolved);
	}
	listeners.forEach((fn) => fn());
}

export const theme = {
	get current(): Theme {
		return current;
	},
	get resolved(): Theme {
		return resolved;
	},
	subscribe(fn: () => void) {
		listeners.add(fn);
		fn();
		return () => {
			listeners.delete(fn);
		};
	},
	/** Inicializar en cliente: respeta localStorage o sistema (paridad next-themes system). */
	init() {
		const stored = storedTheme();
		apply(stored ?? systemTheme());
		if (typeof window !== 'undefined') {
			const mq = window.matchMedia('(prefers-color-scheme: light)');
			mq.addEventListener?.('change', () => {
				if (!storedTheme()) apply(systemTheme());
			});
		}
	},
	toggle() {
		const next: Theme = resolved === 'dark' ? 'light' : 'dark';
		try {
			localStorage.setItem(STORAGE_KEY, next);
		} catch {
			/* noop */
		}
		const doc = document as Document & {
			startViewTransition?: (cb: () => void) => void;
		};
		const canAnimate =
			typeof doc.startViewTransition === 'function' &&
			!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (canAnimate) {
			doc.startViewTransition(() => apply(next));
		} else {
			apply(next);
		}
	}
};
