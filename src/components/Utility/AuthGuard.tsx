import { ReactElement } from "react";
import { useAuthContext } from "@/hooks";
import { Path } from "@/constants";
import { NavigateToPath } from "./NavigateToPath";

interface Props {
  children: ReactElement;
}

export const AuthGuard: React.FC<Props> = ({
  children
}): ReactElement => {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return <NavigateToPath to={Path.LOGIN} />;
  }

  return children;
};
