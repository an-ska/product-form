import { describe, expect, it } from "vitest";

import {
  getCartQuantityError,
  getStockQuantityError,
} from "@/lib/product/schemas";

describe("getStockQuantityError", () => {
  it("skips validation when the product is not limited", () => {
    expect(getStockQuantityError(false, null)).toBeUndefined();
  });

  it("requires a non-negative integer when limited", () => {
    expect(getStockQuantityError(true, null)).toBe("Podaj liczbę całkowitą");
    expect(getStockQuantityError(true, -1)).toBe("Wartość nie może być ujemna");
    expect(getStockQuantityError(true, 0)).toBeUndefined();
  });
});

describe("getCartQuantityError", () => {
  it("allows a valid min/max pair", () => {
    expect(getCartQuantityError("minCartQuantity", 1, 10)).toBeUndefined();
    expect(getCartQuantityError("maxCartQuantity", 1, 10)).toBeUndefined();
    expect(getCartQuantityError("minCartQuantity", 5, 5)).toBeUndefined();
  });

  it("rejects when min is greater than max", () => {
    expect(getCartQuantityError("minCartQuantity", 5, 2)).toBe(
      "Minimalna ilość nie może być większa niż maksymalna",
    );
    expect(getCartQuantityError("maxCartQuantity", 5, 2)).toBe(
      "Maksymalna ilość nie może być mniejsza niż minimalna",
    );
  });
});
