<script lang="ts">
	import { onMount } from 'svelte';
	import {
		ArrowDown,
		DribbbleLogo,
		FacebookLogo,
		GithubLogo,
		InstagramLogo,
		XLogo
	} from 'phosphor-svelte';
	import { profile } from '$lib/data';
	import Magnetic from '$lib/components/ui/Magnetic.svelte';
	import CharReveal from '$lib/components/ui/CharReveal.svelte';
	import StatValue from '$lib/components/servicios/StatValue.svelte';
	import type { HeroMessages, Messages, SocialIconName } from '$lib/types';

	interface Props {
		messages: Messages;
	}
	let { messages }: Props = $props();

	const hero: HeroMessages = $derived(messages.hero);

	const SOCIAL_ICONS: Record<SocialIconName, typeof GithubLogo> = {
		instagram: InstagramLogo,
		facebook: FacebookLogo,
		x: XLogo,
		github: GithubLogo,
		dribbble: DribbbleLogo
	};

	let scrollY = $state(0);
	let sectionEl: HTMLElement | null = null;

	onMount(() => {
		const onScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const auroraY = $derived(Math.min(180, scrollY * 0.3));
	const contentY = $derived(Math.min(120, scrollY * 0.2));
	const contentOpacity = $derived(Math.max(0, 1 - scrollY / 500));
</script>

<section
	bind:this={sectionEl}
	id="inicio"
	class="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24"
>
	<div style="transform: translateY({auroraY}px)" class="absolute inset-0 -z-10" aria-hidden="true">
		<div class="animate-aurora absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-accent/15 blur-[120px]"></div>
		<div class="animate-aurora-slow absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-cyan/12 blur-[120px]"></div>
		<div class="bg-grid bg-grid-fade absolute inset-0"></div>
	</div>

	<div
		style="transform: translateY({contentY}px); opacity: {contentOpacity}"
		class="relative mx-auto w-full max-w-7xl px-5 md:px-8"
	>
		<p
			class="mb-6 flex items-center gap-3 font-mono text-sm text-accent"
			style="animation: svelte-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s both"
		>
			<span class="relative flex h-2.5 w-2.5">
				<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60"></span>
				<span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent"></span>
			</span>
			<span>{hero.location}</span>
			<span class="hidden text-faint sm:inline">·</span>
			<span class="hidden sm:inline">{hero.badge}</span>
		</p>

		<h1 class="font-display text-[13.5vw] font-bold leading-[0.9] tracking-tight sm:text-[5.5rem] lg:text-[7rem]">
			<span class="block">
				<CharReveal text={hero.line1} baseDelay={0.35} stagger={0.03} />
			</span>
			<span class="block text-outline-green">
				<CharReveal text={hero.line2a} baseDelay={0.5} stagger={0.03} />
				{' '}
				<span class="glow-text text-accent">
					<CharReveal text={hero.line2b} baseDelay={0.65} stagger={0.04} />
				</span>
			</span>
		</h1>

		<p
			class="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
			style="animation: svelte-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s both"
		>
			{hero.sub} <span class="glow-text font-bold text-accent">{hero.subPrice}</span>
			{hero.subIn}
		</p>

		<div
			class="mt-9 flex flex-wrap items-center gap-4"
			style="animation: svelte-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.6s both"
		>
			<Magnetic strength={0.35}>
				<a
					href="#planes"
					class="group flex items-center gap-3 rounded-lg border-2 border-accent bg-accent px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-void transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.45)]"
				>
					{hero.cta1}
					<ArrowDown aria-hidden="true" size={16} weight="bold" class="transition-transform duration-300 group-hover:translate-y-1" />
				</a>
			</Magnetic>
			<Magnetic strength={0.35}>
				<a
					href="#trabajos"
					class="rounded-lg border-2 border-line bg-surface/40 px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-fg transition-colors duration-200 hover:border-accent hover:text-accent"
				>
					{hero.cta2}
				</a>
			</Magnetic>
			<div class="flex items-center gap-2 border-l-2 border-line pl-4">
				{#each profile.socials as s}
					{@const Icon = SOCIAL_ICONS[s.icon]}
					<a
						href={s.href}
						target="_blank"
						rel="noreferrer"
						aria-label={s.label}
						class="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition-all duration-300 hover:border-accent hover:bg-accent hover:text-void hover:shadow-hard-accent"
						data-cursor="hover"
					>
						{#if Icon}<Icon aria-hidden="true" size={17} weight="fill" />{/if}
					</a>
				{/each}
			</div>
		</div>

		<div
			class="mt-14 grid max-w-2xl gap-6 sm:grid-cols-3"
			style="animation: svelte-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.8s both"
		>
			{#each hero.stats as stat}
				<div class="rounded-xl border-2 border-line bg-surface/40 px-6 py-5 transition-colors duration-300 hover:border-accent">
					<p class="glow-text font-display text-4xl font-bold text-accent md:text-5xl">
						<StatValue value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
					</p>
					<p class="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">
						{stat.label}
					</p>
				</div>
			{/each}
		</div>
	</div>

	<div
		class="absolute inset-x-0 bottom-6 mx-auto flex max-w-7xl justify-center px-5 md:px-8"
		style="animation: svelte-fade-up 0.8s ease 2.4s both"
	>
		<a
			href="#como"
			class="flex flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-faint"
			data-cursor="hover"
		>
			{hero.scroll}
			<span class="animate-bounce-slow"><ArrowDown aria-hidden="true" size={18} class="text-accent" /></span>
		</a>
	</div>
</section>
