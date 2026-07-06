export const tagTypesList = [
  "user",
  "product",
  "category",
  "customer",
  "product",
  "customer",
  "sale",
  "dashboard"
] as const;

export type TagType = (typeof tagTypesList)[number];