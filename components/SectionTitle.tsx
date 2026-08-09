import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animations";

type SectionTitleProps = {
  index: string;
  label: string;
  title: string;
  subtitle?: string;
};

export function SectionTitle({ index, label, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-12 md:mb-16">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="mb-3 flex items-center gap-3 font-mono text-sm text-accent"
      >
        <span className="text-outline-green font-display text-lg font-bold">{index}</span>
        <span className="h-[2px] w-8 bg-accent" />
        {label}
      </motion.p>

      <div className="flex flex-wrap items-end justify-between gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.05 }}
          className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.15 }}
            className="max-w-md text-muted"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}