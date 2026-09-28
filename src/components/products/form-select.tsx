"use client";

import type { ReactNode } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type FormSelectOption = {
  value: string;
  label: ReactNode;
};

type FormSelectProps = {
  id: string;
  name?: string;
  value: string;
  placeholder: string;
  options: readonly FormSelectOption[];
  invalid?: boolean;
  describedBy?: string;
  labelId?: string;
  onBlur: () => void;
  onValueChange: (value: string) => void;
};

export function toFormSelectOptions<T extends string>(
  values: readonly T[],
  formatLabel: (value: T) => ReactNode = (value) => value,
): FormSelectOption[] {
  return values.map((value) => ({
    value,
    label: formatLabel(value),
  }));
}

export function FormSelect({
  id,
  name = id,
  value,
  placeholder,
  options,
  invalid,
  describedBy,
  labelId,
  onBlur,
  onValueChange,
}: FormSelectProps) {
  return (
    <Select
      name={name}
      autoComplete="off"
      value={value}
      onValueChange={onValueChange}
      onOpenChange={(open) => {
        if (!open) {
          onBlur();
        }
      }}
    >
      <SelectTrigger
        id={id}
        className="w-full"
        aria-invalid={invalid}
        aria-describedby={describedBy}
        aria-labelledby={labelId}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
