import { createContext } from "react";

import { CourseDto, ModuleDto, ActivityDto, UserDto } from "@/api";

export interface ICourseData {
    course: CourseDto | null
    modules: ModuleDto[];
    activities: ActivityDto[];
    participants: UserDto[]
}

export interface ICourseContext extends ICourseData {
    isPending: () => boolean;
    fetchCourseData: () => Promise<ICourseData>;
}

export const CourseContext = createContext<ICourseContext | null>(null);
