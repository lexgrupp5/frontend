import { ReactNode } from "react";
import { Button as AriaButton, ButtonProps, PressEvent } from "react-aria-components";

interface Props
extends ButtonProps {
  children?: ReactNode
  className?: string;
  onPress?: (e: PressEvent) => void;
}

export const UnstyledButton: React.FC<Props> = ({
  children,
  className,
  onPress,
  ...props
}) => {

  return (
    <AriaButton {...props}
      type="button"
      onPress={onPress}
      className={className ? className : ""}>
      {children}
    </AriaButton>
  );
};
