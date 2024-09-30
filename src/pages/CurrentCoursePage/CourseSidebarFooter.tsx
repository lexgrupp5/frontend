import { ReactElement, useState } from "react";

import { H, IconContainer, P, TextColor, UnstyledButton } from "@/components";
import { MdOutlineSettings } from "react-icons/md";
import { CreateModuleForm } from "./CreateModuleForm";
import { CourseModal } from "./CourseModal";
import { CreateActivityForm } from "./CreateActivityForm";
import { useCoursesPageContext } from "@/hooks";

const settingLink = {
  CREATE_MODULE: "create-module",
  CREATE_ACTIVITY: "create-activity"
} as const;

type SettinLinkType = typeof settingLink[
  keyof typeof settingLink
]

interface Props {
  openSettings: boolean;
  hasModules: boolean;
  updateCacheTimestamp: () => void;
  updateOpenSettings: (open: boolean) => void;
}

export const CourseSidebarFooter: React.FC<Props> = ({
  openSettings,
  hasModules,
  updateOpenSettings,
  updateCacheTimestamp  
}): ReactElement => {
  const [link, setLink] = useState<SettinLinkType>(settingLink.CREATE_MODULE);

  const FormLink: React.FC<{ label: string, settingLink: SettinLinkType }> = ({
    label, settingLink
  }): ReactElement => {
    return (
      <UnstyledButton
        onPress={() => { setLink(settingLink); }}>
        <H size={3} color={TextColor.DARK}
          className={`cursor-pointer hover:underline hover:underline-offset-4
          ${link === settingLink && "underline underline-offset-4"}`}>
          {label}
        </H>
      </UnstyledButton>
    );
  };

  return (
    <>
      <CourseModal isOpen={openSettings}
        onClose={() => { updateOpenSettings(false); updateCacheTimestamp(); }}>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex justify-center gap-4">
            <FormLink label="Create new module" settingLink={settingLink.CREATE_MODULE}/>
            {hasModules && <FormLink label="Create new activity" settingLink={settingLink.CREATE_ACTIVITY}/>}
          </div>
          {link === settingLink.CREATE_MODULE && <CreateModuleForm />}
          {link === settingLink.CREATE_ACTIVITY && <CreateActivityForm />}
        </div>    
      </CourseModal>
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
