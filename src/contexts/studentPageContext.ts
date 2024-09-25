import { CustomApiException, CourseDto, ModuleDto } from "@/api";

export interface IStudentPageContext {
    pending: boolean;
    error: CustomApiException | null;
    course: CourseDto | null;
    modules: ModuleDto[] | null;
    clearError: () => void;
}