import { ReactElement, useEffect, useState } from "react";

import type { ActivityDto, ICourseDto, ModuleDto } from "@/apiGenerated";
import { ModulePanel } from "./ModulePanel";
import { Sidebar } from "./Sidebar";

interface Props {
  course: ICourseDto;
  modules: ModuleDto[];
  onOpen: (margin: number) => void
  updateSelectedActivity: (activity: ActivityDto | null) => void;
  updateSelectedModule: (module: ModuleDto | null) => void;
}

export const CourseSidebar: React.FC<Props> = ({
  modules,
  onOpen,
  updateSelectedActivity,
  updateSelectedModule,
}): ReactElement => {
  const sidebarWidth = 300;
  const isLargeScreen = window.innerWidth > 768;
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState(isLargeScreen);

  const toggleModuleOpen = (module: ModuleDto) => {
    if (module.id == null) { return; }
    const moduleId = module.id;
    updateSelectedActivity(null);
    updateSelectedModule(module);
    setOpenPanels(prevState => ({
      ...prevState,
      [moduleId]: prevState[moduleId] == null ? true : !prevState[moduleId]
    }));
  };

  useEffect(() => {
    onOpen(isLargeScreen && open ? sidebarWidth : 0);
  }, [isLargeScreen, open, sidebarWidth]);

  const updateSidebarOpen = (open: boolean) => {
    setOpen(open);
  };

  const constructContent = () => {
    return (
      <>
        {modules.map(module => {
          if (module.id == null) { return <></>; }
          return <div key={module.id}>
            <ModulePanel
              module={module}
              open={openPanels[module.id]}
              toggleOpen={() => toggleModuleOpen(module)}
              selectActivity={updateSelectedActivity} />
          </div>;
        })}
      </>
    );
  };

  return (
    <Sidebar open={open}
      updateOpen={updateSidebarOpen}
      width={sidebarWidth}>
      {constructContent()}
    </Sidebar>
  );
};
