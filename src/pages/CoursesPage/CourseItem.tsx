import { ReactElement } from "react";

import { H, P, TextColor } from "@/components";
import { ICourseDto } from "@/api";
import { useCoursesPageContext, useNavigateToPath } from "@/hooks";
import { Path } from "@/constants";

interface Props {
  course: ICourseDto;
}

export const CourseItem: React.FC<Props> = ({ course }): ReactElement => {
  const { updateSelectedCourse } = useCoursesPageContext();
  const navigate = useNavigateToPath();

  const navigateToSelectedCoursePage = () => {
    if (course.id == null) { return; }
    updateSelectedCourse(course);
    navigate(Path.constructSelectedCoursePath(course.id));
  };

  return (
    <>
      <article
        className="flex h-full flex-col justify-between
        bg-indigo-950 p-3
        rounded border-2 border-black
        outline-offset-2 hover:outline-3
        hover:outline hover:outline-gray-200 hover:bg-indigo-900
        cursor-pointer overflow-y-auto"
        onClick={navigateToSelectedCoursePage}>
        <H size={4}>{course.name}</H>
        <div>
          <P color={TextColor.MEDIUM}>Start: {course.startDate?.toDateString()}</P>
          <P color={TextColor.MEDIUM}>End: {course.endDate?.toDateString()}</P>
        </div>
      </article>
    </>
  );
};
