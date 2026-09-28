"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";

import {
  defaultProductFormValues,
  type ProductFormValues,
} from "@/lib/product";

export type ProductFormSubmitMeta = {
  intent: "next" | "save";
};

type UseProductFormOptions = {
  onSubmit?: (props: {
    value: ProductFormValues;
    meta: ProductFormSubmitMeta;
  }) => unknown | Promise<unknown>;
  onSubmitInvalid?: (props: {
    value: ProductFormValues;
    meta: ProductFormSubmitMeta;
  }) => void;
};

export function useProductForm(options: UseProductFormOptions = {}) {
  return useForm({
    defaultValues: defaultProductFormValues,
    canSubmitWhenInvalid: true,
    validationLogic: revalidateLogic({
      mode: "blur",
      modeAfterSubmission: "change",
    }),
    onSubmitMeta: { intent: "next" } as ProductFormSubmitMeta,
    onSubmit: options.onSubmit,
    onSubmitInvalid: options.onSubmitInvalid,
  });
}

export type ProductFormApi = ReturnType<typeof useProductForm>;
