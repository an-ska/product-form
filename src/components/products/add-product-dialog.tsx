"use client";

import { useRef, useState, type FormEvent } from "react";
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
  type Product,
  type ProductFormStepId,
} from "@/lib/product";
import { cn } from "@/lib/utils";

type AddProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductCreated: (product: Product) => void;
};

function scrollToFirstFieldError(formElement: HTMLFormElement) {
  window.setTimeout(() => {
    const target =
      formElement.querySelector<HTMLElement>('[aria-invalid="true"]') ??
      formElement.querySelector<HTMLElement>('[role="alert"]');

    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "center" });

    if (typeof target.focus === "function") {
      target.focus({ preventScroll: true });
    }
  }, 0);
}

export function AddProductDialog({
  open,
  onOpenChange,
  onProductCreated,
}: AddProductDialogProps) {
  const [step, setStep] = useState<ProductFormStepId>(1);
  const [formError, setFormError] = useState<string | null>(null);
  const formElementRef = useRef<HTMLFormElement>(null);

  const form = useProductForm({
    onSubmit: async ({ value, meta }) => {
      setFormError(null);

      if (meta.intent === "save") {
        const parsed = productFormSchema.safeParse(value);
        if (!parsed.success) {
          setFormError(
            "Nie udało się zapisać produktu. Sprawdź poprawność danych we wszystkich krokach.",
          );
          return;
        }

        onProductCreated(createProductFromFormValues(parsed.data));
        handleOpenChange(false);
        return;
      }

      setStep((current) =>
        current < PRODUCT_FORM_STEP_COUNT
          ? ((current + 1) as ProductFormStepId)
          : current,
      );
    },
    onSubmitInvalid: () => {
      setFormError(null);
      if (formElementRef.current) {
        scrollToFirstFieldError(formElementRef.current);
      }
    },
  });

  function resetDialogState() {
    setStep(1);
    setFormError(null);
    form.reset();
  }

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      resetDialogState();
    }
  }

  function handleBack() {
    setFormError(null);
    setStep((current) =>
      current > 1 ? ((current - 1) as ProductFormStepId) : current,
    );
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    void form.handleSubmit(
      step === PRODUCT_FORM_STEP_COUNT
        ? { intent: "save" }
        : { intent: "next" },
    );
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

        <form
          ref={formElementRef}
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={handleFormSubmit}
          noValidate
          autoComplete="off"
        >
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

          {formError ? (
            <p className="px-4 pb-2 text-sm text-destructive" role="alert">
              {formError}
            </p>
          ) : null}

          <DialogFooter
            className={cn(
              "mx-0 mb-0 flex-row gap-2 rounded-none border-border bg-accent px-4 py-4",
              isFirstStep
                ? "justify-end sm:justify-end"
                : "justify-between sm:justify-between",
            )}
          >
            {!isFirstStep ? (
              <Button
                type="button"
                variant="outline"
                className="h-9 rounded-full px-4"
                onClick={handleBack}
              >
                <ArrowLeft data-icon="inline-start" />
                Wstecz
              </Button>
            ) : null}

            <Button type="submit" className="h-9 rounded-full px-4">
              {isLastStep ? (
                "Zapisz produkt"
              ) : (
                <>
                  Dalej
                  <ArrowRight data-icon="inline-end" />
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
