"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function ContactForm() {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const inputClasses =
        "w-full bg-carbon-light border-0 p-4 text-sm text-gallery placeholder:text-text-muted focus:ring-0 focus:outline-none transition-all duration-300";

    return (
        <div className="relative">
            <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-signal/20 bg-carbon text-center"
                    >
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-signal/10 text-signal">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h3 className="mb-2 font-heading text-2xl font-bold text-gallery">
                            Message Received
                        </h3>
                        <p className="max-w-xs text-text-secondary">
                            We&apos;ll be in touch within 24 hours with your technical audit.
                        </p>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="group relative">
                                <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                                    Name
                                </label>
                                <div className="relative overflow-hidden rounded-sm border border-gallery/10 transition-colors focus-within:border-signal">
                                    <input
                                        type="text"
                                        required
                                        className={inputClasses}
                                        placeholder="Jane Smith"
                                        onFocus={() => setFocusedField("name")}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                    {focusedField === "name" && (
                                        <motion.div
                                            layoutId="focus-glow"
                                            className="absolute inset-0 pointer-events-none border border-signal"
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="group relative">
                                <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                                    Email
                                </label>
                                <div className="relative overflow-hidden rounded-sm border border-gallery/10 transition-colors focus-within:border-signal">
                                    <input
                                        type="email"
                                        required
                                        className={inputClasses}
                                        placeholder="jane@company.com"
                                        onFocus={() => setFocusedField("email")}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                    {focusedField === "email" && (
                                        <motion.div
                                            layoutId="focus-glow"
                                            className="absolute inset-0 pointer-events-none border border-signal"
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="group relative">
                            <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                                Company
                            </label>
                            <div className="relative overflow-hidden rounded-sm border border-gallery/10 transition-colors focus-within:border-signal">
                                <input
                                    type="text"
                                    className={inputClasses}
                                    placeholder="Company name"
                                    onFocus={() => setFocusedField("company")}
                                    onBlur={() => setFocusedField(null)}
                                />
                                {focusedField === "company" && (
                                    <motion.div
                                        layoutId="focus-glow"
                                        className="absolute inset-0 pointer-events-none border border-signal"
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="group relative">
                                <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                                    Service Interest
                                </label>
                                <div className="relative overflow-hidden rounded-sm border border-gallery/10 transition-colors focus-within:border-signal">
                                    <select
                                        className={inputClasses}
                                        defaultValue=""
                                        onFocus={() => setFocusedField("service")}
                                        onBlur={() => setFocusedField(null)}
                                    >
                                        <option value="" disabled>
                                            Select a service
                                        </option>
                                        <option value="web-development">Web Development</option>
                                        <option value="seo-geo">SEO & GEO</option>
                                        <option value="paid-advertising">Paid Advertising</option>
                                        <option value="audit">Technical Audit</option>
                                    </select>
                                    {focusedField === "service" && (
                                        <motion.div
                                            layoutId="focus-glow"
                                            className="absolute inset-0 pointer-events-none border border-signal"
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="group relative">
                                <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                                    Budget Range
                                </label>
                                <div className="relative overflow-hidden rounded-sm border border-gallery/10 transition-colors focus-within:border-signal">
                                    <select
                                        className={inputClasses}
                                        defaultValue=""
                                        onFocus={() => setFocusedField("budget")}
                                        onBlur={() => setFocusedField(null)}
                                    >
                                        <option value="" disabled>
                                            Select a range
                                        </option>
                                        <option value="5k-10k">$5k - $10k</option>
                                        <option value="10k-25k">$10k - $25k</option>
                                        <option value="25k-50k">$25k - $50k</option>
                                        <option value="50k+">$50k+</option>
                                    </select>
                                    {focusedField === "budget" && (
                                        <motion.div
                                            layoutId="focus-glow"
                                            className="absolute inset-0 pointer-events-none border border-signal"
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="group relative">
                            <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                                Project Details
                            </label>
                            <div className="relative overflow-hidden rounded-sm border border-gallery/10 transition-colors focus-within:border-signal">
                                <textarea
                                    rows={6}
                                    required
                                    className={inputClasses}
                                    placeholder="Tell us about your goals, timeline, and current pain points..."
                                    onFocus={() => setFocusedField("message")}
                                    onBlur={() => setFocusedField(null)}
                                />
                                {focusedField === "message" && (
                                    <motion.div
                                        layoutId="focus-glow"
                                        className="absolute inset-0 pointer-events-none border border-signal"
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                                "relative flex h-14 w-full items-center justify-center overflow-hidden bg-signal text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-signal-hover disabled:opacity-70",
                                isSubmitting && "cursor-wait"
                            )}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    <span>Processing...</span>
                                </div>
                            ) : (
                                "Start Project"
                            )}
                        </motion.button>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}

export default ContactForm;
