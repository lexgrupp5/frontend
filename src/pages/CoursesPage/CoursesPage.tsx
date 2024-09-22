import { ReactElement } from "react";

import { useCoursePageContext } from "@/hooks";
import { CourseList } from "./CourseList";

export const CoursesPage = (): ReactElement => {
  const { courses } = useCoursePageContext();

  return (
    <CourseList courses={courses}/>
  );
};
