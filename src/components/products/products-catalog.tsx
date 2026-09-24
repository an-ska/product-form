"use client";

import { useState } from "react";

import { ProductsCardList } from "@/components/products/products-card-list";
import { ProductsHeader } from "@/components/products/products-header";
import { ProductsTable } from "@/components/products/products-table";
import { initialProducts, type Product } from "@/lib/product";

export function ProductsCatalog() {
  const [products] = useState<Product[]>(initialProducts);

  function handleAddProduct() {
  }

  return (
    <div className="flex flex-col">
      <ProductsHeader
        productCount={products.length}
        onAddProduct={handleAddProduct}
      />
      <div className="md:hidden">
        <ProductsCardList products={products} />
      </div>
      <div className="hidden md:block">
        <ProductsTable products={products} />
      </div>
    </div>
  );
}
