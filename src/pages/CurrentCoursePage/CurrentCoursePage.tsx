import { ReactElement, useEffect } from "react";

import { useCourseContext, useCurrentCourseContext, useNavigateToPath } from "@/hooks";
import { CourseDesk } from "./CourseDesk";
import { FullPageSpinner } from "@/components";
import { Path } from "@/constants";

export const CurrentCoursePage = (): ReactElement => {
  const courseContext = useCourseContext();
  const currentCourseContext = useCurrentCourseContext();
  const navigate = useNavigateToPath();

  useEffect(() => {
    (async () => {
      if (courseContext.course == null) {
        const courseData = await courseContext.fetchCourseData();
        if (courseData.course == null) {
          navigate(Path.INDEX);
          return;
        }
        currentCourseContext.updateSelectedCourse(courseData.course);
      }
    })();
  }, []);

  if (courseContext.isPending() ||
    currentCourseContext.selectedCourse == null ) {
    return <FullPageSpinner />;
  }
  
  return (
    <>
      <CourseDesk selectedCourse={currentCourseContext.selectedCourse}/>
    </>
  );
};
