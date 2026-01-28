"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

// ═══════════════════════════════════════════════════════════════
// ProcessTimeline — Vertical Process Steps
// ═══════════════════════════════════════════════════════════════

const steps = [
    {
        number: "01",
        title: "Technical Discovery",
        description: "Deep-dive audit of your current stack, performance metrics, and market positioning. We identify the bottlenecks blocking growth.",
    },
    {
        number: "02",
        title: "Strategic Architecture",
        description: "We map out the solution. Tech stack selection, data schema design, and conversion funnels. Nothing is left to guesswork.",
    },
    {
        number: "03",
        title: "Agile Execution",
        description: "Rapid development sprints. Weekly demos. Continuous deployment. You see progress in real-time, not just at the deadline.",
    },
    {
        number: "04",
        title: "Optimization & Scale",
        description: "Launch is just the starting line. We analyze user data, refine conversion paths, and scale what works.",
    },
];

export function ProcessTimeline() {
    return (
        <section className="bg-carbon py-24 lg:py-32">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="mb-20 grid gap-12 lg:grid-cols-2">
                    <RevealOnScroll>
                        <h2 className="font-heading text-4xl font-bold leading-tight text-gallery md:text-5xl">
                            The Vantura
                            <br />
                            <span className="text-text-muted">Methodology.</span>
                        </h2>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.1}>
                        <p className="text-lg leading-relaxed text-text-secondary">
                            We ditched the agency bloat for engineering precision. A linear, transparent process designed to move fast and break nothing.
                        </p>
                    </RevealOnScroll>
                </div>

                <div className="relative border-l border-gallery/10 pl-8 md:pl-16">
                    {/* Timeline logic */}
                    {steps.map((step, i) => (
                        <div key={step.number} className="relative mb-16 last:mb-0">
                            {/* Timeline dot */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="absolute -left-[41px] top-2 flex h-5 w-5 items-center justify-center rounded-full bg-carbon ring-1 ring-gallery/20 md:-left-[73px]"
                            >
                                <div className="h-2 w-2 rounded-full bg-signal" />
                            </motion.div>

                            <RevealOnScroll delay={i * 0.1 + 0.1}>
                                <div className="group grid gap-6 md:grid-cols-12 md:gap-10">
                                    <div className="md:col-span-3">
                                        <span className="font-mono text-xl font-bold text-gallery/40 transition-colors group-hover:text-signal">
                                            {step.number}
                                        </span>
                                    </div>
                                    <div className="md:col-span-9">
                                        <h3 className="mb-4 font-heading text-2xl font-bold text-gallery">
                                            {step.title}
                                        </h3>
                                        <p className="max-w-2xl text-text-secondary">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProcessTimeline;
