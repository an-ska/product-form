import { DEFAULT_CURRENCY, DEFAULT_VAT_RATE } from "./constants";
import type { ProductFormValues } from "./types";

export const defaultProductFormValues: ProductFormValues = {
  name: "",
  sku: "",
  description: "",
  producer: "",
  category: "",
  features: [],
  netPrice: 0,
  grossPrice: 0,
  vatRate: DEFAULT_VAT_RATE,
  currency: DEFAULT_CURRENCY,
  isAvailable: true,
  isLimited: false,
  stockQuantity: null,
  minCartQuantity: 1,
  maxCartQuantity: 10,
};
