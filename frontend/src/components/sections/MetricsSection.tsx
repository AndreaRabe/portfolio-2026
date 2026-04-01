"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { useScrollAnimation, fadeUpVariants, staggerContainerVariants } from "@/hooks/useScrollAnimation";

const METRICS = [
  {
    value: 500,
    suffix: "M+",
    label: "Lignes de données traitées",
    sublabel: "pipelines en production",
    color: "cyan" as const,
  },
  {
    value: 12,
    suffix: "+",
    label: "Projets livrés",
    sublabel: "startups & grandes entreprises",
    color: "violet" as const,
  },
  {
    value: 5,
    suffix: "ans",
    label: "Expérience",
    sublabel: "en data engineering & analytics",
    color: "cyan" as const,
  },
  {
    value: 30,
    suffix: "+",
    label: "Outils maîtrisés",
    sublabel: "de l'ingestion à la viz",
    color: "violet" as const,
  },
] as const;

const colorMap = {
  cyan:   "text-[var(--color-cyan)]",
  violet: "text-[var(--color-violet)]",
};

const glowMap = {
  cyan:   "border-[rgba(0,212,255,0.15)] hover:border-[rgba(0,212,255,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.08)]",
  violet: "border-[rgba(123,97,255,0.15)] hover:border-[rgba(123,97,255,0.3)] hover:shadow-[0_0_40px_rgba(123,97,255,0.08)]",
};

export function MetricsSection() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      id="metrics"
      className="relative py-24 sm:py-32 px-6"
      aria-label="Métriques d'impact"
    >
      {/* Subtle separator line */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-label text-[var(--color-cyan)] text-sm tracking-[0.25em] uppercase mb-3"
          >
            Impact
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-text)] leading-tight"
          >
            En <span className="text-gradient-cyan">chiffres</span>.
          </motion.h2>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          role="list"
          aria-label="Métriques clés"
        >
          {METRICS.map((m) => (
            <motion.div
              key={m.label}
              role="listitem"
              variants={fadeUpVariants}
              className={`
                glass rounded-2xl p-8 text-center border
                transition-all duration-300 cursor-default
                ${glowMap[m.color]}
              `}
            >
              <div className={`font-display font-bold text-5xl sm:text-6xl mb-3 ${colorMap[m.color]}`}>
                <AnimatedCounter value={m.value} suffix={m.suffix} duration={2} />
              </div>
              <p className="font-display font-semibold text-base text-[var(--color-text)] mb-1">
                {m.label}
              </p>
              <p className="font-mono text-xs text-[var(--color-muted)]">
                {m.sublabel}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
