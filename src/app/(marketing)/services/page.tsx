import { PageHero } from "@/components/ui/PageHero";
import InteractiveServiceGrid from "@/components/features/services/InteractiveServiceGrid";
import { ProcessTimeline } from "@/components/features/services/process-timeline";
import { LeadCaptureSection } from "@/components/features/lead-capture/lead-capture-section";

export default function ServicesPage() {
  return (
    <div className="bg-carbon">
      <PageHero
        label="Our Capabilities"
        title="Engineering Growth."
        subtitle="Full-stack digital production for brands that demand performance. We build systems, not just websites."
      />

      <InteractiveServiceGrid />

      <ProcessTimeline />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <hr className="border-gallery/10" />
      </div>

      <LeadCaptureSection />
    </div>
  );
}
