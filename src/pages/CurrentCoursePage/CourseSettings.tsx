import { ReactElement, useState } from "react";

import { CreateModuleForm } from "./CreateModuleForm";
import { CourseModal } from "./CourseModal";
import { CreateActivityForm } from "./CreateActivityForm";
import { H, TextColor, UnstyledButton } from "@/components";
import { ModuleDto } from "@/apiGenerated";
import { useCoursesPageContext } from "@/hooks";

const linkContants = {
  CREATE_MODULE: "create-module",
  CREATE_ACTIVITY: "create-activity"
} as const;

type SettinLinkType = typeof linkContants[
  keyof typeof linkContants
]

interface Props {
  openSettings: boolean;
  modules: ModuleDto[];
  updateCacheTimestamp: () => void;
  updateOpenSettings: (open: boolean) => void;
}

export const CourseSettings: React.FC<Props> = ({
  openSettings,
  modules,
  updateOpenSettings,
  updateCacheTimestamp
}): ReactElement => {
  const [link, setLink] = useState<SettinLinkType>(linkContants.CREATE_MODULE);
  const [hasModules, setHasModules] = useState(modules?.length > 0);
  const context = useCoursesPageContext();

  const FormLink: React.FC<{ label: string, aLink: SettinLinkType }> = ({
    label, aLink
  }): ReactElement => {
    return (
      <>
        {!hasModules && aLink === linkContants.CREATE_ACTIVITY ?
          <UnstyledButton
            onPress={() => { }}>
            <H size={4} color={TextColor.MEDIUM_X}>
              {label}
            </H>
          </UnstyledButton>
          : <UnstyledButton
            onPress={() => { setLink(aLink); }}>
            <H size={3} color={TextColor.DARK}
              className={`cursor-pointer hover:underline hover:underline-offset-4
                ${link === aLink && "underline underline-offset-4"}`
              }>
              {label}
            </H>
          </UnstyledButton>}
      </>
    );
  };

  return (
    <CourseModal isOpen={openSettings}
      onClose={() => { updateOpenSettings(false); updateCacheTimestamp(); }}>
      <div className="flex flex-col gap-4 items-center">
        <H size={2} color={TextColor.DARK_X}>Settings course {context.selectedCourse?.name}</H>
        <div className="flex justify-center gap-4">
          <FormLink label="Create new module" aLink={linkContants.CREATE_MODULE} />
          <FormLink label="Create new activity" aLink={linkContants.CREATE_ACTIVITY} />
        </div>
        {link === linkContants.CREATE_MODULE && <CreateModuleForm
          hasModules={hasModules => { setHasModules(hasModules); }} />}
        {link === linkContants.CREATE_ACTIVITY && <CreateActivityForm />}
      </div>
    </CourseModal>
  );
};