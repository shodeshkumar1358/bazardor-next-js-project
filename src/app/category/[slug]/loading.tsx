export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 h-8 w-40 animate-pulse rounded bg-slate-200" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-xl border border-slate-200 p-4"
          >
            <div className="mb-4 h-20 rounded-lg bg-slate-200" />
            <div className="mb-3 h-4 w-3/4 rounded bg-slate-200" />
            <div className="h-5 w-1/2 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
