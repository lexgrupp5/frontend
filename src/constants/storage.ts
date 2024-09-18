export const Storage = {
  TOKEN: "token_key"
} as const;

export type StorageType = typeof Storage[
  keyof typeof Storage
];
