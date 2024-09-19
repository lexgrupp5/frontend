import React from "react";
import { HeaderSizeType, TextColorType } from "./types";
import { HeaderSize, TextColor } from "./const";

interface Props {
  children: React.ReactNode;
  size?: HeaderSizeType
  color?: TextColorType
  className?: string;
}

export const H: React.FC<Props> = ({ 
  size = 1, 
  children, 
  color = TextColor.LIGHT, 
  className = ""
}) => {
  const HeaderTag = `h${size}` as keyof JSX.IntrinsicElements;

  const headerSizeClass = HeaderSize[size] ?? HeaderSize[1];

  return (
    <HeaderTag className={`text-${color} ${headerSizeClass} ${className}`}>
      {children}
    </HeaderTag>
  );
};
