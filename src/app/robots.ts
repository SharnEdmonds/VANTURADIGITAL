import type { MetadataRoute } from "next";

// ═══════════════════════════════════════════════════════════════
// robots.txt — Dynamic generation for SEO
// ═══════════════════════════════════════════════════════════════

export default function robots(): MetadataRoute.Robots {
    // Ensure we use the production domain if env var is missing or malformed
    const baseUrl = "https://vanturadigital.co.nz";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/studio/", "/api/", "/_next/"],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
