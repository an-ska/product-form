const productPluralRules = new Intl.PluralRules("pl");

const productNounByPlural: Record<Intl.LDMLPluralRule, string> = {
  zero: "produktów",
  one: "produkt",
  two: "produkty",
  few: "produkty",
  many: "produktów",
  other: "produktów",
};

export function formatCatalogCountLabel(count: number): string {
  const noun = productNounByPlural[productPluralRules.select(count)];
  return `${count} ${noun} w katalogu`;
}

export function formatPaginationSummary(
  page: number,
  totalPages: number,
  totalItems: number,
): string {
  const noun = productNounByPlural[productPluralRules.select(totalItems)];
  return `Strona ${page} z ${totalPages} · ${totalItems} ${noun}`;
}

export function formatStockQuantity(stockQuantity: number | null): string {
  return stockQuantity === null ? "—" : String(stockQuantity);
}
