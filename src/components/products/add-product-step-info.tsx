"use client";

import { getFieldErrorMessages } from "@/components/products/field-errors";
import type { ProductFormApi } from "@/components/products/use-product-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CATEGORIES,
  PRODUCERS,
  PRODUCT_FEATURES,
  productStep1Schema,
  type ProductFeature,
  type ProductFormValues,
} from "@/lib/product";
import { cn } from "@/lib/utils";

type AddProductStepInfoProps = {
  form: ProductFormApi;
};

export function AddProductStepInfo({ form }: AddProductStepInfoProps) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field
          name="name"
          validators={{
            onBlur: productStep1Schema.shape.name,
            onSubmit: productStep1Schema.shape.name,
          }}
        >
          {(field) => {
            const errors = getFieldErrorMessages(field.state.meta.errors);

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Nazwa produktu</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="np. MacBook Pro 14"
                  aria-invalid={errors.length > 0}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
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
          name="sku"
          validators={{
            onBlur: productStep1Schema.shape.sku,
            onSubmit: productStep1Schema.shape.sku,
          }}
        >
          {(field) => {
            const errors = getFieldErrorMessages(field.state.meta.errors);

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>SKU produktu</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder="np. MBP14M3PRO"
                  aria-invalid={errors.length > 0}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
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

      <form.Field
        name="description"
        validators={{
          onBlur: productStep1Schema.shape.description,
          onSubmit: productStep1Schema.shape.description,
        }}
      >
        {(field) => {
          const errors = getFieldErrorMessages(field.state.meta.errors);

          return (
            <div className="space-y-2">
              <Label htmlFor={field.name}>Opis produktu</Label>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                placeholder="Krótki opis produktu"
                className="min-h-24"
                aria-invalid={errors.length > 0}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
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

      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field
          name="producer"
          validators={{
            onChange: productStep1Schema.shape.producer,
            onSubmit: productStep1Schema.shape.producer,
          }}
        >
          {(field) => {
            const errors = getFieldErrorMessages(field.state.meta.errors);

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Producent</Label>
                <Select
                  value={field.state.value || undefined}
                  onValueChange={(value) =>
                    field.handleChange(value as ProductFormValues["producer"])
                  }
                >
                  <SelectTrigger
                    id={field.name}
                    className="w-full"
                    aria-invalid={errors.length > 0}
                  >
                    <SelectValue placeholder="Wybierz producenta" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {PRODUCERS.map((producer) => (
                      <SelectItem key={producer} value={producer}>
                        {producer}
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
          name="category"
          validators={{
            onChange: productStep1Schema.shape.category,
            onSubmit: productStep1Schema.shape.category,
          }}
        >
          {(field) => {
            const errors = getFieldErrorMessages(field.state.meta.errors);

            return (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Kategoria</Label>
                <Select
                  value={field.state.value || undefined}
                  onValueChange={(value) =>
                    field.handleChange(value as ProductFormValues["category"])
                  }
                >
                  <SelectTrigger
                    id={field.name}
                    className="w-full"
                    aria-invalid={errors.length > 0}
                  >
                    <SelectValue placeholder="Wybierz kategorię" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
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

      <form.Field
        name="features"
        validators={{
          onChange: productStep1Schema.shape.features,
          onSubmit: productStep1Schema.shape.features,
        }}
      >
        {(field) => {
          const errors = getFieldErrorMessages(field.state.meta.errors);
          const selectedFeatures = field.state.value;

          function toggleFeature(feature: ProductFeature) {
            const isSelected = selectedFeatures.includes(feature);
            field.handleChange(
              isSelected
                ? selectedFeatures.filter((item) => item !== feature)
                : [...selectedFeatures, feature],
            );
          }

          return (
            <div className="space-y-2">
              <Label>Cechy produktu</Label>
              <div className="flex flex-wrap gap-2">
                {PRODUCT_FEATURES.map((feature) => {
                  const isSelected = selectedFeatures.includes(feature);

                  return (
                    <Button
                      key={feature}
                      type="button"
                      size="sm"
                      variant={isSelected ? "default" : "outline"}
                      className={cn("rounded-full", !isSelected && "bg-background")}
                      aria-pressed={isSelected}
                      onClick={() => toggleFeature(feature)}
                    >
                      {feature}
                    </Button>
                  );
                })}
              </div>
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
  );
}
