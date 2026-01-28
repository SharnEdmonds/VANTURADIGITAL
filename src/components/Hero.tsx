"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScroll, useTransform, motion } from "framer-motion";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const velocity = useScrollVelocity();

    // Velocity skew effect
    const skewX = useTransform(velocity, [-1000, 1000], [-5, 5]);

    // Parallax for video
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-carbon"
        >
            {/* Background Video */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0 h-[130%]"
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                    aria-hidden="true"
                >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-carbon/60 via-carbon/40 to-carbon" />
            </motion.div>

            {/* Main Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 flex h-full flex-col items-center justify-center px-6"
            >
                {/* Eyebrow */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-signal"
                >
                    Digital Engineering Studio
                </motion.p>

                {/* Main headline with velocity skew effect */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{ skewX }}
                    className="text-center font-heading text-[12vw] font-bold uppercase leading-[0.85] tracking-tighter text-gallery md:text-[10vw] lg:text-[8vw]"
                >
                    Vantura
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-6 max-w-xl text-center text-lg leading-relaxed text-text-secondary md:text-xl"
                >
                    High-performance digital without the bloat.
                    Three pillars. Zero waste. Every dollar tracked.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-10 flex flex-wrap items-center justify-center gap-4"
                >
                    <Link
                        href="/contact"
                        aria-label="Start a new project with Vantura Digital"
                        className="inline-flex h-14 items-center justify-center bg-signal px-8 font-heading text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-signal-hover"
                    >
                        Start a Project
                    </Link>
                    <Link
                        href="/services"
                        aria-label="View our services and capabilities"
                        className="inline-flex h-14 items-center justify-center border border-gallery/30 px-8 font-heading text-sm font-bold uppercase tracking-wider text-gallery transition-colors hover:border-signal hover:text-signal"
                    >
                        View Services
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
                        Scroll
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="h-10 w-[1px] bg-gradient-to-b from-gallery/50 to-transparent"
                    />
                </div>
            </motion.div>

            {/* Accessible text */}
            <h2 className="sr-only">Vantura Digital - High-Performance Digital Engineering</h2>
        </section>
    );
}
