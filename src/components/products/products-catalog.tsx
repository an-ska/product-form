"use client";

import { useEffect, useState } from "react";
import { parseAsInteger, useQueryState } from "nuqs";

import { AddProductDialog } from "@/components/products/add-product-dialog";
import { ProductCreatedToast } from "@/components/products/product-created-toast";
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
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
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
    setIsAddProductOpen(true);
  }

  function handleProductCreated(product: Product) {
    setProducts((current) => [product, ...current]);
    void setPage(1);
    setIsToastOpen(true);
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
    <div className="flex flex-col gap-6">
      <ProductsHeader
        productCount={products.length}
        onAddProduct={handleAddProduct}
      />
      <div className="space-y-6 md:hidden">
        <ProductsCardList products={pageProducts} />
        {renderPagination()}
      </div>
      <div className="hidden md:block">
        <ProductsTable products={pageProducts} footer={renderPagination()} />
      </div>

      <AddProductDialog
        open={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
        onProductCreated={handleProductCreated}
      />
      <ProductCreatedToast open={isToastOpen} onOpenChange={setIsToastOpen} />
    </div>
  );
}
