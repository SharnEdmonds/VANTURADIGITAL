import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════
// LeadCaptureButton — Signal Orange CTA
// ═══════════════════════════════════════════════════════════════
// High-precision layout. Active verb states only.
// Neo-Brutalist aesthetic: sharp corners, heavy weight, visible borders.

const sizes = {
  md: "h-12 px-grid-5 text-sm gap-grid-2",
  lg: "h-14 px-grid-6 text-base gap-grid-2",
  xl: "h-16 px-grid-8 text-lg gap-grid-3",
} as const;

export interface LeadCaptureButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof sizes;
  /** Show trailing arrow indicator */
  arrow?: boolean;
}

export const LeadCaptureButton = forwardRef<
  HTMLButtonElement,
  LeadCaptureButtonProps
>(({ className, size = "lg", arrow = true, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        // Base
        "group inline-flex items-center justify-center font-heading font-bold uppercase tracking-wider",
        // Signal Orange
        "bg-signal text-white",
        // Hover state — darken
        "hover:bg-signal-hover",
        // Active state — press effect
        "active:translate-y-[1px] active:bg-signal-hover",
        // Focus — accessible ring
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-carbon",
        // Disabled
        "disabled:pointer-events-none disabled:opacity-40",
        // Transition
        "transition-all duration-150",
        // Neo-Brutalist: no border-radius
        "rounded-none",
        // Border for structure
        "border border-signal-hover",
        sizes[size],
        className,
      )}
      suppressHydrationWarning
      {...props}
    >
      <span>{children}</span>
      {arrow && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="transition-transform duration-150 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      )}
    </button>
  );
});

LeadCaptureButton.displayName = "LeadCaptureButton";

// ═══════════════════════════════════════════════════════════════
// LeadCaptureSection — Full CTA block with multiple verb states
// ═══════════════════════════════════════════════════════════════

export function LeadCaptureSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-grid-3 py-grid-15 lg:px-grid-6">
      <div className="border border-gallery/10 bg-carbon p-grid-8 md:p-grid-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-grid-2 font-mono text-xs uppercase tracking-widest text-signal">
            Ready to Execute
          </p>
          <h2 className="mb-grid-4 font-heading text-3xl font-bold leading-tight tracking-tight text-gallery md:text-5xl">
            Stop Browsing.
            <br />
            Start Building.
          </h2>
          <p className="mb-grid-8 text-lg leading-relaxed text-text-secondary">
            Three questions. One audit. Zero obligation.
            We analyze your digital presence and deliver a technical
            breakdown within 48 hours.
          </p>

          {/* Primary CTA — Active verb state */}
          <div className="flex flex-col items-center gap-grid-3 sm:flex-row sm:justify-center">
            <LeadCaptureButton size="xl">
              Analyze My Site
            </LeadCaptureButton>
            <LeadCaptureButton
              size="lg"
              arrow={false}
              className="border-gallery/20 bg-transparent text-gallery hover:bg-gallery/5 hover:text-gallery"
            >
              View Case Studies
            </LeadCaptureButton>
          </div>

          {/* Secondary verb CTAs */}
          <div className="mt-grid-8 flex flex-wrap justify-center gap-grid-3">
            <LeadCaptureButton size="md">
              Launch Campaign
            </LeadCaptureButton>
            <LeadCaptureButton size="md">
              Audit My SEO
            </LeadCaptureButton>
            <LeadCaptureButton size="md">
              Get Performance Report
            </LeadCaptureButton>
          </div>

          {/* Trust signal */}
          <p className="mt-grid-6 font-mono text-xs text-text-muted">
            No contracts. No retainers. Results-first engagement.
          </p>
        </div>
      </div>
    </section>
  );
}
