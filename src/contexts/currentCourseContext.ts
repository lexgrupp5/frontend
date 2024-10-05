import { createContext } from "react";

import { ActivityDto, ICourseDto, ModuleDto, UserDto } from "@/api";

export interface ICurrentCourseContext {
  selectedCourse: ICourseDto | null;
  selectedModule: ModuleDto | null;
  selectedActivity: ActivityDto | null;
  selectedParticipant: UserDto | null;
  updateSelectedCourse: (course: ICourseDto | null) => void;
  updateSelectedActivity: (activity: ActivityDto | null) => void;
  updateSelectedModule: (module: ModuleDto | null) => void;
  updateSelectedParticipant: (participant: UserDto | null) => void;
}

export const CurrentCourseContext = createContext<ICurrentCourseContext | null>(null);
