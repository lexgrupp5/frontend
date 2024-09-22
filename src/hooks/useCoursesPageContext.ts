import { useOutletContext } from "react-router-dom";
import { ICoursesPageContext } from "@/contexts";

export type ICoursePageContextHook = ReturnType<typeof useCoursePageContext>;

export const useCoursePageContext = () => {
  return useOutletContext<ICoursesPageContext>();
};
