import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════
// Heading — stateless, polymorphic heading component
// ═══════════════════════════════════════════════════════════════

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

const levelStyles: Record<HeadingLevel, string> = {
  h1: "text-4xl md:text-5xl font-bold tracking-tight",
  h2: "text-3xl md:text-4xl font-bold tracking-tight",
  h3: "text-2xl font-semibold",
  h4: "text-xl font-semibold",
};

interface HeadingProps {
  as?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
}

export function Heading({ as: Tag = "h2", children, className }: HeadingProps) {
  return <Tag className={cn(levelStyles[Tag], className)}>{children}</Tag>;
}
