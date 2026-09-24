import { Badge } from "@/components/ui/badge";
import {
  getProductStatus,
  getProductStatusLabel,
  type Product,
} from "@/lib/product";
import { cn } from "@/lib/utils";

type ProductStatusBadgeProps = {
  product: Pick<Product, "isAvailable">;
  className?: string;
};

export function ProductStatusBadge({
  product,
  className,
}: ProductStatusBadgeProps) {
  const status = getProductStatus(product);
  const isAvailable = status === "available";

  return (
    <Badge
      className={cn(
        isAvailable
          ? "bg-success/10 text-success"
          : "bg-destructive/10 text-destructive",
        className,
      )}
    >
      {getProductStatusLabel(status)}
    </Badge>
  );
}
