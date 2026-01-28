"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Capability {
    _key: string;
    title: string;
    description: string;
}

interface ServiceCapabilitiesProps {
    capabilities: Capability[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
};

export function ServiceCapabilities({ capabilities }: ServiceCapabilitiesProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="mb-4 font-mono text-xs uppercase tracking-widest text-signal"
            >
                Capabilities
            </motion.p>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-16 font-heading text-4xl font-bold text-gallery md:text-5xl"
            >
                What We Deliver.
            </motion.h2>

            <motion.div
                ref={containerRef}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid gap-[1px] border border-gallery/10 bg-gallery/5 md:grid-cols-2 lg:grid-cols-3"
            >
                {capabilities.map((cap, i) => (
                    <motion.div
                        key={cap._key}
                        variants={cardVariants}
                        className="group relative bg-carbon p-8 transition-all duration-300 hover:bg-carbon-light"
                    >
                        {/* Number */}
                        <motion.span
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.4,
                                delay: i * 0.05,
                                type: "spring",
                                stiffness: 300,
                                damping: 15,
                            }}
                            className="mb-4 block font-mono text-3xl font-bold text-gallery/10 transition-all duration-300 group-hover:text-signal/30 group-hover:scale-110"
                        >
                            {String(i + 1).padStart(2, "0")}
                        </motion.span>

                        <h3 className="mb-3 font-heading text-lg font-bold text-gallery transition-colors group-hover:text-signal">
                            {cap.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-text-secondary">
                            {cap.description}
                        </p>

                        {/* Hover border accent */}
                        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-signal transition-all duration-300 group-hover:w-full" />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

export default ServiceCapabilities;
