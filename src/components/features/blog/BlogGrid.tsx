"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { BlogCard } from "./BlogCard";
import type { Post, Category } from "@/types/sanity";

interface BlogGridProps {
    posts: Post[];
    categories: Category[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

export function BlogGrid({ posts, categories }: BlogGridProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const filteredPosts = activeCategory
        ? posts.filter((post) =>
              post.categories?.some((cat) => cat._id === activeCategory)
          )
        : posts;

    return (
        <div ref={containerRef}>
            {/* Category Filter */}
            {categories.length > 0 && (
                <div className="mb-12 flex flex-wrap gap-3">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className="relative px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors"
                    >
                        <span
                            className={
                                activeCategory === null
                                    ? "text-signal"
                                    : "text-text-muted hover:text-gallery"
                            }
                        >
                            All
                        </span>
                        {activeCategory === null && (
                            <motion.div
                                layoutId="category-underline"
                                className="absolute bottom-0 left-0 right-0 h-[2px] bg-signal"
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                }}
                            />
                        )}
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category._id}
                            onClick={() => setActiveCategory(category._id)}
                            className="relative px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors"
                        >
                            <span
                                className={
                                    activeCategory === category._id
                                        ? "text-signal"
                                        : "text-text-muted hover:text-gallery"
                                }
                            >
                                {category.title}
                            </span>
                            {activeCategory === category._id && (
                                <motion.div
                                    layoutId="category-underline"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-signal"
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory || "all"}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    className="grid gap-[1px] border border-gallery/10 bg-gallery/5 md:grid-cols-2 lg:grid-cols-3"
                >
                    {filteredPosts.map((post) => (
                        <BlogCard key={post._id} post={post} />
                    ))}
                </motion.div>
            </AnimatePresence>

            {filteredPosts.length === 0 && (
                <div className="py-24 text-center">
                    <p className="text-text-muted">No posts found in this category.</p>
                </div>
            )}
        </div>
    );
}

export default BlogGrid;
