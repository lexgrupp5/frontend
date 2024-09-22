import { ICourseDto } from "@/api";

export interface ICoursesPageContext {
  pending: boolean
  errorMsg: string;  
  courses: ICourseDto[];
  selectedCourse: ICourseDto | null;
  updateSelectedCourse: (course: ICourseDto) => void;
}
