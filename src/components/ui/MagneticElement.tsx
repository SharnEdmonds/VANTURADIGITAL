"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface MagneticElementProps {
    children: React.ReactNode;
    className?: string;
    strength?: number;
    radius?: number;
    as?: "div" | "span" | "a" | "button";
}

export function MagneticElement({
    children,
    className = "",
    strength = 0.3,
    radius = 200,
    as = "div",
}: MagneticElementProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
    const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const dist = Math.sqrt(distX * distX + distY * distY);

        if (dist < radius) {
            x.set(distX * strength);
            y.set(distY * strength);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const Component = motion[as] as typeof motion.div;

    return (
        <Component
            ref={ref}
            className={className}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            data-magnetic-hovered={isHovered}
        >
            {children}
        </Component>
    );
}

export default MagneticElement;
