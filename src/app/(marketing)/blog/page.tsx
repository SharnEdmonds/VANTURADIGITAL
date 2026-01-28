import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { BlogGrid } from "@/components/features/blog/BlogGrid";
import { MarqueeSection } from "@/components/ui/ScrollMarquee";
import { LeadCaptureSection } from "@/components/features/lead-capture/lead-capture-section";
import { sanityFetch } from "@/lib/sanity/client";
import { postsQuery, categoriesQuery } from "@/lib/sanity/queries";
import type { Post, Category } from "@/types/sanity";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Insights on web development, SEO, paid advertising, and digital growth strategy from the Vantura Digital engineering team.",
};

export const revalidate = 3600;

export default async function BlogPage() {
    const [posts, categories] = await Promise.all([
        sanityFetch<Post[]>({
            query: postsQuery,
            tags: ["post"],
        }),
        sanityFetch<Category[]>({
            query: categoriesQuery,
            tags: ["category"],
        }),
    ]);

    return (
        <div className="bg-carbon">
            <PageHero
                label="Insights & Strategy"
                title="The Vantura Blog."
                subtitle="Engineering perspectives on performance, growth, and the modern web. No fluff — just systems thinking and actionable strategy."
            />

            <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
                <BlogGrid posts={posts || []} categories={categories || []} />
            </section>

            <MarqueeSection
                items={[
                    "INSIGHTS",
                    "STRATEGY",
                    "ENGINEERING",
                    "GROWTH",
                    "PERFORMANCE",
                ]}
            />

            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
                <hr className="border-gallery/10" />
            </div>

            <LeadCaptureSection />
        </div>
    );
}
