<script lang="ts">
	import {
		ArrowUpRight,
		DribbbleLogo,
		FacebookLogo,
		GithubLogo,
		InstagramLogo,
		WhatsappLogo,
		XLogo
	} from 'phosphor-svelte';
	import { profile } from '$lib/data';
	import { waLink } from '$lib/data-servicios';
	import Magnetic from '$lib/components/ui/Magnetic.svelte';
	import { reveal } from '$lib/animations';
	import type { CtaMessages, Messages, SocialIconName } from '$lib/types';

	interface Props {
		messages: Messages;
	}
	let { messages }: Props = $props();

	const cta: CtaMessages = $derived(messages.cta);

	const SOCIAL_ICONS: Record<SocialIconName, typeof GithubLogo> = {
		instagram: InstagramLogo,
		facebook: FacebookLogo,
		x: XLogo,
		github: GithubLogo,
		dribbble: DribbbleLogo
	};
</script>

<section id="contacto" class="relative overflow-hidden py-28 md:py-40">
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
		<div class="animate-aurora absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 blur-[130px]"></div>
		<div class="bg-grid bg-grid-fade absolute inset-0"></div>
	</div>

	<div class="mx-auto max-w-5xl px-5 text-center md:px-8">
		<h2
			use:reveal
			class="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
		>
			{cta.titleA} <span class="glow-text text-accent">{cta.titleB}</span>
		</h2>

		<p use:reveal={{ delay: 0.15 }} class="mx-auto mt-6 max-w-xl text-lg text-muted">
			{cta.sub}
		</p>

		<div use:reveal={{ delay: 0.3 }} class="mt-11 flex flex-col items-center justify-center gap-5 sm:flex-row">
			<Magnetic strength={0.3}>
				<a
					href={waLink(cta.whatsappMsg)}
					target="_blank"
					rel="noreferrer"
					class="glow-box group flex items-center gap-3 rounded-2xl border-2 border-accent bg-accent px-10 py-5 font-mono text-base font-bold uppercase tracking-wider text-void transition-shadow duration-300 hover:shadow-[0_0_45px_rgba(34,197,94,0.55)] md:text-lg"
				>
					<WhatsappLogo size={24} weight="fill" />
					{cta.whatsapp}
				</a>
			</Magnetic>
			<Magnetic strength={0.3}>
				<a
					href={`mailto:${profile.email}`}
					class="group flex items-center gap-3 rounded-2xl border-2 border-line bg-surface/40 px-10 py-5 font-mono text-base uppercase tracking-wider text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
				>
					{cta.mail}
					<ArrowUpRight size={20} weight="bold" class="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
				</a>
			</Magnetic>
		</div>

		<div use:reveal={{ delay: 0.45 }} class="mt-10 flex flex-col items-center gap-5">
			<div class="flex gap-3">
				{#each profile.socials as s, i}
					{@const Icon = SOCIAL_ICONS[s.icon]}
					<a
						href={s.href}
						target="_blank"
						rel="noreferrer"
						aria-label={s.label}
						style="animation: svelte-fade-up 0.5s cubic-bezier(0.16,1,0.3,1) {0.5 + i * 0.08}s both"
						class="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition-all duration-300 hover:border-accent hover:bg-accent hover:text-void hover:shadow-hard-accent"
						data-cursor="hover"
					>
						{#if Icon}<Icon size={18} weight="fill" />{/if}
					</a>
				{/each}
			</div>
			<p class="font-mono text-xs text-faint">
				{profile.name} · {cta.note}
			</p>
		</div>
	</div>
</section>
