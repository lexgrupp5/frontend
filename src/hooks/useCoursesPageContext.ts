import { useOutletContext } from "react-router-dom";
import { ICoursesPageContext } from "@/contexts";

export type ICoursePageContextHook = ReturnType<typeof useCoursesPageContext>;

export const useCoursesPageContext = () => {
  return useOutletContext<ICoursesPageContext>();
};
