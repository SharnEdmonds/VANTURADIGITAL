import { sanityFetch, valuePropositionQuery } from "@/lib/sanity";
import type { ValueProposition } from "@/types";
import { Container, Button } from "@/components/ui";

// ═══════════════════════════════════════════════════════════════
// HeroSection — async Server Component fetching the value prop
// from Sanity and rendering the above-the-fold hero.
// ═══════════════════════════════════════════════════════════════

export async function HeroSection() {
  const valueProp = await sanityFetch<ValueProposition | null>({
    query: valuePropositionQuery,
    tags: ["valueProposition"],
    revalidate: 3600,
  });

  return (
    <Container
      as="section"
      className="flex flex-col items-center justify-center gap-6 py-24 text-center md:py-32"
    >
      <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
        {valueProp?.headline ?? "The Anti-Agency"}
      </h1>
      <p className="max-w-2xl text-lg text-[var(--color-muted)] md:text-xl">
        {valueProp?.subheadline ??
          "High-performance digital without the bloat."}
      </p>

      {/* Proof points row */}
      {valueProp?.proofPoints && valueProp.proofPoints.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-8">
          {valueProp.proofPoints.map((point) => (
            <div key={point._key} className="text-center">
              <span className="block text-2xl font-bold text-[var(--color-accent)]">
                {point.metric}
              </span>
              <span className="text-sm text-[var(--color-muted)]">
                {point.label}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex gap-4">
        <Button variant="primary" size="lg">
          Get Started
        </Button>
        <Button variant="secondary" size="lg">
          View Services
        </Button>
      </div>
    </Container>
  );
}
