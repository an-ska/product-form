"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { AddProductStepper } from "@/components/products/add-product-stepper";
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
  type ProductFormStepId,
} from "@/lib/product";

type AddProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddProductDialog({
  open,
  onOpenChange,
}: AddProductDialogProps) {
  const [step, setStep] = useState<ProductFormStepId>(1);

  function resetDialogState() {
    setStep(1);
  }

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      resetDialogState();
    }
  }

  function handleBack() {
    setStep((current) => (current > 1 ? ((current - 1) as ProductFormStepId) : current));
  }

  function handleNext() {
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
        <DialogHeader className="border-b border-border px-6 py-4 pr-12 text-left">
          <DialogTitle className="text-lg font-semibold">
            Dodaj nowy produkt
          </DialogTitle>
          <DialogDescription className="sr-only">
            Wieloetapowy formularz dodawania produktu do katalogu.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <AddProductStepper currentStep={step} />

          <div className="mt-8 min-h-40">
          </div>
        </div>

        <DialogFooter className="mx-0 mb-0 rounded-none border-border bg-background sm:justify-between">
          {isFirstStep ? (
            <span />
          ) : (
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={handleBack}
            >
              <ArrowLeft data-icon="inline-start" />
              Wstecz
            </Button>
          )}

          {isLastStep ? (
            <Button
              type="button"
              className="rounded-full"
              onClick={handleSave}
            >
              Zapisz produkt
            </Button>
          ) : (
            <Button
              type="button"
              className="rounded-full"
              onClick={handleNext}
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
