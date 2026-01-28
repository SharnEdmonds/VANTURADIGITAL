"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Container } from "@/components/ui";
import { MobileMenu } from "./mobile-menu";

// ═══════════════════════════════════════════════════════════════
// HeaderClient — Client component with hover animations
// ═══════════════════════════════════════════════════════════════

interface NavItem {
    label: string;
    href: string;
    external?: boolean;
    _key?: string;
}

interface HeaderClientProps {
    navItems: NavItem[];
}

export function HeaderClient({ navItems }: HeaderClientProps) {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    // Add Home link when not on homepage
    const displayNavItems = isHomePage
        ? navItems
        : [{ label: "Home", href: "/" }, ...navItems];

    return (
        <header className="sticky top-0 z-40 w-full border-b border-gallery/10 bg-carbon/80 backdrop-blur-md">
            <Container className="flex h-16 items-center justify-between">
                {/* Logo with hover effect */}
                <Link
                    href="/"
                    className="group relative flex items-center"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Image
                            src="/images/logo-with-text.webp"
                            alt="Vantura Digital"
                            width={260}
                            height={50}
                            style={{ height: '50px', width: 'auto' }}
                            priority
                        />
                    </motion.div>
                </Link>

                {/* Desktop nav with hover effects */}
                <nav className="hidden items-center gap-8 md:flex">
                    {displayNavItems.map((item, i) => (
                        <Link
                            key={"_key" in item ? item._key : i}
                            href={item.href}
                            className="group relative py-2 text-sm font-medium text-text-secondary transition-colors hover:text-gallery"
                            {...("external" in item && item.external
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                        >
                            {item.label}
                            {/* Animated underline */}
                            <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-signal transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}

                    {/* CTA Button */}
                    <Link
                        href="/contact"
                        className="ml-2 inline-flex h-10 items-center justify-center border border-signal bg-transparent px-5 text-sm font-bold uppercase tracking-wider text-signal transition-all hover:bg-signal hover:text-carbon"
                    >
                        Get Audit
                    </Link>
                </nav>

                {/* Mobile nav */}
                <MobileMenu navItems={displayNavItems} />
            </Container>
        </header>
    );
}

export default HeaderClient;
