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
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        className="group grid grid-cols-1 gap-4 border-b border-gallery/5 p-6 last:border-0 md:grid-cols-3 md:gap-0 transition-all duration-300 hover:bg-gallery/[0.03] hover:pl-8"
                    >
                        <div className="font-heading font-bold text-gallery md:text-sm">
                            {row.feature}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-text-secondary line-through opacity-50 decoration-signal/50">
                            {/* X icon */}
                            <motion.svg
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 + 0.2, type: "spring", stiffness: 300 }}
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="hidden shrink-0 text-red-400/60 md:block"
                            >
                                <path d="M11 3L3 11M3 3l8 8" />
                            </motion.svg>
                            <span>
                                <span className="md:hidden mr-2 text-xs uppercase tracking-wider text-text-muted no-underline opacity-100">Traditional:</span>
                                {row.traditional}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-bold text-signal">
                            {/* Checkmark icon */}
                            <motion.svg
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 + 0.3, type: "spring", stiffness: 300 }}
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="hidden shrink-0 text-signal md:block"
                            >
                                <path d="M11.5 3.5L5.5 10.5L2.5 7.5" />
                            </motion.svg>
                            <span>
                                <span className="md:hidden mr-2 text-xs uppercase tracking-wider text-text-muted font-normal text-gallery">Vantura:</span>
                                {row.vantura}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
