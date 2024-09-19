import { Path, PathType } from "@/constants";
import { ReactElement, ReactNode } from "react";
import { Link as LinkPlain } from "react-router-dom";

interface Props {
	to: PathType;
	children: ReactNode;
}

export const Link: React.FC<Props> = ({
  to,
  children
}): ReactElement => {

  return (
    <LinkPlain
      to={to === Path.INDEX ? Path.INDEX : `/${to}`}>
      {children}
    </LinkPlain>
  );
};
