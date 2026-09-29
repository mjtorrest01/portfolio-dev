<script lang="ts">
	import { onMount } from 'svelte';
	import { List, WhatsappLogo, X } from 'phosphor-svelte';
	import { profile } from '$lib/data';
	import { waLink } from '$lib/data-servicios';
	import Magnetic from '$lib/components/ui/Magnetic.svelte';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
	import LocaleSwitch from '$lib/components/ui/LocaleSwitch.svelte';
	import type { Locale, Messages, NavMessages } from '$lib/types';

	interface Props {
		show: boolean;
		locale: Locale;
		messages: Messages;
	}
	let { show, locale, messages }: Props = $props();

	const nav: NavMessages = $derived(messages.nav);

	let scrolled = $state(false);
	let open = $state(false);

	onMount(() => {
		const onScroll = () => (scrolled = window.scrollY > 24);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = open ? 'hidden' : '';
		}
	});

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape') open = false;
	}
</script>

<svelte:window onkeydown={onKey} />

<header
	class={`fixed inset-x-0 top-0 z-[70] transition-all duration-700 ${
		scrolled ? 'border-b border-line/60 bg-void/70 backdrop-blur-xl' : 'bg-transparent'
	}`}
	style="transform: translateY({show ? 0 : -90}px); opacity: {show ? 1 : 0}"
>
	<nav aria-label={nav.aria} class="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
		<a href="#inicio" class="group flex items-center gap-2" data-cursor="hover">
			<span
				class="grid h-8 w-8 place-items-center rounded-md bg-accent font-mono text-sm font-bold text-void transition-transform duration-300 group-hover:rotate-[360deg]"
			>
				{'</>'}
			</span>
			<span class="hidden sm:block">
				<span class="block text-sm font-bold leading-tight">{profile.firstName}</span>
				<span class="block font-mono text-[11px] uppercase text-faint">{profile.handle}</span>
			</span>
		</a>

		<ul class="hidden items-center gap-7 lg:flex">
			{#each nav.links as link}
				<li>
					<a href={link.href} class="group relative">
						<span
							class="relative py-1 font-mono text-sm uppercase tracking-wider text-muted transition-colors hover:text-fg group-hover:text-fg"
							>{link.label}</span
						>
						<span
							class="absolute -bottom-1 left-0 h-[2px] w-full origin-right scale-x-0 bg-accent transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"
						></span>
					</a>
				</li>
			{/each}
		</ul>

		<div class="flex items-center gap-3">
			<LocaleSwitch {locale} {messages} />
			<ThemeToggle />
			<Magnetic strength={0.4} className="hidden md:block">
				<a
					href={waLink(nav.whatsappMsg)}
					target="_blank"
					rel="noreferrer"
					class="glow-box flex items-center gap-2 rounded-lg border-2 border-accent bg-accent px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-void transition-colors duration-200 hover:bg-accent-soft"
				>
					<WhatsappLogo aria-hidden="true" size={15} weight="fill" /> {nav.ctaWhatsapp}
				</a>
			</Magnetic>

			<button
				onclick={() => (open = !open)}
				class="grid h-10 w-10 place-items-center rounded-lg border-2 border-line text-fg lg:hidden"
				aria-label={open ? nav.menuClose : nav.menuOpen}
				aria-expanded={open}
				aria-controls="menu-movil"
				data-cursor="hover"
			>
				{#if open}
					<X size={18} weight="bold" aria-hidden="true" />
				{:else}
					<List size={18} weight="bold" aria-hidden="true" />
				{/if}
			</button>
		</div>
	</nav>
</header>

{#if open}
	<div
		class="fixed inset-0 z-[65] flex flex-col justify-center bg-void/95 backdrop-blur-xl lg:hidden"
		id="menu-movil"
		style="transition: clip-path 0.55s cubic-bezier(0.76, 0, 0.24, 1)"
	>
		<ul class="space-y-1 px-8">
			{#each nav.links as link, i}
				<li style="animation: svelte-fade-up 0.5s cubic-bezier(0.76, 0, 0.24, 1) both; animation-delay: {0.15 +
					i * 0.06}s">
					<a
						href={link.href}
						onclick={() => (open = false)}
						class="group flex items-baseline gap-4 border-b border-line/50 py-4 font-display text-4xl font-bold text-fg"
					>
						<span class="font-mono text-sm text-accent">0{i + 1}</span>
						<span class="transition-transform duration-300 group-hover:translate-x-2">
							{link.label}
						</span>
					</a>
				</li>
			{/each}
		</ul>
		<p class="mt-10 px-8 font-mono text-sm text-muted">
			<span class="text-accent">$</span>
			{profile.email}
		</p>
	</div>
{/if}
