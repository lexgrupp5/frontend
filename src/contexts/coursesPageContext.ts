import { ActivityDto, CustomApiException, ICourseDto, ModuleDto, UserDto } from "@/api";

export interface ICoursesPageContext {
  pending: boolean
  error: CustomApiException | null;  
  courses: ICourseDto[];
  selectedCourse: ICourseDto | null;
  selectedModule: ModuleDto | null;
  selectedActivity: ActivityDto | null;
  selectedParticipant: UserDto | null;
  searchAndFilterDTO: ISearchAndFilterDTO;
  updateSearchAndFilterDTO: (dto: ISearchAndFilterDTO) => void; 
  fetchCourses: (dto: ISearchAndFilterDTO) => void;
  updateSelectedCourse: (course: ICourseDto) => void;
  updateSelectedActivity: (activity: ActivityDto | null) => void;
  updateSelectedModule: (module: ModuleDto | null) => void;
  updateSelectedParticipant: (participant: UserDto | null) => void;
  clearError: () => void;
}

export interface ISearchAndFilterDTO {
  searchText?: string;
  startDate?: Date;
  endDate?: Date;
}
