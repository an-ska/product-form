"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { AddProductStepAvailability } from "@/components/products/add-product-step-availability";
import { AddProductStepInfo } from "@/components/products/add-product-step-info";
import { AddProductStepPrice } from "@/components/products/add-product-step-price";
import { AddProductStepper } from "@/components/products/add-product-stepper";
import { useProductForm } from "@/components/products/use-product-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  PRODUCT_FORM_STEP_COUNT,
  createProductFromFormValues,
  productFormSchema,
  productStep1Schema,
  productStep2Schema,
  type Product,
  type ProductFormStepId,
} from "@/lib/product";

type AddProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductCreated: (product: Product) => void;
};

const STEP1_FIELDS = [
  "name",
  "sku",
  "description",
  "producer",
  "category",
  "features",
] as const satisfies ReadonlyArray<keyof typeof productStep1Schema.shape>;

const STEP2_FIELDS = [
  "netPrice",
  "grossPrice",
  "vatRate",
  "currency",
] as const satisfies ReadonlyArray<keyof typeof productStep2Schema.shape>;

const STEP3_FIELDS = [
  "isAvailable",
  "isLimited",
  "stockQuantity",
  "minCartQuantity",
  "maxCartQuantity",
] as const;

export function AddProductDialog({
  open,
  onOpenChange,
  onProductCreated,
}: AddProductDialogProps) {
  const [step, setStep] = useState<ProductFormStepId>(1);
  const form = useProductForm();

  function resetDialogState() {
    setStep(1);
    form.reset();
  }

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      resetDialogState();
    }
  }

  function handleBack() {
    setStep((current) =>
      current > 1 ? ((current - 1) as ProductFormStepId) : current,
    );
  }

  function bumpSubmissionAttempts() {
    if (form.state.submissionAttempts === 0) {
      form.baseStore.setState((prev) => ({
        ...prev,
        submissionAttempts: 1,
      }));
    }
  }

  async function validateStepFields(
    fieldNames: ReadonlyArray<
      | (typeof STEP1_FIELDS)[number]
      | (typeof STEP2_FIELDS)[number]
      | (typeof STEP3_FIELDS)[number]
    >,
  ) {
    bumpSubmissionAttempts();

    for (const fieldName of fieldNames) {
      form.setFieldMeta(fieldName, (prev) => ({
        ...prev,
        isTouched: true,
      }));
    }

    await Promise.all(
      fieldNames.map((fieldName) =>
        Promise.resolve().then(() => form.validateField(fieldName, "submit")),
      ),
    );

    return fieldNames.some((fieldName) => {
      const fieldMeta = form.getFieldMeta(fieldName);
      return Boolean(fieldMeta?.errors.length);
    });
  }

  async function handleNext() {
    if (step === 1) {
      const hasStepErrors = await validateStepFields(STEP1_FIELDS);
      if (hasStepErrors) {
        return;
      }
    }

    if (step === 2) {
      const hasStepErrors = await validateStepFields(STEP2_FIELDS);
      if (hasStepErrors) {
        return;
      }
    }

    setStep((current) =>
      current < PRODUCT_FORM_STEP_COUNT
        ? ((current + 1) as ProductFormStepId)
        : current,
    );
  }

  async function handleSave() {
    const hasStepErrors = await validateStepFields(STEP3_FIELDS);
    if (hasStepErrors) {
      return;
    }

    const parsed = productFormSchema.safeParse(form.state.values);
    if (!parsed.success) {
      return;
    }

    onProductCreated(createProductFromFormValues(parsed.data));
    handleOpenChange(false);
  }

  const isFirstStep = step === 1;
  const isLastStep = step === PRODUCT_FORM_STEP_COUNT;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton
        className="flex h-dvh max-h-dvh w-full max-w-none flex-col gap-0 overflow-hidden rounded-none p-0 sm:h-auto sm:max-h-[min(90vh,720px)] sm:max-w-[720px] sm:rounded-xl"
      >
        <DialogHeader className="gap-0 px-4 py-6 text-left sm:pr-12">
          <DialogTitle className="text-base font-medium leading-none">
            Dodaj nowy produkt
          </DialogTitle>
          <DialogDescription className="sr-only">
            Wieloetapowy formularz dodawania produktu do katalogu.
          </DialogDescription>
        </DialogHeader>
        <div
          className="mx-4 border-b border-border sm:mx-0"
          aria-hidden
        />

        <div className="px-4 py-3">
          <AddProductStepper currentStep={step} />
        </div>
        <div
          className="mx-4 border-b border-border sm:mx-0"
          aria-hidden
        />

        <div className="flex-1 overflow-y-auto px-4 py-5">
          {step === 1 ? <AddProductStepInfo form={form} /> : null}
          {step === 2 ? <AddProductStepPrice form={form} /> : null}
          {step === 3 ? <AddProductStepAvailability form={form} /> : null}
        </div>

        <DialogFooter className="mx-0 mb-0 flex-row justify-between gap-2 rounded-none border-border bg-accent px-4 py-4 sm:justify-between">
          {isFirstStep ? (
            <span />
          ) : (
            <Button
              type="button"
              variant="outline"
              className="h-9 rounded-full px-4"
              onClick={handleBack}
            >
              <ArrowLeft data-icon="inline-start" />
              Wstecz
            </Button>
          )}

          {isLastStep ? (
            <Button
              type="button"
              className="h-9 rounded-full px-4"
              onClick={() => {
                void handleSave();
              }}
            >
              Zapisz produkt
            </Button>
          ) : (
            <Button
              type="button"
              className="h-9 rounded-full px-4"
              onClick={() => {
                void handleNext();
              }}
            >
              Dalej
              <ArrowRight data-icon="inline-end" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
