const productPluralRules = new Intl.PluralRules("pl");

const productNounByPlural: Record<Intl.LDMLPluralRule, string> = {
  zero: "produktów",
  one: "produkt",
  two: "produkty",
  few: "produkty",
  many: "produktów",
  other: "produktów",
};

/** Polish plural for catalog subtitle, e.g. "5 produktów w katalogu". */
export function formatCatalogCountLabel(count: number): string {
  const noun = productNounByPlural[productPluralRules.select(count)];
  return `${count} ${noun} w katalogu`;
}

export function formatStockQuantity(stockQuantity: number | null): string {
  return stockQuantity === null ? "—" : String(stockQuantity);
}
