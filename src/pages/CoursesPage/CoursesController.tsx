import { ReactElement } from "react";
import { MdAssignmentAdd } from "react-icons/md";

import { IconContainer, P, TextColor, UnstyledButton } from "@/components";
import { Path } from "@/constants";
import { SearchFilterInput } from "./SearchFilterInput";
import { useAuthContext, useNavigateToPath } from "@/hooks";

export const CoursesController = (): ReactElement => {
  const authContext = useAuthContext();
  const navigate = useNavigateToPath();

  const navigateToSelectedCoursePage = () => {
    navigate(Path.COURSES_NEW);
  };

  return (
    <article className="flex flex-col-reverse justify-center items-center
      pt-4 pb-12 gap-6 px-6 flex-grow
      sm:flex-row">
      <div className="rounded-lg outline-offset-2 outline-gray-300
        hover:outline w-full sm:w-auto">
        <SearchFilterInput />
      </div>
      {authContext.isTeacher() && <div
        className="rounded-lg outline-offset-2 outline-gray-300
        hover:outline w-full sm:w-auto">  
        <UnstyledButton
          className="flex justify-center items-center
          bg-white py-2 pl-4 pr-2 
          rounded-t-lg rounded-b-lg
          w-full"
          onPress={navigateToSelectedCoursePage}>
          <P color={TextColor.DARK}>Create new course</P>
          <IconContainer className="size-10 p-2 border-none focus:outline-none">
            <MdAssignmentAdd />
          </IconContainer>
        </UnstyledButton>
      </div>}
    </article>
  );
};
