"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const comparisonData = [
    {
        feature: "Pricing Model",
        traditional: "Monthly Retainers",
        vantura: "Project-Based / Results",
    },
    {
        feature: "Team Structure",
        traditional: "Account Managers + Juniors",
        vantura: "Senior Engineers + Strategists",
    },
    {
        feature: "Reporting",
        traditional: "PDF Summaries",
        vantura: "Live Raw Data Dashboards",
    },
    {
        feature: "Asset Ownership",
        traditional: "Leased / Platform Lock-in",
        vantura: "100% Client Owned",
    },
    {
        feature: "Speed",
        traditional: "Weeks for simple edits",
        vantura: "24-48hr Turnaround",
    },
];

export function ComparisonTable() {
    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
            <RevealOnScroll className="mb-16 text-center">
                <h2 className="font-heading text-4xl font-bold text-gallery md:text-5xl">
                    Old Way vs. <span className="text-signal">Vantura Way</span>
                </h2>
            </RevealOnScroll>

            <div className="overflow-hidden border border-gallery/10 bg-carbon">
                <div className="grid grid-cols-3 border-b border-gallery/10 bg-carbon-light p-6 text-xs font-bold uppercase tracking-wider text-text-muted">
                    <div>Dimension</div>
                    <div className="hidden md:block">Traditional Agency</div>
                    <div>Vantura Digital</div>
                </div>

                {comparisonData.map((row, i) => (
                    <motion.div
                        key={row.feature}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="grid grid-cols-1 gap-4 border-b border-gallery/5 p-6 last:border-0 md:grid-cols-3 md:gap-0 transition-colors hover:bg-gallery/[0.02]"
                    >
                        <div className="font-heading font-bold text-gallery md:text-sm">
                            {row.feature}
                        </div>

                        <div className="text-sm text-text-secondary line-through opacity-50 decoration-signal/50">
                            <span className="md:hidden mr-2 text-xs uppercase tracking-wider text-text-muted no-underline opacity-100">Traditional:</span>
                            {row.traditional}
                        </div>

                        <div className="text-sm font-bold text-signal">
                            <span className="md:hidden mr-2 text-xs uppercase tracking-wider text-text-muted font-normal text-gallery">Vantura:</span>
                            {row.vantura}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
