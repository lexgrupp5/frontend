
import { ReactElement } from "react";

import { H, IconContainer, P, TextColor } from "@/components";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import type { ActivityDto, ModuleDto } from "@/apiGenerated";

interface Props {
  module: ModuleDto;
  open: boolean;
  current: boolean;
  toggleOpen: () => void;
  selectActivity: (activity: ActivityDto, module: ModuleDto) => void;
}

export const ModulePanel: React.FC<Props> = ({
  module,
  open,
  current,
  toggleOpen,
  selectActivity
}): ReactElement => {
  const handleSelectActivity = (
    activity: ActivityDto,
    e:  React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    selectActivity(activity, module);
  };

  return (
    <article
      className={`border-b ${current && "bg-indigo-950"}
      cursor-pointer hover:bg-indigo-950 pb-1`}
      onClick={toggleOpen}>
      <div className="flex justify-between items-center p-4 overflow-hidden">
        <H size={4} className={`${open && "underline underline-offset-4"}`}>
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
          cursor-pointe">
          <P color={TextColor.MEDIUM}>• {activity.description}</P>
        </div>
      ))}
    </article>
  );
};
