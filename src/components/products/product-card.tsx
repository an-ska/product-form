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
    <article className="rounded-xl border border-border bg-card p-4 shadow-[0_1px_3px_rgb(0_0_0_/_0.05)]">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-base font-semibold leading-snug text-foreground">
          {product.name}
        </h2>
        <ProductStatusBadge product={product} className="shrink-0" />
      </div>

      <p className="mt-1 text-sm text-muted-foreground">{product.sku}</p>

      <div className="mt-4 grid grid-cols-3 gap-3 rounded-lg bg-muted px-3 py-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Kategoria</p>
          <p className="mt-0.5 truncate text-sm font-medium text-foreground">
            {product.category}
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Cena brutto</p>
          <p className="mt-0.5 truncate text-sm font-semibold text-foreground">
            {formatPrice(product.grossPrice, product.currency)}
          </p>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Magazyn</p>
          <p className="mt-0.5 truncate text-sm font-medium text-foreground">
            {formatStockQuantity(product.stockQuantity)}
          </p>
        </div>
      </div>
    </article>
  );
}
