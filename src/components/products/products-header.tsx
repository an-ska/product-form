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
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0 space-y-1">
        <h1 className="text-xl font-semibold leading-7 text-foreground">
          Produkty
        </h1>
        <p className="text-sm text-muted-foreground">
          {formatCatalogCountLabel(productCount)}
        </p>
      </div>

      <Button
        type="button"
        className="h-9 shrink-0 rounded-full px-4"
        onClick={onAddProduct}
      >
        <Plus data-icon="inline-start" />
        Dodaj produkt
      </Button>
    </div>
  );
}
