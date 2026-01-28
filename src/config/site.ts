// ═══════════════════════════════════════════════════════════════
// Site-wide static config — fallbacks when Sanity is unreachable
// ═══════════════════════════════════════════════════════════════

export const siteConfig = {
  name: "Vantura Digital",
  description:
    "The Anti-Agency. We build high-performance digital experiences through Web Development, SEO/GEO, and Paid Advertising — without the bloat.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://venturadigital.co.nz",
  ogImage: "/images/og-default.webp",
  locale: "en_US",
  creator: "Vantura Digital",
} as const;
