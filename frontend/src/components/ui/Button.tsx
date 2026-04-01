"use client";

import { forwardRef } from "react";
import { motion, type MotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
} & Omit<MotionProps, "children">;

const variants: Record<ButtonVariant, string> = {
  primary: `
    btn-shine
    bg-gradient-to-r from-[var(--color-cyan)] via-[#00b8e0] to-[var(--color-violet)]
    bg-[length:200%_auto] text-[#050508] font-semibold
    hover:bg-right hover:shadow-[0_0_32px_rgba(0,212,255,0.45),0_0_80px_rgba(0,212,255,0.15)]
    active:scale-[0.98] transition-[background-position,box-shadow] duration-500
  `,
  secondary: `
    glass border-[rgba(0,212,255,0.2)] text-[var(--color-cyan)]
    hover:border-[rgba(0,212,255,0.5)] hover:bg-[rgba(0,212,255,0.06)]
    hover:shadow-[0_0_24px_rgba(0,212,255,0.12)]
  `,
  ghost: `
    text-[var(--color-muted)] hover:text-[var(--color-text)]
    hover:bg-[var(--color-surface)]
  `,
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-7 py-3.5 text-base rounded-xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className = "",
      disabled = false,
      type = "button",
      onClick,
      ...motionProps
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={`
          inline-flex items-center justify-center gap-2
          font-display transition-all duration-200
          disabled:opacity-40 disabled:cursor-not-allowed
          ${variants[variant]} ${sizes[size]} ${className}
        `}
        {...motionProps}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
