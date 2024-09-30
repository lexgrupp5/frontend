import { ReactElement } from "react";
import { useAuthContext } from "@/hooks";
import { NavigateToPath } from "./NavigateToPath";
import { Path } from "@/constants";

interface Props {
  children: ReactElement;
}

export const TeacherGuard: React.FC<Props> = ({
  children
}): ReactElement => {
  const { isTeacher } = useAuthContext();

  if (!isTeacher()) {
    return <NavigateToPath to={Path.INDEX} />;
  }

  return children;
};
