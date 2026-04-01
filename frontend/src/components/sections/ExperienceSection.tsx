"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { useScrollAnimation, fadeUpVariants, staggerContainerVariants } from "@/hooks/useScrollAnimation";

type Position = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
  current?: boolean;
};

type Education = {
  school: string;
  degree: string;
  period: string;
};

const EXPERIENCE: Position[] = [
  {
    company: "MCB Madagascar",
    role: "Database Support Tech",
    period: "Fév 2026 — Présent",
    location: "Antananarivo",
    current: true,
    bullets: [
      "Extraction efficace et sécurisée des données",
      "Création de reporting et tableaux de bord avec Power BI",
      "Automatisation des tâches répétitives avec Power Automate & Airflow",
      "Administration et centralisation stratégique des données",
    ],
    tags: ["Python", "PostgreSQL", "Power BI", "Power Automate", "Airflow"],
  },
  {
    company: "MCB Madagascar",
    role: "Stage — Data & Reporting",
    period: "Juil 2025 — Jan 2026",
    location: "Antananarivo",
    bullets: [
      "Automatisation de la réconciliation des transactions MCB & MVOLA dans PostgreSQL",
      "Création de dashboards interactifs et rapports analytiques avec Power BI",
      "Extraction, transformation et consolidation des données pour la prise de décision",
    ],
    tags: ["Python", "PostgreSQL", "Power BI", "Power Automate", "Airflow"],
  },
  {
    company: "Novaniry",
    role: "Développeur Full Stack",
    period: "Jan 2025 — Mar 2025",
    location: "Antananarivo",
    bullets: [
      "Conception et implémentation d'une API RESTful",
      "Développement d'une interface utilisateur dynamique et responsive",
      "Intégration d'une carte interactive et génération de factures PDF",
      "Mise en place de tests unitaires",
    ],
    tags: ["Django REST Framework", "React.js", "PostgreSQL", "Google Maps"],
  },
  {
    company: "O.M.N.I.S",
    role: "Stage — Développeur Web",
    period: "Sep 2023 — Déc 2023",
    location: "Antananarivo",
    bullets: [
      "Développement d'une application de gestion de réservation de salles de conférences",
      "Conception et implémentation d'une API RESTful avec FastAPI",
      "Mise en place d'une interface utilisateur moderne et responsive avec React.js",
      "Notifications par email pour la confirmation et le rappel des réservations",
    ],
    tags: ["FastAPI", "React.js", "MySQL", "Git"],
  },
];

const EDUCATION: Education[] = [
  {
    school: "Ecole Nationale d'Informatique Fianarantsoa",
    degree: "Master Professionnel — Génie Logiciel & Base de Données",
    period: "2025",
  },
  {
    school: "Ecole Nationale d'Informatique Fianarantsoa",
    degree: "Licence Professionnelle — Génie Logiciel & Base de Données",
    period: "2023",
  },
  {
    school: "Lycée Saint-Michel Itaosy",
    degree: "Baccalauréat série C",
    period: "2019",
  },
];

export function ExperienceSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      id="experience"
      className="relative py-24 sm:py-32 px-6"
      aria-label="Expérience professionnelle"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-label text-[var(--color-cyan)] text-sm tracking-[0.25em] uppercase mb-3"
          >
            Experience
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-text)] leading-tight"
          >
            Parcours <span className="text-gradient-cyan">professionnel</span>.
          </motion.h2>
        </div>

        {/* Timeline */}
        <motion.div
          ref={ref}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Vertical line */}
          <div
            className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-cyan)] via-[rgba(0,212,255,0.3)] to-transparent"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8">
            {EXPERIENCE.map((pos, i) => (
              <TimelineItem key={pos.company + i} pos={pos} />
            ))}
          </div>

          {/* Education */}
          <div className="mt-16">
            <motion.h3
              variants={fadeUpVariants}
              className="font-display font-semibold text-lg text-[var(--color-text)] mb-6 pl-12"
            >
              Formation
            </motion.h3>
            <div className="flex flex-col gap-4">
              {EDUCATION.map((edu) => (
                <EducationItem key={edu.school} edu={edu} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* CV download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <a
            href="/CV_Nantenaina_Andrea.pdf"
            download="CV_Nantenaina_Andrea.pdf"
            className="
              inline-flex items-center gap-3 px-6 py-3 rounded-xl
              border border-[rgba(0,212,255,0.25)] text-[var(--color-cyan)]
              font-mono text-sm glass
              hover:border-[rgba(0,212,255,0.5)] hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]
              transition-all duration-200
            "
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1v9M4 7l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Télécharger mon CV (PDF)
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function TimelineItem({ pos }: { pos: Position }) {
  return (
    <motion.div variants={fadeUpVariants} className="flex gap-3 sm:gap-6">
      {/* Dot */}
      <div className="flex-shrink-0 flex flex-col items-center" aria-hidden="true">
        <div
          className={`
            relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
            ${pos.current
              ? "bg-[rgba(0,212,255,0.15)] border border-[var(--color-cyan)] glow-cyan"
              : "bg-[rgba(255,255,255,0.04)] border border-[var(--color-border)]"
            }
          `}
        >
          {pos.current && (
            <span className="absolute inset-0 rounded-full animate-ping bg-[rgba(0,212,255,0.2)]" />
          )}
          <span className={`w-2 h-2 rounded-full ${pos.current ? "bg-[var(--color-cyan)]" : "bg-[var(--color-muted)]"}`} />
        </div>
      </div>

      {/* Card */}
      <GlassCard hoverable className="flex-1 p-4 sm:p-6 mb-0">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="font-display font-bold text-lg text-[var(--color-text)]">
              {pos.role}
            </h3>
            <p className="font-mono text-sm text-[var(--color-cyan)] mt-0.5">
              {pos.company}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-mono text-xs text-[var(--color-muted)]">{pos.period}</p>
            <p className="font-mono text-xs text-[var(--color-muted)] mt-0.5">{pos.location}</p>
          </div>
        </div>

        {/* Bullets */}
        <ul className="flex flex-col gap-2 mb-4" role="list">
          {pos.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 font-mono text-sm text-[var(--color-muted)] leading-relaxed">
              <span className="text-[var(--color-cyan)] flex-shrink-0 mt-0.5" aria-hidden="true">→</span>
              {b}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--color-border)]">
          {pos.tags.map((tag) => (
            <span
              key={tag}
              className="font-label text-[10px] px-2 py-0.5 rounded-full border border-[rgba(0,212,255,0.2)] text-[var(--color-muted)] tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}

function EducationItem({ edu }: { edu: Education }) {
  return (
    <motion.div variants={fadeUpVariants} className="flex gap-6">
      <div className="flex-shrink-0 flex items-center justify-center w-10" aria-hidden="true">
        <div className="w-2 h-2 rounded-full bg-[var(--color-violet)] border border-[rgba(123,97,255,0.5)]" />
      </div>
      <GlassCard className="flex-1 px-5 py-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-display font-semibold text-sm text-[var(--color-text)]">{edu.degree}</p>
          <p className="font-mono text-xs text-[var(--color-violet)] mt-0.5">{edu.school}</p>
        </div>
        <p className="font-mono text-xs text-[var(--color-muted)]">{edu.period}</p>
      </GlassCard>
    </motion.div>
  );
}
