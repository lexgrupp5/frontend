import { ReactElement } from "react";
import { MdFilterList, MdLibraryAdd } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

import { CourseItem } from "./CourseItem";
import { IconContainer, Input, UnstyledButton } from "@/components";
import { ICourseDto } from "@/api";

interface Props {
  courses: ICourseDto[]
}

export const CourseList: React.FC<Props> = ({
  courses
}): ReactElement => {
  const isTeacher = true;

  if (courses.length === 0) { return <></>; }

  return (
    <article>
      <article className="flex flex-col gap-4 px-4 mt-4
        w-full sm:px-8 md:flex-row md:justify-center">
        {isTeacher && <div title="Create new course"><UnstyledButton
          onPress={() => {}}>
          <IconContainer className="flex items-center justify-center
          p-2 size-9 text-gray-200
          rounded-full hover:bg-indigo-950">
            <MdLibraryAdd />
          </IconContainer></UnstyledButton></div>}
        <Input icon={<FaSearch />} onPressIcon={() => { }}></Input>
        <Input icon={<MdFilterList />} onPressIcon={() => { }}></Input>
      </article>
      <article className="flex flex-wrap p-4 max-w-7xl m-auto">
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
