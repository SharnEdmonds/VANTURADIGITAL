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

// ═══════════════════════════════════════════════════════════════
// Blog Types
// ═══════════════════════════════════════════════════════════════

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  mainImage?: {
    _type: "image";
    asset: {
      _id: string;
      url: string;
      metadata?: {
        dimensions?: { width: number; height: number };
        lqip?: string;
      };
    };
    alt?: string;
  };
  body?: unknown[];
  author?: Author;
  categories?: Category[];
}

export interface Author {
  _id: string;
  name: string;
  slug?: { current: string };
  image?: {
    _type: "image";
    asset: {
      _id: string;
      url: string;
    };
  };
  bio?: unknown[];
}

export interface Category {
  _id: string;
  title: string;
  slug?: { current: string };
  description?: string;
}
