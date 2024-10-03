import { Path, PathType } from "@/constants";
import { useMessageContext } from "@/hooks";
import { ReactElement, ReactNode } from "react";
import { NavLink as NavLinkPlain } from "react-router-dom";

interface Props {
	to: PathType;
	children: ReactNode;
  className?: string;
  activeClassName?: string;
  keepMessage?: boolean;
}

export const NavLink: React.FC<Props> = ({
  to,
  children,
  className,
  activeClassName,
  keepMessage = false
}): ReactElement => {
  const messageContext = useMessageContext();

  const clearGlobalMessages = () => {
    if (keepMessage) { return; }
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
