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
};

export function ProductsTable({ products }: ProductsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_3px_rgb(0_0_0_/_0.05)]">
      <Table>
        <TableHeader className="bg-table-header">
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="h-11 px-4 text-muted-foreground">
              Nazwa
            </TableHead>
            <TableHead className="h-11 px-4 text-muted-foreground">SKU</TableHead>
            <TableHead className="h-11 px-4 text-muted-foreground">
              Kategoria
            </TableHead>
            <TableHead className="h-11 px-4 text-muted-foreground">
              Cena brutto
            </TableHead>
            <TableHead className="h-11 px-4 text-muted-foreground">
              Status
            </TableHead>
            <TableHead className="h-11 px-4 text-muted-foreground">
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
              <TableCell className="px-4 py-3.5 font-medium text-foreground">
                {product.name}
              </TableCell>
              <TableCell className="px-4 py-3.5 text-foreground">
                {product.sku}
              </TableCell>
              <TableCell className="px-4 py-3.5 text-foreground">
                {product.category}
              </TableCell>
              <TableCell className="px-4 py-3.5 font-semibold text-foreground">
                {formatPrice(product.grossPrice, product.currency)}
              </TableCell>
              <TableCell className="px-4 py-3.5">
                <ProductStatusBadge product={product} />
              </TableCell>
              <TableCell className="px-4 py-3.5 text-foreground">
                {formatStockQuantity(product.stockQuantity)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
