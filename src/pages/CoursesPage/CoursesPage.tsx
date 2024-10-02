import { ReactElement } from "react";

import { useCoursesPageContext } from "@/hooks";
import { CourseList } from "./CourseList";
import { Breadcrumb, BreadcrumbItemType, Spinner } from "@/components";
import { CoursesController } from "./CoursesController";
import { Path } from "@/constants";

export const CoursesPage = (): ReactElement => {
  const { courses, pending } = useCoursesPageContext();

  const breadcrumbItems: BreadcrumbItemType[] = [
    { label: "Home", path: Path.INDEX },
    { label: "Courses", path: Path.COURSES }
  ];
  
  if (pending) {
    return <div className="h-[calc(100vh-10rem)]"><Spinner /></div>;
  }

  return (
    <article className="min-h-screen-header bg-gradient-indigo">
      <div className="p-4"> 
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <CoursesController />
      <CourseList courses={courses}/>
    </article>
  );
};
