"use client";

import { type ReactNode } from "react";
import { motion, type Variant } from "framer-motion";

// ═══════════════════════════════════════════════════════════════
// RevealOnScroll — Reusable scroll-reveal wrapper
// ═══════════════════════════════════════════════════════════════

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
  as?: "div" | "p" | "h2" | "h3" | "span" | "section";
}

const directionOffset: Record<
  NonNullable<RevealOnScrollProps["direction"]>,
  { x: number; y: number }
> = {
  up: { x: 0, y: 30 },
  down: { x: 0, y: -30 },
  left: { x: -30, y: 0 },
  right: { x: 30, y: 0 },
  none: { x: 0, y: 0 },
};

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  direction = "up",
  distance,
  duration = 0.5,
  once = true,
  as = "div",
}: RevealOnScrollProps) {
  const offset = directionOffset[direction];
  const x = distance !== undefined ? (direction === "left" ? -distance : direction === "right" ? distance : 0) : offset.x;
  const y = distance !== undefined ? (direction === "up" ? distance : direction === "down" ? -distance : 0) : offset.y;

  const initial: Variant = { opacity: 0, x, y };
  const animate: Variant = { opacity: 1, x: 0, y: 0 };

  const Component = motion[as];

  return (
    <Component
      initial={initial}
      whileInView={animate}
      viewport={{ once, margin: "-100px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </Component>
  );
}

// Stagger container for child animations
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

const containerVariants = (staggerDelay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={containerVariants(staggerDelay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
