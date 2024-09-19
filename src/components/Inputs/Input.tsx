import { InputHTMLAttributes } from "react";
import { Label, Input as AriaInput} from "react-aria-components";

export interface InputProps
extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  ...props
}) => {
  return (
    <div className="min-h-full flex flex-col space-y-2">
      {label && <Label className="text-gray-800 font-medium">{label}</Label>}
      <AriaInput
        {...props}
        className="px-4 py-2 
          border 
          border-gray-300
          rounded-lg shadow-sm
          focus:ring-2 
          focus:ring-indigo-500 
          focus:outline-none 
          focus:border-indigo-500
          transition-all duration-300"
      />
    </div>
  );
};
