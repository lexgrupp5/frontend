import { ReactElement } from "react";

import { H, P, TextColor, DarkModal, Button } from "@/components";
import { ICourseDto } from "@/api";

interface Props {
  isOpen: boolean;
  course: ICourseDto;
  canSignUp: boolean,
  onClose: () => void;
}

export const CourseModal: React.FC<Props> = ({
  isOpen,
  course,
  canSignUp,
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
        {canSignUp && <div className="w-28 pt-12 m-auto">
          <Button onPress={onClose}>Sign up</Button>
        </div>}
      </div>
    </DarkModal>
  );
};
