// ═══════════════════════════════════════════════════════════════
// JSON-LD Structured Data Components for SEO
// ═══════════════════════════════════════════════════════════════

import { siteConfig } from "@/config/site";

interface JsonLdProps {
    children: object;
}

function JsonLd({ children }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(children) }}
        />
    );
}

// ─── Organization Schema ───────────────────────────────────────

export function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Vantura Digital",
        url: siteConfig.url,
        logo: `${siteConfig.url}/images/og-default.webp`,
        description: siteConfig.description,
        foundingDate: "2024",
        address: {
            "@type": "PostalAddress",
            addressCountry: "NZ",
        },
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: "hello@vanturadigital.co.nz",
        },
        sameAs: [
            // Add social media URLs here when available
        ],
    };

    return <JsonLd>{schema}</JsonLd>;
}

// ─── WebSite Schema with Search Action ─────────────────────────

export function WebSiteSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Vantura Digital",
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: {
            "@type": "Organization",
            name: "Vantura Digital",
        },
    };

    return <JsonLd>{schema}</JsonLd>;
}

// ─── Local Business Schema (for NZ SEO) ────────────────────────

export function LocalBusinessSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Vantura Digital",
        url: siteConfig.url,
        image: `${siteConfig.url}/images/og-default.webp`,
        description: siteConfig.description,
        address: {
            "@type": "PostalAddress",
            addressCountry: "NZ",
        },
        priceRange: "$$",
        areaServed: [
            {
                "@type": "Country",
                name: "New Zealand",
            },
            {
                "@type": "Country",
                name: "Australia",
            },
        ],
        serviceType: [
            "Web Development",
            "Search Engine Optimization",
            "Digital Marketing",
            "Paid Advertising",
        ],
    };

    return <JsonLd>{schema}</JsonLd>;
}

// ─── Service Schema ────────────────────────────────────────────

interface ServiceSchemaProps {
    name: string;
    description: string;
    provider?: string;
}

export function ServiceSchema({
    name,
    description,
    provider = "Vantura Digital",
}: ServiceSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        provider: {
            "@type": "Organization",
            name: provider,
        },
        areaServed: {
            "@type": "Country",
            name: "New Zealand",
        },
    };

    return <JsonLd>{schema}</JsonLd>;
}

// ─── Breadcrumb Schema ─────────────────────────────────────────

interface BreadcrumbItem {
    name: string;
    url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return <JsonLd>{schema}</JsonLd>;
}

// ─── FAQ Schema (for rich snippets) ────────────────────────────

interface FAQItem {
    question: string;
    answer: string;
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };

    return <JsonLd>{schema}</JsonLd>;
}
