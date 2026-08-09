"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react";
import { waLink } from "@/lib/data-servicios";
import { SectionTitle } from "@/components/SectionTitle";
import { TiltCard } from "@/components/ui/TiltCard";
import { Magnetic } from "@/components/ui/Magnetic";
import { EASE_OUT_EXPO } from "@/lib/animations";

type WebProject = {
  category: string;
  name: string;
  url: string;
  tech: string;
  plan: string;
  gradient: string;
};

function ProjectCard({ project, index }: { project: WebProject; index: number }) {
  const t = useTranslations("work");
  return (
    <TiltCard
      max={7}
      className="group relative h-full rounded-2xl border-2 border-line bg-surface/40 p-6 transition-colors duration-300 hover:border-accent"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full border border-accent/60 bg-accent/10 px-3 py-1 font-mono text-xs text-accent-soft">
          {project.category}
        </span>
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-fg-dim">
            {project.tech}
          </span>
          <span className="rounded-md border-2 border-accent bg-accent px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-void">
            {t("badge")}
          </span>
        </div>
      </div>

      <div className="relative mb-6 h-44 overflow-hidden rounded-xl border border-line bg-void md:h-52">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`} />
        <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-line/60 bg-bg/70 px-4 py-2.5 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-danger/70" />
          <span className="h-2 w-2 rounded-full bg-warn/70" />
          <span className="h-2 w-2 rounded-full bg-accent/70" />
          <span className="ml-3 flex-1 truncate rounded-md bg-surface px-3 py-0.5 font-mono text-[10px] text-faint">
            {project.url.replace(/^https?:\/\//, "")}
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <p className="font-display text-2xl font-bold uppercase tracking-tight text-fg sm:text-3xl">
            {project.name}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-faint">{project.plan}</p>
          <h3 className="font-display text-2xl font-bold">{project.name}</h3>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.name} — ${project.url}`}
          className="grid h-11 w-11 place-items-center rounded-lg border-2 border-line text-muted transition-all duration-300 hover:border-accent hover:bg-accent hover:text-void hover:shadow-hard-accent"
          data-cursor="hover"
        >
          <ArrowUpRight size={18} weight="bold" />
        </a>
      </div>
    </TiltCard>
  );
}

export function ServiciosProjects() {
  const t = useTranslations("work");
  const projects = t.raw("projects") as unknown as WebProject[];

  return (
    <section id="trabajos" className="relative bg-void/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionTitle
          index={t("index")}
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: i * 0.12 }}
              className="group"
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Magnetic strength={0.35}>
            <a
              href={waLink(t("ctaMsg"))}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-lg border-2 border-accent bg-accent px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-void transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.45)]"
            >
              {t("cta")}
              <WhatsappLogo size={17} weight="fill" className="transition-transform duration-300 group-hover:scale-110" />
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}