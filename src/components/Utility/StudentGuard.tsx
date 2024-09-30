import { ReactElement } from "react";
import { useAuthContext } from "@/hooks";
import { NavigateToPath } from "./NavigateToPath";
import { Path } from "@/constants";

interface Props {
  children: ReactElement;
}

export const StudentGuard: React.FC<Props> = ({
  children
}): ReactElement => {
  const { isStudent } = useAuthContext();

  if (!isStudent()) {
    return <NavigateToPath to={Path.INDEX} />;
  }

  return children;
};
