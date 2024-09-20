import { ReactElement, useEffect, useState } from "react";

import { CourseDto, validateCourseDto } from "@/dtos";
import { getAPI } from "@/config";
import { isType } from "@/utils";
import { CourseItem } from "./CourseItem";

export const CourseList = (): ReactElement => {
  const [courses, setCourses] = useState<CourseDto[]>([]);

  // TODO Use generated models, app, and cutom hooks.
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${getAPI()}/courses`);
        const courses = await res.json();
        if (Array.isArray(courses) &&
          courses.every(obj => isType(obj, validateCourseDto))) {
          setCourses(courses);
        } else {
          setCourses([]);
        }
      } catch (e) {
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