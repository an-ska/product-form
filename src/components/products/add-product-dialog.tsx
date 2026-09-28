"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  productStep1Schema,
  productStep2Schema,
  type ProductFormStepId,
} from "@/lib/product";

type AddProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export function AddProductDialog({
  open,
  onOpenChange,
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

  async function validateStepFields(
    fieldNames: ReadonlyArray<
      (typeof STEP1_FIELDS)[number] | (typeof STEP2_FIELDS)[number]
    >,
  ) {
    
    if (form.state.submissionAttempts === 0) {
      form.baseStore.setState((prev) => ({
        ...prev,
        submissionAttempts: 1,
      }));
    }

    await Promise.all(
      fieldNames.map((fieldName) => form.validateField(fieldName, "submit")),
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

  function handleSave() {
    handleOpenChange(false);
  }

  const isFirstStep = step === 1;
  const isLastStep = step === PRODUCT_FORM_STEP_COUNT;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton
        className="flex max-h-[min(90vh,720px)] w-full max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl"
      >
        <DialogHeader className="px-6 py-4 pr-12 text-left">
          <DialogTitle className="text-lg font-medium">
            Dodaj nowy produkt
          </DialogTitle>
          <DialogDescription className="sr-only">
            Wieloetapowy formularz dodawania produktu do katalogu.
          </DialogDescription>
        </DialogHeader>
        <div className="mx-6 border-b border-border sm:mx-0" aria-hidden />

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <AddProductStepper currentStep={step} />
          <div className="mt-6 border-b border-border sm:-mx-6" aria-hidden />

          <div className="mt-6 min-h-40">
            {step === 1 ? <AddProductStepInfo form={form} /> : null}
            {step === 2 ? <AddProductStepPrice form={form} /> : null}
          </div>
        </div>

        <DialogFooter className="mx-0 mb-0 flex-row justify-between rounded-none border-border bg-background px-6 py-4 sm:justify-between">
          {isFirstStep ? (
            <span />
          ) : (
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="px-4"
              onClick={handleBack}
            >
              <ArrowLeft data-icon="inline-start" />
              Wstecz
            </Button>
          )}

          {isLastStep ? (
            <Button
              type="button"
              size="lg"
              className="rounded-full px-4"
              onClick={handleSave}
            >
              Zapisz produkt
            </Button>
          ) : (
            <Button
              type="button"
              size="lg"
              className="rounded-full px-4"
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
