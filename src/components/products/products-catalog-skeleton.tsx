function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-muted ${className ?? ""}`}
      aria-hidden
    />
  );
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3">
      <div className="flex items-center justify-between gap-2.5">
        <div className="min-w-0 flex-1 space-y-2">
          <SkeletonBlock className="h-5 w-2/3" />
          <SkeletonBlock className="h-3 w-1/3" />
        </div>
        <SkeletonBlock className="h-6 w-20 rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-1 rounded-[9px] bg-accent p-3">
        <SkeletonBlock className="h-10 w-full" />
        <SkeletonBlock className="h-10 w-full" />
        <SkeletonBlock className="h-10 w-full" />
      </div>
    </div>
  );
}

function ProductsTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-[10px] border border-border bg-card shadow-[0_1px_2px_rgb(0_0_0_/_0.05)]">
      <div className="border-b border-border bg-table-header px-4 py-3">
        <div className="grid grid-cols-6 gap-4">
          {Array.from({ length: 6 }, (_, index) => (
            <SkeletonBlock key={index} className="h-4 w-16" />
          ))}
        </div>
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: 5 }, (_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-6 gap-4 px-4 py-4">
            {Array.from({ length: 6 }, (_, cellIndex) => (
              <SkeletonBlock key={cellIndex} className="h-4 w-full max-w-24" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductsCatalogSkeleton() {
  return (
    <div
      className="flex flex-col gap-6"
      role="status"
      aria-busy="true"
      aria-label="Ładowanie katalogu produktów"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 space-y-2">
          <SkeletonBlock className="h-7 w-28" />
          <SkeletonBlock className="h-4 w-40" />
        </div>
        <SkeletonBlock className="h-9 w-36 rounded-full" />
      </div>

      <div className="space-y-3 md:hidden">
        {Array.from({ length: 3 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>

      <div className="hidden md:block">
        <ProductsTableSkeleton />
      </div>

      <span className="sr-only">Ładowanie katalogu produktów…</span>
    </div>
  );
}
