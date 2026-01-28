import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your shopping cart.",
};

export default function CartPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24">
      <h1 className="mb-4 text-4xl font-bold tracking-tight">Cart</h1>
      <p className="text-lg text-[var(--color-muted)]">
        Cart scaffold — connect to MedusaJS session.
      </p>
    </section>
  );
}
