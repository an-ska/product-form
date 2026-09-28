"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";

import { defaultProductFormValues } from "@/lib/product";

export function useProductForm() {
  return useForm({
    defaultValues: defaultProductFormValues,
    validationLogic: revalidateLogic({
      mode: "blur",
      modeAfterSubmission: "change",
    }),
  });
}

export type ProductFormApi = ReturnType<typeof useProductForm>;
