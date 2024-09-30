import { ReactElement, useEffect, useState } from "react";

import type { ModuleDto } from "@/apiGenerated";
import { ModulePanel } from "./ModulePanel";
import { Sidebar } from "./Sidebar";
import { useCoursesPageContext } from "@/hooks";
import { IconContainer, P, UnstyledButton } from "@/components";
import { MdOutlineSettings } from "react-icons/md";
import { CreateModuleForm } from "./CreateModuleForm";

interface Props {
  modules: ModuleDto[];
  onOpen: (margin: number) => void
  updateCourseCacheTimestamp: () => void;
}

export const CourseSidebar: React.FC<Props> = ({
  modules,
  onOpen,
  updateCourseCacheTimestamp
}): ReactElement => {
  const sidebarWidth = 300;
  const isLargeScreen = window.innerWidth > 768;
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({});
  const [openSettings, setOpenSettings] = useState(false);
  const [open, setOpen] = useState(isLargeScreen);
  const context = useCoursesPageContext();

  const toggleModuleOpen = (module: ModuleDto, withSelect: boolean) => {
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

  const constructSidebarBody = () => {
    return (
      <>
        <div />
        {modules.map(module => {
          if (module.id == null) { return <></>; }
          return <div key={module.id}>
            <ModulePanel
              module={module}
              open={openPanels[module.id]}
              toggleOpen={toggleModuleOpen}/>
          </div>;
        })}
      </>
    );
  };

  const constructSidebarFooter = () => {
    return (
      <>
        <CreateModuleForm isOpen={openSettings}
          onClose={() => { setOpenSettings(false); }}
          updateCourseCacheTimestamp={updateCourseCacheTimestamp} />
        <UnstyledButton
          className="display flex justify-center items-center
          w-full h-full py-2 pl-4 pr-2"
          onPress={() => { setOpenSettings(true); }}>
          <P>Course settings</P>
          <IconContainer className="text-white size-10 p-2 border-none focus:outline-none">
            <MdOutlineSettings />
          </IconContainer>
        </UnstyledButton>
      </>
    );
  };

  return (
    <Sidebar open={open}
      updateOpen={updateSidebarBody}
      width={sidebarWidth}
      footer={constructSidebarFooter()}>
      {constructSidebarBody()}
    </Sidebar>
  );
};
