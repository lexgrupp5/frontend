
import { ReactElement } from "react";

import { H, IconContainer, P, TextColor } from "@/components";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import type { ActivityDto, ModuleDto } from "@/apiGenerated";
import { SidebarPanel } from "./SidebarPanel";

interface Props {
  module: ModuleDto;
  open: boolean;
  toggleOpen: () => void;
  selectActivity: (activity: ActivityDto) => void;
}

export const ModulePanel: React.FC<Props> = ({
  module,
  open,
  toggleOpen,
  selectActivity
}): ReactElement => {
  const handleSelectActivity = (
    activity: ActivityDto,
    e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    selectActivity(activity);
  };

  return (
    <SidebarPanel title={`${module.name}`} open={open} toggleOpen={toggleOpen}>
      {open && module.activities != null && module.activities.map(activity => (
        <div key={activity.id}
          onClick={e => { handleSelectActivity(activity, e); }}
          className="flex justify-start items-start p-2 m-2 
          cursor-pointe">
          <P color={TextColor.MEDIUM}>🚀 {activity.description}</P>
        </div>
      ))}
    </SidebarPanel>
  );
};
