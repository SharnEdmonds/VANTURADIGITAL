"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function LeadCaptureSection() {
    return (
        <section className="bg-carbon py-24 lg:py-32">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="relative overflow-hidden border border-gallery/10 bg-carbon-light px-6 py-16 text-center md:px-16 md:py-24">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-signal/5 via-transparent to-transparent opacity-50" />

                    <div className="relative z-10 mx-auto max-w-3xl">
                        <RevealOnScroll>
                            <h2 className="mb-6 font-heading text-4xl font-bold leading-tight text-gallery md:text-5xl">
                                Ready to stop guessing?
                            </h2>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.1}>
                            <p className="mb-10 text-lg leading-relaxed text-text-secondary">
                                Get a comprehensive technical audit of your current stack. No sales fluff. Just raw data and a path to performance.
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.2}>
                            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Link
                                    href="/contact"
                                    className="inline-flex h-14 min-w-[200px] items-center justify-center bg-signal px-8 font-heading text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-signal-hover hover:scale-105"
                                >
                                    Get Your Audit
                                </Link>
                                <Link
                                    href="/services"
                                    className="inline-flex h-14 min-w-[200px] items-center justify-center border border-gallery/10 px-8 font-heading text-sm font-bold uppercase tracking-wider text-gallery transition-all hover:border-signal hover:text-signal"
                                >
                                    Explore Services
                                </Link>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LeadCaptureSection;
