export const tagTypesList = [
  "user",
  "product",
  "category",
  "customer",
] as const;

export type TagType = (typeof tagTypesList)[number];