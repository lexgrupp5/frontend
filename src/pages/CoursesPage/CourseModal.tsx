import { ReactElement } from "react";

import { H, P, TextColor, DarkModal } from "@/components";
import { ICourseDto } from "@/api";

interface Props {
  isOpen: boolean;
  course: ICourseDto;
  onClose: () => void;
}

export const CourseModal: React.FC<Props> = ({
  isOpen,
  course,
  onClose
}): ReactElement => {

  return (
    <DarkModal
      isOpen={isOpen}
      onClose={onClose}>
      <H size={4}>{course.name}</H>
      <div>
        <P color={TextColor.MEDIUM}>Start: {course.startDate?.toDateString()}</P>
        <P color={TextColor.MEDIUM}>End: {course.endDate?.toDateString()}</P>
        <br />
        <P>{course.description}</P>
      </div>
    </DarkModal>
  );
};
