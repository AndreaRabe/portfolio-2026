"use client";

import { motion } from "framer-motion";

type Props = {
  variant?: "cyan" | "violet" | "both";
};

export function SectionDivider({ variant = "both" }: Props) {
  return (
    <div className="relative flex items-center justify-center py-2 px-6 overflow-hidden" aria-hidden="true">
      <div className="max-w-6xl w-full mx-auto flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[var(--color-border)]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex gap-2 items-center"
        >
          {(variant === "cyan" || variant === "both") && (
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] shadow-[0_0_6px_rgba(0,212,255,0.6)]" />
          )}
          {variant === "both" && (
            <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
          )}
          {(variant === "violet" || variant === "both") && (
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-violet)] shadow-[0_0_6px_rgba(123,97,255,0.6)]" />
          )}
        </motion.div>

        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[var(--color-border)]" />
      </div>
    </div>
  );
}
