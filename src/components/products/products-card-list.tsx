import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/lib/product";

type ProductsCardListProps = {
  products: Product[];
};

export function ProductsCardList({ products }: ProductsCardListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
