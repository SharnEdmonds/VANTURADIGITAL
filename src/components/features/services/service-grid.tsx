import { sanityFetch, serviceArchitectureQuery } from "@/lib/sanity";
import type { Service } from "@/types";
import { ServiceCard } from "./service-card";

// ═══════════════════════════════════════════════════════════════
// ServiceGrid — async Server Component that fetches + renders
// the three service pillars (Web Dev, SEO/GEO, Ads).
// ═══════════════════════════════════════════════════════════════

export async function ServiceGrid() {
  const services = await sanityFetch<Service[]>({
    query: serviceArchitectureQuery,
    tags: ["service"],
    revalidate: 3600,
  });

  if (!services?.length) return null;

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
}
