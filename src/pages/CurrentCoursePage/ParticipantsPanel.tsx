import { ReactElement } from "react";

import { H, IconContainer, P, TextColor, UnstyledButton } from "@/components";
import { FaChevronDown, FaChevronRight, FaUserGraduate, FaUserPlus } from "react-icons/fa";
import type { UserDto } from "@/apiGenerated";
import { useAuthContext, useCurrentCourseContext } from "@/hooks";

interface Props {
  participants: UserDto[];
  panelId: string;
  open: boolean;
  toggleOpen: (id: string, withSelect?: boolean) => void;
  openCreateParticipant: () => void;
}

export const ParticipantsPanel: React.FC<Props> = ({
  participants,
  open,
  panelId,
  toggleOpen,
  openCreateParticipant
}): ReactElement => {
  const context = useCurrentCourseContext();
  const authContext = useAuthContext();
  const isCurrent = context.selectedParticipant != null;

  const handleSelectParticipant = (
    participant: UserDto,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    context.updateSelectedActivity(null);
    context.updateSelectedModule(null);
    context.updateSelectedParticipant(participant);
  };

  return (
    <article
      className={`border-b border-b-black
        ${isCurrent && "bg-indigo-950"}
        cursor-pointer hover:bg-indigo-950`}>
      <div
        className="flex justify-between items-center p-2 overflow-hidden"
        onClick={() => { toggleOpen(panelId); }}>
        <div>
          <H size={4} className={`${context.selectedParticipant != null &&
            "underline underline-offset-4"}`}>
            Participants
          </H>
        </div>
        <div>
          <UnstyledButton onPress={() => { toggleOpen(panelId, false); }}>{!open
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
      {open && participants.map(participant => (
        <div key={participant.username}
          onClick={e => { handleSelectParticipant(participant, e); }}
          className="flex-shrink-0 flex justify-start
          items-center gap-2 p-2 m-2 
          cursor-pointer
          group">
          {participant.username !== context.selectedParticipant?.username
            ? <>
              <IconContainer
                className="flex-shrink-0 text-gray-400 size-4 group-hover:text-white">
                <FaUserGraduate />
              </IconContainer>
              <P color={TextColor.MEDIUM_X} className="text-gray-400 group-hover:text-white">
                {participant.username}
              </P>
            </> 
            : <>
              <IconContainer
                className="flex-shrink-0 text-white size-4 group-hover:text-white">
                <FaUserGraduate />
              </IconContainer>
              <P color={TextColor.LIGHT}> {participant.username}</P>
            </>}
        </div>
      ))}
      {authContext.isTeacher() && open && <div>
        <UnstyledButton
          className="display flex justify-start items-center gap-2
          w-full p-2 m-2
          group"
          onPress={openCreateParticipant}>
          <IconContainer
            className="flex-shrink-0 text-gray-400 size-4 group-hover:text-white">
            <FaUserPlus />
          </IconContainer>
          <P color={TextColor.MEDIUM_X} className="group-hover:text-white">
            Add new participant
          </P>
        </UnstyledButton>
      </div>}
    </article>
  );
};
