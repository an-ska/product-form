"use client";

import { useState } from "react";

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
      <ProductsTable products={products} />
    </div>
  );
}
