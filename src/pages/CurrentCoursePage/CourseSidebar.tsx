import { ReactElement, useEffect, useState } from "react";

import { ModuleDto, UserDto } from "@/apiGenerated";
import { Sidebar } from "@/components";
import { useAuthContext, useCurrentCourseContext } from "@/hooks";
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
  const context = useCurrentCourseContext();
  const autContext = useAuthContext();
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({
    [`${context.selectedModule?.id}`]: true
  });

  const updateOpenPanels = (id: string) => {
    setOpenPanels(prevState => ({
      ...prevState,
      [id]: prevState[id] == null ? true : !prevState[id]
    }));
  };

  const toggleModulePanelOpen = (
    id: string,
    module: ModuleDto,
    withSelect: boolean = true
  ) => {
    if (id.trim() === "") { return; }
    if (withSelect) {
      context.updateSelectedParticipant(null);
      context.updateSelectedActivity(null);
      context.updateSelectedModule(module);

      const isOpenButNotSelected = openPanels[id] && module.id != context.selectedModule?.id;
      if (isOpenButNotSelected) {
        return;
      }
  
      const isClosedAndSelected = !openPanels[id] && module.id == context.selectedModule?.id;
      if (isClosedAndSelected) {
        context.updateSelectedModule(null);
        return;
      }
  
      const isOpenAndSelected = openPanels[id] && module.id == context.selectedModule?.id;
      if (isOpenAndSelected) {
        context.updateSelectedModule(null);
      }
    }

    updateOpenPanels(id);
  };

  const toggleParticipantPanelOpen = (
    id: string,
    withSelect: boolean = true
  ) => {
    if (id.trim() === "") { return; }
    context.updateSelectedActivity(null);
    context.updateSelectedModule(null);

    if (withSelect) {
      context.updateSelectedParticipant(null);

      const isClosedAndSelected = !openPanels[id] && context.selectedParticipant != null;
      if (isClosedAndSelected) {
        return;
      }
    }
    updateOpenPanels(id);
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
