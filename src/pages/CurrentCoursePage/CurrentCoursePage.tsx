import { ReactElement, useEffect, useRef, useState } from "react";

import { useApi, useCoursePageContext } from "@/hooks";
import { api, type ActivityDto, type ModuleDto } from "@/api";
import { CourseSidebar } from "./CourseSidebar";
import { CourseArticle } from "./CourseArticle";

export const CurrentCoursePage = (): ReactElement => {
  const modulesApi = useApi(api.course);
  const activitiesApi = useApi(api.activities);
  const { selectedCourse } = useCoursePageContext();
  const courseSection = useRef<HTMLDivElement>(null);
  const moduleSection = useRef<HTMLDivElement>(null);
  const activitySection = useRef<HTMLDivElement>(null);
  const [ leftMargin, setLeftMargin ] = useState(0);
  const [modules, setModules] = useState<ModuleDto[]>([]);
  const [selectedModule, setSelectedModule] = useState<ModuleDto | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityDto | null>(null);

  useEffect(() => {
    (async () => {
      if (selectedCourse?.id == null) { return; }
      const courseModules = await modulesApi.makeAuthRequest(selectedCourse.id);
      if (courseModules == null) { return; }
      updateModuleActivities(courseModules);
      setModules(courseModules);
    })();
  }, []);

  const updateModuleActivities = async (courseModules: ModuleDto[]) => {
    courseModules.forEach(async module => {
      if (module.id == null) { return; }
      module.activities = await activitiesApi.makeAuthRequest(module.id) ?? [];
    });
  };

  const updateSelectedActivity = (activity: ActivityDto | null) => {
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

  return (
    <article className="min-h-screen-header bg-indigo-100">
      <CourseSidebar course={selectedCourse}
        modules={modules}
        onOpen={updateLeftMargin}
        updateSelectedActivity={updateSelectedActivity}
        updateSelectedModule={updateSelectedModule} />
      <div style={{ marginLeft: `${leftMargin}px` }}
        className="px-8 py-16">
        <CourseArticle
          courseArticle={{ courseSection, moduleSection, activitySection }}
          selectedCourse={selectedCourse}
          selectedModule={selectedModule}
          selectedActivity={selectedActivity}          
        />  
      </div>
    </article>
  );
};
