import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════
// Card — stateless container with hover state
// ═══════════════════════════════════════════════════════════════

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--color-muted-foreground)]/10 p-6",
        hover && "transition-colors hover:border-[var(--color-accent)]/40",
        className,
      )}
    >
      {children}
    </div>
  );
}
