import { InputHTMLAttributes, ReactNode } from "react";
import { Label, Input as AriaInput } from "react-aria-components";
import { IconContainer } from "../Icons";
import { Button } from "../Buttons";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  onPressIcon?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon,
  onPressIcon = () => {},
  ...props
}) => {
  return (
    <div className="realtive min-h-full flex flex-col space-y-2">
      {label && <Label className="font-medium text-gray-800">{label}</Label>}
      <div className="relative">
        <AriaInput
          {...props}
          className="w-full rounded-lg border 
          border-gray-300 px-4 py-2 shadow-sm
          transition-all duration-300 
          focus:border-indigo-500
          focus:outline-none focus:ring-2
          focus:ring-indigo-500"
        />
        {icon != null && (
          <Button
            className="absolute bottom-2 right-6 cursor-pointer outline-none"
            onPress={onPressIcon}
          >
            <IconContainer className="h-6 w-6 text-gray-600">
              {icon}
            </IconContainer>
          </Button>
        )}
      </div>
    </div>
  );
};
