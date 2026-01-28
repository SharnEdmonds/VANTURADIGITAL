// ═══════════════════════════════════════════════════════════════
// Sanity Document Base Types
// ═══════════════════════════════════════════════════════════════

export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

/** Global site settings stored as a Sanity singleton */
export interface SiteSettings extends SanityDocument {
  _type: "siteSettings";
  title: string;
  description: string;
  url: string;
  ogImage: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    alt?: string;
  };
  /** Navigation links managed from the CMS */
  headerNav: NavItem[];
  footerNav: NavItem[];
  socialLinks: SocialLink[];
}

export interface NavItem {
  _key: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  _key: string;
  platform: "twitter" | "linkedin" | "github" | "instagram";
  url: string;
}
