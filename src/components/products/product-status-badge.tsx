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
      variant={isAvailable ? "success" : "destructive"}
      className={cn(
        "transition-colors",
        isAvailable
          ? "hover:bg-[#454545] hover:text-success"
          : "hover:bg-destructive/20 hover:text-destructive",
        className,
      )}
    >
      {getProductStatusLabel(status)}
    </Badge>
  );
}
