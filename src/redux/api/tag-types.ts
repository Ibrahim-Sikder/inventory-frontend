export const tagTypesList = [
  "user",
  "product",
  "category",
  "customer",
  "product",
  "customer"
] as const;

export type TagType = (typeof tagTypesList)[number];