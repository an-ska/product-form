export function getFieldErrorMessages(errors: unknown[]): string[] {
  return errors.flatMap((error) => {
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
}
