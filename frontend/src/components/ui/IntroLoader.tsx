"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Terminal lines ─────────────────────────────────────────── */
const LINES = [
  { prefix: ">", text: " Initialisation du pipeline...",     ms: 400  },
  { prefix: ">", text: " Connexion à PostgreSQL ✓",         ms: 1200 },
  { prefix: "$", text: " python analyze.py --mode=full",     ms: 2200 },
  { prefix: ">", text: " 1 245 892 lignes traitées ✓",      ms: 3400 },
  { prefix: "$", text: " power_bi --render dashboards",      ms: 4600 },
  { prefix: ">", text: " Prêt. Bienvenue sur mon portfolio.", ms: 5800 },
] as const;

const PROGRESS_DURATION = 6500; // ms until bar hits 100%
const EXIT_DELAY        = 7200; // ms until overlay leaves

/* ── Background data noise ──────────────────────────────────── */
const NOISE = Array.from({ length: 48 }, (_, i) => ({
  id: i,
  val: Math.random() > 0.45
    ? (Math.random() * 9999).toFixed(2)
    : ["SELECT", "FROM", "WHERE", "JOIN", "NULL", "TRUE", "INT8", "AVG"][
        Math.floor(Math.random() * 8)
      ],
  x: `${(i % 8) * 13 + Math.random() * 5}%`,
  y: `${Math.floor(i / 8) * 18 + Math.random() * 8}%`,
  dur: 0.6 + Math.random() * 1.4,
  delay: Math.random() * 2.5,
}));

/* ── Component ───────────────────────────────────────────────── */
export function IntroLoader() {
  const [show, setShow]               = useState(false);
  const [exiting, setExiting]         = useState(false);
  const [progress, setProgress]       = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("portfolio-intro")) return;
    sessionStorage.setItem("portfolio-intro", "1");
    setShow(true);

    /* Progress bar */
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / PROGRESS_DURATION, 1);
      setProgress(Math.round(p * 100));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    /* Show lines */
    const timers = LINES.map((line, i) =>
      setTimeout(() => setVisibleCount(i + 1), line.ms)
    );

    /* Exit */
    const exitTimer = setTimeout(() => setExiting(true), EXIT_DELAY);

    return () => {
      cancelAnimationFrame(rafRef.current);
      timers.forEach(clearTimeout);
      clearTimeout(exitTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] bg-[#050508] flex flex-col items-center justify-center px-6 overflow-hidden"
          aria-label="Chargement"
          aria-live="polite"
        >
          {/* ── Background noise ── */}
          <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
            {NOISE.map((n) => (
              <motion.span
                key={n.id}
                className="absolute font-mono text-[10px] text-[rgba(0,212,255,0.12)]"
                style={{ left: n.x, top: n.y }}
                animate={{ opacity: [0.04, 0.2, 0.04] }}
                transition={{ duration: n.dur, delay: n.delay, repeat: Infinity, ease: "easeInOut" }}
              >
                {n.val}
              </motion.span>
            ))}
          </div>

          {/* ── Terminal window ── */}
          <div className="relative w-full max-w-lg">

            {/* Title bar */}
            <div className="glass rounded-t-xl px-4 py-3 flex items-center gap-2 border-b border-[rgba(255,255,255,0.05)]">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-2 font-mono text-[11px] text-[var(--color-muted)]">
                andrea@data-studio — pipeline.py
              </span>
            </div>

            {/* Terminal body */}
            <div className="glass rounded-b-xl p-6 min-h-[200px] flex flex-col gap-2.5">
              {LINES.slice(0, visibleCount).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1,  x: 0  }}
                  transition={{ duration: 0.25 }}
                  className="flex gap-2 font-mono text-sm"
                >
                  <span className={
                    line.prefix === "$"
                      ? "text-[var(--color-violet)] select-none"
                      : "text-[var(--color-cyan)] select-none"
                  }>
                    {line.prefix}
                  </span>
                  <span className="text-[var(--color-text)]">{line.text}</span>
                </motion.div>
              ))}

              {/* Blinking cursor */}
              <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear", times: [0, 0.49, 0.5, 1] }}
                className="inline-block w-[9px] h-[1.1em] bg-[var(--color-cyan)] align-middle mt-0.5"
                aria-hidden="true"
              />
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="h-[2px] w-full bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, var(--color-cyan), var(--color-violet))",
                    boxShadow: "0 0 12px rgba(0,212,255,0.6)",
                  }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-mono text-[11px] text-[var(--color-muted)]">
                  Chargement du portfolio
                </span>
                <span className="font-mono text-[11px] text-[var(--color-cyan)]">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
