import { ReactElement } from "react";
import { TextColorType } from "./types";
import { TextColor } from "./const";

interface Props {
  children: React.ReactNode;
  color?: TextColorType;
  className?: string;
}

export const P: React.FC<Props> = ({
  children,
  color = TextColor.LIGHT,
  className
}): ReactElement => {
  const derivedClassName = `text-${color} overflow-hidden break-word
    ${className ? className : ""}`;
  
  return (
    <p className={derivedClassName}>
      {children}
    </p>
  );
};
