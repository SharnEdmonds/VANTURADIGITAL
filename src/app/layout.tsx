import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";

import { siteConfig } from "@/config/site";
import { sanityFetch, siteSettingsQuery } from "@/lib/sanity";
import type { SiteSettings } from "@/types";

import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { CustomCursor, ScrollProgress } from "@/components/ui";
import {
  OrganizationSchema,
  WebSiteSchema,
  LocalBusinessSchema,
} from "@/components/seo";

// ═══════════════════════════════════════════════════════════════
// Font Loading — swap + size-adjust = zero CLS
// ═══════════════════════════════════════════════════════════════

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  adjustFontFallback: true, // uses Next.js automatic size-adjust
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  adjustFontFallback: true,
});

// ═══════════════════════════════════════════════════════════════
// Viewport — extracted from metadata per Next.js 15 requirement
// ═══════════════════════════════════════════════════════════════

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

// ═══════════════════════════════════════════════════════════════
// Dynamic Metadata — injected from Sanity siteSettings singleton
// Falls back to static siteConfig if Sanity is unreachable.
// ═══════════════════════════════════════════════════════════════

export async function generateMetadata(): Promise<Metadata> {
  let settings: SiteSettings | null = null;

  try {
    settings = await sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
      revalidate: 3600,
    });
  } catch {
    // Sanity unreachable — fall through to static defaults
  }

  const title = settings?.title ?? siteConfig.name;
  const description = settings?.description ?? siteConfig.description;
  const rawUrl = settings?.url ?? siteConfig.url;
  // Ensure we always have a valid URL for metadataBase
  let url: string;
  try {
    url = new URL(rawUrl).toString();
  } catch {
    url = "https://vanturadigital.co.nz";
  }

  const ogImageUrl = settings?.ogImage?.asset?._ref
    ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${settings.ogImage.asset._ref.replace("image-", "").replace("-png", ".png").replace("-jpg", ".jpg").replace("-webp", ".webp")}`
    : `${url}${siteConfig.ogImage}`;

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    metadataBase: new URL(url),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      title,
      description,
      siteName: title,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
      creator: `@${siteConfig.creator.replace(/\s/g, "").toLowerCase()}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
        { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

// ═══════════════════════════════════════════════════════════════
// Root Layout
// ═══════════════════════════════════════════════════════════════

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />

        {/* Optimize LCP Image: Preload Hero Poster */}
        <link
          rel="preload"
          href="/images/og-default.webp"
          as="image"
          fetchPriority="high"
        />

        {/* JSON-LD Structured Data for SEO */}
        <OrganizationSchema />
        <WebSiteSchema />
        <LocalBusinessSchema />
      </head>
      <body
        className="min-h-screen bg-[var(--color-background)] font-sans antialiased"
        suppressHydrationWarning
      >
        {/* Custom cursor - replaces default */}
        <CustomCursor />

        {/* Scroll progress indicator */}
        <ScrollProgress />

        <SmoothScroll>
          {/* Skip-to-content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>

          {/* Header will be injected by route-group layouts */}
          <main id="main-content" className="flex min-h-screen flex-col">
            {children}
          </main>
          {/* Footer will be injected by route-group layouts */}
        </SmoothScroll>
      </body>
    </html>
  );
}
