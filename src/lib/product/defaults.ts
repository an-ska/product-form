import { DEFAULT_CURRENCY, DEFAULT_VAT_RATE } from "./constants";
import type { ProductFormValues } from "./schemas";

export const defaultProductFormValues: ProductFormValues = {
  name: "",
  sku: "",
  description: "",
  producer: "",
  category: "",
  features: [],
  netPrice: null,
  grossPrice: null,
  vatRate: DEFAULT_VAT_RATE,
  currency: DEFAULT_CURRENCY,
  isAvailable: true,
  isLimited: false,
  stockQuantity: null,
  minCartQuantity: 1,
  maxCartQuantity: 10,
};
