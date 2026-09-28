import type { VatRate } from "./types";

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

export function formatMoneyInputValue(amount: number): string {
  return roundMoney(amount).toFixed(2).replace(".", ",");
}

export function formatPrice(amount: number, currency: string): string {
  const formatted = new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${formatted} ${currency}`;
}

export function pricesFromNet(netPrice: number | null, vatRate: number) {
  if (netPrice === null) {
    return { netPrice: null, grossPrice: null };
  }

  return {
    netPrice,
    grossPrice: calculateGrossPrice(netPrice, vatRate),
  };
}

export function pricesFromGross(grossPrice: number | null, vatRate: number) {
  if (grossPrice === null) {
    return { netPrice: null, grossPrice: null };
  }

  return {
    netPrice: calculateNetPrice(grossPrice, vatRate),
    grossPrice,
  };
}

export function pricesFromVatChange(
  netPrice: number | null,
  vatRate: VatRate,
) {
  if (netPrice === null) {
    return { netPrice: null, grossPrice: null, vatRate };
  }

  return {
    netPrice,
    grossPrice: calculateGrossPrice(netPrice, vatRate),
    vatRate,
  };
}
