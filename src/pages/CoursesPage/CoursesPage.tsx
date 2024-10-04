import { ReactElement, useEffect } from "react";

import { useCoursesPageContext } from "@/hooks";
import { CourseList } from "./CourseList";
import { Breadcrumb, BreadcrumbItemType, Spinner } from "@/components";
import { CoursesController } from "./CoursesController";
import { Path } from "@/constants";
import { DefaultToastMessage } from "../SharedComponents";

export const CoursesPage = (): ReactElement => {
  const { courses, pending, clearError, fetchCourses } = useCoursesPageContext();

  const breadcrumbItems: BreadcrumbItemType[] = [
    { label: "Home", path: Path.INDEX },
    { label: "Courses", path: Path.COURSES }
  ];

  useEffect(() => {
    (async () => {
      await fetchCourses();
    })();
  }, []);

  if (pending) {
    return <div className="h-[calc(100vh-10rem)]"><Spinner /></div>;
  }

  return (
    <>
      <DefaultToastMessage onClose={clearError} />
      <article className="min-h-screen-header bg-gradient-indigo">
        <div className="p-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <CoursesController />
        <CourseList courses={courses} />
      </article></>
  );
};
