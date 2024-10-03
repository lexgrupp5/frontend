import { CourseDto, ModuleDto, ActivityDto, UserDto } from "@/api";

export interface IStudentPageContext {
    course: CourseDto | null;
    modules: ModuleDto[];
    activities: ActivityDto[];
    participants: UserDto[];
    updateCourse: (course: CourseDto | null) => void
    updateActivities: (course: ActivityDto[]) => void
    updateModules: (course: ModuleDto[]) => void
    updateParticipants: (course: UserDto[]) => void
}
