"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { useScrollAnimation, fadeUpVariants, staggerContainerVariants } from "@/hooks/useScrollAnimation";

const SERVICES = [
  {
    icon: "⬡",
    title: "Data Pipeline Design",
    description:
      "Conception et implémentation de pipelines ELT/ETL robustes avec Airflow, dbt et Spark. Monitoring, alertes et documentation inclus.",
    tags: ["Airflow", "dbt", "Spark"],
  },
  {
    icon: "◈",
    title: "Dashboard & Reporting",
    description:
      "Tableaux de bord analytiques clairs et actionnables avec Metabase, Looker ou Superset. Du modèle de données à la visualisation.",
    tags: ["Metabase", "Looker", "SQL"],
  },
  {
    icon: "◎",
    title: "Data Quality & Governance",
    description:
      "Tests automatisés, documentation des assets data, alertes de fraîcheur et contrats de données pour des insights de confiance.",
    tags: ["Great Expectations", "dbt tests", "Catalog"],
  },
  {
    icon: "⬢",
    title: "ETL / ELT Architecture",
    description:
      "Choix de stack, design des modèles Lakehouse/DWH, stratégie de partitionnement et optimisation des coûts cloud.",
    tags: ["BigQuery", "Snowflake", "Delta Lake"],
  },
  {
    icon: "◇",
    title: "ML Feature Engineering",
    description:
      "Préparation des features pour les modèles ML : feature store, pipelines de transformation et monitoring de dérive.",
    tags: ["Feature Store", "Python", "Pandas"],
  },
  {
    icon: "▣",
    title: "Data Strategy Consulting",
    description:
      "Audit de maturité data, feuille de route, choix technologiques et accompagnement à la mise en place d'une culture data.",
    tags: ["Audit", "Roadmap", "Coaching"],
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
