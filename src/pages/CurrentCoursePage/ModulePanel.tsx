import { ReactElement } from "react";

import { H, IconContainer, P, TextColor, UnstyledButton } from "@/components";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import type { ActivityDto, ModuleDto } from "@/apiGenerated";
import { useAuthContext, useCurrentCourseContext } from "@/hooks";
import { MdAssignmentAdd, MdSchool } from "react-icons/md";

interface Props {
  module: ModuleDto;
  open: boolean;
  toggleOpen: (id: string, module: ModuleDto, withSelect?: boolean) => void;
  openCreateActivity: () => void;
}

export const ModulePanel: React.FC<Props> = ({
  module,
  open,
  toggleOpen,
  openCreateActivity
}): ReactElement => {
  const context = useCurrentCourseContext();
  const authContext = useAuthContext();
  const isCurrentModule = module.id === context.selectedModule?.id;

  const handleSelectActivity = (
    activity: ActivityDto,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    context.updateSelectedParticipant(null);
    context.updateSelectedActivity(activity);
    context.updateSelectedModule(module);
  };

  return (
    <article
      className={`border-b border-b-black
      ${isCurrentModule && "bg-indigo-950"}
      cursor-pointer hover:bg-indigo-950`}>
      <div
        className="flex justify-between items-center p-2 overflow-hidden"
        onClick={() => { toggleOpen(`${module?.id ?? ""}`, module); }}>
        <div>
          <H size={4} className={`${isCurrentModule &&
            "underline underline-offset-4"}`}>
            {module.name}
          </H>
        </div>
        <div>
          <UnstyledButton
            onPress={() => { toggleOpen(`${module?.id ?? ""}`, module, false); }}>
            {!open
              ? <IconContainer
                className="text-white size-10 cursor-pointer 
              hover:bg-indigo-500 p-3 rounded-full">
                <FaChevronRight />
              </IconContainer>
              : <IconContainer
                className="text-white size-10 cursor-pointer
              hover:bg-indigo-500 p-3 rounded-full">
                <FaChevronDown />
              </IconContainer>
            }</UnstyledButton>
        </div>
      </div>
      {open && module.activities != null && module.activities.map(activity => (
        <div key={activity.id}
          onClick={e => { handleSelectActivity(activity, e); }}
          className="flex-shrink-0 flex justify-start
          items-center gap-2 p-2 m-2 
          cursor-pointer
          group">
          {activity.id !== context.selectedActivity?.id
            ? <>
              <IconContainer
                className="flex-shrink-0 text-gray-400 size-4 group-hover:text-white">
                <MdSchool />
              </IconContainer>
              <P color={TextColor.MEDIUM_X} className="text-gray-400 group-hover:text-white">
                {activity.activityTypeName}
              </P>
            </>
            : <>
              <IconContainer
                className="flex-shrink-0 text-white size-4 group-hover:text-white">
                <MdSchool />
              </IconContainer>
              <P color={TextColor.LIGHT}> {activity.activityTypeName}</P>
            </>}
        </div>
      ))}
      {authContext.isTeacher() && open && module.activities != null && <div>
        <UnstyledButton
          className="display flex justify-start items-center gap-2
          w-full p-2 m-2
          group"
          onPress={openCreateActivity}>
          <IconContainer
            className="flex-shrink-0 text-gray-400 size-4 group-hover:text-white">
            <MdAssignmentAdd />
          </IconContainer>
          <P color={TextColor.MEDIUM_X} className="group-hover:text-white">
            Create activty
          </P>
        </UnstyledButton>
      </div>}
    </article>
  );
};
