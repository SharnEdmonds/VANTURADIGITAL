"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ═══════════════════════════════════════════════════════════════
// DeviceShowcase — Clean Portfolio Display with 3D Effects
// ═══════════════════════════════════════════════════════════════
// Features:
// - Clean two-column layout: text left, devices right
// - Smooth parallax on scroll
// - Subtle 3D tilt effect on devices
// - No content overlap
// - Larger, more prominent device mockups

export function DeviceShowcase() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Smooth spring for premium feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    });

    // Different parallax speeds for depth
    const macbookY = useTransform(smoothProgress, [0, 1], [60, -60]);
    const iphoneY = useTransform(smoothProgress, [0, 1], [100, -100]);

    // Subtle rotation based on scroll
    const macbookRotate = useTransform(smoothProgress, [0, 0.5, 1], [2, 0, -2]);
    const iphoneRotate = useTransform(smoothProgress, [0, 0.5, 1], [-3, 0, 3]);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-carbon py-24 lg:py-32"
        >
            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                {/* Two-column layout */}
                <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">

                    {/* Left column - Text content */}
                    <div className="max-w-xl">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-4 font-mono text-xs uppercase tracking-widest text-signal"
                        >
                            Portfolio
                        </motion.p>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mb-6 font-heading text-4xl font-bold leading-tight tracking-tight text-gallery md:text-5xl"
                        >
                            Precision Engineering.
                            <br />
                            Proven Results.
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mb-8 text-lg leading-relaxed text-text-secondary"
                        >
                            Every project is a technical case study. Performance metrics,
                            conversion lifts, and revenue impact — documented and verified.
                        </motion.p>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mb-10 grid grid-cols-3 gap-6 border-t border-gallery/10 pt-8"
                        >
                            <div>
                                <p className="font-mono text-2xl font-bold text-signal">24+</p>
                                <p className="mt-1 text-sm text-text-muted">Projects Delivered</p>
                            </div>
                            <div>
                                <p className="font-mono text-2xl font-bold text-signal">3.2x</p>
                                <p className="mt-1 text-sm text-text-muted">Avg. Growth</p>
                            </div>
                            <div>
                                <p className="font-mono text-2xl font-bold text-signal">96</p>
                                <p className="mt-1 text-sm text-text-muted">Lighthouse Score</p>
                            </div>
                        </motion.div>

                        <motion.a
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            href="/services"
                            className="group inline-flex items-center gap-3 font-heading text-sm font-bold uppercase tracking-wider text-signal transition-colors hover:text-signal-light"
                            data-cursor="view"
                        >
                            View All Case Studies
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="transition-transform group-hover:translate-x-1"
                                aria-hidden="true"
                            >
                                <path
                                    d="M3 8h10M9 4l4 4-4 4"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="square"
                                />
                            </svg>
                        </motion.a>
                    </div>

                    {/* Right column - Device mockups (responsive) */}
                    <div className="relative h-[500px] md:h-[550px] lg:h-[700px]" style={{ perspective: "2000px" }}>

                        {/* MacBook - desktop only, much larger */}
                        <motion.div
                            style={{
                                y: macbookY,
                                rotateY: macbookRotate,
                            }}
                            className="absolute left-1/2 top-1/2 z-10 hidden w-full max-w-[900px] -translate-x-1/2 -translate-y-1/2 md:block"
                            data-cursor="view"
                        >
                            <Image
                                src="/images/mockup-macbook.png"
                                alt="Portfolio project on MacBook Pro"
                                width={900}
                                height={563}
                                className="drop-shadow-[0_35px_70px_rgba(0,0,0,0.6)]"
                                priority
                            />
                        </motion.div>

                        {/* iPhone - mobile only, centered and larger */}
                        <motion.div
                            style={{
                                y: iphoneY,
                                rotateY: iphoneRotate,
                            }}
                            className="absolute left-1/2 top-1/2 z-20 w-[90%] max-w-[420px] -translate-x-1/2 -translate-y-1/2 md:hidden"
                            data-cursor="view"
                        >
                            <Image
                                src="/images/mockup-iphone.png"
                                alt="Portfolio project on iPhone"
                                width={320}
                                height={640}
                                className="drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                                priority
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DeviceShowcase;
