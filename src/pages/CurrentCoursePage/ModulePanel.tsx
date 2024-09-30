import { ReactElement } from "react";

import { H, IconContainer, P, TextColor } from "@/components";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import type { ActivityDto, ModuleDto } from "@/apiGenerated";
import { useCoursesPageContext } from "@/hooks";

interface Props {
  module: ModuleDto;
  open: boolean;
  toggleOpen: () => void;
}

export const ModulePanel: React.FC<Props> = ({
  module,
  open,
  toggleOpen
}): ReactElement => {
  const context = useCoursesPageContext();
  const isCurrentModule = module.id === context.selectedModule?.id;
  
  const handleSelectActivity = (
    activity: ActivityDto,
    e:  React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    context.updateSelectedActivity(activity);
    context.updateSelectedModule(module);
  };

  return (
    <article
      className={`border-b ${isCurrentModule && "bg-indigo-950"}
      cursor-pointer hover:bg-indigo-950 pb-1`}
      onClick={toggleOpen}>
      <div className="flex justify-between items-center p-4 overflow-hidden">
        <H size={4} className={`${isCurrentModule && "underline underline-offset-4"}`}>
          {module.name}
        </H>
        {!open
          ?<IconContainer
            className="text-white size-4 cursor-pointer"><FaChevronRight />
          </IconContainer>
          : <IconContainer
            className="text-white size-4 cursor-pointer"><FaChevronDown />
          </IconContainer>
        }
      </div>
      {open && module.activities != null && module.activities.map(activity => (
        <div key={activity.id}
          onClick={e => { handleSelectActivity(activity, e); }}
          className="flex justify-start items-start p-2 m-2 
          cursor-pointer">
          {activity.id !== context.selectedActivity?.id
            ? <P color={TextColor.MEDIUM_X} className="text-gray-400 hover:text-white">• {activity.description}</P> 
            : <P color={TextColor.LIGHT}> • {activity.description}</P> }
        </div>
      ))}
    </article>
  );
};
