import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════
// Badge — stateless pill / tag component
// ═══════════════════════════════════════════════════════════════

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-[var(--color-foreground)]/5 px-3 py-1 text-xs font-medium",
        className,
      )}
    >
      {children}
    </span>
  );
}
