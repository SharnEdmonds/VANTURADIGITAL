"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
    value: string;
    suffix?: string;
    prefix?: string;
    duration?: number;
}

export function AnimatedCounter({
    value,
    suffix = "",
    prefix = "",
    duration = 1200
}: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
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
        const textSuffix = value.slice(numMatch[1].length); // suffix from input string (e.g. "k" in "24k")
        const hasDecimal = numMatch[1].includes(".");
        const decimalPlaces = hasDecimal ? numMatch[1].split(".")[1].length : 0;

        let frame: number;
        const startTime = Date.now();

        const animateValue = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
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
    }, [isInView, value, duration]);

    return (
        <span ref={ref}>
            {prefix}
            {displayValue}
            {suffix}
        </span>
    );
}

export default AnimatedCounter;
