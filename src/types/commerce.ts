// ═══════════════════════════════════════════════════════════════
// MedusaJS Commerce Types (slim client-side projections)
// ═══════════════════════════════════════════════════════════════

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  thumbnail: string | null;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  title: string;
  prices: Price[];
  inventory_quantity: number;
}

export interface Price {
  amount: number;
  currency_code: string;
}

export interface Cart {
  id: string;
  items: LineItem[];
  total: number;
  subtotal: number;
  region_id: string;
}

export interface LineItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  variant_id: string;
  thumbnail: string | null;
}
