"use client";

import { useState } from "react";

import { FormFieldShell } from "@/components/products/field-errors";
import {
  FormSelect,
  toFormSelectOptions,
} from "@/components/products/form-select";
import type { ProductFormApi } from "@/components/products/use-product-form";
import { Input } from "@/components/ui/input";
import {
  CURRENCIES,
  VAT_RATES,
  formatMoneyInputValue,
  parseCurrency,
  parseVatRate,
  pricesFromGross,
  pricesFromNet,
  pricesFromVatChange,
  productStep2Schema,
  roundMoney,
} from "@/lib/product";

const currencyOptions = toFormSelectOptions(CURRENCIES);
const vatRateOptions = toFormSelectOptions(
  VAT_RATES.map(String),
  (rate) => `${rate}%`,
);

type AddProductStepPriceProps = {
  form: ProductFormApi;
};

function formatMoneyDraft(value: number | null): string {
  return value === null ? "" : formatMoneyInputValue(value);
}

function parseMoneyInput(raw: string): number | null {
  if (raw.trim() === "") {
    return null;
  }

  const value = Number(raw.replace(",", "."));
  return Number.isFinite(value) ? roundMoney(value) : null;
}

type MoneyFieldInputProps = {
  id: string;
  name: string;
  value: number | null;
  invalid: boolean;
  describedBy?: string;
  onBlur: () => void;
  onValueChange: (value: number | null) => void;
};

function MoneyFieldInput({
  id,
  name,
  value,
  invalid,
  describedBy,
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
      placeholder="0,00"
      autoComplete="off"
      aria-invalid={invalid}
      aria-describedby={describedBy}
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

        setDraft(raw);
        onValueChange(parseMoneyInput(raw));
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
          {(field) => (
            <FormFieldShell
              label="Cena netto"
              htmlFor={field.name}
              errors={field.state.meta.errors}
            >
              {({ invalid, describedBy }) => (
                <MoneyFieldInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  invalid={invalid}
                  describedBy={describedBy}
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
              )}
            </FormFieldShell>
          )}
        </form.Field>

        <form.Field
          name="grossPrice"
          validators={{
            onDynamic: productStep2Schema.shape.grossPrice,
          }}
        >
          {(field) => (
            <FormFieldShell
              label="Cena brutto"
              htmlFor={field.name}
              errors={field.state.meta.errors}
            >
              {({ invalid, describedBy }) => (
                <MoneyFieldInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  invalid={invalid}
                  describedBy={describedBy}
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
              )}
            </FormFieldShell>
          )}
        </form.Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field
          name="vatRate"
          validators={{
            onDynamic: productStep2Schema.shape.vatRate,
          }}
        >
          {(field) => (
            <FormFieldShell
              label="Stawka VAT"
              htmlFor={field.name}
              errors={field.state.meta.errors}
            >
              {({ invalid, describedBy, labelId }) => (
                <FormSelect
                  id={field.name}
                  value={String(field.state.value)}
                  placeholder="Wybierz stawkę VAT"
                  options={vatRateOptions}
                  invalid={invalid}
                  describedBy={describedBy}
                  labelId={labelId}
                  onBlur={field.handleBlur}
                  onValueChange={(value) => {
                    const vatRate = parseVatRate(value);
                    if (vatRate === null) {
                      return;
                    }

                    const next = pricesFromVatChange(
                      form.getFieldValue("netPrice"),
                      vatRate,
                    );
                    field.handleChange(next.vatRate);
                    form.setFieldValue("grossPrice", next.grossPrice);
                  }}
                />
              )}
            </FormFieldShell>
          )}
        </form.Field>

        <form.Field
          name="currency"
          validators={{
            onDynamic: productStep2Schema.shape.currency,
          }}
        >
          {(field) => (
            <FormFieldShell
              label="Waluta"
              htmlFor={field.name}
              errors={field.state.meta.errors}
            >
              {({ invalid, describedBy, labelId }) => (
                <FormSelect
                  id={field.name}
                  value={field.state.value}
                  placeholder="Wybierz walutę"
                  options={currencyOptions}
                  invalid={invalid}
                  describedBy={describedBy}
                  labelId={labelId}
                  onBlur={field.handleBlur}
                  onValueChange={(value) => {
                    const currency = parseCurrency(value);
                    if (currency) {
                      field.handleChange(currency);
                    }
                  }}
                />
              )}
            </FormFieldShell>
          )}
        </form.Field>
      </div>
    </div>
  );
}
