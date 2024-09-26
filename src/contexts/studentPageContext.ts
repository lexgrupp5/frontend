import { CustomApiException, CourseDto, ModuleDto, ActivityDto } from "@/api";

export interface IStudentPageContext {
    pending: boolean;
    error: CustomApiException | null;
    course: CourseDto | null;
    modules: ModuleDto[] | null;
    activities: ActivityDto[] | null;
    clearError: () => void;
}