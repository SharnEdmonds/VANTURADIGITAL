import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════
// SectionWrapper — consistent section spacing + optional bg
// ═══════════════════════════════════════════════════════════════

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  background?: "default" | "muted" | "accent";
}

const bgMap = {
  default: "",
  muted: "bg-[var(--color-foreground)]/[0.02]",
  accent: "bg-[var(--color-accent)]/5",
} as const;

export function SectionWrapper({
  children,
  className,
  background = "default",
}: SectionWrapperProps) {
  return (
    <section className={cn("py-16 md:py-24", bgMap[background], className)}>
      {children}
    </section>
  );
}
