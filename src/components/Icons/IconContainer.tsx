import { ReactElement, ReactNode } from "react";
import { IconContext } from 'react-icons';

interface Props {
  children: ReactNode;
  className?: string;
}

export const IconContainer: React.FC<Props> = ({
  children,
  className
}): ReactElement => {
  return (
    <div className={className ?? "h-4 w-4"}>
      <IconContext.Provider value={{
        className: "bg-inherit w-full h-full"
      }}>
        {children}
      </IconContext.Provider>
    </div>
  );
};
