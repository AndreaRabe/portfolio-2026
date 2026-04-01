"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { fadeUpVariants, staggerContainerVariants, EASE_OUT_EXPO } from "@/hooks/useScrollAnimation";
import type { Variants } from "framer-motion";
import type { ProjectDetail } from "@/lib/projects";

export function ProjectDetailClient({ project }: { project: ProjectDetail }) {
  return (
    <motion.article
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={fadeUpVariants} className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="font-label text-xs px-3 py-1 rounded-full border border-[rgba(0,212,255,0.3)] text-[var(--color-cyan)]">
            {project.category}
          </span>
          <span className="font-mono text-xs text-[var(--color-muted)]">{project.period}</span>
        </div>

        <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-text)] mb-4 leading-tight">
          {project.title}
        </h1>
        <p className="font-mono text-[var(--color-muted)] text-base leading-relaxed max-w-2xl">
          {project.summary}
        </p>

        {/* Impact */}
        <div className="mt-6 inline-block">
          <div className="glass rounded-2xl px-6 py-4 border border-[rgba(0,212,255,0.2)]">
            <p className="font-mono text-xs text-[var(--color-muted)] mb-1">Impact principal</p>
            <p className="font-display font-bold text-3xl text-gradient-cyan">{project.impact}</p>
          </div>
        </div>
      </motion.div>

      {/* Tags */}
      <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-2 mb-12">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-label text-xs px-3 py-1.5 rounded-xl border border-[var(--color-border)] text-[var(--color-muted)] tracking-wide"
          >
            {tag}
          </span>
        ))}
      </motion.div>

      {/* Content sections */}
      <div className="flex flex-col gap-8">
        {/* Context */}
        <ContentBlock
          title="Contexte"
          icon="◎"
          variants={fadeUpVariants}
        >
          <p className="font-mono text-sm text-[var(--color-muted)] leading-relaxed">
            {project.context}
          </p>
        </ContentBlock>

        {/* Problem */}
        <ContentBlock
          title="Problème"
          icon="◈"
          variants={fadeUpVariants}
          accent="violet"
        >
          <p className="font-mono text-sm text-[var(--color-muted)] leading-relaxed">
            {project.problem}
          </p>
        </ContentBlock>

        {/* Solution */}
        <ContentBlock
          title="Solution"
          icon="⬡"
          variants={fadeUpVariants}
        >
          <p className="font-mono text-sm text-[var(--color-muted)] leading-relaxed">
            {project.solution}
          </p>
        </ContentBlock>

        {/* Results */}
        <ContentBlock
          title="Résultats"
          icon="▣"
          variants={fadeUpVariants}
          accent="cyan"
        >
          <ul className="flex flex-col gap-3" role="list">
            {project.results.map((r, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: EASE_OUT_EXPO }}
                className="flex gap-3 font-mono text-sm text-[var(--color-muted)]"
              >
                <span className="text-[var(--color-cyan)] flex-shrink-0 mt-0.5" aria-hidden="true">→</span>
                {r}
              </motion.li>
            ))}
          </ul>
        </ContentBlock>

        {/* Stack */}
        <motion.div variants={fadeUpVariants}>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="font-display font-bold text-xl text-[var(--color-text)] mb-6 flex items-center gap-3">
              <span className="text-[var(--color-cyan)]" aria-hidden="true">◇</span>
              Stack utilisée
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.stack.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[var(--color-border)]"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--color-cyan)] flex-shrink-0 mt-1.5" aria-hidden="true" />
                  <div>
                    <p className="font-display font-semibold text-sm text-[var(--color-text)]">{item.name}</p>
                    <p className="font-mono text-xs text-[var(--color-muted)] mt-0.5">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.article>
  );
}

type BlockProps = {
  title: string;
  icon: string;
  children: React.ReactNode;
  variants: Variants;
  accent?: "cyan" | "violet";
};

function ContentBlock({ title, icon, children, variants, accent = "cyan" }: BlockProps) {
  const iconColor = accent === "cyan" ? "text-[var(--color-cyan)]" : "text-[var(--color-violet)]";
  return (
    <motion.div variants={variants}>
      <GlassCard className="p-6 sm:p-8">
        <h2 className="font-display font-bold text-xl text-[var(--color-text)] mb-4 flex items-center gap-3">
          <span className={iconColor} aria-hidden="true">{icon}</span>
          {title}
        </h2>
        {children}
      </GlassCard>
    </motion.div>
  );
}
