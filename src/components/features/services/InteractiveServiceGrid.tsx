"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════
// InteractiveServiceGrid — Premium Bento Grid with Animations
// ═══════════════════════════════════════════════════════════════
// Features:
// - Staggered waterfall entrance animation
// - Hover expand with background video/image reveal
// - Cursor magnetic snap effect (via data attributes)

interface ServiceCardProps {
    title: string;
    description: string;
    className?: string;
    capabilities?: string[];
    index: number;
    videoSrc?: string;
    imageSrc?: string;
}

// Animation variants
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
    hidden: {
        opacity: 0,
        y: 60,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut" as const,
        },
    },
};

function ServiceCard({
    title,
    description,
    className,
    capabilities,
    index,
    videoSrc,
    imageSrc,
}: ServiceCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (isHovered) {
                videoRef.current.play().catch(() => { });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isHovered]);

    return (
        <motion.article
            variants={cardVariants}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-cursor="view"
            className={cn(
                "group relative overflow-hidden border border-gallery/10 bg-carbon p-6 md:p-8",
                "transition-all duration-300 ease-out",
                "hover:border-signal/40 hover:scale-[1.02] hover:z-10",
                className,
            )}
        >
            {/* Background video/image reveal on hover */}
            {(videoSrc || imageSrc) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 0.15 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="pointer-events-none absolute inset-0 z-0"
                >
                    {videoSrc ? (
                        <video
                            ref={videoRef}
                            muted
                            loop
                            playsInline
                            preload="none"
                            className="h-full w-full object-cover"
                        >
                            <source src={videoSrc} type="video/mp4" />
                        </video>
                    ) : imageSrc ? (
                        <Image
                            src={imageSrc}
                            alt=""
                            fill
                            className="object-cover"
                        />
                    ) : null}
                </motion.div>
            )}

            {/* Gradient overlay for contrast */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-carbon via-carbon/80 to-transparent"
            />

            {/* Content */}
            <div className="relative z-10">
                {/* Grid index — Swiss typographic detail */}
                <span className="absolute right-0 top-0 font-mono text-xs text-gallery/20">
                    {String(index + 1).padStart(2, "0")}
                </span>

                {/* Geometric placeholder */}
                <div className="mb-6 aspect-[16/9] w-full overflow-hidden border border-gallery/10 bg-carbon-light">
                    <div className="flex h-full w-full items-center justify-center">
                        <svg
                            viewBox="0 0 160 90"
                            fill="none"
                            className="h-full w-full transition-transform duration-500 group-hover:scale-110"
                            aria-hidden="true"
                        >
                            {/* Base grid lines */}
                            <line x1="40" y1="0" x2="40" y2="90" stroke="#EEEEEE" strokeOpacity="0.06" />
                            <line x1="80" y1="0" x2="80" y2="90" stroke="#EEEEEE" strokeOpacity="0.06" />
                            <line x1="120" y1="0" x2="120" y2="90" stroke="#EEEEEE" strokeOpacity="0.06" />
                            <line x1="0" y1="30" x2="160" y2="30" stroke="#EEEEEE" strokeOpacity="0.06" />
                            <line x1="0" y1="60" x2="160" y2="60" stroke="#EEEEEE" strokeOpacity="0.06" />
                            {/* Focal geometric shape */}
                            <motion.rect
                                x="55"
                                y="20"
                                width="50"
                                height="50"
                                stroke="#EEEEEE"
                                strokeOpacity="0.15"
                                strokeWidth="1"
                                fill="none"
                                animate={{
                                    rotate: isHovered ? 45 : 0,
                                    scale: isHovered ? 0.8 : 1,
                                }}
                                transition={{ duration: 0.5 }}
                                style={{ transformOrigin: "80px 45px" }}
                            />
                            <motion.circle
                                cx="80"
                                cy="45"
                                r="18"
                                stroke="#FF4F00"
                                strokeOpacity={isHovered ? 0.8 : 0.3}
                                strokeWidth="1"
                                fill="none"
                                animate={{ scale: isHovered ? 1.2 : 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        </svg>
                    </div>
                </div>

                <h3 className="mb-2 font-heading text-xl font-bold leading-tight text-gallery transition-colors duration-300 group-hover:text-signal">
                    {title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                    {description}
                </p>

                {capabilities && capabilities.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
                        {capabilities.map((cap) => (
                            <motion.li
                                key={cap}
                                className="border border-gallery/10 bg-carbon-light px-3 py-1 font-mono text-xs text-gallery/60"
                                whileHover={{
                                    borderColor: "rgba(255, 79, 0, 0.4)",
                                    color: "rgba(238, 238, 238, 0.9)",
                                }}
                            >
                                {cap}
                            </motion.li>
                        ))}
                    </ul>
                )}
            </div>
        </motion.article>
    );
}

// ─── Static service data ──────────────────────────────────────
const services = [
    {
        title: "Web Development",
        description:
            "Performance-first engineering. Next.js, React, WordPress themes, custom plugin development, and headless CMS architectures.",
        capabilities: ["Next.js 15", "WordPress", "Shopify", "SiteGround", "Plugin Dev"],
        videoSrc: "/videos/hero.mp4",
    },
    {
        title: "SEO & GEO",
        description:
            "Algorithmic visibility. Technical audits, structured data, and generative engine optimization that compounds.",
        capabilities: ["Technical SEO", "Schema Markup", "GEO", "Core Web Vitals"],
        videoSrc: "/videos/hero.mp4",
    },
    {
        title: "Paid Advertising",
        description:
            "Precision media buying. Data-driven campaigns across search, social, and programmatic channels.",
        capabilities: ["Google Ads", "Meta Ads", "Analytics", "Attribution"],
        videoSrc: "/videos/hero.mp4",
    },
    {
        title: "Analytics & Reporting",
        description:
            "Decisions from data, not opinions. Custom dashboards, conversion tracking, and attribution modeling.",
        capabilities: ["GA4", "Looker Studio", "Tag Manager", "Server-Side"],
        videoSrc: "/videos/hero.mp4",
    },
    {
        title: "Performance Engineering",
        description:
            "Sub-second load times. Image optimization, code splitting, edge caching, and runtime analysis.",
        capabilities: ["Lighthouse 100", "CDN", "Lazy Loading", "WASM"],
        videoSrc: "/videos/hero.mp4",
    },
    {
        title: "Conversion Architecture",
        description:
            "Every interaction engineered for action. A/B testing, funnel optimization, and behavioral analysis.",
        capabilities: ["A/B Testing", "Heatmaps", "Funnels", "CRO"],
        videoSrc: "/videos/hero.mp4",
    },
];

export function InteractiveServiceGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
            {/* Section header */}
            <div className="mb-16 max-w-3xl">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-4 font-mono text-xs uppercase tracking-widest text-signal"
                >
                    Service Architecture
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-4 font-heading text-4xl font-bold leading-tight tracking-tight text-gallery md:text-5xl"
                >
                    Six Pillars.
                    <br />
                    Zero Bloat.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg leading-relaxed text-text-secondary"
                >
                    Every capability engineered for measurable impact. No filler services,
                    no creative fluff — functional systems that compound results.
                </motion.p>
            </div>

            {/* Bento Grid with staggered animation */}
            <motion.div
                ref={containerRef}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid auto-rows-auto gap-[1px] border border-gallery/10 bg-gallery/5 md:grid-cols-2 lg:grid-cols-4"
            >
                {/* Web Dev — hero card, spans 2 cols + 2 rows */}
                <ServiceCard
                    index={0}
                    title={services[0].title}
                    description={services[0].description}
                    capabilities={services[0].capabilities}
                    videoSrc={services[0].videoSrc}
                    className="md:col-span-2 lg:row-span-2"
                />

                {/* SEO & GEO */}
                <ServiceCard
                    index={1}
                    title={services[1].title}
                    description={services[1].description}
                    capabilities={services[1].capabilities}
                    videoSrc={services[1].videoSrc}
                />

                {/* Paid Advertising */}
                <ServiceCard
                    index={2}
                    title={services[2].title}
                    description={services[2].description}
                    capabilities={services[2].capabilities}
                    videoSrc={services[2].videoSrc}
                />

                {/* Analytics — spans 2 cols */}
                <ServiceCard
                    index={3}
                    title={services[3].title}
                    description={services[3].description}
                    capabilities={services[3].capabilities}
                    videoSrc={services[3].videoSrc}
                    className="md:col-span-2"
                />

                {/* Performance */}
                <ServiceCard
                    index={4}
                    title={services[4].title}
                    description={services[4].description}
                    capabilities={services[4].capabilities}
                    videoSrc={services[4].videoSrc}
                />

                {/* Conversion Architecture — spans 3 cols on desktop */}
                <ServiceCard
                    index={5}
                    title={services[5].title}
                    description={services[5].description}
                    capabilities={services[5].capabilities}
                    videoSrc={services[5].videoSrc}
                    className="md:col-span-2 lg:col-span-3"
                />
            </motion.div>
        </section>
    );
}

export default InteractiveServiceGrid;
