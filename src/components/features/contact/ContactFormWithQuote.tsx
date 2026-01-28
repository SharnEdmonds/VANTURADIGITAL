"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════
// Pricing Data (shared with PriceEstimator)
// ═══════════════════════════════════════════════════════════════

interface Package {
    id: string;
    name: string;
    label: string;
    upfront: number;
    monthly: number;
    note?: string;
}

interface AddOn {
    id: string;
    name: string;
    setup: number;
    monthly: number;
}

const packages: Package[] = [
    { id: "starter", name: "Starter", label: "Essential Infrastructure", upfront: 2400, monthly: 150 },
    { id: "business", name: "Business", label: "Business Engine", upfront: 4800, monthly: 200 },
    { id: "ecommerce", name: "Ecommerce", label: "Revenue Scale", upfront: 9200, monthly: 300 },
    { id: "pilot", name: "The Pilot", label: "Partnership Build", upfront: 0, monthly: 150, note: "3-month minimum" },
];

const addOns: AddOn[] = [
    { id: "seo", name: "SEO & GEO Foundation", setup: 1200, monthly: 950 },
    { id: "ads", name: "Google Ads Architecture", setup: 850, monthly: 600 },
    { id: "gbp", name: "GBP Optimization", setup: 350, monthly: 150 },
];

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-NZ", {
        style: "currency",
        currency: "NZD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

// ═══════════════════════════════════════════════════════════════
// Form Data Interface
// ═══════════════════════════════════════════════════════════════

interface ContactFormData {
    name: string;
    email: string;
    company: string;
    message: string;
}

export function ContactFormWithQuote() {
    // Quote state
    const [selectedPackage, setSelectedPackage] = useState<string>("");
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

    // Form state
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        company: "",
        message: "",
    });
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, boolean>>>({});
    const [honeypot, setHoneypot] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Calculate totals
    const { totalUpfront, totalMonthly, selectedPackageData, selectedAddOnData } = useMemo(() => {
        const pkg = packages.find((p) => p.id === selectedPackage);
        const addOnTotals = selectedAddOns.reduce(
            (acc, id) => {
                const addOn = addOns.find((a) => a.id === id);
                if (addOn) {
                    acc.setup += addOn.setup;
                    acc.monthly += addOn.monthly;
                }
                return acc;
            },
            { setup: 0, monthly: 0 }
        );

        return {
            totalUpfront: (pkg?.upfront ?? 0) + addOnTotals.setup,
            totalMonthly: (pkg?.monthly ?? 0) + addOnTotals.monthly,
            selectedPackageData: pkg,
            selectedAddOnData: selectedAddOns.map(id => addOns.find(a => a.id === id)).filter(Boolean) as AddOn[],
        };
    }, [selectedPackage, selectedAddOns]);

    const toggleAddOn = (id: string) => {
        setSelectedAddOns((prev) =>
            prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
        );
    };

    const handleChange = (field: keyof ContactFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: false }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const newErrors: Partial<Record<keyof ContactFormData, boolean>> = {};
        if (!formData.name) newErrors.name = true;
        if (!formData.email) newErrors.email = true;
        if (!formData.message) newErrors.message = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        // Build quote summary for email
        const quoteSummary = selectedPackageData
            ? {
                package: selectedPackageData.name,
                packageLabel: selectedPackageData.label,
                packageUpfront: selectedPackageData.upfront,
                packageMonthly: selectedPackageData.monthly,
                addOns: selectedAddOnData.map(a => ({
                    name: a.name,
                    setup: a.setup,
                    monthly: a.monthly,
                })),
                totalUpfront,
                totalMonthly,
            }
            : null;

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    service: selectedPackageData?.name || "General Inquiry",
                    budget: selectedPackage ? `${formatCurrency(totalUpfront)} + ${formatCurrency(totalMonthly)}/mo` : "",
                    quote: quoteSummary,
                    _honeypot: honeypot,
                }),
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

    return (
        <div className="space-y-8">
            {/* Quote Calculator Section */}
            <div className="border border-gallery/10 bg-carbon-light p-6">
                <h3 className="mb-6 font-heading text-sm font-bold uppercase tracking-wider text-gallery">
                    Configure Your Investment
                    <span className="ml-2 text-text-muted font-normal normal-case">(Optional)</span>
                </h3>

                {/* Package Selection */}
                <div className="mb-6">
                    <p className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
                        Core Package
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2">
                        {packages.map((pkg) => (
                            <motion.label
                                key={pkg.id}
                                className={cn(
                                    "flex cursor-pointer items-center gap-3 border p-3 transition-colors",
                                    selectedPackage === pkg.id
                                        ? "border-signal bg-signal/10"
                                        : "border-gallery/10 bg-carbon hover:border-gallery/30"
                                )}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <input
                                    type="radio"
                                    name="package"
                                    value={pkg.id}
                                    checked={selectedPackage === pkg.id}
                                    onChange={() => setSelectedPackage(pkg.id)}
                                    className="h-4 w-4 accent-signal"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline justify-between gap-2">
                                        <span className="font-heading text-sm font-bold text-gallery truncate">
                                            {pkg.name}
                                        </span>
                                        <span className="font-mono text-xs text-signal shrink-0">
                                            {formatCurrency(pkg.upfront)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-text-muted truncate">{pkg.label}</p>
                                </div>
                            </motion.label>
                        ))}
                    </div>
                </div>

                {/* Add-ons */}
                <div className="mb-6">
                    <p className="mb-3 font-mono text-xs uppercase tracking-wider text-text-muted">
                        Add-on Services
                    </p>
                    <div className="space-y-2">
                        {addOns.map((addOn) => (
                            <motion.label
                                key={addOn.id}
                                className={cn(
                                    "flex cursor-pointer items-center gap-3 border p-3 transition-colors",
                                    selectedAddOns.includes(addOn.id)
                                        ? "border-signal bg-signal/10"
                                        : "border-gallery/10 bg-carbon hover:border-gallery/30"
                                )}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedAddOns.includes(addOn.id)}
                                    onChange={() => toggleAddOn(addOn.id)}
                                    className="h-4 w-4 accent-signal"
                                />
                                <div className="flex-1 flex items-baseline justify-between gap-2">
                                    <span className="font-heading text-sm font-bold text-gallery">
                                        {addOn.name}
                                    </span>
                                    <span className="font-mono text-xs text-text-secondary">
                                        +{formatCurrency(addOn.setup)} / +{formatCurrency(addOn.monthly)}/mo
                                    </span>
                                </div>
                            </motion.label>
                        ))}
                    </div>
                </div>

                {/* Quote Summary */}
                <AnimatePresence>
                    {selectedPackage && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-gallery/10 pt-4"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
                                    Estimated Investment
                                </span>
                            </div>
                            <div className="flex items-baseline gap-4">
                                <div>
                                    <motion.span
                                        key={totalUpfront}
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="font-mono text-2xl font-bold text-gallery"
                                    >
                                        {formatCurrency(totalUpfront)}
                                    </motion.span>
                                    <span className="text-xs text-text-muted ml-1">one-time</span>
                                </div>
                                <span className="text-text-muted">+</span>
                                <div>
                                    <motion.span
                                        key={totalMonthly}
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="font-mono text-2xl font-bold text-signal"
                                    >
                                        {formatCurrency(totalMonthly)}
                                    </motion.span>
                                    <span className="text-xs text-text-muted ml-1">/month</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Contact Form Section */}
            <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-signal/20 bg-carbon text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                            className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-signal/10 text-signal"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </motion.div>
                        <h3 className="mb-2 font-heading text-2xl font-bold text-gallery">
                            Quote Request Received
                        </h3>
                        <p className="max-w-xs text-text-secondary">
                            We&apos;ll be in touch within 24 hours with your technical audit and proposal.
                        </p>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        {/* Honeypot */}
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
                            {/* Name */}
                            <div className="group relative">
                                <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                                    Name *
                                </label>
                                <motion.div
                                    className={cn(
                                        "relative overflow-hidden rounded-sm border transition-colors",
                                        errors.name ? "border-red-500" : focusedField === "name" ? "border-signal" : "border-gallery/10"
                                    )}
                                    animate={errors.name ? { x: [0, -4, 4, -4, 4, 0] } : {}}
                                    transition={{ duration: 0.4 }}
                                >
                                    <input
                                        type="text"
                                        required
                                        placeholder="Jane Smith"
                                        className={inputClasses}
                                        value={formData.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        onFocus={() => setFocusedField("name")}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                </motion.div>
                            </div>

                            {/* Email */}
                            <div className="group relative">
                                <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                                    Email *
                                </label>
                                <motion.div
                                    className={cn(
                                        "relative overflow-hidden rounded-sm border transition-colors",
                                        errors.email ? "border-red-500" : focusedField === "email" ? "border-signal" : "border-gallery/10"
                                    )}
                                    animate={errors.email ? { x: [0, -4, 4, -4, 4, 0] } : {}}
                                    transition={{ duration: 0.4 }}
                                >
                                    <input
                                        type="email"
                                        required
                                        placeholder="jane@company.com"
                                        className={inputClasses}
                                        value={formData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        onFocus={() => setFocusedField("email")}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                </motion.div>
                            </div>
                        </div>

                        {/* Company */}
                        <div className="group relative">
                            <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                                Company
                            </label>
                            <div className={cn(
                                "relative overflow-hidden rounded-sm border transition-colors",
                                focusedField === "company" ? "border-signal" : "border-gallery/10"
                            )}>
                                <input
                                    type="text"
                                    placeholder="Company name"
                                    className={inputClasses}
                                    value={formData.company}
                                    onChange={(e) => handleChange("company", e.target.value)}
                                    onFocus={() => setFocusedField("company")}
                                    onBlur={() => setFocusedField(null)}
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="group relative">
                            <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-text-muted">
                                Project Details *
                            </label>
                            <motion.div
                                className={cn(
                                    "relative overflow-hidden rounded-sm border transition-colors",
                                    errors.message ? "border-red-500" : focusedField === "message" ? "border-signal" : "border-gallery/10"
                                )}
                                animate={errors.message ? { x: [0, -4, 4, -4, 4, 0] } : {}}
                                transition={{ duration: 0.4 }}
                            >
                                <textarea
                                    rows={5}
                                    required
                                    placeholder="Tell us about your goals, timeline, and current pain points..."
                                    className={inputClasses}
                                    value={formData.message}
                                    onChange={(e) => handleChange("message", e.target.value)}
                                    onFocus={() => setFocusedField("message")}
                                    onBlur={() => setFocusedField(null)}
                                />
                            </motion.div>
                        </div>

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
                            ) : selectedPackage ? (
                                "Submit Quote Request"
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

export default ContactFormWithQuote;
