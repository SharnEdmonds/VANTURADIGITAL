"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface BlogPostHeroClientProps {
    children: React.ReactNode;
}

export function BlogPostHeroClient({ children }: BlogPostHeroClientProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <div ref={containerRef} className="relative overflow-hidden">
            {/* Parallax glow */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0 flex items-center justify-center"
            >
                <div className="h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,var(--color-signal)_0%,transparent_70%)] opacity-15 blur-[120px]" />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
}
