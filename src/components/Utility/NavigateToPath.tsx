import { ReactElement } from "react";
import { Navigate, NavigateProps } from "react-router-dom";
import { Path, PathType } from "@/constants";

interface Props
extends NavigateProps {
  to: PathType
}

export const NavigateToPath: React.FC<Props> = ({
  to,
  ...props
}): ReactElement => {
  return <Navigate
    {...props} 
    to={to === Path.INDEX ? Path.INDEX : `/${to}`}/>;
};
