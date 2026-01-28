"use client";

import Image from "next/image";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";

interface BlogPostBodyProps {
    body: unknown[];
}

const components: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) return null;
            const imageUrl = urlFor(value).width(1200).url();
            return (
                <motion.figure
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="my-10"
                >
                    <div className="relative aspect-video overflow-hidden border border-gallery/10">
                        <Image
                            src={imageUrl}
                            alt={value.alt || ""}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 720px"
                        />
                    </div>
                    {value.alt && (
                        <figcaption className="mt-3 text-center font-mono text-xs text-text-muted">
                            {value.alt}
                        </figcaption>
                    )}
                </motion.figure>
            );
        },
    },
    block: {
        h1: ({ children }) => (
            <h1
                id={typeof children === "string" ? children.toString().toLowerCase().replace(/\s+/g, "-") : undefined}
                className="mb-6 mt-12 font-heading text-4xl font-bold text-gallery"
            >
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2
                id={typeof children === "string" ? children.toString().toLowerCase().replace(/\s+/g, "-") : undefined}
                className="mb-5 mt-10 font-heading text-3xl font-bold text-gallery"
            >
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3
                id={typeof children === "string" ? children.toString().toLowerCase().replace(/\s+/g, "-") : undefined}
                className="mb-4 mt-8 font-heading text-2xl font-bold text-gallery"
            >
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 className="mb-3 mt-6 font-heading text-xl font-bold text-gallery">
                {children}
            </h4>
        ),
        normal: ({ children }) => (
            <p className="mb-6 text-lg leading-relaxed text-text-secondary">
                {children}
            </p>
        ),
        blockquote: ({ children }) => (
            <blockquote className="my-8 border-l-[3px] border-signal pl-6 italic text-lg text-text-secondary">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="mb-6 ml-6 list-disc space-y-2 text-text-secondary">
                {children}
            </ul>
        ),
    },
    listItem: {
        bullet: ({ children }) => (
            <li className="text-lg leading-relaxed">{children}</li>
        ),
    },
    marks: {
        strong: ({ children }) => (
            <strong className="font-bold text-gallery">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        link: ({ children, value }) => {
            const rel = value?.href?.startsWith("/") ? undefined : "noopener noreferrer";
            const target = value?.href?.startsWith("/") ? undefined : "_blank";
            return (
                <a
                    href={value?.href}
                    rel={rel}
                    target={target}
                    className="text-signal underline decoration-signal/30 underline-offset-2 transition-colors hover:decoration-signal"
                >
                    {children}
                </a>
            );
        },
    },
};

export function BlogPostBody({ body }: BlogPostBodyProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose-vantura mx-auto max-w-3xl"
        >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <PortableText value={body as any} components={components} />
        </motion.div>
    );
}

export default BlogPostBody;
