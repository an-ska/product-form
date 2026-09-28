import { describe, expect, it } from "vitest";

import {
  calculateGrossPrice,
  calculateNetPrice,
  pricesFromGross,
  pricesFromNet,
  pricesFromVatChange,
  roundMoney,
} from "@/lib/product/pricing";

describe("pricing", () => {
  it("converts net ↔ gross with VAT 23%", () => {
    expect(calculateGrossPrice(100, 23)).toBe(123);
    expect(calculateNetPrice(123, 23)).toBe(100);
  });

  it("rounds money to grosze", () => {
    expect(roundMoney(10.005)).toBe(10.01);
    expect(calculateGrossPrice(99.99, 23)).toBe(122.99);
  });

  it("keeps both prices null when the edited side is empty", () => {
    expect(pricesFromNet(null, 23)).toEqual({
      netPrice: null,
      grossPrice: null,
    });
    expect(pricesFromGross(null, 23)).toEqual({
      netPrice: null,
      grossPrice: null,
    });
  });

  it("recalculates gross from net when VAT changes", () => {
    expect(pricesFromVatChange(100, 8)).toEqual({
      netPrice: 100,
      grossPrice: 108,
      vatRate: 8,
    });
    expect(pricesFromVatChange(null, 8)).toEqual({
      netPrice: null,
      grossPrice: null,
      vatRate: 8,
    });
  });
});
