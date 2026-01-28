import type { MetadataRoute } from "next";

// ═══════════════════════════════════════════════════════════════
// sitemap.xml — Dynamic generation for SEO
// ═══════════════════════════════════════════════════════════════

export default function sitemap(): MetadataRoute.Sitemap {
    // Ensure valid absolute URLs for production
    const baseUrl = "https://vanturadigital.co.nz";
    const now = new Date();

    // Static marketing pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: now,
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    return staticPages;
}
