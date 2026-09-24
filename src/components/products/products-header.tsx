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
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Produkty
        </h1>
        <p className="text-sm text-muted-foreground">
          {formatCatalogCountLabel(productCount)}
        </p>
      </div>

      <Button
        type="button"
        size="lg"
        className="rounded-full px-4"
        onClick={onAddProduct}
      >
        <Plus data-icon="inline-start" />
        Dodaj produkt
      </Button>
    </div>
  );
}
