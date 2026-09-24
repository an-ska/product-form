import type {
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

/** Persisted / listed product shown in the catalog */
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
  /** Present only when the product is limited; otherwise shown as "—" */
  stockQuantity: number | null;
  minCartQuantity: number;
  maxCartQuantity: number;
};

/** Values held by the multi-step add-product form */
export type ProductFormValues = {
  name: string;
  sku: string;
  description: string;
  producer: Producer | "";
  category: Category | "";
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
