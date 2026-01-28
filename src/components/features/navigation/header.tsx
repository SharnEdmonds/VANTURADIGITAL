import { headerNavFallback } from "@/config/navigation";
import { HeaderClient } from "./header-client";

// ═══════════════════════════════════════════════════════════════
// Header — Uses static navigation config (no Sanity dependency)
// ═══════════════════════════════════════════════════════════════

export function Header() {
  // Always use the static fallback navigation
  const navItems = [...headerNavFallback] as { label: string; href: string; external?: boolean; _key?: string }[];

  return <HeaderClient navItems={navItems} />;
}
