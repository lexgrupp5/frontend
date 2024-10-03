import { createContext } from "react";

import { CourseDto, ModuleDto, ActivityDto, UserDto } from "@/api";

export interface ICourseContext {
    course: CourseDto | null;
    modules: ModuleDto[];
    activities: ActivityDto[];
    participants: UserDto[];
    updateCourse: (course: CourseDto | null) => void
    updateActivities: (course: ActivityDto[]) => void
    updateModules: (course: ModuleDto[]) => void
    updateParticipants: (course: UserDto[]) => void
}

export const CourseContext = createContext<ICourseContext | null>(null);
