import { z } from "zod";

import {
  CATEGORIES,
  CURRENCIES,
  PRODUCERS,
  PRODUCT_FEATURES,
  VAT_RATES,
} from "./constants";
import type { VatRate } from "./types";

const skuSchema = z
  .string()
  .trim()
  .min(1, "SKU jest wymagane")
  .max(24, "SKU może mieć maksymalnie 24 znaki")
  .regex(/^[a-zA-Z0-9]+$/, "SKU może zawierać tylko litery i cyfry");

const vatRateSchema = z
  .number({ error: "Wybierz stawkę VAT" })
  .refine((value): value is VatRate => (VAT_RATES as readonly number[]).includes(value), {
    error: "Wybierz stawkę VAT",
  });

export const productStep1Schema = z.object({
  name: z.string().trim().min(3, "Nazwa musi mieć co najmniej 3 znaki"),
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
    .min(0, "Cena netto nie może być ujemna"),
  grossPrice: z
    .number({ error: "Podaj cenę brutto" })
    .min(0, "Cena brutto nie może być ujemna"),
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

export const productStep3Schema = z
  .object({
    isAvailable: z.boolean(),
    isLimited: z.boolean(),
    stockQuantity: z.number().nullable(),
    minCartQuantity: positiveInt,
    maxCartQuantity: positiveInt,
  })
  .superRefine((values, ctx) => {
    if (values.isLimited) {
      const stockResult = nonNegativeInt.safeParse(values.stockQuantity);

      if (!stockResult.success) {
        for (const issue of stockResult.error.issues) {
          ctx.addIssue({
            ...issue,
            path: ["stockQuantity"],
          });
        }
      }
    }

    if (values.minCartQuantity > values.maxCartQuantity) {
      ctx.addIssue({
        code: "custom",
        path: ["minCartQuantity"],
        message: "Minimalna ilość nie może być większa niż maksymalna",
      });
      ctx.addIssue({
        code: "custom",
        path: ["maxCartQuantity"],
        message: "Maksymalna ilość nie może być mniejsza niż minimalna",
      });
    }
  });

export const productFormSchema = productStep1Schema
  .and(productStep2Schema)
  .and(productStep3Schema);

export type ProductStep1Values = z.infer<typeof productStep1Schema>;
export type ProductStep2Values = z.infer<typeof productStep2Schema>;
export type ProductStep3Values = z.infer<typeof productStep3Schema>;
export type ProductFormSchemaValues = z.infer<typeof productFormSchema>;
