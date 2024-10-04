import { ReactElement, useEffect, useState } from "react";

import { useApi, useMessageContext } from "@/hooks";
import { api, ICourseDto, UserDto, type ModuleDto } from "@/api";
import { CourseSidebar } from "./CourseSidebar";
import { CourseArticle } from "./CourseArticle";
import { FullPageSpinner } from "@/components";

interface Props {
  selectedCourse: ICourseDto 
}

/**
 * @TODO Update to use course context users, modules and activities first,
 * if null then fetch data.
 * 
 * @TODO Add debug script.
 * 
 * @TODO fix navigate to index issue when reolading from current course page.
 * 
 * @TODO Load particpants on landing page also.
 */
export const CourseDesk: React.FC<Props> = ({
  selectedCourse
}): ReactElement => {
  const getCourseModules = useApi(api.modulesAll);
  const getModuleActivities = useApi(api.activities);
  const getCourseParticipants = useApi(api.course);
  const [leftMargin, setLeftMargin ] = useState(0);
  const [modules, setModules] = useState<ModuleDto[]>([]);
  const [participants, setParticipants] = useState<UserDto[]>([]);
  const msgContext = useMessageContext();
  const [cacheTimestamp, setCacheTimestamp] = useState(Date.now());

  useEffect(() => {
    (async () => {
      if (selectedCourse?.id == null) { return; }
      
      const [participantsErr, participantsResult] = await getCourseParticipants.makeAuthRequestWithErrorResponse(selectedCourse.id);
      if (participantsErr != null || participantsResult == null) {
        msgContext.updateErrorMessage("Course data could not be fetched");
      } else {
        console.log(participantsResult);
        setParticipants(participantsResult);
      }

      const [modulesErr, modulesResult] = await getCourseModules.makeAuthRequestWithErrorResponse(selectedCourse.id);
      if (modulesErr != null || modulesResult == null) {
        msgContext.updateErrorMessage("Course data could not be fetched");
      } else {
        await updateModuleActivities(modulesResult);
        setModules(modulesResult);
      }
    })();
  }, [cacheTimestamp, selectedCourse?.id]);

  const updateModuleActivities = async (courseModules: ModuleDto[]) => {
    courseModules.forEach(async module => {
      if (module.id == null) { return; }
      module.activities = await getModuleActivities.makeAuthRequest(module.id) ?? [];
    });
  };

  const updateLeftMargin = (margin: number) => {
    setLeftMargin(margin);
  }; 

  const updateCacheTimestamp = () => {
    setCacheTimestamp(Date.now());
  };

  if (selectedCourse == null) { return <></>; }

  if (getCourseModules.pending || getModuleActivities.pending) {
    return <FullPageSpinner />;
  }

  return (
    <article className="min-h-screen-header bg-indigo-100">
      <CourseSidebar
        participants={participants}
        modules={modules}
        onOpen={updateLeftMargin}
        updateCacheTimestamp={updateCacheTimestamp} />
      <div style={{ marginLeft: `${leftMargin}px` }}
        className="px-8 py-6 flex justify-center">
        <CourseArticle
          course={selectedCourse}
          updateCacheTimestamp={updateCacheTimestamp} />  
      </div>
    </article>
  );
};
