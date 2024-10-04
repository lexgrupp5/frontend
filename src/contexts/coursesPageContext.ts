import { CustomApiException, ICourseDto } from "@/api";

export interface ICoursesPageContext {
  pending: boolean
  error: CustomApiException | null;  
  courses: ICourseDto[];
  searchAndFilterDTO: ISearchAndFilterDTO;
  updateSearchAndFilterDTO: (dto: ISearchAndFilterDTO) => void; 
  fetchCourses: (dto?: ISearchAndFilterDTO) => Promise<void>;
  clearError: () => void;
}

export interface ISearchAndFilterDTO {
  searchText?: string;
  startDate?: Date;
  endDate?: Date;
}
