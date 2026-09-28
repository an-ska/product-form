"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type ProductCreatedToastProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
};

const TOAST_DURATION_MS = 4000;

export function ProductCreatedToast({
  open,
  onOpenChange,
  className,
}: ProductCreatedToastProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onOpenChange(false);
    }, TOAST_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [open, onOpenChange]);

  if (!open) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed right-4 bottom-4 z-50 flex w-[min(100%-2rem,336px)] items-center gap-2 rounded-md border border-border bg-popover p-4 text-sm text-popover-foreground shadow-[0_4px_12px_-1px_rgba(0,0,0,0.1)]",
        className,
      )}
    >
      <span
        className="flex size-5 shrink-0 items-center justify-center rounded-full bg-success text-white"
        aria-hidden
      >
        <Check className="size-3" strokeWidth={3} />
      </span>
      <p className="min-w-0 font-medium text-foreground">
        Produkt został dodany
      </p>
    </div>
  );
}
