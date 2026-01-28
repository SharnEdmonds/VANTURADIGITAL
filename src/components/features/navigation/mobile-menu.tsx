"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  navItems: readonly { label: string; href: string; external?: boolean }[];
}

export function MobileMenu({ navItems }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative z-50 flex h-10 w-10 items-center justify-center text-[var(--color-foreground)]"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        >
          <motion.line
            x1="4"
            x2="20"
            animate={
              open
                ? { y1: 12, y2: 12, rotate: 45 }
                : { y1: 7, y2: 7, rotate: 0 }
            }
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: "center" }}
          />
          <motion.line
            x1="4"
            y1="12"
            x2="20"
            y2="12"
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.line
            x1="4"
            x2="20"
            animate={
              open
                ? { y1: 12, y2: 12, rotate: -45 }
                : { y1: 17, y2: 17, rotate: 0 }
            }
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: "center" }}
          />
        </svg>
      </button>

      {/* Mobile nav panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-carbon/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Nav panel */}
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 top-16 z-40 w-full border-b border-[var(--color-muted-foreground)]/10 bg-[var(--color-background)] px-4 py-6"
            >
              <ul className="flex flex-col gap-4">
                {navItems.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{
                      duration: 0.2,
                      delay: i * 0.05,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block text-base text-[var(--color-foreground)] transition-colors hover:text-[var(--color-accent)]"
                      {...(item.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
