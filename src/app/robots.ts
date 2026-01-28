import type { MetadataRoute } from "next";

// ═══════════════════════════════════════════════════════════════
// robots.txt — Dynamic generation for SEO
// ═══════════════════════════════════════════════════════════════

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://venturadigital.co.nz";

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
