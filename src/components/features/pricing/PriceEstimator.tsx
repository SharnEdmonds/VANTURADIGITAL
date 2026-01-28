"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════════════════════════
// PriceEstimator — Interactive Pricing Calculator
// ═══════════════════════════════════════════════════════════════
// Dark theme matching rest of site
// Background: Carbon (#0f0f0f)
// Text: Gallery (#EEEEEE)
// Accents/CTAs: Signal Orange (#FF4F00)

// ─── Pricing Data ─────────────────────────────────────────────

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
    {
        id: "starter",
        name: "Starter",
        label: "Essential Infrastructure",
        upfront: 2400,
        monthly: 150,
    },
    {
        id: "business",
        name: "Business",
        label: "Business Engine",
        upfront: 4800,
        monthly: 200,
    },
    {
        id: "ecommerce",
        name: "Ecommerce",
        label: "Revenue Scale",
        upfront: 9200,
        monthly: 300,
    },
    {
        id: "pilot",
        name: "The Pilot",
        label: "Partnership Build",
        upfront: 0,
        monthly: 150,
        note: "Requires a 3-month partnership guarantee",
    },
];

const addOns: AddOn[] = [
    {
        id: "seo",
        name: "SEO & GEO Foundation",
        setup: 1200,
        monthly: 950,
    },
    {
        id: "ads",
        name: "Google Ads Architecture",
        setup: 850,
        monthly: 600,
    },
    {
        id: "gbp",
        name: "GBP Optimization",
        setup: 350,
        monthly: 150,
    },
];

// ─── Helper Functions ─────────────────────────────────────────

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-NZ", {
        style: "currency",
        currency: "NZD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

// ─── Component ────────────────────────────────────────────────

export function PriceEstimator() {
    const [selectedPackage, setSelectedPackage] = useState<string>("business");
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
    const [isQuoteGenerated, setIsQuoteGenerated] = useState(false);

    // Toggle add-on selection
    const toggleAddOn = (id: string) => {
        setSelectedAddOns((prev) =>
            prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
        );
        setIsQuoteGenerated(false);
    };

    // Calculate totals
    const { totalUpfront, totalMonthly, selectedPackageData } = useMemo(() => {
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
        };
    }, [selectedPackage, selectedAddOns]);

    const handleGenerateQuote = () => {
        setIsQuoteGenerated(true);
        // In production, this would trigger an API call or modal
    };

    return (
        <section className="bg-carbon py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-16 max-w-3xl">
                    <p className="mb-4 font-mono text-xs uppercase tracking-widest text-signal">
                        Investment Calculator
                    </p>
                    <h2 className="mb-4 font-heading text-4xl font-bold leading-tight tracking-tight text-gallery md:text-5xl">
                        Transparent Pricing.
                        <br />
                        No Hidden Costs.
                    </h2>
                    <p className="text-lg leading-relaxed text-text-secondary">
                        Configure your digital infrastructure and see the investment in
                        real-time. Every number is fixed — no scope creep, no surprises.
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid gap-[1px] border border-gallery/10 bg-gallery/5 lg:grid-cols-2">
                    {/* Left Column — Selection */}
                    <div className="space-y-[1px] bg-gallery/5">
                        {/* Package Selection */}
                        <div className="bg-carbon p-8">
                            <h3 className="mb-6 font-heading text-sm font-bold uppercase tracking-wider text-gallery">
                                Core Package
                            </h3>

                            <div className="space-y-3">
                                {packages.map((pkg) => (
                                    <motion.label
                                        key={pkg.id}
                                        className={`flex cursor-pointer items-start gap-4 border p-4 transition-colors ${selectedPackage === pkg.id
                                            ? "border-signal bg-signal/10"
                                            : "border-gallery/10 bg-carbon-light hover:border-gallery/30"
                                            }`}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <input
                                            type="radio"
                                            name="package"
                                            value={pkg.id}
                                            checked={selectedPackage === pkg.id}
                                            onChange={() => {
                                                setSelectedPackage(pkg.id);
                                                setIsQuoteGenerated(false);
                                            }}
                                            className="mt-1 h-4 w-4 accent-signal"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-baseline justify-between">
                                                <span className="font-heading font-bold text-gallery">
                                                    {pkg.name}
                                                </span>
                                                <span className="font-mono text-sm text-text-secondary">
                                                    {formatCurrency(pkg.upfront)} +{" "}
                                                    {formatCurrency(pkg.monthly)}/mo
                                                </span>
                                            </div>
                                            <p className="mt-1 text-sm text-text-secondary">{pkg.label}</p>
                                            {pkg.note && (
                                                <p className="mt-2 font-mono text-xs text-signal">
                                                    {pkg.note}
                                                </p>
                                            )}
                                        </div>
                                    </motion.label>
                                ))}
                            </div>
                        </div>

                        {/* Add-on Selection */}
                        <div className="bg-carbon p-8">
                            <h3 className="mb-6 font-heading text-sm font-bold uppercase tracking-wider text-gallery">
                                Add-on Services
                            </h3>

                            <div className="space-y-3">
                                {addOns.map((addOn) => (
                                    <motion.label
                                        key={addOn.id}
                                        className={`flex cursor-pointer items-start gap-4 border p-4 transition-colors ${selectedAddOns.includes(addOn.id)
                                            ? "border-signal bg-signal/10"
                                            : "border-gallery/10 bg-carbon-light hover:border-gallery/30"
                                            }`}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedAddOns.includes(addOn.id)}
                                            onChange={() => toggleAddOn(addOn.id)}
                                            className="mt-1 h-4 w-4 accent-signal"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-baseline justify-between">
                                                <span className="font-heading font-bold text-gallery">
                                                    {addOn.name}
                                                </span>
                                                <span className="font-mono text-sm text-text-secondary">
                                                    +{formatCurrency(addOn.setup)} /{" "}
                                                    +{formatCurrency(addOn.monthly)}/mo
                                                </span>
                                            </div>
                                        </div>
                                    </motion.label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column — Summary */}
                    <div className="flex flex-col bg-carbon">
                        {/* Breakdown */}
                        <div className="flex-1 p-8">
                            <h3 className="mb-6 font-heading text-sm font-bold uppercase tracking-wider text-gallery">
                                Projected Infrastructure Cost
                            </h3>

                            {/* Package line */}
                            <div className="border-b border-gallery/10 py-4">
                                <div className="flex items-baseline justify-between">
                                    <span className="text-gallery">
                                        {selectedPackageData?.name} Package
                                    </span>
                                    <span className="font-mono text-gallery">
                                        {formatCurrency(selectedPackageData?.upfront ?? 0)}
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-text-muted">
                                    {selectedPackageData?.label}
                                </p>
                            </div>

                            {/* Add-on lines */}
                            {selectedAddOns.map((id) => {
                                const addOn = addOns.find((a) => a.id === id);
                                if (!addOn) return null;
                                return (
                                    <motion.div
                                        key={id}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="border-b border-gallery/10 py-4"
                                    >
                                        <div className="flex items-baseline justify-between">
                                            <span className="text-gallery">{addOn.name}</span>
                                            <span className="font-mono text-gallery">
                                                +{formatCurrency(addOn.setup)}
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}

                            {/* Spacer */}
                            <div className="flex-1" />

                            {/* Totals */}
                            <div className="mt-8 space-y-4 border-t-2 border-gallery/20 pt-6">
                                <div className="flex items-baseline justify-between">
                                    <span className="font-heading text-lg font-bold uppercase tracking-wider text-gallery">
                                        Total One-off Investment
                                    </span>
                                    <motion.span
                                        key={totalUpfront}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="font-mono text-2xl font-bold text-gallery"
                                    >
                                        {formatCurrency(totalUpfront)}
                                    </motion.span>
                                </div>

                                <div className="flex items-baseline justify-between">
                                    <span className="font-heading text-lg font-bold uppercase tracking-wider text-gallery">
                                        Total Monthly Partnership
                                    </span>
                                    <motion.span
                                        key={totalMonthly}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="font-mono text-2xl font-bold text-signal"
                                    >
                                        {formatCurrency(totalMonthly)}
                                        <span className="text-base font-normal text-text-secondary">
                                            /mo
                                        </span>
                                    </motion.span>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="border-t border-gallery/10 bg-carbon-light p-8">
                            <AnimatePresence mode="wait">
                                {isQuoteGenerated ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="text-center"
                                    >
                                        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-signal/20">
                                            <svg
                                                className="h-8 w-8 text-signal"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                        <p className="font-heading text-lg font-bold text-gallery">
                                            Quote Saved
                                        </p>
                                        <p className="mt-1 text-sm text-text-secondary">
                                            We&apos;ll be in touch within 24 hours.
                                        </p>
                                        <button
                                            onClick={() => setIsQuoteGenerated(false)}
                                            className="mt-4 text-sm text-signal hover:underline"
                                        >
                                            Modify Configuration
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="cta"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                    >
                                        <button
                                            onClick={handleGenerateQuote}
                                            className="w-full bg-signal py-4 font-heading font-bold uppercase tracking-wider text-white transition-colors hover:bg-signal-hover"
                                            suppressHydrationWarning
                                        >
                                            Generate Professional Quote
                                        </button>
                                        <p className="mt-4 text-center font-mono text-xs text-text-muted">
                                            No obligation. Instant response.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Key Selling Points */}
                <div className="mt-16 grid gap-8 md:grid-cols-2">
                    {/* Free Audit */}
                    <div className="border border-gallery/10 bg-carbon-light p-8">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center border border-signal text-signal">
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h4 className="mb-2 font-heading text-lg font-bold text-gallery">
                            Free Comprehensive Site Audit
                        </h4>
                        <p className="text-sm leading-relaxed text-text-secondary">
                            A technical &quot;Deep Dive&quot; into performance, SEO, and
                            UI/UX. No fluff, just a 15-point diagnostic report.
                        </p>
                    </div>

                    {/* Pilot Build */}
                    <div className="border border-signal bg-signal/10 p-8">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center bg-signal text-white">
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <h4 className="mb-2 font-heading text-lg font-bold text-gallery">
                            The Pilot Build — $0 Upfront
                        </h4>
                        <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                            A high-performance 3-page site (Home, Services, Contact) to prove
                            the Vantura methodology. Only $150/mo for hosting, security, and
                            maintenance.
                        </p>
                        <p className="font-mono text-xs text-signal">
                            Requires 3-month minimum Partnership Guarantee
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PriceEstimator;
