import type { ProductFormSchemaValues } from "./schemas";
import type { Product } from "./types";

export function createProductFromFormValues(
  values: ProductFormSchemaValues,
  id: string = crypto.randomUUID(),
): Product {
  return {
    id,
    name: values.name,
    sku: values.sku,
    description: values.description,
    producer: values.producer,
    category: values.category,
    features: values.features,
    netPrice: values.netPrice,
    grossPrice: values.grossPrice,
    vatRate: values.vatRate,
    currency: values.currency,
    isAvailable: values.isAvailable,
    isLimited: values.isLimited,
    stockQuantity: values.isLimited ? values.stockQuantity : null,
    minCartQuantity: values.minCartQuantity,
    maxCartQuantity: values.maxCartQuantity,
  };
}
