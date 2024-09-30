import { HeaderSizeType } from "./types";

export const TextColor = {
  LIGHT: "white",
  MEDIUM: "gray-300",
  MEDIUM_X: "gray-400",
  DARK: "gray-800",
  DARK_X: "gray-950",
} as const;

export const HeaderSize: Record<HeaderSizeType, string> = {
  1: "text-3xl font-bold",
  2: "text-2xl font-semibold",
  3: "text-xl font-medium",
  4: "text-lg font-medium",
  5: "text-base font-medium"
} as const;
