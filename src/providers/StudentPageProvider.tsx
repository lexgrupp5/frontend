import { useState, ReactElement } from "react";
import { Outlet } from "react-router-dom";

import { ActivityDto, CourseDto, ModuleDto, UserDto } from "@/api";
import { IStudentPageContext } from "@/contexts";

/**
 * TODO Refactor to normal provider using children and use
 * it for all elements.
 */
export const StudentPageProvider = (): ReactElement => {
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

  const constructStudentPageContext = (): IStudentPageContext => ({
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
      <Outlet context={constructStudentPageContext()} />
    </>
  );
};