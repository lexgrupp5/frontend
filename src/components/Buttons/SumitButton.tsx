import { ReactNode } from "react";
import { Button } from "react-aria-components";

interface Props {
  children?: ReactNode;
}

export const SubmitButton: React.FC<Props> = ({
  children
}) => {
  return (
    <Button
      type="submit"
      className="w-full 
        bg-indigo-500 
        text-white font-semibold 
        py-3 rounded-lg shadow-md 
        hover:bg-indigo-600 
        focus:outline-none
        transition-all duration-200 ease-in-out">
      {children}
    </Button>
  );
};
