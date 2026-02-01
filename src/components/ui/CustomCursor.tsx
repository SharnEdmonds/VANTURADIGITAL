"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════════════════════════
// CustomCursor — Premium Contextual Cursor
// ═══════════════════════════════════════════════════════════════
// Features:
// - Default: Small precise dot (8px)
// - Magnetic snap to interactive elements
// - Contextual labels: "VIEW" for case studies, "PLAY" for videos
// - Smooth spring physics

type CursorType = "default" | "view" | "play" | "link" | "text";

export function CustomCursor() {
    const [cursorType, setCursorType] = useState<CursorType>("default");
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Motion values for position
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring physics for smooth movement
    const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // Handle mouse movement
    const moveCursor = useCallback(
        (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        },
        [cursorX, cursorY]
    );

    // Detect interactive elements and update cursor state
    const updateCursorState = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const interactiveElement = target.closest(
            "[data-cursor], a, button, input, textarea, [role='button']"
        );

        if (!interactiveElement) {
            setCursorType("default");
            return;
        }

        // Check for custom data-cursor attribute
        const cursorAttr = interactiveElement.getAttribute("data-cursor");

        if (cursorAttr === "view") {
            setCursorType("view");
        } else if (cursorAttr === "play") {
            setCursorType("play");
        } else if (
            interactiveElement.tagName === "A" ||
            interactiveElement.tagName === "BUTTON" ||
            interactiveElement.getAttribute("role") === "button"
        ) {
            setCursorType("link");
        } else if (
            interactiveElement.tagName === "INPUT" ||
            interactiveElement.tagName === "TEXTAREA"
        ) {
            setCursorType("text");
        } else {
            setCursorType("default");
        }
    }, []);

    useEffect(() => {
        setMounted(true);

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousemove", updateCursorState);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousemove", updateCursorState);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [moveCursor, updateCursorState]);

    // Hide system cursor ONLY when this component is active and mounted
    useEffect(() => {
        if (!mounted) return;

        // Replicate logic for when we DO NOT render, so we don't hide the cursor in those cases
        const isTouch = typeof window !== "undefined" && "ontouchstart" in window;
        const isReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isCoarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

        if (isTouch || isReducedMotion || isCoarse) {
            return;
        }

        // Add class to hide cursor
        document.body.classList.add('cursor-none');

        return () => {
            // cleanup
            document.body.classList.remove('cursor-none');
        };
    }, [mounted]);

    // Don't render on touch devices or before mount
    if (!mounted) return null;

    // Check if this is likely a touch device
    if (typeof window !== "undefined" && "ontouchstart" in window) {
        return null;
    }



    // Check for reduced motion preference - accessibility
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return null;
    }

    // Enhanced touch device detection - check for coarse pointer (mobile/tablet)
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    // Derive inner circle dimensions from cursor type — no outer scale
    const getSize = (): { width: number; height: number } => {
        switch (cursorType) {
            case "view":
            case "play":
                return { width: 80, height: 80 };
            case "link":
                return { width: 40, height: 40 };
            case "text":
                return { width: 4, height: 24 };
            default:
                return { width: 8, height: 8 };
        }
    };

    const size = getSize();

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.15 }}
                aria-hidden="true"
            >
                {/* Cursor circle — all sizing controlled here */}
                <motion.div
                    className="flex items-center justify-center rounded-full bg-white"
                    animate={{
                        width: size.width,
                        height: size.height,
                        borderRadius: cursorType === "text" ? 2 : size.width / 2,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        mass: 0.5,
                    }}
                >
                    {/* Text labels removed */}
                </motion.div>
            </motion.div>

            {/* Trailing cursor ring for link state */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-white/30 mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    opacity: isVisible && cursorType === "link" ? 0.5 : 0,
                    scale: cursorType === "link" ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
            />
        </>
    );
}

export default CustomCursor;
