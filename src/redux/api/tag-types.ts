export const tagTypesList = [
  "user",
  "product",
  "category",
  "customer",
  "product",
  "customer",
  "sale"
] as const;

export type TagType = (typeof tagTypesList)[number];