import type { ReactNode } from "react";

import { ProductStatusBadge } from "@/components/products/product-status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatPrice,
  formatStockQuantity,
  type Product,
} from "@/lib/product";

type ProductsTableProps = {
  products: Product[];
  footer: ReactNode;
};

export function ProductsTable({ products, footer }: ProductsTableProps) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-border bg-card shadow-[0_1px_2px_rgb(0_0_0_/_0.05)]">
      <Table>
        <TableHeader className="bg-table-header">
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="h-10 px-4 text-muted-foreground">
              Nazwa
            </TableHead>
            <TableHead className="h-10 px-4 text-muted-foreground">SKU</TableHead>
            <TableHead className="h-10 px-4 text-muted-foreground">
              Kategoria
            </TableHead>
            <TableHead className="h-10 px-4 text-muted-foreground">
              Cena brutto
            </TableHead>
            <TableHead className="h-10 px-4 text-muted-foreground">
              Status
            </TableHead>
            <TableHead className="h-10 px-4 text-muted-foreground">
              Magazyn
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              className="border-border hover:bg-transparent"
            >
              <TableCell className="h-12 px-4 py-2 font-medium text-foreground">
                {product.name}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-xs text-muted-foreground">
                {product.sku}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-muted-foreground">
                {product.category}
              </TableCell>
              <TableCell className="h-12 px-4 py-2 font-medium text-foreground">
                {formatPrice(product.grossPrice, product.currency)}
              </TableCell>
              <TableCell className="h-12 px-4 py-2">
                <ProductStatusBadge product={product} />
              </TableCell>
              <TableCell className="h-12 px-4 py-2 text-foreground">
                {formatStockQuantity(product.stockQuantity)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="border-t border-border bg-table-header px-4 py-4">
        {footer}
      </div>
    </div>
  );
}
