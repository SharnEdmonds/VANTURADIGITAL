"use client";

import { motion } from "framer-motion";
import { MagneticElement } from "@/components/ui/MagneticElement";

const nextSteps = [
    "We review your inquiry and assess technical fit",
    "30-minute discovery call to understand your goals",
    "Free technical audit delivered within 48 hours",
    "Proposal with clear scope, timeline, and pricing",
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const },
    },
};

export function ContactSidebar() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-12"
        >
            <motion.div variants={itemVariants} className="space-y-2">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-gallery">
                    Email
                </h3>
                <MagneticElement strength={0.2} radius={150}>
                    <a
                        href="mailto:hello@vanturadigital.co.nz"
                        className="transition-colors hover:text-signal"
                    >
                        hello@vanturadigital.co.nz
                    </a>
                </MagneticElement>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-gallery">
                    What Happens Next
                </h3>
                <ul className="space-y-6">
                    {nextSteps.map((step, i) => (
                        <motion.li
                            key={i}
                            className="flex gap-4 group"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                        >
                            <motion.span
                                initial={{ scale: 0.5 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: i * 0.1 + 0.3,
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 12,
                                }}
                                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-signal font-mono text-xs text-signal transition-all group-hover:bg-signal group-hover:text-white"
                            >
                                {i + 1}
                            </motion.span>
                            <span className="text-sm text-text-secondary">
                                {step}
                            </span>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="group border border-gallery/10 bg-carbon-light p-8 transition-all duration-300 hover:border-signal/30"
                whileHover={{
                    background: "linear-gradient(135deg, rgba(255,79,0,0.03) 0%, rgba(26,26,27,1) 100%)",
                }}
            >
                <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-gallery">
                    Free Audit Offer
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                    Every new inquiry receives a complimentary technical audit
                    covering your site performance, SEO health, and advertising
                    opportunities. No strings attached.
                </p>
            </motion.div>
        </motion.div>
    );
}
