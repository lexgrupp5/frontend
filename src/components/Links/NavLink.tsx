import { Path, PathType } from "@/constants";
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

  return (
    <NavLinkPlain
      to={to === Path.INDEX ? Path.INDEX : `/${to}`}
      className={({ isActive: isActiveLink }) => {
        if (isActiveLink) {
          return activeClassName != null 
            ? activeClassName
            : "text-white underline";
        } else {
          return className != null
            ? className
            : "text-indigo-200 hover:text-white";
        }
      }}>
      {children}
    </NavLinkPlain>
  );
};
