import { ReactElement } from "react";

import { H, IconContainer, P, TextColor, UnstyledButton } from "@/components";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import type { ActivityDto, ModuleDto } from "@/apiGenerated";
import { useCoursesPageContext } from "@/hooks";
import { MdAssignmentAdd } from "react-icons/md";

interface Props {
  module: ModuleDto;
  open: boolean;
  toggleOpen: (module: ModuleDto, withSelect: boolean) => void;
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
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    context.updateSelectedActivity(activity);
    context.updateSelectedModule(module);
  };

  return (
    <article
      className={`border-b ${isCurrentModule && "bg-indigo-950"}
      cursor-pointer hover:bg-indigo-950`}>
      <div
        className="flex justify-between items-center p-2 overflow-hidden"
        onClick={() => { toggleOpen(module, true); }}>
        <div>
          <H size={4} className={`${isCurrentModule &&
            "underline underline-offset-4"}
            hover:underline hover:underline-offset-4`}>
            {module.name}
          </H>
        </div>
        <div>
          <UnstyledButton onPress={() => { toggleOpen(module, false); }}>{!open
            ? <IconContainer
              className="text-white size-12 cursor-pointer 
              hover:bg-black p-4 rounded-full">
              <FaChevronRight />
            </IconContainer>
            : <IconContainer
              className="text-white size-12 cursor-pointer
              hover:bg-black p-4 rounded-full">
              <FaChevronDown />
            </IconContainer>
          }</UnstyledButton>
        </div>
      </div>
      {open && module.activities != null && module.activities.map(activity => (
        <div key={activity.id}
          onClick={e => { handleSelectActivity(activity, e); }}
          className="flex-shrink-0 flex justify-start items-start p-2 m-2 
          cursor-pointer">
          {activity.id !== context.selectedActivity?.id
            ? <P color={TextColor.MEDIUM_X} className="text-gray-400 hover:text-white">• {activity.description}</P>
            : <P color={TextColor.LIGHT}> • {activity.description}</P>}
        </div>
      ))}
      {open && module.activities != null && module.activities != null && <div>
        <UnstyledButton
          className="display flex justify-start items-center gap-2
          w-full py-2 pl-4 pr-2"
          onPress={() => {}}>
          <IconContainer
            className="text-gray-400 size-4 ">
            <MdAssignmentAdd />
          </IconContainer>
          <P color={TextColor.MEDIUM_X} className="hover:text-white">
            Create new module activty
          </P>
        </UnstyledButton>
      </div>}
    </article>
  );
};
