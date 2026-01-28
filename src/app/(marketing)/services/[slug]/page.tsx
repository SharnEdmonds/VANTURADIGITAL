import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { sanityFetch, serviceBySlugQuery, serviceSlugsQuery } from "@/lib/sanity";
import type { Service } from "@/types";
import { LeadCaptureButton } from "@/components/ui";

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
      {/* ─── Hero ──────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-16 pt-24 lg:px-8 lg:pt-32">
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-signal"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
          Back to Services
        </Link>

        <h1 className="mb-6 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-gallery md:text-6xl">
          {service.title}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-text-secondary">
          {service.shortDescription}
        </p>
      </section>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <hr className="border-gallery/10" />
      </div>

      {/* ─── Capabilities ──────────────────────────────── */}
      {service.capabilities?.length > 0 && (
        <>
          <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-signal">
              Capabilities
            </p>
            <h2 className="mb-12 font-heading text-3xl font-bold leading-tight tracking-tight text-gallery md:text-4xl">
              What&apos;s Included
            </h2>

            <div className="grid gap-[1px] border border-gallery/10 bg-gallery/5 md:grid-cols-2">
              {service.capabilities.map((cap, i) => (
                <div key={cap._key} className="bg-carbon p-8">
                  <span className="mb-4 block font-mono text-xs text-text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-2 font-heading text-lg font-bold text-gallery">
                    {cap.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <hr className="border-gallery/10" />
          </div>
        </>
      )}

      {/* ─── Process ───────────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-signal">
          Process
        </p>
        <h2 className="mb-12 font-heading text-3xl font-bold leading-tight tracking-tight text-gallery md:text-4xl">
          How It Works
        </h2>

        <div className="grid gap-[1px] border border-gallery/10 bg-gallery/5 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Discovery & Audit",
              desc: "We analyze your current state — technical health, competitive landscape, and opportunity gaps.",
            },
            {
              step: "02",
              title: "Strategy & Build",
              desc: "We design and implement the system with weekly milestones, transparent reporting, and direct access to our team.",
            },
            {
              step: "03",
              title: "Optimize & Scale",
              desc: "Once live, we monitor performance, run experiments, and scale what works. Every metric tracked, every decision data-backed.",
            },
          ].map((item) => (
            <div key={item.step} className="bg-carbon p-8">
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center border border-signal font-mono text-sm font-bold text-signal">
                {item.step}
              </span>
              <h3 className="mb-2 font-heading text-lg font-bold text-gallery">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <hr className="border-gallery/10" />
      </div>

      {/* ─── CTA ───────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <div className="border border-gallery/10 bg-carbon-light p-10 md:p-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold leading-tight tracking-tight text-gallery md:text-4xl">
              Ready to Start?
            </h2>
            <p className="mb-8 text-base leading-relaxed text-text-secondary">
              Get a free technical audit focused on {service.title.toLowerCase()}.
              We&apos;ll identify your biggest opportunities and deliver a clear action plan.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact">
                <LeadCaptureButton size="xl">
                  Get Free Audit
                </LeadCaptureButton>
              </Link>
              <Link
                href="/services"
                className="inline-flex h-14 items-center justify-center border border-gallery/20 bg-transparent px-8 font-heading text-base font-bold uppercase tracking-wider text-gallery transition-colors hover:border-signal hover:text-signal"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
