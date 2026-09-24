export const PRODUCERS = [
  "Apple",
  "Samsung",
  "Sony",
  "Bosch",
  "Xiaomi",
  "LG",
  "Dell",
  "Lenovo",
] as const;

export const CATEGORIES = [
  "Komputery",
  "Telefony",
  "RTV",
  "AGD",
  "Akcesoria",
] as const;

export const PRODUCT_FEATURES = [
  "Bluetooth",
  "WiFi",
  "USB-C",
  "Wodoodporny",
  "Bezprzewodowy",
  "Ekologiczny",
  "Premium",
] as const;

/** Common Polish VAT rates (%) */
export const VAT_RATES = [0, 5, 8, 23] as const;

export const CURRENCIES = ["PLN", "EUR", "USD"] as const;

export const DEFAULT_VAT_RATE = 23 satisfies (typeof VAT_RATES)[number];
export const DEFAULT_CURRENCY = "PLN" satisfies (typeof CURRENCIES)[number];

export const PRODUCTS_PER_PAGE = 5;
