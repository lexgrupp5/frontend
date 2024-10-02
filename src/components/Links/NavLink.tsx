import { Path, PathType } from "@/constants";
import { useMessageContext } from "@/hooks";
import { ReactElement, ReactNode } from "react";
import { NavLink as NavLinkPlain } from "react-router-dom";

interface Props {
	to: PathType;
	children: ReactNode;
  className?: string;
  activeClassName?: string;
}

export const NavLink: React.FC<Props> = ({
  to,
  children,
  className,
  activeClassName,
}): ReactElement => {
  const messageContext = useMessageContext();

  const clearGlobalMessages = () => {
    messageContext.clearMessages();
  };

  return (
    <NavLinkPlain
      to={to === Path.INDEX ? Path.INDEX : `/${to}`}
      className={({ isActive: isActiveLink }) => {
        if (isActiveLink) {
          return activeClassName != null 
            ? activeClassName
            : "text-white underline underline-offset-4";
        } else {
          return className != null
            ? className
            : "text-indigo-200 hover:text-white";
        }
      }}
      onClick={clearGlobalMessages}>
      {children}
    </NavLinkPlain>
  );
};
