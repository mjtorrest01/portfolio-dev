<script lang="ts">
	import { ArrowUpRight, Check, X } from 'phosphor-svelte';
	import type { Project, WorkModalMessages } from '$lib/types';

	interface Props {
		project: Project;
		modal: WorkModalMessages;
		badge: string;
		onClose: () => void;
	}

	let { project, modal, badge, onClose }: Props = $props();

	function psiDot(value: string): string {
		if (value.includes('/')) return 'bg-[#22c55e]';
		const n = parseInt(value, 10);
		if (Number.isNaN(n)) return 'bg-[#22c55e]';
		if (n >= 90) return 'bg-[#22c55e]';
		if (n >= 50) return 'bg-[#f59e0b]';
		return 'bg-[#ef4444]';
	}

	function psiPill(value: string): string {
		if (value.includes('/'))
			return 'border-accent/60 bg-accent/10 text-accent-soft';
		const n = parseInt(value, 10);
		if (Number.isNaN(n) || n >= 90)
			return 'border-accent/60 bg-accent/10 text-accent-soft';
		if (n >= 50)
			return 'border-[#f59e0b]/50 bg-[#f59e0b]/10 text-[#fbbf24]';
		return 'border-[#ef4444]/50 bg-[#ef4444]/10 text-[#fca5a5]';
	}

	let closeBtn: HTMLButtonElement | null = $state(null);
	let panel: HTMLElement | null = $state(null);

	$effect(() => {
		closeBtn?.focus();
		document.body.style.overflow = 'hidden';
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
			// Simple focus trap: keep Tab inside panel
			if (e.key === 'Tab' && panel) {
				const focusables = panel.querySelectorAll<HTMLElement>(
					'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
				);
				if (focusables.length === 0) return;
				const first = focusables[0];
				const last = focusables[focusables.length - 1];
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};
		window.addEventListener('keydown', onKey);
		return () => {
			document.body.style.overflow = '';
			window.removeEventListener('keydown', onKey);
		};
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	class="fixed inset-0 z-[100] flex items-stretch justify-center p-0 sm:items-center sm:p-6 md:p-10"
	role="dialog"
	aria-modal="true"
	aria-labelledby="project-modal-title"
>
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="modal-backdrop absolute inset-0 bg-void/85 backdrop-blur-md"
		onclick={onClose}
		role="presentation"
	></div>

	<!-- Panel -->
	<article
		bind:this={panel}
		class="modal-panel relative flex max-h-[100dvh] w-full max-w-5xl flex-col overflow-hidden bg-bg shadow-hard-accent sm:max-h-[92dvh] sm:rounded-2xl sm:border-2 sm:border-line"
	>
		<!-- Top bar -->
		<header
			class="sticky top-0 z-20 flex shrink-0 items-center gap-3 border-b border-line/70 bg-bg/85 px-4 py-3 backdrop-blur md:px-6"
		>
			<span class="h-2.5 w-2.5 rounded-full bg-danger/70"></span>
			<span class="h-2.5 w-2.5 rounded-full bg-warn/70"></span>
			<span class="h-2.5 w-2.5 rounded-full bg-accent/70"></span>
			<span
				class="ml-2 hidden flex-1 truncate rounded-md bg-surface px-3 py-1 font-mono text-[11px] text-faint sm:block"
			>
				{project.url.replace(/^https?:\/\//, '')} — {project.tagline}
			</span>
			<span
				class="ml-2 flex-1 truncate rounded-md bg-surface px-3 py-1 font-mono text-[11px] text-faint sm:hidden"
			>
				{project.url.replace(/^https?:\/\//, '')}
			</span>
			<button
				bind:this={closeBtn}
				type="button"
				onclick={onClose}
				aria-label={modal.close}
				data-cursor="hover"
				class="grid h-10 w-10 shrink-0 place-items-center rounded-lg border-2 border-line text-fg transition-all duration-300 hover:rotate-90 hover:border-accent hover:bg-accent hover:text-void"
			>
				<X size={18} weight="bold" />
			</button>
		</header>

		<!-- Scrollable content -->
		<div class="modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">
			<!-- Hero -->
			<div class="relative h-60 overflow-hidden border-b border-line bg-void sm:h-80">
				{#if project.image}
					<img
						src={project.image}
						alt={project.name}
						class="absolute inset-0 h-full w-full object-cover object-top"
					/>
				{/if}
				<div class={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-70`}></div>
				<div
					class="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-bg via-bg/60 to-transparent"
				></div>
				<div class="modal-item absolute inset-x-0 bottom-0 p-5 md:p-8" style="--d: 0.1s">
					<div class="mb-3 flex flex-wrap items-center gap-2">
						<span
							class="rounded-full border border-accent/60 bg-bg/70 px-3 py-1 font-mono text-xs text-accent-soft backdrop-blur"
						>
							{project.category}
						</span>
						<span
							class="rounded-md border border-line bg-bg/70 px-2.5 py-1 font-mono text-[11px] text-fg-dim backdrop-blur"
						>
							{project.tech}
						</span>
						<span
							class="rounded-md border-2 border-accent bg-accent px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-void"
						>
							{badge}
						</span>
					</div>
					<p class="font-mono text-[11px] uppercase tracking-widest text-accent-soft">
						{project.plan} · {project.tagline}
					</p>
					<h2
						id="project-modal-title"
						class="font-display text-4xl font-bold uppercase leading-none tracking-tight text-fg drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)] sm:text-5xl md:text-6xl"
					>
						{project.name}
					</h2>
				</div>
			</div>

			<!-- Body -->
			<div class="grid gap-8 p-5 md:grid-cols-[1.25fr_0.75fr] md:gap-10 md:p-8">
				<!-- Left: overview + pages -->
				<div class="min-w-0">
					<p
						class="modal-item mb-2 font-mono text-[11px] uppercase tracking-widest text-faint"
						style="--d: 0.18s"
					>
						{modal.overview}
					</p>
					<p class="modal-item text-lg leading-relaxed text-fg-dim" style="--d: 0.22s">
						{project.description}
					</p>

					<p
						class="modal-item mb-4 mt-8 font-mono text-[11px] uppercase tracking-widest text-faint"
						style="--d: 0.3s"
					>
						{modal.pages} — {project.pages.length}
					</p>
					<ol class="space-y-3">
						{#each project.pages as page, i}
							<li
								class="modal-item group rounded-xl border border-line bg-surface/40 p-4 transition-colors duration-300 hover:border-accent"
								style="--d: {0.32 + i * 0.06}s"
							>
								<p class="mb-1 flex items-center gap-2 font-mono text-xs text-accent-soft">
									<span
										class="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-accent/15 font-bold"
									>
										{i + 1}
									</span>
									<span class="truncate">{page.title}</span>
								</p>
								<p class="text-sm leading-relaxed text-muted">{page.text}</p>
							</li>
						{/each}
					</ol>
				</div>

				<!-- Right: stack + languages + CTA -->
				<aside class="min-w-0 space-y-7">
					<div class="modal-item" style="--d: 0.26s">
						<p class="mb-3 font-mono text-[11px] uppercase tracking-widest text-faint">
							{modal.stack}
						</p>
						<ul class="flex flex-wrap gap-2">
							{#each project.stack as item}
								<li
									class="rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-[11px] leading-snug text-fg-dim"
								>
									{item}
								</li>
							{/each}
						</ul>
					</div>

					{#if project.languages?.length}
						<div class="modal-item" style="--d: 0.34s">
							<p class="mb-3 font-mono text-[11px] uppercase tracking-widest text-faint">
								{modal.languages}
							</p>
							<ul class="flex flex-wrap gap-2">
								{#each project.languages as lang}
									<li
										class="rounded-full border border-accent/50 bg-accent/10 px-3 py-1 font-mono text-[11px] text-accent-soft"
									>
										{lang}
									</li>
								{/each}
							</ul>
						</div>
					{/if}

					<div
						class="modal-item rounded-xl border-2 border-accent/40 bg-accent/5 p-5"
						style="--d: 0.4s"
					>
						<p class="mb-1 font-mono text-[11px] uppercase tracking-widest text-faint">
							{project.plan}
						</p>
						<p class="font-display text-2xl font-bold">{project.name}</p>
						<p class="mb-4 mt-1 text-sm text-muted">{project.tagline}</p>
						<a
							href={project.url}
							target="_blank"
							rel="noreferrer"
							data-cursor="hover"
							class="group flex items-center justify-center gap-2 rounded-lg border-2 border-accent bg-accent px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-wider text-void transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.45)]"
						>
							{modal.visit}
							<ArrowUpRight
								size={16}
								weight="bold"
								class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
							/>
						</a>
						<p class="mt-3 text-center font-mono text-[10px] uppercase tracking-wider text-faint">
							{modal.hint}
						</p>
					</div>
				</aside>
			</div>

			{#if project.measurement}
				{@const m = project.measurement}
				<section class="border-t border-line/70 px-5 py-8 md:p-8" aria-label={m.title}>
					<p
						class="modal-item mb-2 font-mono text-[11px] uppercase tracking-widest text-faint"
						style="--d: 0.78s"
					>
						{m.label}
					</p>
					<div
						class="modal-item grid overflow-hidden rounded-2xl border border-line bg-surface/40 md:grid-cols-[0.95fr_1.05fr]"
						style="--d: 0.82s"
					>
						<figure class="relative min-h-[260px] bg-void md:min-h-full">
							<img
								src={m.image}
								alt={m.imageAlt}
								loading="lazy"
								decoding="async"
								class="absolute inset-0 h-full w-full object-cover object-top"
							/>
							<div
								class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg via-bg/50 to-transparent"
							></div>
							<figcaption
								class="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4"
							>
								<span
									class="rounded-md border-2 border-accent bg-accent px-2.5 py-1 font-mono text-xs font-bold text-void"
								>
									{m.score}
								</span>
								<a
									href={m.sourceUrl}
									target="_blank"
									rel="noreferrer"
									data-cursor="hover"
									class="group flex items-center gap-1 rounded-md border border-line bg-bg/80 px-2.5 py-1 font-mono text-[11px] text-fg-dim backdrop-blur transition-colors duration-300 hover:border-accent hover:text-accent-soft"
								>
									{m.sourceLabel}
									<ArrowUpRight
										size={12}
										weight="bold"
										class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
									/>
								</a>
							</figcaption>
						</figure>
						<div class="min-w-0 p-5 md:p-6">
							<div class="mb-3 flex flex-wrap items-center gap-2">
								<span class="font-display text-4xl font-bold tracking-tight text-fg">
									{m.score}
								</span>
								<span
									class="rounded-full border border-accent/60 bg-accent/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-accent-soft"
								>
									{m.level}
								</span>
							</div>
							<h3 class="font-display text-xl font-bold leading-tight text-fg">
								{m.title}
							</h3>
							<p class="mt-3 text-sm leading-relaxed text-muted">{m.intro}</p>
							<p class="mb-1 mt-5 font-mono text-[11px] font-bold uppercase tracking-widest text-accent-soft">
								{m.whyTitle}
							</p>
							<p class="text-sm leading-relaxed text-muted">{m.whyText}</p>
							<p class="mb-2 mt-5 font-mono text-[11px] font-bold uppercase tracking-widest text-accent-soft">
								{m.readyTitle}
							</p>
							<ul class="space-y-2">
								{#each m.readyItems as item}
									<li class="flex items-start gap-2 text-sm leading-relaxed text-fg-dim">
										<span
											class="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-accent/15 text-accent-soft"
										>
											<Check size={13} weight="bold" />
										</span>
										{item}
									</li>
								{/each}
							</ul>
						<p
							class="mt-5 rounded-xl border border-accent/30 bg-accent/5 p-4 text-sm leading-relaxed text-fg-dim"
						>
							{m.outro}
						</p>
					</div>
				</div>
					{#if m.pagespeed}
						{@const p = m.pagespeed}
						<div class="modal-item mt-6" style="--d: 0.86s">
							<p
								class="mb-2 font-mono text-[11px] uppercase tracking-widest text-faint"
							>
								{p.label}
							</p>
							<div class="rounded-2xl border border-line bg-bg/60 p-5 md:p-6">
								<h4 class="font-display text-lg font-bold leading-tight text-fg">
									{p.title}
								</h4>
								<p class="mt-1 truncate font-mono text-[11px] text-faint">
									{p.url}
								</p>
								<p class="mt-3 text-sm leading-relaxed text-muted">{p.note}</p>
								<div class="mt-4 grid gap-4 md:grid-cols-2">
									{#each [p.desktop, p.mobile] as device}
										<article
											class="group overflow-hidden rounded-xl border border-line bg-surface/40 transition-colors duration-300 hover:border-accent"
										>
											<p
												class="flex items-center gap-2 border-b border-line/60 px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest text-fg-dim"
											>
												<span class={`h-2 w-2 rounded-full ${psiDot(device.scores[0]?.value ?? '')}`}></span>
												{device.title}
											</p>
											<a
												href={device.image}
												target="_blank"
												rel="noreferrer"
												data-cursor="hover"
												class="block overflow-hidden border-b border-line/60"
												aria-label={`${device.title} — ${p.title}`}
											>
												<img
													src={device.image}
													alt={device.imageAlt}
													loading="lazy"
													decoding="async"
													class="h-56 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
												/>
											</a>
											<ul class="space-y-1.5 p-4">
												{#each device.scores as s}
													<li class="flex items-center justify-between gap-2 text-sm">
														<span class="flex items-center gap-2 text-muted">
															<span class={`h-1.5 w-1.5 rounded-full ${psiDot(s.value)}`}></span>
															{s.label}
														</span>
														<span
															class={`rounded-md border px-2 py-0.5 font-mono text-[11px] font-bold ${psiPill(s.value)}`}
														>
															{s.value}
														</span>
													</li>
												{/each}
											</ul>
										</article>
									{/each}
								</div>
							</div>
						</div>
					{/if}
				</section>
			{/if}
		</div>
	</article>
</div>

<style>
	.modal-backdrop {
		animation: modal-backdrop-in 0.35s ease both;
	}
	.modal-panel {
		animation: modal-panel-in 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
		transform-origin: center center;
	}
	.modal-item {
		animation: modal-item-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: var(--d, 0s);
	}
	.modal-scroll {
		scrollbar-width: thin;
	}

	@keyframes modal-backdrop-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes modal-panel-in {
		from {
			opacity: 0;
			transform: translateY(48px) scale(0.96);
			filter: blur(6px);
		}
		60% {
			opacity: 1;
			filter: blur(0);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
			filter: blur(0);
		}
	}
	@keyframes modal-item-in {
		from {
			opacity: 0;
			transform: translateY(18px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.modal-backdrop,
		.modal-panel,
		.modal-item {
			animation: none !important;
		}
	}
</style>
