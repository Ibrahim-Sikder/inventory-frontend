export const tagTypesList = [
  "user",
  "product",
  "category",
  "customer",
  "product"
] as const;

export type TagType = (typeof tagTypesList)[number];