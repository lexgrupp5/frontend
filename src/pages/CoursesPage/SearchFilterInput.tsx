import { ReactElement, useRef } from "react";
import { MdFilterList } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

import { IconContainer, Input, UnstyledButton } from "@/components";
import { FilterMenu } from "./FilterMenu";
import { useCoursesPageContext } from "@/hooks";

export const SearchFilterInput = (): ReactElement => {
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const coursesPageContext = useCoursesPageContext();

  const handleSearch = async () => {
    const pagination = coursesPageContext.updatePagination(
      { ...coursesPageContext.pagination, page: 1 }
    );
    await coursesPageContext.fetchCourses(coursesPageContext.searchAndFilter, pagination);
  };

  const updateSearchText = (searchText: string) => {
    coursesPageContext.updateSearchAndFilter({
      ...coursesPageContext.searchAndFilter, searchText
    });
  };

  const toggleFilterMenu = () => {
    filterMenuRef.current?.classList.toggle("hidden");
    inputContainerRef.current?.classList.toggle("rounded-b-lg");
  };

  const selectSearchFocus = () => {
    filterMenuRef.current?.classList.add("hidden");
    inputContainerRef.current?.classList.add("rounded-b-lg");
  };

  return (
    <div ref={inputContainerRef}
      className="relative flex flex-col justify-between items-center
      p-2 rounded-t-lg rounded-b-lg
      w-full bg-white
      min-[380px]:flex-row
      sm:w-auto">
      <div className="flex-grow">
        <Input type="text"
          className="py-2 px-4
          border-none outline-none focus:outline-none"
          placeholder="search text..."
          maxLength={100}
          icon={<MdFilterList className="text-black" />}
          onSelectIcon={toggleFilterMenu}
          onFocus={selectSearchFocus}
          value={coursesPageContext.searchAndFilter.searchText ?? ""}
          onChange={e => { updateSearchText(e.target.value); }} />
      </div>
      <UnstyledButton 
        className="flex-shrink-0 
        focus:outline-indigo-500"
        onPress={handleSearch}>
        <IconContainer className="size-10 p-2 border-none focus:outline-none">
          <FaSearch />
        </IconContainer>
      </UnstyledButton>
      <div ref={filterMenuRef} className="absolute top-full left-0 right-0 
        rounded-b-lg p-2 bg-white
        z-10 hidden">
        <FilterMenu />
      </div>
    </div>
  );
};
