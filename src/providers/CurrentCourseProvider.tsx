import { ReactNode, useState } from "react";

import { ActivityDto, ICourseDto, ModuleDto, UserDto } from "@/api";
import { CurrentCourseContext, ICurrentCourseContext } from "@/contexts";

interface Props {
  children?: ReactNode;
}

export const CurrentCourseProvider: React.FC<Props> = ({
  children
}): React.ReactElement => {
  const [selectedCourse, setSelectedCourse] = useState<ICourseDto | null>(null);
  const [selectedModule, setSelectedModule] = useState<ModuleDto | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityDto | null>(null);
  const [selectedParticipant, setSelectedParticipant] = useState<UserDto | null>(null);

  const updateSelectedCourse = (course: ICourseDto | null) => {
    setSelectedCourse(course);
  };

  const updateSelectedActivity = (activity: ActivityDto | null) => {
    setSelectedActivity(activity);
  };

  const updateSelectedModule = (module: ModuleDto | null) => {
    setSelectedModule(module);
  };

  const updateSelectedParticipant = (participant: UserDto | null) => {
    setSelectedParticipant(participant);
  };

  const constructCurrentCourseContext = (): ICurrentCourseContext => ({
    selectedCourse,
    selectedModule,
    selectedActivity,
    selectedParticipant,
    updateSelectedCourse,
    updateSelectedActivity,
    updateSelectedModule,
    updateSelectedParticipant
  });

  return (
    <>
      <CurrentCourseContext.Provider value={constructCurrentCourseContext()}>  
        {children}
      </CurrentCourseContext.Provider>
    </>
  );  
};
