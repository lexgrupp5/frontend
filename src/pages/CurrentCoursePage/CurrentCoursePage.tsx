import { ReactElement } from "react";

import { useCurrentCourseContext } from "@/hooks";
import { CourseDesk } from "./CourseDesk";

export const CurrentCoursePage = (): ReactElement => {
  const { selectedCourse } = useCurrentCourseContext();
  
  return (
    <>
      {selectedCourse != null && <CourseDesk selectedCourse={selectedCourse}/>}
    </>
  );
};
