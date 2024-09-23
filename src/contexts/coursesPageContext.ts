import { ApiException, ICourseDto } from "@/api";

export interface ICoursesPageContext {
  pending: boolean
  error: ApiException | null;  
  courses: ICourseDto[];
  selectedCourse: ICourseDto | null;
  clearError: () => void;
  updateSelectedCourse: (course: ICourseDto) => void;
}
