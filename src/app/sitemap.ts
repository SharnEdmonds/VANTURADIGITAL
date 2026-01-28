import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { groq } from "next-sanity";

// ═══════════════════════════════════════════════════════════════
// sitemap.xml — Dynamic generation for SEO
// ═══════════════════════════════════════════════════════════════

// Query for blog posts with slug and publishedAt for sitemap
const blogPostsForSitemapQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    publishedAt
  }
`;

interface BlogPostSitemap {
    slug: string;
    publishedAt?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vanturadigital.co.nz";
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
            changeFrequency: "daily",
            priority: 0.8,
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

    // Fetch dynamic blog posts from Sanity
    let blogPosts: BlogPostSitemap[] = [];
    try {
        blogPosts = await sanityFetch<BlogPostSitemap[]>({
            query: blogPostsForSitemapQuery,
            tags: ["post"],
        }) || [];
    } catch {
        // If Sanity is unreachable, continue with static pages only
        console.warn("Could not fetch blog posts for sitemap");
    }

    // Generate blog post URLs
    const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticPages, ...blogPostPages];
}
