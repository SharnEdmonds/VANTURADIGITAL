import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="mb-4 font-mono text-sm uppercase tracking-widest text-[var(--color-muted)]">
        404
      </p>
      <h1 className="mb-4 text-4xl font-bold tracking-tight">
        Page Not Found
      </h1>
      <p className="mb-8 max-w-md text-[var(--color-muted)]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex h-12 items-center justify-center bg-[var(--color-accent)] px-8 font-medium text-white transition-colors hover:bg-[var(--color-accent)]/90"
      >
        Back to Home
      </Link>
    </section>
  );
}
