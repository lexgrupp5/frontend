import { ReactElement, ReactNode, SelectHTMLAttributes, useState } from "react";
import { IconContainer } from "../Icons";
import { Label } from "react-aria-components";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  label?: string;
  icon?: ReactNode;
}

export const SelectMenu: React.FC<Props> = ({
  options,
  name,
  id,
  label,
  value,
  onChange
}): ReactElement => {
  const [openState, setOpenState] = useState(false);

  return (
    <div className="relative min-h-full flex flex-col space-y-2">
      {label && <Label className="font-medium text-gray-800">{label}</Label>}
      <select
        onClick={() => { setOpenState(prev => !prev); }}
        className="w-full rounded-lg border 
        border-gray-300 px-4 py-2 shadow-sm
        transition-all duration-300 
        focus:border-indigo-500
        focus:outline-none focus:ring-2
        focus:ring-indigo-500
        appearance-none"
        name={name}
        id={id}
        value={value}
        onChange={onChange}>
        {options.map(option => (
          <option className="text-[1rem]"
            key={option}
            value={option}>{option}</option>
        ))}
      </select>
      {openState ? 
        <IconContainer className="absolute bottom-2 right-4
        size-6 text-gray-600">
          <FaChevronDown></FaChevronDown>
        </IconContainer>
        : <IconContainer className="absolute bottom-2 right-4
        size-6 text-gray-600">
          <FaChevronRight></FaChevronRight>
        </IconContainer>}
    </div>
  );
};
