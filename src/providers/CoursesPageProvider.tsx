import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { Client, ICourseDto } from "@/api";
import { getAPI } from "@/config";
import { ICoursesPageContext } from "@/contexts";

export const CoursesPageProvider = (): React.ReactElement => {
  const [courses, setCourses] = useState<ICourseDto[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<ICourseDto | null>(null);

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

  const updateSelectedCourse = (course: ICourseDto) => {
    setSelectedCourse(course);
  };

  const constructCoursesPageContext = (): ICoursesPageContext => ({
    courses,
    selectedCourse,
    updateSelectedCourse
  });
  
  return (
    <>
      <Outlet context={constructCoursesPageContext()}/>
    </>
  );
};
