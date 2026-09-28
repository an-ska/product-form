import { Suspense } from "react";

import { ProductsCatalog } from "@/components/products/products-catalog";
import { ProductsCatalogSkeleton } from "@/components/products/products-catalog-skeleton";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={<ProductsCatalogSkeleton />}>
          <ProductsCatalog />
        </Suspense>
      </div>
    </main>
  );
}
