import { ReactElement } from "react";

import { useCurrentCourseContext } from "@/hooks";
import { CourseDesk } from "./CourseDesk";
import { NavigateToPath } from "@/components";
import { Path } from "@/constants";

export const CurrentCoursePage = (): ReactElement => {
  const { selectedCourse } = useCurrentCourseContext();
  
  return (
    <>{selectedCourse == null
      ? <NavigateToPath to={Path.INDEX} />
      : <CourseDesk selectedCourse={selectedCourse}/>
    }</>
  );
};
