"use client";

import { useEffect, useState } from "react";
import { parseAsInteger, useQueryState } from "nuqs";

import { ProductsCardList } from "@/components/products/products-card-list";
import { ProductsHeader } from "@/components/products/products-header";
import { ProductsPagination } from "@/components/products/products-pagination";
import { ProductsTable } from "@/components/products/products-table";
import {
  PRODUCTS_PER_PAGE,
  clampPage,
  getTotalPages,
  initialProducts,
  paginateItems,
  type Product,
} from "@/lib/product";

export function ProductsCatalog() {
  const [products] = useState<Product[]>(initialProducts);
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: true }),
  );

  const totalPages = getTotalPages(products.length, PRODUCTS_PER_PAGE);
  const currentPage = clampPage(page, totalPages);
  const pageProducts = paginateItems(
    products,
    currentPage,
    PRODUCTS_PER_PAGE,
  );

  useEffect(() => {
    if (page !== currentPage) {
      void setPage(currentPage);
    }
  }, [page, currentPage, setPage]);

  function handleAddProduct() {
  }

  function handlePageChange(nextPage: number) {
    void setPage(clampPage(nextPage, totalPages));
  }

  function renderPagination() {
    return (
      <ProductsPagination
        page={currentPage}
        totalPages={totalPages}
        totalItems={products.length}
        onPageChange={handlePageChange}
      />
    );
  }

  return (
    <div className="flex flex-col">
      <ProductsHeader
        productCount={products.length}
        onAddProduct={handleAddProduct}
      />
      <div className="space-y-4 md:hidden">
        <ProductsCardList products={pageProducts} />
        {renderPagination()}
      </div>
      <div className="hidden md:block">
        <ProductsTable products={pageProducts} footer={renderPagination()} />
      </div>
    </div>
  );
}
