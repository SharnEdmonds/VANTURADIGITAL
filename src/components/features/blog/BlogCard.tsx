"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Post } from "@/types/sanity";

interface BlogCardProps {
    post: Post;
}

const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" as const },
    },
};

export function BlogCard({ post }: BlogCardProps) {
    const date = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
          })
        : null;

    return (
        <motion.article
            variants={cardVariants}
            className="group relative flex flex-col overflow-hidden border border-gallery/10 bg-carbon transition-all duration-300 hover:border-signal/40"
            data-cursor="view"
        >
            <Link href={`/blog/${post.slug.current}`} className="flex flex-col h-full">
                {/* Image */}
                {post.mainImage?.asset?.url && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-carbon-light">
                        <Image
                            src={post.mainImage.asset.url}
                            alt={post.mainImage.alt || post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-carbon/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                )}

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                    {/* Meta */}
                    <div className="mb-4 flex items-center gap-3">
                        {post.categories?.[0] && (
                            <span className="border border-signal/30 bg-signal/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-signal">
                                {post.categories[0].title}
                            </span>
                        )}
                        {date && (
                            <span className="font-mono text-xs text-text-muted">
                                {date}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 font-heading text-xl font-bold leading-tight text-gallery transition-colors duration-300 group-hover:text-signal">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                        <p className="mb-6 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Read more arrow */}
                    <div className="mt-auto flex items-center gap-2 text-sm font-medium text-text-muted transition-colors group-hover:text-signal">
                        <span>Read article</span>
                        <motion.svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                            <path d="M3 8h10M9 4l4 4-4 4" />
                        </motion.svg>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

export default BlogCard;
