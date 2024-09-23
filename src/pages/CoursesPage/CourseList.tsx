import { ReactElement, useState } from "react";
import { MdFilterList, MdLibraryAdd } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

import { CourseItem } from "./CourseItem";
import { IconContainer, Input, UnstyledButton } from "@/components";
import { useCoursePageContext } from "@/hooks";

export const CourseList = (): ReactElement => {
  const {
    courses,
    searchAndFilterDTO,
    updateSearchAndFilterDTO,
    fetchCourses
  } = useCoursePageContext();

  const handleSearch = () => {
    if (searchAndFilterDTO.searchText != null &&
      searchAndFilterDTO.searchText.length === 0) { return; }
    fetchCourses(searchAndFilterDTO);
  };

  const updateSearchText = (searchText: string) => {
    updateSearchAndFilterDTO({ ...searchAndFilterDTO, searchText });
  };

  if (courses.length === 0) { return <></>; }

  return (
    <article>
      <article className="flex flex-col gap-4 px-4 mt-4
        w-full sm:px-8 md:flex-row md:justify-center">
        <div title="Create new course"><UnstyledButton
          onPress={() => {}}>
          <IconContainer className="flex items-center justify-center
          p-2 size-9 text-gray-200
          rounded-full hover:bg-indigo-950">
            <MdLibraryAdd />
          </IconContainer>
        </UnstyledButton></div>
        <Input
          type="text"
          placeholder="search text..."
          maxLength={100}
          onChange={e => { updateSearchText(e.target.value); }}
          icon={<FaSearch />}
          onPressIcon={handleSearch}
          value={searchAndFilterDTO.searchText} /> 
        <Input icon={<MdFilterList />} />
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
