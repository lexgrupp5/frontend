import { ReactElement, useEffect, useState } from "react";

import type { ModuleDto } from "@/apiGenerated";
import { Sidebar } from "./Sidebar";
import { useCoursesPageContext } from "@/hooks";
import { CourseSidebarFooter } from "./CourseSidebarFooter";
import { CourseSidebarBody } from "./CourseSidebarBody";

interface Props {
  modules: ModuleDto[];
  onOpen: (margin: number) => void
  updateCacheTimestamp: () => void;
}

export const CourseSidebar: React.FC<Props> = ({
  modules,
  onOpen,
  updateCacheTimestamp
}): ReactElement => {
  const sidebarWidth = 300;
  const isLargeScreen = window.innerWidth > 768;
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({});
  const [openSettings, setOpenSettings] = useState(false);
  const [open, setOpen] = useState(isLargeScreen);
  const context = useCoursesPageContext();

  const togglePanelOpen = (module: ModuleDto, withSelect: boolean) => {
    if (module.id == null) { return; }
    const moduleId = module.id;
    if (withSelect) {
      context.updateSelectedActivity(null);
      context.updateSelectedModule(module);
    }
    setOpenPanels(prevState => ({
      ...prevState,
      [moduleId]: prevState[moduleId] == null ? true : !prevState[moduleId]
    }));
  };

  useEffect(() => {
    onOpen(isLargeScreen && open ? sidebarWidth : 0);
  }, [isLargeScreen, open, sidebarWidth]);

  useEffect(() => {
    const handleRezise = () => {
      setOpen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleRezise);
    return () => { window.removeEventListener("resize", handleRezise); };
  }, []);

  const updateSidebarBody = (open: boolean) => {
    setOpen(open);
  };

  return (
    <Sidebar open={open}
      updateOpen={updateSidebarBody}
      width={sidebarWidth}
      footer={<CourseSidebarFooter 
        openSettings={openSettings}
        updateCacheTimestamp={updateCacheTimestamp}
        updateOpenSettings={(open: boolean) => { setOpenSettings(open); }} />}>
      <CourseSidebarBody modules={modules}
        openPanels={openPanels}
        togglePanelOpen={togglePanelOpen}
        updateCacheTimestamp={updateCacheTimestamp} />
    </Sidebar>
  );
};
