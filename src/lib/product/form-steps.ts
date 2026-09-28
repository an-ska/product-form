export const PRODUCT_FORM_STEPS = [
  {
    id: 1,
    title: "Informacje",
    description: "Dane podstawowe",
  },
  {
    id: 2,
    title: "Cena",
    description: "Dane cenowe",
  },
  {
    id: 3,
    title: "Dostępność",
    description: "Stany magazynowe",
  },
] as const;

export type ProductFormStepId = (typeof PRODUCT_FORM_STEPS)[number]["id"];

export const PRODUCT_FORM_STEP_COUNT = PRODUCT_FORM_STEPS.length;
