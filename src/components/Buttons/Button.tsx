import { ReactNode } from "react";
import { Button as AriaButton, ButtonProps, PressEvent } from "react-aria-components";

interface Props
extends ButtonProps {
  children?: ReactNode
  color?: string;
  className?: string;
  onPress?: (e: PressEvent) => void;
}

export const Button: React.FC<Props> = ({
  children,
  className,
  onPress,
  ...props
}) => {

  return (
    <AriaButton {...props}
      type="button"
      onPress={onPress}
      className={className != null
        ? className
        : `w-full py-3 bg-indigo-800 
          text-white font-semibold
          rounded-lg shadow-md 
          hover:bg-indigo-600
          focus:outline-none
          transition-all duration-200 ease-in-out`
      }>
      {children}
    </AriaButton>
  );
};
