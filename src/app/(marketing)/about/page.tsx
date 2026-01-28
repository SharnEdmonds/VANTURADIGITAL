import { PageHero } from "@/components/ui/PageHero";
import { AboutMission } from "@/components/features/about/AboutMission";
import { ValuesGrid } from "@/components/features/about/ValuesGrid";
import { ComparisonTable } from "@/components/features/about/ComparisonTable";
import { TechStack } from "@/components/features/about/TechStack";
import { MarqueeSection } from "@/components/ui/ScrollMarquee";
import { LeadCaptureSection } from "@/components/features/lead-capture/lead-capture-section";

export default function AboutPage() {
  return (
    <div className="bg-carbon">
      <PageHero
        label="The Anti-Agency"
        title="We don't sell hours."
        subtitle="We sell outcomes. Vantura Digital is a performance engineering collective building the next generation of the web."
      />

      <AboutMission />

      <MarqueeSection
        items={[
          "TRANSPARENCY",
          "ENGINEERING",
          "PERFORMANCE",
          "RESULTS",
          "SPEED",
        ]}
      />

      <ValuesGrid />
      <ComparisonTable />
      <TechStack />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <hr className="border-gallery/10" />
      </div>

      <LeadCaptureSection />
    </div>
  );
}
