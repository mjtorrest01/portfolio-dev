<script lang="ts">
	import { ArrowUpRight, WhatsappLogo } from 'phosphor-svelte';
	import { waLink } from '$lib/data-servicios';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import TiltCard from '$lib/components/ui/TiltCard.svelte';
	import Magnetic from '$lib/components/ui/Magnetic.svelte';
	import ProjectModal from '$lib/components/servicios/ProjectModal.svelte';
	import { reveal } from '$lib/animations';
	import { imagePath } from '$lib/assets';
	import type { Messages, Project, WorkMessages } from '$lib/types';

	interface Props {
		messages: Messages;
	}
	let { messages }: Props = $props();

	const work: WorkMessages = $derived(messages.work);

	let selected: Project | null = $state(null);

	function openProject(project: Project) {
		selected = project;
	}

	function closeModal() {
		selected = null;
	}

	function onCardKey(e: KeyboardEvent, project: Project) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openProject(project);
		}
	}
</script>

<section id="trabajos" class="relative bg-void/50 py-24 md:py-32">
	<div class="mx-auto max-w-7xl px-5 md:px-8">
		<SectionTitle index={work.index} label={work.label} title={work.title} subtitle={work.subtitle} />

		<div class={work.projects.length > 1 ? 'grid gap-6 md:grid-cols-2' : 'mx-auto grid max-w-2xl gap-6'}>
			{#each work.projects as project, i}
				<div use:reveal={{ delay: i * 0.12 }} class="group">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						role="button"
						tabindex={0}
						aria-label={`${work.modal.openDetails}: ${project.name}`}
						data-cursor="hover"
						class="h-full cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-accent"
						onclick={() => openProject(project)}
						onkeydown={(e) => onCardKey(e, project)}
					>
						<TiltCard max={7} className="group relative h-full rounded-2xl border-2 border-line bg-surface/40 p-6 transition-colors duration-300 hover:border-accent">
							<div class="mb-4 flex flex-wrap items-center justify-between gap-3">
								<span class="rounded-full border border-accent/60 bg-accent/10 px-3 py-1 font-mono text-xs text-accent-soft">
									{project.category}
								</span>
								<div class="flex items-center gap-2">
									<span class="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-fg-dim">
										{project.tech}
									</span>
									<span class="rounded-md border-2 border-accent bg-accent px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-void">
										{work.badge}
									</span>
								</div>
							</div>

							<div class="relative mb-6 h-44 overflow-hidden rounded-xl border border-line bg-void md:h-52">
								{#if project.image}
									{@const img = imagePath(
										project.image,
										'(min-width: 768px) 560px, calc(100vw - 64px)'
									)}
									<img
										src={img.src}
										srcset={img.srcset}
										sizes={img.sizes}
										width={img.width}
										height={img.height}
										alt={project.name}
										loading="lazy"
										decoding="async"
										class="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
									/>
								{/if}
								<div class={`absolute inset-0 z-[1] bg-gradient-to-br ${project.gradient} opacity-60`}></div>
								<div class="absolute inset-x-0 bottom-0 z-[1] h-2/3 bg-gradient-to-t from-bg via-bg/40 to-transparent"></div>
								<div class="absolute inset-x-0 top-0 z-10 flex items-center gap-1.5 border-b border-line/60 bg-bg/70 px-4 py-2.5 backdrop-blur">
									<span class="h-2 w-2 rounded-full bg-danger/70"></span>
									<span class="h-2 w-2 rounded-full bg-warn/70"></span>
									<span class="h-2 w-2 rounded-full bg-accent/70"></span>
									<span class="ml-3 flex-1 truncate rounded-md bg-surface px-3 py-0.5 font-mono text-[10px] text-faint">
										{project.url.replace(/^https?:\/\//, '')}
									</span>
								</div>
								<div class="absolute bottom-4 left-4 z-10">
									<p class="font-display text-2xl font-bold uppercase tracking-tight text-fg drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:text-3xl">
										{project.name}
									</p>
								</div>
								<div class="absolute inset-0 z-10 grid place-items-center">
									<span
										class="translate-y-2 rounded-full border border-accent bg-bg/80 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-accent-soft opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
									>
										{work.modal.openDetails} →
									</span>
								</div>
							</div>

							<div class="flex items-center justify-between">
								<div>
									<p class="font-mono text-[11px] uppercase tracking-wider text-faint">{project.plan}</p>
									<h3 class="font-display text-2xl font-bold">{project.name}</h3>
									<p class="mt-1 max-w-[26ch] truncate text-sm text-muted">{project.tagline}</p>
								</div>
								<a
									href={project.url}
									target="_blank"
									rel="noreferrer"
									aria-label={`${project.name} — ${project.url}`}
									onclick={(e) => e.stopPropagation()}
									onkeydown={(e) => e.stopPropagation()}
									class="grid h-11 w-11 shrink-0 place-items-center rounded-lg border-2 border-line text-muted transition-all duration-300 hover:border-accent hover:bg-accent hover:text-void hover:shadow-hard-accent"
									data-cursor="hover"
								>
									<ArrowUpRight aria-hidden="true" size={18} weight="bold" />
								</a>
							</div>
						</TiltCard>
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-12 flex justify-center">
			<Magnetic strength={0.35}>
				<a
					href={waLink(work.ctaMsg)}
					target="_blank"
					rel="noreferrer"
					class="group flex items-center gap-3 rounded-lg border-2 border-accent bg-accent px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-void transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.45)]"
				>
					{work.cta}
					<WhatsappLogo aria-hidden="true" size={17} weight="fill" class="transition-transform duration-300 group-hover:scale-110" />
				</a>
			</Magnetic>
		</div>
	</div>

	{#if selected}
		<ProjectModal project={selected} modal={work.modal} badge={work.badge} onClose={closeModal} />
	{/if}
</section>
