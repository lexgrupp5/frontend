import { ReactElement } from "react";
import { MdAssignmentAdd } from "react-icons/md";

import { IconContainer, P, TextColor, UnstyledButton } from "@/components";
import { Path } from "@/constants";
import { SearchFilterInput } from "./SearchFilterInput";
import { useNavigateToPath } from "@/hooks";

export const CoursesController = (): ReactElement => {
  const navigate = useNavigateToPath();

  const navigateToSelectedCoursePage = () => {
    navigate(Path.constructSelectedCoursePath("new"));
  };

  return (
    <article className="flex flex-col-reverse pt-16 justify-center items-center
      gap-6 px-6
      sm:flex-row">
      <SearchFilterInput />
      <UnstyledButton
        className="display flex justify-center items-center
        w-full py-2 pl-4 pr-2 
        rounded-t-lg rounded-b-lg 
        bg-white
        sm:w-auto"
        onPress={navigateToSelectedCoursePage}>
        <P color={TextColor.DARK}>Create new course</P>
        <IconContainer className="size-10 p-2 border-none focus:outline-none">
          <MdAssignmentAdd />
        </IconContainer>
      </UnstyledButton>
    </article>
  );
};
