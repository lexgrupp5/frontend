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
  const getParticipants = useApi(api.students);
  const getModules = useApi(api.modulesAll);
  const { updateErrorMessage } = useMessageContext();
  const { getUsername } = useAuthContext();
  const [course, setCourse] = useState<CourseDto | null>(null);
  const [modules, setModules] = useState<ModuleDto[]>([]);
  const [activities, setActivities] = useState<ActivityDto[]>([]);
  const [participants, setParticipants] = useState<UserDto[]>([]);

  const updateActivities = (activities: ActivityDto[]) => {
    setActivities(activities);
  };

  const fetchCourseData = async (): Promise<ICourseData> => {
    // Get username username
    const username = getUsername();
    if (username == null) {
      updateErrorMessage(getUnknownErrorMsg());
      return getDefaultCourseData();
    }

    // Fetch course data
    const [courseErr, course] = await getCourse.makeAuthRequestWithErrorResponse(username);
    if (courseErr != null || course?.id == null) {
      updateErrorMessage(courseErr?.message ?? getUnknownErrorMsg());
      return getDefaultCourseData();
    }

    // Fetch modules data based on course
    const [modulesErr, modulesRes] = await getModules.makeAuthRequestWithErrorResponse(course.id);
    if (modulesErr != null) { updateErrorMessage(modulesErr?.message); }
    const modules = modulesRes ?? [];   
    
    // Extract current modules activities
    const moduleNow = getCurrentModule(modules);
    const activities = moduleNow?.activities ?? []; 

    // Fetch participants data
    const [participantsErr, participantsRes] = await getParticipants.makeAuthRequestWithErrorResponse(course.id);
    if (participantsErr != null) { updateErrorMessage(participantsErr.message); }
    const participants = participantsRes ?? [];
    
    // Set all state values
    setCourseContextState({ course, modules, activities, participants });
    
    // Return the complete course data
    return { course, modules, activities, participants };
  };

  const getDefaultCourseData = (): ICourseData => ({
    course,
    modules,
    activities,
    participants
  });

  const getUnknownErrorMsg = () => {
    return "Could not get course information from server, please try login again.";
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

  const setCourseContextState = ({
    course, modules, activities, participants
  } : ICourseData) => {
    setCourse(course);
    setModules(modules);
    updateActivities(activities);
    setParticipants(participants);
  };

  const isPending = () => {
    return (getCourse.pending || getModules.pending);
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