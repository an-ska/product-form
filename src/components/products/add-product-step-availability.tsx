"use client";

import { getFieldErrorMessages } from "@/components/products/field-errors";
import type { ProductFormApi } from "@/components/products/use-product-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { productStep3Schema } from "@/lib/product";

type AddProductStepAvailabilityProps = {
  form: ProductFormApi;
};

type Step3FieldName =
  | "isAvailable"
  | "isLimited"
  | "stockQuantity"
  | "minCartQuantity"
  | "maxCartQuantity";

function getStep3Values(
  form: ProductFormApi,
  override?: Partial<Record<Step3FieldName, unknown>>,
) {
  return {
    isAvailable: form.getFieldValue("isAvailable"),
    isLimited: form.getFieldValue("isLimited"),
    stockQuantity: form.getFieldValue("stockQuantity"),
    minCartQuantity: form.getFieldValue("minCartQuantity"),
    maxCartQuantity: form.getFieldValue("maxCartQuantity"),
    ...override,
  };
}

function validateStep3Field(
  form: ProductFormApi,
  fieldName: Step3FieldName,
  value: unknown,
) {
  const result = productStep3Schema.safeParse(
    getStep3Values(form, { [fieldName]: value }),
  );

  if (result.success) {
    return undefined;
  }

  return result.error.issues.find((issue) => issue.path[0] === fieldName)
    ?.message;
}

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
    <div className="space-y-5">
      <form.Field name="isAvailable">
        {(field) => (
          <div className="flex items-center gap-3">
            <Switch
              id={field.name}
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
              checked={field.state.value}
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
                  validateStep3Field(form, "stockQuantity", value),
              }}
            >
              {(field) => {
                const errors = getFieldErrorMessages(field.state.meta.errors);

                return (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Ilość na magazynie</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      inputMode="numeric"
                      min={0}
                      step={1}
                      value={field.state.value ?? ""}
                      placeholder="0"
                      aria-invalid={errors.length > 0}
                      onBlur={field.handleBlur}
                      onChange={(event) => {
                        field.handleChange(
                          parseIntegerInput(event.target.value),
                        );
                      }}
                    />
                    {errors.map((message) => (
                      <p
                        key={message}
                        className="text-sm text-destructive"
                        role="alert"
                      >
                        {message}
                      </p>
                    ))}
                  </div>
                );
              }}
            </form.Field>
          ) : null
        }
      </form.Subscribe>

      <div className="border-b border-border" aria-hidden />

      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">Limity koszyka</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <form.Field
            name="minCartQuantity"
            validators={{
              onDynamic: ({ value }) =>
                validateStep3Field(form, "minCartQuantity", value),
            }}
            listeners={{
              onChange: () => {
                void form.validateField("maxCartQuantity", "change");
              },
            }}
          >
            {(field) => {
              const errors = getFieldErrorMessages(field.state.meta.errors);

              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Minimalna ilość</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    inputMode="numeric"
                    min={1}
                    step={1}
                    value={field.state.value}
                    aria-invalid={errors.length > 0}
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      const parsed = parseIntegerInput(event.target.value);
                      field.handleChange(parsed ?? 0);
                    }}
                  />
                  {errors.map((message) => (
                    <p
                      key={message}
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {message}
                    </p>
                  ))}
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="maxCartQuantity"
            validators={{
              onDynamic: ({ value }) =>
                validateStep3Field(form, "maxCartQuantity", value),
            }}
            listeners={{
              onChange: () => {
                void form.validateField("minCartQuantity", "change");
              },
            }}
          >
            {(field) => {
              const errors = getFieldErrorMessages(field.state.meta.errors);

              return (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Maksymalna ilość</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    inputMode="numeric"
                    min={1}
                    step={1}
                    value={field.state.value}
                    aria-invalid={errors.length > 0}
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      const parsed = parseIntegerInput(event.target.value);
                      field.handleChange(parsed ?? 0);
                    }}
                  />
                  {errors.map((message) => (
                    <p
                      key={message}
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {message}
                    </p>
                  ))}
                </div>
              );
            }}
          </form.Field>
        </div>
      </div>
    </div>
  );
}
