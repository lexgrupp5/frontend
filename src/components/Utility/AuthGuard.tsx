import { ReactElement } from "react";
import { useAuthContext } from "@/hooks";
import { NavigateToPath } from "./NavigateToPath";
import { Path } from "@/constants";

interface Props {
  children: ReactElement;
}

export const AuthGuard: React.FC<Props> = ({
    children
}): ReactElement => {
  const { isLoggedIn } = useAuthContext();

  if (isLoggedIn === false) {
    return <NavigateToPath to={Path.LOGIN} />;
  }

  return children;
}
