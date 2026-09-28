"use client";

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

function parseMoneyInput(raw: string): number | null {
  if (raw.trim() === "") {
    return null;
  }

  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

export function AddProductStepPrice({ form }: AddProductStepPriceProps) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field
          name="netPrice"
          validators={{
            onBlur: productStep2Schema.shape.netPrice,
            onSubmit: productStep2Schema.shape.netPrice,
          }}
        >
          {(field) => {
            const errors = getFieldErrorMessages(field.state.meta.errors);

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Cena netto</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.01"
                  value={field.state.value}
                  placeholder="0.00"
                  aria-invalid={errors.length > 0}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    const parsed = parseMoneyInput(event.target.value);

                    if (parsed === null) {
                      field.handleChange(0);
                      form.setFieldValue(
                        "grossPrice",
                        pricesFromNet(0, form.getFieldValue("vatRate")).grossPrice,
                      );
                      return;
                    }

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
            onBlur: productStep2Schema.shape.grossPrice,
            onSubmit: productStep2Schema.shape.grossPrice,
          }}
        >
          {(field) => {
            const errors = getFieldErrorMessages(field.state.meta.errors);

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Cena brutto</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.01"
                  value={field.state.value}
                  placeholder="0.00"
                  aria-invalid={errors.length > 0}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    const parsed = parseMoneyInput(event.target.value);

                    if (parsed === null) {
                      field.handleChange(0);
                      form.setFieldValue(
                        "netPrice",
                        pricesFromGross(0, form.getFieldValue("vatRate")).netPrice,
                      );
                      return;
                    }

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
            onChange: productStep2Schema.shape.vatRate,
            onSubmit: productStep2Schema.shape.vatRate,
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
            onChange: productStep2Schema.shape.currency,
            onSubmit: productStep2Schema.shape.currency,
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
