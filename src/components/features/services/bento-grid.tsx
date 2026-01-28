import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════
// BentoGrid — Service Architecture
// ═══════════════════════════════════════════════════════════════
// Swiss/Neo-Brutalist asymmetric grid. Mathematical 12-col base.
// Desktop: 4-column bento with spanning cells.
// Tablet: 2-column. Mobile: single-column stack.

interface BentoCardProps {
  title: string;
  description: string;
  className?: string;
  capabilities?: string[];
  index: number;
}

function BentoCard({
  title,
  description,
  className,
  capabilities,
  index,
}: BentoCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden border border-gallery/10 bg-carbon p-grid-6 transition-colors duration-200 hover:border-signal/40",
        className,
      )}
    >
      {/* Grid index — Swiss typographic detail */}
      <span className="absolute right-grid-3 top-grid-3 font-mono text-xs text-gallery/20">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Objective Realism image placeholder */}
      <div className="mb-grid-4 aspect-[16/9] w-full border border-gallery/10 bg-carbon-light">
        <div className="flex h-full w-full items-center justify-center">
          {/* Geometric placeholder — monochromatic grid pattern */}
          <svg
            viewBox="0 0 160 90"
            fill="none"
            className="h-full w-full"
            aria-hidden="true"
          >
            {/* Base grid lines */}
            <line x1="40" y1="0" x2="40" y2="90" stroke="#EEEEEE" strokeOpacity="0.06" />
            <line x1="80" y1="0" x2="80" y2="90" stroke="#EEEEEE" strokeOpacity="0.06" />
            <line x1="120" y1="0" x2="120" y2="90" stroke="#EEEEEE" strokeOpacity="0.06" />
            <line x1="0" y1="30" x2="160" y2="30" stroke="#EEEEEE" strokeOpacity="0.06" />
            <line x1="0" y1="60" x2="160" y2="60" stroke="#EEEEEE" strokeOpacity="0.06" />
            {/* Focal geometric shape */}
            <rect
              x="55"
              y="20"
              width="50"
              height="50"
              stroke="#EEEEEE"
              strokeOpacity="0.15"
              strokeWidth="1"
              fill="none"
            />
            <circle
              cx="80"
              cy="45"
              r="18"
              stroke="#FF4F00"
              strokeOpacity="0.3"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <h3 className="mb-grid-1 font-heading text-xl font-bold leading-tight text-gallery transition-colors group-hover:text-signal">
        {title}
      </h3>
      <p className="mb-grid-3 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>

      {capabilities && capabilities.length > 0 && (
        <ul className="flex flex-wrap gap-grid-1">
          {capabilities.map((cap) => (
            <li
              key={cap}
              className="border border-gallery/10 bg-carbon-light px-grid-2 py-1 font-mono text-xs text-gallery/60"
            >
              {cap}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

// ─── Static service data (renders without Sanity) ────────────
const services = [
  {
    title: "Web Development",
    description:
      "Performance-first engineering. Server components, edge rendering, zero-CLS typography. Every millisecond measured.",
    capabilities: ["Next.js 15", "React 19", "Edge Runtime", "Zero CLS"],
  },
  {
    title: "SEO & GEO",
    description:
      "Algorithmic visibility. Technical audits, structured data, and generative engine optimization that compounds.",
    capabilities: ["Technical SEO", "Schema Markup", "GEO", "Core Web Vitals"],
  },
  {
    title: "Paid Advertising",
    description:
      "Precision media buying. Data-driven campaigns across search, social, and programmatic channels.",
    capabilities: ["Google Ads", "Meta Ads", "Analytics", "Attribution"],
  },
  {
    title: "Analytics & Reporting",
    description:
      "Decisions from data, not opinions. Custom dashboards, conversion tracking, and attribution modeling.",
    capabilities: ["GA4", "Looker Studio", "Tag Manager", "Server-Side"],
  },
  {
    title: "Performance Engineering",
    description:
      "Sub-second load times. Image optimization, code splitting, edge caching, and runtime analysis.",
    capabilities: ["Lighthouse 100", "CDN", "Lazy Loading", "WASM"],
  },
  {
    title: "Conversion Architecture",
    description:
      "Every interaction engineered for action. A/B testing, funnel optimization, and behavioral analysis.",
    capabilities: ["A/B Testing", "Heatmaps", "Funnels", "CRO"],
  },
];

export function ServiceBentoGrid() {
  return (
    <section className="mx-auto w-full max-w-7xl px-grid-3 py-grid-15 lg:px-grid-6">
      {/* Section header — Swiss alignment */}
      <div className="mb-grid-10 max-w-3xl">
        <p className="mb-grid-2 font-mono text-xs uppercase tracking-widest text-signal">
          Service Architecture
        </p>
        <h2 className="mb-grid-3 font-heading text-4xl font-bold leading-tight tracking-tight text-gallery md:text-5xl">
          Six Pillars.
          <br />
          Zero Bloat.
        </h2>
        <p className="text-lg leading-relaxed text-text-secondary">
          Every capability engineered for measurable impact. No filler services,
          no creative fluff — functional systems that compound results.
        </p>
      </div>

      {/* Bento Grid — asymmetric Swiss layout */}
      <div className="grid auto-rows-auto gap-[1px] border border-gallery/10 bg-gallery/5 md:grid-cols-2 lg:grid-cols-4">
        {/* Web Dev — hero card, spans 2 cols + 2 rows */}
        <BentoCard
          index={0}
          title={services[0].title}
          description={services[0].description}
          capabilities={services[0].capabilities}
          className="md:col-span-2 lg:row-span-2"
        />

        {/* SEO & GEO */}
        <BentoCard
          index={1}
          title={services[1].title}
          description={services[1].description}
          capabilities={services[1].capabilities}
        />

        {/* Paid Advertising */}
        <BentoCard
          index={2}
          title={services[2].title}
          description={services[2].description}
          capabilities={services[2].capabilities}
        />

        {/* Analytics — spans 2 cols */}
        <BentoCard
          index={3}
          title={services[3].title}
          description={services[3].description}
          capabilities={services[3].capabilities}
          className="md:col-span-2"
        />

        {/* Performance */}
        <BentoCard
          index={4}
          title={services[4].title}
          description={services[4].description}
          capabilities={services[4].capabilities}
        />

        {/* Conversion Architecture — spans 3 cols on desktop */}
        <BentoCard
          index={5}
          title={services[5].title}
          description={services[5].description}
          capabilities={services[5].capabilities}
          className="md:col-span-2 lg:col-span-3"
        />
      </div>
    </section>
  );
}
