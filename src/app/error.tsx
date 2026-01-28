"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="mb-4 font-mono text-sm uppercase tracking-widest text-[var(--color-accent)]">
        Error
      </p>
      <h1 className="mb-4 text-4xl font-bold tracking-tight">
        Something Went Wrong
      </h1>
      <p className="mb-8 max-w-md text-[var(--color-muted)]">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="inline-flex h-12 items-center justify-center bg-[var(--color-accent)] px-8 font-medium text-white transition-colors hover:bg-[var(--color-accent)]/90"
      >
        Try Again
      </button>
    </section>
  );
}
