import { Check } from "lucide-react";

import {
  PRODUCT_FORM_STEPS,
  type ProductFormStepId,
} from "@/lib/product";
import { cn } from "@/lib/utils";

type AddProductStepperProps = {
  currentStep: ProductFormStepId;
};

export function AddProductStepper({ currentStep }: AddProductStepperProps) {
  return (
    <ol className="flex w-full items-start gap-0">
      {PRODUCT_FORM_STEPS.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isCurrent = step.id === currentStep;
        const isUpcoming = step.id > currentStep;
        const isLast = index === PRODUCT_FORM_STEPS.length - 1;

        return (
          <li
            key={step.id}
            className={cn("flex min-w-0", isLast ? "flex-none" : "flex-1")}
          >
            <div className="flex min-w-0 flex-col items-start gap-2 sm:flex-row sm:items-start sm:gap-3">
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium",
                  (isCompleted || isCurrent) &&
                    "bg-primary text-primary-foreground",
                  isUpcoming &&
                    "border border-border bg-background text-muted-foreground",
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isCompleted ? (
                  <Check className="size-4" aria-hidden />
                ) : (
                  step.id
                )}
              </span>

              <div className="min-w-0 text-left">
                <p
                  className={cn(
                    "text-sm font-medium",
                    isUpcoming ? "text-muted-foreground" : "text-foreground",
                  )}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>

            {!isLast ? (
              <div
                className={cn(
                  "mx-3 mt-4 hidden h-px flex-1 sm:block",
                  isCompleted ? "bg-primary" : "bg-border",
                )}
                aria-hidden
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
