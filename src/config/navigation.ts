// Static navigation fallback (overridden by Sanity siteSettings at runtime)

export const headerNavFallback = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNavFallback = [
  { label: "Services", href: "/services" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;
