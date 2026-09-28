import { z } from "zod";

import {
  CATEGORIES,
  CURRENCIES,
  PRODUCERS,
  PRODUCT_FEATURES,
  VAT_RATES,
} from "./constants";
import type { VatRate } from "./types";

const skuSchema = z.string().trim().superRefine((value, ctx) => {
  if (!value) {
    ctx.addIssue({ code: "custom", message: "SKU jest wymagane" });
    return;
  }

  if (value.length > 24) {
    ctx.addIssue({
      code: "custom",
      message: "SKU może mieć maksymalnie 24 znaki",
    });
    return;
  }

  if (!/^[a-zA-Z0-9]+$/.test(value)) {
    ctx.addIssue({
      code: "custom",
      message: "SKU może zawierać tylko litery i cyfry",
    });
  }
});

const [vat0, vat5, vat8, vat23] = VAT_RATES;
const vatRateSchema = z.union(
  [z.literal(vat0), z.literal(vat5), z.literal(vat8), z.literal(vat23)],
  { error: "Wybierz stawkę VAT" },
) satisfies z.ZodType<VatRate>;

const nameSchema = z.string().trim().superRefine((value, ctx) => {
  if (!value) {
    ctx.addIssue({ code: "custom", message: "Nazwa jest wymagana" });
    return;
  }

  if (value.length < 3) {
    ctx.addIssue({
      code: "custom",
      message: "Nazwa musi mieć co najmniej 3 znaki",
    });
  }
});

export const productStep1Schema = z.object({
  name: nameSchema,
  sku: skuSchema,
  description: z.string().trim(),
  producer: z.enum(PRODUCERS, { error: "Wybierz producenta" }),
  category: z.enum(CATEGORIES, { error: "Wybierz kategorię" }),
  features: z
    .array(z.enum(PRODUCT_FEATURES))
    .min(1, "Wybierz co najmniej jedną cechę"),
});

export const productStep2Schema = z.object({
  netPrice: z
    .number({ error: "Podaj cenę netto" })
    .positive("Cena netto musi być większa od zera"),
  grossPrice: z
    .number({ error: "Podaj cenę brutto" })
    .positive("Cena brutto musi być większa od zera"),
  vatRate: vatRateSchema,
  currency: z.enum(CURRENCIES, { error: "Wybierz walutę" }),
});

const nonNegativeInt = z
  .number({ error: "Podaj liczbę całkowitą" })
  .int("Wartość musi być liczbą całkowitą")
  .min(0, "Wartość nie może być ujemna");

const positiveInt = z
  .number({ error: "Podaj liczbę całkowitą" })
  .int("Wartość musi być liczbą całkowitą")
  .min(1, "Wartość musi być większa od zera");

export const productStep3FieldsSchema = z.object({
  isAvailable: z.boolean(),
  isLimited: z.boolean(),
  stockQuantity: z.number().nullable(),
  minCartQuantity: positiveInt,
  maxCartQuantity: positiveInt,
});

export function getStockQuantityError(
  isLimited: boolean,
  stockQuantity: number | null,
): string | undefined {
  if (!isLimited) {
    return undefined;
  }

  const result = nonNegativeInt.safeParse(stockQuantity);
  return result.success ? undefined : result.error.issues[0]?.message;
}

function getCartQuantityOrderError(
  field: "minCartQuantity" | "maxCartQuantity",
  minCartQuantity: number,
  maxCartQuantity: number,
): string | undefined {
  if (minCartQuantity <= maxCartQuantity) {
    return undefined;
  }

  return field === "minCartQuantity"
    ? "Minimalna ilość nie może być większa niż maksymalna"
    : "Maksymalna ilość nie może być mniejsza niż minimalna";
}

export function getCartQuantityError(
  field: "minCartQuantity" | "maxCartQuantity",
  minCartQuantity: number,
  maxCartQuantity: number,
): string | undefined {
  const value =
    field === "minCartQuantity" ? minCartQuantity : maxCartQuantity;
  const result = positiveInt.safeParse(value);

  if (!result.success) {
    return result.error.issues[0]?.message;
  }

  return getCartQuantityOrderError(field, minCartQuantity, maxCartQuantity);
}

export const productStep3Schema = productStep3FieldsSchema.superRefine(
  (values, ctx) => {
    const stockError = getStockQuantityError(
      values.isLimited,
      values.stockQuantity,
    );

    if (stockError) {
      ctx.addIssue({
        code: "custom",
        path: ["stockQuantity"],
        message: stockError,
      });
    }

    for (const field of ["minCartQuantity", "maxCartQuantity"] as const) {
      const message = getCartQuantityOrderError(
        field,
        values.minCartQuantity,
        values.maxCartQuantity,
      );

      if (message) {
        ctx.addIssue({
          code: "custom",
          path: [field],
          message,
        });
      }
    }
  },
);

export const productFormSchema = productStep1Schema
  .and(productStep2Schema)
  .and(productStep3Schema);

export const productFormValuesSchema = z.object({
  name: z.string(),
  sku: z.string(),
  description: z.string(),
  producer: z.union([z.enum(PRODUCERS), z.literal("")]),
  category: z.union([z.enum(CATEGORIES), z.literal("")]),
  features: z.array(z.enum(PRODUCT_FEATURES)),
  netPrice: z.number().nullable(),
  grossPrice: z.number().nullable(),
  vatRate: vatRateSchema,
  currency: z.enum(CURRENCIES),
  isAvailable: z.boolean(),
  isLimited: z.boolean(),
  stockQuantity: z.number().nullable(),
  minCartQuantity: z.number(),
  maxCartQuantity: z.number(),
});

export type ProductStep1Values = z.infer<typeof productStep1Schema>;
export type ProductStep2Values = z.infer<typeof productStep2Schema>;
export type ProductStep3Values = z.infer<typeof productStep3Schema>;
export type ProductFormSchemaValues = z.infer<typeof productFormSchema>;
export type ProductFormValues = z.infer<typeof productFormValuesSchema>;
