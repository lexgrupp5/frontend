import { CustomApiException, ICourseDto } from "@/api";
import { IPaginationMeta } from "@/events";

export interface ICoursesPageContext {
  pending: boolean
  error: CustomApiException | null;  
  courses: ICourseDto[];
  searchAndFilter: ISearchAndFilterDTO;
  pagination: IPaginationDTO;
  paginationMeta: IPaginationMeta | null;
  updateSearchAndFilter: (searchAndFilter: ISearchAndFilterDTO) => ISearchAndFilterDTO;
  updatePagination: (pagination: IPaginationDTO) => IPaginationDTO;
  fetchCourses: (
    searchAndFilter?: ISearchAndFilterDTO,
    pagination?: IPaginationDTO
  ) => Promise<void>;
  clearError: () => void;
}

export interface ISearchAndFilterDTO {
  searchText?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface IPaginationDTO {
  page?: number;
  size?: number;
}
