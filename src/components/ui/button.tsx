import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════
// Button — stateless atomic component
// ═══════════════════════════════════════════════════════════════

const variants = {
  primary:
    "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent)]/90",
  secondary:
    "bg-[var(--color-foreground)]/5 text-[var(--color-foreground)] hover:bg-[var(--color-foreground)]/10",
  ghost:
    "bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-foreground)]/5",
} as const;

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-8 text-base",
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
