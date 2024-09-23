import { ReactElement, useState } from "react";
import { FaEdit } from "react-icons/fa";

import { H, P, TextColor, IconContainer, UnstyledButton } from "@/components";
import { ICourseDto } from "@/api";
import { useCoursePageContext, useNavigateToPath } from "@/hooks";
import { Path } from "@/constants";
import { CourseModal } from "./CourseModal";

interface Props {
  course: ICourseDto;
}

export const CourseItem: React.FC<Props> = ({ course }): ReactElement => {
  const isTeacher = true;
  const canSignUp = true;
  const [viewCourse, setViewCourse] = useState(false);
  const { updateSelectedCourse } = useCoursePageContext();
  const navigate = useNavigateToPath();

  const navigateToSelectedCoursePage = () => {
    if (course.id == null) { return; }
    updateSelectedCourse(course);
    navigate(Path.constructSelectedCoursePath(course.id));
  };

  return (
    <>
      {viewCourse && <CourseModal isOpen={viewCourse}
        course={course}
        canSignUp={canSignUp}
        onClose={() => { setViewCourse(false); }}/>}
      <article
        className="flex h-full flex-col justify-between
        bg-indigo-600 p-3
        rounded border-2 border-black
        outline-offset-2 hover:outline-3
        hover:outline hover:outline-indigo-50
        cursor-pointer overflow-y-auto"
        onClick={() => { setViewCourse(true); }}>
        <H size={4}>{course.name}</H>
        <div className="w-full flex justify-between items-end">
          <div>
            <P color={TextColor.MEDIUM}>Start: {course.startDate?.toDateString()}</P>
            <P color={TextColor.MEDIUM}>End: {course.endDate?.toDateString()}</P>
          </div>
          {isTeacher && <UnstyledButton onPress={navigateToSelectedCoursePage}> 
            <IconContainer className="flex items-center justify-center
              p-2 size-9 text-gray-200
              rounded-full hover:bg-indigo-950">
              <FaEdit />
            </IconContainer></UnstyledButton>}
        </div>
      </article>
    </>
  );
};
