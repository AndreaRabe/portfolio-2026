type BadgeVariant = "cyan" | "violet" | "muted" | "success";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  pulse?: boolean;
};

const variantStyles: Record<BadgeVariant, string> = {
  cyan:    "border-[rgba(0,212,255,0.3)]    text-[var(--color-cyan)]    bg-[rgba(0,212,255,0.08)]",
  violet:  "border-[rgba(123,97,255,0.3)]   text-[var(--color-violet)]  bg-[rgba(123,97,255,0.08)]",
  muted:   "border-[var(--color-border)]    text-[var(--color-muted)]   bg-[var(--color-surface)]",
  success: "border-[rgba(34,197,94,0.3)]    text-[#22c55e]              bg-[rgba(34,197,94,0.08)]",
};

export function Badge({ children, variant = "muted", className = "", pulse = false }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1
        rounded-full border font-label text-xs tracking-wide
        ${variantStyles[variant]} ${className}
      `}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22c55e]" />
        </span>
      )}
      {children}
    </span>
  );
}
