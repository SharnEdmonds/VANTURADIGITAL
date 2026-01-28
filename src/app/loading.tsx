export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin border-2 border-[var(--color-muted)] border-t-[var(--color-accent)]" />
    </div>
  );
}
