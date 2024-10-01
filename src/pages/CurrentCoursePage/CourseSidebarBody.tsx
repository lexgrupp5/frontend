
import { ReactElement, useState } from "react";

import { ModuleDto, UserDto } from "@/apiGenerated";
import { ModulePanel } from "./ModulePanel";
import { CourseModal } from "./CourseModal";
import { CreateActivityForm } from "./CreateActivityForm";
import { useCoursesPageContext } from "@/hooks";
import { ParticipantsPanel } from "./ParticipantsPanel";

interface Props {
  modules: ModuleDto[];
  openPanels:  Record<string, boolean>;
  participants: UserDto[];
  toggleModulePanelOpen: (id: string, module: ModuleDto) => void;
  toggleParticipantPanelOpen: (id: string) => void;
  updateCacheTimestamp: () => void;
}

export const CourseSidebarBody: React.FC<Props> = ({
  modules,
  openPanels,
  participants,
  toggleModulePanelOpen,
  toggleParticipantPanelOpen,
  updateCacheTimestamp
}): ReactElement => {
  const [createActivity, setCreateActivity] = useState(false);
  const { selectedModule, selectedCourse } = useCoursesPageContext();
  const participantPanelId = "partcipantsPanel";
  
  return (
    <>
      <div />
      {<CourseModal
        isOpen={createActivity}
        onClose={() => { setCreateActivity(false); updateCacheTimestamp(); }}>
        <CreateActivityForm title={`Create activity
        ${selectedModule?.name ? `for ${selectedModule?.name}` : ""}
        in course '${selectedCourse?.name}'`}/>
      </CourseModal>}
      <ParticipantsPanel
        participants={participants}
        panelId={participantPanelId}
        open={openPanels[participantPanelId]}
        toggleOpen={toggleParticipantPanelOpen}
        openCreateParticipant={() => {  }} />
      {modules.map(module => {
        if (module.id == null) { return <></>; }
        return <div key={module.id}>
          <ModulePanel
            module={module}
            open={openPanels[module.id]}
            toggleOpen={toggleModulePanelOpen}
            openCreateActivity={() => { setCreateActivity(true); }} />
        </div>;
      })}
    </>
  );
};