"use client";

import { motion } from "framer-motion";
import { RevealOnScroll, StaggerContainer, staggerItemVariants } from "@/components/ui/RevealOnScroll";

const values = [
    {
        title: "Radical Transparency",
        desc: "You see the code, the ad account, and the raw data. No black boxes. We treat your budget like our own inheritance.",
    },
    {
        title: "Engineering First",
        desc: "Marketing problems often have engineering solutions. We solve for scalability and automation, not just quick fixes.",
    },
    {
        title: "Speed as a Feature",
        desc: "Slow sites kill conversion. We obsess over milliseconds. 100/100 Lighthouse scores aren't a goal; they're the baseline.",
    },
    {
        title: "Anti-Fragile",
        desc: "We build systems that get stronger with stress. Redundant backups, rigorous testing, and fail-safe deployments.",
    },
];

export function ValuesGrid() {
    return (
        <section className="bg-carbon-light py-24 lg:py-32 border-y border-gallery/5">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
                <RevealOnScroll className="mb-16 max-w-2xl">
                    <p className="mb-4 font-mono text-xs uppercase tracking-widest text-signal">
                        Core Principles
                    </p>
                    <h2 className="font-heading text-4xl font-bold text-gallery md:text-5xl">
                        The Operating System.
                    </h2>
                </RevealOnScroll>

                <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {values.map((item) => (
                        <motion.div
                            key={item.title}
                            variants={staggerItemVariants}
                            className="group relative border border-gallery/10 bg-carbon p-8 transition-colors hover:border-signal/50"
                        >
                            <div className="mb-6 h-1 w-12 bg-gallery/20 transition-all duration-300 group-hover:w-full group-hover:bg-signal" />
                            <h3 className="mb-4 font-heading text-xl font-bold text-gallery group-hover:text-white">
                                {item.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-text-secondary">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
