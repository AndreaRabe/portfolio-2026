"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { useScrollAnimation, fadeUpVariants, staggerContainerVariants } from "@/hooks/useScrollAnimation";

type Category = "All" | "Data Engineering" | "Analytics" | "Dashboards";

type Project = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  impact: string;
  category: Exclude<Category, "All">;
  gradient: string;
};

const PROJECTS: Project[] = [
  {
    slug: "lakehouse-migration",
    title: "Migration DWH → Lakehouse",
    summary: "Refonte complète d'un entrepôt de données legacy vers une architecture Delta Lake sur Azure.",
    tags: ["Spark", "Delta Lake", "dbt", "Airflow"],
    impact: "-60% query time",
    category: "Data Engineering",
    gradient: "from-[rgba(0,212,255,0.15)] to-[rgba(123,97,255,0.05)]",
  },
  {
    slug: "realtime-pipeline",
    title: "Pipeline Temps Réel",
    summary: "Ingestion Kafka → Flink → BigQuery pour du monitoring produit à la seconde.",
    tags: ["Kafka", "Flink", "BigQuery", "Python"],
    impact: "<2s latency",
    category: "Data Engineering",
    gradient: "from-[rgba(123,97,255,0.15)] to-[rgba(0,212,255,0.05)]",
  },
  {
    slug: "ecommerce-analytics",
    title: "Analytics E-commerce",
    summary: "Modélisation dimensionnelle et suite de KPIs pour un retailer 50M€ CA.",
    tags: ["dbt", "Snowflake", "Looker", "SQL"],
    impact: "+30% revenue insight",
    category: "Analytics",
    gradient: "from-[rgba(0,212,255,0.1)] to-[rgba(123,97,255,0.1)]",
  },
  {
    slug: "ops-dashboard",
    title: "Dashboard Opérationnel",
    summary: "Tableau de bord temps réel pour le suivi des KPIs de production d'une usine.",
    tags: ["Metabase", "PostgreSQL", "Python"],
    impact: "-45% temps de report",
    category: "Dashboards",
    gradient: "from-[rgba(123,97,255,0.1)] to-[rgba(0,212,255,0.05)]",
  },
  {
    slug: "feature-store",
    title: "Feature Store ML",
    summary: "Mise en place d'un feature store centralisé pour accélérer les cycles ML.",
    tags: ["Feast", "Redis", "dbt", "Python"],
    impact: "x4 feature reuse",
    category: "Data Engineering",
    gradient: "from-[rgba(0,212,255,0.12)] to-transparent",
  },
  {
    slug: "data-quality-platform",
    title: "Plateforme Data Quality",
    summary: "Framework de tests automatisés et monitoring de la qualité sur 200+ tables.",
    tags: ["Great Expectations", "dbt", "Airflow", "Slack"],
    impact: "99.8% data SLA",
    category: "Analytics",
    gradient: "from-[rgba(123,97,255,0.12)] to-transparent",
  },
];

const CATEGORIES: Category[] = ["All", "Data Engineering", "Analytics", "Dashboards"];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const { ref, isInView } = useScrollAnimation();

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 px-6"
      aria-label="Projets"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-label text-[var(--color-cyan)] text-sm tracking-[0.25em] uppercase mb-3"
            >
              Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-text)] leading-tight"
            >
              Case{" "}
              <span className="text-gradient-cyan">Studies</span>.
            </motion.h2>
          </div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filtrer par catégorie"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-4 py-2 rounded-xl font-mono text-xs transition-all duration-200
                  ${activeCategory === cat
                    ? "bg-[var(--color-cyan)] text-[#050508] font-semibold shadow-[0_0_16px_rgba(0,212,255,0.35)]"
                    : "glass text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-hover)]"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          role="tabpanel"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <GlassCard
      variants={fadeUpVariants}
      hoverable
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden flex flex-col"
    >
      {/* Thumbnail / gradient */}
      <div
        className={`h-36 bg-gradient-to-br ${project.gradient} relative flex items-end p-4`}
      >
        {/* Impact badge */}
        <span
          className="
            font-display font-bold text-2xl text-[var(--color-cyan)]
            drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]
          "
        >
          {project.impact}
        </span>

        {/* Hover overlay CTA */}
        <div
          className="
            absolute inset-0 bg-[rgba(5,5,8,0.75)] backdrop-blur-sm
            flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
          "
        >
          <a
            href={`/projects/${project.slug}`}
            className="
              font-display font-semibold text-sm px-5 py-2.5 rounded-xl
              bg-[var(--color-cyan)] text-[#050508]
              hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]
              transition-shadow duration-200
            "
          >
            Voir le case study →
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="font-display font-semibold text-base text-[var(--color-text)] mb-1">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-[var(--color-muted)] leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-[var(--color-border)]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="
                font-label text-[10px] px-2 py-0.5 rounded-full tracking-wide
                border border-[rgba(0,212,255,0.2)] text-[var(--color-muted)]
              "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
