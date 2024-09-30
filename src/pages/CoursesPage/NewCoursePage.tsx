import { ReactElement } from "react";
import { CreateCourseForm } from "./CreateCourseForm";
import { useAuthContext } from "@/hooks";
import { NavigateToPath } from "@/components";
import { Path } from "@/constants";

export const NewCoursePage = (): ReactElement => {
  const authContext = useAuthContext();

  if (!authContext.isTeacher()) {
    return <NavigateToPath to={Path.INDEX} />;
  }

  return (
    <CreateCourseForm />
  );
};