import { sanityFetch, valuePropositionQuery } from "@/lib/sanity";
import type { ValueProposition } from "@/types";
import { Container, Badge } from "@/components/ui";

// ═══════════════════════════════════════════════════════════════
// ValuePropSection — renders differentiators + proof points
// ═══════════════════════════════════════════════════════════════

export async function ValuePropSection() {
  const valueProp = await sanityFetch<ValueProposition | null>({
    query: valuePropositionQuery,
    tags: ["valueProposition"],
    revalidate: 3600,
  });

  if (!valueProp) return null;

  return (
    <Container as="section" className="py-24">
      <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
        {valueProp.headline}
      </h2>
      <p className="mb-12 max-w-2xl text-lg text-[var(--color-muted)]">
        {valueProp.subheadline}
      </p>

      {/* Differentiators */}
      {valueProp.differentiators?.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {valueProp.differentiators.map((diff) => (
            <div key={diff._key} className="space-y-2">
              <Badge>{diff.label}</Badge>
              <p className="text-sm text-[var(--color-muted)]">
                {diff.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
