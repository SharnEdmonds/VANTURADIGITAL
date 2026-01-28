"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function AboutMission() {
    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
                {/* Text Content */}
                <div className="flex flex-col justify-center">
                    <RevealOnScroll>
                        <h2 className="mb-6 font-heading text-3xl font-bold leading-tight text-gallery md:text-4xl">
                            We started Vantura with a simple premise:
                            <span className="text-text-muted"> Most agencies charge for effort, not impact.</span>
                        </h2>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.1}>
                        <p className="mb-8 text-lg leading-relaxed text-text-secondary">
                            We engineered a different model. No account managers playing telephone. No junior teams hiding behind senior partners. Just direct access to the engineers and strategists building your system.
                        </p>
                    </RevealOnScroll>
                    <RevealOnScroll delay={0.2}>
                        <p className="text-lg leading-relaxed text-text-secondary">
                            We measure our success by your P&L, not design awards. If it doesn&apos;t load instantly and convert consistently, it&apos;s decorative noise.
                        </p>
                    </RevealOnScroll>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-px bg-gallery/10 border border-gallery/10">
                    {[
                        { value: "45", label: "Projects Shipped", suffix: "+" },
                        { value: "98", label: "Retention Rate", suffix: "%" },
                        { value: "3.2", label: "Avg ROAS", suffix: "x" },
                        { value: "0", label: "Retainers", suffix: "" },
                    ].map((stat, i) => (
                        <div key={stat.label} className="bg-carbon p-8 md:p-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <p className="font-mono text-4xl font-bold text-signal md:text-5xl">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                </p>
                                <p className="mt-2 text-sm font-medium text-text-muted">
                                    {stat.label}
                                </p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
