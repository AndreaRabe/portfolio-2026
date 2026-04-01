"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { useScrollAnimation, fadeUpVariants, staggerContainerVariants } from "@/hooks/useScrollAnimation";

const SERVICES = [
  {
    icon: "⬡",
    title: "Analyse & Exploration de données",
    description:
      "Exploration, nettoyage et analyse statistique de vos jeux de données pour révéler les patterns cachés et répondre aux questions métier.",
    tags: ["Python", "Pandas", "PostgreSQL"],
  },
  {
    icon: "◈",
    title: "Dashboards Power BI",
    description:
      "Tableaux de bord interactifs et clairs sous Power BI — du modèle de données à la visualisation, pour des décisions éclairées en temps réel.",
    tags: ["Power BI", "DAX", "SQL"],
  },
  {
    icon: "◎",
    title: "Machine Learning",
    description:
      "Conception et entraînement de modèles prédictifs adaptés à vos données : classification, régression, clustering et évaluation des performances.",
    tags: ["Scikit-learn", "Python", "NumPy"],
  },
  {
    icon: "⬢",
    title: "Automatisation de processus",
    description:
      "Automatisation des tâches répétitives et des flux de données avec Python et Power Automate pour gagner du temps et réduire les erreurs.",
    tags: ["Python", "Power Automate", "Airflow"],
  },
  {
    icon: "◇",
    title: "Modélisation & Bases de données",
    description:
      "Conception de schémas relationnels optimisés, requêtes SQL avancées et gestion de bases de données PostgreSQL et MySQL.",
    tags: ["PostgreSQL", "MySQL", "SQL"],
  },
  {
    icon: "▣",
    title: "Reporting & Réconciliation",
    description:
      "Rapports automatisés, réconciliation de données multi-sources et synthèses Excel adaptées aux besoins des équipes métier.",
    tags: ["Excel", "Power BI", "Python"],
  },
] as const;

export function ServicesSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 px-6"
      aria-label="Services"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-label text-[var(--color-cyan)] text-sm tracking-[0.25em] uppercase mb-3"
          >
            Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-text)] max-w-2xl leading-tight"
          >
            Ce que je{" "}
            <span className="text-gradient-cyan">construis</span>{" "}
            pour vous.
          </motion.h2>
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
        >
          {SERVICES.map((service) => (
            <GlassCard
              key={service.title}
              variants={fadeUpVariants}
              hoverable
              className="p-6 flex flex-col gap-4 group"
              role="listitem"
            >
              {/* Icon */}
              <span
                className="
                  text-3xl text-[var(--color-cyan)]
                  group-hover:text-[var(--color-violet)]
                  transition-colors duration-300
                "
                aria-hidden="true"
              >
                {service.icon}
              </span>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-display font-semibold text-base text-[var(--color-text)] mb-2">
                  {service.title}
                </h3>
                <p className="font-mono text-sm text-[var(--color-muted)] leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--color-border)]">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      font-label text-[10px] px-2 py-0.5 rounded-full
                      border border-[rgba(0,212,255,0.2)] text-[var(--color-muted)]
                      tracking-wide
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
