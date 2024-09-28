import { ReactElement, useEffect, useRef, useState } from "react";

import { H, P, TextColor } from "@/components";
import { useApi, useCoursePageContext } from "@/hooks";
import { Sidebar } from "./Sidebar";
import { api, type ActivityDto, type ModuleDto } from "@/api";
import { ModulePanel } from "./ModulePanel";

export const CurrentCoursePage = (): ReactElement => {
  const sidebarWidth = 300;
  const isLargeScreen = window.innerWidth > 768;
  const modulesApi = useApi(api.course);
  const activitiesApi = useApi(api.activities);
  const { selectedCourse } = useCoursePageContext();
  const moduleSectionRef = useRef<HTMLDivElement>(null);
  const activitySectionRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(isLargeScreen);
  const [modules, setModules] = useState<ModuleDto[]>([]);
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});
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

  const updateSidebarOpen = (open: boolean) => {
    setSidebarOpen(open);
  };

  const toggleModuleOpen = (module: ModuleDto) => {
    if (module.id == null) { return; }
    const moduleId = module.id;
    setSelectedActivity(null);
    setSelectedModule(module);
    setOpenModules(prevState => ({
      ...prevState,
      [moduleId]: !prevState[moduleId]
    }));
    moduleSectionRef.current?.scrollIntoView({ behavior: "smooth"});
  };

  const updateSelectedActivity = (activity: ActivityDto) => {
    setSelectedActivity(activity);
    activitySectionRef.current?.scrollIntoView({ behavior: "smooth"});
  };

  const constructSidebar = () => {
    return (
      <>
        <div className="border-b p-4">
          <H size={4}>{selectedCourse?.name}</H>
        </div>
        {modules.map(module => {
          if (module.id == null) { return <></>; }
          return <div key={module.id}>
            <ModulePanel
              module={module}
              open={openModules[module.id]}
              toggleOpen={() => toggleModuleOpen(module)}
              selectActivity={updateSelectedActivity} />
          </div>;
        })}
      </>
    );
  };

  if (selectedCourse == null) { return <></>; }

  return (
    <article className="min-h-screen-header 
      bg-indigo-100">
      <Sidebar open={sidebarOpen}
        updateOpen={updateSidebarOpen}
        width={sidebarWidth}>
        {constructSidebar()}
      </Sidebar>
      <div style={{ marginLeft: `${sidebarOpen && isLargeScreen ? 300 : 0}px` }}
        className="p-16">
        <H size={2} color={TextColor.DARK_X}>Course: '{selectedCourse.name}'</H>
        <div>
          <P color={TextColor.DARK}>
            {selectedCourse.startDate?.toDateString()}{" - "}
            {selectedCourse.endDate?.toDateString()}</P>
          <br />
          <P color={TextColor.DARK}>{selectedCourse.description}</P>
        </div>
        {selectedModule != null && 
          <section ref={moduleSectionRef} className="pt-4">
            <H size={3} color={TextColor.DARK}>Module: {selectedModule.name}</H>
            <P color={TextColor.DARK}>
              {selectedModule.startDate?.toDateString()}{" - "}
              {selectedModule.endDate?.toDateString()}
            </P>
            <br />
            <P color={TextColor.DARK}>{selectedModule.description}</P>
          </section>  
        }
        {selectedActivity != null && 
          <section ref={activitySectionRef} className="pt-4">
            <H size={3} color={TextColor.DARK}>Activity {selectedActivity.id}</H>
            <P color={TextColor.DARK}>
              {selectedActivity.startDate?.toDateString()}{" - "}
              {selectedActivity.endDate?.toDateString()}
            </P>
            <br />
            <P color={TextColor.DARK}>{selectedActivity.description}</P>
          </section>  
        }
      </div>
    </article>
  );
};
