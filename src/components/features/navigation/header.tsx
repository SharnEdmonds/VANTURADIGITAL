import { sanityFetch, siteSettingsQuery } from "@/lib/sanity";
import type { SiteSettings } from "@/types";
import { headerNavFallback } from "@/config/navigation";
import { HeaderClient } from "./header-client";

// ═══════════════════════════════════════════════════════════════
// Header — async Server Component fetching nav from Sanity
// ═══════════════════════════════════════════════════════════════

export async function Header() {
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

  const navItems = (settings?.headerNav ?? [...headerNavFallback]) as { label: string; href: string; external?: boolean; _key?: string }[];

  return <HeaderClient navItems={navItems} />;
}
