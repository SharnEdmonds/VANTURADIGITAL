// ═══════════════════════════════════════════════════════════════
// Vantura Digital — Brand DNA Type System
// ═══════════════════════════════════════════════════════════════

/**
 * Core brand identity: who Vantura is at the DNA level.
 */
export interface BrandIdentity {
  /** Internal codename — never rendered, used as Sanity document key */
  _id: string;
  name: string;
  tagline: string;
  mission: string;
  /** The "Anti-Agency" positioning statement */
  positioningStatement: string;
  logo: SanityImageReference;
  logoDark: SanityImageReference;
  /** Brand colour tokens consumed by Tailwind */
  palette: BrandPalette;
  /** Typographic scale references (font-family strings) */
  typography: BrandTypography;
}

export interface BrandPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
}

export interface BrandTypography {
  headingFont: string;
  bodyFont: string;
  monoFont: string;
}

/**
 * Value proposition — the promise Vantura makes.
 */
export interface ValueProposition {
  _id: string;
  headline: string;
  subheadline: string;
  /** Portable Text (Sanity block content) */
  body: SanityBlockContent[];
  /** Key differentiators displayed as pills / badges */
  differentiators: Differentiator[];
  /** Optional stats row (e.g. "200+ clients", "3× ROI") */
  proofPoints: ProofPoint[];
}

export interface Differentiator {
  _key: string;
  label: string;
  description: string;
  icon?: string;
}

export interface ProofPoint {
  _key: string;
  metric: string;
  label: string;
}

/**
 * Service Architecture — the six pillars.
 */
export interface Service {
  _id: string;
  _type: "service";
  title: string;
  slug: ServiceSlug;
  shortDescription: string;
  /** Portable Text for the full service page */
  content: SanityBlockContent[];
  icon: string;
  /** Reference to a Sanity image asset */
  heroImage: SanityImageReference;
  /** SEO metadata embedded per-service */
  seo: ServiceSEO;
  /** Capabilities listed under this service */
  capabilities: Capability[];
  /** Display order on the services grid */
  orderRank: number;
}

export interface ServiceSlug {
  _type: "slug";
  current: string;
}

export interface ServiceSEO {
  metaTitle: string;
  metaDescription: string;
  ogImage?: SanityImageReference;
}

export interface Capability {
  _key: string;
  title: string;
  description: string;
}

/**
 * Aggregate Brand DNA — single fetch for global layout data.
 */
export interface BrandDNA {
  identity: BrandIdentity;
  valueProposition: ValueProposition;
  services: Service[];
}

/**
 * Project / Portfolio — showcases completed client work.
 */
export interface Project {
  _id: string;
  _type: "project";
  title: string;
  slug: ServiceSlug;
  client: string;
  description: string;
  body: SanityBlockContent[];
  coverImage: SanityImageReference;
  screenshots: SanityImageReference[];
  techStack: string[];
  liveUrl?: string;
  categories: { _ref: string; _type: "reference" }[];
  completedAt: string;
  featured: boolean;
  orderRank: number;
  seo: ServiceSEO;
}

// ═══════════════════════════════════════════════════════════════
// Sanity Primitives (shared across all types)
// ═══════════════════════════════════════════════════════════════

export interface SanityImageReference {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
}

export interface SanityBlockContent {
  _type: "block";
  _key: string;
  style?: string;
  children: {
    _type: "span";
    _key: string;
    text: string;
    marks?: string[];
  }[];
  markDefs?: {
    _key: string;
    _type: string;
    href?: string;
  }[];
}
