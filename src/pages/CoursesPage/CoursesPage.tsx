import { ReactElement } from "react";

import { useCoursePageContext } from "@/hooks";
import { CourseList } from "./CourseList";
import { P, Spinner } from "@/components";
import { getAPI } from "@/config";

export const CoursesPage = (): ReactElement => {
  const { courses, pending, errorMsg } = useCoursePageContext();
  
  if (pending) {
    return <div className="h-[calc(100vh-10rem)]"><Spinner /></div>;
  }

  if (errorMsg != "") {
    return <div className="h-[calc(100vh-10rem)]
      flex flex-col justify-center items-center">
      <P>Error message from {getAPI()}:</P>
      <P>{errorMsg}</P>
    </div>;
  }

  return (
    <CourseList courses={courses}/>
  );
};
