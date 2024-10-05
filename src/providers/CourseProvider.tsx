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
  const getCourse = useApi(api.course);
  const getCourseParticipants = useApi(api.students);
  const getModules = useApi(api.modulesAll);
  const getModuleActivities = useApi(api.activitiesAll);
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
    const username = authContext.getUsername();
    if (username == null) {
      setUnknownErrorMessage();
      return getDefaultCourseData();
    }

    const [courseErr, course] = await getCourse.makeAuthRequestWithErrorResponse(username);
    if (courseErr != null) { messageContext.updateErrorMessage(courseErr?.message); }
    if (course?.id == null) {
      setUnknownErrorMessage();
      return getDefaultCourseData();
    }

    const [modulesErr, modulesResult] = await getModules.makeAuthRequestWithErrorResponse(
      course.id
    );
    if (modulesErr != null) { 
      messageContext.updateErrorMessage(modulesErr?.message);
    }
    const modules = modulesResult ?? [];
    
    const moduleNow = getCurrentModule(modules);
    const activities = moduleNow?.activities ?? []; 

    const [participantsErr, participantsResult] = await getCourseParticipants.makeAuthRequestWithErrorResponse(
      course.id
    );
    if (participantsErr != null) {
      messageContext.updateErrorMessage(participantsErr.message);
    }
    const participants = participantsResult ?? [];
    
    setCourse(course);
    setModules(modules);
    updateActivities(activities);
    setParticipants(participants);
    
    return {
      course,
      modules,
      activities,
      participants
    };
  };

  const getDefaultCourseData = (): ICourseData => ({
    course,
    modules,
    activities,
    participants
  });

  const setUnknownErrorMessage = () => {
    messageContext.updateErrorMessage("Could not get course information from server, please try login again.");
  };



  const isPending = () => {
    return (
      getCourse.pending ||
      getModules.pending ||
      getModuleActivities.pending);
  };

  const getCurrentModule = (modules: ModuleDto[]) => {
    const dateNow = new Date();

    if (dateNow > new Date(modules[modules.length - 1].endDate!)) {
      return modules[modules.length - 1];
    }

    if (dateNow < new Date(modules[0].startDate!)) {
      return modules[0];
    }

    const activeModule = modules.find(
      (module) => dateNow >= new Date(module.startDate!) && dateNow <= new Date(module.endDate!)
    );
    return activeModule;
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