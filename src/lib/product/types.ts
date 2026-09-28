import {
  CATEGORIES,
  CURRENCIES,
  PRODUCERS,
  PRODUCT_FEATURES,
  VAT_RATES,
} from "./constants";

export type Producer = (typeof PRODUCERS)[number];
export type Category = (typeof CATEGORIES)[number];
export type ProductFeature = (typeof PRODUCT_FEATURES)[number];
export type VatRate = (typeof VAT_RATES)[number];
export type Currency = (typeof CURRENCIES)[number];

export type ProductStatus = "available" | "unavailable";

export type Product = {
  id: string;
  name: string;
  sku: string;
  description: string;
  producer: Producer;
  category: Category;
  features: ProductFeature[];
  netPrice: number;
  grossPrice: number;
  vatRate: VatRate;
  currency: Currency;
  isAvailable: boolean;
  isLimited: boolean;
  stockQuantity: number | null;
  minCartQuantity: number;
  maxCartQuantity: number;
};

export function getProductStatus(product: Pick<Product, "isAvailable">): ProductStatus {
  return product.isAvailable ? "available" : "unavailable";
}

export function getProductStatusLabel(status: ProductStatus): string {
  return status === "available" ? "Dostępny" : "Niedostępny";
}

function isOneOf<const T extends string | number>(
  value: string | number,
  options: readonly T[],
): value is T {
  return (options as readonly (string | number)[]).includes(value);
}

export function parseProducer(value: string): Producer | null {
  return isOneOf(value, PRODUCERS) ? value : null;
}

export function parseCategory(value: string): Category | null {
  return isOneOf(value, CATEGORIES) ? value : null;
}

export function parseCurrency(value: string): Currency | null {
  return isOneOf(value, CURRENCIES) ? value : null;
}

export function parseVatRate(value: string): VatRate | null {
  const rate = Number(value);
  return isOneOf(rate, VAT_RATES) ? rate : null;
}
