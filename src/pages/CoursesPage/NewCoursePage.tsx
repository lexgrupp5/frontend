import { ReactElement } from "react";
import { CreateCourseForm } from "./CreateCourseForm";
import { Breadcrumb, BreadcrumbItemType } from "@/components";
import { Path } from "@/constants";

export const NewCoursePage = (): ReactElement => {
  const breadcrumbItems: BreadcrumbItemType[] = [
    { label: "Home", path: Path.INDEX },
    { label: "Courses", path: Path.COURSES },
    {
      label: "new",
      path: Path.constructSelectedCoursePath("new") },
  ];

  return (
    <article className="p-4 bg-gradient-indigo">
      <Breadcrumb items={breadcrumbItems} />
      <div className="min-h-screen-header-center">
        <CreateCourseForm />
      </div>
    </article>
  );
};