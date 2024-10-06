import { ReactElement } from "react";

import { H, P, TextColor } from "@/components";
import { ICourseDto } from "@/api";
import { useCurrentCourseContext, useNavigateToPath } from "@/hooks";
import { Path } from "@/constants";
import { DateStateMarker } from "./DateStateMarker";

interface Props {
  course: ICourseDto;
}

export const CourseItem: React.FC<Props> = ({ course }): ReactElement => {
  const { updateSelectedCourse } = useCurrentCourseContext();
  const navigate = useNavigateToPath();
  const dateNow = new Date();

  const navigateToSelectedCoursePage = () => {
    if (course.id == null) { return; }
    updateSelectedCourse(course);
    navigate(Path.constructSelectedCoursePath(course.id));
  };

  return (
    <>
      <article
        className="flex h-full flex-col justify-between
        bg-indigo-950
        rounded border-2 border-black
        outline-offset-2 hover:outline-3
        hover:outline hover:outline-gray-200 hover:bg-indigo-900
        cursor-pointer overflow-y-auto
        custom-scrollbar"
        onClick={navigateToSelectedCoursePage}>
        <H size={4} className="p-2 flex-shrink-0">{course.name}</H>
        <div>
          <div className="p-2">
            <P color={TextColor.MEDIUM}>
              Start: {course.startDate?.toDateString()}
            </P>
            <P color={TextColor.MEDIUM}>
              End: {course.endDate?.toDateString()}
            </P>
          </div>
          <DateStateMarker startDate={course.startDate} endDate={course.endDate} />
        </div>
      </article>
    </>
  );
};
