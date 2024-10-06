import { ReactElement, SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

export const TransparentSelectMenu: React.FC<Props> = ({
  options,
  name,
  id,
  onChange,
  value
}): ReactElement => {
  return (
    <select
      className="text-center p-2
        bg-transparent rounded-lg
        border-none text-white text-2xl
        hover:border-white hover:ring-2 hover:ring-white
        focus:border-white focus:ring-2 focus:ring-white
        cursor-pointer appearance-none"
      name={name}
      id={id}
      value={value}
      onChange={onChange}>
      {options.map(option => (
        <option className="text-[1rem] text-black"
          key={option}
          value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
