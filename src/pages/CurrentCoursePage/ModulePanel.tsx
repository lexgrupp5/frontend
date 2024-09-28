import { ReactElement } from "react";

import { H, IconContainer, P, TextColor } from "@/components";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { type ModuleDto } from "@/apiGenerated";

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
  return (
    <article key={module.id}
      className={`border-t  ${open && "bg-indigo-950"}
      cursor-pointer hover:bg-indigo-950 pb-1`}
      onClick={toggleOpen}>
      <div className="flex justify-between items-center p-4 overflow-hidden">
        <H size={4}>{module.name}</H>
        {!open
          ?
          <IconContainer
            className="text-white size-4 cursor-pointer"><FaChevronRight />
          </IconContainer>
          : <IconContainer
            className="text-white size-4 cursor-pointer"><FaChevronDown />
          </IconContainer>
        }
      </div>
      {open && module.activities != null && module.activities.map(activity => (
        <div key={activity.id}
          className="flex justify-start items-start p-2 m-2 
          cursor-pointe">
          <P color={TextColor.MEDIUM}>🚀 {activity.description}</P>
        </div>
      ))}
    </article>
  );
};
