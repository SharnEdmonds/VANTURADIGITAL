import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { sanityFetch, serviceBySlugQuery, serviceSlugsQuery } from "@/lib/sanity";
import type { Service } from "@/types";
import { ServiceDetailHero } from "@/components/features/services/ServiceDetailHero";
import { ServiceCapabilities } from "@/components/features/services/ServiceCapabilities";
import { ServiceProcess } from "@/components/features/services/ServiceProcess";
import { ServiceCTA } from "@/components/features/services/ServiceCTA";

// ISR: revalidate individual service pages every hour
export const revalidate = 3600;

// ─── Static params for ISR ───────────────────────────────────

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: serviceSlugsQuery,
    tags: ["service"],
    revalidate: 3600,
  });

  return slugs.map((s) => ({ slug: s.slug }));
}

// ─── Dynamic metadata from Sanity SEO fields ────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const service = await sanityFetch<Service | null>({
    query: serviceBySlugQuery,
    params: { slug },
    tags: ["service"],
  });

  if (!service) return {};

  return {
    title: service.seo?.metaTitle ?? service.title,
    description: service.seo?.metaDescription ?? service.shortDescription,
  };
}

// ─── Page Component ──────────────────────────────────────────

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const service = await sanityFetch<Service | null>({
    query: serviceBySlugQuery,
    params: { slug },
    tags: ["service"],
    revalidate: 3600,
  });

  if (!service) notFound();

  return (
    <div className="bg-carbon">
      <ServiceDetailHero
        title={service.title}
        description={service.shortDescription}
      />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <hr className="border-gallery/10" />
      </div>

      {service.capabilities?.length > 0 && (
        <ServiceCapabilities capabilities={service.capabilities} />
      )}

      <ServiceProcess />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <hr className="border-gallery/10" />
      </div>

      <ServiceCTA serviceTitle={service.title} />
    </div>
  );
}
