"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ═══════════════════════════════════════════════════════════════
// PageHero — Animated Header for Inner Pages
// ═══════════════════════════════════════════════════════════════

interface PageHeroProps {
    title: string;
    subtitle: string;
    label?: string;
    align?: "left" | "center";
}

export function PageHero({
    title,
    subtitle,
    label,
    align = "left",
}: PageHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-[60vh] items-center overflow-hidden bg-carbon pt-20"
        >
            {/* Background Parallax Element */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0 flex items-center justify-center opacity-20"
            >
                <div className="h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle_at_center,var(--color-signal)_0%,transparent_70%)] blur-[120px]" />
            </motion.div>

            <div className="container relative z-10 mx-auto px-6 lg:px-8">
                <div className={`max-w-4xl ${align === "center" ? "mx-auto text-center" : ""}`}>
                    {label && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="mb-6 font-mono text-xs uppercase tracking-widest text-signal"
                        >
                            {label}
                        </motion.p>
                    )}

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="mb-8 font-heading text-5xl font-bold leading-tight tracking-tight text-gallery md:text-7xl lg:text-8xl"
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="max-w-2xl text-xl leading-relaxed text-text-secondary md:text-2xl"
                    >
                        {subtitle}
                    </motion.p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="h-12 w-[1px] bg-gradient-to-b from-gallery/20 to-transparent" />
            </motion.div>
        </section>
    );
}

export default PageHero;
