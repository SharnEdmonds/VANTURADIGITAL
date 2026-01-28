import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store",
  description: "Vantura Digital — digital products and services.",
};

export default function StorePage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <h1 className="mb-4 text-4xl font-bold tracking-tight">Store</h1>
      <p className="text-lg text-[var(--color-muted)]">
        Commerce powered by MedusaJS — scaffold ready.
      </p>
    </section>
  );
}
