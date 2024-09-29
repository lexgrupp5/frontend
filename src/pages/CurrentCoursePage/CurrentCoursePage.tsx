import { ReactElement, useEffect, useRef, useState } from "react";

import { useApi, useCoursesPageContext, useMessageContext } from "@/hooks";
import { api, type ActivityDto, type ModuleDto } from "@/api";
import { CourseSidebar } from "./CourseSidebar";
import { CourseArticle } from "./CourseArticle";
import { FullPageSpinner } from "@/components";
import { DefaultToastMessage } from "../SharedComponents";

export const CurrentCoursePage = (): ReactElement => {
  const modulesApi = useApi(api.course);
  const activitiesApi = useApi(api.activities);
  const { selectedCourse } = useCoursesPageContext();
  const courseSection = useRef<HTMLDivElement>(null);
  const moduleSection = useRef<HTMLDivElement>(null);
  const activitySection = useRef<HTMLDivElement>(null);
  const [leftMargin, setLeftMargin ] = useState(0);
  const [modules, setModules] = useState<ModuleDto[]>([]);
  const [selectedModule, setSelectedModule] = useState<ModuleDto | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityDto | null>(null);
  const msgContext = useMessageContext();

  useEffect(() => {
    (async () => {
      await fetchCourseData();
    })();
  }, []);

  const fetchCourseData = async () => {
    if (selectedCourse?.id == null) { return; }
    const [err, result] = await modulesApi.makeAuthRequestWithErrorResponse(selectedCourse.id);
    if (err != null || result == null) {
      msgContext.updateErrorMessage("Course data could not be fetched");
    } else {
      await updateModuleActivities(result);
      setModules(result);
    }
  };

  const updateModuleActivities = async (courseModules: ModuleDto[]) => {
    courseModules.forEach(async module => {
      if (module.id == null) { return; }
      module.activities = await activitiesApi.makeAuthRequest(module.id) ?? [];
    });
  };

  const updateSelectedActivity = (
    activity: ActivityDto | null,
    module: ModuleDto | null
  ) => {
    setSelectedModule(module);
    setSelectedActivity(activity);
    activitySection.current?.scrollIntoView({ behavior: "smooth" });
  };

  const updateSelectedModule = (module: ModuleDto | null) => {
    setSelectedModule(module);
    moduleSection.current?.scrollIntoView({ behavior: "smooth" });
  };

  const updateLeftMargin = (margin: number) => {
    setLeftMargin(margin);
  }; 

  if (selectedCourse == null) { return <></>; }

  if (modulesApi.pending || activitiesApi.pending) {
    return <FullPageSpinner />;
  }

  return (
    <article className="min-h-screen-header bg-indigo-100">
      <DefaultToastMessage />
      <CourseSidebar course={selectedCourse}
        modules={modules}
        currentModule={selectedModule}
        onOpen={updateLeftMargin}
        updateSelectedActivity={updateSelectedActivity}
        updateSelectedModule={updateSelectedModule} />
      <div style={{ marginLeft: `${leftMargin}px` }}
        className="px-8 py-16">
        <CourseArticle
          courseArticle={{ courseSection, moduleSection, activitySection }}
          course={selectedCourse}
          module={selectedModule}
          activity={selectedActivity}
        />  
      </div>
    </article>
  );
};
