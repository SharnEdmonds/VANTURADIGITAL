"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { LeadCaptureButton } from "./lead-capture-button";

// ═══════════════════════════════════════════════════════════════
// Animated Homepage Sections
// ═══════════════════════════════════════════════════════════════
// Client wrappers for scroll-triggered animations in server-rendered page.tsx

// ─── Animated Counter ──────────────────────────────────────────

function AnimatedMetric({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part
    const numMatch = value.match(/^([\d.]+)/);
    if (!numMatch) {
      setDisplayValue(value);
      return;
    }

    const num = parseFloat(numMatch[1]);
    const textSuffix = value.slice(numMatch[1].length);
    const hasDecimal = numMatch[1].includes(".");
    const decimalPlaces = hasDecimal ? numMatch[1].split(".")[1].length : 0;

    let frame: number;
    const startTime = Date.now();
    const duration = 1200;

    const animateValue = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out function
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;

      setDisplayValue(
        hasDecimal
          ? current.toFixed(decimalPlaces) + textSuffix
          : Math.round(current) + textSuffix
      );

      if (progress < 1) {
        frame = requestAnimationFrame(animateValue);
      }
    };

    frame = requestAnimationFrame(animateValue);

    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

// ─── 02. Brand Statement ───────────────────────────────────────

export function BrandStatementAnimated() {
  return (
    <section className="relative z-10 bg-carbon">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 md:py-32 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0 }}
              className="mb-4 font-mono text-xs uppercase tracking-widest text-signal"
            >
              The Anti-Agency
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-4xl font-bold leading-tight tracking-tight text-gallery md:text-5xl lg:text-6xl"
            >
              High-Performance
              <br />
              Digital Without
              <br />
              The Bloat.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-end"
          >
            <p className="mb-8 text-lg leading-relaxed text-text-secondary">
              We operate on strategic retainers — not bloated agency contracts. Retainers
              let us invest in your growth continuously, rather than nickel-and-diming
              every request. Six pillars. Zero waste. Every dollar tracked.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/services"
                className="inline-flex h-12 items-center justify-center border border-gallery/20 bg-transparent px-8 font-heading text-sm font-bold uppercase tracking-wider text-gallery transition-colors hover:border-signal hover:text-signal"
              >
                Our Services
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center px-8 font-heading text-sm font-bold uppercase tracking-wider text-text-secondary transition-colors hover:text-gallery"
                aria-label="Learn more about Vantura Digital"
              >
                About Vantura
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <hr className="border-gallery/10" />
      </div>
    </section>
  );
}

// ─── 03. Proof Points ──────────────────────────────────────────

const proofPoints = [
  { metric: "3.2x", label: "Average Organic Growth", sub: "across client portfolio" },
  { metric: "0.8s", label: "Time to Interactive", sub: "median page load" },
  { metric: "4.6x", label: "Return on Ad Spend", sub: "paid campaign average" },
  { metric: "96", label: "Lighthouse Score", sub: "performance baseline" },
];

export function ProofPointsAnimated() {
  return (
    <section className="bg-carbon">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid gap-[1px] border border-gallery/10 bg-gallery/5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {proofPoints.map((point) => (
            <motion.div
              key={point.label}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              className="bg-carbon p-8"
            >
              <p className="font-mono text-4xl font-bold text-gallery">
                <AnimatedMetric value={point.metric} />
              </p>
              <p className="mt-2 text-sm font-medium text-gallery">{point.label}</p>
              <p className="mt-1 font-mono text-xs text-text-muted">{point.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <hr className="border-gallery/10" />
      </div>
    </section>
  );
}

// ─── 05. Process ───────────────────────────────────────────────

const processSteps = [
  {
    step: "01",
    title: "Audit",
    desc: "We analyze your current digital presence — technical SEO, site performance, ad accounts, and analytics setup. No guessing.",
  },
  {
    step: "02",
    title: "Architect",
    desc: "We design the system. Which pillars you need, in what order, with what budget. A clear roadmap with projected outcomes.",
  },
  {
    step: "03",
    title: "Execute",
    desc: "We build, launch, and optimize. Weekly performance reports. No black boxes. You see every metric we see.",
  },
  {
    step: "04",
    title: "Scale",
    desc: "Once the system proves returns, we scale what works and cut what doesn't. Compounding growth, not vanity metrics.",
  },
];

export function ProcessAnimated() {
  return (
    <section className="bg-carbon">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-4 font-mono text-xs uppercase tracking-widest text-signal"
          >
            How We Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 font-heading text-4xl font-bold leading-tight tracking-tight text-gallery md:text-5xl"
          >
            Process, Not Promises.
          </motion.h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid gap-[1px] border border-gallery/10 bg-gallery/5 md:grid-cols-2 lg:grid-cols-4"
        >
          {processSteps.map((item) => (
            <motion.div
              key={item.step}
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              className="bg-carbon p-8"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: [0.8, 1.1, 1],
                    transition: { duration: 0.4 },
                  },
                }}
                className="mb-4 inline-flex h-10 w-10 items-center justify-center border border-signal font-mono text-sm font-bold text-signal"
              >
                {item.step}
              </motion.span>
              <h3 className="mb-2 font-heading text-lg font-bold text-gallery">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <hr className="border-gallery/10" />
      </div>
    </section>
  );
}

// ─── 07. Differentiators ───────────────────────────────────────

const differentiators = [
  {
    title: "Strategic Retainers",
    desc: "Our retainers ensure sustained performance — not locked-in contracts. Predictable costs, priority support, and continuous optimization beat ad-hoc billing every time.",
  },
  {
    title: "Full Transparency",
    desc: "You get access to every dashboard, every report, every metric. No proprietary black-box tools. Your data is yours.",
  },
  {
    title: "Results-First",
    desc: "We measure success in revenue impact, not impressions. If it doesn't move the needle, we don't do it.",
  },
  {
    title: "Technical Depth",
    desc: "We're engineers, not account managers. Every team member writes code, analyzes data, or optimizes campaigns directly.",
  },
];

export function DifferentiatorsAnimated() {
  return (
    <section className="bg-carbon">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-4 font-mono text-xs uppercase tracking-widest text-signal"
            >
              Why Vantura
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-4xl font-bold leading-tight tracking-tight text-gallery md:text-5xl"
            >
              The Anti-Agency
              <br />
              Manifesto.
            </motion.h2>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="space-y-8"
          >
            {differentiators.map((item) => (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                className="border-l-2 border-signal pl-6"
              >
                <h3 className="mb-1 font-heading text-lg font-bold text-gallery">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <hr className="border-gallery/10" />
      </div>
    </section>
  );
}

// ─── 10. CTA Section ───────────────────────────────────────────

export function CTASectionAnimated() {
  return (
    <section className="bg-carbon">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="border border-gallery/10 bg-carbon-light p-10 md:p-16"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-signal">
              Ready to Execute
            </p>
            <h2 className="mb-4 font-heading text-3xl font-bold leading-tight tracking-tight text-gallery md:text-5xl">
              Stop Browsing.
              <br />
              Start Building.
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-text-secondary">
              Three questions. One audit. Zero obligation. We analyze your
              digital presence and deliver a technical breakdown within 48 hours.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact">
                <LeadCaptureButton size="xl">
                  Analyze My Site
                </LeadCaptureButton>
              </Link>
              <Link
                href="/services"
                aria-label="View our services and capabilities"
                className="inline-flex h-14 items-center justify-center border border-gallery/20 bg-transparent px-8 font-heading text-base font-bold uppercase tracking-wider text-gallery transition-colors hover:border-signal hover:text-signal"
              >
                View Services
              </Link>
            </div>
            <p className="mt-8 font-mono text-xs text-text-muted">
              Flexible retainers. Transparent pricing. Results-first engagement.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
