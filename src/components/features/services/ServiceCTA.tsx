"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceCTAProps {
    serviceTitle?: string;
}

export function ServiceCTA({ serviceTitle }: ServiceCTAProps) {
    return (
        <section className="bg-carbon py-24 lg:py-32">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 text-center lg:px-8">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 font-mono text-xs uppercase tracking-widest text-signal"
                >
                    Ready to Start?
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-6 font-heading text-4xl font-bold text-gallery md:text-5xl"
                >
                    {serviceTitle
                        ? `Let's build your ${serviceTitle.toLowerCase()} system.`
                        : "Let's engineer your growth."}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-10 max-w-xl text-lg text-text-secondary"
                >
                    Get a free technical audit and a clear roadmap. No commitment — just
                    an honest assessment of where you stand and where you could be.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Link
                        href="/contact"
                        className="inline-block bg-signal px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-signal-hover hover:scale-[1.02]"
                    >
                        Start a Project
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

export default ServiceCTA;
