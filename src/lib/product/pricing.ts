/** Round money to 2 decimal places (grosze / cents). */
export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

/** brutto = netto × (1 + VAT / 100) */
export function calculateGrossPrice(netPrice: number, vatRate: number): number {
  return roundMoney(netPrice * (1 + vatRate / 100));
}

/** netto = brutto / (1 + VAT / 100) */
export function calculateNetPrice(grossPrice: number, vatRate: number): number {
  return roundMoney(grossPrice / (1 + vatRate / 100));
}

export function formatPrice(amount: number, currency: string): string {
  const formatted = new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${formatted} ${currency}`;
}
