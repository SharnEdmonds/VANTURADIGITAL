import Link from "next/link";
import { sanityFetch, siteSettingsQuery } from "@/lib/sanity";
import type { SiteSettings } from "@/types";
import { Container } from "@/components/ui";
import { footerNavFallback } from "@/config/navigation";

// ═══════════════════════════════════════════════════════════════
// Footer — Full branded footer with multiple sections
// ═══════════════════════════════════════════════════════════════

export async function Footer() {
  let settings: SiteSettings | null = null;

  try {
    settings = await sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
      revalidate: 3600,
    });
  } catch {
    // Use static fallback
  }

  const footerLinks = settings?.footerNav ?? footerNavFallback;

  return (
    <footer className="border-t border-gallery/10 bg-carbon">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 block font-heading text-xl font-bold text-gallery">
              Vantura Digital
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-text-secondary">
              The Anti-Agency. High-performance digital without the bloat.
              Web Development, SEO/GEO, and Paid Advertising — engineered for
              measurable returns.
            </p>
            <a
              href="mailto:hello@vanturadigital.co.nz"
              className="font-mono text-xs text-signal transition-colors hover:text-signal-light"
            >
              hello@vanturadigital.co.nz
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-gallery">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Services", href: "/services" },
                { label: "About", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-text-secondary transition-colors hover:text-gallery"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-gallery">
              Services
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Web Development", href: "/services" },
                { label: "SEO & GEO", href: "/services" },
                { label: "Paid Advertising", href: "/services" },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="text-sm text-text-secondary transition-colors hover:text-gallery"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-gallery/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Vantura Digital. All rights reserved.
          </p>

          <nav className="flex gap-6">
            {footerLinks.map((item, i) => (
              <Link
                key={"_key" in item ? item._key : i}
                href={item.href}
                className="text-xs text-text-muted transition-colors hover:text-gallery"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social links */}
          {settings?.socialLinks && settings.socialLinks.length > 0 && (
            <div className="flex gap-4">
              {settings.socialLinks.map((social) => (
                <a
                  key={social._key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-text-muted transition-colors hover:text-gallery"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          )}
        </Container>
      </div>
    </footer>
  );
}
