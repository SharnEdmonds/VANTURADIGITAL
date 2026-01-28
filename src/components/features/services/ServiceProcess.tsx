"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
    {
        number: "01",
        title: "Discovery & Audit",
        description:
            "We analyze your current setup, identify gaps, and map the opportunity landscape specific to this service area.",
    },
    {
        number: "02",
        title: "Strategy & Architecture",
        description:
            "Custom roadmap designed around your business goals. No cookie-cutter templates — engineered solutions only.",
    },
    {
        number: "03",
        title: "Build & Execute",
        description:
            "Rapid sprints with weekly demos. You see measurable progress in real time, not just at project milestones.",
    },
    {
        number: "04",
        title: "Optimize & Scale",
        description:
            "Data-driven refinement post-launch. We analyze, iterate, and scale what works for compounding returns.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

const stepVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
};

export function ServiceProcess() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section className="bg-carbon-light py-24 lg:py-32 border-y border-gallery/5">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
                <div className="mb-16 max-w-2xl">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        className="mb-4 font-mono text-xs uppercase tracking-widest text-signal"
                    >
                        Our Process
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                        className="font-heading text-4xl font-bold text-gallery md:text-5xl"
                    >
                        How We Work.
                    </motion.h2>
                </div>

                <motion.div
                    ref={containerRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
                >
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            variants={stepVariants}
                            className="group relative border border-gallery/10 bg-carbon p-8 transition-all duration-300 hover:border-signal/30 hover:bg-carbon"
                        >
                            {/* Step number with bounce */}
                            <motion.span
                                initial={{ scale: 0.5, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: i * 0.1,
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 12,
                                }}
                                className="mb-6 block font-mono text-4xl font-bold text-gallery/10 transition-colors duration-300 group-hover:text-signal/40"
                            >
                                {step.number}
                            </motion.span>

                            <h3 className="mb-3 font-heading text-lg font-bold text-gallery transition-colors group-hover:text-signal">
                                {step.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-text-secondary">
                                {step.description}
                            </p>

                            {/* Bottom accent line */}
                            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-signal transition-all duration-300 group-hover:w-full" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default ServiceProcess;
