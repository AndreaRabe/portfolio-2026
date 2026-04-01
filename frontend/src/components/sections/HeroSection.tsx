"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { EASE_OUT_EXPO } from "@/hooks/useScrollAnimation";
import dynamic from "next/dynamic";

// Load Three.js scene only on client — prevents SSR issues
const ParticleGraph = dynamic(
  () => import("@/components/three/ParticleGraph").then((m) => m.ParticleGraph),
  { ssr: false }
);

const METRICS = [
  { value: 6,  suffix: "+",   label: "projets livrés" },
  { value: 3,  suffix: "+",   label: "entreprises" },
  { value: 3,  suffix: " ans", label: "d'expérience" },
  { value: 2,  suffix: "",    label: "diplômes" },
] as const;

const TITLE_WORDS = ["Data", "Scientist", "&", "Dev-Fullstack."];

// Word-by-word reveal
const wordVariants = {
  hidden:  { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.1 + i * 0.12, duration: 0.7, ease: EASE_OUT_EXPO },
  }),
};

const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 24 },
  animate:   { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: EASE_OUT_EXPO },
});

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToWork = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Three.js particle background */}
      <ParticleGraph />

      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(5,5,8,0.7) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Editorial index — left side */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-6 bottom-1/3 z-10 hidden lg:flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-[rgba(0,212,255,0.4)]" />
        <span
          className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          01 — Intro
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Label */}
        <motion.div
          {...fadeUp(0)}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-[var(--color-cyan)]" aria-hidden="true" />
          <p className="font-label text-[var(--color-cyan)] text-sm tracking-[0.25em] uppercase">
            Freelance · Remote · Antananarivo, Madagascar
          </p>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-[var(--color-cyan)]" aria-hidden="true" />
        </motion.div>

        {/* Main title */}
        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-6">
          {TITLE_WORDS.map((word, i) => (
            <motion.span
              key={word + i}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className={`
                inline-block mr-[0.25em]
                ${word === "&" || word === "Dev-Fullstack." ? "text-gradient-cyan" : "text-[var(--color-text)]"}
              `}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.6)}
          className="font-mono text-[var(--color-muted)] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Diplômé de l&apos;ENI, je conçois des{" "}
          <span className="text-[var(--color-text)]">solutions data-driven</span>{" "}
          et des{" "}
          <span className="text-[var(--color-text)]">applications web full-stack</span>.
          Machine learning, dashboards Power BI, APIs REST — de l&apos;analyse à la production.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.75)}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <Button variant="primary" size="lg" onClick={scrollToWork}>
            Voir mes projets
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              const a = document.createElement("a");
              a.href = "/CV_Nantenaina_Andrea.pdf";
              a.download = "CV_Nantenaina_Andrea.pdf";
              a.click();
            }}
          >
            Télécharger mon CV
          </Button>
        </motion.div>

        {/* Metrics */}
        <motion.div
          {...fadeUp(0.9)}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
          role="list"
          aria-label="Métriques clés"
        >
          {METRICS.map((m) => (
            <div
              key={m.label}
              role="listitem"
              className="glass rounded-2xl p-4 text-center"
            >
              <div className="font-display font-bold text-2xl text-gradient-cyan">
                <AnimatedCounter value={m.value} suffix={m.suffix} />
              </div>
              <div className="font-mono text-xs text-[var(--color-muted)] mt-1">
                {m.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] text-[var(--color-muted)] tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[var(--color-cyan)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
