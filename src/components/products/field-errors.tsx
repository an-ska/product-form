import { useId, type ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function getFieldErrorMessages(errors: unknown[]): string[] {
  const messages = errors.flatMap((error) => {
    if (!error) {
      return [];
    }

    if (typeof error === "string") {
      return [error];
    }

    if (Array.isArray(error)) {
      return getFieldErrorMessages(error);
    }

    if (typeof error === "object" && "message" in error) {
      return [String((error as { message: unknown }).message)];
    }

    return [];
  });

  return [...new Set(messages)];
}

type FieldErrorsProps = {
  id?: string;
  messages: string[];
};

export function FieldErrors({ id, messages }: FieldErrorsProps) {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div id={id} className="space-y-1">
      {messages.map((message) => (
        <p key={message} className="text-sm text-destructive" role="alert">
          {message}
        </p>
      ))}
    </div>
  );
}

type FormFieldShellProps = {
  label: ReactNode;
  htmlFor?: string;
  asFieldset?: boolean;
  errors: unknown[];
  children: (ctx: {
    invalid: boolean;
    errorMessages: string[];
    describedBy: string | undefined;
    labelId: string;
  }) => ReactNode;
};

const labelClassName = "text-sm leading-none font-medium";

export function FormFieldShell({
  label,
  htmlFor,
  asFieldset = false,
  errors,
  children,
}: FormFieldShellProps) {
  const generatedId = useId();
  const labelId = `${generatedId}-label`;
  const errorId = htmlFor ? `${htmlFor}-error` : `${generatedId}-error`;
  const errorMessages = getFieldErrorMessages(errors);
  const invalid = errorMessages.length > 0;
  const describedBy = invalid ? errorId : undefined;
  const body = (
    <>
      {children({ invalid, errorMessages, describedBy, labelId })}
      <FieldErrors id={errorId} messages={errorMessages} />
    </>
  );

  if (asFieldset) {
    return (
      <fieldset className="min-w-0 space-y-2 border-0 p-0">
        <legend id={labelId} className={cn("px-0", labelClassName)}>
          {label}
        </legend>
        {body}
      </fieldset>
    );
  }

  return (
    <div className="space-y-2">
      <Label id={labelId} htmlFor={htmlFor} className={labelClassName}>
        {label}
      </Label>
      {body}
    </div>
  );
}
