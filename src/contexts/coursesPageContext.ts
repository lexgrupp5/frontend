import { ICourseDto } from "@/api";

export interface ICoursesPageContext {
  courses: ICourseDto[];
  selectedCourse: ICourseDto | null;
  updateSelectedCourse: (course: ICourseDto) => void;
}
