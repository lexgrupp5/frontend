import { ReactElement } from "react";

import { useCoursesPageContext } from "@/hooks";
import { CourseDesk } from "./CourseDesk";

export const CurrentCoursePage = (): ReactElement => {
  const { selectedCourse } = useCoursesPageContext();
  
  return (
    <>
      {selectedCourse != null && <CourseDesk selectedCourse={selectedCourse}/>}
    </>
  );
};
