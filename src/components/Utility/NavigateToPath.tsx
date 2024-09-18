import { ReactElement } from "react";
import { Navigate, NavigateProps } from "react-router-dom";
import { Path, PathType } from "@/constants";

interface Props
extends NavigateProps {
  to: PathType
}

export const NavigateToPath: React.FC<Props> = ({
  to
}): ReactElement => {
	return <Navigate to={to === Path.INDEX ? Path.INDEX : `/${to}`}/>;
}
