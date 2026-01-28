import { groq } from "next-sanity";

// ═══════════════════════════════════════════════════════════════
// GROQ Queries — Vantura Digital
// ═══════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────
// Service Architecture (Web Dev, SEO/GEO, Ads)
// ───────────────────────────────────────────────

/** Fetch all services ordered by rank — used on /services listing */
export const serviceArchitectureQuery = groq`
  *[_type == "service"] | order(orderRank asc) {
    _id,
    title,
    slug,
    shortDescription,
    icon,
    heroImage {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    seo {
      metaTitle,
      metaDescription
    },
    capabilities[] {
      _key,
      title,
      description
    },
    orderRank
  }
`;

/** Fetch a single service by slug — used on /services/[slug] (ISR) */
export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    content,
    icon,
    heroImage {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset-> {
          _id,
          url
        }
      }
    },
    capabilities[] {
      _key,
      title,
      description
    }
  }
`;

/** Fetch all service slugs for generateStaticParams */
export const serviceSlugsQuery = groq`
  *[_type == "service" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// ───────────────────────────────────────────────
// Brand DNA (Identity + Value Proposition)
// ───────────────────────────────────────────────

/** Fetch the singleton brand identity document */
export const brandIdentityQuery = groq`
  *[_type == "brandIdentity"][0] {
    _id,
    name,
    tagline,
    mission,
    positioningStatement,
    logo {
      ...,
      asset-> { _id, url }
    },
    logoDark {
      ...,
      asset-> { _id, url }
    },
    palette,
    typography
  }
`;

/** Fetch the value proposition document */
export const valuePropositionQuery = groq`
  *[_type == "valueProposition"][0] {
    _id,
    headline,
    subheadline,
    body,
    differentiators[] {
      _key,
      label,
      description,
      icon
    },
    proofPoints[] {
      _key,
      metric,
      label
    }
  }
`;

// ───────────────────────────────────────────────
// Site Settings (navigation, social, meta)
// ───────────────────────────────────────────────

// ───────────────────────────────────────────────
// Projects / Portfolio
// ───────────────────────────────────────────────

/** Fetch all projects ordered by rank — used on /projects listing */
export const projectsQuery = groq`
  *[_type == "project"] | order(orderRank asc) {
    _id,
    title,
    slug,
    client,
    description,
    techStack,
    liveUrl,
    completedAt,
    featured,
    orderRank,
    coverImage {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    categories[]-> {
      _id,
      title,
      slug
    },
    seo {
      metaTitle,
      metaDescription
    }
  }
`;

/** Fetch a single project by slug — used on /projects/[slug] */
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    description,
    body,
    techStack,
    liveUrl,
    completedAt,
    featured,
    coverImage {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    screenshots[] {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    categories[]-> {
      _id,
      title,
      slug
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset-> {
          _id,
          url
        }
      }
    }
  }
`;

/** Fetch all project slugs for generateStaticParams */
export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`;

/** Fetch featured projects — used on homepage / about */
export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(orderRank asc) {
    _id,
    title,
    slug,
    client,
    description,
    techStack,
    completedAt,
    coverImage {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    categories[]-> {
      _id,
      title,
      slug
    }
  }
`;

// ───────────────────────────────────────────────
// Site Settings (navigation, social, meta)
// ───────────────────────────────────────────────

// ───────────────────────────────────────────────
// Blog (Posts, Authors, Categories)
// ───────────────────────────────────────────────

/** Fetch all posts with dereferenced author & categories — used on /blog listing */
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    "excerpt": array::join(string::split(pt::text(body), "")[0..200], "") + "...",
    author-> {
      _id,
      name,
      slug,
      image {
        ...,
        asset-> { _id, url }
      }
    },
    categories[]-> {
      _id,
      title,
      slug
    }
  }
`;

/** Fetch a single post by slug with full body — used on /blog/[slug] */
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    body,
    mainImage {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    author-> {
      _id,
      name,
      slug,
      image {
        ...,
        asset-> { _id, url }
      },
      bio
    },
    categories[]-> {
      _id,
      title,
      slug
    }
  }
`;

/** Fetch all post slugs for generateStaticParams */
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`;

/** Fetch related posts in same category, excluding current post */
export const relatedPostsQuery = groq`
  *[_type == "post" && _id != $postId && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0...2] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage {
      ...,
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    "excerpt": array::join(string::split(pt::text(body), "")[0..200], "") + "...",
    author-> {
      _id,
      name,
      image {
        ...,
        asset-> { _id, url }
      }
    },
    categories[]-> {
      _id,
      title,
      slug
    }
  }
`;

/** Fetch all categories — used for blog filter */
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`;

// ───────────────────────────────────────────────
// Site Settings (navigation, social, meta)
// ───────────────────────────────────────────────

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    url,
    ogImage {
      asset-> { _id, url }
    },
    headerNav[] {
      _key,
      label,
      href,
      external
    },
    footerNav[] {
      _key,
      label,
      href,
      external
    },
    socialLinks[] {
      _key,
      platform,
      url
    }
  }
`;
