import { createClient, type QueryParams } from "next-sanity";

// ═══════════════════════════════════════════════════════════════
// Sanity Client — single source of truth
// ═══════════════════════════════════════════════════════════════

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-27";

/**
 * Public client — used in Server Components and static generation.
 * No token → safe for edge / client bundles.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // CDN for published content (ISR-friendly)
  perspective: "published",
});

/**
 * Authenticated client — used for draft previews & webhook
 * revalidation. NEVER import this on the client side.
 */
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "previewDrafts",
});

// ───────────────────────────────────────────────
// Typed fetch helper with Next.js cache tags
// ───────────────────────────────────────────────

interface SanityFetchOptions {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
}

/**
 * Fetch data from Sanity with ISR-aware caching.
 *
 * @example
 * const services = await sanityFetch<Service[]>({
 *   query: serviceArchitectureQuery,
 *   tags: ["service"],
 *   revalidate: 3600,        // ISR: revalidate every hour
 * });
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 3600,
}: SanityFetchOptions): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: {
      revalidate: revalidate === false ? false : revalidate,
      tags,
    },
  });
}
