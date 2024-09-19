import { Button as AriaButton, PressEvent } from "react-aria-components";

interface Props {
  label: string;
  color?: string;
  className?: string;
  onPress?: (e: PressEvent) => void;
}

export const Button: React.FC<Props> = ({
  label,
  className,
  onPress
}) => {
  
  const constructClassName = () => {
    if (className != null) {
      return className;
    } else {
      return "w-full bg-indigo-800 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out"; 
    }
  };

  return (
    <AriaButton
      type="button"
      onPress={onPress}
      className={constructClassName()}>
      {label}
    </AriaButton>
  );
};
