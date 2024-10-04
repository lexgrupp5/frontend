import { useContext } from "react";

import { CourseContext } from "@/contexts";

export type ICourseContextHook = ReturnType<typeof useCourseContext>

export function useCourseContext () {
  const courseContext = useContext(CourseContext);

  if (!courseContext) {
    throw new Error(
      "useCourseContext has to be used within <CourseContext.Provider>"
    );
  }

  return courseContext;
};
