import { useContext } from "react";

import { CurrentCourseContext } from "@/contexts";

export type ICurrentCourseContextHook = ReturnType<typeof useCurrentCourseContext>

export function useCurrentCourseContext () {
  const currentCourseContext = useContext(CurrentCourseContext);

  if (!currentCourseContext) {
    throw new Error(
      "useCurrentCourseContext has to be used within <CurrentCourseContext.Provider>"
    );
  }

  return currentCourseContext;
};
