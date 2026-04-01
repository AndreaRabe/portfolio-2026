"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { useScrollAnimation, fadeUpVariants, staggerContainerVariants } from "@/hooks/useScrollAnimation";

type Level = 1 | 2 | 3 | 4 | 5;

type Tool = {
  name: string;
  level: Level;
  levelLabel: string;
};

type Category = {
  id: string;
  label: string;
  icon: string;
  tools: Tool[];
};

const STACK: Category[] = [
  {
    id: "webdev",
    label: "Web Dev",
    icon: "⬡",
    tools: [
      { name: "Python",        level: 5, levelLabel: "Expert" },
      { name: "Django / DRF",  level: 4, levelLabel: "Avancé" },
      { name: "FastAPI",       level: 4, levelLabel: "Avancé" },
      { name: "React.js",      level: 4, levelLabel: "Avancé" },
      { name: "TypeScript",    level: 3, levelLabel: "Confirmé" },
      { name: "Tailwind CSS",  level: 4, levelLabel: "Avancé" },
    ],
  },
  {
    id: "data",
    label: "Données",
    icon: "◈",
    tools: [
      { name: "PostgreSQL",    level: 5, levelLabel: "Expert" },
      { name: "MySQL",         level: 4, levelLabel: "Avancé" },
      { name: "Appwrite",      level: 3, levelLabel: "Confirmé" },
      { name: "SQL",           level: 5, levelLabel: "Expert" },
    ],
  },
  {
    id: "ml",
    label: "Machine Learning",
    icon: "◎",
    tools: [
      { name: "Scikit-learn",  level: 4, levelLabel: "Avancé" },
      { name: "ChefBoost",     level: 4, levelLabel: "Avancé" },
      { name: "Pandas",        level: 5, levelLabel: "Expert" },
      { name: "NumPy",         level: 4, levelLabel: "Avancé" },
      { name: "Matplotlib",    level: 4, levelLabel: "Avancé" },
    ],
  },
  {
    id: "automation",
    label: "Automatisation",
    icon: "⬢",
    tools: [
      { name: "Airflow",       level: 3, levelLabel: "Confirmé" },
      { name: "Power Automate",level: 3, levelLabel: "Confirmé" },
    ],
  },
  {
    id: "reporting",
    label: "Reporting",
    icon: "◇",
    tools: [
      { name: "Power BI",      level: 4, levelLabel: "Avancé" },
      { name: "Excel",         level: 4, levelLabel: "Avancé" },
    ],
  },
  {
    id: "outils",
    label: "Outils & Infra",
    icon: "▣",
    tools: [
      { name: "Docker",        level: 3, levelLabel: "Confirmé" },
      { name: "Git / GitHub",  level: 4, levelLabel: "Avancé" },
      { name: "Figma",         level: 3, levelLabel: "Confirmé" },
      { name: "GraphQL",       level: 3, levelLabel: "Confirmé" },
    ],
  },
];

function LevelDots({ level }: { level: Level }) {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`
            block h-1 w-4 rounded-full transition-colors duration-300
            ${i < level
              ? "bg-[var(--color-cyan)]"
              : "bg-[rgba(255,255,255,0.08)]"
            }
          `}
        />
      ))}
    </div>
  );
}

function ToolBadge({ tool }: { tool: Tool }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative">
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.04 }}
        className="
          glass glass-hover rounded-xl px-3 py-2.5 cursor-default
          flex items-center justify-between gap-3
        "
      >
        <span className="font-mono text-sm text-[var(--color-text)]">{tool.name}</span>
        <LevelDots level={tool.level} />
      </motion.div>

      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: -8 }}
          className="
            absolute bottom-full left-1/2 -translate-x-1/2 mb-1
            glass rounded-lg px-3 py-1.5 z-20 pointer-events-none whitespace-nowrap
          "
          role="tooltip"
        >
          <span className="font-mono text-xs text-[var(--color-cyan)]">
            {tool.levelLabel}
          </span>
        </motion.div>
      )}
    </div>
  );
}

export function StackSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { ref, isInView } = useScrollAnimation();

  const displayed = activeCategory
    ? STACK.filter((c) => c.id === activeCategory)
    : STACK;

  return (
    <section
      id="stack"
      className="relative py-24 sm:py-32 px-6"
      aria-label="Stack technique"
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
              Stack
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-text)] leading-tight"
            >
              Mes <span className="text-gradient-cyan">outils</span>.
            </motion.h2>
          </div>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filtrer par catégorie"
          >
            <button
              role="tab"
              aria-selected={!activeCategory}
              onClick={() => setActiveCategory(null)}
              className={`
                px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-200
                ${!activeCategory
                  ? "bg-[var(--color-cyan)] text-[#050508] font-semibold"
                  : "glass text-[var(--color-muted)] hover:text-[var(--color-text)]"
                }
              `}
            >
              All
            </button>
            {STACK.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
                className={`
                  px-3 py-1.5 rounded-lg font-mono text-xs transition-all duration-200
                  ${activeCategory === cat.id
                    ? "bg-[var(--color-cyan)] text-[#050508] font-semibold"
                    : "glass text-[var(--color-muted)] hover:text-[var(--color-text)]"
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Categories grid */}
        <motion.div
          ref={ref}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {displayed.map((cat) => (
            <GlassCard
              key={cat.id}
              variants={fadeUpVariants}
              layout
              className="p-5 flex flex-col gap-4"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 pb-3 border-b border-[var(--color-border)]">
                <span className="text-xl text-[var(--color-cyan)]" aria-hidden="true">
                  {cat.icon}
                </span>
                <h3 className="font-display font-semibold text-sm text-[var(--color-text)]">
                  {cat.label}
                </h3>
              </div>

              {/* Tools list */}
              <div className="flex flex-col gap-2" role="list" aria-label={cat.label}>
                {cat.tools.map((tool) => (
                  <div key={tool.name} role="listitem">
                    <ToolBadge tool={tool} />
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
