import { InputHTMLAttributes } from "react";
import { Label, Input as AriaInput} from "react-aria-components";

interface Props
extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<Props> = ({ label, ...props }) => {
  return (
    <div className="min-h-full flex flex-col space-y-2">
      {label && <Label className="text-gray-700 font-medium">{label}</Label>}
      <AriaInput
        {...props}
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500 transition-all ease-in-out duration-200"
      />
    </div>
  );
};

export default Input;
