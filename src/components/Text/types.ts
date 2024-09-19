import { TextColor } from "./const";

export type TextColorType = typeof TextColor[
  keyof typeof TextColor
]

export type HeaderSizeType = 1 | 2 | 3 | 4 | 5
