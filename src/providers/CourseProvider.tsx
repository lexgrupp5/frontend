import { useState, ReactElement, ReactNode } from "react";
import { Outlet } from "react-router-dom";

import { ActivityDto, CourseDto, ModuleDto, UserDto } from "@/api";
import { CourseContext, ICourseContext } from "@/contexts";


interface Props {
  children?: ReactNode;
}

export const CourseProvider: React.FC<Props> = ({
  children
}): ReactElement => {
  const [course, setCourse] = useState<CourseDto | null>(null);
  const [modules, setModules] = useState<ModuleDto[]>([]);
  const [activities, setActivities] = useState<ActivityDto[]>([]);
  const [participants, setParticipants] = useState<UserDto[]>([]);

  const updateCourse = (course: CourseDto | null) => {
    setCourse(course);
  };

  const updateModules = (modules: ModuleDto[]) => {
    setModules(modules);
  };

  const updateActivities = (activities: ActivityDto[]) => {
    setActivities(activities);
  };

  const updateParticipants = (participants: UserDto[]) => {
    setParticipants(participants);
  };

  const constructCourseContext = (): ICourseContext => ({
    course,
    modules,
    activities,
    participants,
    updateCourse,
    updateModules,
    updateActivities,
    updateParticipants
  });

  return (
    <>
      <CourseContext.Provider value={constructCourseContext()}>  
        {children}
      </CourseContext.Provider>
    </>
  );
};