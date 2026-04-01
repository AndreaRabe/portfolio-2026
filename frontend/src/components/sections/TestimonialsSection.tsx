"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sophie Martin",
    role: "Head of Data",
    company: "Acme Data",
    avatar: "SM",
    quote:
      "Andrea a transformé notre architecture data en quelques mois. Sa rigueur sur la qualité des données et sa capacité à vulgariser des sujets complexes auprès du CODIR ont fait la différence. Un vrai partenaire technique.",
  },
  {
    name: "Thomas Leroy",
    role: "CTO",
    company: "Datalytics",
    avatar: "TL",
    quote:
      "Rarement vu quelqu'un allier autant la vision architecture et l'exécution. Andrea a livré un pipeline temps réel sous 3 mois, avec une documentation exemplaire. Je le recommande sans hésitation.",
  },
  {
    name: "Clara Dumont",
    role: "Product Manager",
    company: "StartupX",
    avatar: "CD",
    quote:
      "Andrea a su comprendre nos besoins métier et les traduire en dashboards actionnables. Grâce à son travail, nos équipes ont enfin des données de confiance pour prendre des décisions rapides.",
  },
  {
    name: "Marc Petit",
    role: "Data Science Lead",
    company: "Datalytics",
    avatar: "MP",
    quote:
      "Le feature store mis en place par Andrea a multiplié par 4 la vélocité de notre équipe ML. Code propre, tests solides, documentation claire — exactement ce qu'on cherchait.",
  },
];

const SLIDE_DURATION = 5000;

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { ref, isInView } = useScrollAnimation();

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  // Auto-advance
  useEffect(() => {
    if (isPaused || !isInView) return;
    const id = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [isPaused, isInView, next]);

  return (
    <section
      id="testimonials"
      className="relative py-24 sm:py-32 px-6"
      aria-label="Témoignages"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-label text-[var(--color-cyan)] text-sm tracking-[0.25em] uppercase mb-3"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-text)] leading-tight"
          >
            Ce qu&apos;ils <span className="text-gradient-cyan">disent</span>.
          </motion.h2>
        </div>

        {/* Carousel */}
        <div
          ref={ref}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative overflow-hidden" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassCard className="p-8 sm:p-10">
                  {/* Quote mark */}
                  <span
                    className="block font-display text-6xl text-[var(--color-cyan)] opacity-30 leading-none mb-4 select-none"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>

                  {/* Quote text */}
                  <blockquote className="font-mono text-base sm:text-lg text-[var(--color-text)] leading-relaxed mb-8">
                    {TESTIMONIALS[current].quote}
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div
                      className="
                        w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                        bg-gradient-to-br from-[var(--color-cyan)] to-[var(--color-violet)]
                        font-display font-bold text-sm text-[#050508]
                      "
                      aria-hidden="true"
                    >
                      {TESTIMONIALS[current].avatar}
                    </div>
                    <div>
                      <p className="font-display font-semibold text-sm text-[var(--color-text)]">
                        {TESTIMONIALS[current].name}
                      </p>
                      <p className="font-mono text-xs text-[var(--color-muted)] mt-0.5">
                        {TESTIMONIALS[current].role} · {TESTIMONIALS[current].company}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {/* Prev */}
            <button
              onClick={prev}
              aria-label="Témoignage précédent"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-cyan)] hover:border-[rgba(0,212,255,0.3)] transition-all duration-200"
            >
              ←
            </button>

            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Navigation témoignages">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Témoignage ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className="relative h-1 rounded-full transition-all duration-300 overflow-hidden"
                  style={{ width: i === current ? 28 : 12 }}
                >
                  <span className={`absolute inset-0 rounded-full ${i === current ? "bg-[var(--color-cyan)]" : "bg-[var(--color-border)]"}`} />
                  {i === current && !isPaused && (
                    <motion.span
                      className="absolute inset-y-0 left-0 rounded-full bg-[rgba(255,255,255,0.4)]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                      key={current}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              onClick={next}
              aria-label="Témoignage suivant"
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-cyan)] hover:border-[rgba(0,212,255,0.3)] transition-all duration-200"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
