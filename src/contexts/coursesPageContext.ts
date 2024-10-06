import { CustomApiException, ICourseDto } from "@/api";

export interface ICoursesPageContext {
  pending: boolean
  error: CustomApiException | null;  
  courses: ICourseDto[];
  searchAndFilter: ISearchAndFilterDTO;
  pagination: IPaginationDTO;
  updateSearchAndFilter: (searchAndFilter: ISearchAndFilterDTO) => void;
  updatePagination: (pagination: IPaginationDTO) => void;
  fetchCourses: () => Promise<void>;
  clearError: () => void;
}

export interface ISearchAndFilterDTO {
  searchText?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface IPaginationDTO {
  page?: number;
  limit?: number;
}
