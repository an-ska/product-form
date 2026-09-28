"use client";

import { useForm } from "@tanstack/react-form";

import { defaultProductFormValues } from "@/lib/product";

export function useProductForm() {
  return useForm({
    defaultValues: defaultProductFormValues,
  });
}

export type ProductFormApi = ReturnType<typeof useProductForm>;
