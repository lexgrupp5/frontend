import { ApiException, ICourseDto } from "@/api";

export interface ICoursesPageContext {
  pending: boolean
  error: ApiException | null;  
  courses: ICourseDto[];
  selectedCourse: ICourseDto | null;
  searchAndFilterDTO: ISearchAndFilterDTO;
  updateSearchAndFilterDTO: (dto: ISearchAndFilterDTO) => void; 
  fetchCourses: (dto: ISearchAndFilterDTO) => void;
  updateSelectedCourse: (course: ICourseDto) => void;
  clearError: () => void;
}

export interface ISearchAndFilterDTO {
  searchText?: string;
  startDate?: Date;
  endDate?: Date;
}
