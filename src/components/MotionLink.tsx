"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface MotionLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    ariaLabel?: string;
}

const MotionNextLink = motion.create(Link);

export default function MotionLink({ href, children, className = "", ariaLabel }: MotionLinkProps) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            style={{ x, y }}
            transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.1 }}
            className="inline-block"
        >
            <MotionNextLink
                href={href}
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                aria-label={ariaLabel}
                className={`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium border border-[var(--color-foreground)] rounded-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-carbon ${className}`}
                initial={{ color: "var(--color-foreground)", backgroundColor: "transparent" }}
                whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3, ease: "easeOut" }
                }}
                style={{
                    color: "var(--color-foreground)",
                }}
            >
                <motion.span
                    className="absolute inset-0 w-full h-full bg-[var(--color-accent)] -translate-x-full group-hover:translate-x-0 ease-out transition-transform duration-300"
                />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    {children}
                </span>
            </MotionNextLink>
        </motion.div>
    );
}
