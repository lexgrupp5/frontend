import { ReactElement } from "react";

import { H, IconContainer, P, TextColor, UnstyledButton } from "@/components";
import { useCoursePageContext, useNavigateToPath } from "@/hooks";
import { FaChevronLeft } from "react-icons/fa6";
import { Path } from "@/constants";

export const SelectedCoursePage = (): ReactElement => {
  const { selectedCourse } = useCoursePageContext();
  const navigate = useNavigateToPath();

  if (selectedCourse == null) { return <></>; }

  return (
    <article className="w-full h-full px-4">
      <UnstyledButton onPress={() => { navigate(Path.COURSES); }}>
        <IconContainer className="p-2 size-9 text-gray-200
              rounded-full hover:bg-indigo-950">
          <FaChevronLeft />
        </IconContainer></UnstyledButton>
      <div className="p-8">
        <H size={4}>{selectedCourse.name}</H>
        <div>
          <P color={TextColor.MEDIUM}>Start: {selectedCourse.startDate?.toDateString()}</P>
          <P color={TextColor.MEDIUM}>End: {selectedCourse.endDate?.toDateString()}</P>
          <br />
          <P>{selectedCourse.description}</P>
        </div>
      </div>
    </article>
  );
};