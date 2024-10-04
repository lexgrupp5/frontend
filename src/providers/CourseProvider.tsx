import { useState, ReactElement, ReactNode } from "react";

import { ActivityDto, api, CourseDto, ModuleDto, UserDto } from "@/api";
import { CourseContext, ICourseContext, ICourseData } from "@/contexts";
import { useApi, useAuthContext, useMessageContext } from "@/hooks";


interface Props {
  children?: ReactNode;
}

export const CourseProvider: React.FC<Props> = ({
  children
}): ReactElement => {
  const getCourse = useApi(api.userGET);
  const getCourseParticipants = useApi(api.course);
  const getModules = useApi(api.modulesAll);
  const getModuleActivities = useApi(api.activities);
  const messageContext = useMessageContext();
  const authContext = useAuthContext();
  const [course, setCourse] = useState<CourseDto | null>(null);
  const [modules, setModules] = useState<ModuleDto[]>([]);
  const [activities, setActivities] = useState<ActivityDto[]>([]);
  const [participants, setParticipants] = useState<UserDto[]>([]);

  const updateActivities = (activities: ActivityDto[]) => {
    setActivities(activities);
  };

  const fetchCourseData = async (): Promise<ICourseData> => {
    const course = getDefaultCourse();
    const username = authContext.getUsername();
    if (username == null) {
      setUnknownErrorMessage();
      return course;
    }

    const [courseErr, courseResult]  = await getCourse.makeAuthRequestWithErrorResponse(username);
    setCourse(courseResult);
    if (courseErr != null) { messageContext.updateErrorMessage(courseErr?.message); }
    if (courseResult?.id == null) {
      setUnknownErrorMessage();
      return { ...course, course: courseResult };
    }
    
    const [modulesErr, modulesResult] = await getModules.makeAuthRequestWithErrorResponse(courseResult.id);
    if (modulesErr != null) { messageContext.updateErrorMessage(modulesErr?.message); }
    setModules(modulesResult ?? []);
    const activities = await updateModuleActivities(modulesResult ?? []);
    
    const [participantsErr, participantsResult] = await getCourseParticipants.makeAuthRequestWithErrorResponse(courseResult.id);
    if (participantsErr != null) { messageContext.updateErrorMessage(participantsErr.message); }
    setParticipants(participantsResult ?? []); 
    return {
      course: courseResult,
      participants: participantsResult ?? [],
      modules: modulesResult ?? [],
      activities
    };
  };

  const getDefaultCourse = (): ICourseData => ({
    course: null,
    modules: [],
    activities: [],
    participants: []
  });

  const setUnknownErrorMessage = () => {
    messageContext.updateErrorMessage("Could not fetch valid course data from server, please try login again."); 
  };

  const updateModuleActivities = async (courseModules: ModuleDto[]): Promise<ActivityDto[]> => {
    const activities: ActivityDto[] = [];
    for (const module of courseModules) {
      if (module.id == null) { continue; }
      const [err, result] = await getModuleActivities.makeAuthRequestWithErrorResponse(module.id);
      if (err != null) { 
        messageContext.updateErrorMessage(err?.message);
        continue;
      }
      if (result != null) {
        activities.push(...result); 
      }
    };
    updateActivities(activities);
    return activities;
  };

  const isPending = () => {
    return (
      getCourse.pending || 
      getModules.pending || 
      getModuleActivities.pending);
  };

  const constructCourseContext = (): ICourseContext => ({
    course,
    modules,
    activities,
    participants,
    isPending,
    fetchCourseData
  });

  return (
    <>
      <CourseContext.Provider value={constructCourseContext()}>  
        {children}
      </CourseContext.Provider>
    </>
  );
};