"use client";

import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const technologies = [
    "Next.js 15", "React 19", "TypeScript", "Tailwind CSS",
    "Framer Motion", "Sanity CMS", "Supabase", "Vercel",
    "PostgreSQL", "GraphQL", "Redis", "Docker"
];

export function TechStack() {
    return (
        <section className="bg-carbon py-24 border-t border-gallery/5">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 text-center">
                <RevealOnScroll>
                    <p className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
                        The Arsenal
                    </p>
                    <h2 className="mb-12 font-heading text-3xl font-bold text-gallery">
                        Modern Stack. <span className="text-signal">Zero Legacy.</span>
                    </h2>
                </RevealOnScroll>

                <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                    {technologies.map((tech, i) => (
                        <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.3 }}
                            whileHover={{
                                y: -5,
                                backgroundColor: "rgba(255, 79, 0, 0.1)",
                                borderColor: "rgba(255, 79, 0, 0.5)"
                            }}
                            className="cursor-default rounded-full border border-gallery/10 bg-carbon-light px-6 py-3 font-mono text-sm text-text-secondary transition-colors hover:text-signal"
                        >
                            {tech}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
