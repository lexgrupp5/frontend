import { H, P } from "@/components";
import { CourseDto } from "@/dtos";
import { ReactElement } from "react";

interface Props {
  course: CourseDto
}

export const CourseItem: React.FC<Props> = ({
  course
}): ReactElement => {
  return  (
    <div className="bg-indigo-600 h-full
      p-4 border rounded shadow-md
      flex flex-col">
      <H size={2}>{course.name}</H>
      <div className="flex-grow overflow-y-auto">
        <P>{course.description}</P>
      </div>
    </div>
  );
};
