"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import {
  fadeUpVariants,
  staggerContainerVariants,
  useScrollAnimation,
} from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

const PILLARS = [
  {
    icon: "⬡",
    title: "Analyse & Modélisation",
    description:
      "Du nettoyage des données à la modélisation ML, je maîtrise toute la chaîne — analyse exploratoire, feature engineering et interprétation des résultats.",
  },
  {
    icon: "◈",
    title: "Analytics & Reporting",
    description:
      "Power BI, dashboards interactifs, réconciliation de données — je transforme des données brutes en indicateurs actionnables.",
  },
  {
    icon: "◎",
    title: "Business-Driven",
    description:
      "La data n'a de valeur que si elle informe une décision. Je traduis les besoins métier en solutions techniques concrètes.",
  },
] as const;

export function AboutSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 px-6"
      aria-label="À propos"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-label text-[var(--color-cyan)] text-sm tracking-[0.25em] uppercase mb-3"
        >
          About
        </motion.p>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[260px_1fr_1fr] gap-8 lg:gap-12 items-start"
        >
          {/* Col 1 — Photo */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col items-center md:items-start gap-5 col-span-1"
          >
            {/* Photo with gradient glow border */}
            <motion.div
              whileHover={{ scale: 1.03, rotate: -1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-full md:h-auto md:aspect-square"
            >
              {/* Gradient border + glow */}
              <div
                className="w-full h-full rounded-full overflow-hidden border-2 border-transparent"
                style={{
                  background:
                    "linear-gradient(#050508,#050508) padding-box, linear-gradient(135deg,rgba(0,212,255,0.7),rgba(123,97,255,0.7)) border-box",
                  boxShadow:
                    "0 0 40px rgba(0,212,255,0.18), 0 0 80px rgba(123,97,255,0.08)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/andrea.jpg`}
                  alt="Nantenaina Andrea RABEMANANTSOA"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Available badge */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 glass rounded-full px-3 py-1 border border-[rgba(34,197,94,0.3)]">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
                </span>
                <span className="font-mono text-[10px] text-[#22c55e] font-medium">
                  Open to work
                </span>
              </div>
            </motion.div>

            {/* Name & title under photo */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.1 }}
              className="text-center lg:text-left"
            >
              <p className="font-display font-bold text-base text-[var(--color-text)]">
                Nantenaina Andrea
              </p>
              <p className="font-mono text-xs text-[var(--color-cyan)] mt-0.5">
                Data Analyst & Scientist
              </p>
            </motion.div>
          </motion.div>

          {/* Col 2 — Bio */}
          <div className="md:col-span-1 lg:col-span-1">
            <motion.h2
              variants={fadeUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-text)] mb-6 leading-tight"
            >
              Transformer les données en{" "}
              <span className="text-gradient-cyan">levier de décision</span>.
            </motion.h2>

            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.1 }}
              className="space-y-4 font-mono text-[var(--color-muted)] text-sm leading-relaxed"
            >
              <p>
                Diplômé de l&apos;{" "}
                <span className="text-[var(--color-text)]">
                  École Nationale d&apos;Informatique
                </span>{" "}
                (Master Génie Logiciel &amp; Base de Données), je suis Data
                Analyst &amp; Scientist spécialisé dans l&apos;analyse de
                données, le machine learning et la visualisation
                d&apos;indicateurs métier.
              </p>
              <p>
                Actuellement chez{" "}
                <span className="text-[var(--color-text)]">MCB Madagascar</span>
                , j&apos;automatise des processus, conçois des{" "}
                <span className="text-[var(--color-text)]">
                  dashboards Power BI
                </span>{" "}
                et analyse des données pour alimenter les décisions
                stratégiques.
              </p>
              <p>
                Python, PostgreSQL, Power BI, Scikit-learn — j&apos;aime les
                solutions{" "}
                <span className="text-[var(--color-text)]">
                  fiables et actionnables
                </span>
                , des données brutes jusqu&apos;aux insights métier.
              </p>
            </motion.div>

            {/* Location / availability */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
                <span
                  className="text-[var(--color-cyan)] text-lg"
                  aria-hidden="true"
                >
                  ◎
                </span>
                <span className="font-mono text-sm text-[var(--color-muted)]">
                  Antananarivo, Madagascar — Remote OK
                </span>
              </div>
              <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
                </span>
                <span className="font-mono text-sm text-[var(--color-muted)]">
                  Disponible — Freelance & CDI
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right — pillars */}
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-4 md:col-span-2 lg:col-span-1"
          >
            {PILLARS.map((pillar) => (
              <GlassCard
                key={pillar.title}
                variants={fadeUpVariants}
                hoverable
                className="p-6"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="text-2xl text-[var(--color-cyan)] mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  >
                    {pillar.icon}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-base text-[var(--color-text)] mb-1">
                      {pillar.title}
                    </h3>
                    <p className="font-mono text-sm text-[var(--color-muted)] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
