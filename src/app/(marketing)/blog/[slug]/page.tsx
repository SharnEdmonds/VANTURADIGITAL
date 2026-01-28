import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/sanity/client";
import {
    postBySlugQuery,
    postSlugsQuery,
    relatedPostsQuery,
} from "@/lib/sanity/queries";
import type { Post } from "@/types/sanity";
import { BlogPostBody } from "@/components/features/blog/BlogPostBody";
import { ReadingProgress } from "@/components/features/blog/ReadingProgress";
import { BlogCard } from "@/components/features/blog/BlogCard";
import { BlogPostHeroClient } from "./BlogPostHeroClient";

export const revalidate = 3600;

export async function generateStaticParams() {
    const slugs = await sanityFetch<{ slug: string }[]>({
        query: postSlugsQuery,
        tags: ["post"],
    });
    return (slugs || []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await sanityFetch<Post | null>({
        query: postBySlugQuery,
        params: { slug },
        tags: ["post"],
    });

    if (!post) return { title: "Post Not Found" };

    return {
        title: post.title,
        description: post.excerpt || `Read ${post.title} on the Vantura Digital blog.`,
        alternates: {
            canonical: `/blog/${slug}`,
        },
        openGraph: {
            title: post.title,
            images: post.mainImage?.asset?.url
                ? [{ url: post.mainImage.asset.url }]
                : undefined,
        },
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await sanityFetch<Post | null>({
        query: postBySlugQuery,
        params: { slug },
        tags: ["post"],
    });

    if (!post) notFound();

    // Fetch related posts
    const categoryIds = post.categories?.map((c) => c._id) || [];
    const relatedPosts = categoryIds.length
        ? await sanityFetch<Post[]>({
            query: relatedPostsQuery,
            params: { postId: post._id, categoryIds },
            tags: ["post"],
        })
        : [];

    const date = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
        : null;

    return (
        <div className="bg-carbon">
            <ReadingProgress />

            {/* Hero */}
            <BlogPostHeroClient>
                <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-carbon pb-16 pt-32">
                    <div className="container relative z-10 mx-auto px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <Link
                                href="/blog"
                                className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-signal"
                            >
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <path d="M13 8H3M7 4L3 8l4 4" />
                                </svg>
                                Back to Blog
                            </Link>

                            {/* Categories */}
                            {post.categories && post.categories.length > 0 && (
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {post.categories.map((cat) => (
                                        <span
                                            key={cat._id}
                                            className="border border-signal/30 bg-signal/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-signal"
                                        >
                                            {cat.title}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <h1 className="mb-6 font-heading text-4xl font-bold leading-tight tracking-tight text-gallery md:text-6xl lg:text-7xl">
                                {post.title}
                            </h1>

                            {/* Author + Date */}
                            <div className="flex items-center gap-4">
                                {post.author?.image?.asset?.url && (
                                    <Image
                                        src={post.author.image.asset.url}
                                        alt={post.author.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full border border-gallery/10"
                                    />
                                )}
                                <div>
                                    {post.author?.name && (
                                        <p className="text-sm font-medium text-gallery">
                                            {post.author.name}
                                        </p>
                                    )}
                                    {date && (
                                        <p className="font-mono text-xs text-text-muted">
                                            {date}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </BlogPostHeroClient>

            {/* Featured Image */}
            {post.mainImage?.asset?.url && (
                <div className="mx-auto max-w-5xl px-6 lg:px-8">
                    <div className="relative aspect-[21/9] overflow-hidden border border-gallery/10">
                        <Image
                            src={post.mainImage.asset.url}
                            alt={post.mainImage.alt || post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            priority
                        />
                    </div>
                </div>
            )}

            {/* Body */}
            {post.body && (
                <section className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
                    <BlogPostBody body={post.body} />
                </section>
            )}

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
                <section className="border-t border-gallery/10">
                    <div className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
                        <h2 className="mb-12 font-heading text-3xl font-bold text-gallery">
                            Related Articles
                        </h2>
                        <div className="grid gap-[1px] border border-gallery/10 bg-gallery/5 md:grid-cols-2">
                            {relatedPosts.map((rp) => (
                                <BlogCard key={rp._id} post={rp} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="border-t border-gallery/10">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-24 text-center lg:px-8">
                    <p className="mb-4 font-mono text-xs uppercase tracking-widest text-signal">
                        Ready to Build?
                    </p>
                    <h2 className="mb-6 font-heading text-4xl font-bold text-gallery">
                        Let&apos;s engineer your growth.
                    </h2>
                    <p className="mb-10 max-w-xl text-lg text-text-secondary">
                        Get a free technical audit and discover how performance engineering can transform your digital presence.
                    </p>
                    <Link
                        href="/contact"
                        className="bg-signal px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-signal-hover"
                    >
                        Start a Project
                    </Link>
                </div>
            </section>
        </div>
    );
}
