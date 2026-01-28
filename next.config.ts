import type { NextConfig } from "next";

// ═══════════════════════════════════════════════════════════════
// Next.js Configuration — Optimized for SEO & Performance
// ═══════════════════════════════════════════════════════════════

const nextConfig: NextConfig = {
    // ─── Image Optimization ──────────────────────────────────────
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
                pathname: "/images/**",
            },
        ],
        // Aggressive caching for static images
        minimumCacheTTL: 31536000, // 1 year
    },

    // ─── Compression ─────────────────────────────────────────────
    compress: true,

    // ─── Security & Performance Headers ──────────────────────────
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    // Security headers
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "on",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()",
                    },
                ],
            },
            // Cache static assets aggressively
            {
                source: "/fonts/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/images/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/videos/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },

    // ─── Redirects for SEO ───────────────────────────────────────
    async redirects() {
        return [
            // Ensure trailing slash consistency (no trailing slash)
            {
                source: "/:path+/",
                destination: "/:path+",
                permanent: true,
            },
        ];
    },

    // ─── Experimental Optimizations ──────────────────────────────
    experimental: {
        // Optimize package imports for smaller bundles
        optimizePackageImports: ["framer-motion", "clsx"],
    },
};

export default nextConfig;
