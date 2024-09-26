import { CustomApiException, CourseDto, ModuleDto, ActivityDto, UserDto } from "@/api";

export interface IStudentPageContext {
    pending: boolean;
    error: CustomApiException | null;
    course: CourseDto | null;
    modules: ModuleDto[] | null;
    participants: UserDto[] | null
    activities: ActivityDto[] | null;
    clearError: () => void;
}