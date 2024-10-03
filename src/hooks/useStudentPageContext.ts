import { useOutletContext } from "react-router-dom";
import { IStudentPageContext } from "@/contexts";

export type IStudentPageContextHook = ReturnType<typeof useStudentPageContext>;

export const useStudentPageContext = () => {
  return useOutletContext<IStudentPageContext>();
};
