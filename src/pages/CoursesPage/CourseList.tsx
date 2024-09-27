import { ReactElement } from "react";

import { CourseItem } from "./CourseItem";
import { P } from "@/components";
import { ICourseDto } from "@/apiGenerated";

interface Props {
  courses: ICourseDto[];
}

export const CourseList: React.FC<Props> = ({
  courses
}): ReactElement => {
  return (
    <article className="flex flex-wrap p-4 max-w-7xl m-auto">
      {courses.length === 0 && <div className="w-full flex justify-center p-8">
        <P>No courses were found!</P>
      </div>}
      {courses.length !== 0 &&
        courses.map((course) => (
          <div key={course.id}
            className="w-full sm:p-2 sm:w-1/2 lg:w-1/3 mb-6 h-[160px]">
            <CourseItem course={course} />
          </div>
        ))}
    </article>
  );
};
