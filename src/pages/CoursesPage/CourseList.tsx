import { ReactElement } from "react";

import { CourseItem } from "./CourseItem";
import { H, P, PageNavigation } from "@/components";
import { ICourseDto } from "@/apiGenerated";
import { useCoursesPageContext } from "@/hooks";

interface Props {
  courses: ICourseDto[];
}

export const CourseList: React.FC<Props> = ({
  courses
}): ReactElement => {
  const coursesPageContext = useCoursesPageContext();

  const nextPage = () => {
    if (coursesPageContext?.pagination.page == null) {
      return;
    }
    const page = ++coursesPageContext.pagination.page;
    const pagination = coursesPageContext.updatePagination(
      { ...coursesPageContext.pagination, page}
    );
    coursesPageContext.fetchCourses(coursesPageContext.searchAndFilter, pagination);
  };

  const prevPage = () => {
    if (coursesPageContext?.pagination.page == null) {
      return;
    }
    const page = --coursesPageContext.pagination.page;
    const pagination = coursesPageContext.updatePagination(
      { ...coursesPageContext.pagination, page }
    );
    coursesPageContext.fetchCourses(coursesPageContext.searchAndFilter, pagination);
  };

  const updatePage = (page: number) => {
    if (coursesPageContext?.pagination.page == null) {
      return;
    }
    const pagination = coursesPageContext.updatePagination(
      { ...coursesPageContext.pagination, page }
    );
    coursesPageContext.fetchCourses(coursesPageContext.searchAndFilter, pagination);
  };

  return (
    <PageNavigation
      page={coursesPageContext.pagination.page ?? 1}
      nrOfPages={coursesPageContext.paginationMeta?.TotalPageCount}
      onNext={nextPage}
      onPrev={prevPage}
      updatePage={updatePage}>
      {courses.length == 0 && <div className="w-full flex justify-center p-8">
        <H size={2}>No courses were found!</H>
      </div>}  
      <article className="flex flex-wrap p-4 max-w-7xl m-auto">
        {courses.map((course) => (
          <div key={course.id}
            className="w-full sm:p-2 sm:w-1/2 lg:w-1/3 mb-6 h-[200px]">
            <CourseItem course={course} />
          </div>
        ))}
      </article>
    </PageNavigation>
  );
};
