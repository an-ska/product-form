import { calculateGrossPrice, calculateNetPrice } from "./pricing";
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

/** After editing net price: recompute gross from VAT. */
export function pricesFromNet(netPrice: number, vatRate: number) {
  return {
    netPrice,
    grossPrice: calculateGrossPrice(netPrice, vatRate),
  };
}

/** After editing gross price: recompute net from VAT. */
export function pricesFromGross(grossPrice: number, vatRate: number) {
  return {
    netPrice: calculateNetPrice(grossPrice, vatRate),
    grossPrice,
  };
}

/** After changing VAT: keep net, recompute gross. */
export function pricesFromVatChange(netPrice: number, vatRate: number) {
  return {
    netPrice,
    grossPrice: calculateGrossPrice(netPrice, vatRate),
    vatRate,
  };
}
