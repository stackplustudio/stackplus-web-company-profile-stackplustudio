export default function Loading() {
  return (
    <section className="min-h-screen bg-surface-alt py-20" aria-busy="true">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 h-24 max-w-xl animate-pulse rounded-[16px] bg-line" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-96 animate-pulse rounded-[16px] border border-line bg-surface" />
          ))}
        </div>
      </div>
    </section>
  );
}