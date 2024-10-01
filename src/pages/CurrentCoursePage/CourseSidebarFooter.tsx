import { ReactElement } from "react";

import { IconContainer, P, UnstyledButton } from "@/components";
import { MdOutlineSettings } from "react-icons/md";

interface Props {
  updateOpenSettings: (open: boolean) => void;
}

export const CourseSidebarFooter: React.FC<Props> = ({
  updateOpenSettings
}): ReactElement => {
  return (
    <>
      <UnstyledButton
        className="display flex justify-center items-center
        w-full h-full py-2 pl-4 pr-2"
        onPress={() => { updateOpenSettings(true); }}>
        <P>Course settings</P>
        <IconContainer className="text-white size-10 p-2 border-none focus:outline-none">
          <MdOutlineSettings />
        </IconContainer>
      </UnstyledButton>
    </>
  );
};
