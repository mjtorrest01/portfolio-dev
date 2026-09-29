<script lang="ts">
	import { afterNavigate } from '$app/navigation';

	afterNavigate(() => {
		// El PageView inicial lo dispara el píxel al cargarse (CookieConsent).
		// En navegación interna disparamos PageView manual.
		(window as unknown as { fbq?: (...args: unknown[]) => void }).fbq?.('track', 'PageView');
	});
</script>
