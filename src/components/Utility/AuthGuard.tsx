import { ReactElement } from "react";
import { useAuthContext, useNavigateToPath } from "@/hooks";
import { Path } from "@/constants";

interface Props {
  children: ReactElement;
}

export const AuthGuard: React.FC<Props> = ({
  children
}): ReactElement => {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigateToPath();

  if (!isLoggedIn) {
    navigate(Path.LOGIN, true);
  }

  return children;
};
