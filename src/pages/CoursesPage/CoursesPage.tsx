import { ReactElement } from "react";

import { useCoursePageContext } from "@/hooks";
import { CourseList } from "./CourseList";
import { P, Spinner, ErrorModal } from "@/components";
import { getAPI } from "@/config";

export const CoursesPage = (): ReactElement => {
  const { pending, error, clearError } = useCoursePageContext();
  
  if (pending) {
    return <div className="h-[calc(100vh-10rem)]"><Spinner /></div>;
  }

  if (error != null) {
    return <ErrorModal isOpen={true}
      onClose={clearError}>
      <P>Error message from {getAPI()}:</P>
      <P>{error.message}</P>
    </ErrorModal>;
  }

  return (
    <CourseList />
  );
};
