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
        "transition-colors",
        isAvailable
          ? "bg-[#e8f8ee] text-[#16a34a] hover:bg-[#d1f0dc] hover:text-[#16a34a]"
          : "bg-[rgba(220,38,38,0.1)] text-[#dc2626] hover:bg-[rgba(220,38,38,0.2)] hover:text-[#dc2626]",
        className,
      )}
    >
      {getProductStatusLabel(status)}
    </Badge>
  );
}
