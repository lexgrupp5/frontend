import { ReactElement, useEffect, useState } from "react";

import { useApi, useCoursesPageContext, useMessageContext } from "@/hooks";
import { api, type ModuleDto } from "@/api";
import { CourseSidebar } from "./CourseSidebar";
import { CourseArticle } from "./CourseArticle";
import { FullPageSpinner } from "@/components";
import { DefaultToastMessage } from "../SharedComponents";

export const CurrentCoursePage = (): ReactElement => {
  const getCourseModules = useApi(api.course);
  const getModuleActivities = useApi(api.activities);
  const { selectedCourse } = useCoursesPageContext();
  const [leftMargin, setLeftMargin ] = useState(0);
  const [modules, setModules] = useState<ModuleDto[]>([]);
  const msgContext = useMessageContext();
  const [courseCacheTimestamp, setCourseCacheTimestamp] = useState(Date.now());

  useEffect(() => {
    (async () => {
      if (selectedCourse?.id == null) { return; }
      const [err, result] = await getCourseModules.makeAuthRequestWithErrorResponse(selectedCourse.id);
      if (err != null || result == null) {
        msgContext.updateErrorMessage("Course data could not be fetched");
      } else {
        await updateModuleActivities(result);
        setModules(result);
      }
    })();
  }, [courseCacheTimestamp, selectedCourse]);

  const updateModuleActivities = async (courseModules: ModuleDto[]) => {
    courseModules.forEach(async module => {
      if (module.id == null) { return; }
      module.activities = await getModuleActivities.makeAuthRequest(module.id) ?? [];
    });
  };

  const updateLeftMargin = (margin: number) => {
    setLeftMargin(margin);
  }; 

  const updateCourseCacheTimestamp = () => {
    setCourseCacheTimestamp(Date.now());
  };

  if (selectedCourse == null) { return <></>; }

  if (getCourseModules.pending || getModuleActivities.pending) {
    return <FullPageSpinner />;
  }

  return (
    <article className="min-h-screen-header bg-indigo-100">
      <DefaultToastMessage />
      <CourseSidebar course={selectedCourse}
        modules={modules}
        onOpen={updateLeftMargin} />
      <div style={{ marginLeft: `${leftMargin}px` }}
        className="px-8 py-16">
        <CourseArticle
          course={selectedCourse}
          updateCourseCacheTimestamp={updateCourseCacheTimestamp}
        />  
      </div>
    </article>
  );
};
