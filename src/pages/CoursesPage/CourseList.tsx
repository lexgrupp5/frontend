import { ReactElement, useEffect, useState } from "react";

import { Client, CourseDto } from "@/api";

import { CourseItem } from "./CourseItem";
import { getAPI } from "@/config";
import { Input } from "@/components";
import { FaSearch } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";

export const CourseList = (): ReactElement => {
  const [courses, setCourses] = useState<CourseDto[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const api = new Client(getAPI());
        const result = await api.courses();
        setCourses(result);
      } catch (e) {
        setCourses([]);
        console.log(e);
      }
    })();
  }, []);

  return (
    <article>
      <article className="flex flex-col gap-4 px-8 mb-8
        w-full md:flex-row md:justify-center">
        <Input icon={<FaSearch />} onPressIcon={() => {}}></Input>
        <Input icon={<MdFilterList />} onPressIcon={() => {}}></Input>
      </article>
      <article className="flex flex-wrap p-4 max-w-7xl">
        {courses.length !== 0 &&
          courses.map((course) => (
            <div key={course.id}
              className="w-full px-4 sm:w-1/2 lg:w-1/3 h-500 mb-6 h-[160px]">
              <CourseItem course={course} />
            </div>
          ))}
      </article>
    </article>
  );
};
