import { ProductStatusBadge } from "@/components/products/product-status-badge";
import {
  formatPrice,
  formatStockQuantity,
  type Product,
} from "@/lib/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3">
      <div className="flex items-center justify-between gap-2.5">
        <div className="min-w-0 space-y-1">
          <h2 className="truncate text-base font-medium leading-6 text-foreground">
            {product.name}
          </h2>
          <p className="truncate text-xs text-muted-foreground">{product.sku}</p>
        </div>
        <ProductStatusBadge product={product} className="shrink-0" />
      </div>

      <div className="grid grid-cols-3 gap-1 rounded-[9px] bg-accent p-3">
        <div className="min-w-0 space-y-1">
          <p className="text-xs text-muted-foreground">Kategoria</p>
          <p className="truncate text-sm text-foreground">{product.category}</p>
        </div>
        <div className="min-w-0 space-y-1">
          <p className="text-xs text-muted-foreground">Cena brutto</p>
          <p className="truncate text-sm font-medium text-foreground">
            {formatPrice(product.grossPrice, product.currency)}
          </p>
        </div>
        <div className="min-w-0 space-y-1">
          <p className="text-xs text-muted-foreground">Magazyn</p>
          <p className="truncate text-sm text-foreground">
            {formatStockQuantity(product.stockQuantity)}
          </p>
        </div>
      </div>
    </article>
  );
}
