"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ═══════════════════════════════════════════════════════════════
// ScrollMarquee — Scroll-Driven Text Movement
// ═══════════════════════════════════════════════════════════════
// Text ONLY moves when you scroll
// Scrolling down = text moves left
// Scrolling up = text moves right

interface ScrollMarqueeProps {
    children: React.ReactNode;
    direction?: 1 | -1;
    className?: string;
}

export function ScrollMarquee({
    children,
    direction = 1,
    className = "",
}: ScrollMarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Smooth the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    });

    // Transform scroll progress to horizontal movement
    // As you scroll through the section, the text moves
    const x = useTransform(
        smoothProgress,
        [0, 1],
        [direction > 0 ? "0%" : "-25%", direction > 0 ? "-25%" : "0%"]
    );

    return (
        <div
            ref={containerRef}
            className={`overflow-hidden whitespace-nowrap ${className}`}
        >
            <motion.div className="inline-flex" style={{ x }}>
                {/* Duplicate content 4 times for seamless loop */}
                <span className="inline-flex gap-8 pr-8">{children}</span>
                <span className="inline-flex gap-8 pr-8">{children}</span>
                <span className="inline-flex gap-8 pr-8">{children}</span>
                <span className="inline-flex gap-8 pr-8">{children}</span>
            </motion.div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════
// MarqueeSection — Pre-styled section with default content
// ═══════════════════════════════════════════════════════════════

const defaultItems = [
    "STRATEGY",
    "DESIGN",
    "DEVELOPMENT",
    "OPTIMIZATION",
    "PERFORMANCE",
    "GROWTH",
];

interface MarqueeSectionProps {
    items?: string[];
}

export function MarqueeSection({ items = defaultItems }: MarqueeSectionProps) {
    return (
        <section className="border-y border-gallery/10 bg-carbon py-8 md:py-12">
            {/* First row - moves left on scroll down */}
            <ScrollMarquee direction={1}>
                {items.map((item, index) => (
                    <span
                        key={`${item}-${index}`}
                        className="font-heading text-5xl font-bold uppercase tracking-tight text-gallery/10 md:text-7xl lg:text-8xl"
                    >
                        {item}
                        <span className="mx-8 text-signal">—</span>
                    </span>
                ))}
            </ScrollMarquee>

            {/* Second row - moves right on scroll down (opposite) */}
            <ScrollMarquee direction={-1} className="mt-4">
                {items.map((item, index) => (
                    <span
                        key={`${item}-rev-${index}`}
                        className="font-heading text-5xl font-bold uppercase tracking-tight text-gallery/10 md:text-7xl lg:text-8xl"
                    >
                        {item}
                        <span className="mx-8 text-signal">—</span>
                    </span>
                ))}
            </ScrollMarquee>
        </section>
    );
}

export default ScrollMarquee;
