import { Path, PathType } from "@/constants";
import { ReactElement } from "react";
import { NavLink as NavLinkPlain } from "react-router-dom";

interface Props {
	to: PathType;
	label: string;
}

export const NavLink: React.FC<Props> = ({
  to,
  label
}): ReactElement => {

  return (
    <NavLinkPlain
      to={to === Path.INDEX ? Path.INDEX : `/${to}`}
      className={({ isActive }) => (
        isActive 
          ? "text-blue-500 font-bold"
          : "text-gray-500"
      )}>
      {label}
    </NavLinkPlain>
  );
};
