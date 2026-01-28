import Hero from "@/components/Hero";
import { Header } from "@/components/features/navigation";
import { Footer } from "@/components/features/navigation";
import { TechnicalBreakdown } from "@/components/features/technical";
import { InteractiveServiceGrid } from "@/components/features/services";
import { DeviceShowcase } from "@/components/features/portfolio";
import { PriceEstimator } from "@/components/features/pricing";
import { MarqueeSection } from "@/components/ui";
import {
  BrandStatementAnimated,
  ProofPointsAnimated,
  ProcessAnimated,
  DifferentiatorsAnimated,
  CTASectionAnimated,
} from "@/components/ui/AnimatedHomeSections";

// ═══════════════════════════════════════════════════════════════
// Home Page — Vantura Digital
// ═══════════════════════════════════════════════════════════════

export default function HomePage() {
  return (
    <>
      <Header />

      {/* ─── 01. Hero ───────────────────────────────────────── */}
      <Hero />

      {/* ─── 02. Brand Statement ────────────────────────────── */}
      <BrandStatementAnimated />

      {/* ─── 03. Proof Points ───────────────────────────────── */}
      <ProofPointsAnimated />

      {/* ─── 04. Infinite Scroll Marquee ─────────────────────── */}
      <MarqueeSection />

      {/* ─── 04b. Interactive Services Grid ──────────────────── */}
      <section className="bg-carbon">
        <InteractiveServiceGrid />

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <hr className="border-gallery/10" />
        </div>
      </section>

      {/* ─── 05. Process ────────────────────────────────────── */}
      <ProcessAnimated />

      {/* ─── 06. Technical Proof ────────────────────────────── */}
      <div className="bg-carbon">
        <TechnicalBreakdown />

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <hr className="border-gallery/10" />
        </div>
      </div>

      {/* ─── 07. Differentiators ────────────────────────────── */}
      <DifferentiatorsAnimated />

      {/* ─── 08. 3D Device Showcase ────────────────────────────── */}
      <DeviceShowcase />

      {/* ─── 09. Price Estimator ──────────────────────────────── */}
      <PriceEstimator />

      {/* ─── 10. CTA ────────────────────────────────────────── */}
      <CTASectionAnimated />

      <Footer />
    </>
  );
}
