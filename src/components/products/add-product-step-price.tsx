"use client";

import { useState } from "react";

import { getFieldErrorMessages } from "@/components/products/field-errors";
import type { ProductFormApi } from "@/components/products/use-product-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CURRENCIES,
  VAT_RATES,
  pricesFromGross,
  pricesFromNet,
  pricesFromVatChange,
  productStep2Schema,
  type Currency,
  type VatRate,
} from "@/lib/product";

type AddProductStepPriceProps = {
  form: ProductFormApi;
};

function formatMoneyDraft(value: number): string {
  return value === 0 ? "" : String(value);
}

function parseMoneyInput(raw: string): number | null {
  if (raw.trim() === "") {
    return null;
  }

  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

type MoneyFieldInputProps = {
  id: string;
  name: string;
  value: number;
  invalid: boolean;
  onBlur: () => void;
  onValueChange: (value: number) => void;
};

function MoneyFieldInput({
  id,
  name,
  value,
  invalid,
  onBlur,
  onValueChange,
}: MoneyFieldInputProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const displayValue = draft ?? formatMoneyDraft(value);

  return (
    <Input
      id={id}
      name={name}
      type="text"
      inputMode="decimal"
      value={displayValue}
      placeholder="0.00"
      aria-invalid={invalid}
      onFocus={() => {
        setDraft(formatMoneyDraft(value));
      }}
      onBlur={() => {
        setDraft(null);
        onBlur();
      }}
      onChange={(event) => {
        const raw = event.target.value;

        if (raw !== "" && !/^\d*[.,]?\d*$/.test(raw)) {
          return;
        }

        const normalized = raw.replace(",", ".");
        setDraft(raw);

        const parsed = parseMoneyInput(normalized);
        onValueChange(parsed ?? 0);
      }}
    />
  );
}

export function AddProductStepPrice({ form }: AddProductStepPriceProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field
          name="netPrice"
          validators={{
            onDynamic: productStep2Schema.shape.netPrice,
          }}
        >
          {(field) => {
            const errors = getFieldErrorMessages(field.state.meta.errors);

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Cena netto</Label>
                <MoneyFieldInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  invalid={errors.length > 0}
                  onBlur={field.handleBlur}
                  onValueChange={(parsed) => {
                    const next = pricesFromNet(
                      parsed,
                      form.getFieldValue("vatRate"),
                    );
                    field.handleChange(next.netPrice);
                    form.setFieldValue("grossPrice", next.grossPrice);
                  }}
                />
                {errors.map((message) => (
                  <p key={message} className="text-sm text-destructive" role="alert">
                    {message}
                  </p>
                ))}
              </div>
            );
          }}
        </form.Field>

        <form.Field
          name="grossPrice"
          validators={{
            onDynamic: productStep2Schema.shape.grossPrice,
          }}
        >
          {(field) => {
            const errors = getFieldErrorMessages(field.state.meta.errors);

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Cena brutto</Label>
                <MoneyFieldInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  invalid={errors.length > 0}
                  onBlur={field.handleBlur}
                  onValueChange={(parsed) => {
                    const next = pricesFromGross(
                      parsed,
                      form.getFieldValue("vatRate"),
                    );
                    field.handleChange(next.grossPrice);
                    form.setFieldValue("netPrice", next.netPrice);
                  }}
                />
                {errors.map((message) => (
                  <p key={message} className="text-sm text-destructive" role="alert">
                    {message}
                  </p>
                ))}
              </div>
            );
          }}
        </form.Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field
          name="vatRate"
          validators={{
            onDynamic: productStep2Schema.shape.vatRate,
          }}
        >
          {(field) => {
            const errors = getFieldErrorMessages(field.state.meta.errors);

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Stawka VAT</Label>
                <Select
                  value={String(field.state.value)}
                  onValueChange={(value) => {
                    const vatRate = Number(value) as VatRate;
                    const next = pricesFromVatChange(
                      form.getFieldValue("netPrice"),
                      vatRate,
                    );
                    field.handleChange(next.vatRate);
                    form.setFieldValue("grossPrice", next.grossPrice);
                  }}
                >
                  <SelectTrigger
                    id={field.name}
                    className="w-full"
                    aria-invalid={errors.length > 0}
                  >
                    <SelectValue placeholder="Wybierz stawkę VAT" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {VAT_RATES.map((rate) => (
                      <SelectItem key={rate} value={String(rate)}>
                        {rate}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.map((message) => (
                  <p key={message} className="text-sm text-destructive" role="alert">
                    {message}
                  </p>
                ))}
              </div>
            );
          }}
        </form.Field>

        <form.Field
          name="currency"
          validators={{
            onDynamic: productStep2Schema.shape.currency,
          }}
        >
          {(field) => {
            const errors = getFieldErrorMessages(field.state.meta.errors);

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Waluta</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(value as Currency)
                  }
                >
                  <SelectTrigger
                    id={field.name}
                    className="w-full"
                    aria-invalid={errors.length > 0}
                  >
                    <SelectValue placeholder="Wybierz walutę" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {CURRENCIES.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.map((message) => (
                  <p key={message} className="text-sm text-destructive" role="alert">
                    {message}
                  </p>
                ))}
              </div>
            );
          }}
        </form.Field>
      </div>
    </div>
  );
}
