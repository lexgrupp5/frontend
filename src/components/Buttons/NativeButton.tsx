import { ReactNode } from "react";

interface Props {
  children?: ReactNode
  color?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const NativeButton: React.FC<Props> = ({
  children,
  className,
  onClick
}) => {

  return (
    <button
      type="button"
      onClick={onClick}
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
    </button>
  );
};
