"use client";

import { motion } from "framer-motion";
import { RevealOnScroll, StaggerContainer, staggerItemVariants } from "@/components/ui/RevealOnScroll";

const values = [
    {
        title: "Radical Transparency",
        desc: "You see the code, the ad account, and the raw data. No black boxes. We treat your budget like our own inheritance.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
    },
    {
        title: "Engineering First",
        desc: "Marketing problems often have engineering solutions. We solve for scalability and automation, not just quick fixes.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
    },
    {
        title: "Speed as a Feature",
        desc: "Slow sites kill conversion. We obsess over milliseconds. 100/100 Lighthouse scores aren't a goal; they're the baseline.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
    },
    {
        title: "Anti-Fragile",
        desc: "We build systems that get stronger with stress. Redundant backups, rigorous testing, and fail-safe deployments.",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
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
                            {/* Hover gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-signal/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="relative z-10">
                                {/* Icon with rotation on hover */}
                                <motion.div
                                    className="mb-6 text-gallery/30 transition-colors duration-300 group-hover:text-signal"
                                    whileHover={{ rotate: 15 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                >
                                    {item.icon}
                                </motion.div>

                                <div className="mb-6 h-1 w-12 bg-gallery/20 transition-all duration-300 group-hover:w-full group-hover:bg-signal" />
                                <h3 className="mb-4 font-heading text-xl font-bold text-gallery group-hover:text-white">
                                    {item.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-text-secondary">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
