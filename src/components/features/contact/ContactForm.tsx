"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FormData {
    name: string;
    email: string;
    company: string;
    service: string;
    budget: string;
    message: string;
}

const formFields: (keyof FormData)[] = ["name", "email", "company", "service", "budget", "message"];

export function ContactForm() {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        company: "",
        service: "",
        budget: "",
        message: "",
    });
    // Honeypot field for anti-spam (invisible to users, bots fill it in)
    const [honeypot, setHoneypot] = useState("");
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, boolean>>>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const filledCount = Object.values(formData).filter((v) => v.length > 0).length;
    const totalFields = formFields.length;
    const progressPercent = (filledCount / totalFields) * 100;

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: false }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        const newErrors: Partial<Record<keyof FormData, boolean>> = {};
        if (!formData.name) newErrors.name = true;
        if (!formData.email) newErrors.email = true;
        if (!formData.message) newErrors.message = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, _honeypot: honeypot }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Something went wrong");
            }

            setIsSuccess(true);
        } catch (err) {
            setSubmitError(
                err instanceof Error ? err.message : "Failed to send message. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses =
        "w-full bg-carbon-light border-0 p-4 text-sm text-gallery placeholder:text-text-muted focus:ring-0 focus:outline-none transition-all duration-300";

    const renderField = (
        name: keyof FormData,
        label: string,
        type: "input" | "select" | "textarea",
        props?: Record<string, unknown>
    ) => {
        const hasError = errors[name];
        return (
            <div className="group relative">
                <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                    {label}
                </label>
                <motion.div
                    className={cn(
                        "relative overflow-hidden rounded-sm border transition-colors",
                        hasError
                            ? "border-red-500"
                            : focusedField === name
                                ? "border-signal"
                                : "border-gallery/10"
                    )}
                    animate={hasError ? { x: [0, -4, 4, -4, 4, 0] } : {}}
                    transition={{ duration: 0.4 }}
                >
                    {type === "textarea" ? (
                        <textarea
                            rows={6}
                            required
                            className={inputClasses}
                            value={formData[name]}
                            onChange={(e) => handleChange(name, e.target.value)}
                            onFocus={() => setFocusedField(name)}
                            onBlur={() => setFocusedField(null)}
                            {...props}
                        />
                    ) : type === "select" ? (
                        <select
                            className={inputClasses}
                            value={formData[name]}
                            onChange={(e) => handleChange(name, e.target.value)}
                            onFocus={() => setFocusedField(name)}
                            onBlur={() => setFocusedField(null)}
                            {...props}
                        >
                            {(props?.children as React.ReactNode)}
                        </select>
                    ) : (
                        <input
                            type={name === "email" ? "email" : "text"}
                            required={name === "name" || name === "email"}
                            className={inputClasses}
                            value={formData[name]}
                            onChange={(e) => handleChange(name, e.target.value)}
                            onFocus={() => setFocusedField(name)}
                            onBlur={() => setFocusedField(null)}
                            {...props}
                        />
                    )}
                    {focusedField === name && (
                        <motion.div
                            layoutId="focus-glow"
                            className="absolute inset-0 pointer-events-none border border-signal"
                            transition={{ duration: 0.2 }}
                        />
                    )}
                </motion.div>
            </div>
        );
    };

    return (
        <div className="relative">
            {/* Progress indicator */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                        Form completion
                    </span>
                    <span className="font-mono text-[10px] text-signal">
                        {filledCount}/{totalFields}
                    </span>
                </div>
                <div className="h-[2px] w-full bg-gallery/10 overflow-hidden">
                    <motion.div
                        className="h-full bg-signal"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-signal/20 bg-carbon text-center"
                    >
                        {/* Animated expanding checkmark */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                            className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-signal/10 text-signal"
                        >
                            <motion.svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <motion.polyline
                                    points="20 6 9 17 4 12"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                />
                            </motion.svg>
                        </motion.div>
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-2 font-heading text-2xl font-bold text-gallery"
                        >
                            Message Received
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="max-w-xs text-text-secondary"
                        >
                            We&apos;ll be in touch within 24 hours with your technical audit.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-4 max-w-xs text-xs text-text-muted bg-gallery/5 p-3 rounded"
                        >
                            <strong>Note:</strong> Please check your junk/spam folder if you don&apos;t see our confirmation email immediately.
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.form
                        ref={formRef}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        {/* Honeypot field - hidden from users, bots fill it in */}
                        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}>
                            <label htmlFor="website">Website</label>
                            <input
                                type="text"
                                id="website"
                                name="website"
                                tabIndex={-1}
                                autoComplete="off"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {renderField("name", "Name", "input", {
                                placeholder: "Jane Smith",
                            })}
                            {renderField("email", "Email", "input", {
                                placeholder: "jane@company.com",
                            })}
                        </div>

                        {renderField("company", "Company", "input", {
                            placeholder: "Company name",
                        })}

                        <div className="grid gap-6 sm:grid-cols-2">
                            {renderField("service", "Service Interest", "select", {
                                children: (
                                    <>
                                        <option value="">Select a service</option>
                                        <option value="web-development">Web Development</option>
                                        <option value="seo-geo">SEO & GEO</option>
                                        <option value="paid-advertising">Paid Advertising</option>
                                        <option value="audit">Technical Audit</option>
                                    </>
                                ),
                            })}
                            {renderField("budget", "Budget Range", "select", {
                                children: (
                                    <>
                                        <option value="">Select a range</option>
                                        <option value="pilot">Pilot Build (Retainer Only)</option>
                                        <option value="2k-5k">$2k - $5k</option>
                                        <option value="5k-10k">$5k - $10k</option>
                                        <option value="10k-15k">$10k - $15k</option>
                                        <option value="15k+">$15k+</option>
                                    </>
                                ),
                            })}
                        </div>

                        {renderField("message", "Project Details", "textarea", {
                            placeholder:
                                "Tell us about your goals, timeline, and current pain points...",
                        })}

                        {submitError && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-red-400 border border-red-400/20 bg-red-400/5 px-4 py-3"
                            >
                                {submitError}
                            </motion.p>
                        )}

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
