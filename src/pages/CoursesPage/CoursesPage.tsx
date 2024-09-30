import { ReactElement } from "react";

import { useCoursesPageContext } from "@/hooks";
import { CourseList } from "./CourseList";
import { Spinner } from "@/components";
import { CoursesController } from "./CoursesController";

export const CoursesPage = (): ReactElement => {
  const { courses, pending } = useCoursesPageContext();
  
  if (pending) {
    return <div className="h-[calc(100vh-10rem)]"><Spinner /></div>;
  }

  return (
    <article className="bg-gradient-indigo"> 
      <CoursesController />
      <CourseList courses={courses}/>
    </article>
  );
};
