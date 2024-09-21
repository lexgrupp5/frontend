import { ReactElement, useEffect, useState } from "react";

import { Client, CourseDto } from "@/api";

import { CourseItem } from "./CourseItem";
import { getAPI } from "@/config";

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
    <article className="flex flex-wrap p-4">
      {courses.length !== 0 &&
        courses.map((course) => (
          <div key={course.id}
            className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
            <CourseItem course={course}/>
          </div>
        ))
      }</article>
  );
};