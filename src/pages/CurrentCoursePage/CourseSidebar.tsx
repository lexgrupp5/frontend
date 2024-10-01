import { ReactElement, useEffect, useState } from "react";

import { ModuleDto, UserDto } from "@/apiGenerated";
import { Sidebar } from "@/components";
import { useAuthContext, useCoursesPageContext } from "@/hooks";
import { CourseSidebarFooter } from "./CourseSidebarFooter";
import { CourseSidebarBody } from "./CourseSidebarBody";
import { CourseSettings } from "./CourseSettings";

interface Props {
  modules: ModuleDto[];
  participants: UserDto[];
  onOpen: (margin: number) => void
  updateCacheTimestamp: () => void;
}

export const CourseSidebar: React.FC<Props> = ({
  modules,
  participants,
  onOpen,
  updateCacheTimestamp
}): ReactElement => {
  const sidebarWidth = 300;
  const isLargeScreen = window.innerWidth > 768;
  const [openSettings, setOpenSettings] = useState(false);
  const [open, setOpen] = useState(isLargeScreen);
  const context = useCoursesPageContext();
  const autContext = useAuthContext();
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({
    [`${context.selectedModule?.id}`]: true
  });

  const toggleModulePanelOpen = (id: string, module: ModuleDto) => {
    if (id.trim() === "") { return; }
    context.updateSelectedParticipant(null);
    context.updateSelectedActivity(null);
    context.updateSelectedModule(module);
    setOpenPanels(prevState => ({
      ...prevState,
      [id]: prevState[id] == null ? true : !prevState[id]
    }));
  };

  const toggleParticipantPanelOpen = (id: string) => {
    if (id.trim() === "") { return; }
    context.updateSelectedActivity(null);
    context.updateSelectedModule(null);
    setOpenPanels(prevState => ({
      ...prevState,
      [id]: prevState[id] == null ? true : !prevState[id]
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
    <Sidebar
      open={open}
      updateOpen={updateSidebarBody}
      width={sidebarWidth}
      footer={autContext.isTeacher() && <CourseSidebarFooter
        updateOpenSettings={(open: boolean) => { setOpenSettings(open); }} />}>
      <CourseSidebarBody
        modules={modules}
        participants={participants}
        openPanels={openPanels}
        toggleModulePanelOpen={toggleModulePanelOpen}
        toggleParticipantPanelOpen={toggleParticipantPanelOpen}
        updateCacheTimestamp={updateCacheTimestamp} />
      <CourseSettings 
        openSettings={openSettings}
        modules={modules}
        updateCacheTimestamp={updateCacheTimestamp}
        updateOpenSettings={(open: boolean) => { setOpenSettings(open); }} />
    </Sidebar>
  );
};
