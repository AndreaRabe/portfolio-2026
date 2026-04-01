"use client";

import { forwardRef } from "react";
import { motion, type MotionProps } from "framer-motion";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  glow?: "cyan" | "violet" | "none";
  hoverable?: boolean;
} & Omit<MotionProps, "children"> &
  Pick<React.HTMLAttributes<HTMLDivElement>, "role" | "aria-label" | "aria-labelledby">;

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = "", glow = "none", hoverable = false, ...motionProps }, ref) => {
    const glowClass =
      glow === "cyan" ? "glow-cyan" :
      glow === "violet" ? "glow-violet" : "";

    const hoverClass = hoverable ? "glass-hover cursor-pointer" : "";

    return (
      <motion.div
        ref={ref}
        className={`glass rounded-2xl ${glowClass} ${hoverClass} ${className}`}
        {...motionProps}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
