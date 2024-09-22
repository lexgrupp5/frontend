import { ReactElement } from "react";

import { CourseItem } from "./CourseItem";
import { Input } from "@/components";
import { FaSearch } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import { ICourseDto } from "@/api";

interface Props {
  courses: ICourseDto[]
}

export const CourseList: React.FC<Props> = ({
  courses
}): ReactElement => {
  if (courses.length === 0) { return <></>; }

  return (
    <article>
      <article className="flex flex-col gap-4 px-4 mt-16
        w-full sm:px-8 md:flex-row md:justify-center">
        <Input icon={<FaSearch />} onPressIcon={() => {}}></Input>
        <Input icon={<MdFilterList />} onPressIcon={() => {}}></Input>
      </article>
      <article className="flex flex-wrap p-4 max-w-7xl">
        {courses.length !== 0 &&
          courses.map((course) => (
            <div key={course.id}
              className="w-full sm:p-2 sm:w-1/2 lg:w-1/3 mb-6 h-[160px]">
              <CourseItem course={course} />
            </div>
          ))}
      </article>
    </article>
  );
};
