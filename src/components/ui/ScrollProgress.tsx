"use client";

import { motion, useScroll, useSpring } from "framer-motion";

// ═══════════════════════════════════════════════════════════════
// ScrollProgress — Minimal Vertical Progress Indicator
// ═══════════════════════════════════════════════════════════════
// Replaces native scrollbar with a slim, elegant progress bar
// fixed to the right edge of the viewport.

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed right-0 top-0 z-50 h-screen w-[3px] origin-top bg-signal"
            style={{ scaleY }}
            aria-hidden="true"
        />
    );
}

export default ScrollProgress;
