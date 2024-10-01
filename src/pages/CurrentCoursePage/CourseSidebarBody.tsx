
import { ReactElement, useState } from "react";

import { ModuleDto } from "@/apiGenerated";
import { ModulePanel } from "./ModulePanel";
import { CourseModal } from "./CourseModal";
import { CreateActivityForm } from "./CreateActivityForm";
import { useCoursesPageContext } from "@/hooks";

interface Props {
  modules: ModuleDto[];
  openPanels:  Record<string, boolean>;
  togglePanelOpen: (module: ModuleDto, withSelect: boolean) => void;
  updateCacheTimestamp: () => void;
}

export const CourseSidebarBody: React.FC<Props> = ({
  modules,
  openPanels,
  togglePanelOpen,
  updateCacheTimestamp
}): ReactElement => {
  const [createActivity, setCreateActivity] = useState(false);
  const { selectedModule, selectedCourse } = useCoursesPageContext();
  
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
      {modules.map(module => {
        if (module.id == null) { return <></>; }
        return <div key={module.id}>
          <ModulePanel
            module={module}
            open={openPanels[module.id]}
            toggleOpen={togglePanelOpen}
            openCreateActivity={() => { setCreateActivity(true); }} />
        </div>;
      })}
    </>
  );
};