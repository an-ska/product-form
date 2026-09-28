"use client";

import { FormFieldShell } from "@/components/products/field-errors";
import type { ProductFormApi } from "@/components/products/use-product-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  getCartQuantityError,
  getStockQuantityError,
  productStep3FieldsSchema,
} from "@/lib/product";

type AddProductStepAvailabilityProps = {
  form: ProductFormApi;
};

function parseIntegerInput(raw: string): number | null {
  if (raw.trim() === "") {
    return null;
  }

  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

export function AddProductStepAvailability({
  form,
}: AddProductStepAvailabilityProps) {
  return (
    <div className="space-y-4">
      <form.Field
        name="isAvailable"
        validators={{
          onDynamic: productStep3FieldsSchema.shape.isAvailable,
        }}
      >
        {(field) => (
          <div className="flex items-center gap-3">
            <Switch
              id={field.name}
              name={field.name}
              checked={field.state.value}
              onCheckedChange={(checked) => field.handleChange(checked)}
            />
            <Label htmlFor={field.name} className="cursor-pointer font-medium">
              Produkt jest dostępny
            </Label>
          </div>
        )}
      </form.Field>

      <div className="border-b border-border" aria-hidden />

      <form.Field
        name="isLimited"
        validators={{
          onDynamic: productStep3FieldsSchema.shape.isLimited,
        }}
        listeners={{
          onChange: ({ value }) => {
            if (!value) {
              form.setFieldValue("stockQuantity", null);
            }

            void form.validateField("stockQuantity", "change");
          },
        }}
      >
        {(field) => (
          <div className="flex items-center gap-3">
            <Checkbox
              id={field.name}
              name={field.name}
              checked={field.state.value}
              className="data-checked:border-foreground data-checked:bg-foreground data-checked:text-background"
              onCheckedChange={(checked) =>
                field.handleChange(checked === true)
              }
            />
            <Label htmlFor={field.name} className="cursor-pointer font-medium">
              Produkt limitowany
            </Label>
          </div>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.values.isLimited}>
        {(isLimited) =>
          isLimited ? (
            <form.Field
              name="stockQuantity"
              validators={{
                onDynamic: ({ value }) =>
                  getStockQuantityError(
                    form.getFieldValue("isLimited"),
                    value,
                  ),
              }}
            >
              {(field) => (
                <FormFieldShell
                  label="Ilość na magazynie"
                  htmlFor={field.name}
                  errors={field.state.meta.errors}
                >
                  {({ invalid, describedBy }) => (
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step={1}
                      value={field.state.value ?? ""}
                      placeholder="0"
                      autoComplete="off"
                      aria-invalid={invalid}
                      aria-describedby={describedBy}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        field.handleChange(
                          parseIntegerInput(event.target.value),
                        );
                      }}
                    />
                  )}
                </FormFieldShell>
              )}
            </form.Field>
          ) : null
        }
      </form.Subscribe>

      <div className="border-b border-border" aria-hidden />

      <div className="space-y-4">
        <h3 className="text-base font-medium text-foreground">Limity koszyka</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <form.Field
            name="minCartQuantity"
            validators={{
              onDynamic: ({ value }) =>
                getCartQuantityError(
                  "minCartQuantity",
                  value,
                  form.getFieldValue("maxCartQuantity"),
                ),
            }}
            listeners={{
              onChange: () => {
                void form.validateField("maxCartQuantity", "change");
              },
            }}
          >
            {(field) => (
              <FormFieldShell
                label="Minimalna ilość"
                htmlFor={field.name}
                errors={field.state.meta.errors}
              >
                {({ invalid, describedBy }) => (
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    inputMode="numeric"
                    min={1}
                    step={1}
                    value={field.state.value}
                    autoComplete="off"
                    aria-invalid={invalid}
                    aria-describedby={describedBy}
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      const parsed = parseIntegerInput(event.target.value);
                      if (parsed !== null) {
                        field.handleChange(parsed);
                      }
                    }}
                  />
                )}
              </FormFieldShell>
            )}
          </form.Field>

          <form.Field
            name="maxCartQuantity"
            validators={{
              onDynamic: ({ value }) =>
                getCartQuantityError(
                  "maxCartQuantity",
                  form.getFieldValue("minCartQuantity"),
                  value,
                ),
            }}
            listeners={{
              onChange: () => {
                void form.validateField("minCartQuantity", "change");
              },
            }}
          >
            {(field) => (
              <FormFieldShell
                label="Maksymalna ilość"
                htmlFor={field.name}
                errors={field.state.meta.errors}
              >
                {({ invalid, describedBy }) => (
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    inputMode="numeric"
                    min={1}
                    step={1}
                    value={field.state.value}
                    autoComplete="off"
                    aria-invalid={invalid}
                    aria-describedby={describedBy}
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      const parsed = parseIntegerInput(event.target.value);
                      if (parsed !== null) {
                        field.handleChange(parsed);
                      }
                    }}
                  />
                )}
              </FormFieldShell>
            )}
          </form.Field>
        </div>
      </div>
    </div>
  );
}
