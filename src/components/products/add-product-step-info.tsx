"use client";

import { FormFieldShell } from "@/components/products/field-errors";
import {
  FormSelect,
  toFormSelectOptions,
} from "@/components/products/form-select";
import type { ProductFormApi } from "@/components/products/use-product-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  CATEGORIES,
  PRODUCERS,
  PRODUCT_FEATURES,
  parseCategory,
  parseProducer,
  productStep1Schema,
  type ProductFeature,
} from "@/lib/product";

const producerOptions = toFormSelectOptions(PRODUCERS);
const categoryOptions = toFormSelectOptions(CATEGORIES);

type AddProductStepInfoProps = {
  form: ProductFormApi;
};

export function AddProductStepInfo({ form }: AddProductStepInfoProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field
          name="name"
          validators={{
            onDynamic: productStep1Schema.shape.name,
          }}
        >
          {(field) => (
            <FormFieldShell
              label="Nazwa produktu"
              htmlFor={field.name}
              errors={field.state.meta.errors}
            >
              {({ invalid, describedBy }) => (
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="np. MacBook Pro 14"
                  autoComplete="off"
                  aria-invalid={invalid}
                  aria-describedby={describedBy}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              )}
            </FormFieldShell>
          )}
        </form.Field>

        <form.Field
          name="sku"
          validators={{
            onDynamic: productStep1Schema.shape.sku,
          }}
        >
          {(field) => (
            <FormFieldShell
              label="SKU produktu"
              htmlFor={field.name}
              errors={field.state.meta.errors}
            >
              {({ invalid, describedBy }) => (
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="np. MBP14M3PRO"
                  autoComplete="off"
                  aria-invalid={invalid}
                  aria-describedby={describedBy}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              )}
            </FormFieldShell>
          )}
        </form.Field>
      </div>

      <form.Field
        name="description"
        validators={{
          onDynamic: productStep1Schema.shape.description,
        }}
      >
        {(field) => (
          <FormFieldShell
            label="Opis produktu"
            htmlFor={field.name}
            errors={field.state.meta.errors}
          >
            {({ invalid, describedBy }) => (
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                placeholder="Krótki opis produktu"
                className="min-h-16"
                autoComplete="off"
                aria-invalid={invalid}
                aria-describedby={describedBy}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            )}
          </FormFieldShell>
        )}
      </form.Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field
          name="producer"
          validators={{
            onDynamic: productStep1Schema.shape.producer,
          }}
        >
          {(field) => (
            <FormFieldShell
              label="Producent"
              htmlFor={field.name}
              errors={field.state.meta.errors}
            >
              {({ invalid, describedBy, labelId }) => (
                <FormSelect
                  id={field.name}
                  value={field.state.value}
                  placeholder="Wybierz producenta"
                  options={producerOptions}
                  invalid={invalid}
                  describedBy={describedBy}
                  labelId={labelId}
                  onBlur={field.handleBlur}
                  onValueChange={(value) => {
                    const producer = parseProducer(value);
                    if (producer) {
                      field.handleChange(producer);
                    }
                  }}
                />
              )}
            </FormFieldShell>
          )}
        </form.Field>

        <form.Field
          name="category"
          validators={{
            onDynamic: productStep1Schema.shape.category,
          }}
        >
          {(field) => (
            <FormFieldShell
              label="Kategoria"
              htmlFor={field.name}
              errors={field.state.meta.errors}
            >
              {({ invalid, describedBy, labelId }) => (
                <FormSelect
                  id={field.name}
                  value={field.state.value}
                  placeholder="Wybierz kategorię"
                  options={categoryOptions}
                  invalid={invalid}
                  describedBy={describedBy}
                  labelId={labelId}
                  onBlur={field.handleBlur}
                  onValueChange={(value) => {
                    const category = parseCategory(value);
                    if (category) {
                      field.handleChange(category);
                    }
                  }}
                />
              )}
            </FormFieldShell>
          )}
        </form.Field>
      </div>

      <form.Field
        name="features"
        validators={{
          onDynamic: productStep1Schema.shape.features,
        }}
      >
        {(field) => (
          <FormFieldShell
            label="Cechy produktu"
            asFieldset
            errors={field.state.meta.errors}
          >
            {({ invalid, describedBy }) => (
              <ToggleGroup
                type="multiple"
                variant="outline"
                size="sm"
                spacing={2}
                value={field.state.value}
                aria-invalid={invalid}
                aria-describedby={describedBy}
                className="flex w-full flex-wrap justify-start"
                onBlur={field.handleBlur}
                onValueChange={(value) => {
                  field.handleChange(value as ProductFeature[]);
                }}
              >
                {PRODUCT_FEATURES.map((feature) => (
                  <ToggleGroupItem
                    key={feature}
                    type="button"
                    value={feature}
                    className="h-7 min-w-0 rounded-4xl border-border bg-background px-3 text-sm text-muted-foreground hover:bg-background hover:text-muted-foreground data-[state=on]:border-transparent data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-primary data-[state=on]:hover:text-primary-foreground"
                  >
                    {feature}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            )}
          </FormFieldShell>
        )}
      </form.Field>
    </div>
  );
}
