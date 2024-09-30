import { ReactElement, useEffect, useState } from "react";

import type { ICourseDto, ModuleDto } from "@/apiGenerated";
import { ModulePanel } from "./ModulePanel";
import { Sidebar } from "./Sidebar";
import { useCoursesPageContext } from "@/hooks";

interface Props {
  course: ICourseDto;
  modules: ModuleDto[];
  onOpen: (margin: number) => void
}

export const CourseSidebar: React.FC<Props> = ({
  modules,
  onOpen
}): ReactElement => {
  const sidebarWidth = 300;
  const isLargeScreen = window.innerWidth > 768;
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState(isLargeScreen);
  const context = useCoursesPageContext();

  const toggleModuleOpen = (module: ModuleDto) => {
    if (module.id == null) { return; }
    const moduleId = module.id;
    context.updateSelectedActivity(null);
    context.updateSelectedModule(module);
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
        <div className="border-b" />
        {modules.map(module => {
          if (module.id == null) { return <></>; }
          return <div key={module.id}>
            <ModulePanel
              module={module}
              open={openPanels[module.id]}
              toggleOpen={() => toggleModuleOpen(module)} />
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
