"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPaginationSummary } from "@/lib/product";
import { cn } from "@/lib/utils";

type ProductsPaginationProps = {
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function ProductsPagination({
  page,
  totalPages,
  totalItems,
  onPageChange,
  className,
}: ProductsPaginationProps) {
  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">
        {formatPaginationSummary(page, totalPages, totalItems)}
      </p>

      <nav
        className="flex items-center gap-1"
        aria-label="Paginacja produktów"
      >
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1 px-2 text-muted-foreground disabled:opacity-40"
          disabled={isFirstPage}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft data-icon="inline-start" />
          Wstecz
        </Button>

        {pageNumbers.map((pageNumber) => {
          const isActive = pageNumber === page;

          return (
            <Button
              key={pageNumber}
              type="button"
              size="sm"
              variant={isActive ? "default" : "ghost"}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "min-w-8 px-2",
                !isActive && "text-foreground",
              )}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          );
        })}

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1 px-2 text-foreground disabled:text-muted-foreground disabled:opacity-40"
          disabled={isLastPage}
          onClick={() => onPageChange(page + 1)}
        >
          Dalej
          <ChevronRight data-icon="inline-end" />
        </Button>
      </nav>
    </div>
  );
}
