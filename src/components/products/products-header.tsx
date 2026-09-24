import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCatalogCountLabel } from "@/lib/product";

type ProductsHeaderProps = {
  productCount: number;
  onAddProduct: () => void;
};

export function ProductsHeader({
  productCount,
  onAddProduct,
}: ProductsHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between gap-3 sm:mb-8">
      <div className="min-w-0 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Produkty
        </h1>
        <p className="text-sm text-muted-foreground">
          {formatCatalogCountLabel(productCount)}
        </p>
      </div>

      <Button
        type="button"
        size="lg"
        className="shrink-0 rounded-full px-3 sm:px-4"
        onClick={onAddProduct}
      >
        <Plus data-icon="inline-start" />
        Dodaj produkt
      </Button>
    </div>
  );
}
